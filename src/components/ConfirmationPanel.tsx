import React, { useState } from 'react';
import { useDocStore } from '../store/useDocStore';
import { X, Edit2, Check, AlertCircle, Info, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ConfirmationPanel() {
  const store = useDocStore();
  const parsedRequirements = store.activeRequirements || store.parsedRequirements;
  const { isBackgroundProcessing, requirementText, removeRequirementFields } = store;

  if (!parsedRequirements) return null;

  const hasFields = parsedRequirements.detectedFields && parsedRequirements.detectedFields.length > 0;

  // Edge cases calculations
  const isPngWithWhiteBg = parsedRequirements.format === 'png' && parsedRequirements.backgroundColor === '#ffffff';
  
  const isHighDpiSmallSize = parsedRequirements.dpi === 300 && 
    parsedRequirements.maxSizeBytes !== undefined && 
    parsedRequirements.maxSizeBytes < 51200; // under 50KB

  const hasExplicitDimensions = requirementText.toLowerCase().match(/(\d+)\s*(?:px|pixels)?\s*(?:x|×|\*|by)\s*(\d+)/) || 
    requirementText.toLowerCase().match(/(?:w|width)\s*[:=]\s*(\d+).*?(?:h|height)\s*[:=]\s*(\d+)/) || 
    requirementText.toLowerCase().match(/(\d+)\s*(?:px)?\s*(?:wide|width|square)/);

  const isSignatureDefaultApplied = parsedRequirements.docType === 'signature' && !hasExplicitDimensions;

  const hasBlueChips = parsedRequirements.nameRequired || 
    parsedRequirements.dateRequired || 
    parsedRequirements.recencyHint || 
    parsedRequirements.faceCoverageHint || 
    parsedRequirements.inkColorHint;

  const hasYellowAlerts = isPngWithWhiteBg || isHighDpiSmallSize || isSignatureDefaultApplied;

  return (
    <div className="mt-4 p-5 bg-white/60 backdrop-blur-md border border-gray-200/60 rounded-[1.25rem] shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
          <span>Detected Requirements</span>
          {parsedRequirements.presetName && (
            <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-normal">
              Preset: {parsedRequirements.presetName}
            </span>
          )}
        </h3>
        {isBackgroundProcessing && (
          <div className="flex items-center gap-1.5 absolute top-5 right-5 bg-blue-50 text-blue-600 text-[11px] font-bold px-2.5 py-1 rounded-full border border-blue-100 shadow-sm">
            <div className="w-2.5 h-2.5 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
            PREPARING
          </div>
        )}
      </div>
      
      {hasFields || hasBlueChips ? (
        <div className="space-y-4">
          
          {/* 1. Green Processed Chips */}
          <div className="flex flex-wrap gap-2.5">
            {parsedRequirements.detectedFields?.includes('Format') && (
              <FormatChip />
            )}

            {parsedRequirements.detectedFields?.includes('Size') && (
              <SizeChip />
            )}

            {parsedRequirements.detectedFields?.includes('Dimensions') && (
              <DimensionsChip />
            )}

            {parsedRequirements.detectedFields?.includes('Background') && (
              <BackgroundChip />
            )}

            {parsedRequirements.detectedFields?.includes('DPI') && (
              <DpiChip />
            )}

            {parsedRequirements.colorMode && (
              <ColorModeChip />
            )}
          </div>

          {/* 2. Blue Info/Warning Chips */}
          {hasBlueChips && (
            <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-100/80">
              {parsedRequirements.nameRequired && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50/70 border border-blue-200/50 rounded-lg text-xs font-semibold text-blue-700">
                  <span>⚠️ Name required on photo</span>
                  <Link 
                    to="/tool/add-name-date" 
                    className="ml-1 px-1.5 py-0.5 text-blue-800 bg-blue-100/70 hover:bg-blue-200 rounded text-[10px] uppercase font-bold tracking-wider hover:no-underline transition-colors flex items-center gap-0.5"
                  >
                    Add name & date to photo →
                  </Link>
                </div>
              )}

              {parsedRequirements.dateRequired && !parsedRequirements.nameRequired && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50/70 border border-blue-200/50 rounded-lg text-xs font-semibold text-blue-700">
                  <span>⚠️ Date stamp required on photo</span>
                </div>
              )}

              {parsedRequirements.recencyHint && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50/70 border border-blue-200/50 rounded-lg text-xs font-semibold text-blue-700">
                  <span>⚠️ Recent photo required ({parsedRequirements.recencyHint})</span>
                </div>
              )}

              {parsedRequirements.faceCoverageHint && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50/70 border border-blue-200/50 rounded-lg text-xs font-semibold text-blue-700">
                  <span>ℹ️ Face coverage: {parsedRequirements.faceCoverageHint}</span>
                </div>
              )}

              {parsedRequirements.inkColorHint && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50/70 border border-blue-200/50 rounded-lg text-xs font-semibold text-blue-700">
                  <span>ℹ️ Sign with {parsedRequirements.inkColorHint}</span>
                </div>
              )}
            </div>
          )}

          {/* 3. Yellow Actionable Guidance Blocks */}
          {hasYellowAlerts && (
            <div className="space-y-2 pt-3 border-t border-zinc-100/80">
              {isPngWithWhiteBg && (
                <div className="flex gap-2.5 p-3 bg-amber-50/70 border border-amber-200/40 rounded-xl text-xs text-amber-800 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <strong>PNG & White Background:</strong> JPG recommended for white background photos — smaller file size and better portal compatibility.
                  </div>
                </div>
              )}

              {isHighDpiSmallSize && (
                <div className="flex gap-2.5 p-3 bg-amber-50/70 border border-amber-200/40 rounded-xl text-xs text-amber-800 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <strong>DPI Constraint Notice:</strong> 300 DPI at this file size (under 50KB) may be hard to achieve. PasteDocs will apply maximum local optimization for best possible output.
                  </div>
                </div>
              )}

              {isSignatureDefaultApplied && (
                <div className="flex gap-2.5 p-3 bg-amber-50/70 border border-amber-200/40 rounded-xl text-xs text-amber-800 font-medium">
                  <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <strong>Signature Dimensions:</strong> Signature default setup (140x60px) suggested — click Edit on the dimensions chip if your form specifies different dimensions.
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      ) : (
        <p className="text-sm text-gray-500">No specific requirements detected. Please check your text.</p>
      )}
    </div>
  );
}

