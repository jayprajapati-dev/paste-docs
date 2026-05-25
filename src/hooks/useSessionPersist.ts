import { useEffect, useRef } from 'react';
import { useDocStore, FileState } from '../store/useDocStore';

const SESSION_KEY = 'pastedocs_session';
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

export function useSessionPersist() {
  const { 
    requirementText, 
    parsedRequirements, 
    files, 
    restoreSession 
  } = useDocStore();
  
  const isInitialized = useRef(false);

  // Restore on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        const session = JSON.parse(stored);
        const age = Date.now() - session.sessionTimestamp;

        if (age < TWENTY_FOUR_HOURS && session.files && session.files.length > 0) {
          // Restore
          const restoredFiles: FileState[] = (session.files || []).map((f: any) => ({
            ...f,
            file: new File([], f.name, { type: f.type }), // Fake empty file
            needsReupload: true,
            status: 'pending', // Reset status as processing can't continue without blob
            processed: false,
            processedFile: undefined,
            backgroundResult: undefined
          }));

          restoreSession({
            requirementText: '',
            parsedRequirements: null,
            files: restoredFiles
          });
        } else {
          // Too old or empty, clear it
          localStorage.removeItem(SESSION_KEY);
        }
      }
    } catch (e) {
      console.error('Failed to restore session', e);
      localStorage.removeItem(SESSION_KEY);
    } finally {
      isInitialized.current = true;
    }
  }, [restoreSession]);

  // Save on changes
  useEffect(() => {
    if (!isInitialized.current) return;

    const timeout = setTimeout(() => {
      // If there are no active files, we must completely wipe the session from storage
      if (files.length === 0) {
        try {
          localStorage.removeItem(SESSION_KEY);
        } catch (e) {
          console.error('Failed to clear empty session', e);
        }
        return;
      }

      // Don't save if it's completely empty
      if (!requirementText && files.length === 0) {
        return;
      }

      const isCompleted = files.some(f => f.status === 'completed');

      const sessionData = {
        requirementText,
        parsedRequirements,
        files: files.map(f => ({
          id: f.id,
          name: f.name,
          size: f.size,
          type: f.type,
          originalDimensions: f.originalDimensions,
          processedDimensions: f.processedDimensions,
        })),
        sessionTimestamp: Date.now(),
        isCompleted
      };

      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
      } catch (e) {
        console.error('Failed to save session', e);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [requirementText, parsedRequirements, files]);
}
