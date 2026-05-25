/**
 * Optimised Requirements Parser for Document Resizer
 * Highly efficient client-side NLP parser utilizing modular pipelines
 * designed to prevent catastrophic backtracking and UI thread blocking.
 * 
 * --- DEBOUNCE RECOMMENDATION FOR REACT COMPONENTS ---
 * To prevent executing on every keystroke, wrap this logic in a debounce timer:
 * 
 * useEffect(() => {
 *   const timer = setTimeout(() => { setParsed(parseRequirements(text)); }, 300);
 *   return () => clearTimeout(timer);
 * }, [text]);
 * -----------------------------------------------------
 */

export type Requirements = {
  format?: string;
  maxSizeBytes?: number;
  minSizeBytes?: number;
  width?: number;
  height?: number;
  presetName?: string;

  dpi?: number;
  backgroundColor?: string;
  nameRequired?: boolean;
  dateRequired?: boolean;
  docType?: "photo" | "signature" | "thumb" | "postcard" | "stamp" | "passport";
  colorMode?: "color" | "grayscale";
  faceCoverageHint?: string;
  recencyHint?: string;
  inkColorHint?: string;

  detectedFields?: string[];
};

// Direct, fast dictionary mapping for localized and English document presets
const PRESETS: Record<string, { width?: number; height?: number; format?: string; maxSizeBytes?: number; presetName: string }> = {
  // English presets
  "sarkari form photo": { width: 413, height: 531, format: "jpeg", maxSizeBytes: 204800, presetName: "Sarkari Photo" },
  "government form photo": { width: 413, height: 531, format: "jpeg", maxSizeBytes: 204800, presetName: "Government Photo" },
  "admit card photo": { width: 413, height: 531, presetName: "Admit Card Photo" },
  "avak dakhlo": { format: "pdf", maxSizeBytes: 204800, presetName: "Avak Dakhlo" },
  "jati praman": { format: "pdf", maxSizeBytes: 204800, presetName: "Jati Praman" },
  "caste certificate": { format: "pdf", maxSizeBytes: 204800, presetName: "Caste Certificate" },
  "income proof": { format: "pdf", maxSizeBytes: 204800, presetName: "Income Proof" },
  "7/12": { format: "pdf", maxSizeBytes: 307200, presetName: "7/12 Document" },
  "satbara": { format: "pdf", maxSizeBytes: 307200, presetName: "Satbara Document" },
  "domicile": { format: "pdf", maxSizeBytes: 204800, presetName: "Domicile Certificate" },

  // Devanagari / Hindi Presets
  "सरकारी फॉर्म फोटो": { width: 413, height: 531, format: "jpeg", maxSizeBytes: 204800, presetName: "Sarkari Photo" },
  "सरकारी फोटो": { width: 413, height: 531, format: "jpeg", maxSizeBytes: 204800, presetName: "Sarkari Photo" },
  "प्रवेश पत्र फोटो": { width: 413, height: 531, presetName: "Admit Card Photo" },
  "प्रवेश पत्र": { width: 413, height: 531, presetName: "Admit Card Photo" },
  "आवक प्रमाण": { format: "pdf", maxSizeBytes: 204800, presetName: "Avak Dakhlo" },
  "आय प्रमाण": { format: "pdf", maxSizeBytes: 204800, presetName: "Income Proof" },
  "जाति प्रमाण": { format: "pdf", maxSizeBytes: 204800, presetName: "Jati Praman" },
  "जाति प्रमाण पत्र": { format: "pdf", maxSizeBytes: 204800, presetName: "Jati Praman" },
  "सातबारा": { format: "pdf", maxSizeBytes: 307200, presetName: "Satbara Document" },
  "७/१२": { format: "pdf", maxSizeBytes: 307200, presetName: "7/12 Document" },
  "निवास प्रमाण": { format: "pdf", maxSizeBytes: 204800, presetName: "Domicile Certificate" },

  // Gujarati Presets
  "સરકારી ફોર્મ ફોટો": { width: 413, height: 531, format: "jpeg", maxSizeBytes: 204800, presetName: "Sarkari Photo" },
  "આવકનો દાખલો": { format: "pdf", maxSizeBytes: 204800, presetName: "Avak Dakhlo" },
  "આવક દાખલો": { format: "pdf", maxSizeBytes: 204800, presetName: "Avak Dakhlo" },
  "મેડિકલ સર્ટિફિકેટ": { format: "pdf", maxSizeBytes: 204800, presetName: "Medical Certificate" },
  "જાતિનો દાખલો": { format: "pdf", maxSizeBytes: 204800, presetName: "Jati Praman" },
  "જાતિ પ્રમાણપત્ર": { format: "pdf", maxSizeBytes: 204800, presetName: "Jati Praman" },
  "આવક પત્રક": { format: "pdf", maxSizeBytes: 204800, presetName: "Income Proof" },
  "૭/૧૨": { format: "pdf", maxSizeBytes: 307200, presetName: "7/12 Document" },
  "સાતબારા": { format: "pdf", maxSizeBytes: 307200, presetName: "Satbara Document" },
  "ડોમિસાઇલ": { format: "pdf", maxSizeBytes: 204800, presetName: "Domicile Certificate" }
};

