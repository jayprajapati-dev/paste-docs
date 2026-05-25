import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full mt-auto border-t border-zinc-100 bg-white" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12" id="footer-container">
        
        {/* Main footer row */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12" id="footer-main-row">
          
          {/* Left — Logo + description */}
          <div className="w-full md:w-64 shrink-0" id="footer-brand-section">
            <Link to="/" className="flex items-center gap-2" id="footer-brand-logo-link">
              <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">P</span>
              </div>
              <span className="text-sm font-semibold text-zinc-900">
                PasteDocs
              </span>
            </Link>
            <p className="text-sm text-zinc-500 mt-3 leading-relaxed" id="footer-brand-description">
              Free document formatter. 100% private,
              runs locally in your browser.
            </p>
          </div>

          {/* Right — All columns layout (grid of 2 columns on mobile, flex row on desktop) */}
          <div className="grid grid-cols-2 gap-8 md:flex md:flex-1 md:flex-wrap md:gap-12 md:justify-end w-full" id="footer-links-section">

            {/* Popular */}
            <div className="min-w-[120px]" id="footer-column-popular">
              <p className="text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-3">Popular</p>
              <ul className="space-y-2">
                <li>
                  <Link to="/exam/neet-ug" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors leading-loose block py-1">
                    NEET Photo
                  </Link>
                </li>
                <li>
                  <Link to="/exam/ssc-cgl" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors leading-loose block py-1">
                    SSC CGL
                  </Link>
                </li>
                <li>
                  <Link to="/tool/compress-50kb" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors leading-loose block py-1">
                    Compress 50KB
                  </Link>
                </li>
                <li>
                  <Link to="/visa/us-visa" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors leading-loose block py-1">
                    US Visa Photo
                  </Link>
                </li>
                <li>
                  <Link to="/tool/passport-size" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors leading-loose block py-1">
                    Passport Size
                  </Link>
                </li>
              </ul>
            </div>

            {/* Product */}
            <div className="min-w-[100px]" id="footer-column-product">
              <p className="text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-3">Product</p>
              <ul className="space-y-2">
                <li>
                  <Link to="/tools" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors leading-loose block py-1">
                    All Tools
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors leading-loose block py-1">
                    Official Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="min-w-[100px]" id="footer-column-company">
              <p className="text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-3">Company</p>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors leading-loose block py-1">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors leading-loose block py-1">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="min-w-[120px]" id="footer-column-legal">
              <p className="text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-3">Legal</p>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors leading-loose block py-1">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors leading-loose block py-1">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors leading-loose block py-1">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-100 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4" id="footer-bottom-bar">
          <p className="text-xs text-zinc-400 text-center md:text-left" id="footer-copyright">
            © 2026 PasteDocs
          </p>
          <p className="text-xs text-zinc-400 text-center md:text-right" id="footer-disclaimer">
            Always verify with official portals before submission.
          </p>
        </div>

      </div>
    </footer>
  );
}