function FormatChip() {
  const { parsedRequirements, updateRequirement, removeRequirementFields } = useDocStore();
  const [isEditing, setIsEditing] = useState(false);
  const val = parsedRequirements?.format || '';

  if (!isEditing) {
    return (
      <ChipBase 
        label="Format" 
        value={val.toUpperCase()} 
        onEdit={() => setIsEditing(true)} 
        onRemove={() => removeRequirementFields(['format'], 'Format')} 
      />
    );
  }

  return (
    <div className="inline-flex items-center gap-2 p-1 bg-white border border-gray-300 rounded-lg shadow-sm">
      <select 
        value={val}
        onChange={(e) => {
          updateRequirement('format', e.target.value);
          setIsEditing(false);
        }}
        className="text-sm border-none bg-transparent focus:ring-0 py-0.5 pl-2 pr-6 outline-none cursor-pointer"
      >
        <option value="jpeg">JPEG/JPG</option>
        <option value="png">PNG</option>
        <option value="webp">WEBP</option>
        <option value="pdf">PDF</option>
      </select>
      <button onClick={() => setIsEditing(false)} className="p-1 hover:bg-gray-100 rounded-md text-green-600">
        <Check size={14} />
      </button>
    </div>
  );
}

function SizeChip() {
  const { parsedRequirements, updateRequirement, removeRequirementFields } = useDocStore();
  const [isEditing, setIsEditing] = useState(false);
  const maxBytes = parsedRequirements?.maxSizeBytes || 0;
  
  const [sizeVal, setSizeVal] = useState(maxBytes / 1024);
  const [unit, setUnit] = useState('KB');

  const beginEdit = () => {
    let s = maxBytes / 1024;
    let u = 'KB';
    if (s >= 1024) {
      s = s / 1024;
      u = 'MB';
    }
    setSizeVal(Math.round(s * 100) / 100);
    setUnit(u);
    setIsEditing(true);
  };

  const saveEdit = () => {
    let bytes = sizeVal * 1024;
    if (unit === 'MB') bytes = bytes * 1024;
    updateRequirement('maxSizeBytes', bytes);
    setIsEditing(false);
  };

  if (!isEditing) {
    const displaySize = maxBytes >= 1024 * 1024 
      ? `${(maxBytes / (1024 * 1024)).toFixed(1)} MB` 
      : `${Math.round(maxBytes / 1024)} KB`;
    return (
      <ChipBase 
        label="Size" 
        value={`Max ${displaySize}`} 
        onEdit={beginEdit} 
        onRemove={() => removeRequirementFields(['maxSizeBytes'], 'Size')} 
      />
    );
  }

  return (
    <div className="inline-flex items-center gap-1 p-1 bg-white border border-gray-300 rounded-lg shadow-sm">
      <input 
        type="number" 
        value={sizeVal || ''} 
        onChange={(e) => setSizeVal(parseFloat(e.target.value))}
        className="w-16 text-sm border-none bg-transparent focus:ring-0 py-0.5 px-2 outline-none"
        autoFocus
      />
      <select 
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        className="text-sm border-none bg-transparent focus:ring-0 py-0.5 pl-1 pr-6 outline-none text-gray-600 cursor-pointer"
      >
        <option value="KB">KB</option>
        <option value="MB">MB</option>
      </select>
      <button onClick={saveEdit} className="p-1 hover:bg-gray-100 rounded-md text-green-600">
        <Check size={14} />
      </button>
    </div>
  );
}

