import { Helmet } from 'react-helmet-async';

export default function Contact() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "PasteDocs",
      "url": "https://pastedocs.vercel.app",
      "applicationCategory": "UtilityApplication",
      "author": {
        "@type": "Person",
        "name": "Jay Prajapati"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | PasteDocs Support & Feedback</title>
        <meta name="description" content="Reach out to PasteDocs founder Jay Prajapati. Report bugs or request portal features. Remember: we operate with 100% Client-Side WebAssembly data isolation." />
        <link rel="canonical" href="https://pastedocs.vercel.app/contact" />
        <meta property="og:title" content="Contact Us | PasteDocs Support & Feedback" />
        <meta property="og:description" content="Reach out to PasteDocs founder Jay Prajapati. Report bugs or request portal features. Remember: we operate with 100% Client-Side WebAssembly data isolation." />
        <meta property="og:url" content="https://pastedocs.vercel.app/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PasteDocs" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      <main className="w-full max-w-3xl mx-auto px-5 py-16 sm:py-24">
        <header className="mb-14 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3 block">Direct Support</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mb-4 leading-tight">Contact PasteDocs</h1>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
            We are continuously building and refining PasteDocs. If you run into formatting issues, have suggestions for new government portal rules, or want to share feedback, we are here to support you.
          </p>
        </header>

        <section className="bg-white border border-zinc-100 rounded-2xl p-6 sm:p-8 mb-12 shadow-sm hover:shadow-md transition-all duration-300">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">Direct Communication</span>
          <p className="text-sm text-zinc-650 mb-6">
            For support, feature requests, or technical audits, contact our developer directly at:
          </p>
          <div className="text-left py-2">
            <a 
              href="mailto:uddan1711@gmail.com" 
              className="text-lg md:text-xl font-extrabold text-emerald-600 hover:text-emerald-700 transition-colors inline-block min-h-[44px] flex items-center"
            >
              uddan1711@gmail.com
            </a>
          </div>
          <p className="text-[11px] text-zinc-400 mt-4 leading-relaxed">
            *Please expect up to 2-3 business days for responses as PasteDocs is maintained independently as a free public utility resource.
          </p>
        </section>

        <article className="space-y-10 sm:space-y-12 text-zinc-650 text-sm leading-relaxed">
          <section className="space-y-5">
            <h2 className="text-base font-bold text-zinc-950 tracking-tight">Core Operational Guidelines</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-zinc-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-zinc-200 transition-all duration-200 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mb-3 inline-block">01. SYSTEM SPEC</span>
                  <h3 className="font-bold text-zinc-900 text-xs mb-1">Device & OS Info</h3>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">Please mention your system spec (e.g., Chrome, iOS Safari) when reporting anomalies.</p>
                </div>
              </div>

              <div className="bg-white border border-zinc-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-zinc-200 transition-all duration-200 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mb-3 inline-block">02. RULE TEXT</span>
                  <h3 className="font-bold text-zinc-900 text-xs mb-1">Requirements Input</h3>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">Include the exact text or dimensions you typed into the formatting interface.</p>
                </div>
              </div>

              <div className="bg-white border border-zinc-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-zinc-200 transition-all duration-200 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mb-3 inline-block">03. ISSUE TYPE</span>
                  <h3 className="font-bold text-zinc-900 text-xs mb-1">Upload Check Error</h3>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">Explain if the output file exceeded target size or cropped incorrectly.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-amber-50/40 border border-amber-100/50 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-zinc-900 text-sm mb-2">🚨 CRITICAL DATA ISOLATION WARNING</h3>
            <p className="text-xs text-zinc-650 leading-relaxed">
              <strong>Do NOT attach personal documents, copies of identification (such as Aadhaar, PAN cards), or passport photographs to your email.</strong> PasteDocs operates with 100% Client-Side WebAssembly data isolation. We do not maintain server storage and do not want to receive your sensitive records.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-zinc-100">
            <h2 className="text-base font-bold text-zinc-950 tracking-tight">About Technical Audits</h2>
            <p>
              PasteDocs enforces client-side processing using standard browser micro-compilers and canvas assets. This guarantees zero cookie tracking, zero server tracking logs, and zero network leakage of raw payloads.
            </p>
          </section>
        </article>
      </main>
    </>
  );
}

