/// <reference lib="webworker" />

declare const self: DedicatedWorkerGlobalScope;

self.onmessage = async (e: MessageEvent) => {
  const { file, requirements, jobId } = e.data;
  
  self.postMessage({ type: 'progress', percent: 10, jobId });

  try {
    if (!file.type.startsWith('image/')) {
       throw new Error('Unsupported file type for background processing');
    }

    let mimeType = 'image/jpeg';
    if (requirements.format === 'jpeg') mimeType = 'image/jpeg';
    else if (requirements.format === 'png') mimeType = 'image/png';
    else if (requirements.format === 'webp') mimeType = 'image/webp';
    else mimeType = file.type;

    const imgBitmap = await createImageBitmap(file);
    const originalDimensions = { width: imgBitmap.width, height: imgBitmap.height };
    let processedDimensions = originalDimensions;
    
    let currentRawBlob: Blob = file;

    if ((requirements.width && requirements.height) || requirements.format || requirements.backgroundColor) {
      const targetWidth = requirements.width || imgBitmap.width;
      const targetHeight = requirements.height || imgBitmap.height;
      
      processedDimensions = { width: targetWidth, height: targetHeight };
      
      const canvas = new OffscreenCanvas(targetWidth, targetHeight);
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No context');
      
      if (requirements.backgroundColor && requirements.backgroundColor !== 'transparent') {
          ctx.fillStyle = requirements.backgroundColor;
          ctx.fillRect(0, 0, targetWidth, targetHeight);
      } else if (!requirements.backgroundColor || requirements.backgroundColor !== 'transparent') {
          if (requirements.format === 'jpeg' || mimeType === 'image/jpeg') {
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(0, 0, targetWidth, targetHeight);
          }
      }

      const imgAspect = imgBitmap.width / imgBitmap.height;
      const reqAspect = targetWidth / targetHeight;
      
      if (requirements.width && requirements.height) {
        const ratioDiff = Math.max(imgAspect / reqAspect, reqAspect / imgAspect);
        const useContain = ratioDiff > 1.5;
        
        if (useContain) {
          let dW = targetWidth;
          let dH = targetHeight;
          let dX = 0;
          let dY = 0;

          if (imgAspect > reqAspect) {
            dH = targetWidth / imgAspect;
            dY = (targetHeight - dH) / 2;
          } else {
            dW = targetHeight * imgAspect;
            dX = (targetWidth - dW) / 2;
          }
          ctx.drawImage(imgBitmap, 0, 0, imgBitmap.width, imgBitmap.height, dX, dY, dW, dH);
        } else {
          let sW = imgBitmap.width;
          let sH = imgBitmap.height;
          let sX = 0;
          let sY = 0;

          if (imgAspect > reqAspect) {
            sW = imgBitmap.height * reqAspect;
            sX = (imgBitmap.width - sW) / 2;
          } else {
            sH = imgBitmap.width / reqAspect;
            sY = (imgBitmap.height - sH) / 2;
          }
          ctx.drawImage(imgBitmap, sX, sY, sW, sH, 0, 0, targetWidth, targetHeight);
        }
      } else {
          ctx.drawImage(imgBitmap, 0, 0, imgBitmap.width, imgBitmap.height, 0, 0, targetWidth, targetHeight);
      }

      currentRawBlob = await canvas.convertToBlob({ type: mimeType, quality: 1 });
      self.postMessage({ type: 'progress', percent: 50, jobId });
    }

    let finalExt = mimeType.split('/')[1];
    if (finalExt === 'jpeg') finalExt = 'jpg';
    let finalFile = new File([currentRawBlob], file.name.replace(/\.[^/.]+$/, "") + '.' + finalExt, { type: mimeType });

    if (requirements.maxSizeBytes && finalFile.size > requirements.maxSizeBytes) {
       self.postMessage({ type: 'progress', percent: 50, jobId, fetchingModule: true });
       const imageCompression = (await import('browser-image-compression')).default;
       self.postMessage({ type: 'progress', percent: 50, jobId, fetchingModule: false });

       let quality = 0.9;
       for (let i = 0; i < 5; i++) {
          const options = {
              maxSizeMB: requirements.maxSizeBytes / (1024 * 1024),
              initialQuality: quality,
              fileType: mimeType,
              useWebWorker: false,
              onProgress: (p: number) => {
                  self.postMessage({ type: 'progress', percent: 50 + (p / 2), jobId });
              }
          };
          
          const compressedBlob = await imageCompression(finalFile, options);
          finalFile = new File([compressedBlob], finalFile.name, { type: mimeType });
          
          if (finalFile.size <= requirements.maxSizeBytes) {
              break;
          }
          quality -= 0.15;
       }
    } else {
       self.postMessage({ type: 'progress', percent: 100, jobId });
    }

    if (requirements.maxSizeBytes && finalFile.size > requirements.maxSizeBytes) {
        throw new Error(`Could not compress below ${Math.round(requirements.maxSizeBytes / 1024)} KB`);
    }

    self.postMessage({
      type: 'done',
      jobId,
      result: {
        blob: finalFile,
        dimensions: processedDimensions,
        originalDimensions
      }
    });

  } catch (error) {
    self.postMessage({
      type: 'error',
      jobId,
      error: error instanceof Error ? error.message : 'Processing failed'
    });
  }
};