function DimensionsChip() {
  const { parsedRequirements, updateRequirement, removeRequirementFields } = useDocStore();
  const [isEditing, setIsEditing] = useState(false);
  const w = parsedRequirements?.width || 0;
  const h = parsedRequirements?.height || 0;
  
  const [widthVal, setWidthVal] = useState(w);
  const [heightVal, setHeightVal] = useState(h);

  const beginEdit = () => {
    setWidthVal(w);
    setHeightVal(h);
    setIsEditing(true);
  };

  const saveEdit = () => {
    updateRequirement('width', widthVal);
    updateRequirement('height', heightVal);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <ChipBase 
        label="Dimensions" 
        value={`${w}x${h} px`} 
        onEdit={beginEdit} 
        onRemove={() => removeRequirementFields(['width', 'height'], 'Dimensions')} 
      />
    );
  }

  return (
    <div className="inline-flex items-center gap-1 p-1 bg-white border border-gray-300 rounded-lg shadow-sm text-sm">
      <input 
        type="number" 
        value={widthVal || ''} 
        onChange={(e) => setWidthVal(parseInt(e.target.value, 10))}
        className="w-14 border-none bg-transparent focus:ring-0 py-0.5 px-2 outline-none text-center"
        placeholder="W"
      />
      <span className="text-gray-400 text-xs">x</span>
      <input 
        type="number" 
        value={heightVal || ''} 
        onChange={(e) => setHeightVal(parseInt(e.target.value, 10))}
        className="w-14 border-none bg-transparent focus:ring-0 py-0.5 px-2 outline-none text-center"
        placeholder="H"
      />
      <button onClick={saveEdit} className="p-1 hover:bg-gray-100 rounded-md text-green-600">
        <Check size={14} />
      </button>
    </div>
  );
}

function BackgroundChip() {
  const { parsedRequirements, updateRequirement, removeRequirementFields } = useDocStore();
  const [isEditing, setIsEditing] = useState(false);
  const bg = parsedRequirements?.backgroundColor || '';

  const getLabel = (color: string) => {
    if (color === '#ffffff') return 'White';
    if (color === '#f5f5f5') return 'Light Grey';
    if (color === '#0066cc') return 'Blue';
    if (color === 'transparent') return 'Transparent';
    return color;
  };

  if (!isEditing) {
    return (
      <ChipBase 
        label="Background" 
        value={getLabel(bg)} 
        onEdit={() => setIsEditing(true)} 
        onRemove={() => removeRequirementFields(['backgroundColor'], 'Background')} 
      />
    );
  }

  return (
    <div className="inline-flex items-center gap-2 p-1 bg-white border border-gray-300 rounded-lg shadow-sm">
      <select 
        value={bg}
        onChange={(e) => {
          updateRequirement('backgroundColor', e.target.value);
          setIsEditing(false);
        }}
        className="text-sm border-none bg-transparent focus:ring-0 py-0.5 pl-2 pr-6 outline-none cursor-pointer"
      >
        <option value="#ffffff">White</option>
        <option value="#f5f5f5">Light Grey</option>
        <option value="#0066cc">Blue</option>
        <option value="transparent">Transparent</option>
      </select>
      <button onClick={() => setIsEditing(false)} className="p-1 hover:bg-gray-100 rounded-md text-green-600">
        <Check size={14} />
      </button>
    </div>
  );
}

