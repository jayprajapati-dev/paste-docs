import { useState, useEffect } from 'react';
import { useDocStore } from '../store/useDocStore';

const COPY_OPTIONS = [
  "Format documents securely and offline. Install PasteDocs to your home screen for instant access.",
  "Never struggle with form uploads again. Save PasteDocs to your phone for 1-click resizing.",
  "Keep PasteDocs handy. Compress and format any ID or photo instantly, without internet."
];

export default function PWAPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [copyText, setCopyText] = useState(COPY_OPTIONS[0]);
  const [isDismissed, setIsDismissed] = useState(() => {
    return localStorage.getItem('pwaprompt_dismissed') === 'true';
  });
  const { files } = useDocStore();
  
  const processedCount = files.filter(f => f.status === 'completed').length;

  useEffect(() => {
    setCopyText(COPY_OPTIONS[Math.floor(Math.random() * COPY_OPTIONS.length)]);
  }, []);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  useEffect(() => {
    // Smart Trigger Logic: Wait a few seconds after a document is processed
    // so it doesn't feel spammy or abrupt to the user.
    let timer: NodeJS.Timeout;
    if (processedCount > 0 && deferredPrompt && !isDismissed) {
      timer = setTimeout(() => {
        setShowPrompt(true);
      }, 2500); 
    }
    return () => clearTimeout(timer);
  }, [processedCount, deferredPrompt, isDismissed]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
      setIsDismissed(true); // Don't show again if they accepted or installed
      localStorage.setItem('pwaprompt_dismissed', 'true');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('pwaprompt_dismissed', 'true');
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[380px] bg-white rounded-2xl shadow-md border border-gray-100 p-4 z-50 animate-in slide-in-from-top-10 fade-in duration-500">
      <div className="flex items-start gap-4">
        {/* App Icon Area */}
        <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center shrink-0 shadow-sm mt-0.5">
          <img src="/favicon.svg" alt="PasteDocs" className="w-6 h-6 opacity-80" />
        </div>
        
        {/* Text and Actions */}
        <div className="flex-1 pr-1">
          <h4 className="font-semibold text-gray-900 text-[15px]">Install PasteDocs</h4>
          <p className="text-[13px] text-gray-600 mt-1 leading-snug">
            {copyText}
          </p>
          <div className="flex items-center gap-3 mt-4">
            <button 
              onClick={handleInstallClick}
              className="bg-black text-white text-[13px] font-semibold px-5 py-2 rounded-xl hover:bg-gray-800 active:scale-95 transition-all shadow-sm"
            >
              Install App
            </button>
            <button 
              onClick={handleDismiss} 
              className="text-gray-500 hover:text-gray-800 text-[13px] font-medium px-2 py-2 transition-colors"
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
