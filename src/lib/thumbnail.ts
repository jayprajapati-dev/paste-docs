export async function generateThumbnail(file: File): Promise<{ url: string; width: number; height: number }> {
  if (file.type.startsWith('image/')) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        resolve({ url, width: img.width, height: img.height });
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load image'));
      };
      img.src = url;
    });
  }

  if (file.type === 'application/pdf') {
    try {
      const pdfjsLib = await import('pdfjs-dist');
      // Assign the worker dynamically
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.0 });
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No 2d context');

      const MAX_DIMENSION = 400;
      const scale = Math.min(1.0, MAX_DIMENSION / Math.max(viewport.width, viewport.height));
      const scaledViewport = page.getViewport({ scale });
      
      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;
      
      await page.render({
        canvasContext: ctx,
        viewport: scaledViewport
      } as any).promise;
      
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve({ 
              url: URL.createObjectURL(blob), 
              width: Math.round(viewport.width), 
              height: Math.round(viewport.height) 
            });
          } else {
            resolve({ url: '', width: 0, height: 0 });
          }
        }, 'image/jpeg', 0.8);
      });
    } catch (err) {
      console.error('PDF thumbnail generation failed', err);
      return { url: '', width: 0, height: 0 };
    }
  }

  return { url: '', width: 0, height: 0 };
}