function DpiChip() {
  const { parsedRequirements, updateRequirement, removeRequirementFields } = useDocStore();
  const [isEditing, setIsEditing] = useState(false);
  const dpi = parsedRequirements?.dpi || 0;
  const [dpiVal, setDpiVal] = useState(dpi);

  const beginEdit = () => {
    setDpiVal(dpi);
    setIsEditing(true);
  };

  const saveEdit = () => {
    updateRequirement('dpi', dpiVal);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <ChipBase 
        label="DPI" 
        value={dpi.toString()} 
        onEdit={beginEdit} 
        onRemove={() => removeRequirementFields(['dpi'], 'DPI')} 
      />
    );
  }

  return (
    <div className="inline-flex items-center gap-1 p-1 bg-white border border-gray-300 rounded-lg shadow-sm">
      <input 
        type="number" 
        value={dpiVal || ''} 
        onChange={(e) => setDpiVal(parseInt(e.target.value, 10))}
        className="w-16 text-sm border-none bg-transparent focus:ring-0 py-0.5 px-2 outline-none"
        autoFocus
      />
      <button onClick={saveEdit} className="p-1 hover:bg-gray-100 rounded-md text-green-600">
        <Check size={14} />
      </button>
    </div>
  );
}

function ColorModeChip() {
  const { parsedRequirements, updateRequirement, removeRequirementFields } = useDocStore();
  const [isEditing, setIsEditing] = useState(false);
  const val = parsedRequirements?.colorMode || '';

  if (!isEditing) {
    return (
      <ChipBase 
        label="Color Mode" 
        value={val === 'grayscale' ? 'Grayscale (B&W)' : 'Color'} 
        onEdit={() => setIsEditing(true)} 
        onRemove={() => removeRequirementFields(['colorMode'], 'ColorMode')} 
      />
    );
  }

  return (
    <div className="inline-flex items-center gap-2 p-1 bg-white border border-gray-300 rounded-lg shadow-sm">
      <select 
        value={val}
        onChange={(e) => {
          updateRequirement('colorMode', e.target.value);
          setIsEditing(false);
        }}
        className="text-sm border-none bg-transparent focus:ring-0 py-0.5 pl-2 pr-6 outline-none cursor-pointer"
      >
        <option value="color">Color</option>
        <option value="grayscale">Grayscale (B/W)</option>
      </select>
      <button onClick={() => setIsEditing(false)} className="p-1 hover:bg-gray-100 rounded-md text-green-600">
        <Check size={14} />
      </button>
    </div>
  );
}

function ChipBase({ label, value, onEdit, onRemove }: { label: string, value: string, onEdit: () => void, onRemove: () => void }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-md text-[13px] font-semibold text-blue-800 group hover:bg-blue-100 transition-all duration-200 active:scale-[0.98]">
      <span className="text-blue-500 font-bold text-[0.7rem] uppercase tracking-widest">{label}</span>
      <span className="font-bold text-blue-900">{value}</span>
      <span className="text-blue-400 ml-1"><Check size={12} strokeWidth={3} /></span>
      
      <div className="h-4 w-px bg-blue-200 mx-1"></div>
      
      <div className="flex items-center gap-0.5">
        <button onClick={onEdit} className="p-1 text-blue-500 hover:text-blue-900 hover:bg-blue-200 rounded transition-colors" title="Edit">
          <Edit2 size={13} />
        </button>
        <button onClick={onRemove} className="p-1 text-blue-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Remove">
          <X size={13} />
        </button>
      </div>
    </div>
  );
}
