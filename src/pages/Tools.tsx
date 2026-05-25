import { Helmet } from 'react-helmet-async';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Grid, Cpu, BookOpen, Globe, FileText, Check, Shield } from 'lucide-react';

// Unified structured database imports
import { ALL_EXAMS } from '../data/examData';
import { ALL_TOOLS } from '../data/toolData';
import { ALL_DOCUMENTS } from '../data/documentData';
import { ALL_VISAS } from '../data/visaData';

export default function Tools() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const CARDS_PER_PAGE = 24;

  // Map all structures into a uniform item representation 
  const allTools = useMemo(() => {
    return [
      ...ALL_TOOLS.map(t => {
        const limitText = t.requirements.maxSizeBytes ? `Max ${Math.round(t.requirements.maxSizeBytes / 1024)}KB` : '';
        const formatText = t.requirements.format ? (t.requirements.format || 'jpg').toUpperCase() : '';
        const dimText = t.requirements.width ? `${t.requirements.width}x${t.requirements.height}px` : '';
        const summary = [formatText, dimText, limitText].filter(Boolean).join(' • ');

        return {
          slug: t.slug,
          name: t.name,
          description: t.description,
          category: 'utility',
          categoryLabel: 'Processing Utilities',
          path: `/tool/${t.slug}`,
          keywords: [t.name.toLowerCase(), t.category.toLowerCase()],
          rulesSummary: summary || 'Optimal processing'
        };
      }),
      ...ALL_EXAMS.map(exam => {
        const subtext = [];
        if (exam.photo) subtext.push(`Photo: ${exam.photo.width}x${exam.photo.height}px (${exam.photo.minKB ? `${exam.photo.minKB}-` : ''}${exam.photo.maxKB}KB)`);
        if (exam.signature) subtext.push(`Signature: ${exam.signature.width}x${exam.signature.height}px`);
        if (exam.postcard) subtext.push(`Postcard Spec`);
        
        let targetCategory = '';
        let targetLabel = '';
        if (exam.category === "Central") {
          targetCategory = 'central';
          targetLabel = 'Central Indian Exams';
        } else if (exam.category === "State PSC") {
          targetCategory = 'state';
          targetLabel = 'State PSC Exams';
        } else if (exam.category === "Police") {
          targetCategory = 'police';
          targetLabel = 'Police Exams';
        } else if (exam.category === "Judiciary") {
          targetCategory = 'judiciary';
          targetLabel = 'Judiciary Exams';
        } else {
          targetCategory = 'central'; 
          targetLabel = 'Central Indian Exams';
        }

        return {
          slug: exam.slug,
          name: exam.name,
          description: exam.special || `Format photo/signature dynamically for ${exam.name} application portal. Ready for immediate local upload.`,
          category: targetCategory,
          categoryLabel: targetLabel,
          path: `/exam/${exam.slug}`,
          keywords: [exam.name.toLowerCase(), exam.authority?.toLowerCase(), targetCategory, targetLabel],
          rulesSummary: subtext.join(' • ')
        };
      }),
      ...ALL_DOCUMENTS.map(t => {
        const subtext = [];
        if (t.photo && t.photo.width) subtext.push(`Photo: ${t.photo.width}x${t.photo.height}px`);
        if (t.signature) subtext.push(`Sig: ${t.signature.width}x${t.signature.height}px`);
        return {
          slug: t.slug,
          name: t.name,
          description: `Fits ${t.name} official size parameters perfectly. Correct cropping and aspect ratio adjustment.`,
          category: 'document',
          categoryLabel: 'Identity Documents',
          path: `/doc/${t.slug}`,
          keywords: [t.name.toLowerCase(), t.category.toLowerCase(), 'identity', 'document'],
          rulesSummary: subtext.length > 0 ? subtext.join(' • ') : `Complies with official specifications`
        };
      }),
      ...ALL_VISAS.map(t => ({
        slug: t.slug,
        name: `${t.country} Visa`,
        description: t.description || `Official photography rules: ${t.photo.background} backdrop with face-centering standards for ${t.country}.`,
        category: 'visa',
        categoryLabel: 'Visa Photos',
        path: `/visa/${t.slug}`,
        keywords: [t.name.toLowerCase(), t.country.toLowerCase(), t.category.toLowerCase(), 'visa', 'photo'],
        rulesSummary: `Dimensions: ${t.photo.width}x${t.photo.height}px • Max ${t.photo.maxKB}KB • ${t.photo.background} Backdrop`
      }))
    ];
  }, []);

  const categories = useMemo(() => {
    return [
      { id: 'all', label: 'All', count: allTools.length, icon: Grid },
      { id: 'utility', label: 'Utilities', count: allTools.filter(t => t.category === 'utility').length, icon: Cpu },
      { id: 'central', label: 'Central', count: allTools.filter(t => t.category === 'central').length, icon: BookOpen },
      { id: 'state', label: 'PSC', count: allTools.filter(t => t.category === 'state').length, icon: Globe },
      { id: 'police', label: 'Police', count: allTools.filter(t => t.category === 'police').length, icon: Shield },
      { id: 'judiciary', label: 'Judiciary', count: allTools.filter(t => t.category === 'judiciary').length, icon: FileText },
      { id: 'document', label: 'ID', count: allTools.filter(t => t.category === 'document').length, icon: FileText },
      { id: 'visa', label: 'Visa', count: allTools.filter(t => t.category === 'visa').length, icon: Globe }
    ];
  }, [allTools]);

  // Handle both query filter and category filter
  const filteredTools = useMemo(() => {
    let result = allTools;
    if (selectedCategory !== 'all') {
      result = result.filter(t => t.category === selectedCategory);
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.categoryLabel.toLowerCase().includes(q) ||
        t.rulesSummary.toLowerCase().includes(q) ||
        (t.keywords && t.keywords.some(k => k.toLowerCase().includes(q)))
      );
    }
    return result;
  }, [allTools, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredTools.length / CARDS_PER_PAGE);

  const paginatedTools = useMemo(() => {
    const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
    return filteredTools.slice(startIndex, startIndex + CARDS_PER_PAGE);
  }, [filteredTools, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById('tools-grid-top');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
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
        "name": "All Tools",
        "item": "https://pastedocs.vercel.app/tools"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>All Free Document Resizers, Exam Formats & PDF Tools | PasteDocs</title>
        <meta name="description" content="Browse our complete directory of document resizers. Formats for NEET, JEE, UPSC, SSC, state PSCs, Indian passports, PAN cards, and 50+ international visa specifications." />
        <link rel="canonical" href="https://pastedocs.vercel.app/tools" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 text-center">
            Browse All Tools
          </h1>
          <p className="text-sm text-zinc-500 mt-2 text-center max-w-lg mx-auto">
            Click any tool to auto-load its specifications. Processing runs 100% locally in your browser.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto bg-white border border-zinc-200 rounded-xl shadow-sm flex items-center min-h-[48px] mt-6 mb-8">
            <Search className="absolute left-4 text-zinc-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search exams, tools, or documents..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="text-sm text-zinc-900 placeholder:text-zinc-400 w-full py-3 pl-11 pr-16 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 outline-none rounded-xl"
            />
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="absolute right-4 text-xs font-bold text-zinc-400 hover:text-zinc-950 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Chips with hidden scrollbars representing smooth scrolling */}
        <div className="flex overflow-x-auto md:flex-wrap gap-2 pb-4 mb-6 justify-start md:justify-center px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentPage(1);
                }}
                className={`flex items-center text-xs font-medium px-3 py-1.5 rounded-lg cursor-pointer transition-colors duration-150 whitespace-nowrap shrink-0 ${
                  active 
                    ? 'bg-zinc-900 text-white animate-in' 
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ml-1.5 ${
                  active 
                    ? 'bg-white/20 text-white' 
                    : 'bg-zinc-200 text-zinc-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Anchor point for automatic scrolling to top of the grid */}
        <div id="tools-grid-top" className="scroll-mt-24"></div>

        {/* Result Count and Grid */}
        <div className="w-full">
          <p className="text-xs text-zinc-400 mt-2 mb-4 px-1">
            {searchQuery 
              ? `Showing ${filteredTools.length} results for '${searchQuery}'` 
              : `Showing ${filteredTools.length} tools`
            }
          </p>

          {paginatedTools.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedTools.map((tool) => (
                  <Link 
                    key={`${tool.category}-${tool.slug}`} 
                    to={tool.path}
                    className="flex flex-col bg-white border border-zinc-100 rounded-xl p-4 hover:border-zinc-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer active:scale-[0.99] h-full"
                  >
                    <div className="flex flex-col h-full">
                      {/* Top: badges */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 bg-zinc-50 rounded px-2 py-0.5 truncate">
                          {tool.categoryLabel}
                        </span>
                        <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 rounded px-2 py-0.5 shrink-0">
                          Local
                        </span>
                      </div>

                      {/* Middle: title + description — grows to fill space */}
                      <div className="flex-1 mt-2">
                        <h3 className="text-sm font-semibold text-zinc-900 leading-snug">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed line-clamp-2">
                          {tool.description}
                        </p>
                      </div>

                      {/* Bottom: specs always pinned to bottom */}
                      <div className="mt-3 pt-3 border-t border-zinc-100">
                        <p className="text-[11px] text-zinc-400 font-mono truncate">
                          {tool.rulesSummary.split(' • ').slice(0, 2).join(' • ')}{tool.rulesSummary.split(' • ').length > 2 ? ' • ...' : ''}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* High-Fidelity Pagination Bar */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => {
                      setCurrentPage(prev => Math.max(prev - 1, 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={currentPage === 1}
                    className="bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-700 text-sm px-3 py-1.5 rounded-lg transition-colors"
                  >
                    ←
                  </button>
                  <span className="text-xs text-zinc-500">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => {
                      setCurrentPage(prev => Math.min(prev + 1, totalPages));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={currentPage === totalPages}
                    className="bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-700 text-sm px-3 py-1.5 rounded-lg transition-colors"
                  >
                    →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 text-sm text-zinc-400">
              No tools found for your search
            </div>
          )}
        </div>
      </div>
    </>
  );
}
