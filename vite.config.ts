import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        strategies: 'injectManifest',
        srcDir: 'src',
        filename: 'sw.ts',
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'robots.txt', 'sitemap.xml'],
        manifest: {
          name: "PasteDocs",
          short_name: "PasteDocs",
          description: 'Resize any document to any requirement — free, private, instant',
          start_url: "https://pastedocs.vercel.app/",
          scope: "https://pastedocs.vercel.app/",
          theme_color: '#000000',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: '/favicon.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'any maskable'
            }
          ]
        },
        injectManifest: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,xml,txt}'],
          maximumFileSizeToCacheInBytes: 50 * 1024 * 1024
        }
      })
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      sourcemap: false,
      // Raise the chunk size warning limit — heic2any (1.3MB) and ort (WASM ML model)
      // are intentionally large and lazy-loaded only on the tools that need them.
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          // Manual chunk splitting — keeps the main bundle small and lets the browser
          // cache heavy vendor libraries independently across page navigations.
          manualChunks: {
            // React core — loaded on every page, cached forever
            'react-vendor': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
            // UI / animation — loaded on most pages
            'ui-vendor': ['lucide-react', 'motion', 'clsx', 'tailwind-merge', 'react-hot-toast'],
            // State management
            'state-vendor': ['zustand'],
            // Heavy ML / image libraries — lazy-loaded only on specific tools.
            // Keeping them in named chunks makes them cacheable and lets the
            // browser parallelise downloads when a user does hit that tool.
            'heic-vendor': ['heic2any'],
            'pdf-vendor': ['pdf-lib', 'pdfjs-dist'],
            'doc-vendor': ['mammoth', 'xlsx', 'docx-preview'],
            'bg-removal-vendor': ['@imgly/background-removal', 'onnxruntime-web'],
            'image-vendor': ['browser-image-compression', 'exifr', 'konva', 'react-konva'],
          }
        }
      }
    },
    esbuild: {
      drop: ['console', 'debugger'],
    },
    worker: {
      format: 'es'
    },
  };
});
