import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Shield, Zap, Smartphone, Settings, ChevronDown, ChevronUp, Pencil, Edit2 } from 'lucide-react';
import { ALL_TOOLS } from '../data/toolData';
import { Requirements, parseRulesEngine } from '../lib/parser';
import UploadZone from '../components/UploadZone';
import FileQueue from '../components/FileQueue';
import ProcessorButton from '../components/ProcessorButton';
import ProcessingResults from '../components/ProcessingResults';
import ConfirmationPanel from '../components/ConfirmationPanel';
import ProcessingLoader from '../components/ProcessingLoader';
import { useBackgroundProcessor } from '../hooks/useBackgroundProcessor';
import { useSessionPersist } from '../hooks/useSessionPersist';
import { useDocStore } from '../store/useDocStore';
import { useEffect, useState } from 'react';

interface ToolTemplateProps {
  slugOverride?: string;
}

export default function ToolTemplate({ slugOverride }: ToolTemplateProps = {}) {
  const { slug: routeSlug } = useParams();
  const slug = slugOverride || routeSlug;
  const { requirementText, setRequirementText, files, parsedRequirements, updateRequirement, setActiveRequirements } = useDocStore();
  const [editingChip, setEditingChip] = useState<'format' | 'dimensions' | 'max_weight' | 'dpi' | 'bg_color' | null>(null);

  // Active tab state for the elegant high-density Segmented Page-Type Preset Selector
  const [activeTab, setActiveTab] = useState<'passport' | 'signature' | 'certificate' | 'custom'>('custom');

  // Local rules state for the reactive NLP parser loop
  const [manualRulesText, setManualRulesText] = useState('');

  const [detectedFormat, setDetectedFormat] = useState<string | null>(null);
  const [detectedDimensions, setDetectedDimensions] = useState<{ width: number; height: number } | null>(null);
  const [detectedSize, setDetectedSize] = useState<number | null>(null);
  const [detectedDPI, setDetectedDPI] = useState<number | null>(null);
  const [detectedBg, setDetectedBg] = useState<{ backgroundColor?: string; colorMode?: 'color' | 'grayscale' } | null>(null);

  // Register engine hooks so that file processing actually executes on this page
  useBackgroundProcessor();
  useSessionPersist();

  const normalizedSlug = slug
    ? slug
        .replace('compress-photo-', 'compress-')
        .replace('-photo', '')
    : '';

  const tool = ALL_TOOLS.find(t => t.slug === slug || t.slug === normalizedSlug);

  // Parse and set the requirements dynamically on change
  useEffect(() => {
    if (!tool) return;
    const spec = tool.requirements;
    const parts: string[] = [];
    if (spec.format) {
      parts.push(`format: to ${spec.format === 'jpeg' ? 'jpg' : spec.format}`);
    }
    if (spec.width && spec.height) {
      parts.push(`dimensions: ${spec.width}x${spec.height} px`);
    }
    if (spec.maxSizeBytes) {
      const kb = Math.round(spec.maxSizeBytes / 1024);
      parts.push(`size: max ${kb}KB`);
    }
    if (spec.backgroundColor) {
      if (spec.backgroundColor === '#ffffff') {
        parts.push(`background: plain white background`);
      } else if (spec.backgroundColor === 'transparent') {
        parts.push(`background: no background`);
      }
    }
    const initialText = parts.join(', ') || 'Custom optimization';
    setManualRulesText(initialText);
    setRequirementText(initialText);

    // Auto-map appropriate preset indicator
    const sLow = tool.slug.toLowerCase();
    if (sLow.includes('passport')) {
      setActiveTab('passport');
    } else if (sLow.includes('signature')) {
      setActiveTab('signature');
    } else if (sLow.includes('certificate') || sLow.includes('pdf')) {
      setActiveTab('certificate');
    } else {
      setActiveTab('custom');
    }

    setEditingChip(null);
  }, [tool, setRequirementText]);

  // Set up a dynamic useEffect hook that listens directly to changes in this text state variable. 
  // Implement strict empty string detection loop for erasing, dynamic re-triggering NLP parser.
  useEffect(() => {
    // Before running the regex matches, completely reset the entire state object to null/empty values
    setDetectedFormat(null);
    setDetectedDimensions(null);
    setDetectedSize(null);
    setDetectedDPI(null);
    setDetectedBg(null);

    if (!manualRulesText.trim()) {
      // Instantly wipe central requirements state empty
      setRequirementText('');
    } else {
      // Instantly pass the manual rules string to the core NLP parser
      const parsed = parseRulesEngine(manualRulesText);
      setRequirementText(manualRulesText);

      // Populate detected fields
      if (parsed.detectedFields?.includes('Format') && parsed.format) {
        setDetectedFormat(parsed.format);
      }
      if (parsed.detectedFields?.includes('Dimensions') && parsed.width && parsed.height) {
        setDetectedDimensions({ width: parsed.width, height: parsed.height });
      }
      if (parsed.detectedFields?.includes('Size') && parsed.maxSizeBytes) {
        setDetectedSize(parsed.maxSizeBytes);
      }
      if (parsed.detectedFields?.includes('DPI') && parsed.dpi) {
        setDetectedDPI(parsed.dpi);
      }
      if (parsed.detectedFields?.includes('Background') || parsed.detectedFields?.includes('ColorMode')) {
        setDetectedBg({
          backgroundColor: parsed.backgroundColor,
          colorMode: parsed.colorMode
        });
      }
    }
  }, [manualRulesText, setRequirementText]);

  if (!tool) {
    return <Navigate to="/404" replace />;
  }

  const hasFiles = files.length > 0;
  const isProcessing = files.some(f => f.status === 'processing');
  const hasResults = files.some(f => f.status === 'completed' || f.status === 'error');

  // String check helper for empty state
  const isTextareaEmpty = !manualRulesText.trim();

  // Compute active requirements dynamically with strict total text erasure check
  const activeFormat = isTextareaEmpty ? null : detectedFormat;
  const activeWidth = isTextareaEmpty ? undefined : detectedDimensions?.width;
  const activeHeight = isTextareaEmpty ? undefined : detectedDimensions?.height;
  const activeMaxBytes = isTextareaEmpty ? undefined : (detectedSize || undefined);
  const activeDpi = isTextareaEmpty ? undefined : (detectedDPI || undefined);
  const activeBackground = isTextareaEmpty ? undefined : (detectedBg?.backgroundColor || undefined);
  const activeColorMode = isTextareaEmpty ? undefined : (detectedBg?.colorMode || undefined);

  const displayKb = activeMaxBytes 
    ? `Max ${Math.round(activeMaxBytes / 1024)}KB` 
    : 'Optimum scaling';

  // Synchronise merged requirements with the central store so that background processing and ConfirmationPanel are perfectly in-sync
  useEffect(() => {
    const merged: Requirements = {
      ...parsedRequirements,
      format: activeFormat || undefined,
      width: activeWidth,
      height: activeHeight,
      maxSizeBytes: activeMaxBytes,
      dpi: activeDpi,
      backgroundColor: activeBackground,
      colorMode: activeColorMode,
      docType: parsedRequirements?.docType || (tool.requirements as any).docType || 'photo',
      detectedFields: parsedRequirements?.detectedFields || ['Format', 'Dimensions', 'Size']
    };
    setActiveRequirements(merged);
    
    // Cleanup on component unmount
    return () => {
      setActiveRequirements(null);
    };
  }, [parsedRequirements, activeFormat, activeWidth, activeHeight, activeMaxBytes, activeDpi, activeBackground, activeColorMode, tool, setActiveRequirements]);

  const reconstructText = (
    format?: string | null,
    width?: number,
    height?: number,
    maxBytes?: number,
    dpi?: number,
    bg?: string,
    colorMode?: string
  ) => {
    const parts: string[] = [];
    if (format) {
      parts.push(`format: ${format === 'jpeg' ? 'jpg' : format}`);
    }
    if (width && height) {
      parts.push(`dimensions: ${width}x${height} px`);
    } else if (width) {
      parts.push(`width: ${width} px`);
    } else if (height) {
      parts.push(`height: ${height} px`);
    }
    if (maxBytes) {
      const kb = Math.round(maxBytes / 1024);
      parts.push(`maximum kb: ${kb}kb`);
    }
    if (dpi) {
      parts.push(`dpi: ${dpi}`);
    }
    if (bg) {
      if (bg === '#ffffff') {
        parts.push(`background: plain white background`);
      } else if (bg === 'transparent') {
        parts.push(`background: no background`);
      } else if (bg === '#0066cc') {
        parts.push(`background: blue background`);
      } else if (bg === '#f5f5f5') {
        parts.push(`background: light grey background`);
      } else {
        parts.push(`background: ${bg}`);
      }
    }
    if (colorMode) {
      parts.push(`color: ${colorMode}`);
    }
    return parts.join(', ') || '';
  };

  const bulletSpec = [
    activeFormat ? `Format: ${(activeFormat === 'jpeg' ? 'jpg' : activeFormat).toUpperCase()}` : '',
    (activeWidth && activeHeight) ? `Dim: ${activeWidth}x${activeHeight}px` : '',
    displayKb
  ].filter(Boolean).join(' • ');

  // Dynamic SEO details
  const metaTitle = `${tool.name} Tool - Online & 100% Offline | PasteDocs`;
  const metaDescription = `Instantly format files for ${tool.name}. Follows current rules: ${bulletSpec || 'Configured Automatically'}. 100% private browser processing.`;
  const h1 = `${tool.name} Tool — 100% Free & Local`;
  const content = `Maintaining correct file sizes and layouts is critical for government form submissions, admissions, and photo updates. Our ${tool.name} tool handles standard compliance rules automatically.\n\nEverything operates locally inside your browser's memory using progressive image codecs. Adjust guidelines dynamically, crops borders with ease, and generates standard-compliant documents ready for immediate portal uploads.`;

  // Dynamic social preview image mapping from Unsplash (copyright-safe)
  let currentImageUrl = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828'; // Default passport/global document
  const s = tool.slug.toLowerCase();
  if (s.includes('neet') || s.includes('exam') || s.includes('upsc') || s.includes('ssc')) {
    currentImageUrl = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d'; // Study/exam
  } else if (s.includes('signature')) {
    currentImageUrl = 'https://images.unsplash.com/photo-1450133064473-71024230f91b'; // Signature pen
  } else if (s.includes('passport') || s.includes('visa') || s.includes('stamp')) {
    currentImageUrl = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828'; // Passport/travel
  } else if (s.includes('pdf')) {
    currentImageUrl = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40'; // Document/tech
  } else {
    currentImageUrl = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'; // Workspace desk
  }

  if (currentImageUrl.includes('unsplash.com')) {
    currentImageUrl = `${currentImageUrl.split('?')[0]}?auto=format&fit=crop&w=1200&h=630&q=80`;
  }

  const faq = [
    {
      question: `What does the ${tool.name} utility do?`,
      answer: `${tool.description}. It adjusts layouts, scales dimensions, and optimizes qualities step-by-step so that files meet your target constraints. Check the specifications in our configuration line.`
    },
    {
      question: `Does this utility upload my files or credentials?`,
      answer: `Never. PasteDocs is built with zero server-side uploads. Your files exist solely inside your browser. No metadata, identifiers, or signature shapes leave your hardware.`
    },
    {
      question: `Why should I use PasteDocs instead of standard editing tools?`,
      answer: `Standard photo filters don't give exact KB-level iterative control. PasteDocs lets you configure targets like 'max 50kb' or '3.5x4.5cm' directly, auto-computing the right trade-off between strict constraints and visual sharpness.`
    }
  ];

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`https://pastedocs.vercel.app/tool/${tool.slug}`} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={`https://pastedocs.vercel.app/tool/${tool.slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PasteDocs" />
        <meta property="og:image" content={currentImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="keywords" content={`${tool.name}, image utility, online compressor, local photo crop`} />
      </Helmet>

      {/* Hero Section with Generous Vertical Padding */}
      <div className="py-12 sm:py-16">
        <div className="w-full max-w-[1024px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-10">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider mb-6 border border-emerald-500/10">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Free • Offline Secure • Instant Local Run
            </div>
            
            {/* Headline */}
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight sm:text-4xl lg:text-5xl mb-4 leading-tight max-w-4xl mx-auto">
              {h1}
            </h1>
            
            {/* Subheadline */}
            <p className="text-sm sm:text-base text-zinc-500 max-w-[640px] mx-auto mb-10 leading-relaxed">
              We've pre-configured the parameters for {tool.name}. Drag and drop any document to match requirements instantly.
            </p>

            {/* Premium Row of Minimal Micro-Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl mx-auto mb-8">
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-zinc-100 shadow-sm text-left">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-zinc-700">Safe browser-only converter</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-zinc-100 shadow-sm text-left">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-zinc-700">Fits mobile, Android, iOS</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-zinc-100 shadow-sm text-left">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-zinc-700">Millisecond conversion</span>
              </div>
            </div>
          </div>
                    {/* Tool Embedded Block with 2-Column Dashboard-Style SaaS layout */}
          <div className="w-full relative z-10 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: ACTIVE OPERATIONAL WORKSPACE (lg:col-span-7) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* File Drop Zone / Uploaded Files thumbnail grid */}
                <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm space-y-4 text-left">
                  <UploadZone />
                  <FileQueue />
                </div>

                {/* Rules Customizer container - Redesigned into a premium, ultra-compact "Segmented Settings System" */}
                <div className="bg-white border border-zinc-200/85 rounded-2xl p-5 shadow-sm text-left animate-fade-in" id="rules-configuration-container">
                  
                  {/* Dynamic Header */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-1.5">
                      <span className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest font-sans">
                        Document Specification Engine
                      </span>
                      <span className="bg-zinc-50 border border-zinc-150 text-zinc-650 text-[9px] font-bold px-1.5 py-0.5 rounded-full select-none">
                        Premium Page System
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-medium">Auto-synced</span>
                  </div>

                  {/* STEP 1: QUICK-APPLY PRESET SEGMENTS TABS ("Page Type System") */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 bg-zinc-100/75 rounded-xl mb-4 border border-zinc-200/40">
                    <button
                      type="button"
                      onClick={() => {
                        const txt = "Format: JPEG, Dimensions: 350x450 px, Maximum KB: 50KB";
                        setManualRulesText(txt);
                        setActiveTab('passport');
                      }}
                      className={`py-2 px-1 text-[11px] font-bold rounded-lg transition-all duration-150 cursor-pointer flex items-center justify-center gap-1 select-none ${activeTab === 'passport' ? 'bg-white text-zinc-950 shadow-sm border border-zinc-200/30' : 'text-zinc-605 hover:text-zinc-900 hover:bg-white/40'}`}
                    >
                      <span className="text-xs">👤</span> <span className="truncate">Passport Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const txt = "Format: JPEG, Dimensions: 280x120 px, Maximum KB: 20KB";
                        setManualRulesText(txt);
                        setActiveTab('signature');
                      }}
                      className={`py-2 px-1 text-[11px] font-bold rounded-lg transition-all duration-150 cursor-pointer flex items-center justify-center gap-1 select-none ${activeTab === 'signature' ? 'bg-white text-zinc-950 shadow-sm border border-zinc-200/30' : 'text-zinc-605 hover:text-zinc-900 hover:bg-white/40'}`}
                    >
                      <span className="text-xs">✍️</span> <span className="truncate">Exam Signature</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const txt = "Format: PDF, Maximum KB: 300KB";
                        setManualRulesText(txt);
                        setActiveTab('certificate');
                      }}
                      className={`py-2 px-1 text-[11px] font-bold rounded-lg transition-all duration-150 cursor-pointer flex items-center justify-center gap-1 select-none ${activeTab === 'certificate' ? 'bg-white text-zinc-950 shadow-sm border border-zinc-200/30' : 'text-zinc-605 hover:text-zinc-900 hover:bg-white/40'}`}
                    >
                      <span className="text-xs">📄</span> <span className="truncate">Certificate</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('custom');
                      }}
                      className={`py-2 px-1 text-[11px] font-bold rounded-lg transition-all duration-150 cursor-pointer flex items-center justify-center gap-1 select-none ${activeTab === 'custom' ? 'bg-white text-zinc-950 shadow-sm border border-zinc-200/30' : 'text-zinc-605 hover:text-zinc-900 hover:bg-white/40'}`}
                    >
                      <span className="text-xs">⚙️</span> <span className="truncate">Custom Rules</span>
                    </button>
                  </div>

                  {/* STEP 2: HIGH-DENSITY PROPERTIES RIBBON (PROPERTIES PANEL LOOK-AND-FEEL) */}
                  <div className="bg-zinc-50 border border-zinc-200/50 rounded-xl p-3 mb-3.5">
                    <div className="flex items-center justify-between mb-2 px-1 select-none">
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest font-sans">
                        Active Target Specifications
                      </span>
                      <span className="text-[9px] text-zinc-400 font-medium font-sans">Modify values inline</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                      {/* Format Selector */}
                      <div className="bg-white border border-zinc-200/65 rounded-lg p-1.5 flex flex-col justify-between min-h-[48px]">
                        <span className="text-[8px] font-bold text-zinc-400 uppercase select-none tracking-wider">Format</span>
                        <select
                          value={activeFormat || 'jpeg'}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateRequirement('format', val);
                            const text = reconstructText(
                              val,
                              activeWidth,
                              activeHeight,
                              activeMaxBytes,
                              activeDpi,
                              activeBackground,
                              activeColorMode
                            );
                            setManualRulesText(text);
                          }}
                          className="w-full bg-transparent text-xs font-bold text-zinc-900 border-none outline-none focus:ring-0 p-0 cursor-pointer mt-0.5 font-mono"
                        >
                          <option value="jpeg">JPEG</option>
                          <option value="png">PNG</option>
                          <option value="webp">WEBP</option>
                          <option value="pdf">PDF</option>
                        </select>
                      </div>

                      {/* Dimensions Input */}
                      <div className="bg-white border border-zinc-200/65 rounded-lg p-1.5 flex flex-col justify-between min-h-[48px]">
                        <span className="text-[8px] font-bold text-zinc-400 uppercase select-none tracking-wider font-sans">Dimensions</span>
                        <div className="flex items-center gap-1 mt-0.5 animate-fade-in">
                          <input
                            type="number"
                            placeholder="W"
                            value={activeWidth || ''}
                            onChange={(e) => {
                              const w = parseInt(e.target.value, 10);
                              const finalW = isNaN(w) ? undefined : w;
                              updateRequirement('width', finalW);
                              const text = reconstructText(
                                activeFormat,
                                finalW,
                                activeHeight,
                                activeMaxBytes,
                                activeDpi,
                                activeBackground,
                                activeColorMode
                              );
                              setManualRulesText(text);
                            }}
                            className="w-8 bg-transparent text-center text-xs font-bold text-zinc-900 border-none outline-none focus:ring-0 p-0 font-mono"
                          />
                          <span className="text-zinc-300 font-bold text-[9px] select-none">×</span>
                          <input
                            type="number"
                            placeholder="H"
                            value={activeHeight || ''}
                            onChange={(e) => {
                              const h = parseInt(e.target.value, 10);
                              const finalH = isNaN(h) ? undefined : h;
                              updateRequirement('height', finalH);
                              const text = reconstructText(
                                activeFormat,
                                activeWidth,
                                finalH,
                                activeMaxBytes,
                                activeDpi,
                                activeBackground,
                                activeColorMode
                              );
                              setManualRulesText(text);
                            }}
                            className="w-8 bg-transparent text-center text-xs font-bold text-zinc-900 border-none outline-none focus:ring-0 p-0 font-mono"
                          />
                          <span className="text-[8px] text-zinc-400 font-bold select-none font-sans">px</span>
                        </div>
                      </div>

                      {/* Max Weight Input */}
                      <div className="bg-white border border-zinc-200/65 rounded-lg p-1.5 flex flex-col justify-between min-h-[48px]">
                        <span className="text-[8px] font-bold text-zinc-400 uppercase select-none tracking-wider font-sans">Max Size</span>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          <input
                            type="number"
                            placeholder="Auto"
                            value={activeMaxBytes ? Math.round(activeMaxBytes / 1024) : ''}
                            onChange={(e) => {
                              const kb = parseFloat(e.target.value);
                              const maxBytes = isNaN(kb) ? undefined : kb * 1024;
                              updateRequirement('maxSizeBytes', maxBytes);
                              const text = reconstructText(
                                activeFormat,
                                activeWidth,
                                activeHeight,
                                maxBytes,
                                activeDpi,
                                activeBackground,
                                activeColorMode
                              );
                              setManualRulesText(text);
                            }}
                            className="w-10 bg-transparent text-center text-xs font-bold text-zinc-900 border-none outline-none focus:ring-0 p-0 font-mono"
                          />
                          <span className="text-[8px] text-zinc-400 font-bold select-none font-sans">KB</span>
                        </div>
                      </div>

                      {/* DPI Input */}
                      <div className="bg-white border border-zinc-200/65 rounded-lg p-1.5 flex flex-col justify-between min-h-[48px]">
                        <span className="text-[8px] font-bold text-zinc-400 uppercase select-none tracking-wider font-sans font-sans">DPI</span>
                        <input
                          type="number"
                          placeholder="Auto"
                          value={activeDpi || ''}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            const finalDpi = isNaN(val) ? undefined : val;
                            updateRequirement('dpi', finalDpi);
                            const text = reconstructText(
                              activeFormat,
                              activeWidth,
                              activeHeight,
                              activeMaxBytes,
                              finalDpi,
                              activeBackground,
                              activeColorMode
                            );
                            setManualRulesText(text);
                          }}
                          className="w-full bg-transparent text-left text-xs font-bold text-zinc-900 border-none outline-none focus:ring-0 p-0 mt-0.5 font-mono"
                        />
                      </div>

                      {/* BG Background Style Selector */}
                      <div className="bg-white border border-zinc-200/65 rounded-lg p-1.5 col-span-2 sm:col-span-1 flex flex-col justify-between min-h-[48px]">
                        <span className="text-[8px] font-bold text-zinc-400 uppercase select-none tracking-wider font-sans font-sans">BG Color</span>
                        <select
                          value={activeBackground === 'transparent' ? 'transparent' : (activeBackground === '#ffffff' ? 'white' : (activeColorMode === 'grayscale' ? 'grayscale' : 'default'))}
                          onChange={(e) => {
                            const val = e.target.value;
                            let finalBg = activeBackground;
                            let finalColor = activeColorMode;

                            if (val === 'transparent') {
                              finalBg = 'transparent';
                              finalColor = undefined;
                            } else if (val === 'white') {
                              finalBg = '#ffffff';
                              finalColor = undefined;
                            } else if (val === 'grayscale') {
                              finalBg = undefined;
                              finalColor = 'grayscale';
                            } else {
                              finalBg = undefined;
                              finalColor = undefined;
                            }

                            updateRequirement('backgroundColor', finalBg);
                            updateRequirement('colorMode', finalColor);

                            const text = reconstructText(
                              activeFormat,
                              activeWidth,
                              activeHeight,
                              activeMaxBytes,
                              activeDpi,
                              finalBg,
                              finalColor
                            );
                            setManualRulesText(text);
                          }}
                          className="w-full bg-transparent text-xs font-bold text-zinc-900 border-none outline-none focus:ring-0 p-0 cursor-pointer mt-0.5 font-sans"
                        >
                          <option value="default">Default</option>
                          <option value="white">White BG</option>
                          <option value="transparent">Transparent</option>
                          <option value="grayscale">Grayscale</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* STEP 3: COLLAPSIBLE / EXTANDABLE CUSTOM NLP RULES INSTRUCTION FIELD */}
                  {activeTab === 'custom' && (
                    <div className="mb-2 animate-fade-in text-left">
                      <label htmlFor="input-manual-rules" className="block text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest mb-1 font-sans">
                        Describe Rules with Natural Language
                      </label>
                      <input
                        type="text"
                        id="input-manual-rules"
                        value={manualRulesText}
                        onChange={(e) => setManualRulesText(e.target.value)}
                        placeholder="e.g. format: webp, dimensions: 500x500, size: max 100KB"
                        className="w-full bg-white border border-zinc-200 focus:border-zinc-350 focus:ring-2 focus:ring-zinc-100 rounded-lg py-1.5 px-3 text-xs text-zinc-900 outline-none transition-all shadow-inner font-medium"
                      />
                    </div>
                  )}

                  {/* STEP 4: GREEN PILLS INDICATORS FOR SPECIAL OPERATIONS (BG REMOVAL & STAMP) */}
                  {(() => {
                    const hasBgRemovalTerm = /transparent|no background|remove background|bg removal|white background|बैकग्राउंड हटाना|पาร์श्वभूमि हटाना|બેકગ્રાઉન્ડ દૂર કરો|સફેદ બેકગ્રાઉન્ડ/i.test(manualRulesText) || (parsedRequirements?.backgroundColor === 'transparent');
                    const hasNameDateStampTerm = /name\s*(?:and|&)\s*date|date stamp|name stamp|candidate name|नाम और तारीख|नाम और दिनांक|નામ અને તારીખ/i.test(manualRulesText) || (parsedRequirements?.nameRequired || parsedRequirements?.dateRequired);
                    
                    if (!hasBgRemovalTerm && !hasNameDateStampTerm) return null;

                    return (
                      <div className="mt-3 pt-2.5 border-t border-zinc-150 flex flex-wrap gap-2">
                        {hasBgRemovalTerm && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-850 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-500/10 shadow-sm">
                            ✓ Background Removal Active
                          </span>
                        )}
                        {hasNameDateStampTerm && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-850 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-500/10 shadow-sm">
                            ✓ Date Stamp Overlay Included
                          </span>
                        )}
                      </div>
                    );
                  })()}

                </div>

                {/* Main "Process Now" Action Button */}
                {hasFiles && (
                  <div className="bg-white border border-zinc-200/80 p-5 rounded-2xl shadow-sm text-left flex flex-col gap-4">
                    <ConfirmationPanel />
                    {isProcessing ? (
                      <div className="py-10 flex flex-col items-center justify-center text-center bg-zinc-50 rounded-2xl border border-dashed border-zinc-250 animate-pulse w-full">
                        <div className="relative flex items-center justify-center w-12 h-12 mb-4">
                          <div className="absolute w-12 h-12 border-4 border-zinc-100 rounded-full"></div>
                          <div className="absolute w-12 h-12 border-4 border-t-zinc-900 border-r-zinc-900 rounded-full animate-spin"></div>
                        </div>
                        <h3 className="text-sm font-semibold text-zinc-900 tracking-tight flex items-center justify-center gap-0.5">
                          <span>Processing locally</span>
                          <span className="inline-flex w-5 text-left animate-pulse">...</span>
                        </h3>
                        <p className="text-xs text-zinc-400 mt-2 font-medium">
                          Strictly browser-based. Zero file uploads
                        </p>
                      </div>
                    ) : (
                      <ProcessorButton />
                    )}
                  </div>
                )}

              </div>

              {/* RIGHT COLUMN: INSTANT CONVERSION FEEDBACK SIDE (lg:col-span-5) */}
              <div className="lg:col-span-5 lg:sticky lg:top-6 bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm space-y-4 text-left">
                {hasResults ? (
                  <div className="space-y-4">
                    <header className="flex items-center justify-between pb-3 border-b border-zinc-100">
                      <h2 className="text-sm font-bold text-zinc-900 tracking-tight">Finished Results</h2>
                      <button
                        onClick={() => useDocStore.getState().clearAll()}
                        className="text-[11px] font-bold text-red-500 hover:bg-red-50 hover:text-red-700 px-2.5 py-1.5 rounded-lg transition-colors min-h-[36px]"
                      >
                        Clear All
                      </button>
                    </header>
                    <ProcessingResults />
                  </div>
                ) : (
                  <div className="py-12 px-4 flex flex-col items-center justify-center text-center border-2 border-dashed border-zinc-100 rounded-xl bg-zinc-50/20">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 animate-pulse">
                      <Zap className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-bold text-zinc-950 tracking-tight">Awaiting Live Output</h3>
                    <p className="text-[11px] text-zinc-450 mt-1 max-w-[240px] leading-relaxed font-semibold">
                      Configure specifications, upload documents, and click "Process Now" to instantly preview and download assets.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Decorative ultra-faint layout rule line for About and FAQs */}
      <hr className="border-zinc-100 my-16 max-w-[1024px] mx-auto" />

      {/* About and FAQ Accordion refactored with clean layout dividers */}
      <div className="max-w-[1024px] mx-auto px-4 sm:px-6 md:px-8 pb-16">
        <div className="max-w-3xl mx-auto">
          <article className="prose prose-zinc max-w-none mb-12 text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-4 tracking-tight">About this Utility</h2>
            <div className="text-sm text-zinc-650 leading-relaxed whitespace-pre-line font-medium">
              {content}
            </div>
          </article>
          
          <div className="border-t border-zinc-100 pt-12 block text-left" id="faq-section">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-6 tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faq.map((item, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-zinc-100 shadow-sm text-left">
                  <h3 className="text-sm font-semibold text-zinc-900">{item.question}</h3>
                  <p className="text-xs text-zinc-550 mt-1.5 leading-relaxed font-semibold">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ProcessingLoader isProcessing={isProcessing} />
    </>
  );
}
