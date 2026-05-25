import { useState, useEffect } from 'react';
import { generateThumbnail } from '../lib/thumbnail';
import { File as FileIcon } from 'lucide-react';

export default function FileThumbnail({ file, className = '' }: { file: File | Blob; className?: string }) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    let urlToRevoke: string | null = null;

    if (file instanceof File) {
      generateThumbnail(file)
        .then((result) => {
          if (isActive && result.url) {
            setThumbnailUrl(result.url);
            urlToRevoke = result.url;
          } else if (result.url) {
            URL.revokeObjectURL(result.url);
          }
        })
        .catch(console.error);
    } else {
      const url = URL.createObjectURL(file);
      setThumbnailUrl(url);
      urlToRevoke = url;
    }

    return () => {
      isActive = false;
      if (urlToRevoke) {
        URL.revokeObjectURL(urlToRevoke);
      }
    };
  }, [file]);

  if (!thumbnailUrl) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <FileIcon className="text-gray-300" size={24} />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden flex items-center justify-center bg-gray-50 ${className}`}>
      <img src={thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover" />
    </div>
  );
}