/**
 * 1. Text Normalization stage
 * Reduces extra whitespace, normalises lower-case and punctuation spacing
 */
const normalizeText = (text: string): string => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[\s\r\n\t]+/g, " ")
    .trim();
};

/**
 * 2. Modular Preset Match pipeline
 */
const extractPreset = (text: string): { width?: number; height?: number; format?: string; maxSizeBytes?: number; presetName?: string } => {
  const matchedKey = Object.keys(PRESETS).find(key => text.includes(key));
  if (matchedKey) {
    return PRESETS[matchedKey];
  }
  return {};
};

/**
 * 3. Format detection pipeline
 */
const extractFormat = (text: string): string | undefined => {
  const targetMatch = text.match(/\b(?:to|into|in)\s+(jpg|jpeg|png|webp|pdf)\b/);
  if (targetMatch) {
    return targetMatch[1] === "jpg" ? "jpeg" : targetMatch[1];
  }
  const regularMatch = text.match(/\b(jpg|jpeg|png|webp|pdf)\b/);
  if (regularMatch) {
    return regularMatch[1] === "jpg" ? "jpeg" : regularMatch[1];
  }
  return undefined;
};

/**
 * Helper to normalize localized digits (Gujarati & Devanagari) into ASCII digits.
 */
const parseLocalizedDigits = (str: string): string => {
  return str
    .replace(/[०-९]/g, d => String(d.charCodeAt(0) - 2406))
    .replace(/[૦-૯]/g, d => String(d.charCodeAt(0) - 2790));
};

/**
 * 4. Size bounds extraction pipeline
 */
const extractSize = (text: string): number | undefined => {
  // Supports English/Hindi/Gujarati bounds with customized non-Latin termination assertions to prevent layout overflow
  const sizeMatch = text.match(/(?:max(?:imum)?|under|up\s*to|<|less\s+than|not\s+more\s+than)\s*([0-9\u0966-\u096f\u0ae6-\u0aef]+(?:\.[0-9\u0966-\u096f\u0ae6-\u0aef]+)?)\s*(kb|mb|kilobytes|megabytes|k|m|કેબી|એમબી|केबी|एमबी)(?![a-zA-Z0-9\u0900-\u097f\u0a80-\u0aff])/);
  if (sizeMatch) {
    const rawVal = parseLocalizedDigits(sizeMatch[1]);
    const size = parseFloat(rawVal);
    const unit = sizeMatch[2];
    if (unit.startsWith("m") || unit.includes("એમ") || unit.includes("एम")) {
      return size * 1024 * 1024;
    }
    return size * 1024;
  }

  const fallbackMatch = text.match(/([0-9\u0966-\u096f\u0ae6-\u0aef]+(?:\.[0-9\u0966-\u096f\u0ae6-\u0aef]+)?)\s*(kb|mb|kilobytes|megabytes|k|m|કેબી|એમબી|केबी|एमबी)(?![a-zA-Z0-9\u0900-\u097f\u0a80-\u0aff])/);
  if (fallbackMatch) {
    const rawVal = parseLocalizedDigits(fallbackMatch[1]);
    const size = parseFloat(rawVal);
    const unit = fallbackMatch[2];
    if (unit.startsWith("m") || unit.includes("એમ") || unit.includes("एम")) {
      return size * 1024 * 1024;
    }
    return size * 1024;
  }
  return undefined;
};

