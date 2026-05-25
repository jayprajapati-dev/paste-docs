import { useState, useEffect } from 'react';

interface ProcessingLoaderProps {
  isProcessing: boolean;
}

export default function ProcessingLoader({ isProcessing }: ProcessingLoaderProps) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (!isProcessing) {
      setShouldShow(false);
      return;
    }

    // Zero-Latency Rule: Only show loader if processing takes longer than 100ms
    const timer = setTimeout(() => {
      setShouldShow(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [isProcessing]);

  if (!shouldShow || !isProcessing) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-sm bg-white/70 animate-in fade-in duration-300"
      id="processing-loader-overlay"
    >
      <style>{`
        @keyframes scanSweep {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        @keyframes dotBlink {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-scan-sweep {
          animation: scanSweep 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .dot-blink-1 {
          animation: dotBlink 1.4s infinite;
        }
        .dot-blink-2 {
          animation: dotBlink 1.4s infinite 0.2s;
        }
        .dot-blink-3 {
          animation: dotBlink 1.4s infinite 0.4s;
        }
      `}</style>

      {/* Sleek Scanner Box */}
      <div className="flex flex-col items-center gap-6 max-w-xs w-full text-center">
        {/* Document Frame */}
        <div 
          id="mock-document-frame"
          className="w-44 h-60 rounded-2xl border border-zinc-200 bg-zinc-50/95 relative overflow-hidden flex flex-col p-5 shadow-2xl ring-1 ring-black/5"
        >
          {/* Mock Document Design Elements to establish a highly polished visual */}
          <div className="flex gap-3 items-center mb-6">
            <div className="w-10 h-10 rounded-lg bg-zinc-200/80 shrink-0" />
            <div className="flex flex-col gap-1.5 w-full">
              <div className="h-2.5 bg-zinc-200/80 rounded w-16" />
              <div className="h-2 bg-zinc-200/60 rounded w-12" />
            </div>
          </div>

          <div className="space-y-2 mt-2">
            <div className="h-1.5 bg-zinc-200/70 rounded w-full" />
            <div className="h-1.5 bg-zinc-200/70 rounded w-full" />
            <div className="h-1.5 bg-zinc-200/70 rounded w-4/5" />
          </div>

          <div className="mt-auto pt-4 border-t border-dashed border-zinc-200/80">
            <div className="h-4 bg-zinc-200/80 rounded w-12 mx-auto" />
          </div>

          {/* Glowing Laser Scanner Line */}
          <div className="absolute left-0 right-0 h-1 bg-emerald-500 shadow-[0_0_15px_3px_#10b981] animate-scan-sweep pointer-events-none" />
        </div>

        {/* Dynamic Text Section */}
        <div className="space-y-1">
          <p className="font-semibold text-zinc-900 text-base flex items-center justify-center gap-0.5 tracking-tight">
            <span>Processing locally</span>
            <span className="inline-flex w-6 text-left">
              <span className="dot-blink-1">.</span>
              <span className="dot-blink-2">.</span>
              <span className="dot-blink-3">.</span>
            </span>
          </p>
          <p className="text-xs text-zinc-500 font-medium">
            Strictly browser-based. Zero file uploads.
          </p>
        </div>
      </div>
    </div>
  );
}
