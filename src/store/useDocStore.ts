import { create } from 'zustand';
import { Requirements, parseRequirements } from '../lib/parser';
import { toast } from 'react-hot-toast';

export type FileState = {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  processed: boolean;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
  processedFile?: Blob;
  processedDimensions?: { width: number; height: number };
  originalDimensions?: { width: number; height: number };
  backgroundResult?: Blob;
  backgroundDimensions?: { width: number; height: number };
  thumbnailUrl?: string;
  needsReupload?: boolean;
};

export type DocStore = {
  files: FileState[];
  requirementText: string;
  parsedRequirements: Requirements | null;
  activeRequirements: Requirements | null;
  isBackgroundProcessing: boolean;
  backgroundProgress: number;
  setRequirementText: (text: string) => void;
  updateRequirement: (key: keyof Requirements, value: any) => void;
  removeRequirementFields: (fieldsToRemove: (keyof Requirements)[], detectedFieldLabel: string) => void;
  setActiveRequirements: (reqs: Requirements | null) => void;
  addFiles: (files: File[]) => void;
  updateFile: (id: string, updates: Partial<FileState>) => void;
  removeFile: (id: string) => void;
  setIsBackgroundProcessing: (isProcessing: boolean) => void;
  setBackgroundProgress: (progress: number) => void;
  clearAll: () => void;
  restoreSession: (data: Partial<DocStore>) => void;
};

export const useDocStore = create<DocStore>((set) => ({
  files: [],
  requirementText: '',
  parsedRequirements: null,
  activeRequirements: null,
  isBackgroundProcessing: false,
  backgroundProgress: 0,
  setRequirementText: (text) => set({ 
    requirementText: text,
    parsedRequirements: text ? parseRequirements(text) : null
  }),
  setActiveRequirements: (reqs) => set({ activeRequirements: reqs }),
  updateRequirement: (key, value) => set((state) => {
    if (!state.parsedRequirements) return state;
    const newReqs = {
      ...state.parsedRequirements,
      [key]: value
    };
    
    // Automatically match updated keys to their detectedFields categories
    let categoryLabel: string | null = null;
    if (key === 'format') categoryLabel = 'Format';
    if (key === 'width' || key === 'height') categoryLabel = 'Dimensions';
    if (key === 'maxSizeBytes') categoryLabel = 'Size';
    if (key === 'backgroundColor') categoryLabel = 'Background';
    if (key === 'dpi') categoryLabel = 'DPI';
    if (key === 'colorMode') categoryLabel = 'ColorMode';

    if (categoryLabel) {
      const currentFields = newReqs.detectedFields ? [...newReqs.detectedFields] : [];
      if (!currentFields.includes(categoryLabel)) {
        currentFields.push(categoryLabel);
      }
      newReqs.detectedFields = currentFields;
    }

    return {
      parsedRequirements: newReqs
    };
  }),
  removeRequirementFields: (fieldsToRemove, detectedFieldLabel) => set((state) => {
    if (!state.parsedRequirements) return state;
    const newReqs = { ...state.parsedRequirements };
    fieldsToRemove.forEach(field => {
      delete newReqs[field];
    });
    if (newReqs.detectedFields && detectedFieldLabel) {
      newReqs.detectedFields = newReqs.detectedFields.filter((f) => f !== detectedFieldLabel);
    }
    return { parsedRequirements: newReqs };
  }),
  addFiles: (files) => {
    let filesToProcess = files;
    if (files.length > 10) {
      toast.error("Maximum 10 files allowed per batch upload.");
      filesToProcess = files.slice(0, 10);
    }

    set((state) => ({
      files: [
        ...state.files,
        ...filesToProcess.map((file) => {
          const isTooLarge = file.size > 50 * 1024 * 1024;
          
          const filenameLower = file.name.toLowerCase();
          const ext = filenameLower.split('.').pop();
          const supportedExts = ['pdf', 'docx', 'xlsx', 'pptx', 'txt', 'png', 'jpg', 'jpeg', 'heic', 'webp'];
          const isSupported = file.type.startsWith('image/') || 
                              file.type === 'application/pdf' || 
                              (ext && supportedExts.includes(ext)) ||
                              file.type === 'text/plain' ||
                              file.type.includes('word') ||
                              file.type.includes('sheet') ||
                              file.type.includes('presentation');
          
          let status: 'pending' | 'error' = 'pending';
          let error: string | undefined = undefined;
          
          if (!isSupported) {
            status = 'error';
            error = 'Unsupported file type. Supported: PDF, DOCX, XLSX, PPTX, TXT, PNG, JPG, HEIC, WEBP.';
          } else if (isTooLarge) {
            status = 'error';
            error = 'File exceeds 50MB limit. Please upload a smaller file.';
          }

          return {
            id: Math.random().toString(36).substring(2, 9),
            file,
            name: file.name,
            size: file.size,
            type: file.type,
            processed: false,
            status,
            error,
          };
        }),
      ],
    }));
  },
  updateFile: (id, updates) =>
    set((state) => ({
      files: state.files.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    })),
  removeFile: (id) =>
    set((state) => ({
      files: state.files.filter((f) => f.id !== id),
    })),
  setIsBackgroundProcessing: (isProcessing: boolean) => set({ isBackgroundProcessing: isProcessing }),
  setBackgroundProgress: (progress: number) => set({ backgroundProgress: progress }),
  clearAll: () => {
    localStorage.removeItem('pastedocs_session');
    set({ files: [], requirementText: '', parsedRequirements: null, activeRequirements: null, isBackgroundProcessing: false, backgroundProgress: 0 });
  },
  restoreSession: (data) => set((state) => ({ ...state, ...data })),
}));
