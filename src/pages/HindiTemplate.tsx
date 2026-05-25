import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, Shield, Zap, Smartphone } from 'lucide-react';
import { hindiData } from '../data/hindi';
import UploadZone from '../components/UploadZone';
import DocStoreInitializer from '../components/DocStoreInitializer';

export default function HindiTemplate() {
  const { slug } = useParams();
  const page = hindiData.find(d => d.slug === slug);

  if (!page) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <link rel="canonical" href={`https://pastedocs.vercel.app/hi/${page.slug}`} />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:url" content={`https://pastedocs.vercel.app/hi/${page.slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PasteDocs" />
      </Helmet>

      {/* Hero Section */}
      <div className="pt-16 md:pt-24 pb-16">
        <div className="w-full max-w-[1024px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-[0.75rem] font-semibold uppercase tracking-widest mb-6 border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Free • No Account • Works Offline (Offline chalta hai)
            </div>
            
            <h1 className="text-[clamp(1.875rem,5vw,3.5rem)] font-bold tracking-tight text-zinc-950 mb-6 leading-tight">
              {page.h1}
            </h1>
            
            <p className="text-[1.125rem] text-zinc-500 max-w-[640px] mx-auto mb-10 leading-relaxed">
              Bus photo upload karein or instantly size theek karein.
            </p>

            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm font-medium text-zinc-500 mb-12">
              <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-zinc-400" /> Photo phone se bahar nahi jaati</div>
              <div className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-zinc-400" /> Phone pe aasani se kaam kare</div>
              <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-zinc-400" /> Turant ready karein</div>
            </div>
          </div>

          <div className="w-full max-w-[640px] mx-auto relative z-10">
            <DocStoreInitializer initialRequirement={page.requirements} />
            <UploadZone />
            
            <div className="mt-8 text-center">
               <p className="text-sm font-medium text-zinc-500 bg-zinc-50 inline-block px-4 py-2 rounded-xl border border-zinc-100">
                 Setting lag gayi hai: <span className="font-semibold text-zinc-900">{page.requirements}</span>
               </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[640px] mx-auto px-6 py-16">
        <article className="prose prose-lg prose-gray max-w-none mb-16">
          <h2 className="text-[1.5rem] md:text-[1.75rem] font-semibold text-zinc-950 mb-6 tracking-tight">Puri Jaankari</h2>
          <div className="text-[1.125rem] text-zinc-500 leading-relaxed whitespace-pre-line">
            {page.content}
          </div>
        </article>
        <h2 className="text-[1.5rem] md:text-[1.75rem] font-semibold text-zinc-950 mb-8 tracking-tight">Aksar Puche Jane Wale Sawal (FAQ)</h2>
        <div className="space-y-6">
          {page.faq.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
              <h3 className="text-base font-semibold text-zinc-900 mb-2">{item.question}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-gray-50 rounded-2xl p-8 border border-gray-200">
           <h3 className="text-xl font-bold text-gray-900 mb-6">Yahan Bhi Dekhein:</h3>
           <div className="flex flex-wrap gap-3">
             {page.relatedPages.map((related, i) => (
               <Link key={i} to={related.url} className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-blue-300 transition-colors">
                 {related.name}
               </Link>
             ))}
           </div>
        </div>
      </div>
    </>
  );
}
