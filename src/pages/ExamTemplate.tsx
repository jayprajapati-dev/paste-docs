import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, Shield, Zap, Smartphone, ChevronRight } from 'lucide-react';
import { ALL_EXAMS } from '../data/examData';
import UploadZone from '../components/UploadZone';
import DocStoreInitializer from '../components/DocStoreInitializer';
import FileQueue from '../components/FileQueue';
import ProcessorButton from '../components/ProcessorButton';
import ProcessingResults from '../components/ProcessingResults';
import ConfirmationPanel from '../components/ConfirmationPanel';
import ProcessingLoader from '../components/ProcessingLoader';
import { useBackgroundProcessor } from '../hooks/useBackgroundProcessor';
import { useSessionPersist } from '../hooks/useSessionPersist';
import { useDocStore } from '../store/useDocStore';
import { useEffect, useState } from 'react';

interface ExamTemplateProps {
  slugOverride?: string;
}

export default function ExamTemplate({ slugOverride }: ExamTemplateProps = {}) {
  const { slug: routeSlug } = useParams();
  const slug = slugOverride || routeSlug;
  const { setRequirementText, files } = useDocStore();
  
  // Register engine hooks so that file processing actually executes on this page
  useBackgroundProcessor();
  useSessionPersist();

  const exam = ALL_EXAMS.find(e => e.slug === slug);

  const [activeTab, setActiveTab] = useState<'photo' | 'signature' | 'postcard'>('photo');

  // Load the target requirement into NLP parsing state
  useEffect(() => {
    if (!exam) return;
    let spec: { width?: number; height?: number; minKB?: number; maxKB?: number; format?: string; background?: string } = exam.photo;
    if (activeTab === 'signature' && exam.signature) spec = exam.signature;
    if (activeTab === 'postcard' && exam.postcard) spec = exam.postcard;

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
  }, [exam, activeTab, setRequirementText]);

  if (!exam) {
    return <Navigate to="/404" replace />;
  }

  const hasFiles = files.length > 0;
  const isProcessing = files.some(f => f.status === 'processing');
  const hasResults = files.some(f => f.status === 'completed' || f.status === 'error');

  // Generate dynamic requirements text block for display
  const photoSpecText = `Photo: ${exam.photo.width}x${exam.photo.height}px (${exam.photo.minKB ? `${exam.photo.minKB}-` : ''}${exam.photo.maxKB}KB, ${exam.photo.background || 'white'} bg)`;
  const signatureSpecText = exam.signature ? `Signature: ${exam.signature.width}x${exam.signature.height}px (${exam.signature.minKB ? `${exam.signature.minKB}-` : ''}${exam.signature.maxKB}KB)` : '';
  const postcardSpecText = exam.postcard ? `Postcard: ${exam.postcard.width}x${exam.postcard.height}px (${exam.postcard.minKB ? `${exam.postcard.minKB}-` : ''}${exam.postcard.maxKB}KB)` : '';

  const bulletSpecs = [photoSpecText, signatureSpecText, postcardSpecText].filter(Boolean).join(' • ');

  // Dynamic SEO copy fallbacks
  const metaTitle = `Resize ${exam.name} Photo & Signature Online Free | PasteDocs`;
  const metaDescription = `Resize and compress photographs for ${exam.name} organized by ${exam.authority}. Custom fits specifications: ${bulletSpecs}. 100% browser-secure offline crop and format reduction.`;
  const h1 = `Resize & Format Your ${exam.name} Photo and Scanned Signature`;
  const content = `Applying for the ${exam.name} organized by the ${exam.authority} requires strict conformity to standard document upload parameters. Any slight mistake in candidate photograph resolution, crop margins, signature dimensions, background tint, or file size (KB limit) can lead to instant rejections on the portal.\n\nUsing our advanced local engine, you can fit your files to these exact parameters without manual calculations. All image scaling, cropping, background adjustments, and iterative compression to ${exam.photo.maxKB}KB happen entirely inside your web browser. No personal documents are ever submitted to external servers, providing 100% private offline-capable processing.`;

  const faq = [
    {
      question: `What are the official photo specifications for ${exam.name}?`,
      answer: `For ${exam.name}, your passport photograph must be in JPEG/JPG format with dimensions of exactly ${exam.photo.width} x ${exam.photo.height} pixels, and a file size between ${exam.photo.minKB || 10}KB and ${exam.photo.maxKB}KB on a plain ${exam.photo.background || 'white'} background.`
    },
    ...(exam.signature ? [{
      question: `What is the correct signature size and format for ${exam.name}?`,
      answer: `Your scanned signature must be in JPEG/JPG format, measuring exactly ${exam.signature.width} x ${exam.signature.height} pixels, and keeping file size strictly within the ${exam.signature.minKB || 5}KB to ${exam.signature.maxKB}KB range.`
    }] : []),
    {
      question: `Why does the ${exam.authority} portal throw 'Invalid File Format / Size' errors?`,
      answer: `Government application portals run computerized validation scripts on uploaded files. If your smartphone camera produces a file larger than ${exam.photo.maxKB}KB, or your crop proportions do not match the expected aspect ratio, validation will fail. Our tool fixes both issues instantly on your device.`
    },
    {
      question: `Is it safe to upload my personal signature and picture here?`,
      answer: `Yes, completely secure. PasteDocs executes all photo conversions, canvas padding, and background color edits locally on your own computer or phonen. Since no data leaves your browser, your absolute privacy is guaranteed.`
    }
  ];

  const relatedPages = [
    { name: "NEET UG 2026", url: "/exam/neet-ug" },
    { name: "JEE Main 2026", url: "/exam/jee-main" },
    { name: "UPSC Civil Services 2026", url: "/exam/upsc-cse" },
    { name: "White Background Resizer", url: "/tool/white-background" },
  ].filter(p => p.url !== `/exam/${slug}`);

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`https://pastedocs.vercel.app/exam/${exam.slug}`} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={`https://pastedocs.vercel.app/exam/${exam.slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PasteDocs" />
        <meta name="keywords" content={`${exam.name} photo resize, ${exam.name} signature, ${exam.authority} form formatting`} />
      </Helmet>

      {/* Hero Section */}
      <div className="pt-16 md:pt-24 pb-16">
        <div className="w-full max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-widest mb-6 border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Free • No Registration • Runs locally offline
            </div>
            
            {/* Headline */}
            <h1 className="text-[clamp(1.875rem,5vw,3.5rem)] font-extrabold tracking-tight text-zinc-950 mb-6 leading-tight max-w-4xl mx-auto">
              {h1}
            </h1>
            
            {/* Subheadline */}
            <p className="text-sm sm:text-base text-zinc-500 max-w-[640px] mx-auto mb-10 leading-relaxed">
              We've pre-loaded the authentic {exam.name} guidelines. Upload your document and let our browser processor handle the rest.
            </p>

            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm font-semibold text-zinc-500 mb-12">
              <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-500" /> Files never leave your device</div>
              <div className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-emerald-500" /> Fully mobile and tablet responsive</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-emerald-500" /> Instant browser-side resizing</div>
            </div>

            {/* Spec Sub-Selector Tab switcher */}
            {(exam.signature || exam.postcard) && (
              <div className="flex justify-center flex-wrap gap-2 mb-8 max-w-md mx-auto">
                <button
                  onClick={() => setActiveTab('photo')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${activeTab === 'photo' ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm' : 'bg-white text-zinc-640 border-zinc-200 hover:border-zinc-400'}`}
                >
                  Passport Photo Spec
                </button>
                {exam.signature && (
                  <button
                    onClick={() => setActiveTab('signature')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${activeTab === 'signature' ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm' : 'bg-white text-zinc-640 border-zinc-200 hover:border-zinc-400'}`}
                  >
                    Signature Spec
                  </button>
                )}
                {exam.postcard && (
                  <button
                    onClick={() => setActiveTab('postcard')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${activeTab === 'postcard' ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm' : 'bg-white text-zinc-640 border-zinc-200 hover:border-zinc-400'}`}
                  >
                    Postcard (4x6) Spec
                  </button>
                )}
              </div>
            )}
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
                 Active Target Rules: <span className="font-bold text-zinc-900">{bulletSpecs}</span> — Configured Automatically ✓
               </p>
               {exam.special && (
                 <p className="mt-3 text-xs font-semibold text-amber-700 bg-amber-50 inline-block px-4 py-2 rounded-xl border border-amber-100 max-w-md">
                   ⚠️ <strong className="font-bold">Special Note:</strong> {exam.special}
                 </p>
               )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[640px] mx-auto px-6 py-16">
        <article className="prose prose-lg prose-gray max-w-none mb-16">
          <h2 className="text-[1.5rem] md:text-[1.75rem] font-bold text-zinc-950 mb-6 tracking-tight">About {exam.name} Document Upload Rules</h2>
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

        {/* Related Pages */}
        <div className="mt-16 bg-zinc-50/50 rounded-2xl p-8 border border-zinc-200">
           <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-500 mb-6">Also useful for:</h3>
           <div className="flex flex-wrap gap-2">
             {relatedPages.map((page, i) => (
               <Link key={i} to={page.url} className="px-4 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 hover:text-zinc-950 hover:border-zinc-400 transition-all shadow-sm">
                 {page.name}
               </Link>
             ))}
           </div>
        </div>
      </div>

      <ProcessingLoader isProcessing={isProcessing} />
    </>
  );
}
