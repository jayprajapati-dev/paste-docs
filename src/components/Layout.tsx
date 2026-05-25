import { Outlet, Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Flame, BookOpen, FileText, Globe, Award, Shield, Cpu } from 'lucide-react';
import PWAPrompt from './PWAPrompt';
import Footer from './Footer';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'tools' | 'exams' | 'docs' | 'visa' | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  // Accordion state for mobile menu
  const [mobileAccordions, setMobileAccordions] = useState({
    tools: false,
    exams: false,
    docs: false,
    visa: false
  });

  const handleMouseEnter = (menu: 'tools' | 'exams' | 'docs' | 'visa') => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // small delay to allow moving mouse to the dropdown card safely
  };

  useEffect(() => {
    const handleDocumentClick = () => {
      setActiveDropdown(null);
    };
    document.addEventListener('click', handleDocumentClick);

    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const closeAllMenus = () => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileAccordion = (key: 'tools' | 'exams' | 'docs' | 'visa') => {
    setMobileAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-50/35 text-zinc-600 font-sans flex flex-col selection:bg-zinc-200">
      
      {/* Dynamic Header System */}
      <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 w-full border-b border-zinc-100 transition-all duration-300">
        <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 w-full">
          <div className="flex items-center justify-between gap-3 h-14">
            
            {/* Logo Group */}
            <Link 
              to="/" 
              onClick={closeAllMenus}
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity shrink-0 group"
            >
              <div className="w-9 h-9 bg-zinc-950 text-white rounded-xl flex items-center justify-center font-bold text-lg leading-none shadow-md group-hover:scale-105 transition-transform duration-200">
                P
              </div>
              <span className="text-lg font-black tracking-tight text-zinc-950">PasteDocs</span>
            </Link>
            
            {/* Desktop Navigation Links / Mega Menu System */}
            <div className="hidden md:flex items-center gap-8 mx-auto">
              
              {/* Dropdown 1: All Tools */}
              <div 
                className="relative cursor-pointer py-5"
                onMouseEnter={() => handleMouseEnter('tools')}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === 'tools' ? null : 'tools');
                }}
              >
                <button className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${activeDropdown === 'tools' ? 'text-zinc-900 font-semibold' : 'text-zinc-600 hover:text-zinc-900'}`}>
                  <span>All Tools</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-250 ${activeDropdown === 'tools' ? 'rotate-180 text-zinc-950' : 'text-zinc-400'}`} />
                </button>

                {activeDropdown === 'tools' && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-[56px] left-[-120px] xl:left-[-150px] w-[640px] bg-white rounded-2xl border border-zinc-100 shadow-2xl p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    
                    {/* Column 1: Image Tools */}
                    <div className="flex flex-col gap-3">
                      <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-1 flex items-center gap-1">
                        <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                        Image Tools
                      </h4>
                      <div className="flex flex-col gap-2 text-sm">
                        <Link to="/tool/compress-photo-50kb" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium hover:translate-x-0.5 transition-transform">Compress to 50KB</Link>
                        <Link to="/tool/compress-photo-20kb" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium hover:translate-x-0.5 transition-transform">Compress to 20KB</Link>
                        <Link to="/tool/passport-size-photo" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium hover:translate-x-0.5 transition-transform">Passport Size Photo</Link>
                        <Link to="/tool/stamp-size-photo" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium hover:translate-x-0.5 transition-transform">Stamp Size Photo</Link>
                        <Link to="/tool/signature-resize" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium hover:translate-x-0.5 transition-transform">Signature Resize</Link>
                        <Link to="/tool/white-background" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium hover:translate-x-0.5 transition-transform">Add White Background</Link>
                      </div>
                    </div>

                    {/* Column 2: Convert */}
                    <div className="flex flex-col gap-3">
                      <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-1 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-zinc-400" />
                        Convert
                      </h4>
                      <div className="flex flex-col gap-2 text-sm">
                        <Link to="/tool/jpg-to-png" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium hover:translate-x-0.5 transition-transform">JPG to PNG</Link>
                        <Link to="/tool/png-to-jpg" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium hover:translate-x-0.5 transition-transform">PNG to JPG</Link>
                        <div className="flex items-center gap-1">
                          <Link to="/tool/heic-to-jpg" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium hover:translate-x-0.5 transition-transform">HEIC to JPG</Link>
                          <span className="bg-blue-50 text-blue-600 text-[8px] font-bold px-1 rounded">iOS</span>
                        </div>
                        <Link to="/tool/image-to-pdf" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium hover:translate-x-0.5 transition-transform">Image to PDF</Link>
                        <Link to="/tool/pdf-compress" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium hover:translate-x-0.5 transition-transform">PDF Compress</Link>
                        <Link to="/tool/pdf-to-jpg" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium hover:translate-x-0.5 transition-transform">PDF to Image</Link>
                      </div>
                    </div>

                    {/* Column 3: Popular Right Now */}
                    <div className="flex flex-col gap-3 bg-zinc-50/50 p-4 rounded-xl border border-zinc-100">
                      <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-1 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                        Popular Now
                      </h4>
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center justify-between">
                          <Link to="/exam/neet-ug" onClick={closeAllMenus} className="text-zinc-700 hover:text-blue-600 font-semibold hover:translate-x-0.5 transition-transform">NEET Photo</Link>
                          <span className="bg-orange-50 text-orange-600 text-[9px] font-bold px-1.5 py-0.5 rounded">HOT</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <Link to="/exam/ssc-cgl" onClick={closeAllMenus} className="text-zinc-700 hover:text-blue-600 font-semibold hover:translate-x-0.5 transition-transform">SSC CGL Photo</Link>
                          <span className="bg-orange-50 text-orange-600 text-[9px] font-bold px-1.5 py-0.5 rounded">NEW</span>
                        </div>
                        <Link to="/exam/ibps-po" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-semibold hover:translate-x-0.5 transition-transform">IBPS PO Photo</Link>
                        <Link to="/visa/us-visa-photo" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium hover:translate-x-0.5 transition-transform">US Visa Photo</Link>
                        <Link to="/visa/schengen-visa-photo" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium hover:translate-x-0.5 transition-transform">Schengen Visa</Link>
                        <Link to="/doc/passport-photo" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium hover:translate-x-0.5 transition-transform">Passport India</Link>
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* Dropdown 2: Exams */}
              <div 
                className="relative cursor-pointer py-5"
                onMouseEnter={() => handleMouseEnter('exams')}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === 'exams' ? null : 'exams');
                }}
              >
                <button className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${activeDropdown === 'exams' ? 'text-zinc-900 font-semibold' : 'text-zinc-600 hover:text-zinc-900'}`}>
                  <span>Exams</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-250 ${activeDropdown === 'exams' ? 'rotate-180 text-zinc-950' : 'text-zinc-400'}`} />
                </button>

                {activeDropdown === 'exams' && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-[56px] left-[-200px] w-[700px] bg-white rounded-2xl border border-zinc-100 shadow-2xl p-6 flex flex-col gap-6 animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    
                    {/* Row 1: Central Exams */}
                    <div className="grid grid-cols-4 gap-4 pb-4 border-b border-zinc-100/70">
                      <div className="col-span-1">
                        <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-zinc-400" />
                          Central
                        </h4>
                      </div>
                      <div className="col-span-3 grid grid-cols-3 gap-y-2.5 gap-x-2 text-sm">
                        <Link to="/exam/neet-ug" onClick={closeAllMenus} className="text-zinc-700 hover:text-blue-600 font-semibold">NEET UG</Link>
                        <Link to="/exam/jee-main" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium">JEE Main</Link>
                        <Link to="/exam/upsc-cse" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium">UPSC CSE</Link>
                        <Link to="/exam/ssc-cgl" onClick={closeAllMenus} className="text-zinc-700 hover:text-blue-600 font-semibold">SSC CGL</Link>
                        <Link to="/exam/ibps-po" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium">IBPS PO</Link>
                        <Link to="/exam/sbi-po" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium">SBI PO</Link>
                        <Link to="/exam/railway-ntpc" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium">Railway NTPC</Link>
                        <Link to="/exam/india-post-gds" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium">Post GDS</Link>
                      </div>
                    </div>

                    {/* Row 2: State Exams */}
                    <div className="grid grid-cols-4 gap-4 pb-4 border-b border-zinc-100/70">
                      <div className="col-span-1">
                        <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5 text-zinc-400" />
                          State PSC
                        </h4>
                      </div>
                      <div className="col-span-3 grid grid-cols-3 gap-y-2.5 gap-x-2 text-sm">
                        <Link to="/exam/gpsc" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium">GPSC Gujarat</Link>
                        <Link to="/exam/mpsc" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium">MPSC Maha</Link>
                        <Link to="/exam/tnpsc" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium">TNPSC Tamil</Link>
                      </div>
                    </div>

                    {/* Row 3: Entrance Ex */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-1">
                        <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                          Entrance
                        </h4>
                      </div>
                      <div className="col-span-3 grid grid-cols-3 gap-y-2.5 gap-x-2 text-sm">
                        <Link to="/exam/cuet-ug" onClick={closeAllMenus} className="text-zinc-700 hover:text-blue-600 font-semibold">CUET UG</Link>
                        <Link to="/exam/ctet" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium">CTET Teaching</Link>
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* Dropdown 3: Documents */}
              <div 
                className="relative cursor-pointer py-5"
                onMouseEnter={() => handleMouseEnter('docs')}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === 'docs' ? null : 'docs');
                }}
              >
                <button className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${activeDropdown === 'docs' ? 'text-zinc-900 font-semibold' : 'text-zinc-600 hover:text-zinc-900'}`}>
                  <span>Documents</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-250 ${activeDropdown === 'docs' ? 'rotate-180 text-zinc-950' : 'text-zinc-400'}`} />
                </button>

                {activeDropdown === 'docs' && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-[56px] left-[-200px] w-[500px] bg-white rounded-2xl border border-zinc-100 shadow-2xl p-6 flex flex-col gap-5 animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    
                    {/* Row 1: Identity */}
                    <div className="flex flex-col gap-2.5">
                      <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-1 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-zinc-400" />
                        Identity Documents
                      </h4>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <Link to="/doc/passport-photo" onClick={closeAllMenus} className="text-zinc-700 hover:text-blue-600 font-semibold">Passport</Link>
                        <Link to="/doc/pan-card-photo" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium">PAN Card</Link>
                        <Link to="/doc/aadhaar-photo" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium">Aadhaar Card</Link>
                      </div>
                    </div>

                    {/* Row 2: Education Certificate Resizers */}
                    <div className="flex flex-col gap-2.5 bg-zinc-50/50 p-3.5 rounded-xl border border-zinc-100">
                      <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-1 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-zinc-400" />
                        Education & Certificate Tools
                      </h4>
                      <p className="text-[11px] text-zinc-400 -mt-2">Fits portal rules precisely:</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <Link to="/tool/pdf-compress" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium">Marksheet PDF Compress</Link>
                        <Link to="/tool/image-to-pdf" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium">Convert Certificate to PDF</Link>
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* Dropdown 4: Visa */}
              <div 
                className="relative cursor-pointer py-5"
                onMouseEnter={() => handleMouseEnter('visa')}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === 'visa' ? null : 'visa');
                }}
              >
                <button className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${activeDropdown === 'visa' ? 'text-zinc-900 font-semibold' : 'text-zinc-600 hover:text-zinc-900'}`}>
                  <span>Visa</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-250 ${activeDropdown === 'visa' ? 'rotate-180 text-zinc-950' : 'text-zinc-400'}`} />
                </button>

                {activeDropdown === 'visa' && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-[56px] left-[-150px] w-[560px] bg-white rounded-2xl border border-zinc-100 shadow-2xl p-6 flex flex-col gap-5 animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    
                    {/* Row 1: Popular Visas */}
                    <div className="flex flex-col gap-2.5">
                      <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-1 flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5 text-zinc-400" />
                        Western Visa Photos
                      </h4>
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <Link to="/visa/us-visa-photo" onClick={closeAllMenus} className="text-zinc-700 hover:text-blue-600 font-semibold">USA Visa</Link>
                        <Link to="/visa/uk-visa-photo" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium">UK Visa</Link>
                        <Link to="/visa/schengen-visa-photo" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium">Schengen</Link>
                        <Link to="/visa/canada-visa-photo" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium">Canada PR</Link>
                      </div>
                    </div>

                    {/* Row 2: Asia & ME Visas */}
                    <div className="flex flex-col gap-2.5">
                      <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-1 flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5 text-blue-500" />
                        Asia & Middle East
                      </h4>
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <Link to="/visa/dubai-uae-visa-photo" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium">Dubai UAE</Link>
                        <Link to="/visa/singapore-visa-photo" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium">Singapore</Link>
                        <Link to="/visa/japan-visa-photo" onClick={closeAllMenus} className="text-zinc-600 hover:text-zinc-950 font-medium">Japan Visa</Link>
                        <Link to="/visa/singapore-visa-photo" onClick={closeAllMenus} className="text-zinc-400 hover:text-zinc-400 cursor-not-allowed">Malaysia</Link>
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* Direct blog & about links */}
              <Link to="/blog" onClick={closeAllMenus} className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Blog</Link>
              <Link to="/about" onClick={closeAllMenus} className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">About</Link>
            </div>

            {/* Right Badge Options (100% Client Side / Secure) */}
            <div className="hidden xl:flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                100% client-side
              </span>
            </div>

            {/* Mobile Actions (Accordion toggle) */}
            <div className="flex items-center gap-2 md:hidden min-w-0 justify-end flex-1">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-zinc-600 hover:text-zinc-900 transition-colors focus:outline-none p-2 rounded-xl bg-zinc-50 active:bg-zinc-150 shrink-0 ml-1.5 flex items-center justify-center border border-zinc-200/50"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
          
          {/* Mobile Overlay Dashboard / Accordions */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white z-50 shadow-xl border-t border-b border-zinc-150 flex flex-col overflow-y-auto max-h-[calc(100vh-4rem)] p-6 gap-6 animate-in slide-in-from-top-4 duration-300">
              <div className="flex flex-col gap-4 text-sm font-medium text-zinc-800 pb-12">
                
                {/* Accordion 1: All Tools */}
                <div className="border-b border-zinc-100 pb-4">
                  <button 
                    onClick={() => toggleMobileAccordion('tools')}
                    className="flex items-center justify-between w-full py-2 hover:text-zinc-950 font-bold text-base text-zinc-950"
                  >
                    <span>Image Processing Tools</span>
                    <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform ${mobileAccordions.tools ? 'rotate-180 text-zinc-900' : ''}`} />
                  </button>
                  {mobileAccordions.tools && (
                    <div className="flex flex-col gap-3 pl-3 pt-2 text-zinc-600 text-sm animate-in fade-in duration-200">
                      <Link to="/tool/compress-photo-50kb" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">Compress to 50KB</Link>
                      <Link to="/tool/compress-photo-20kb" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">Compress to 20KB</Link>
                      <Link to="/tool/passport-size-photo" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">Passport Size photo</Link>
                      <Link to="/tool/signature-resize" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">Signature Resizer 140x60</Link>
                      <Link to="/tool/jpg-to-png" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">Convert JPG to PNG</Link>
                      <Link to="/tool/png-to-jpg" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">Convert PNG to JPG</Link>
                      <Link to="/tool/heic-to-jpg" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">iPhone HEIC to JPG converter</Link>
                      <Link to="/tool/pdf-compress" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">Compress PDF Documents</Link>
                      <Link to="/tool/image-to-pdf" onClick={closeAllMenus} className="py-1.5 hover:text-blue-600 font-semibold text-blue-700">Images to PDF converter</Link>
                    </div>
                  )}
                </div>

                {/* Accordion 2: Exams */}
                <div className="border-b border-zinc-100 pb-4">
                  <button 
                    onClick={() => toggleMobileAccordion('exams')}
                    className="flex items-center justify-between w-full py-2 hover:text-zinc-950 font-bold text-base text-zinc-950"
                  >
                    <span>Exams Formats</span>
                    <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform ${mobileAccordions.exams ? 'rotate-180 text-zinc-900' : ''}`} />
                  </button>
                  {mobileAccordions.exams && (
                    <div className="flex flex-col gap-3 pl-3 pt-2 text-zinc-600 text-sm animate-in fade-in duration-200">
                      <Link to="/exam/neet-ug" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 font-semibold text-zinc-900 hover:text-blue-600">NEET UG 2026</Link>
                      <Link to="/exam/jee-main" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">JEE Main 2026</Link>
                      <Link to="/exam/upsc-cse" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">UPSC Civil Services</Link>
                      <Link to="/exam/ssc-cgl" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">SSC CGL Formats</Link>
                      <Link to="/exam/ibps-po" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">IBPS PO Banking</Link>
                      <Link to="/exam/sbi-po" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">SBI PO Banking</Link>
                      <Link to="/exam/railway-ntpc" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">Railway NTPC Resizer</Link>
                      <span className="text-[11px] font-bold text-zinc-400 uppercase mt-2">State PSC Exams</span>
                      <Link to="/exam/gpsc" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">GPSC Gujarat</Link>
                      <Link to="/exam/mpsc" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">MPSC Maharashtra</Link>
                      <Link to="/exam/tnpsc" onClick={closeAllMenus} className="py-1.5 hover:text-blue-600">TNPSC Tamil Nadu</Link>
                    </div>
                  )}
                </div>

                {/* Accordion 3: Documents */}
                <div className="border-b border-zinc-100 pb-4">
                  <button 
                    onClick={() => toggleMobileAccordion('docs')}
                    className="flex items-center justify-between w-full py-2 hover:text-zinc-950 font-bold text-base text-zinc-950"
                  >
                    <span>General Documents</span>
                    <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform ${mobileAccordions.docs ? 'rotate-180 text-zinc-900' : ''}`} />
                  </button>
                  {mobileAccordions.docs && (
                    <div className="flex flex-col gap-3 pl-3 pt-2 text-zinc-600 text-sm animate-in fade-in duration-200">
                      <Link to="/doc/passport-photo" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">Indian Passport Photo</Link>
                      <Link to="/doc/pan-card-photo" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">NSDL / UTI PAN Card Photo</Link>
                      <Link to="/doc/aadhaar-photo" onClick={closeAllMenus} className="py-1.5 hover:text-blue-600">UIDAI Aadhaar Update Photo</Link>
                    </div>
                  )}
                </div>

                {/* Accordion 4: Visa */}
                <div className="border-b border-zinc-100 pb-4">
                  <button 
                    onClick={() => toggleMobileAccordion('visa')}
                    className="flex items-center justify-between w-full py-2 hover:text-zinc-950 font-bold text-base text-zinc-950"
                  >
                    <span>Visa Photographs</span>
                    <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform ${mobileAccordions.visa ? 'rotate-180 text-zinc-900' : ''}`} />
                  </button>
                  {mobileAccordions.visa && (
                    <div className="flex flex-col gap-3 pl-3 pt-2 text-zinc-600 text-sm animate-in fade-in duration-200">
                      <Link to="/visa/us-visa-photo" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600 font-semibold">USA DS-160 Visa Photo</Link>
                      <Link to="/visa/uk-visa-photo" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">UK Visas & Immigration</Link>
                      <Link to="/visa/schengen-visa-photo" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">Schengen Europe Visa</Link>
                      <Link to="/visa/canada-visa-photo" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">Canada PR Photo size</Link>
                      <Link to="/visa/australia-visa-photo" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">Australia Visa</Link>
                      <Link to="/visa/dubai-uae-visa-photo" onClick={closeAllMenus} className="py-1.5 border-b border-zinc-50 hover:text-blue-600">Dubai / UAE Visa Formats</Link>
                      <Link to="/visa/singapore-visa-photo" onClick={closeAllMenus} className="py-1.5 hover:text-blue-600">Singapore Visa Photo resizer</Link>
                    </div>
                  )}
                </div>

                {/* Direct standard pages */}
                <Link to="/blog" onClick={closeAllMenus} className="py-2 hover:text-zinc-950 font-bold text-base text-zinc-950 border-b border-zinc-100">Official Blog</Link>
                <Link to="/about" onClick={closeAllMenus} className="py-2 hover:text-zinc-950 font-bold text-base text-zinc-950 border-b border-zinc-100">About Privacy Promise</Link>
                <Link to="/contact" onClick={closeAllMenus} className="py-2 hover:text-zinc-950 font-bold text-base text-zinc-950 border-b border-zinc-100">Contact Help Desk</Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Breadcrumbs for visual hierarchy */}
      <Breadcrumbs />

      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>

      <Footer />
      <PWAPrompt />
    </div>
  );
}
