import { useState } from 'react';
import { useDocStore } from '../store/useDocStore';
import { Download, Loader2, AlertCircle } from 'lucide-react';
import JSZip from 'jszip';

export default function BulkDownload() {
  const { files } = useDocStore();
  const [isZipping, setIsZipping] = useState(false);
  const [zipError, setZipError] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);

  const completedFiles = files.filter(f => f.status === 'completed' && f.processedFile);

  if (completedFiles.length < 1) return null;

  const handleDownloadAll = async () => {
    setIsZipping(true);
    setZipError(null);
    setProgress({ current: 0, total: completedFiles.length });
    
    try {
      const zip = new JSZip();
      
      completedFiles.forEach((f, idx) => {
        const fileData = f.processedFile as Blob;
        const fileName = (fileData as File).name || `ready_${f.name}`;
        // Ensure unique filenames inside the zip
        const finalName = completedFiles.filter(cf => 
            ((cf.processedFile as File)?.name || `ready_${cf.name}`) === fileName
        ).length > 1 ? `${idx}_${fileName}` : fileName;
        
        zip.file(finalName, fileData);
        setProgress({ current: idx + 1, total: completedFiles.length });
      });

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      
      const dateStr = new Date().toISOString().split('T')[0];
      const zipName = `PasteDocs_${dateStr}_${completedFiles.length}files.zip`;
      
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = zipName;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to create ZIP', err);
      setZipError('Failed to generate ZIP archive. Please download files individually or try again.');
    } finally {
      setIsZipping(false);
      setProgress(null);
    }
  };

  return (
    <div className="mt-8 border-t border-gray-200/50 pt-8 flex flex-col items-center animate-in fade-in">
      <h3 className="text-lg font-semibold text-zinc-950 mb-4 tracking-tight">All files processed successfully</h3>
      <button
        onClick={handleDownloadAll}
        disabled={isZipping}
        className="w-full md:w-auto px-8 py-3 bg-zinc-950 text-white text-sm font-semibold rounded-xl hover:bg-zinc-800 transition-all duration-150 ease-in-out flex items-center justify-center gap-2.5 disabled:bg-zinc-300 disabled:text-zinc-500"
      >
        {isZipping ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Creating ZIP ({progress?.current}/{progress?.total})...
          </>
        ) : (
          <>
            <Download size={18} strokeWidth={2.5} />
            Download All as ZIP
          </>
        )}
      </button>
      {zipError && (
        <div className="mt-3 text-sm font-semibold text-red-500 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
          <AlertCircle size={15} /> {zipError}
        </div>
      )}
    </div>
  );
}
