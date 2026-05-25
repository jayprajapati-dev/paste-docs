import { useDocStore, FileState } from '../store/useDocStore';
import { X, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import FileThumbnail from './FileThumbnail';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function FileQueueItem({ fileState }: { fileState: FileState; key?: string }) {
  const { removeFile, updateFile } = useDocStore();
  
  const displaySize = fileState.size >= 1024 * 1024 
    ? `${(fileState.size / (1024 * 1024)).toFixed(1)} MB` 
    : `${(fileState.size / 1024).toFixed(1)} KB`;

  const type = fileState.file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN';

  return (
    <div className={cn(
      "relative bg-white/70 backdrop-blur-md border border-zinc-150 rounded-xl overflow-hidden group hover:bg-white hover:shadow-sm transition-all duration-200 flex items-center p-2 gap-3",
      fileState.needsReupload && "opacity-60 border-dashed bg-zinc-50/50"
    )}>
      <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-zinc-50 border border-zinc-100 flex items-center justify-center shadow-inner">
        {fileState.needsReupload ? (
          <div className="text-[9px] text-zinc-400 font-medium text-center leading-none px-0.5">Re-upload</div>
        ) : (
          <FileThumbnail file={fileState.file} />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1.5">
          <p className="font-semibold text-zinc-800 text-xs truncate" title={fileState.name}>{fileState.name}</p>
        </div>
        
        {fileState.error ? (
          <p className="text-[10px] font-semibold text-red-500 mt-0.5 flex items-center gap-1">
            <AlertCircle size={10} className="inline" /> {fileState.error}
          </p>
        ) : (
          <div className="flex items-center gap-1.5 mt-0.5 text-[10px] font-medium text-zinc-500">
            <span className="bg-zinc-100 px-1 py-0.2 rounded text-[9px] font-bold text-zinc-600 uppercase tracking-wider">{type}</span>
            <span>{displaySize}</span>
            {fileState.originalDimensions && (
              <>
                <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                <span className="font-mono text-[9px]">{fileState.originalDimensions.width}x{fileState.originalDimensions.height}</span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 shrink-0 pr-1">
        {fileState.status === 'processing' && <Loader2 className="animate-spin text-blue-500" size={18} />}
        {fileState.status === 'completed' && <CheckCircle className="text-green-500" size={18} />}
        {fileState.status === 'error' && <AlertCircle className="text-red-500" size={18} />}
        {fileState.status === 'pending' && <div className="w-4 h-4 border-[1.5px] border-gray-200 rounded-full" />}
        
        <button 
          onClick={() => removeFile(fileState.id)}
          className="p-3 sm:p-2 text-red-500 hover:text-red-700 hover:bg-red-50 active:bg-red-100 rounded-full transition-colors shrink-0 flex items-center justify-center min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0"
          title="Remove file"
          aria-label="Remove uploaded file"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
