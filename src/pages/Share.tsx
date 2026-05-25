import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Share() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const shareLinks = [
    {
      title: 'For NEET/JEE Students',
      text: 'Bhai ye tool try kar — pastedocs.vercel.app — NEET aur JEE ke liye photo automatically resize, compress aur format kar deta hai. Free hai, phone pe kaam karta hai, koi account nahi chahiye 🔥'
    },
    {
      title: 'For SSC/UPSC Aspirants',
      text: 'SSC/UPSC form bhar rahe ho? Ye tool — pastedocs.vercel.app — use karo. Photo aur signature perfectly resize ho jate hain official rules ke hisaab se. 100% free aur private hai 💯'
    },
    {
      title: 'For Passport/General Applications',
      text: 'Passport or visa photo resize karni hai? pastedocs.vercel.app ekdum best hai. Just upload your photo and it resizes it properly without any quality loss. Very useful for online forms! 🚀'
    }
  ];

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 3500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Helmet>
        <title>PasteDocs | Share with Friends</title>
        <meta name="description" content="Share PasteDocs with your friends and study groups on WhatsApp. Help them resize their photos for exams and applications easily." />
        <link rel="canonical" href="https://pastedocs.vercel.app/share" />
      </Helmet>
      
      <div className="w-full max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">Want to help your friends?</h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-4 max-w-2xl mx-auto">
            Did this tool save you time? Share it with your study group or batchmates so they don't struggle with photo uploads.
          </p>
        </div>

        <div className="space-y-6">
          {shareLinks.map((item, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-gray-900 text-lg mb-4">{item.title}</h3>
              <div className="bg-gray-50 p-4 rounded-xl text-gray-700 italic border border-gray-100 mb-6">
                "{item.text}"
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(item.text)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex justify-center items-center gap-2 bg-[#25D366] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#20bd5a] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  Share on WhatsApp
                </a>
                <button 
                  onClick={() => handleCopy(item.text, i)}
                  className={`sm:w-auto w-full flex justify-center items-center gap-2 py-3 px-6 rounded-xl font-semibold border transition-all duration-300 ${
                    copiedIndex === i 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {copiedIndex === i ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                      Copy Message
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
