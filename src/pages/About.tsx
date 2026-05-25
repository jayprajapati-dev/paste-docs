import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function About() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "PasteDocs",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "All",
      "url": "https://pastedocs.vercel.app",
      "author": {
        "@type": "Person",
        "name": "Jay Prajapati",
        "jobTitle": "Indie Developer & IT Student",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Gujarat",
          "addressCountry": "India"
        }
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>The Story Behind PasteDocs: Privacy-First Document Sizing</title>
        <meta name="description" content="Founded by Jay Prajapati in May 2026. Engineered to eliminate identity risks on server-based resizers through 100% offline WebAssembly and client-side processing." />
        <link rel="canonical" href="https://pastedocs.vercel.app/about" />
        <meta property="og:title" content="The Story Behind PasteDocs: Privacy-First Document Sizing" />
        <meta property="og:description" content="Founded by Jay Prajapati in May 2026. Engineered to eliminate identity risks on server-based resizers through 100% offline WebAssembly and client-side processing." />
        <meta property="og:url" content="https://pastedocs.vercel.app/about" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PasteDocs" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <main className="w-full max-w-3xl mx-auto px-5 py-16 sm:py-24">
        <header className="mb-14 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3 block">About the Project</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-tight">
            The Story Behind PasteDocs: Privacy-First Document Sizing
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
            Founded by <strong>Jay Prajapati</strong> in May 2026. Engineered to completely eliminate identity exposure risks inherent to server-based document resizers through <span className="text-zinc-900 font-medium">100% offline WebAssembly</span>, direct-memory Client-Side Canvas APIs, and secure sandbox data isolation layers.
          </p>
        </header>

        {/* Fact Sheet Visual Grid */}
        <section className="mb-14 sm:mb-16">
          <h2 className="text-xs font-extrabold uppercase text-zinc-400 tracking-widest mb-6">Trust Infrastructure & Fact Sheet</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white border border-zinc-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-zinc-200 transition-all duration-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-widest inline-block mb-4">01. Sovereignty</span>
                <h3 className="font-bold text-zinc-900 text-sm mb-1.5">Local Sandboxing</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">No application servers, no tracker cookies, zero data exfiltration. pay-loads process strictly in local RAM.</p>
              </div>
            </div>
            <div className="bg-white border border-zinc-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-zinc-200 transition-all duration-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-widest inline-block mb-4">02. NLP Logic</span>
                <h3 className="font-bold text-zinc-900 text-sm mb-1.5">Regional Adaptability</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">Auto-interprets complex guidelines from English, Hindi, and Gujarati government portals natively.</p>
              </div>
            </div>
            <div className="bg-white border border-zinc-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-zinc-200 transition-all duration-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-widest inline-block mb-4">03. Performance</span>
                <h3 className="font-bold text-zinc-900 text-sm mb-1.5">Sub-Millisecond Engine</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">Direct-memory compilation heavily optimized for low-end Android mobile devices with rural coverage.</p>
              </div>
            </div>
          </div>
        </section>

        <article className="space-y-10 sm:space-y-12 text-zinc-650 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 tracking-tight">The Developer & Mission</h2>
            <p>
              I am an Information Technology Student and an indie software builder based in Gujarat, India. My product methodology focuses purely on crafting high-utility, secure micro-SaaS utilities. PasteDocs is developed as a zero-friction, mission-critical portal addressing the needs of millions of candidates applying for competitive exams. From OJAS, GPSC, and SSC to national portals like NEET and UPSC, our goal is to provide official spec compliance without requiring security compromises.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 tracking-tight">The Core Frustration (Why It Exists)</h2>
            <p>
              Applying for educational forms or state jobs in India routinely demands specific file-size constraints. However, uploading sensitive documents containing personal telemetry—such as Aadhaar Cards, PAN Cards, Income Certificates (આવકનો દાખલો), and Caste Certificates (જાતિ પ્રમાણપત્ર)—to standard web converters involves significant risk. Many third-party utilities act as server-side collection nodes that store uploaded files, leaving users vulnerable to identity theft and database leaks. By keeping document compilation strictly inside the sandbox of browser memory, PasteDocs removes the server intermediary entirely.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 tracking-tight">The $0 Server Cost Technical Framework</h2>
            <p>
              Our infrastructure stays lean and cost-effective through modern browser capabilities. Rather than paying for backend GPU cores to convert images, we run high-speed pipelines locally using HTML5 Canvas objects, local gray-scale compilers, custom JavaScript compressors, and service workers. Because files never touch our servers, we have zero compute database overhead. This design ensures PasteDocs remains a 100% free tool that can reliably run even on low-bandwidth rural networks.
            </p>
          </section>

          <div className="border-t border-zinc-100 pt-10 sm:pt-12">
            <div className="bg-zinc-50/50 border border-zinc-100 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div className="space-y-1">
                <h4 className="font-bold text-zinc-900 text-sm sm:text-base">Need to format an official document right away?</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">Get precise sizing, resolution cropping, and KB-target optimization instantly.</p>
              </div>
              <Link
                to="/tools"
                className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold px-6 py-3.5 rounded-xl transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap inline-flex items-center group gap-1 min-h-[44px]"
              >
                Explore All 118+ Formats 
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}

