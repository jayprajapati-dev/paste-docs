import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Shield, Zap, Smartphone } from 'lucide-react';
import { ALL_DOCUMENTS } from '../data/documentData';
import UploadZone from '../components/UploadZone';
import FileQueue from '../components/FileQueue';
import ProcessorButton from '../components/ProcessorButton';
import ProcessingResults from '../components/ProcessingResults';
import ConfirmationPanel from '../components/ConfirmationPanel';
import ProcessingLoader from '../components/ProcessingLoader';
import { useBackgroundProcessor } from '../hooks/useBackgroundProcessor';
import { useSessionPersist } from '../hooks/useSessionPersist';
import { useDocStore } from '../store/useDocStore';
import { useEffect, useState } from 'react';

export default function DocTemplate() {
  const { slug } = useParams();
  const { setRequirementText, files } = useDocStore();

  // Register engine hooks so that file processing actually executes on this page
  useBackgroundProcessor();
  useSessionPersist();

  const doc = ALL_DOCUMENTS.find(d => d.slug === slug);

  const [activeTab, setActiveTab] = useState<'photo' | 'signature'>('photo');

  // Load target guidelines into the browser's processing NLP engine
  useEffect(() => {
    if (!doc) return;
    let spec: { width?: number; height?: number; minKB?: number; maxKB?: number; format?: string; background?: string } = doc.photo;
    if (activeTab === 'signature' && doc.signature) spec = doc.signature;

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
  }, [doc, activeTab, setRequirementText]);

  if (!doc) {
    return <Navigate to="/404" replace />;
  }

  const hasFiles = files.length > 0;
  const isProcessing = files.some(f => f.status === 'processing');
  const hasResults = files.some(f => f.status === 'completed' || f.status === 'error');

  // Generate requirement spec string for view
  const photoSpecText = doc.photo ? `Photo: ${doc.photo.width ? `${doc.photo.width}x${doc.photo.height}px` : ''} (${doc.photo.maxKB ? `Max ${doc.photo.maxKB}KB` : 'Standard size'}, ${doc.photo.format || 'JPG'})` : '';
  const signatureSpecText = doc.signature ? `Signature: ${doc.signature.width}x${doc.signature.height}px (Max ${doc.signature.maxKB}KB)` : '';

  const bulletSpecs = [photoSpecText, signatureSpecText].filter(Boolean).join(' • ');

  // Dynamic SEO copy
  const metaTitle = `Resize and Format ${doc.name} Online Free | PasteDocs`;
  const metaDescription = `Resize, compress, and re-format photos and scanned files for ${doc.name} applications. Complies with requirements: ${bulletSpecs}. 100% secure off-server browser conversion.`;
  const h1 = `Format your ${doc.name} Photo or Scan Instantly`;
  const content = `Preparing files for ${doc.name} requirements calls for compliant file sizing. Uploading items like scanned identity cards, passport pictures, signatures, or multi-page marksheets requires matching specific dimension boundaries or file size KB caps.\n\nOur local engine validates documents on your browser. Images are cropped with focus grids, saved with high contrast, and iteratively compressed to keep file sizes within official limits. All data stays offline on your own device for 100% privacy.`;

  const faq = [
    {
      question: `What are the official digital upload requirements for ${doc.name}?`,
      answer: doc.photo && doc.photo.width 
        ? `For ${doc.name}, the photograph must measure exactly ${doc.photo.width}x${doc.photo.height} pixels, formatted as a ${doc.photo.format || 'JPEG'} file ${doc.photo.maxKB ? `and compressed strictly under ${doc.photo.maxKB}KB` : ''}.`
        : `Files for ${doc.name} are expected to comply with official government formatting guidelines. Signatures and passport copies should be clear, cropped correctly, and kept under standard KB sizes.`
    },
    {
      question: `How does PasteDocs ensure my private document's security?`,
      answer: `All conversions and compressions execute locally inside your browser's memory. We do not transmit or save any personal photographs or files on our server infrastructure, rendering PasteDocs 100% private and safe.`
    },
    {
      question: `What should I do if my scanned document's file size is too big?`,
      answer: `Just drop your files in our crop zone above. The automated processor trims layout excess and scales down resolution recursively to match the optimized KB size.`
    }
  ];

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`https://pastedocs.vercel.app/doc/${doc.slug}`} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={`https://pastedocs.vercel.app/doc/${doc.slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PasteDocs" />
        <meta name="keywords" content={`${doc.name} crop, ${doc.name} resize, identity document format maker`} />
      </Helmet>

      {/* Hero Section */}
      <div className="pt-16 md:pt-24 pb-16">
        <div className="w-full max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-widest mb-6 border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Free • Offline Engine • No Registration Needed
            </div>
            
            <h1 className="text-[clamp(1.875rem,5vw,3.5rem)] font-extrabold tracking-tight text-zinc-950 mb-6 leading-tight max-w-4xl mx-auto">
              {h1}
            </h1>
            
            <p className="text-sm sm:text-base text-zinc-500 max-w-[640px] mx-auto mb-10 leading-relaxed">
              We've pre-loaded the core specifications for {doc.name}. Upload your document and get a perfectly formatted copy in one click.
            </p>

            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm font-semibold text-zinc-500 mb-12">
              <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-500" /> Documents never touch any servers</div>
              <div className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-emerald-500" /> Fits mobile and touch screens</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-emerald-500" /> Local real-time generation</div>
            </div>

            {doc.signature && (
              <div className="flex justify-center gap-2 mb-8 max-w-xs mx-auto">
                <button
                  onClick={() => setActiveTab('photo')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${activeTab === 'photo' ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm' : 'bg-white text-zinc-640 border-zinc-200 hover:border-zinc-400'}`}
                >
                  Photo Upload Rules
                </button>
                <button
                  onClick={() => setActiveTab('signature')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${activeTab === 'signature' ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm' : 'bg-white text-zinc-640 border-zinc-200 hover:border-zinc-400'}`}
                >
                  Signature Rules
                </button>
              </div>
            )}
          </div>

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
                 {doc.name} guidelines: <span className="font-bold text-zinc-900">{bulletSpecs || 'Complies with official standards'}</span> — Configured Automatically ✓
               </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[640px] mx-auto px-6 py-16">
        <article className="prose prose-lg prose-gray max-w-none mb-16">
          <h2 className="text-[1.5rem] md:text-[1.75rem] font-bold text-zinc-950 mb-6 tracking-tight">About {doc.name} Upload Rules</h2>
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