/**
 * 5. Dimension bounds extraction pipeline
 */
const extractDimensions = (text: string): { width?: number; height?: number } => {
  const dimMatch = text.match(/([0-9\u0966-\u096f\u0ae6-\u0aef]+)\s*(?:px|pixels)?\s*(?:x|×|\*|by)\s*([0-9\u0966-\u096f\u0ae6-\u0aef]+)\s*(?:px|pixels)?/);
  if (dimMatch) {
    return {
      width: parseInt(parseLocalizedDigits(dimMatch[1]), 10),
      height: parseInt(parseLocalizedDigits(dimMatch[2]), 10)
    };
  }

  const whMatch = text.match(/(?:w|width)\s*[:=]\s*([0-9\u0966-\u096f\u0ae6-\u0aef]+).*?(?:h|height)\s*[:=]\s*([0-9\u0966-\u096f\u0ae6-\u0aef]+)/);
  if (whMatch) {
    return {
      width: parseInt(parseLocalizedDigits(whMatch[1]), 10),
      height: parseInt(parseLocalizedDigits(whMatch[2]), 10)
    };
  }

  const singleSquareMatch = text.match(/([0-9\u0966-\u096f\u0ae6-\u0aef]+)\s*(?:px)?\s*(?:wide|width|square)/);
  if (singleSquareMatch) {
    const size = parseInt(parseLocalizedDigits(singleSquareMatch[1]), 10);
    return {
      width: size,
      height: size
    };
  }

  return {};
};

/**
 * 6. DPI resolution extraction pipeline
 */
const extractDpi = (text: string): number | undefined => {
  const dpiMatch = text.match(/(?:dpi|dots per inch)[:\s]*([0-9\u0966-\u096f\u0ae6-\u0aef]+)/i) ||
                   text.match(/([0-9\u0966-\u096f\u0ae6-\u0aef]+)\s*(?:dpi|ppi|dots per inch)/i) ||
                   text.match(/resolution[:\s]+([0-9\u0966-\u096f\u0ae6-\u0aef]+)/i);
  if (dpiMatch) {
    const rawVal = parseLocalizedDigits(dpiMatch[1]);
    const val = parseInt(rawVal, 10);
    if (!isNaN(val) && val > 0 && val < 5000) {
      return val;
    }
  }
  return undefined;
};

/**
 * 7. Background specification extraction
 */
const extractBackgroundColor = (text: string): string | undefined => {
  if (/white\s+background|plain\s+white|white\s+backdrop|plain\s+background|light\s+background|sada\s+background|safed\s+background|સફેદ|સાદા\s+બેકગ્રાઉન્ડ|सफेद\s+बैकग्राउंड|સફેદ\s+બેકગ્રાઉન્ડ|સફેદ\s+પૃષ્ઠભૂમિ|सफेद\s+पृष्ठभूमि/i.test(text)) {
    return "#ffffff";
  }
  if (/light\s+gre?y|gre?y\s+background|gre?y\s+backing|ग्रे|ગ્રે/i.test(text)) {
    return "#f5f5f5";
  }
  if (/blue\s+background|light\s+blue|blue\s+backing|नीला\s+बैकग्राउंड|વાદળી\s+બેકગ્રાઉન્ડ|વાદળી\s+પૃષ્ઠભૂમિ|नीला\s+पृष्ठभूमि/i.test(text)) {
    return "#0066cc";
  }
  if (/no\s+background|transparent|પારદર્શક|पारदर्शी|બેકગ્રાઉન્ડ\s+દૂર|पृष्ठभूमि\s+हटाएं/i.test(text)) {
    return "transparent";
  }
  return undefined;
};

/**
 * 8. Name and Date printing pipeline
 */
