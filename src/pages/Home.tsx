/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useDocStore} from '../store/useDocStore';
import UploadZone from '../components/UploadZone';
import FileQueue from '../components/FileQueue';
import ProcessorButton from '../components/ProcessorButton';
import ProcessingResults from '../components/ProcessingResults';
import ConfirmationPanel from '../components/ConfirmationPanel';
import RestoreBanner from '../components/RestoreBanner';
import ProcessingLoader from '../components/ProcessingLoader';
import { useBackgroundProcessor } from '../hooks/useBackgroundProcessor';
import { useSessionPersist } from '../hooks/useSessionPersist';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Clipboard, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const {requirementText, setRequirementText, files} = useDocStore();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleFileCompleted = () => {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    };

    window.addEventListener('pastedocs_file_completed', handleFileCompleted);
    return () => {
      window.removeEventListener('pastedocs_file_completed', handleFileCompleted);
    };
  }, []);
  
  // Initialize hooks
  useBackgroundProcessor();
  useSessionPersist();

  const hasFiles = files.length > 0;
  const isProcessing = files.some(f => f.status === 'processing');
  const hasResults = files.some(f => f.status === 'completed' || f.status === 'error');

  const faqData = [
    {
      "question": "How do I resize my photo for government portals?",
      "answer": "Simply copy the exact requirement text from any government or admission portal and paste it into PasteDocs. Whether you are filling out SSC CGL, banking exams, passport applications, or university forms, our tool automatically parses the text. It will instantly resize, compress, and reformat your uploaded photo or signature to meet those exact pixel and file size rules without manual editing."
    },
    {
      "question": "Is my data safe and private?",
      "answer": "Absolutely. PasteDocs is built with a strict privacy-first approach. We operate 100% locally on your device inside your browser. We never upload your personal documents, IDs (like PAN or Aadhaar), or photos to any external server. All document parsing, image cropping, and file compression happen entirely offline using your device's processing power."
    },
    {
      "question": "Can I compress a photo to exactly 50KB or 20KB?",
      "answer": "Yes. Just mention your maximum allowed file size in the requirements box (e.g., 'max 50kb' or 'under 20kb'). PasteDocs uses an advanced iterative compression engine that smartly adjusts the image quality step-by-step. This ensures your final document stays under the required KB limit while maintaining the highest possible visual clarity and sharp text."
    },
    {
      "question": "Does this tool work offline?",
      "answer": "Yes. After you load PasteDocs for the first time, our core engine is saved in your browser, allowing you to format documents even without an active internet connection."
    }
  ];

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to resize photo for any government portal in 2 seconds",
    "description": "Resize your passport photo or signature exactly according to government portal requirements without losing quality.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Upload Media",
        "text": "Drag and drop or select your photo, signature, or PDF file into the upload zone."
      },
      {
        "@type": "HowToStep",
        "name": "Paste Requirements",
        "text": "Copy the exact photo or document requirements (file size, dimensions, crop patterns, name/date, backdrop colors) from your official government notification and paste it in. PasteDocs automatically parses exact constraints in English, Hindi, and Gujarati."
      },
      {
        "@type": "HowToStep",
        "name": "Auto-Process and Download",
        "text": "Click Process Now. The tool will instantly resize and compress your file securely on your device."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://pastedocs.vercel.app/",
    "url": "https://pastedocs.vercel.app/",
    "name": "PasteDocs",
    "description": "100% private, browser-based tool to automatically resize and compress photos and documents for Indian government exams (NEET, JEE, UPSC) and portals.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  return (
    <>
      <Helmet>
        <title>PasteDocs - Online Photo & Signature Resizer for Government Exams</title>
        <meta name="description" content="Instantly resize photos and signatures for government portals. Supports requirements in English, Hindi, and Gujarati. 100% private, offline, and free document formatter." />
        <link rel="canonical" href="https://pastedocs.vercel.app/" />
        <meta property="og:title" content="PasteDocs - Online Photo & Signature Resizer for Government Exams" />
        <meta property="og:description" content="Instantly resize photos and signatures for government portals. Supports requirements in English, Hindi, and Gujarati. 100% private, offline, and free document formatter." />
        <meta property="og:url" content="https://pastedocs.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PasteDocs" />
        <script type="application/ld+json">
          {JSON.stringify(webAppSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <RestoreBanner />

      <ProcessingLoader isProcessing={isProcessing} />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16 pb-24">
        {!hasFiles ? (
          <section className="max-w-2xl mx-auto">
            <header className="text-center mt-4 sm:mt-8 mb-8">
              <div className="flex justify-center mb-4">
                <span className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 border border-zinc-200 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  English · हिंदी · ગુજરાતી supported
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-950 leading-tight mb-4">
                Any Document <span className="text-zinc-400">to Any Requirement</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-6">
                Paste the rules, we do the rest. Instantly format photos and IDs for any admission or government portal. 100% private, offline processing with zero server uploads. No account needed. <Link to="/about" className="text-emerald-600 hover:underline hover:underline-offset-4 transition-all duration-200 font-medium" aria-label="Read our privacy promise">Read our privacy promise</Link>
              </p>
            </header>
            <UploadZone />
          </section>
        ) : (
          <div className="flex flex-col gap-5 sm:gap-8 animate-in fade-in duration-500">
            {/* Top Row: 2-column grid for Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-start">
              {/* Left Column: Upload & Queue */}
              <aside className="flex flex-col gap-5 sm:gap-6">
                <section className="bg-white/80 backdrop-blur-xl rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 p-4 sm:p-8">
                  <UploadZone />
                </section>
                <section className="bg-white/80 backdrop-blur-xl rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 p-4 sm:p-8 relative overflow-hidden">
                  <FileQueue />
                </section>
              </aside>

              {/* Right Column: Requirements */}
              <article className="flex flex-col gap-5 sm:gap-6">
                 <section className="bg-white/80 backdrop-blur-xl rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 p-4 sm:p-8">
                  <h2 className="text-sm font-medium text-zinc-700 mb-4 px-1">Requirements</h2>
                  <div className="relative mb-4">
                    <textarea
                      className="w-full h-32 p-4 pt-4 pr-12 text-base text-zinc-900 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-100 focus:border-zinc-400 transition-all resize-none outline-none placeholder:text-zinc-400"
                      placeholder="e.g., 'Upload photo in JPG format, max 50KB, 200x200px'..."
                      value={requirementText}
                      onChange={(e) => setRequirementText(e.target.value)}
                      onFocus={(e) => {
                         // Ensure the textarea is nicely visible above the keyboard on mobile
                         setTimeout(() => {
                            e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                         }, 300);
                      }}
                      aria-label="Paste Document Requirements"
                    />
                    <div className="absolute top-2 right-2 flex flex-col gap-1.5">
                      <button
                        onClick={async () => {
                          try {
                            const text = await navigator.clipboard.readText();
                            setRequirementText(text);
                          } catch (err) {
                            console.error("Failed to read clipboard text: ", err);
                          }
                        }}
                        className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors flex items-center justify-center bg-transparent"
                        title="Paste"
                        aria-label="Paste from clipboard"
                      >
                        <Clipboard size={18} />
                      </button>
                      {requirementText && (
                        <button
                          onClick={() => setRequirementText('')}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center bg-transparent"
                          title="Reset"
                          aria-label="Clear requirements"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                  <ConfirmationPanel />
                  
                  {isProcessing ? (
                    <div className="mt-6 py-6 flex flex-col items-center justify-center text-center bg-gray-50/50 rounded-2xl border border-gray-100">
                      <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mb-3" aria-hidden="true"></div>
                      <h3 className="text-sm font-medium text-gray-900">Finalizing...</h3>
                    </div>
                  ) : (
                    <ProcessorButton />
                  )}
                </section>
              </article>
            </div>

            {/* Bottom Row: Finished Results */}
            {hasResults && (
              <div ref={resultsRef} className="w-full max-w-4xl mx-auto mt-4 animate-in fade-in duration-500">
                <section className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[1.5rem] sm:rounded-[2.2rem] border border-gray-100 p-4 sm:p-8">
                  <header className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Finished Results</h2>
                    <button
                      onClick={() => useDocStore.getState().clearAll()}
                      className="text-sm font-medium text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                      aria-label="Clear all finished results"
                    >
                      Clear All
                    </button>
                  </header>
                  <ProcessingResults />
                </section>
              </div>
            )}
            
          </div>
        )}
        
        {/* How to Use Section */}
        <section className="py-10 md:py-16 max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-zinc-950 mb-12 text-center tracking-tight">How to Use PasteDocs in 3 Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            
            {/* Step 1 */}
            <article className="flex flex-col gap-4 items-start group">
              <span className="text-5xl font-black text-zinc-900 leading-none select-none">1</span>
              <div>
                <h3 className="text-zinc-950 font-semibold text-lg mb-1.5">Upload your file</h3>
                <p className="text-zinc-500 leading-relaxed text-sm">Drag and drop or select your photo, signature, or PDF file into the upload zone.</p>
              </div>
            </article>

            {/* Step 2 */}
            <article className="flex flex-col gap-4 items-start group">
              <span className="text-5xl font-black text-zinc-900 leading-none select-none">2</span>
              <div>
                <h3 className="text-zinc-950 font-semibold text-lg mb-1.5 font-sans">Paste the requirement</h3>
                <p className="text-zinc-500 leading-relaxed text-sm">Copy the text from any government portal and paste it. We handle the rest automatically.</p>
              </div>
            </article>

            {/* Step 3 */}
            <article className="flex flex-col gap-4 items-start group">
              <span className="text-5xl font-black text-zinc-900 leading-none select-none">3</span>
              <div>
                <h3 className="text-zinc-950 font-semibold text-lg mb-1.5">Download your file</h3>
                <p className="text-zinc-500 leading-relaxed text-sm">Click Process Now and instantly download your perfectly resized and compressed file.</p>
              </div>
            </article>
          </div>
        </section>

        {/* Privacy Block Minimal Row */}
        <section className="py-10 md:py-16 max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
            <span className="text-2xl select-none" role="img" aria-label="Privacy">🔒</span>
            <div>
              <p className="text-sm font-semibold text-zinc-900">
                Your files never leave your device
              </p>
              <p className="text-xs text-zinc-500">
                PasteDocs runs entirely in your browser. No server uploads. No account. No tracking.
              </p>
            </div>
          </div>
        </section>

        {/* 🗺️ Supported Government Portals & Regional Documents Hub */}
        <section className="py-10 md:py-16 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[10px] sm:text-xs font-extrabold tracking-widest uppercase text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
              EXPLOCIT PORTAL MAPPINGS
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-950 tracking-tight mt-3 mb-2">
              Designed for Top Portals & Regional Docs
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm max-w-xl mx-auto">
              Our WebAssembly image compression engine matches the rules of various central registries, state services, and administrative certificate rules.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 hover:border-zinc-350 hover:shadow-sm transition-all duration-200 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-zinc-900 text-base mb-2">OJAS Gujarat (GPSC/GSSSB)</h3>
                <p className="text-sm text-zinc-550 leading-relaxed">
                  Avoid formatting rejection. Easily scales biometric photographs and signatures to exact OJAS dimensions (max 15KB/20KB).
                </p>
              </div>
              <div className="flex gap-1.5 mt-4 flex-wrap">
                <span className="bg-zinc-100 text-zinc-600 text-xs rounded-md px-2 py-0.5">GPSSB</span>
                <span className="bg-zinc-100 text-zinc-600 text-xs rounded-md px-2 py-0.5">OJAS Gujarat</span>
              </div>
            </div>

            <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 hover:border-zinc-350 hover:shadow-sm transition-all duration-200 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-zinc-900 text-base mb-2">SSC / IBPS / SBI PO</h3>
                <p className="text-sm text-zinc-550 leading-relaxed">
                  Matches standard bank exams requiring candidate background replacement, name/date timestamps, and custom KB capping under 50KB.
                </p>
              </div>
              <div className="flex gap-1.5 mt-4 flex-wrap">
                <span className="bg-zinc-100 text-zinc-600 text-xs rounded-md px-2 py-0.5">SSC CGL</span>
                <span className="bg-zinc-100 text-zinc-600 text-xs rounded-md px-2 py-0.5">IBPS PO</span>
              </div>
            </div>

            <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 hover:border-zinc-350 hover:shadow-sm transition-all duration-200 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-zinc-900 text-base mb-2">PAN Card & Aadhaar Portals</h3>
                <p className="text-sm text-zinc-550 leading-relaxed">
                  Compresses PAN ID documents, signatures, and PDFs exactly matching NSDL portals without transmitting private user telemetry.
                </p>
              </div>
              <div className="flex gap-1.5 mt-4 flex-wrap">
                <span className="bg-zinc-100 text-zinc-600 text-xs rounded-md px-2 py-0.5">NSDL / UTI</span>
                <span className="bg-zinc-100 text-zinc-600 text-xs rounded-md px-2 py-0.5">UIDAI</span>
              </div>
            </div>

            <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 hover:border-zinc-350 hover:shadow-sm transition-all duration-200 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-zinc-900 text-base mb-2">Income & Jati Praman</h3>
                <p className="text-sm text-zinc-550 leading-relaxed">
                  Support for regional custom documents such as Income Certificates (આવકનો દાખલો) and Jati Praman (जाति प्रमाण पत्र) to exact size limits.
                </p>
              </div>
              <div className="flex gap-1.5 mt-4 flex-wrap">
                <span className="bg-zinc-100 text-zinc-600 text-xs rounded-md px-2 py-0.5">જાતિ પ્રમાણપત્ર</span>
                <span className="bg-zinc-100 text-zinc-600 text-xs rounded-md px-2 py-0.5">Income Certificate</span>
              </div>
            </div>

            <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 hover:border-zinc-350 hover:shadow-sm transition-all duration-200 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-zinc-900 text-base mb-2">Land Records & 7/12 Records</h3>
                <p className="text-sm text-zinc-550 leading-relaxed">
                  Easily size down scanned images or high resolution photos of 7/12 land records (७/१२) or local registry PDFs to under 100KB/200KB.
                </p>
              </div>
              <div className="flex gap-1.5 mt-4 flex-wrap">
                <span className="bg-zinc-100 text-zinc-600 text-xs rounded-md px-2 py-0.5">७/१२ उतारा</span>
                <span className="bg-zinc-100 text-zinc-600 text-xs rounded-md px-2 py-0.5">Anubandh</span>
              </div>
            </div>

            <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 hover:border-zinc-350 hover:shadow-sm transition-all duration-200 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-zinc-900 text-base mb-2">RTO / Sarathi Uploads</h3>
                <p className="text-sm text-zinc-550 leading-relaxed">
                  Quickly resize scanned Learner/Driving License documents with plain signatures for immediate upload success through web portals.
                </p>
              </div>
              <div className="flex gap-1.5 mt-4 flex-wrap">
                <span className="bg-zinc-100 text-zinc-600 text-xs rounded-md px-2 py-0.5">Driving License</span>
                <span className="bg-zinc-100 text-zinc-600 text-xs rounded-md px-2 py-0.5">RTO Sarathi</span>
              </div>
            </div>
          </div>
        </section>

        {/* SEO FAQ Section */}
        <section className="py-10 md:py-16 max-w-[640px] mx-auto">
          <h2 className="text-2xl font-bold text-zinc-950 mb-8 text-center tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = expandedFaqIndex === index;
              return (
                <article key={index} className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden transition-all duration-200">
                  <button
                    onClick={() => setExpandedFaqIndex(isOpen ? null : index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-zinc-900 hover:text-zinc-950 focus:outline-none focus:bg-zinc-50/50 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold leading-snug">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-zinc-900' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-5 pt-1 border-t border-zinc-50">
                          <p className="text-sm text-zinc-500 leading-relaxed font-normal">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
