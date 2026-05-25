import { useState } from 'react';
import {useDocStore} from '../store/useDocStore';
import {processFileInWorker} from '../lib/processor';
import { Loader2 } from 'lucide-react';

export default function ProcessorButton() {
  const {parsedRequirements, activeRequirements, files, updateFile} = useDocStore();
  const [isFetchingModule, setIsFetchingModule] = useState(false);

  const activeReqs = activeRequirements || parsedRequirements;

  const handleProcess = async () => {
    if (!activeReqs || isProcessing) return; // Strict guard to prevent duplicate triggers & memory leaks
    
    for (const fileState of files) {
      updateFile(fileState.id, {status: 'processing'});
      const startTime = Date.now();
      
      let finalResult: { blob?: Blob; error?: string; dimensions?: { width: number; height: number }; originalDimensions?: { width: number; height: number } } = {};
      
      if (fileState.backgroundResult) {
         // Background task was already completed, map the pre-calculated results
         finalResult = {
             blob: fileState.backgroundResult, 
             dimensions: fileState.backgroundDimensions, 
             originalDimensions: fileState.originalDimensions
         };
      } else {
         const result = await processFileInWorker(fileState, activeReqs, (progress, fetchingModule) => {
            if (fetchingModule !== undefined) {
                setIsFetchingModule(fetchingModule);
            }
         });
         finalResult = result;
      }
      
      setIsFetchingModule(false);
      
      // Calculate remaining elapsed time to guarantee a minimum 2500ms display of trust loader
      const elapsedTime = Date.now() - startTime;
      const remainingDelay = Math.max(0, 2500 - elapsedTime);
      if (remainingDelay > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingDelay));
      }
      
      if (finalResult.blob) {
        updateFile(fileState.id, {
            status: 'completed', 
            processed: true, 
            processedFile: finalResult.blob, 
            processedDimensions: finalResult.dimensions, 
            originalDimensions: finalResult.originalDimensions
        });
        window.dispatchEvent(new CustomEvent('pastedocs_file_completed'));
      } else {
        updateFile(fileState.id, {status: 'error', error: finalResult.error || "Local processing failed"});
      }
    }
  };

  const hasFiles = files.length > 0;
  const isProcessing = files.some(f => f.status === 'processing');
  const needsReupload = files.some(f => f.needsReupload);
  const canProcess = hasFiles && activeReqs && !isProcessing && !needsReupload;

  return (
    <div className="mt-6">
      <button
        onClick={handleProcess}
        disabled={!canProcess || isProcessing}
        className={`w-full px-6 py-3 text-sm font-semibold rounded-xl text-white transition-all duration-150 ease-in-out flex items-center justify-center gap-2 ${
          isProcessing 
            ? 'bg-zinc-200 text-zinc-500 cursor-not-allowed' 
            : 'bg-zinc-950 hover:bg-zinc-800 disabled:bg-zinc-200 disabled:text-zinc-400'
        }`}
      >
        {isProcessing ? (
          <>
            <Loader2 size={18} className="animate-spin text-gray-400" />
            <span>{isFetchingModule ? 'Loading formatting engine...' : 'Processing... Please wait'}</span>
          </>
        ) : (
          <span>Process Now</span>
        )}
      </button>
    </div>
  );
}
