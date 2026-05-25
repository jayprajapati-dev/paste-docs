import { useEffect, useRef, useState, useCallback } from 'react';
import { Requirements } from '../lib/parser';
import { useDocStore, FileState } from '../store/useDocStore';

export function useBackgroundProcessor() {
  const { files, parsedRequirements, activeRequirements, setIsBackgroundProcessing, setBackgroundProgress, updateFile } = useDocStore();
  const workerRef = useRef<Worker | null>(null);
  const debounceTimerRef = useRef<number | NodeJS.Timeout | null>(null);
  const isProcessingRef = useRef(false);
  const latestFilesRef = useRef(files);

  // Update latest files ref
  useEffect(() => {
    latestFilesRef.current = files;
  }, [files]);
  
  // Track last used requirements for background to know if we need to re-run
  const lastProcessedReqsRef = useRef<string | null>(null);

  const terminateWorker = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  }, []);

  const processFiles = useCallback(async (currentFiles: FileState[], reqs: Requirements) => {
    terminateWorker();
    
    // Clear old background results if requirements changed
    currentFiles.forEach(f => {
      updateFile(f.id, { backgroundResult: undefined, backgroundDimensions: undefined });
    });
    
    if (currentFiles.length === 0) return;

    if (reqs.format === 'pdf') {
      setIsBackgroundProcessing(false);
      return;
    }
    
    setIsBackgroundProcessing(true);
    isProcessingRef.current = true;
    
    for (let i = 0; i < currentFiles.length; i++) {
      if (!isProcessingRef.current) break; // Check if cancelled
      
      const fileState = currentFiles[i];
      if (fileState.needsReupload) continue;
      
      setBackgroundProgress(0);
      
      await new Promise<void>((resolve) => {
        workerRef.current = new Worker(new URL('../workers/docWorker.ts', import.meta.url), { type: 'module' });
        
        workerRef.current.onmessage = (e) => {
          const { type, percent, result, error } = e.data;
          if (type === 'progress') {
            setBackgroundProgress(percent);
          } else if (type === 'done') {
            updateFile(fileState.id, { 
                backgroundResult: result.blob,
                backgroundDimensions: result.dimensions,
                originalDimensions: result.originalDimensions
            } as any);
            resolve();
          } else if (type === 'error') {
            console.error('Background process error:', error);
            resolve(); // Still resolve to continue next file
          }
        };
        
        workerRef.current.onerror = (e) => {
          console.error('Worker error:', e);
          resolve();
        };

        workerRef.current.postMessage({
          file: fileState.file,
          requirements: reqs,
          jobId: Date.now()
        });
      });
      
      terminateWorker();
    }
    
    setIsBackgroundProcessing(false);
    setBackgroundProgress(100);
    isProcessingRef.current = false;
    
  }, [setIsBackgroundProcessing, setBackgroundProgress, updateFile, terminateWorker]);

  const activeReqs = activeRequirements || parsedRequirements || {};
  const currentReqsString = JSON.stringify(activeReqs);
  const filesHash = files.map(f => f.id).join(',');

  // Effect to trigger debounce
  useEffect(() => {
    if (files.length === 0) {
       isProcessingRef.current = false;
       terminateWorker();
       setIsBackgroundProcessing(false);
       return;
    }
    
    if (lastProcessedReqsRef.current === currentReqsString && !files.some(f => !f.backgroundResult)) {
       // Already processed with these requirements
       return;
    }

    // Debounce processing
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      lastProcessedReqsRef.current = currentReqsString;
      // Pass the *latest* files through closure since we disable exhaustive-deps
      processFiles(latestFilesRef.current, activeReqs);
    }, 300);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      isProcessingRef.current = false;
      terminateWorker();
      setIsBackgroundProcessing(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesHash, currentReqsString]);

  return { terminateWorker };
}
