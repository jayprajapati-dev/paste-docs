import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Tag, 
  Share2, 
  Check, 
  ArrowRight,
  Shield,
  Zap,
  Crop,
  AlertCircle
} from 'lucide-react';
import { getBlogPostBySlug, BlogPost as BlogPostType } from '../utils/blogLoader';

function formatDisplayDate(dateStr: string) {
  try {
    const [year, month, day] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
  } catch (e) {
    return dateStr;
  }
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    async function loadPost() {
      if (!slug) {
        setPost(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const fetchedPost = await getBlogPostBySlug(slug);
        setPost(fetchedPost);
      } catch (err) {
        console.error('Error loading blog post:', err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  const copyPageLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <span className="text-sm font-medium text-gray-500">Loading guide...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] max-w-xl mx-auto px-6 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Guide Not Available</h1>
        <p className="text-gray-600 mb-8 max-w-sm">
          This post does not exist or has been scheduled for future publishing and will appear online on its scheduled date.
        </p>
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-medium rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog List</span>
        </Link>
      </div>
    );
  }

  // Define highly polished custom ReactMarkdown components for beautiful styling
  const customRenderers = {
    h1: ({ children }: any) => (
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mt-10 mb-5 tracking-tight leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-100 tracking-tight leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mt-6 mb-3 tracking-tight leading-snug">
        {children}
      </h3>
    ),
    p: ({ children }: any) => (
      <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-5">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => {
      // Safely join children into string to detect callout type
      const text = React.Children.toArray(children)
        .map(child => {
          if (typeof child === 'string' || typeof child === 'number') return child;
          if (React.isValidElement(child) && (child.props as any) && (child.props as any).children) {
            return String((child.props as any).children);
          }
          return '';
        })
        .join('')
        .trim();

      let bg = 'bg-gray-50 border-gray-400 text-gray-900';
      let border = 'border-l-4 border-gray-400';

      if (text.toLowerCase().includes('warning:')) {
        bg = 'bg-amber-50/70 text-amber-900 border-amber-500';
        border = 'border-l-4 border-amber-500';
      } else if (text.toLowerCase().includes('pro tip:')) {
        bg = 'bg-blue-50/70 text-blue-900 border-blue-500';
        border = 'border-l-4 border-blue-500';
      } else if (text.toLowerCase().includes('the fix:')) {
        bg = 'bg-emerald-50/70 text-emerald-900 border-emerald-500';
        border = 'border-l-4 border-emerald-500';
      }

      return (
        <blockquote className={`${bg} ${border} rounded-r-2xl p-4 sm:p-6 my-5 sm:my-6 italic text-[15px] sm:text-[17px] leading-relaxed shadow-sm`}>
          {children}
        </blockquote>
      );
    },
    ul: ({ children }: any) => (
      <ul className="list-disc pl-5 sm:pl-6 mb-5 space-y-2 text-gray-600 text-base sm:text-lg">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal pl-5 sm:pl-6 mb-5 space-y-2 text-gray-600 text-base sm:text-lg">
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className="leading-relaxed">
        {children}
      </li>
    ),
    strong: ({ children }: any) => (
      <strong className="font-semibold text-gray-900">
        {children}
      </strong>
    ),
    a: ({ href, children }: any) => (
      <a href={href} className="text-blue-600 font-semibold hover:underline" target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {children}
      </a>
    ),
    hr: () => <hr className="my-8 sm:my-10 border-gray-100" />,
  };

  // Split content to place CTA right after the first 2 paragraphs
  const contentBlocks = post.content ? post.content.split('\n\n') : [];
  const hasAtLeastTwoParagraphs = contentBlocks.length >= 2;
  const firstPart = hasAtLeastTwoParagraphs ? contentBlocks.slice(0, 2).join('\n\n') : post.content;
  const secondPart = hasAtLeastTwoParagraphs ? contentBlocks.slice(2).join('\n\n') : '';

  // Class-leading highly accurate Unsplash dynamic image selection for Google Discover and OG previews
  let currentImageUrl = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828'; // Fallback
  const s = post.slug.toLowerCase();
  
  if (s === '5-common-photo-mistakes' || s.includes('mistake')) {
    currentImageUrl = 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643';
  } else if (s === 'complete-document-formatting-banking') {
    currentImageUrl = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40';
  } else if (s === 'how-to-compress-passport-photo' || s.includes('passport')) {
    currentImageUrl = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828';
  } else if (s === 'how-to-convert-to-jpeg-jpg') {
    currentImageUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe';
  } else if (s === 'how-to-resize-photo-signature-ssc' || s.includes('ssc')) {
    currentImageUrl = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173';
  } else if (s === 'never-upload-aadhaar-pan') {
    currentImageUrl = 'https://images.unsplash.com/photo-1563986768609-322da13575f3';
  } else if (s === 'photo-rejected-government-portal' || s.includes('reject') || s.includes('rejection')) {
    currentImageUrl = 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d';
  } else if (s === 'resize-photo-exact-dimensions') {
    currentImageUrl = 'https://images.unsplash.com/photo-1502239608882-93b729c6af43';
  } else if (s === 'resize-signature-online-without-losing-quality' || s.includes('signature') || s.includes('sign')) {
    currentImageUrl = 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe';
  } else if (s === 'safely-format-crop-signature') {
    currentImageUrl = 'https://images.unsplash.com/photo-1450133064473-71024230f91b';
  } else if (s === 'state-exam-document-resize') {
    currentImageUrl = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173';
  } else if (s === 'ultimate-checklist-upsc-ias') {
    currentImageUrl = 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b';
  } else if (s === 'understand-photo-rules-ssc-neet-upsc') {
    currentImageUrl = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173';
  } else if (s.includes('neet')) {
    currentImageUrl = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d';
  } else if (s.includes('gujarati') || s.includes('gpsc')) {
    currentImageUrl = 'https://images.unsplash.com/photo-1450133064473-71024230f91b';
  }

  // Format the URL to exactly 1200x630 (1.91:1) for social crawlers and Google Discover stability
  if (currentImageUrl.includes('unsplash.com')) {
    currentImageUrl = `${currentImageUrl.split('?')[0]}?auto=format&fit=crop&w=1200&h=630&q=80`;
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": post.title,
    "description": post.metaDesc || post.excerpt,
    "image": currentImageUrl,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": "Jay Prajapati",
      "jobTitle": "Indie Developer & IT Student"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PasteDocs",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pastedocs.vercel.app/favicon.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://pastedocs.vercel.app/blog/${post.slug}`
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.metaTitle || `${post.title} | PasteDocs`}</title>
        <meta name="description" content={post.metaDesc || post.excerpt} />
        <link rel="canonical" href={`https://pastedocs.vercel.app/blog/${post.slug}`} />
        <meta property="og:title" content={post.metaTitle || `${post.title} | PasteDocs`} />
        <meta property="og:description" content={post.metaDesc || post.excerpt} />
        <meta property="og:url" content={`https://pastedocs.vercel.app/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="PasteDocs" />
        <meta property="og:image" content={currentImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.metaTitle || `${post.title} | PasteDocs`} />
        <meta name="twitter:description" content={post.metaDesc || post.excerpt} />
        <meta name="twitter:image" content={currentImageUrl} />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      {/* Back & Sticky Control Bar */}
      <div className="sticky top-0 bg-white/85 backdrop-blur-md border-b border-zinc-100 z-30 py-3 sm:py-4">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          <Link 
            to="/blog"
            className="group flex items-center gap-2 text-zinc-500 hover:text-zinc-950 font-medium text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>All Articles</span>
          </Link>
          
          <button 
            onClick={copyPageLink}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-600 hover:text-zinc-950 text-xs font-semibold rounded-lg transition-all"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied Link</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Guide</span>
              </>
            )}
          </button>
        </div>
      </div>

      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10">
        <article className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-zinc-100 overflow-hidden shadow-sm">
          
          {/* Gorgeous typography-driven CSS Hero Banner (replaces traditional images) */}
          <div className="p-4 sm:p-6 md:p-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-slate-900 p-8 sm:p-12 md:p-16 text-left shadow-lg border border-zinc-800/50" id="blog-hero-banner">
              {/* CSS overlay grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />
              
              {/* Ambient radial accent glows */}
              <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
              <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

              <div className="relative z-10 flex flex-col items-start gap-4">
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-wider">
                  <Tag className="w-3 h-3" />
                  <span>{post.category}</span>
                </span>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mt-2 max-w-3xl">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-zinc-350 font-medium mt-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-zinc-400" />
                    <span>{formatDisplayDate(post.date)}</span>
                  </div>
                  <span className="text-zinc-650" aria-hidden="true">•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-zinc-400" />
                    <span>{post.readTime || "4 min read"}</span>
                  </div>
                  <span className="text-zinc-650" aria-hidden="true">•</span>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified Offline Secure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10 md:p-12 pt-2 sm:pt-4">
            {/* Elegant, Breathable Prose Content with Embedded CTA */}
            <div className="prose prose-zinc max-w-3xl mx-auto text-zinc-800 leading-relaxed font-normal">
              
              {/* Part 1: First 2 Paragraphs */}
              <ReactMarkdown components={customRenderers}>
                {firstPart}
              </ReactMarkdown>

              {/* EMBEDDED HIGH-CONVERTING TOOL CTA CARD */}
              {hasAtLeastTwoParagraphs && (
                <div className="my-8 rounded-2xl bg-gradient-to-br from-emerald-950 via-zinc-950 to-zinc-900 w-full border border-emerald-500/20 p-6 sm:p-8 relative overflow-hidden shadow-2xl" id="blog-embedded-cta">
                  {/* Subtle vector-like grid mesh */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 pointer-events-none" />
                  <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2 text-left">
                      <div className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-wider">
                        <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        <span>Instant Local Tool</span>
                      </div>
                      <h3 className="text-xl font-black text-white tracking-tight">
                        Launch PasteDocs Auto-Resizer for {post.title.replace(/How to |Complete |Ultimate |Understand /gi, '')}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                        Skip the stress of file rejections. Simply choose this template, upload files, auto-crop to rules, configure target KB limit, and format instantly client-side.
                      </p>
                    </div>
                    
                    <Link 
                      to="/" 
                      className="w-full md:w-auto inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95 shrink-0 whitespace-nowrap"
                      id="btn-launch-tool"
                    >
                      <span>Launch Safe Tool</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Part 2: Remaining paragraphs */}
              {secondPart && (
                <div className="mt-6">
                  <ReactMarkdown components={customRenderers}>
                    {secondPart}
                  </ReactMarkdown>
                </div>
              )}

            </div>

            {/* Beautiful full-width minimalist utility action card */}
            <div className="mt-12 pt-8 border-t border-zinc-100">
              <Link 
                id="minimalist-home-redirect-card"
                to="/" 
                className="group block bg-zinc-50 hover:bg-zinc-100/75 border border-zinc-200/50 rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="space-y-1.5 text-left">
                    <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-100">
                      <Shield className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Security Standard Secured</span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-950 tracking-tight">
                      Privately Crop, Scale, and Verify Files
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-xl">
                      Process biometric portraits, identification scans, and signatures fully locally. No server uploads, zero internet transmission, 100% airtight privacy.
                    </p>
                  </div>
                  <div className="w-full sm:w-auto inline-flex items-center justify-center bg-zinc-950 text-white font-bold text-sm px-6 py-4 rounded-xl transition-all shadow-sm shrink-0 whitespace-nowrap active:scale-95 group-hover:bg-emerald-600 group-hover:scale-[1.02]">
                    <span>Start Formatting Securely → No Account Required</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