const extractNameAndDate = (text: string): { nameRequired?: boolean; dateRequired?: boolean } => {
  const hasNameAndDate = /name\s*(?:and|&)\s*date|naam\s+(?:aur|&)\s+date|नाम\s*(?:और|&)\s*तारीख|નામ\s*(?:અને|&)\s*તારીખ/.test(text);
  const hasName = /write\s+name|name\s+on\s+photograph|name\s+on\s+photo|candidate\s+name|naam\s+photo|name\s+printed|नाम\s+लिखें|નામ\s+લખો|ઉમેદવારનું\s+નામ/.test(text);
  const hasDate = /date\s+of\s+photograph|date\s+of\s+photo|date\s+on\s+photo|date\s+stamp|date\s+taken|date\s+of\s+taking|तारीख|તારીખ/.test(text);

  if (hasNameAndDate) {
    return { nameRequired: true, dateRequired: true };
  }
  return {
    nameRequired: hasName ? true : undefined,
    dateRequired: hasDate ? true : undefined
  };
};

/**
 * 9. Document type categorisation pipeline
 */
const extractDocType = (text: string): "photo" | "signature" | "thumb" | "postcard" | "stamp" | "passport" => {
  if (/\b(?:signature|sign\b|your\s+signature)|हस्ताक्षर|दस्तखत|सहीं|સહી/i.test(text)) {
    return "signature";
  }
  if (/\b(?:thumb\s+impression|left\s+thumb|right\s+thumb|thumbprint)|અંગૂઠો|અંગૂઠા|अंगूठा|अंगूठे/i.test(text)) {
    return "thumb";
  }
  if (/\b(?:postcard|4x6|4\s*inch\s*x\s*6\s*inch)|પોસ્ટકાર્ડ|पोस्टकार्ड/i.test(text)) {
    return "postcard";
  }
  if (/\b(?:passport\s+photo|passport\s+size)|પાસપોર્ટ|પાસપોર્ટ\s+ફોટો|पासपोर्ट/i.test(text)) {
    return "passport";
  }
  if (/\b(?:stamp\s+size)|સ્ટેમ્પ|સ્ટેમ્પ\s+સાઇઝ|સ્ટિન્પ|સ્ટિમ્પ|स्टैम्प/.test(text)) {
    return "stamp";
  }
  return "photo";
};

/**
 * 10. Color mode extraction pipeline
 */
const extractColorMode = (text: string): "color" | "grayscale" | undefined => {
  if (/\b(?:colou?r\s+photograph|colou?r\s+photo|colou?red\s+photo)|रंगीन|રંગીન/i.test(text)) {
    return "color";
  }
  if (/\b(?:black\s+and\s+white|b&w|grayscale|black\s*&\s*white)|अश्वेत|શ્વેત|શ્યામ/i.test(text)) {
    return "grayscale";
  }
  return undefined;
};

/**
 * 11. Face coverage indicator pipeline
 */
const extractFaceCoverage = (text: string): string | undefined => {
  const percentMatch = text.match(/(\d+(?:-\d+)?\s*%|\d+(?:-\d+)?\s*percent|3\/4th|૭૦-૮૦%|७०-८०%)/);
  if (/face\s+should\s+occupy|face\s+coverage|चेहरा|ચહેરો/.test(text)) {
    return percentMatch ? percentMatch[1] : "70-80%";
  }
  if (/(\d+(?:-\d+)?\s*%|\d+(?:-\d+)?\s*percent|3\/4th)\s*(?:of\s+)?face/.test(text)) {
    return percentMatch ? percentMatch[1] : "70-80%";
  }
  return undefined;
};

/**
 * 12. Recency warnings pipeline
 */
const extractRecency = (text: string): string | undefined => {
  const monthMatch = text.match(/(?:within|last)\s+(\d+)\s+months?/i) || 
                     text.match(/(\d+)\s*(?:mahine|મહિના|મહીના|महीने)/);
  if (monthMatch) {
    return `within ${monthMatch[1]} months`;
  }
  if (/recent\s+(?:photograph|photo)|taken\s+after|not\s+older\s+than|3\s+mahine|within\s+6\s+months|taken\s+within|हाल\s+का|નવીનતમ\s+ફોટો/.test(text)) {
    if (/6\s*(?:months?|महीने|મહિના)/.test(text)) {
      return "within 6 months";
    }
    return "within 3 months";
  }
  return undefined;
};

/**
 * 13. Ink color requirements pipeline
 */
