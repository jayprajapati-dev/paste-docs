import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
  isChunkError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
    isChunkError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    const errorMsg = error.message || '';
    const isChunk = 
      /failed to fetch/i.test(errorMsg) || 
      /dynamically imported/i.test(errorMsg) ||
      /chunk/i.test(errorMsg);
    return { hasError: true, errorMessage: errorMsg, isChunkError: isChunk };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error bound by ErrorBoundary:', error, errorInfo);
    
    // Automatically trigger reload once if it's a dynamic import / chunk load error
    const isChunkError = 
      /failed to fetch/i.test(error.message) || 
      /dynamically imported/i.test(error.message) ||
      /chunk/i.test(error.message);
      
    if (isChunkError) {
      console.warn('Dynamic import chunk error detected. Re-fetching latest portal files via app reload...');
      // To avoid infinite reload loops, restrict automatic reload to once per session in 10 seconds
      const lastReload = sessionStorage.getItem('pastedocs_last_chunk_reload');
      const now = Date.now();
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem('pastedocs_last_chunk_reload', now.toString());
        window.location.reload();
      }
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isChunk = this.state.isChunkError;

      return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] p-6 text-center animate-fade-in" id="error-boundary-screen">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-8 max-w-md shadow-sm">
            <span className="text-3xl mb-4 block">🔄</span>
            <h3 className="text-lg font-bold text-zinc-900 mb-2">
              {isChunk ? 'New Version Available' : 'Application Notice'}
            </h3>
            <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
              {isChunk 
                ? 'We have updated PasteDocs with fresh security features and photo processing improvements. Let\'s sync the latest assets.'
                : 'We updated the application resources. Let\'s reload your browser stream to sync the latest secure photo processor tools.'
              }
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
              }}
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-sm cursor-pointer"
              id="error-boundary-reload-button"
            >
              {isChunk ? 'Update Application Assets' : 'Reload Dashboard'}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
