import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, FileText, Globe, Sliders, Sparkles, Clock, Calendar, ArrowRight } from 'lucide-react';
import { getPublishedBlogPosts, BlogPost } from '../utils/blogLoader';

function formatDisplayDate(dateStr: string) {
  try {
    const [year, month, day] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
  } catch (e) {
    return dateStr;
  }
}

function getCategoryTheme(category: string) {
  const cat = (category || '').toLowerCase();
  
  if (cat.includes('exam') || cat.includes('board') || cat.includes('govt')) {
    return {
      IconComponent: GraduationCap,
      iconClass: 'text-emerald-600',
      iconBgClass: 'bg-emerald-50 border-emerald-100',
      tagClass: 'bg-emerald-50/70 text-emerald-700 border-emerald-100/40',
      accentColor: 'group-hover:text-emerald-600'
    };
  }
  
  if (cat.includes('document') || cat.includes('identity') || cat.includes('id') || cat.includes('file')) {
    return {
      IconComponent: FileText,
      iconClass: 'text-indigo-600',
      iconBgClass: 'bg-indigo-50 border-indigo-100',
      tagClass: 'bg-indigo-50/70 text-indigo-700 border-indigo-100/40',
      accentColor: 'group-hover:text-indigo-600'
    };
  }
  
  if (cat.includes('visa') || cat.includes('passport') || cat.includes('travel')) {
    return {
      IconComponent: Globe,
      iconClass: 'text-sky-600',
      iconBgClass: 'bg-sky-50 border-sky-100',
      tagClass: 'bg-sky-50/70 text-sky-700 border-sky-100/40',
      accentColor: 'group-hover:text-sky-600'
    };
  }
  
  // Default is utilities (Compress, Resize, Convert, etc.)
  return {
    IconComponent: Sliders,
    iconClass: 'text-amber-600',
    iconBgClass: 'bg-amber-50 border-amber-100',
    tagClass: 'bg-amber-50/70 text-amber-700 border-amber-100/40',
    accentColor: 'group-hover:text-amber-600'
  };
}

function BlogCard({ post }: { post: BlogPost; key?: string }) {
  const theme = getCategoryTheme(post.category);
  const Icon = theme.IconComponent;

  return (
    <Link 
      id={`blog-card-${post.slug}`}
      to={`/blog/${post.slug}`}
      className="group block bg-white border border-zinc-100 rounded-2xl p-6 flex flex-col justify-between h-full hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative overflow-hidden"
    >
      <div className="flex flex-col gap-4">
        {/* Top Feature Row: Configured Icon & Metadata */}
        <div className="flex items-center justify-between">
          <div className={`w-10 h-10 rounded-xl ${theme.iconBgClass} border flex items-center justify-center transition-transform group-hover:scale-105 duration-300`}>
            <Icon className={`w-5 h-5 ${theme.iconClass}`} />
          </div>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${theme.tagClass}`}>
            {post.category || "GUIDES"}
          </span>
        </div>

        {/* Title & Desc */}
        <div className="flex flex-col gap-2">
          <h2 className={`text-lg font-semibold text-zinc-900 tracking-tight leading-snug line-clamp-2 transition-colors ${theme.accentColor}`}>
            {post.title}
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Card Info Footer */}
      <div className="flex items-center justify-between pt-5 mt-5 border-t border-zinc-50 text-xs font-medium text-zinc-400">
        <div className="flex items-center gap-1.5 grayscale opacity-80">
          <Clock className="w-3.5 h-3.5 text-zinc-300" />
          <span>{post.readTime || "4 min read"}</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-600 font-semibold group-hover:text-zinc-950 transition-colors">
          <span className="text-zinc-500 font-normal">{formatDisplayDate(post.date)}</span>
          <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </Link>
  );
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const published = await getPublishedBlogPosts();
        setPosts(published);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Guides & Formatting Insights | PasteDocs",
    "url": "https://pastedocs.vercel.app/blog",
    "description": "Official photo specifications, signature alignment, and private image dimension tutorials for India GSEB, Central State Board Exams, and online visas.",
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
          "name": "Blog Guides",
          "item": "https://pastedocs.vercel.app/blog"
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>Guides & Formatting Insights | PasteDocs</title>
        <meta name="description" content="Official photo specifications, signature alignment, and private image dimension tutorials for India GSEB, Central State Board Exams, and online visas." />
        <link rel="canonical" href="https://pastedocs.vercel.app/blog" />
        <meta property="og:title" content="Guides & Formatting Insights | PasteDocs" />
        <meta property="og:description" content="Official photo specifications, signature alignment, and private image dimension tutorials for India GSEB, Central State Board Exams, and online visas." />
        <meta property="og:url" content="https://pastedocs.vercel.app/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PasteDocs" />
        <script type="application/ld+json">
          {JSON.stringify(blogListSchema)}
        </script>
      </Helmet>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Core Header Typography Block */}
        <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-zinc-50 text-zinc-700 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-zinc-200/60">
            <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
            <span>Format Guides</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tight leading-tight">
            Official Admission & Exam Formatting Guides
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Simple, private deep-dives to help you navigate passport size photo layouts, signature formats, and official board guidelines with zero server uploads.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-8 h-8 border-[3px] border-zinc-100 border-t-zinc-900 rounded-full animate-spin"></div>
            <span className="text-xs font-medium text-zinc-400">Loading guide matrix...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50/50 rounded-2xl border border-zinc-100/80 p-8 max-w-md mx-auto">
            <Sparkles className="w-8 h-8 text-zinc-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-zinc-900 mb-1">No Guides Listed</h3>
            <p className="text-zinc-500 text-xs">
              Check back soon for the latest dynamic formatting instructions.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((blog) => (
              <BlogCard key={blog.slug} post={blog} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
