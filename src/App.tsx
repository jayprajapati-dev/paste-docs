import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Suspense, lazy, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';

// Helper to gracefully retry failed chunk loads (very common in HMR/sandbox updates)
const lazyWithRetry = (componentImport: () => Promise<any>) => 
  lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      // Check if it's a dynamic import failure
      if (
        errorMsg.includes('Failed to fetch dynamically imported module') ||
        errorMsg.includes('failed to fetch') ||
        errorMsg.includes('chunk')
      ) {
        const hasReloaded = window.sessionStorage.getItem('chunk-reload-attempted');
        if (!hasReloaded) {
          window.sessionStorage.setItem('chunk-reload-attempted', 'true');
          window.location.reload(); // Force hard reload to grab fresh assets
          return new Promise(() => {}); // Return unresolved promise to prevent UI flash
        }
      }
      throw error; // If it's a real bug, pass it to ErrorBoundary
    }
  });

const Home = lazyWithRetry(() => import('./pages/Home'));
const Tools = lazyWithRetry(() => import('./pages/Tools'));
const About = lazyWithRetry(() => import('./pages/About'));
const Privacy = lazyWithRetry(() => import('./pages/Privacy'));
const Terms = lazyWithRetry(() => import('./pages/Terms'));
const Disclaimer = lazyWithRetry(() => import('./pages/Disclaimer'));
const Contact = lazyWithRetry(() => import('./pages/Contact'));
const BlogList = lazyWithRetry(() => import('./pages/BlogList'));
const BlogPost = lazyWithRetry(() => import('./pages/BlogPost'));
const Share = lazyWithRetry(() => import('./pages/Share'));
const Stats = lazyWithRetry(() => import('./pages/Stats'));
const ExamTemplate = lazyWithRetry(() => import('./pages/ExamTemplate'));
const ToolTemplate = lazyWithRetry(() => import('./pages/ToolTemplate'));
const DocTemplate = lazyWithRetry(() => import('./pages/DocTemplate'));
const VisaTemplate = lazyWithRetry(() => import('./pages/VisaTemplate'));
const NotFound = lazyWithRetry(() => import('./pages/NotFound'));

// Loading Fallback
const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center min-h-[50vh]">
    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  useEffect(() => {
    window.sessionStorage.removeItem('chunk-reload-attempted');
  }, []);

  return (
    <HelmetProvider>
      <Toaster position="top-center" toastOptions={{ className: 'text-sm font-sans' }} />
      <Router>
        <ScrollToTop />
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="terms" element={<Terms />} />
              <Route path="disclaimer" element={<Disclaimer />} />
              <Route path="blog" element={<BlogList />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="contact" element={<Contact />} />
              <Route path="share" element={<Share />} />
              <Route path="stats" element={<Stats />} />
              <Route path="tools" element={<Tools />} />
              
              {/* Empty Parent Route Fallbacks */}
              <Route path="tool" element={<Navigate to="/" replace />} />
              <Route path="format" element={<Navigate to="/" replace />} />
              <Route path="exam" element={<Navigate to="/" replace />} />
              <Route path="doc" element={<Navigate to="/" replace />} />
              <Route path="visa" element={<Navigate to="/" replace />} />

              <Route path="exam/:slug" element={<ExamTemplate />} />
              <Route path="tool/:slug" element={<ToolTemplate />} />
              <Route path="doc/:slug" element={<DocTemplate />} />
              <Route path="visa/:slug" element={<VisaTemplate />} />

              {/* High-Intent SEO Landing Pages */}
              <Route path="compress-photo-to-20kb" element={<ToolTemplate slugOverride="compress-20kb" />} />
              <Route path="ojas-photo-signature-resizer" element={<ExamTemplate slugOverride="gpsc" />} />
              <Route path="ssc-photo-size-converter" element={<ExamTemplate slugOverride="ssc-cgl" />} />
              
              {/* Global 404 Catch-All */}
              <Route path="404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
    </HelmetProvider>
  );
}
