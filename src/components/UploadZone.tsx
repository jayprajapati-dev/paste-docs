import {useCallback, useRef, useState} from 'react';
import {useDocStore} from '../store/useDocStore';
import { UploadCloud } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function UploadZone() {
  const {files, addFiles, removeFile} = useDocStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const needsReuploadFiles = files.filter(f => f.needsReupload);
  const hasGhostState = needsReuploadFiles.length > 0;

  const handleFiles = useCallback((fileList: FileList | null) => {
    setIsDragOver(false);
    if (fileList && fileList.length > 0) {
      // Remove the ghost files if the user uploads something new (for simplicity)
      needsReuploadFiles.forEach(f => removeFile(f.id));
      addFiles(Array.from(fileList));
    }
  }, [addFiles, needsReuploadFiles, removeFile]);

  const hasFiles = files.length > 0;

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center text-center cursor-pointer group transition-all duration-200 relative overflow-hidden min-h-[180px]",
        isDragOver 
          ? "border-emerald-500 bg-emerald-50/10 scale-[1.01] shadow-[0_0_40px_rgba(16,185,129,0.05)]" 
          : "border-zinc-200 hover:border-emerald-500 hover:scale-[1.005] bg-white shadow-sm hover:shadow-md",
        !hasGhostState && hasFiles && "py-4 px-5 md:p-6 min-h-[120px]" // smaller padding when it's in the side panel
      )}
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
        setIsDragOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleFiles(e.dataTransfer.files);
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple
        accept="image/*,application/pdf"
        capture="environment"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {hasGhostState ? (
        <div className="flex flex-col items-center opacity-70">
          <div className="w-16 h-16 flex items-center justify-center rounded-2xl shadow-sm mb-4 border border-dashed border-gray-300 bg-gray-50 text-gray-400">
            <UploadCloud size={28} strokeWidth={1.5} />
          </div>
          <p className="text-gray-900 font-medium text-[15px]">
            Re-upload {needsReuploadFiles.length === 1 ? needsReuploadFiles[0].name : `${needsReuploadFiles.length} files`} to continue
          </p>
          <p className="text-sm text-gray-500 mt-1.5">from your previous session</p>
        </div>
      ) : (
        <>
          <div className={cn(
            "flex items-center justify-center shadow-sm transition-all duration-300 z-10",
            hasFiles ? "w-10 h-10 mb-2 rounded-xl" : "w-16 h-16 mb-5 rounded-2xl",
            isDragOver ? "bg-emerald-600 border-transparent text-white scale-110 shadow-emerald-500/20" : "bg-white border border-zinc-200 text-zinc-700 group-hover:scale-105 group-hover:shadow-md"
          )}>
            <UploadCloud size={hasFiles ? 20 : 28} strokeWidth={1.5} />
          </div>
          <p className={cn("text-zinc-900 font-semibold z-10", hasFiles ? "text-[14px]" : "text-[15px]")}>
            {hasFiles ? "Add more files" : "Drop your photo or PDF here"}
          </p>
          {!hasFiles ? (
            <>
              <p className="text-xs text-zinc-500 mt-1.5 z-10">JPG, PNG, PDF · Processed on your device · Never uploaded</p>
              <div className="flex items-center justify-center gap-4 mt-6 text-xs text-zinc-400 z-10 select-none">
                <span>🔒 Private</span>
                <span>⚡ Instant</span>
                <span>📱 Works Offline</span>
              </div>
            </>
          ) : (
            <p className="text-[11px] text-zinc-400 mt-1 z-10">JPG, PNG, PDF · local only</p>
          )}
        </>
      )}
    </div>
  );
}
