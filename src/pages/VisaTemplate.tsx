import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Shield, Zap, Smartphone } from 'lucide-react';
import { ALL_VISAS } from '../data/visaData';
import UploadZone from '../components/UploadZone';
import FileQueue from '../components/FileQueue';
import ProcessorButton from '../components/ProcessorButton';
import ProcessingResults from '../components/ProcessingResults';
import ConfirmationPanel from '../components/ConfirmationPanel';
import ProcessingLoader from '../components/ProcessingLoader';
import { useBackgroundProcessor } from '../hooks/useBackgroundProcessor';
import { useSessionPersist } from '../hooks/useSessionPersist';
import { useDocStore } from '../store/useDocStore';
import { useEffect } from 'react';

export default function VisaTemplate() {
  const { slug } = useParams();
  const { setRequirementText, files } = useDocStore();

  // Register engine hooks so that file processing actually executes on this page
  useBackgroundProcessor();
  useSessionPersist();

  const visa = ALL_VISAS.find(v => v.slug === slug);

  // Load target guidelines into the browser's processing NLP engine
  useEffect(() => {
    if (!visa) return;
    const spec = visa.photo;

    if (spec) {
      const parts: string[] = [];
      if (spec.format) {
        parts.push(`format: to ${spec.format === 'jpeg' ? 'jpg' : spec.format}`);
      }
      if (spec.width && spec.height) {
        parts.push(`dimensions: ${spec.width}x${spec.height} px`);
      }
      if (spec.maxKB) {
        if (spec.minKB) {
          parts.push(`size: ${spec.minKB}KB to ${spec.maxKB}KB`);
        } else {
          parts.push(`size: max ${spec.maxKB}KB`);
        }
      }
      if (spec.background) {
        parts.push(`background: plain ${spec.background} background`);
      }
      setRequirementText(parts.join(', '));
    }
  }, [visa, setRequirementText]);

  if (!visa) {
    return <Navigate to="/404" replace />;
  }

  const hasFiles = files.length > 0;
  const isProcessing = files.some(f => f.status === 'processing');
  const hasResults = files.some(f => f.status === 'completed' || f.status === 'error');

  // Generate dynamic requirements text block for display
  const bulletSpecs = `${visa.photo.width}x${visa.photo.height}px (${visa.photo.minKB ? `${visa.photo.minKB}-` : ''}${visa.photo.maxKB}KB, ${visa.photo.background || 'white'} bg)`;

  // Dynamic SEO copy details
  const metaTitle = `Resize Visa Photo for ${visa.country} Online Free | PasteDocs`;
  const metaDescription = `Resize, format, and compress your photograph to match official visa specifications for ${visa.country} (${bulletSpecs}). 100% browser-safe offline crop and background configuration.`;
  const h1 = `Resize Your Visa Photo for ${visa.country} Online`;
  const content = `Applying for a passport or visa to visit ${visa.country} requires submitting biometric photos that match rigorous verification guidelines. Embassies and online portals utilize strict automated software programs to check image sizes, aspect ratios, eye alignment, and background colors to prevent validation rejections.\n\nWith our direct browser-based resizer, you can format your picture smoothly. No files are uploaded to any server, keeping your biometrics completely secure and private. The iterative resizing engine matches the exact pixel layout while preserving maximum face detail.`;

  const faq = [
    {
      question: `What is the official visa photo size for ${visa.country}?`,
      answer: `The biometric requirements for ${visa.country} visa photos are ${visa.photo.width}x${visa.photo.height} pixels (or equivalent scale), stored as a JPEG/JPG layout, with file size between ${visa.photo.minKB || 10}KB and ${visa.photo.maxKB}KB on a plain ${visa.photo.background || 'white'} background.`
    },
    {
      question: `Should I use white or grey background for my ${visa.country} application?`,
      answer: `Our system is pre-configured for the official standard: plain ${visa.photo.background || 'white'} backdrop. You can crop your smartphone selfie against any plain background, and our processor will align and wrap it correctly.`
    },
    {
      question: `Are my private photos and papers kept safe?`,
      answer: `Completely. All face-cropping, rotation, resizing, and iterative high-fidelity compressions take place directly inside your device's browser memory (Client-side offline conversion). Zero files are processed or hosted on our server assets.`
    }
  ];

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`https://pastedocs.vercel.app/visa/${visa.slug}`} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={`https://pastedocs.vercel.app/visa/${visa.slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PasteDocs" />
        <meta name="keywords" content={`${visa.country} visa photo, travel photo resize, browser biometric crop`} />
      </Helmet>

      {/* Hero Section */}
      <div className="pt-16 md:pt-24 pb-16">
        <div className="w-full max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-widest mb-6 border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Free • Secure Offline Engine • Works on Any Device
            </div>
            
            {/* Headline */}
            <h1 className="text-[clamp(1.875rem,5vw,3.5rem)] font-extrabold tracking-tight text-zinc-950 mb-6 leading-tight max-w-4xl mx-auto">
              {h1}
            </h1>
            
            {/* Subheadline */}
            <p className="text-sm sm:text-base text-zinc-500 max-w-[640px] mx-auto mb-10 leading-relaxed">
              We've pre-configured the authentic passport & visa specifications for {visa.country} ({visa.category}). Just upload your file below.
            </p>

            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm font-semibold text-zinc-500 mb-12">
              <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-500" /> Secure local execution inside browser</div>
              <div className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-emerald-500" /> Compatible with iOS, Android, and PC</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-emerald-500" /> Instant quality-optimized compression</div>
            </div>
          </div>

          {/* Tool Embedded with pre-filled string */}
          <div className="w-full max-w-[640px] mx-auto relative z-10">
            <UploadZone />
            
            {hasFiles && (
              <div className="mt-8 flex flex-col gap-6 border-t border-zinc-100 pt-6 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm text-left">
                <FileQueue />
                <ConfirmationPanel />
                {isProcessing ? (
                  <div className="py-10 flex flex-col items-center justify-center text-center bg-zinc-50 rounded-2xl border border-dashed border-zinc-250 animate-pulse w-full">
                    <div className="relative flex items-center justify-center w-12 h-12 mb-4">
                      <div className="absolute w-12 h-12 border-4 border-zinc-100 rounded-full"></div>
                      <div className="absolute w-12 h-12 border-4 border-t-zinc-900 border-r-zinc-900 rounded-full animate-spin"></div>
                    </div>
                    <h3 className="text-sm font-semibold text-zinc-900 tracking-tight flex items-center justify-center gap-0.5">
                      <span>Processing locally</span>
                      <span className="inline-flex w-5 text-left animate-pulse">...</span>
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 font-medium">
                      Strictly browser-based. Zero file uploads
                    </p>
                  </div>
                ) : (
                  <ProcessorButton />
                )}
              </div>
            )}

            {hasResults && (
              <div className="mt-8 bg-white shadow-xl rounded-[1.5rem] border border-zinc-200/80 p-6 text-left">
                <header className="flex items-center justify-between mb-6">
                  <h2 className="text-base font-bold text-zinc-900">Finished Results</h2>
                  <button
                    onClick={() => useDocStore.getState().clearAll()}
                    className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Clear All
                  </button>
                </header>
                <ProcessingResults />
              </div>
            )}

            <div className="mt-8 text-center">
               <p className="text-xs sm:text-sm font-semibold text-zinc-500 bg-zinc-100/50 inline-block px-4 py-2.5 rounded-xl border border-zinc-200">
                 {visa.country} Visa Rules: <span className="font-bold text-zinc-900">{bulletSpecs}</span> — Configured Automatically ✓
               </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[640px] mx-auto px-6 py-16">
        <article className="prose prose-lg prose-gray max-w-none mb-16">
          <h2 className="text-[1.5rem] md:text-[1.75rem] font-bold text-zinc-950 mb-6 tracking-tight">About {visa.country} Photo Submissions</h2>
          <div className="text-base text-zinc-500 leading-relaxed whitespace-pre-line">
            {content}
          </div>
        </article>

        <h2 className="text-[1.5rem] md:text-[1.75rem] font-bold text-zinc-950 mb-8 tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faq.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-sm">
              <h3 className="text-sm font-bold text-zinc-900 mb-2">{item.question}</h3>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-semibold">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <ProcessingLoader isProcessing={isProcessing} />
    </>
  );
}
