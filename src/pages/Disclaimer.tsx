import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Disclaimer() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Disclaimer | PasteDocs",
    "url": "https://pastedocs.vercel.app/disclaimer",
    "description": "Liability disclaimer outlining document acceptance, local image compression guarantees, and the 100% offline WebAssembly architecture.",
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
          "name": "Disclaimer",
          "item": "https://pastedocs.vercel.app/disclaimer"
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>Disclaimer | PasteDocs Local-First Biometric Security</title>
        <meta name="description" content="Legal and liability disclaimers for using the PasteDocs image resizer. Understand your verification responsibilities under 100% offline data isolation." />
        <link rel="canonical" href="https://pastedocs.vercel.app/disclaimer" />
        <meta property="og:title" content="Disclaimer | PasteDocs Local-First Biometric Security" />
        <meta property="og:description" content="Legal and liability disclaimers for using the PasteDocs image resizer. Understand your verification responsibilities under 100% offline data isolation." />
        <meta property="og:url" content="https://pastedocs.vercel.app/disclaimer" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PasteDocs" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      <main className="w-full max-w-3xl mx-auto px-5 py-16 sm:py-24">
        <header className="mb-14 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3 block">Liability Limits</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mb-2 leading-tight">Disclaimer</h1>
          <p className="text-xs text-zinc-400">Last updated: May 2026</p>
        </header>

        <article className="space-y-10 sm:space-y-12 text-zinc-650 text-sm leading-relaxed">
          <section className="bg-amber-50/40 border border-amber-100/50 rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-zinc-900 text-sm mb-2">Non-Association Notice</h2>
            <p className="text-xs text-zinc-650 leading-relaxed">
              PasteDocs is an independent, private tool developed by Jay Prajapati. <strong>We are NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with any government organization, national bureau, board of education, state exam council, or embassy.</strong> All product names, logos, and portal references remain registered trademarks of their respective holders. Their reference does not imply any endorsement or official affiliation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 tracking-tight">1. No Guarantee of Acceptance</h2>
            <p>
              While PasteDocs utilizes local Javascript engines, high-precision cropping grids, and target weight compression to conform to the rules entered by users, we cannot guarantee third-party acceptance. External portals regularly update validation parameters, upload checkers, file-type filters, and biometric criteria without public notice. <strong>You maintain individual responsibility to inspect each output file prior to submission.</strong>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 tracking-tight">2. Processing Liability</h2>
            <p>
              By utilizing our offline tools, you recognize that all image and file adjustments occur on your own machine using <strong>100% Client-Side WebAssembly data isolation</strong> and local memory heap cycles. We maintain <strong>zero server logs</strong> and do not deploy user database backups. In the event of system crash, page reload, or hardware disconnect, binary state recoveries must be initiated manually.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-zinc-950 tracking-tight">3. "As Is" General Warranty</h2>
            <p>
              The Service is delivered on an "as-is" and "as available" basis without express or implied warranty representations of any kind. PasteDocs and its developer assume no liability for structural application failures, service interruptions, or file-compression defects.
            </p>
          </section>

          <section className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4 text-center sm:text-left">
            <span>By using PasteDocs, you acknowledge this localized data isolation framework.</span>
            <Link to="/privacy" className="text-emerald-600 hover:underline font-bold inline-flex items-center gap-1 min-h-[44px]">
              Privacy Policy <span className="text-sm">→</span>
            </Link>
          </section>
        </article>
      </main>
    </>
  );
}