const extractInkColor = (text: string): string | undefined => {
  const inkMatch = text.match(/(blue\/black\s*pen|black\s+or\s+blue\s+pen|black\s+ink|blue\s+ink|dark\s+ink|ball\s+pen|काली\s+स्याही|કાળી\s+શાહી|બ્લુ\s+શાહી|કાળી\s+પેન)/);
  if (inkMatch) {
    const val = inkMatch[1];
    if (val.includes("blue/black") || val.includes("black or blue")) {
      return "black or blue ink";
    }
    if (val.includes("black") || val.includes("काली") || val.includes("કાળી") || val.includes("કાળી")) {
      return "black ink";
    }
    if (val.includes("blue") || val.includes("બ્લુ")) {
      return "blue ink";
    }
    return "dark ink/ball pen";
  }
  return undefined;
};


/**
 * Unified Requirements Parsing Entrypoint.
 * Passes the normalized input string down purely structured and modular pipelines.
 */
export const parseRequirements = (text: string): Requirements => {
  const reqs: Requirements = {};
  const detectedFields = new Set<string>();

  const normalized = normalizeText(text);
  if (!normalized) {
    reqs.detectedFields = [];
    return reqs;
  }

  // 1. Preset matching (acts as core defaults)
  const preset = extractPreset(normalized);
  if (preset.presetName) {
    reqs.presetName = preset.presetName;
    if (preset.format) {
      reqs.format = preset.format;
      detectedFields.add("Format");
    }
    if (preset.maxSizeBytes !== undefined) {
      reqs.maxSizeBytes = preset.maxSizeBytes;
      detectedFields.add("Size");
    }
    if (preset.width !== undefined && preset.height !== undefined) {
      reqs.width = preset.width;
      reqs.height = preset.height;
      detectedFields.add("Dimensions");
    }
  }

  // 2. Format extraction
  const format = extractFormat(normalized);
  if (format) {
    reqs.format = format;
    detectedFields.add("Format");
  }

  // 3. File size bounds extraction
  const maxSize = extractSize(normalized);
  if (maxSize !== undefined) {
    reqs.maxSizeBytes = maxSize;
    detectedFields.add("Size");
  }

  // 4. Dimension sizing extraction
  const dimensions = extractDimensions(normalized);
  if (dimensions.width !== undefined && dimensions.height !== undefined) {
    reqs.width = dimensions.width;
    reqs.height = dimensions.height;
    detectedFields.add("Dimensions");
  }

  // 5. DPI Extraction
  const dpi = extractDpi(normalized);
  if (dpi !== undefined) {
    reqs.dpi = dpi;
    detectedFields.add("DPI");
  }

  // 6. Background Extraction
  const backgroundColor = extractBackgroundColor(normalized);
  if (backgroundColor !== undefined) {
    reqs.backgroundColor = backgroundColor;
    detectedFields.add("Background");
  }

  // 7. Name & Date requirements
  const nameDate = extractNameAndDate(normalized);
  if (nameDate.nameRequired !== undefined) reqs.nameRequired = nameDate.nameRequired;
  if (nameDate.dateRequired !== undefined) reqs.dateRequired = nameDate.dateRequired;

  // 8. Document Type classification
  const docType = extractDocType(normalized);
  reqs.docType = docType;
  if (docType !== "photo") {
    detectedFields.add("DocType");
    // Fallback signature size
    if (docType === "signature" && reqs.width === undefined && reqs.height === undefined) {
      reqs.width = 140;
      reqs.height = 60;
      detectedFields.add("Dimensions");
    }
  }

  // 9. Color Mode
  const colorMode = extractColorMode(normalized);
  if (colorMode !== undefined) {
    reqs.colorMode = colorMode;
    detectedFields.add("ColorMode");
  }

  // 10. Face Coverage
  const faceCoverage = extractFaceCoverage(normalized);
  if (faceCoverage !== undefined) reqs.faceCoverageHint = faceCoverage;

  // 11. Recency hint
  const recency = extractRecency(normalized);
  if (recency !== undefined) reqs.recencyHint = recency;

  // 12. Ink color specifications
  const inkColor = extractInkColor(normalized);
  if (inkColor !== undefined) reqs.inkColorHint = inkColor;

  reqs.detectedFields = Array.from(detectedFields);
  return reqs;
};

export const parseRulesEngine = parseRequirements;

