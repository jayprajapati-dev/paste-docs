import {useState, useEffect} from 'react';
import {useDocStore, FileState} from '../store/useDocStore';
import {CheckCircle, AlertCircle, Download, ArrowRight, File as FileIcon, Share2} from 'lucide-react';
import RenameInput from './RenameInput';
import BulkDownload from './BulkDownload';

export default function ProcessingResults() {
  const {files} = useDocStore();
  const processedFiles = files.filter(f => f.status === 'completed' || f.status === 'error' || f.status === 'processing');

  if (processedFiles.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="space-y-6">
        {processedFiles.map(file => (
          <ResultCard key={file.id} fileState={file} />
        ))}
      </div>
      
      {processedFiles.length > 1 && (
        <BulkDownload />
      )}
    </div>
  );
}

function ResultCard({ fileState }: { fileState: FileState; key?: string }) {
  const { updateFile } = useDocStore();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [justDownloaded, setJustDownloaded] = useState(false);

  useEffect(() => {
    // Show original image as preview if processed file isn't ready yet for optimistic UI
    const fileToPreview = fileState.processedFile || fileState.file;
    if (fileToPreview && fileToPreview.type.startsWith('image/')) {
      const url = URL.createObjectURL(fileToPreview);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [fileState.processedFile, fileState.file]);

  const defaultFileName = (fileState.processedFile as File)?.name || `ready_${fileState.name}`;
  // Extract extension and original name without extension
  const extensionMatch = defaultFileName.match(/\.([^.]+)$/);
  const extension = extensionMatch ? extensionMatch[1] : '';
  const originalNameNoExt = extensionMatch ? defaultFileName.substring(0, defaultFileName.length - extension.length - 1) : defaultFileName;

  const downloadFile = () => {
    if (!fileState.processedFile) return;
    const url = URL.createObjectURL(fileState.processedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = (fileState.processedFile as File).name || `ready_${fileState.name}`;
    a.click();
    URL.revokeObjectURL(url);
    
    setJustDownloaded(true);
    setTimeout(() => {
        setJustDownloaded(false);
    }, 4000);
  };

  const handleRename = (newName: string) => {
    if (!fileState.processedFile) return;
    const finalName = `${newName}.${extension}`;
    // Re-create the File object with the new name
    const newFile = new File([fileState.processedFile], finalName, { type: fileState.processedFile.type });
    updateFile(fileState.id, { processedFile: newFile });
  };

  if (fileState.status === 'error') {
    let suggestion = "Most common fix: Try a smaller file or different format.";
    if (fileState.error?.toLowerCase().includes('pdf') && fileState.error?.toLowerCase().includes('large')) {
        suggestion = "This PDF is very large. Try compressing it first or uploading individual pages.";
    } else if (fileState.error?.toLowerCase().includes('format') || fileState.error?.toLowerCase().includes('unsupported')) {
        suggestion = "This format is not supported yet. Convert to JPG or PDF first.";
    }
    
    return (
      <div className="border border-red-200 rounded-2xl p-6 bg-red-50 flex flex-col items-start gap-4 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-red-500 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-semibold text-red-900 line-clamp-1">{fileState.name}</h4>
            <p className="text-sm text-red-700 mt-1 mb-2 font-medium">Something went wrong with your file: {fileState.error}</p>
            <p className="text-sm text-red-800 bg-red-100/50 p-2 rounded-lg border border-red-100">{suggestion}</p>
          </div>
        </div>
        <div className="flex gap-3 ml-9 mt-2">
           <button 
             onClick={() => updateFile(fileState.id, { status: 'pending', error: undefined })}
             className="px-6 py-2.5 bg-zinc-950 text-white text-sm font-semibold rounded-lg hover:bg-zinc-800 transition-colors"
           >
             Try Again
           </button>
           <button 
             onClick={() => updateFile(fileState.id, { needsReupload: true, status: 'pending', error: undefined })}
             className="px-6 py-2.5 bg-white text-zinc-900 border border-zinc-200 text-sm font-semibold rounded-lg hover:bg-zinc-50 hover:text-zinc-950 transition-colors"
           >
             Replace File
           </button>
        </div>
      </div>
    );
  }

  const originalSize = fileState.size;
  const newSize = fileState.processedFile?.size || 0;
  
  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${Math.round(bytes / 1024)} KB`;
  };

  const newFormat = fileState.processedFile?.type.split('/')[1]?.toUpperCase() || 'UNKNOWN';
  
  const percentReduction = originalSize && newSize && originalSize > newSize 
    ? Math.round(((originalSize - newSize) / originalSize) * 100) 
    : 0;

  return (
    <div className="border border-zinc-150 rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-350 animate-in slide-in-from-bottom-4 fade-in relative group">
      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none z-10" />
      
      <div className="flex flex-col gap-4 p-4">
        
        {/* Preview Area */}
        <div className="relative flex justify-center items-center bg-zinc-50/50 border border-zinc-100 rounded-xl p-3 h-48 sm:h-52 w-full overflow-hidden">
          {previewUrl ? (
            <img src={previewUrl} alt="Processed preview" className="max-w-full max-h-full object-contain rounded-lg shadow-sm border border-black/5 z-10 hover:scale-[1.01] transition-transform duration-300" referrerPolicy="no-referrer" />
          ) : (
            <div className="flex flex-col items-center text-zinc-300 z-10">
              <FileIcon size={36} strokeWidth={1} />
              <span className="mt-2 text-[10px] font-medium text-zinc-400">Preview unavailable</span>
            </div>
          )}
          
          {fileState.status === 'processing' ? (
            <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm border border-amber-100/60 z-20">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-spin"></div> Processing...
            </div>
          ) : (
            <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm border border-emerald-100/60 z-20">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Ready
            </div>
          )}
          
          {/* Decorative background circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-50/50 rounded-full blur-2xl" />
        </div>

        {/* Info & Actions */}
        <div className="flex flex-col gap-3 relative z-10">
          <div className={fileState.status === 'processing' ? 'opacity-50 blur-[1px] pointer-events-none transition-all duration-300 flex flex-col gap-3' : 'transition-all duration-300 flex flex-col gap-3'}>
            <div className="delay-[100ms] animate-in slide-in-from-bottom-2 fade-in fill-mode-both">
              <label className="text-[9px] font-bold text-zinc-450 uppercase tracking-widest mb-1.5 block">Final Filename</label>
              <RenameInput 
                originalName={originalNameNoExt} 
                extension={extension} 
                onRename={handleRename} 
              />
            </div>

            {/* Comparison Stats - Compact Capsule Layout */}
            <div className="grid grid-cols-3 gap-2 bg-zinc-50 rounded-xl p-3 text-xs border border-zinc-100/80 delay-[200ms] animate-in slide-in-from-bottom-3 fade-in fill-mode-both">
              {/* Size Card */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Size</span>
                <div className="flex flex-wrap items-center gap-1">
                  <span className="line-through text-zinc-400 font-medium text-[9px]">{formatSize(originalSize)}</span>
                  <span className="text-zinc-300 font-bold text-[9px]">→</span>
                  <span className="font-bold text-emerald-600 font-sans text-[11px]">{formatSize(newSize)}</span>
                </div>
              </div>

              {/* Dimensions Card */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Dimensions</span>
                <div className="flex flex-col leading-none">
                  {fileState.processedDimensions ? (
                    <span className="font-semibold text-zinc-700 font-sans text-[11px] leading-tight mt-0.5">
                      {fileState.processedDimensions.width}×{fileState.processedDimensions.height}
                    </span>
                  ) : (
                    <span className="text-zinc-400">—</span>
                  )}
                </div>
              </div>

              {/* Format Card */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Format</span>
                <span className="font-bold text-zinc-700 bg-zinc-200/50 px-1 py-0.5 rounded self-start leading-none text-[9px] uppercase mt-0.5">
                  {newFormat}
                </span>
              </div>
            </div>
          </div>

          <div className="delay-[300ms] animate-in slide-in-from-bottom-3 fade-in fill-mode-both flex flex-col gap-2.5">
            <button 
              onClick={downloadFile}
              disabled={fileState.status !== 'completed'}
              className={`w-full py-2.5 text-sm rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 font-semibold min-h-[44px] ${
                fileState.status !== 'completed' 
                  ? 'bg-zinc-150 text-zinc-400 cursor-not-allowed' 
                  : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm'
              }`}
            >
              {fileState.status !== 'completed' ? (
                <>
                  <div className="w-4 h-4 border-2 border-zinc-400 border-t-zinc-500 rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Download size={16} className="group-hover:-translate-y-0.5 transition-transform" /> 
                  <span>Download Asset</span>
                </>
              )}
            </button>
            
            {justDownloaded && (
              <div className="animate-in fade-in slide-in-from-bottom-2 text-center text-xs font-semibold text-emerald-700 bg-emerald-50/80 py-2 rounded-xl border border-emerald-100 flex items-center justify-center gap-1.5">
                 <CheckCircle size={14} /> Saved in your Downloads
              </div>
            )}
            
            {/* Viral Share Box */}
            <div className="bg-zinc-50 border border-zinc-150 p-3 rounded-xl">
              <p className="text-[10px] font-semibold text-zinc-500 mb-2 text-center leading-normal font-sans">
                Help friends bypass portal errors! Share this utility:
              </p>
              <WhatsAppShareButton />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function WhatsAppShareButton() {
  const [copied, setCopied] = useState(false);
  const shareText = encodeURIComponent("Bhai ye tool try kar — pastedocs.vercel.app — NEET/SSC/Passport sab ke liye photo automatically resize kar deta hai. Free hai, phone pe kaam karta hai, koi account nahi chahiye 🔥");
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("https://pastedocs.vercel.app");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {}
  };

  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full">
      <a 
        href={`https://wa.me/?text=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white text-sm font-semibold rounded-xl hover:bg-[#20bd5a] transition-all duration-150 ease-in-out"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="group-hover:scale-110 transition-transform"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
        <span>Share on WhatsApp</span>
      </a>
      
      <button 
        onClick={handleCopy}
        className={`flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          copied 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 focus:ring-emerald-200' 
            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 active:scale-[0.98] focus:ring-gray-200'
        }`}
        title={copied ? "Copied!" : "Copy Link"}
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        )}
      </button>
    </div>
  );
}
