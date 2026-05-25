import { useState, useEffect } from 'react';
import { useDocStore } from '../store/useDocStore';
import { X, Info } from 'lucide-react';

export default function RestoreBanner() {
  const { files } = useDocStore();
  const [isVisible, setIsVisible] = useState(false);
  const [sessionType, setSessionType] = useState<'restore' | 'completed' | null>(null);
  
  // Find files that need reuploading
  const needsReuploadFiles = files.filter(f => f.needsReupload);

  useEffect(() => {
    if (needsReuploadFiles.length > 0) {
      setIsVisible(true);
      // We can check localstorage to see if last session was completed.
      // But for simplicity, we just notify them to reupload.
      setSessionType('restore');
    } else {
      setIsVisible(false);
    }
  }, [needsReuploadFiles.length]);

  if (!isVisible || !sessionType) return null;

  const firstFile = needsReuploadFiles[0];
  const fileDesc = firstFile ? `${firstFile.name} (${(firstFile.size / 1024 / 1024).toFixed(1)}MB)` : '';

  const handleStartFresh = () => {
    setIsVisible(false);
    useDocStore.getState().clearAll();
  };

  return (
    <div className="bg-zinc-900 text-white px-4 py-3 text-sm flex items-start sm:items-center justify-between gap-4 animate-in slide-in-from-top-4 fade-in z-50 rounded-lg mx-6 mt-4 max-w-[1440px] xl:mx-auto shadow-sm">
      <div className="flex items-start sm:items-center gap-3">
        <Info size={16} className="text-zinc-400 mt-0.5 sm:mt-0 shrink-0" />
        <div>
          <span className="font-medium">Previous session restored.</span>{' '}
          <span className="text-zinc-300">
            Please re-upload your file{needsReuploadFiles.length > 1 ? 's' : ''} to continue. 
            {needsReuploadFiles.length === 1 && ` (Previously: ${fileDesc})`}
            {needsReuploadFiles.length > 1 && ` (${needsReuploadFiles.length} files previously loaded)`}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={handleStartFresh}
          className="text-xs font-medium bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded transition-colors whitespace-nowrap"
        >
          Start fresh
        </button>
        <button 
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
