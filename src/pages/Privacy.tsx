import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Privacy() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy | PasteDocs",
    "url": "https://pastedocs.vercel.app/privacy",
    "description": "Privacy Policy detailing our 100% Client-Side WebAssembly data isolation design with zero cookie tracking and zero server logs.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://pastedocs.vercel.app"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Privacy Policy",
          "item": "https://pastedocs.vercel.app/privacy"
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>Privacy Policy | PasteDocs Local-First Biometric Security</title>
        <meta name="description" content="Read how PasteDocs enforces 100% Client-Side WebAssembly data isolation, zero cookie tracking, and zero server logs for your biometric and identity document files." />
        <link rel="canonical" href="https://pastedocs.vercel.app/privacy" />
        <meta property="og:title" content="Privacy Policy | PasteDocs Local-First Biometric Security" />
        <meta property="og:description" content="Read how PasteDocs enforces 100% Client-Side WebAssembly data isolation, zero cookie tracking, and zero server logs for your biometric and identity document files." />
        <meta property="og:url" content="https://pastedocs.vercel.app/privacy" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PasteDocs" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <main className="w-full max-w-3xl mx-auto px-5 py-16 sm:py-24">
        <header className="mb-14 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3 block">Data Protection Principles</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mb-2 leading-tight">Privacy Policy</h1>
          <p className="text-xs text-zinc-400">Last updated: May 2026</p>
        </header>
        
        <article className="space-y-10 sm:space-y-12 text-zinc-650 text-sm leading-relaxed">
          <section className="bg-emerald-50/40 border border-emerald-100/50 rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-zinc-900 text-sm mb-2">Executive Summary: Local-Runtime Isolation</h2>
            <p className="text-xs text-zinc-600 leading-relaxed">
              <Link to="/" className="text-emerald-700 font-bold hover:underline">PasteDocs</Link> is engineered on a sovereign <strong>100% Client-Side WebAssembly data isolation</strong> paradigm. We do not collect, store, transmit, or monitor the documents, credentials, or images you upload for cropping. <strong>Zero server uploads — your files never leave your physical device.</strong>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-base font-bold text-zinc-950 tracking-tight">1. Decoupled Pipeline (What We Do Not Collect)</h2>
            <p>
              PasteDocs completely bypasses traditional backend-based processing pipelines. Our system does not maintain databases or server connections that can read your uploads. Specifically:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-white border border-zinc-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-zinc-200 transition-all duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="font-bold text-zinc-900 text-xs tracking-tight">Zero Server Logs</h3>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed">No staging nodes or storage volumes are configured. No backend proxy intercepts binary files.</p>
              </div>

              <div className="bg-white border border-zinc-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-zinc-200 transition-all duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="font-bold text-zinc-900 text-xs tracking-tight">Zero Remote Collection</h3>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed">We cannot parse, harvest, or see sensitive specs embedded in your Aadhaar, PAN, or marksheets.</p>
              </div>

              <div className="bg-white border border-zinc-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-zinc-200 transition-all duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h3 className="font-bold text-zinc-900 text-xs tracking-tight">No Account Signup</h3>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed">No authentication requests, phone tracking, session checks, or login hashes are stored.</p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 tracking-tight">2. WebAssembly & Local Sandbox Architecture</h2>
            <p>
              When processing documents, raw file feeds remain in temporary sandbox variables inside the client-side JavaScript engine. Standard conversion operations (such as converting WebP formats, color filtration, grayscale processing, and targeted file shrinking) are performed instantly in browser runtime. Because the files stay locked within your local viewport browser memory, your private information never traverses public or private server proxies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-base font-bold text-zinc-950 tracking-tight">3. Local Session State Cache</h2>
            <p>
              To ensure persistence across accidental visual reloads, PasteDocs retains minimal layout state data in the client-side browser Local Storage:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-4">
              <div className="bg-white border border-zinc-100 px-4 py-3 rounded-xl shadow-sm flex items-center gap-3 hover:border-zinc-200 transition-all">
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 w-6 h-6 rounded-lg flex items-center justify-center shrink-0">✓</span>
                <span className="text-xs text-zinc-700 font-semibold">Pasted rule patterns</span>
              </div>
              <div className="bg-white border border-zinc-100 px-4 py-3 rounded-xl shadow-sm flex items-center gap-3 hover:border-zinc-200 transition-all">
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 w-6 h-6 rounded-lg flex items-center justify-center shrink-0">✓</span>
                <span className="text-xs text-zinc-700 font-semibold">Selected target KB bounds</span>
              </div>
              <div className="bg-white border border-zinc-100 px-4 py-3 rounded-xl shadow-sm flex items-center gap-3 hover:border-zinc-200 transition-all">
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 w-6 h-6 rounded-lg flex items-center justify-center shrink-0">✓</span>
                <span className="text-xs text-zinc-700 font-semibold">Dynamic process statistics</span>
              </div>
            </div>

            <p className="mt-4">
              <strong>We never write binary document files, raw image streams, or pixel arrays into browser Local Storage or persistent cache structures.</strong> Once the tab closes, all temporary pixel arrays are completely scrubbed from heap memory.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 tracking-tight">4. Cookies & Analytical Integration</h2>
            <p>
              We prioritize utility and avoid unsolicited profiling. This tool operates with <strong>zero cookie tracking</strong> for core resizer operations. For basic performance statistics, we may load general diagnostics (such as basic browser identifiers and screen height) to adapt our mobile UI layouts, but these services have zero capability to access your local workspace files.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 tracking-tight">5. Developer Liaison</h2>
            <p>
              For legal audits, protocol queries, or compliance verification, contact the developer directly at <a href="mailto:uddan1711@gmail.com" className="text-zinc-900 font-bold hover:underline underline-offset-4 decoration-emerald-500">uddan1711@gmail.com</a>.
            </p>
          </section>

          <section className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4 text-center sm:text-left">
            <span>By using PasteDocs, you acknowledge this localized data isolation framework.</span>
            <Link to="/terms" className="text-emerald-600 hover:underline font-bold inline-flex items-center gap-1 min-h-[44px]">
              Terms of Service <span className="text-sm">→</span>
            </Link>
          </section>
        </article>
      </main>
    </>
  );
}
