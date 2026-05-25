import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Terms() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms and Conditions | PasteDocs",
    "url": "https://pastedocs.vercel.app/terms",
    "description": "Terms and Conditions of Service outlining absolute client-side liability, local WebAssembly runtime processing limits, and India jurisdiction.",
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
          "name": "Terms of Service",
          "item": "https://pastedocs.vercel.app/terms"
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>Terms of Service | PasteDocs Local-First Biometric Security</title>
        <meta name="description" content="Read our terms of service. Understand our absolute liability disclaimer for local-runtime biometric resizers under Indian jurisdiction." />
        <link rel="canonical" href="https://pastedocs.vercel.app/terms" />
        <meta property="og:title" content="Terms of Service | PasteDocs Local-First Biometric Security" />
        <meta property="og:description" content="Read our terms of service. Understand our absolute liability disclaimer for local-runtime biometric resizers under Indian jurisdiction." />
        <meta property="og:url" content="https://pastedocs.vercel.app/terms" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PasteDocs" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      <main className="w-full max-w-3xl mx-auto px-5 py-16 sm:py-24">
        <header className="mb-14 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3 block">Legal Agreement</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mb-2 leading-tight">Terms and Conditions</h1>
          <p className="text-xs text-zinc-400">Last updated: May 2026</p>
        </header>

        <article className="space-y-10 sm:space-y-12 text-zinc-650 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 tracking-tight">1. Agreement to Terms</h2>
            <p>
              By accessing, browsing, or utilizing the browser-based utilities at PasteDocs (the "Service"), you agree to the binding Terms and Conditions presented herein. If you reject these principles, you are strictly prohibited from exploiting our browser-based resizer pipeline.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 tracking-tight">2. Processing Architecture</h2>
            <p>
              PasteDocs serves purely as a stateless, open-source inspired web utility. All graphics tools, grayscale conversions, and target compression operations occur using <strong>100% Client-Side WebAssembly data isolation</strong> within your device's browser memory loop. We do not provide database backup protocols, and we retain zero records of your files.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 tracking-tight">3. Zero-Tracking Integrity</h2>
            <p>
              The Service operates with <strong>zero cookie tracking</strong> for document compilation operations. We maintain <strong>zero server logs</strong> containing user-uploaded binaries. The operational environment is strictly isolated to prevent security breaches and protect civil identity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 tracking-tight">4. Disclaimer of Liability & Portal Compliance</h2>
            <p>
              While PasteDocs utilizes dynamic NLP translation logic to parse complex state guidelines (including OJAS, GPSC, NEET, SSC, and UPSC specs), you maintain ultimate liability for form accuracy. We are not liable for documentation rejections, technical failures of external systems, or administrative delays. The Service is provided free of charge "as is" and "as available".
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 tracking-tight">5. Jurisdictional Boundary</h2>
            <p>
              These legal articles are governed under the laws of India. Any litigation, dispute, or compliance query regarding localized browser actions must be resolved strictly in the courts of Gujarat, India.
            </p>
          </section>

          <section className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4 text-center sm:text-left">
            <span>Developer Support Contact: <a href="mailto:uddan1711@gmail.com" className="text-zinc-700 underline font-semibold">uddan1711@gmail.com</a></span>
            <Link to="/privacy" className="text-emerald-600 hover:underline font-bold inline-flex items-center gap-1 min-h-[44px]">
              Privacy Policy <span className="text-sm">→</span>
            </Link>
          </section>
        </article>
      </main>
    </>
  );
}

