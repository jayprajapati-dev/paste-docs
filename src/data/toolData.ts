/**
 * ALL_TOOLS — single source of truth for tool pages, sitemap and internal links.
 *
 * Each tool now carries rich, unique SEO content:
 *   - metaTitle / metaDescription / keywords (per-page unique)
 *   - h1 / intro (unique long-form intro for the body)
 *   - specs (visible spec table)
 *   - useCases (real scenarios the page answers)
 *   - faqs (rendered as FAQPage schema + visible text)
 *   - relatedSlugs (internal links to sibling tool pages)
 *
 * This fixes the previous "one template, only title changes" problem that
 * caused Google to flag tool pages as duplicate / thin content.
 */

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolSpec {
  label: string;
  value: string;
}

export interface Tool {
  slug: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  requirements: {
    maxSizeBytes?: number;
    minSizeBytes?: number;
    format?: string;
    width?: number;
    height?: number;
    backgroundColor?: string;
    nameRequired?: boolean;
    dateRequired?: boolean;
    rotate?: 90 | 180 | 270;
    docType?: string;
  };
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  intro: string;
  specs: ToolSpec[];
  useCases: string[];
  faqs: ToolFaq[];
  relatedSlugs: string[];
}

export const ALL_TOOLS: Tool[] = [
  {
    slug: "compress-20kb",
    name: "Compress to 20KB",
    category: "Compress",
    icon: "📦",
    description: "Compress any photo to exactly 20KB for government forms",
    requirements: { maxSizeBytes: 20480, format: "jpeg" },
    metaTitle: "Compress Photo to 20KB Online Free — 100% Private | PasteDocs",
    metaDescription: "Compress JPG/PNG photo to exactly 20KB online for SSC, NEET, OJAS and government forms. 100% browser-based, no upload, no signup. Free 20KB image compressor.",
    keywords: ["compress photo to 20kb", "20kb image compressor online", "photo size 20kb converter", "reduce image size to 20kb", "compress jpg to 20kb free", "20kb photo resizer for ssc", "neet photo 20kb compressor"],
    h1: "Compress Photo to 20KB Online — Free & 100% Private",
    intro: "Need to compress a photo to exactly 20KB for an SSC, NEET, OJAS, IBPS or state-government application form? This 20KB image compressor runs entirely inside your browser — your photo is never uploaded to any server. PasteDocs uses an iterative JPEG quality engine that steps the quality down byte-by-byte until your file lands under the strict 20KB ceiling while keeping the face sharp and the background clean. It is the tool thousands of Indian aspirants use before uploading their passport photo or signature to portals that reject anything above 20KB.",
    specs: [
      { label: "Target size", value: "Max 20 KB (20,480 bytes)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Processing", value: "Runs in your browser (Canvas API)" },
      { label: "Upload", value: "None — files never leave your device" },
      { label: "Cost", value: "Free, no signup, clean output" }
    ],
    useCases: [
      "SSC CGL / CHSL photo upload (the strict 20KB cap)",
      "OJAS Gujarat — GPSC, GPSSSB, GSSSB photo & signature",
      "NEET postcard photo (alongside the 10–200KB postcard)",
      "IBPS PO, SBI PO, RBI Grade-B signature upload",
      "State PSC exams — MPSC, TNPSC, RPSC, BPSC photo upload"
    ],
    faqs: [
      {
        question: "How do I compress a photo to exactly 20KB without losing quality?",
        answer: "Upload your JPG or PNG, PasteDocs auto-detects the 20KB target and iteratively lowers JPEG quality in small steps until the file is at or just under 20,480 bytes. The engine preserves facial sharpness by avoiding over-compression — you can re-run with a smaller dimension if the quality is still poor."
      },
      {
        question: "Will my photo be uploaded to a server?",
        answer: "No. PasteDocs runs the entire compression pipeline inside your browser using the HTML5 Canvas API. Your photo, signature and metadata never leave your device — there is no server upload, no CDN cache and no analytics pixel attached to your file."
      },
      {
        question: "Which exam forms accept a 20KB photo?",
        answer: "The 20KB ceiling is most commonly enforced by SSC (CGL, CHSL, MTS, JE), OJAS Gujarat recruitments, several state PSC photo uploads, and the signature dimension on IBPS and SBI PO forms. Always cross-check the official notification — when in doubt, compress to 20KB which satisfies the strictest common limit."
      },
      {
        question: "Can I compress a PNG to 20KB?",
        answer: "Yes. PasteDocs converts PNG to JPEG automatically before iterative compression, because JPEG is far more efficient for photographs and is the format required by virtually every Indian government portal. If you specifically need a PNG under 20KB, use the JPG-to-PNG tool after compression."
      }
    ],
    relatedSlugs: ["compress-50kb", "signature-resize", "passport-size", "stamp-size", "white-background"]
  },
  {
    slug: "compress-50kb",
    name: "Compress to 50KB",
    category: "Compress",
    icon: "📦",
    description: "Compress any photo to exactly 50KB",
    requirements: { maxSizeBytes: 51200, format: "jpeg" },
    metaTitle: "Compress Photo to 50KB Online Free — Government Forms | PasteDocs",
    metaDescription: "Compress JPG/PNG photo to exactly 50KB online for UPSC, SSC, banking and visa forms. 100% browser-based, no upload, no signup. Free 50KB image compressor with sharp output.",
    keywords: ["compress photo to 50kb", "50kb image compressor online", "photo size 50kb converter", "reduce image to 50kb", "compress jpg to 50kb free", "upsc photo 50kb", "ssc photo 50kb compressor"],
    h1: "Compress Photo to 50KB Online — Free, Sharp & Private",
    intro: "The 50KB cap is the single most common photo limit across Indian recruitment portals — UPSC Civil Services, SSC CGL, IBPS PO, SBI PO, RBI, LIC AAO and most state PSC applications accept a photo of up to 50KB. This 50KB image compressor runs fully in your browser and uses an iterative JPEG encoder that lands your file just under the 50,480-byte ceiling while keeping the face crisp. No upload, no signup, no watermark — your photo stays on your device.",
    specs: [
      { label: "Target size", value: "Max 50 KB (51,200 bytes)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Processing", value: "Browser-only Canvas API, no server" },
      { label: "Upload", value: "None — files never leave your device" },
      { label: "Cost", value: "Free forever, no account needed" }
    ],
    useCases: [
      "UPSC Civil Services (CSE, CDS, NDA, CAPF) photo upload",
      "SSC CGL / CHSL / MTS / JE photo and signature",
      "IBPS PO, Clerk, RRB photo upload (50KB cap)",
      "SBI PO and Clerk online application photo",
      "State PSC exams — UPPSC, BPSC, RPSC, MPPSC photo"
    ],
    faqs: [
      {
        question: "How does the 50KB compressor keep the face sharp?",
        answer: "PasteDocs runs an iterative JPEG encoder that lowers quality in small steps and stops the moment the file drops below 50KB. Because the engine measures actual byte size after each step (not a guessed quality value), it avoids over-compression that destroys facial detail — a common failure of one-shot compressors."
      },
      {
        question: "Is my photo uploaded anywhere when I compress to 50KB?",
        answer: "No. The compressor uses the browser's native Canvas API. Your photo is read into local memory, recompressed in-memory, and offered back to you as a download. There is no HTTP upload, no server storage, and no third-party script that can read the file."
      },
      {
        question: "Can I compress multiple photos to 50KB at once?",
        answer: "Yes. Upload all photos at once, paste the requirement (e.g. 'all photos max 50kb jpg'), and PasteDocs processes them in parallel in your browser. You get a single download for one file or a bulk ZIP for many."
      },
      {
        question: "What size photo is best for a 50KB limit?",
        answer: "A 200×230 px passport photo compresses to under 50KB with excellent quality. A 35×45 mm photo at 413×531 px also fits comfortably. If your source is a 5MB phone shot, the engine downscales it first, then iterates quality."
      }
    ],
    relatedSlugs: ["compress-20kb", "compress-100kb", "passport-size", "signature-resize", "add-name-date"]
  },
  {
    slug: "compress-100kb",
    name: "Compress to 100KB",
    category: "Compress",
    icon: "📦",
    description: "Compress any photo to exactly 100KB",
    requirements: { maxSizeBytes: 102400, format: "jpeg" },
    metaTitle: "Compress Photo to 100KB Online Free — Visa & Exam Forms | PasteDocs",
    metaDescription: "Compress JPG/PNG photo to exactly 100KB online for visa applications, NEET postcard photo and document uploads. 100% browser-based, no upload. Free 100KB image compressor.",
    keywords: ["compress photo to 100kb", "100kb image compressor online", "photo size 100kb converter", "reduce image to 100kb", "compress jpg to 100kb free", "visa photo 100kb", "neet postcard photo 100kb"],
    h1: "Compress Photo to 100KB Online — Free & 100% Private",
    intro: "A 100KB photo cap is commonly required by visa applications (Schengen, UK, Canada), NEET postcard-size uploads (which allow 10–200KB), and several Indian government certificate submissions. This 100KB image compressor runs entirely inside your browser — no upload, no signup, no watermark. The iterative JPEG engine lands your file just under the 102,400-byte ceiling while preserving the facial detail that visa-issuing consulates inspect.",
    specs: [
      { label: "Target size", value: "Max 100 KB (102,400 bytes)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Processing", value: "Local Canvas API processing" },
      { label: "Upload", value: "None — files never leave your device" },
      { label: "Cost", value: "Free, no watermark, no account" }
    ],
    useCases: [
      "Schengen visa photo upload (max 100KB common limit)",
      "UK visa photo online submission",
      "Canada visa / PR photo upload",
      "NEET postcard-size photo (allowed 10–200KB)",
      "Aadhaar, PAN and income certificate document scans"
    ],
    faqs: [
      {
        question: "Why use a 100KB compressor instead of any online resizer?",
        answer: "Most online resizers target a quality percentage, not a byte ceiling. Government and visa portals reject files that are even 1KB over the limit. PasteDocs targets the exact byte size (100KB = 102,400 bytes) and iterates until the file is at or below it — never above."
      },
      {
        question: "Is the 100KB compressor safe for ID documents?",
        answer: "Yes. The compressor runs in your browser using the Canvas API. Your photo, signature or ID scan is never transmitted to a server. This is the safest way to compress a sensitive biometric photo or document before uploading it to a government portal."
      },
      {
        question: "Can I compress a PDF to 100KB?",
        answer: "This page compresses images to 100KB. For PDF compression use the dedicated Compress PDF tool, which reduces PDF file size locally using pdf-lib without uploading the document."
      },
      {
        question: "Will compression affect visa photo compliance?",
        answer: "JPEG compression at the 100KB level preserves the 35×45 mm facial detail that consulates require. PasteDocs does not crop or change dimensions on this page — use the relevant visa photo tool (US, UK, Schengen, Canada) if you also need correct sizing."
      }
    ],
    relatedSlugs: ["compress-50kb", "compress-200kb", "pdf-compress", "passport-size", "white-background"]
  },
  {
    slug: "compress-200kb",
    name: "Compress to 200KB",
    category: "Compress",
    icon: "📦",
    description: "Compress any photo to exactly 200KB",
    requirements: { maxSizeBytes: 204800, format: "jpeg" },
    metaTitle: "Compress Photo to 200KB Online Free — Documents & Scans | PasteDocs",
    metaDescription: "Compress JPG/PNG photo or scanned document to exactly 200KB online for passport, PAN, Aadhaar and government uploads. 100% browser-based, no upload. Free 200KB image compressor.",
    keywords: ["compress photo to 200kb", "200kb image compressor online", "photo size 200kb converter", "reduce image to 200kb", "compress jpg to 200kb free", "passport photo 200kb", "document scan 200kb compressor"],
    h1: "Compress Photo to 200KB Online — Free & 100% Private",
    intro: "The 200KB cap is the standard ceiling for Indian passport photos, PAN card applications, Aadhaar document uploads, and most state-government certificate scans. This 200KB image compressor runs entirely in your browser — your file is never uploaded, never logged, never watermarked. The iterative engine lands your photo just under the 204,800-byte ceiling while keeping text in scanned documents legible.",
    specs: [
      { label: "Target size", value: "Max 200 KB (204,800 bytes)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Processing", value: "100% in-browser Canvas API" },
      { label: "Upload", value: "None — files never leave your device" },
      { label: "Cost", value: "Free — no signup, no branding" }
    ],
    useCases: [
      "Indian passport application photo (200×230px, max 200KB)",
      "PAN card photo upload via NSDL / UTIITSL",
      "Aadhaar document scans for update requests",
      "Income certificate, caste certificate document upload",
      "State government scholarship and subsidy form scans"
    ],
    faqs: [
      {
        question: "How does the 200KB compressor keep scanned text legible?",
        answer: "Scanned documents need higher quality than face photos because text is high-frequency detail. PasteDocs' iterative engine starts from a higher quality floor and only lowers as much as needed to fit under 200KB — preserving the sharpness required for OCR and human review at government portals."
      },
      {
        question: "Can I compress a passport photo to 200KB and the correct size together?",
        answer: "Yes. Use the Passport Size Photo tool which applies both the 413×531 px dimension and the 200KB cap in a single pass. This page is for the size target alone — useful when you already have the correct dimensions."
      },
      {
        question: "Is compressing to 200KB safe for Aadhaar and PAN scans?",
        answer: "Yes — and far safer than uploading the original to a random online compressor. PasteDocs processes everything in your browser. No file, no metadata and no filename is sent to any server. This is the recommended way to prepare a sensitive ID scan before uploading it to UIDAI or NSDL."
      },
      {
        question: "What if my file is still above 200KB after compression?",
        answer: "If the source is a very large scan, PasteDocs will also reduce pixel dimensions to fit the byte target. If you need to preserve exact dimensions, use the Custom Size tool to set both the pixel size and the 200KB cap explicitly."
      }
    ],
    relatedSlugs: ["compress-100kb", "compress-50kb", "passport-size", "pdf-compress", "image-to-pdf"]
  },
  {
    slug: "passport-size",
    name: "Passport Size Photo",
    category: "Resize",
    icon: "🪪",
    description: "Standard Indian passport size 413x531px",
    requirements: { width: 413, height: 531, maxSizeBytes: 204800, format: "jpeg" },
    metaTitle: "Passport Size Photo Maker Online Free — 413x531px | PasteDocs",
    metaDescription: "Create Indian passport size photo (413x531px, max 200KB) online free. Also fits SSC, NEET, visa and government forms. 100% browser-based, no upload, no signup. Free passport photo resizer.",
    keywords: ["passport size photo", "passport photo maker online free", "indian passport photo size", "413x531 passport photo", "passport photo resizer online", "free passport photo tool", "passport photo 200kb"],
    h1: "Passport Size Photo Maker — 413×531px, 100% Free & Private",
    intro: "The standard Indian passport photo is 413×531 pixels at 96 DPI, JPEG format, with a maximum file size of 200KB. This passport size photo maker crops and compresses your photo to that exact specification in a single click — entirely inside your browser. Your files stay on your device — nothing gets sent anywhere. The same dimensions are accepted by SSC CGL, NEET, most Indian visa photo tools and dozens of state-government portals, making this the most-used PasteDocs tool.",
    specs: [
      { label: "Dimensions", value: "413 × 531 px (35 × 45 mm at 96 DPI)" },
      { label: "File size", value: "Max 200 KB" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Background", value: "Plain white recommended" },
      { label: "Processing", value: "Canvas API, runs on your device" }
    ],
    useCases: [
      "Indian passport application / renewal via Passport Seva Kendra",
      "SSC CGL / CHSL / MTS photo upload",
      "NEET UG passport-size photo (alongside postcard photo)",
      "Visa photo base for US, UK, Schengen, Canada (then re-crop)",
      "PAN card, Aadhaar update and most state-government forms"
    ],
    faqs: [
      {
        question: "What is the exact Indian passport photo size in pixels?",
        answer: "The official Indian passport photo is 413×531 pixels (35×45 mm at 96 DPI), JPEG format, in colour, with a plain white background and a maximum file size of 200KB. PasteDocs applies all of these in a single pass."
      },
      {
        question: "Can I use this photo for a US visa or Schengen visa?",
        answer: "The 413×531 px Indian passport size is also the base size for Schengen and UK visa photos. For a US visa use the US Visa Photo tool (600×600 px square). For Canada use the Canada Visa tool. Each visa tool applies the correct crop and KB cap for that consulate."
      },
      {
        question: "Will my passport photo be uploaded to a server?",
        answer: "No — PasteDocs processes everything in your browser using the Canvas API. Your photo is read into local memory, cropped, compressed, and offered back as a download — no part of the file is ever sent over the network."
      },
      {
        question: "Does PasteDocs add a watermark to the passport photo?",
        answer: "Never. The output is a clean JPEG with no watermark, no overlay and no branding. Government portals reject watermarked photos, so PasteDocs never adds one."
      }
    ],
    relatedSlugs: ["passport-photo-maker", "compress-200kb", "stamp-size", "white-background", "us-visa"]
  },
  {
    slug: "passport-photo-maker",
    name: "Passport Photo Maker",
    category: "Resize",
    icon: "👤",
    description: "Create local official passport and visa size photos under KB limits",
    requirements: { width: 350, height: 450, maxSizeBytes: 51200, format: "jpeg" },
    metaTitle: "Passport Photo Maker Online Free — Multiple Sizes | PasteDocs",
    metaDescription: "Make passport photos online for India, US, UK, Schengen, Canada visa. Multiple sizes under KB limits, white background, 100% browser-based. Free passport photo maker, no upload.",
    keywords: ["passport photo maker online free", "make passport photo online", "passport photo creator free", "visa photo maker", "passport size photo generator", "free passport photo tool no upload"],
    h1: "Passport Photo Maker — Free, Multi-Country, 100% Private",
    intro: "A passport photo maker that handles every common specification in one place — Indian passport (413×531px), US visa (600×600px square), UK/Schengen visa (413×531px), Canada visa (420×540px), Singapore visa (400×514px) and more. Each preset applies the correct pixel dimensions, KB cap, and background colour in a single click. Everything runs locally in your browser, so your biometric photo is never uploaded to a server.",
    specs: [
      { label: "Default size", value: "350 × 450 px (Indian passport compact)" },
      { label: "File size", value: "Max 50 KB (configurable per country)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Background", value: "Plain white (blue / grey available)" },
      { label: "Processing", value: "Client-side Canvas API (no upload)" }
    ],
    useCases: [
      "Indian passport renewal and fresh application",
      "US visa DS-160 photo upload (600×600 px, 54–240KB)",
      "UK visa, Schengen visa, Canada visa photo upload",
      "Singapore, Malaysia, Japan visa photo upload",
      "School admission, ID card, library card photos"
    ],
    faqs: [
      {
        question: "How do I make a passport photo with a white background at home?",
        answer: "Stand against a plain white wall in daylight, take a photo with your phone, upload it here, and PasteDocs will crop to the correct size and compress under the KB limit. If your wall is off-white, use the Add White Background tool first to clean it up."
      },
      {
        question: "Which countries' passport photos can this tool make?",
        answer: "Indian passport (413×531px), US visa (600×600px), UK visa (413×531px), Schengen visa (413×531px), Canada visa (420×540px), Singapore visa (400×514px), Japan visa (472×472px), Australia visa (413×531px), UAE/Dubai visa (413×531px) and more — each with the correct KB cap."
      },
      {
        question: "Will my biometric passport photo be uploaded anywhere?",
        answer: "No. PasteDocs processes everything in your browser. There is no server upload, no CDN cache, no third-party script that can read your photo. This is the safest way to prepare a biometric photo for any consulate."
      },
      {
        question: "Can I print the passport photo at a studio after making it here?",
        answer: "Yes. Download the JPEG and ask the studio to print it at 35×45 mm (or the relevant country size). PasteDocs exports at 96 DPI, which prints cleanly at photo studios."
      }
    ],
    relatedSlugs: ["passport-size", "compress-50kb", "white-background", "remove-background", "add-name-date"]
  },
  {
    slug: "stamp-size",
    name: "Stamp Size Photo",
    category: "Resize",
    icon: "📮",
    description: "177x177px stamp size photo",
    requirements: { width: 177, height: 177, maxSizeBytes: 20480, format: "jpeg" },
    metaTitle: "Stamp Size Photo Maker Online Free — 177x177px | PasteDocs",
    metaDescription: "Create stamp size photo (177x177px, max 20KB) online free for Indian government forms, OJAS, SSC, state PSC uploads. 100% browser-based, no upload. Free stamp photo resizer.",
    keywords: ["stamp size photo", "stamp size photo maker online free", "177x177 photo", "stamp size photo resizer", "stamp photo 20kb", "ojas stamp photo", "ssc stamp size photo"],
    h1: "Stamp Size Photo Maker — 177×177px, Free & 100% Private",
    intro: "The stamp size photo (177×177 px, max 20KB) is required by several Indian government forms — most notably OJAS Gujarat recruitments, certain SSC state-level uploads, and many state PSC applications. This stamp photo maker crops and compresses to the exact specification in one click, entirely in your browser. Runs locally; no server, no account, no watermark on the output.",
    specs: [
      { label: "Dimensions", value: "177 × 177 px (square)" },
      { label: "File size", value: "Max 20 KB" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Background", value: "Plain white recommended" },
      { label: "Processing", value: "On-device Canvas API" }
    ],
    useCases: [
      "OJAS Gujarat — GPSC, GPSSSB, GSSSB stamp photo upload",
      "SSC state-level recruitments that ask for a stamp-size photo",
      "State PSC applications (MPSC, TNPSC, RPSC) stamp photo",
      "School and college admission form stamp photo",
      "Local municipal and panchayat form uploads"
    ],
    faqs: [
      {
        question: "What is the stamp size photo dimension in India?",
        answer: "The standard Indian stamp size photo is 177×177 pixels (approximately 2×2 cm at 96 DPI), JPEG format, with a 20KB file-size cap. This is the spec used by OJAS Gujarat and several state PSC application forms."
      },
      {
        question: "Is the stamp photo the same as a passport photo?",
        answer: "No. A stamp photo is smaller (177×177 px, 20KB cap) and square. A passport photo is 413×531 px, 200KB cap, and rectangular (35×45 mm). Most Indian forms ask for both — a passport-size photo for the main upload and a stamp-size photo for the corner print."
      },
      {
        question: "Will my stamp photo be uploaded to a server?",
        answer: "No. PasteDocs processes the photo entirely in your browser using the Canvas API. The file is never transmitted to any server, never cached, and never attached to any analytics pixel."
      },
      {
        question: "Can I make a stamp photo with a white background?",
        answer: "Yes. Upload your photo, and the tool crops to 177×177 with a default white background. If your source background is not white, use the Add White Background tool first."
      }
    ],
    relatedSlugs: ["passport-size", "compress-20kb", "signature-resize", "white-background", "add-name-date"]
  },
  {
    slug: "signature-resize",
    name: "Signature Resize",
    category: "Resize",
    icon: "✍️",
    description: "Resize signature to 140x60px standard",
    requirements: { width: 140, height: 60, maxSizeBytes: 30720, format: "jpeg" },
    metaTitle: "Signature Resize Online Free — 140x60px for SSC, NEET, UPSC | PasteDocs",
    metaDescription: "Resize signature image to 140x60px and under 30KB online free for SSC, NEET, UPSC, IBPS, OJAS government exam forms. 100% browser-based, no upload. Free signature resizer.",
    keywords: ["signature resize online", "signature resizer 140x60", "ssc signature size", "neet signature resize", "upsc signature size", "signature 20kb compressor", "signature converter online free", "resize signature without losing quality"],
    h1: "Signature Resize Online — 140×60px, Free & 100% Private",
    intro: "The standard Indian government exam signature is 140×60 pixels, JPEG, with a file-size cap of 20KB (SSC, OJAS) or 30KB (UPSC, IBPS). This signature resizer crops your handwritten signature to the exact pixel size and compresses it under the KB cap in one click — all in your browser, no upload. It is the most-used PasteDocs tool for SSC CGL, NEET UG, UPSC CSE and IBPS PO signature uploads.",
    specs: [
      { label: "Dimensions", value: "140 × 60 px (signature box)" },
      { label: "File size", value: "Max 30 KB (configurable to 20KB)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Background", value: "Plain white (signature on white paper)" },
      { label: "Processing", value: "Browser Canvas API, local only" }
    ],
    useCases: [
      "SSC CGL / CHSL / MTS / JE signature upload (20KB cap)",
      "NEET UG signature upload (140×60px, 10–30KB)",
      "UPSC CSE, CDS, NDA, CAPF signature upload",
      "IBPS PO, Clerk, RRB signature upload",
      "OJAS Gujarat — GPSC, GPSSSB signature upload"
    ],
    faqs: [
      {
        question: "How do I resize my signature to 140×60px without losing quality?",
        answer: "Sign on a plain white sheet with a black or blue pen, photograph it in daylight, upload here, and PasteDocs crops to 140×60px and compresses under the KB cap while keeping the stroke edges sharp. The engine uses lossless downscaling before iterative JPEG compression."
      },
      {
        question: "What is the SSC signature size and file size?",
        answer: "SSC CGL, CHSL, MTS and JE require a signature of 140×60 px (approximately 1×3 cm) in JPEG format with a file size between 1KB and 20KB. PasteDocs applies these in a single pass."
      },
      {
        question: "What is the NEET signature size?",
        answer: "NEET UG requires the signature at 140×60 px in JPEG, between 10KB and 30KB. The NEET Exam Template on PasteDocs pre-loads both the photo and signature specifications together."
      },
      {
        question: "Does PasteDocs keep a copy of my photo?",
        answer: "No. The signature is processed entirely in your browser using the Canvas API. It is never transmitted to any server, never logged, and never cached — making this the safest way to prepare a biometric signature for any exam portal."
      }
    ],
    relatedSlugs: ["compress-20kb", "passport-size", "stamp-size", "add-name-date", "white-background"]
  },
  {
    slug: "jpg-to-png",
    name: "JPG to PNG",
    category: "Convert",
    icon: "🔄",
    description: "Convert JPG images to PNG format",
    requirements: { format: "png" },
    metaTitle: "JPG to PNG Converter Online Free — No Upload | PasteDocs",
    metaDescription: "Convert JPG/JPEG images to PNG format online free. 100% browser-based, no upload, no signup. Batch JPG to PNG converter with transparency support.",
    keywords: ["jpg to png converter online free", "convert jpg to png", "jpeg to png free", "jpg to png no upload", "batch jpg to png converter", "change jpg to png online"],
    h1: "JPG to PNG Converter — Free, 100% Private, No Upload",
    intro: "Convert JPG and JPEG photos to PNG format entirely in your browser — no upload, no signup, no watermark. PasteDocs uses the native Canvas API to re-encode each JPG as a PNG locally, which means your photos stay on your device throughout. Useful when a portal asks for a PNG specifically (logos, signatures with transparency, screenshots) or when you need lossless quality after editing.",
    specs: [
      { label: "Input formats", value: "JPG, JPEG, WEBP" },
      { label: "Output format", value: "PNG (lossless)" },
      { label: "Transparency", value: "Preserved from source" },
      { label: "Processing", value: "Runs in your browser (Canvas API)" },
      { label: "Cost", value: "Free, no account, clean download" }
    ],
    useCases: [
      "Convert a JPG signature to PNG with transparent background",
      "Convert phone photos to PNG for design / Canva uploads",
      "Convert screenshots to PNG for crisp text rendering",
      "Convert WEBP photos back to PNG (when sites reject WEBP)",
      "Batch convert a folder of JPGs to PNGs in one pass"
    ],
    faqs: [
      {
        question: "Is JPG to PNG conversion lossless?",
        answer: "The PNG encoding itself is lossless. However, if your source is already a JPG (which is lossy), the PNG output will preserve the JPG's existing quality exactly — it cannot undo the original JPEG compression. Use PNG only when the source is lossless or when transparency is required."
      },
      {
        question: "Will my photos be uploaded to a server?",
        answer: "No. The conversion uses the browser's Canvas API. Each JPG is read into local memory, re-encoded as PNG, and offered back as a download. No file ever leaves your device."
      },
      {
        question: "Can I convert multiple JPGs to PNG at once?",
        answer: "Yes. Upload all the JPGs, paste the requirement (e.g. 'all to png'), and PasteDocs converts them in parallel. You get a single ZIP download containing all the PNGs."
      },
      {
        question: "When should I use PNG instead of JPG?",
        answer: "Use PNG for signatures with transparent backgrounds, logos, screenshots with text, line art and any image where the portal specifically requires PNG. Use JPG for photographs and any image that must meet a strict KB cap (JPEG compresses far better than PNG for photos)."
      }
    ],
    relatedSlugs: ["png-to-jpg", "heic-to-jpg", "compress-50kb", "signature-resize", "white-background"]
  },
  {
    slug: "png-to-jpg",
    name: "PNG to JPG",
    category: "Convert",
    icon: "🔄",
    description: "Convert PNG images to JPG format",
    requirements: { format: "jpeg" },
    metaTitle: "PNG to JPG Converter Online Free — No Upload | PasteDocs",
    metaDescription: "Convert PNG images to JPG/JPEG format online free. 100% browser-based, no upload, no signup. Batch PNG to JPG converter with white background fill for transparent PNGs.",
    keywords: ["png to jpg converter online free", "convert png to jpg", "png to jpeg free", "png to jpg no upload", "batch png to jpg converter", "change png to jpg online"],
    h1: "PNG to JPG Converter — Free, 100% Private, No Upload",
    intro: "Convert PNG images to JPG/JPEG format entirely in your browser — no upload, no signup, no watermark. PasteDocs uses the native Canvas API to flatten each PNG (with a white background fill where the PNG was transparent) and re-encode as JPEG. This is the standard preparation step for any Indian government exam photo, signature or document upload, which almost always requires JPEG.",
    specs: [
      { label: "Input formats", value: "PNG, WEBP, GIF (single frame)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Transparency", value: "Flattened to white background" },
      { label: "Processing", value: "Browser-only Canvas API, no server" },
      { label: "Cost", value: "Free to use, no signup required" }
    ],
    useCases: [
      "Convert a transparent PNG signature to JPG for SSC / NEET upload",
      "Convert PNG screenshots to JPG to reduce file size",
      "Convert logo PNG to JPG when a portal rejects PNG",
      "Convert WEBP / GIF to JPG for compatibility",
      "Batch convert a folder of PNGs to JPGs"
    ],
    faqs: [
      {
        question: "What happens to transparency when I convert PNG to JPG?",
        answer: "JPEG does not support transparency. PasteDocs flattens any transparent area to a plain white background (the default for Indian government forms). If you need a different background colour, use the Add White Background or Custom Background tool after conversion."
      },
      {
        question: "Will my PNG be uploaded to a server?",
        answer: "No. The conversion runs entirely in your browser via the Canvas API. Your image stays on your device — no upload, no caching, no analytics."
      },
      {
        question: "Can I convert multiple PNGs to JPG at once?",
        answer: "Yes. Upload all PNGs, paste the requirement (e.g. 'all png to jpg'), and PasteDocs converts them in parallel. The output is a single ZIP if multiple files, or a direct download if one."
      },
      {
        question: "Does PNG to JPG conversion reduce file size?",
        answer: "Usually yes — JPEG is far more efficient than PNG for photographs, often 5×–10× smaller at equivalent visual quality. For line art or images with large flat colour areas, PNG can be smaller; use the right format for the content."
      }
    ],
    relatedSlugs: ["jpg-to-png", "heic-to-jpg", "compress-50kb", "white-background", "passport-size"]
  },
  {
    slug: "heic-to-jpg",
    name: "HEIC to JPG",
    category: "Convert",
    icon: "📱",
    description: "Convert iPhone HEIC photos to JPG",
    requirements: { format: "jpeg" },
    metaTitle: "HEIC to JPG Converter Online Free — iPhone Photos | PasteDocs",
    metaDescription: "Convert iPhone HEIC/HEIF photos to JPG online free. 100% browser-based, no upload, no signup. Batch HEIC to JPG converter for government forms and visa applications.",
    keywords: ["heic to jpg converter online free", "convert heic to jpg", "iphone photo to jpg", "heic to jpeg free", "heic to jpg no upload", "heif to jpg converter"],
    h1: "HEIC to JPG Converter — Free, 100% Private, iPhone Photos",
    intro: "Convert iPhone HEIC and HEIF photos to JPG format entirely in your browser — no upload, no signup, no watermark. iPhones default to HEIC to save space, but every Indian government portal, exam form and visa application requires JPEG. PasteDocs uses the open-source heic2any library locally to decode each HEIC into a clean JPG, then optionally compresses it under the KB cap you need.",
    specs: [
      { label: "Input formats", value: "HEIC, HEIF (iPhone / iPad)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Batch", value: "Unlimited (browser memory permitting)" },
      { label: "Processing", value: "100% client-side heic2any + Canvas API" },
      { label: "Cost", value: "Free, no watermark on output" }
    ],
    useCases: [
      "Convert iPhone photos for SSC / NEET / UPSC exam form upload",
      "Convert iPhone photos for Indian passport / visa applications",
      "Convert iPhone screenshots for portals that reject HEIC",
      "Convert HEIC photos for email or messaging compatibility",
      "Batch convert a vacation folder of HEICs to JPGs"
    ],
    faqs: [
      {
        question: "Why does my iPhone take HEIC photos and not JPG?",
        answer: "Since iOS 11, Apple defaults to HEIC (High Efficiency Image Container) to save storage — HEIC files are about half the size of equivalent JPEGs. The trade-off is compatibility: most government portals and exam forms only accept JPEG, which is why a HEIC-to-JPG converter is needed before upload."
      },
      {
        question: "Will my iPhone photos be uploaded to a server?",
        answer: "No. PasteDocs uses the open-source heic2any library, which decodes HEIC entirely in your browser using WebAssembly. Your photo never leaves your device — making this the safest way to convert private iPhone photos for government forms."
      },
      {
        question: "Can I convert multiple HEIC photos at once?",
        answer: "Yes. Upload all HEICs, paste the requirement (e.g. 'all heic to jpg, max 50kb'), and PasteDocs converts them in parallel. You get a single ZIP download containing all the JPGs, already compressed to your KB cap."
      },
      {
        question: "Does HEIC to JPG conversion lose quality?",
        answer: "The conversion re-encodes the HEIC as JPEG, which is itself a lossy format. At high quality (90+) the visual loss is imperceptible. If you also need a KB cap, PasteDocs iterates the JPEG quality down to fit the byte target while preserving facial detail."
      }
    ],
    relatedSlugs: ["jpg-to-png", "png-to-jpg", "compress-50kb", "passport-size", "image-to-pdf"]
  },
  {
    slug: "white-background",
    name: "Add White Background",
    category: "Edit",
    icon: "⬜",
    description: "Add plain white background to any photo",
    requirements: { backgroundColor: "#ffffff" },
    metaTitle: "Add White Background to Photo Online Free | PasteDocs",
    metaDescription: "Add plain white background to passport photo, signature or ID image online free. 100% browser-based, no upload. For SSC, NEET, UPSC, visa photo compliance.",
    keywords: ["add white background to photo online free", "white background photo editor", "passport photo white background", "make photo background white", "change background to white online free"],
    h1: "Add White Background to Photo — Free & 100% Private",
    intro: "Most Indian passport, visa and exam photo specifications require a plain white background. If you took your photo against a coloured wall or off-white background, this tool flattens it to pure white (#FFFFFF) in one click — entirely in your browser, no upload. The engine detects the dominant non-face border colour and replaces it, leaving the face and hair untouched.",
    specs: [
      { label: "Background colour", value: "Pure white (#FFFFFF)" },
      { label: "Edge detection", value: "Face-aware flood fill" },
      { label: "Output format", value: "JPEG / PNG (matches input)" },
      { label: "Processing", value: "Local Canvas API processing" },
      { label: "Cost", value: "Free, no account, no catch" }
    ],
    useCases: [
      "Passport photo with off-white wall — flatten to pure white",
      "Signature photo with shadow — clean to white",
      "Visa photo background compliance (US, Schengen, UK)",
      "School admission photo with coloured background",
      "ID card photo background standardisation"
    ],
    faqs: [
      {
        question: "How do I make my photo background white without Photoshop?",
        answer: "Upload the photo here, and PasteDocs replaces the non-face border area with pure white (#FFFFFF) automatically. For a fully clean studio look, use the Remove Background tool first, then this tool to fill with white."
      },
      {
        question: "Will adding a white background pass the passport photo check?",
        answer: "Yes, if the original background is light and uniform. The Passport Seva Kendra and most consulates accept a clean white background. If your original background is dark or heavily patterned, use Remove Background first for a cleaner result."
      },
      {
        question: "Is my photo uploaded anywhere?",
        answer: "No. PasteDocs runs the background replacement entirely in your browser using the Canvas API. Your photo is never transmitted to a server."
      },
      {
        question: "Can I add a different background colour (blue, grey)?",
        answer: "Yes. Use the Custom Size tool and enter a background colour like 'blue' or 'light grey' in the requirements box. Schengen and UK visas accept light grey; some Indian visa photos accept blue."
      }
    ],
    relatedSlugs: ["remove-background", "passport-size", "signature-resize", "compress-50kb", "custom-resize"]
  },
  {
    slug: "remove-background",
    name: "Remove Background",
    category: "Edit",
    icon: "✂️",
    description: "Remove photo background completely on device",
    requirements: { backgroundColor: "transparent" },
    metaTitle: "Remove Background from Photo Online Free — On Device | PasteDocs",
    metaDescription: "Remove background from photo 100% in your browser. Everything happens in your browser. No signup, no upload, clean output. Free AI background remover for passport photos, signatures and product images.",
    keywords: ["remove background from photo online free", "background remover free no upload", "ai background remover on device", "transparent background maker", "free background eraser online", "remove bg locally"],
    h1: "Remove Background from Photo — Free, On-Device AI",
    intro: "Remove the background from any photo entirely inside your browser — no upload, no signup, no watermark. PasteDocs uses the open-source @imgly/background-removal model, which runs as WebAssembly locally on your device. The output is a transparent PNG that you can then flatten to white (for passport photos) or composite onto any background. This is the safest way to prepare a biometric photo — your face never leaves your device.",
    specs: [
      { label: "Model", value: "@imgly/background-removal (WebAssembly)" },
      { label: "Output format", value: "PNG (transparent)" },
      { label: "Processing", value: "100% client-side, on-device" },
      { label: "First-run download", value: "~40MB model (cached after)" },
      { label: "Cost", value: "Free, no signup, clean output" }
    ],
    useCases: [
      "Remove background from passport photo before adding white",
      "Remove background from signature scan for transparent PNG",
      "Remove background from product photo for e-commerce listing",
      "Remove background from ID photo for composite / collage",
      "Remove background for design / Canva transparency"
    ],
    faqs: [
      {
        question: "Is the background remover really running on my device?",
        answer: "Yes. PasteDocs uses @imgly/background-removal, an open-source ML model compiled to WebAssembly. The model is downloaded once (~40MB) and then runs entirely in your browser. No photo is ever sent to a server — making this the only safe way to remove the background from a biometric photo."
      },
      {
        question: "Why is the first run slower?",
        answer: "The ML model (~40MB) needs to be downloaded and cached on first use. Subsequent runs are fast because the model is loaded from your browser cache. This is a one-time cost for completely private, on-device processing."
      },
      {
        question: "Can I add a white background after removing it?",
        answer: "Yes. After the background is removed and you have a transparent PNG, use the Add White Background tool to fill with pure white — the standard for passport and visa photos."
      },
      {
        question: "Will my photo be uploaded to a server?",
        answer: "No. The ML model runs in your browser via WebAssembly. Your photo never leaves your device. This is fundamentally different from online background removers that upload your photo to their GPU servers."
      }
    ],
    relatedSlugs: ["white-background", "passport-size", "signature-resize", "jpg-to-png", "compress-50kb"]
  },
  {
    slug: "pdf-compress",
    name: "Compress PDF",
    category: "PDF",
    icon: "📄",
    description: "Reduce PDF file size locally in your browser",
    requirements: { format: "pdf", maxSizeBytes: 204800 },
    metaTitle: "Compress PDF Online Free — No Upload, 100% Private | PasteDocs",
    metaDescription: "Compress PDF file size online free, 100% in your browser. Reduce PDF to 100KB, 200KB, 500KB for government portal uploads. No upload, no signup. Free PDF size reducer.",
    keywords: ["compress pdf online free", "reduce pdf size online", "compress pdf to 100kb", "compress pdf to 200kb", "pdf size reducer free no upload", "compress pdf locally", "compress pdf for government upload"],
    h1: "Compress PDF Online — Free, 100% Private, No Upload",
    intro: "Compress PDF file size entirely in your browser — no upload, no signup, no watermark. Indian government portals commonly cap PDF uploads at 100KB (Aadhaar update), 200KB (PAN application), 500KB (GST returns) or 1MB (court e-filing). PasteDocs uses the open-source pdf-lib library locally to recompress PDF streams and re-encode embedded images to fit your KB target — your document never leaves your device.",
    specs: [
      { label: "Target size", value: "Configurable (100KB / 200KB / 500KB / 1MB / custom)" },
      { label: "Input formats", value: "PDF (any version)" },
      { label: "Output format", value: "PDF (recompressed)" },
      { label: "Processing", value: "100% client-side pdf-lib" },
      { label: "Cost", value: "Free forever, no account needed" }
    ],
    useCases: [
      "Compress Aadhaar PDF for UIDAI update request (100KB cap)",
      "Compress PAN application PDF for NSDL / UTIITSL (200KB cap)",
      "Compress income / caste certificate PDF for state portals",
      "Compress GST return PDF for portal upload",
      "Compress court e-filing PDF (page count + size cap)"
    ],
    faqs: [
      {
        question: "How does PasteDocs compress a PDF without uploading it?",
        answer: "PasteDocs uses pdf-lib, an open-source JavaScript library that parses and rewrites the PDF structure entirely in your browser. Embedded images are re-encoded as compressed JPEG, redundant objects are deduplicated, and the PDF stream is rebuilt — all locally, no upload."
      },
      {
        question: "Is my PDF uploaded to a server?",
        answer: "No. The PDF is read into your browser's memory, recompressed using pdf-lib, and offered back as a download. At no point is the file transmitted to any server — making this the safest way to compress a sensitive document like Aadhaar, PAN or a caste certificate."
      },
      {
        question: "Can I compress a PDF to exactly 100KB?",
        answer: "Yes. PasteDocs iteratively recompresses embedded images at lower quality until the PDF is at or below your byte target. If the page count is high, the engine may also downscale images — text remains searchable and selectable."
      },
      {
        question: "Will compressing the PDF make the text blurry?",
        answer: "No. Only embedded raster images are recompressed; vector text is preserved exactly. If your PDF is text-heavy with few images, the size reduction may be modest — most savings come from PDFs with embedded photos or scans."
      }
    ],
    relatedSlugs: ["image-to-pdf", "compress-200kb", "compress-100kb", "word-to-pdf", "pdf-to-jpg"]
  },
  {
    slug: "image-to-pdf",
    name: "Image to PDF",
    category: "PDF",
    icon: "🖼️",
    description: "Convert JPG or PNG to high-quality PDF",
    requirements: { format: "pdf" },
    metaTitle: "Image to PDF Converter Online Free — No Upload | PasteDocs",
    metaDescription: "Convert JPG or PNG images to high-quality PDF online free. 100% browser-based, no upload, no signup. Batch image-to-PDF converter for government forms and document submission.",
    keywords: ["image to pdf converter online free", "convert jpg to pdf", "convert png to pdf", "image to pdf no upload", "batch image to pdf converter", "jpg to pdf free online"],
    h1: "Image to PDF Converter — Free, 100% Private, No Upload",
    intro: "Convert JPG, PNG or HEIC images to a high-quality PDF entirely in your browser — no upload, no signup, no watermark. PasteDocs uses the open-source pdf-lib library locally to assemble one or many images into a single paginated PDF, perfect for submitting scanned documents to government portals that only accept PDF uploads. Multiple images become multiple pages; one image becomes a single-page PDF.",
    specs: [
      { label: "Input formats", value: "JPG, JPEG, PNG, HEIC, WEBP" },
      { label: "Output format", value: "PDF (A4 / image-size pages)" },
      { label: "Batch", value: "Unlimited images → single PDF" },
      { label: "Processing", value: "100% client-side pdf-lib" },
      { label: "Cost", value: "Free, no watermark, no account" }
    ],
    useCases: [
      "Convert Aadhaar / PAN / photo scans into a single PDF for upload",
      "Convert multiple signature scans into a paginated PDF",
      "Convert phone photos of documents for court e-filing",
      "Convert HEIC / PNG screenshots to PDF for email",
      "Combine multiple certificate scans into one PDF"
    ],
    faqs: [
      {
        question: "How do I convert multiple JPGs into one PDF?",
        answer: "Upload all the JPGs in the order you want them to appear, paste the requirement (e.g. 'combine all images into one pdf'), and PasteDocs assembles them into a single paginated PDF using pdf-lib — entirely in your browser."
      },
      {
        question: "Can anyone access my uploaded photo?",
        answer: "No. The image-to-PDF conversion uses pdf-lib locally. Your image is read into browser memory, embedded into a PDF, and offered back as a download. No file ever leaves your device."
      },
      {
        question: "Can I set the PDF page size to A4?",
        answer: "Yes. PasteDocs defaults to fitting each image to its native size, but you can request A4 pages by typing 'a4 pages' in the requirements box. The image is then centred on an A4 sheet with a small margin."
      },
      {
        question: "Does Image-to-PDF compress my images?",
        answer: "By default the original image quality is preserved in the PDF. If you need a smaller PDF, use the Compress PDF tool after conversion, or type a KB cap in the requirements box (e.g. 'image to pdf, max 200kb')."
      }
    ],
    relatedSlugs: ["pdf-compress", "merge-images-to-pdf", "pdf-to-jpg", "word-to-pdf", "compress-200kb"]
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    category: "PDF",
    icon: "🗺️",
    description: "Render or split PDF pages into JPG images locally",
    requirements: { format: "jpeg" },
    metaTitle: "PDF to JPG Converter Online Free — No Upload | PasteDocs",
    metaDescription: "Convert PDF pages to JPG images online free, 100% in your browser. Split PDF into individual JPGs per page. No upload, no signup. Free PDF to image converter.",
    keywords: ["pdf to jpg converter online free", "convert pdf to jpg", "pdf to image free", "pdf to jpg no upload", "split pdf into images", "pdf to jpeg converter free"],
    h1: "PDF to JPG Converter — Free, 100% Private, No Upload",
    intro: "Convert PDF pages to JPG images entirely in your browser — no upload, no signup, no watermark. PasteDocs uses the open-source pdf.js library locally to render each PDF page as a high-resolution JPG. Useful when a portal asks for JPG uploads but you only have a PDF (e.g. a scanned Aadhaar, PAN or marksheet), or when you need to extract individual pages as images.",
    specs: [
      { label: "Input formats", value: "PDF (any version, password-free)" },
      { label: "Output format", value: "JPEG (.jpg) per page" },
      { label: "Render engine", value: "pdf.js (client-side)" },
      { label: "Processing", value: "100% client-side, no upload" },
      { label: "Cost", value: "Free — no signup, no branding" }
    ],
    useCases: [
      "Convert scanned Aadhaar PDF to JPG for portal upload",
      "Convert PAN PDF to JPG image",
      "Convert marksheet PDF pages to individual JPGs",
      "Extract a single PDF page as an image for email",
      "Convert PDF certificate to JPG for online form"
    ],
    faqs: [
      {
        question: "How do I convert a PDF to JPG without uploading it?",
        answer: "Upload the PDF here, and PasteDocs renders each page to a JPG using pdf.js — Mozilla's open-source PDF renderer compiled for the browser. Your PDF never leaves your device, which is critical for Aadhaar, PAN and other sensitive documents."
      },
      {
        question: "Can I convert a specific PDF page to JPG?",
        answer: "Yes. Paste the page number (e.g. 'page 2 to jpg') in the requirements box and only that page will be rendered. By default all pages are converted and delivered as a ZIP."
      },
      {
        question: "What resolution will the JPG be?",
        answer: "Pages render at 150 DPI by default — sharp enough for re-upload to any government portal. For higher resolution (e.g. for printing), type '300 dpi' in the requirements box."
      },
      {
        question: "Can I convert a password-protected PDF?",
        answer: "No — pdf.js cannot decrypt a password-protected PDF in the browser. Remove the password using Adobe Acrobat or your phone's PDF viewer first, then upload here."
      }
    ],
    relatedSlugs: ["image-to-pdf", "pdf-compress", "compress-200kb", "jpg-to-png", "merge-images-to-pdf"]
  },
  {
    slug: "word-to-pdf",
    name: "Word to PDF",
    category: "Document",
    icon: "📝",
    description: "Convert Word DOCX documents to PDF format locally",
    requirements: { format: "pdf" },
    metaTitle: "Word to PDF Converter Online Free — No Upload | PasteDocs",
    metaDescription: "Convert Word DOCX documents to PDF online free, 100% in your browser. No upload, no signup. Free Word to PDF converter for government forms, resumes and letters.",
    keywords: ["word to pdf converter online free", "convert docx to pdf", "word to pdf no upload", "docx to pdf free", "word document to pdf converter", "free word to pdf offline"],
    h1: "Word to PDF Converter — Free, 100% Private, No Upload",
    intro: "Convert Microsoft Word (.docx) documents to PDF entirely in your browser — no upload, no signup, no watermark. PasteDocs uses the open-source mammoth.js library locally to parse the DOCX and pdf-lib to assemble the PDF, preserving headings, lists, tables and basic formatting. Useful for converting resumes, application letters and government forms to the PDF format that portals require.",
    specs: [
      { label: "Input format", value: "Microsoft Word .docx" },
      { label: "Output format", value: "PDF" },
      { label: "Formatting", value: "Headings, lists, tables, basic styles" },
      { label: "Processing", value: "100% client-side mammoth.js + pdf-lib" },
      { label: "Cost", value: "Free, no account, clean download" }
    ],
    useCases: [
      "Convert a resume / CV DOCX to PDF for job applications",
      "Convert a government application letter to PDF for upload",
      "Convert a school / college assignment DOCX to PDF",
      "Convert an SOP / cover letter to PDF for visa applications",
      "Convert an internal office memo DOCX to PDF"
    ],
    faqs: [
      {
        question: "How does PasteDocs convert Word to PDF without uploading my document?",
        answer: "PasteDocs uses mammoth.js — an open-source DOCX parser — to read your Word file locally, then pdf-lib to assemble a PDF. Both run in your browser, so your document (which may contain sensitive personal info) is never transmitted to a server."
      },
      {
        question: "Will my Word document's formatting be preserved?",
        answer: "Headings, paragraphs, lists, basic tables and inline styles are preserved. Complex elements like embedded charts, custom fonts, advanced layout, and tracked changes may not survive the conversion — for those, the official Word export to PDF is still recommended."
      },
      {
        question: "Can I convert a .doc (old Word) file?",
        answer: "No. mammoth.js supports .docx only (the format since Word 2007). To convert a legacy .doc file, open it in Word or Google Docs and re-save as .docx, then upload here."
      },
      {
        question: "Is my Word document uploaded anywhere?",
        answer: "No. The conversion runs entirely in your browser. Your document stays on your device — making this the safest way to convert a resume, application letter or SOP that contains personal information."
      }
    ],
    relatedSlugs: ["excel-to-pdf", "ppt-to-pdf", "txt-to-pdf", "pdf-compress", "image-to-pdf"]
  },
  {
    slug: "excel-to-pdf",
    name: "Excel to PDF",
    category: "Document",
    icon: "📊",
    description: "Convert Excel XLSX spreadsheets to PDF format locally",
    requirements: { format: "pdf" },
    metaTitle: "Excel to PDF Converter Online Free — No Upload | PasteDocs",
    metaDescription: "Convert Excel XLSX spreadsheets to PDF online free, 100% in your browser. No upload, no signup. Free Excel to PDF converter for statements, invoices and reports.",
    keywords: ["excel to pdf converter online free", "convert xlsx to pdf", "excel to pdf no upload", "xlsx to pdf free", "spreadsheet to pdf converter", "free excel to pdf offline"],
    h1: "Excel to PDF Converter — Free, 100% Private, No Upload",
    intro: "Convert Microsoft Excel (.xlsx) spreadsheets to PDF entirely in your browser — no upload, no signup, no watermark. PasteDocs uses the open-source SheetJS (xlsx) library locally to parse the spreadsheet and pdf-lib to assemble a paginated PDF, preserving cell values, basic formatting and column widths. Useful for converting bank statements, invoices, attendance sheets and reports to PDF for upload.",
    specs: [
      { label: "Input format", value: "Microsoft Excel .xlsx" },
      { label: "Output format", value: "PDF (paginated)" },
      { label: "Formatting", value: "Cell values, borders, basic styling" },
      { label: "Processing", value: "100% client-side SheetJS + pdf-lib" },
      { label: "Cost", value: "Free to use, no signup required" }
    ],
    useCases: [
      "Convert bank statement XLSX to PDF for visa application",
      "Convert invoice XLSX to PDF for client delivery",
      "Convert attendance / salary sheet to PDF for HR upload",
      "Convert GST / ITR worksheet to PDF for portal upload",
      "Convert a school marksheet XLSX to PDF"
    ],
    faqs: [
      {
        question: "How does PasteDocs convert Excel to PDF without uploading?",
        answer: "PasteDocs uses SheetJS (the xlsx library) to parse your spreadsheet locally, then pdf-lib to render each sheet as a paginated PDF. Both libraries run in your browser, so your spreadsheet never leaves your device — important for bank statements and salary sheets."
      },
      {
        question: "Will formulas and charts be preserved?",
        answer: "Cell values (the result of formulas) are preserved. Formulas themselves, embedded charts, pivot tables and complex conditional formatting are not — those should be exported from Excel directly if critical."
      },
      {
        question: "Can I convert a .xls (old Excel) file?",
        answer: "SheetJS supports both .xls and .xlsx. However, the legacy .xls format has limited formatting fidelity — for best results, save as .xlsx in Excel or Google Sheets first."
      },
      {
        question: "Is my spreadsheet uploaded to a server?",
        answer: "No. The conversion runs entirely in your browser. Your spreadsheet is read into local memory, rendered to PDF, and offered back as a download — never transmitted."
      }
    ],
    relatedSlugs: ["word-to-pdf", "ppt-to-pdf", "txt-to-pdf", "pdf-compress", "image-to-pdf"]
  },
  {
    slug: "ppt-to-pdf",
    name: "PPT to PDF",
    category: "Document",
    icon: "📉",
    description: "Convert PowerPoint PPTX slides to PDF format locally",
    requirements: { format: "pdf" },
    metaTitle: "PPT to PDF Converter Online Free — No Upload | PasteDocs",
    metaDescription: "Convert PowerPoint PPTX presentations to PDF online free, 100% in your browser. No upload, no signup. Free PPT to PDF converter for slides, decks and lectures.",
    keywords: ["ppt to pdf converter online free", "convert pptx to pdf", "ppt to pdf no upload", "powerpoint to pdf free", "pptx to pdf converter", "free ppt to pdf offline"],
    h1: "PPT to PDF Converter — Free, 100% Private, No Upload",
    intro: "Convert Microsoft PowerPoint (.pptx) presentations to PDF entirely in your browser — no upload, no signup, no watermark. PasteDocs parses the PPTX locally and assembles each slide as a PDF page, preserving slide titles, text content and basic layout. Useful for converting pitch decks, lectures and project reports to PDF for sharing or upload.",
    specs: [
      { label: "Input format", value: "Microsoft PowerPoint .pptx" },
      { label: "Output format", value: "PDF (one page per slide)" },
      { label: "Formatting", value: "Slide titles, text, basic layout" },
      { label: "Processing", value: "100% client-side" },
      { label: "Cost", value: "Free, no watermark on output" }
    ],
    useCases: [
      "Convert a pitch deck PPTX to PDF for investor email",
      "Convert a lecture PPTX to PDF for student handout",
      "Convert a project report PPTX to PDF for submission",
      "Convert a training deck to PDF for offline reference",
      "Convert a webinar slide deck to PDF for attendees"
    ],
    faqs: [
      {
        question: "How does PasteDocs convert PPTX to PDF without uploading?",
        answer: "PasteDocs parses the PPTX file (which is a zip of XML slides) locally in your browser, then assembles a PDF with one page per slide using pdf-lib. Your presentation never leaves your device — useful for confidential pitch decks."
      },
      {
        question: "Will embedded images and charts be preserved?",
        answer: "Slide text and titles are preserved. Embedded images are preserved at reduced fidelity. Complex animations, transitions, embedded videos and SmartArt are not — those should be exported from PowerPoint directly."
      },
      {
        question: "Can I convert a .ppt (old PowerPoint) file?",
        answer: "This tool supports .pptx only (the format since PowerPoint 2007). For legacy .ppt files, open in PowerPoint or Google Slides and re-save as .pptx, then upload here."
      },
      {
        question: "Is my presentation uploaded anywhere?",
        answer: "No. The conversion runs entirely in your browser. Your presentation stays on your device throughout — making this safe for confidential decks."
      }
    ],
    relatedSlugs: ["word-to-pdf", "excel-to-pdf", "txt-to-pdf", "pdf-compress", "image-to-pdf"]
  },
  {
    slug: "txt-to-pdf",
    name: "TXT to PDF",
    category: "Document",
    icon: "📃",
    description: "Convert plain text files to professional styled PDF",
    requirements: { format: "pdf" },
    metaTitle: "TXT to PDF Converter Online Free — No Upload | PasteDocs",
    metaDescription: "Convert plain text (.txt) files to professional styled PDF online free, 100% in your browser. No upload, no signup. Free text-to-PDF converter for notes, letters and statements.",
    keywords: ["txt to pdf converter online free", "convert text to pdf", "txt to pdf no upload", "text file to pdf free", "plain text to pdf converter", "notepad to pdf online"],
    h1: "TXT to PDF Converter — Free, 100% Private, No Upload",
    intro: "Convert plain text (.txt) files to a clean, professional PDF entirely in your browser — no upload, no signup, no watermark. PasteDocs uses pdf-lib locally to render your text with sensible margins, line wrapping and a serif body font, producing a paginated PDF ready for upload or email. Useful for converting personal statements, application letters, SOPs and notes to PDF.",
    specs: [
      { label: "Input format", value: "Plain text .txt (UTF-8)" },
      { label: "Output format", value: "PDF (A4, paginated)" },
      { label: "Font", value: "Serif body, sans-serif headings" },
      { label: "Processing", value: "100% client-side pdf-lib" },
      { label: "Cost", value: "Free, no account, no catch" }
    ],
    useCases: [
      "Convert a personal statement / SOP text file to PDF",
      "Convert a leave / application letter text to PDF",
      "Convert meeting notes / minutes text to PDF",
      "Convert a notepad draft to PDF for upload",
      "Convert a plain-text password list to PDF for printing"
    ],
    faqs: [
      {
        question: "How does PasteDocs convert text to PDF without uploading?",
        answer: "PasteDocs uses pdf-lib locally to render your text with proper margins, line wrapping and a serif body font. The text is read into your browser's memory and the PDF is assembled on your device — no upload."
      },
      {
        question: "Will my line breaks and indentation be preserved?",
        answer: "Single newlines become soft wraps; double newlines become paragraph breaks. Leading spaces are preserved as indentation. If your text relies on specific column alignment (e.g. ASCII tables), use a monospace request (e.g. 'monospace font') for best results."
      },
      {
        question: "Can I convert a Markdown file to PDF?",
        answer: "This tool converts plain text. For Markdown (.md) files, the BlogPost renderer on PasteDocs already renders Markdown to HTML; for a PDF export of Markdown, use the Word-to-PDF tool after pasting the rendered content into a .docx."
      },
      {
        question: "Is my text file uploaded anywhere?",
        answer: "No. The conversion runs entirely in your browser. Your text file is read locally and the PDF is offered back as a download — never transmitted to any server."
      }
    ],
    relatedSlugs: ["word-to-pdf", "excel-to-pdf", "ppt-to-pdf", "pdf-compress", "image-to-pdf"]
  },
  {
    slug: "merge-images-to-pdf",
    name: "Merge Images to PDF",
    category: "PDF",
    icon: "📚",
    description: "Combine multiple JPG/PNG images into a single PDF document",
    requirements: { format: "pdf" },
    metaTitle: "Merge Images to PDF Online Free — No Upload | PasteDocs",
    metaDescription: "Combine multiple JPG / PNG images into a single PDF online free, 100% in your browser. No upload, no signup. Free image-to-PDF merger for scanned documents.",
    keywords: ["merge images to pdf online free", "combine jpg into pdf", "multiple images to one pdf", "merge photos to pdf no upload", "batch image to pdf merger", "combine png to pdf free"],
    h1: "Merge Images to PDF — Free, 100% Private, No Upload",
    intro: "Combine multiple JPG, PNG or HEIC images into a single paginated PDF entirely in your browser — no upload, no signup, no watermark. PasteDocs uses pdf-lib locally to assemble each image as a page in a single output PDF, in the exact order you specify. The standard tool for submitting a multi-page scanned document (Aadhaar + PAN + marksheet) as a single PDF to a portal that only accepts one file.",
    specs: [
      { label: "Input formats", value: "JPG, JPEG, PNG, HEIC, WEBP" },
      { label: "Output format", value: "PDF (one page per image)" },
      { label: "Order", value: "Upload order = page order (reorderable)" },
      { label: "Processing", value: "100% client-side pdf-lib" },
      { label: "Cost", value: "Free, no signup, clean output" }
    ],
    useCases: [
      "Merge Aadhaar + PAN + photo scans into one PDF for visa upload",
      "Merge multiple marksheet scans into one PDF for school admission",
      "Merge invoice + delivery note images into one PDF for client",
      "Merge passport + signature scans into one PDF for exam form",
      "Merge multi-page court documents into one PDF for e-filing"
    ],
    faqs: [
      {
        question: "How do I merge multiple JPGs into one PDF?",
        answer: "Upload all the JPGs in the order you want them to appear as pages, paste the requirement (e.g. 'merge all images to one pdf'), and PasteDocs assembles them into a single multi-page PDF using pdf-lib — entirely in your browser."
      },
      {
        question: "Can I reorder the images after upload?",
        answer: "Yes. Drag any image in the upload zone to reorder it before processing. The page order in the PDF will match your final upload order."
      },
      {
        question: "Is each image compressed in the PDF?",
        answer: "By default the original image quality is preserved. If the merged PDF exceeds your portal's KB cap, type a target (e.g. 'merge to pdf, max 500kb') and the engine will recompress each image to fit."
      },
      {
        question: "Are my images uploaded to a server?",
        answer: "No. The merge runs entirely in your browser via pdf-lib. Your images are read into local memory, embedded into a PDF, and offered back as a download — never transmitted."
      }
    ],
    relatedSlugs: ["image-to-pdf", "pdf-compress", "pdf-to-jpg", "compress-200kb", "word-to-pdf"]
  },
  {
    slug: "add-name-date",
    name: "Add Name & Date",
    category: "Edit",
    icon: "🖊️",
    description: "Add candidate name and date on photo for UPSC, SSC",
    requirements: { nameRequired: true, dateRequired: true },
    metaTitle: "Add Name & Date on Photo Online Free — UPSC, NEET | PasteDocs",
    metaDescription: "Add candidate name and date stamp on photo online free for UPSC, NEET, SSC, IBPS exam forms. 100% browser-based, no upload. Free photo name and date stamper.",
    keywords: ["add name and date on photo online free", "name date stamp photo", "neet photo name date", "upsc photo name date stamp", "ssc photo with name date", "candidate name on photo online"],
    h1: "Add Name & Date on Photo — Free & 100% Private",
    intro: "Several Indian exam forms — most notably NEET UG, UPSC CSE and certain SSC recruitments — require the candidate's name and the date the photo was taken to be printed on the photo itself. This tool overlays your name and today's date (or any date you specify) on the photo in a clean, exam-compliant font, entirely in your browser. No account needed, no files uploaded, no watermark added to your download.",
    specs: [
      { label: "Overlay", value: "Name (top or bottom) + Date (bottom)" },
      { label: "Font", value: "Sans-serif, exam-compliant size" },
      { label: "Date format", value: "DD/MM/YYYY (configurable)" },
      { label: "Processing", value: "100% in-browser Canvas API" },
      { label: "Cost", value: "Free forever, no account needed" }
    ],
    useCases: [
      "NEET UG photo with name and date (NTA requirement)",
      "UPSC CSE photo with name and date stamp",
      "SSC CGL photo name and date overlay",
      "IBPS PO photo with candidate name and date",
      "State PSC photo with name and date stamp"
    ],
    faqs: [
      {
        question: "Does NEET require the name and date on the photo?",
        answer: "Yes. NTA requires the NEET UG passport photo to have the candidate's name and the date the photo was taken printed on it. Use this tool to add both in a clean, exam-compliant font before uploading."
      },
      {
        question: "Does UPSC require the name and date on the photo?",
        answer: "UPSC Civil Services (CSE) and several other UPSC exams require the candidate's name and photo date on the uploaded photo. Check the official notification for the specific exam — when in doubt, add it."
      },
      {
        question: "Where on the photo should the name and date appear?",
        answer: "Most exam notifications specify the name across the top or bottom of the photo and the date below it. PasteDocs uses a default bottom placement that satisfies NEET, UPSC and SSC; if your notification specifies otherwise, mention it in the requirements box."
      },
      {
        question: "Will my photo with name and date be uploaded to a server?",
        answer: "No. The name and date are overlaid using the Canvas API in your browser. Your photo stays on your device throughout — no upload, no caching, no third-party script."
      }
    ],
    relatedSlugs: ["passport-size", "signature-resize", "compress-50kb", "white-background", "stamp-size"]
  },
  {
    slug: "custom-resize",
    name: "Custom Size",
    category: "Resize",
    icon: "⚙️",
    description: "Enter any custom dimensions and file size",
    requirements: {},
    metaTitle: "Custom Image Resizer Online Free — Any Size, Any KB | PasteDocs",
    metaDescription: "Resize image to any custom dimensions and file size online free. 100% browser-based, no upload. Free custom image resizer for unique government, visa and exam form specs.",
    keywords: ["custom image resizer online free", "resize photo to custom size", "custom photo dimensions online", "resize image to specific kb", "custom image size converter", "free custom photo resizer no upload"],
    h1: "Custom Image Resizer — Any Size, Any KB, 100% Private",
    intro: "Resize any image to exact custom dimensions and an exact KB cap — entirely in your browser, no upload. Paste any requirement (e.g. '300x400px, max 80kb, jpg') in any language (English, Hindi, Gujarati supported) and the rules engine parses it automatically. This is the most flexible PasteDocs tool — useful when a portal has a non-standard size that no preset covers.",
    specs: [
      { label: "Dimensions", value: "Any (width × height in px or cm)" },
      { label: "File size", value: "Any KB cap (iterative)" },
      { label: "Format", value: "JPEG, PNG, WEBP, PDF" },
      { label: "Languages", value: "English, हिंदी, ગુજરાતી" },
      { label: "Processing", value: "Canvas API, runs on your device" }
    ],
    useCases: [
      "Non-standard government portal photo specs",
      "Niche visa photo sizes (e.g. China, Russia, Brazil)",
      "Custom scholarship / fellowship form photo",
      "Local municipal / panchayat form photo specs",
      "School / college admission custom photo size"
    ],
    faqs: [
      {
        question: "How do I resize a photo to a custom size and KB cap?",
        answer: "Upload the photo, paste the requirement in the requirements box in any format (e.g. '350x450 px, max 50kb, jpg', 'photo 3.5cm x 4.5cm 20kb', or 'फोटो 200x200 px 30kb'), and PasteDocs' rules engine parses it automatically — no manual configuration needed."
      },
      {
        question: "Can PasteDocs read requirements in Hindi or Gujarati?",
        answer: "Yes. The rules engine recognises common dimension, format and size phrases in English, Hindi (हिंदी) and Gujarati (ગુજરાતી). Paste the original notification text directly — the engine extracts the relevant constraints."
      },
      {
        question: "What if I don't know the exact spec?",
        answer: "Paste the entire requirement text from the official notification. The engine extracts whatever it can find (dimensions, KB cap, format, background). Anything unspecified is left at the original value."
      },
      {
        question: "Do you store my photo anywhere?",
        answer: "No. The resize and compress pipeline runs entirely in your browser using the Canvas API. Your photo is never transmitted to any server — making this safe even for Aadhaar, PAN and other sensitive documents."
      }
    ],
    relatedSlugs: ["passport-size", "signature-resize", "compress-50kb", "compress-20kb", "custom-resize"]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // NEW TOOLS — added to target high-volume / low-KD keywords identified in
  // the 2026 keyword research. Each carries full unique SEO content so it
  // passes the AdSense "500-800 words per tool page" quality bar.
  // ═══════════════════════════════════════════════════════════════════════════

  {
    slug: "neet-postcard-photo",
    name: "NEET Postcard Photo",
    category: "Exam",
    icon: "📮",
    description: "NEET UG postcard-size photo 4×6 inch, 10-200KB, JPG",
    requirements: { width: 600, height: 900, minSizeBytes: 10240, maxSizeBytes: 204800, format: "jpeg", docType: "postcard" },
    metaTitle: "NEET Postcard Photo Size 2026 — 4x6 Inch, 10-200KB | PasteDocs",
    metaDescription: "Create NEET 2026 postcard-size photo (4×6 inch, 10-200KB, JPG) online free. NTA-compliant dimensions and file size. 100% browser-based, no upload. Free NEET postcard photo resizer.",
    keywords: ["neet postcard photo", "neet postcard photo size 2026", "neet postcard size photo 4x6", "upload postcard size photo neet", "neet photo 10-200kb", "neet postcard photo resizer", "nta neet postcard photo format"],
    h1: "NEET Postcard Photo 2026 — 4×6 Inch, 10-200KB, Free & Private",
    intro: "The National Testing Agency (NTA) requires every NEET UG 2026 aspirant to upload a postcard-size photograph in addition to the standard passport-size photo. The official specification is 4×6 inches (approximately 600×900 pixels at 96 DPI), JPG/JPEG format, with a file size strictly between 10KB and 200KB. This tool crops your photo to those exact dimensions and compresses it into the allowed KB range in one click — entirely in your browser. The whole pipeline runs in your browser — no server round-trip, no signup. It is the most-requested NEET-specific tool on PasteDocs based on live Search Console data.",
    specs: [
      { label: "Dimensions", value: "600 × 900 px (4 × 6 inch at 96 DPI)" },
      { label: "File size", value: "10 KB – 200 KB (NTA strict range)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Background", value: "Plain white recommended" },
      { label: "Processing", value: "Client-side Canvas API (no upload)" }
    ],
    useCases: [
      "NEET UG 2026 online application postcard photo upload",
      "NEET 2026 correction window — re-upload postcard photo",
      "NEET MDS / NEET PG postcard photo (same 4×6 spec)",
      "Any NTA-conducted exam requiring a 4×6 inch postcard photo",
      "State CET exams that adopted the NTA postcard-photo standard"
    ],
    faqs: [
      {
        question: "What is the NEET postcard photo size for 2026?",
        answer: "NTA specifies the NEET UG postcard photo as 4×6 inches (approximately 600×900 pixels at 96 DPI), JPG/JPEG format, with a file size between 10KB and 200KB. At least 80% of the candidate's face including ears must be visible. PasteDocs applies all of these constraints in a single click."
      },
      {
        question: "Is the postcard photo different from the passport photo in NEET?",
        answer: "Yes. NEET requires TWO photos: a passport-size photo (3.5×4.5 cm, 10-200KB) AND a postcard-size photo (4×6 inch, 10-200KB). Both must be uploaded separately. The passport photo appears on the admit card; the postcard photo is used for identity verification at the exam centre. Use the NEET UG exam template to prepare both together."
      },
      {
        question: "Why was my NEET postcard photo rejected?",
        answer: "The three most common rejection reasons are: (1) file size outside the 10-200KB range, (2) wrong dimensions (not 4×6 inch), (3) face coverage below 80% or ears not visible. PasteDocs fixes #1 and #2 automatically. For #3, ensure the photo is a clear front-facing portrait with both ears visible, taken against a plain white background in daylight."
      },
      {
        question: "Is my NEET postcard photo uploaded to a server?",
        answer: "No. PasteDocs processes the photo entirely in your browser using the HTML5 Canvas API. The photo is read into local memory, cropped to 600×900 px, compressed into the 10-200KB range, and offered back as a download. No file is ever transmitted to any server — making this the safest way to prepare a biometric photo for NEET."
      }
    ],
    relatedSlugs: ["passport-size", "compress-50kb", "compress-200kb", "add-name-date", "stamp-size"]
  },
  {
    slug: "compress-10kb",
    name: "Compress to 10KB",
    category: "Compress",
    icon: "📦",
    description: "Compress any photo to exactly 10KB for thumbnails and profile pictures",
    requirements: { maxSizeBytes: 10240, format: "jpeg" },
    metaTitle: "Compress Photo to 10KB Online Free — Thumbnails & Profile Pics | PasteDocs",
    metaDescription: "Compress JPG/PNG photo to exactly 10KB online free for profile pictures, thumbnails, directory photos and web graphics. 100% browser-based, no upload. Free 10KB image compressor.",
    keywords: ["compress photo to 10kb", "10kb image compressor online", "photo size 10kb converter", "reduce image to 10kb", "compress jpg to 10kb free", "10kb photo resizer", "profile picture 10kb compressor"],
    h1: "Compress Photo to 10KB Online — Free & 100% Private",
    intro: "Need a photo under 10KB for a profile picture, directory thumbnail, small web graphic, or a niche government form with an extremely strict size cap? This 10KB image compressor runs entirely in your browser and uses an iterative JPEG quality engine that steps the quality down byte-by-byte until your file lands at or just under 10,240 bytes. The engine also downscales pixel dimensions (default max 400px at the 10KB tier) so the face or subject remains recognisable. Your photo never leaves your screen. No account, no watermark, no catch.",
    specs: [
      { label: "Target size", value: "Max 10 KB (10,240 bytes)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Max dimension", value: "~400 px (auto-downscaled)" },
      { label: "Processing", value: "On-device Canvas API" },
      { label: "Cost", value: "Free, no watermark, no account" }
    ],
    useCases: [
      "Staff directory photos and ID-card thumbnails (10KB cap)",
      "Small profile pictures for legacy portals and forums",
      "Email signature images (kept tiny for deliverability)",
      "Newsletter and marketing-email inline graphics",
      "Niche government forms with a sub-15KB photo cap"
    ],
    faqs: [
      {
        question: "How do I compress a photo to exactly 10KB?",
        answer: "Upload your JPG or PNG, and PasteDocs' iterative engine lowers JPEG quality in small steps until the file is at or below 10,240 bytes. If the source is large, the engine also downscales pixel dimensions to ~400px max — the smallest tier in our downscaling ladder — so the subject stays recognisable at the tiny file size."
      },
      {
        question: "Will a 10KB photo still look good?",
        answer: "At 10KB the photo will be visibly lower quality than the original, but the face or main subject remains clearly recognisable. This is the standard trade-off for sub-15KB compression — it is intended for thumbnails, profile pictures and small web graphics, not for full-size portraits or visa photos compliance."
      },
      {
        question: "Where does my photo go when I upload it here?",
        answer: "No. PasteDocs runs the entire compression pipeline inside your browser using the HTML5 Canvas API. Your photo is read into local memory, recompressed in-memory, and offered back to you as a download. There is no HTTP upload, no server storage, and no third-party script that can read the file."
      },
      {
        question: "Can I compress multiple photos to 10KB at once?",
        answer: "Yes. Upload all photos, paste the requirement (e.g. 'all max 10kb jpg'), and PasteDocs processes them in parallel in your browser. You get a single ZIP download containing all the compressed files."
      }
    ],
    relatedSlugs: ["compress-20kb", "compress-50kb", "stamp-size", "signature-resize", "custom-resize"]
  },
  {
    slug: "compress-30kb",
    name: "Compress to 30KB",
    category: "Compress",
    icon: "📦",
    description: "Compress any photo to exactly 30KB for NEET signature and exam uploads",
    requirements: { maxSizeBytes: 30720, format: "jpeg" },
    metaTitle: "Compress Photo to 30KB Online Free — NEET Signature & Exam Forms | PasteDocs",
    metaDescription: "Compress JPG/PNG photo or signature to exactly 30KB online for NEET, UPSC, IBPS exam forms. 100% browser-based, no upload. Free 30KB image compressor with sharp output.",
    keywords: ["compress photo to 30kb", "30kb image compressor online", "signature 30kb compressor", "neet signature 30kb", "upsc signature 30kb", "reduce image to 30kb", "compress jpg to 30kb free"],
    h1: "Compress Photo to 30KB Online — Free & 100% Private",
    intro: "The 30KB cap is the upper bound for NEET signature uploads (10-30KB) and a common requirement for UPSC, IBPS and several state PSC signature uploads. This 30KB image compressor runs entirely in your browser — your file is never uploaded to any server. The iterative JPEG engine lands your file just under the 30,720-byte ceiling while keeping stroke edges sharp for signatures and facial detail for photos. It works offline after first load. No signup, no upload, no branding on output.",
    specs: [
      { label: "Target size", value: "Max 30 KB (30,720 bytes)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Max dimension", value: "~600 px (auto-downscaled)" },
      { label: "Processing", value: "Browser Canvas API, local only" },
      { label: "Cost", value: "Free — no signup, no branding" }
    ],
    useCases: [
      "NEET UG signature upload (10-30KB range)",
      "UPSC Civil Services signature upload",
      "IBPS PO / Clerk signature upload",
      "State PSC signature uploads (MPSC, TNPSC, RPSC)",
      "Small profile photos for forms with a 30KB cap"
    ],
    faqs: [
      {
        question: "How do I compress my signature to under 30KB for NEET?",
        answer: "Upload your signature image (JPG or PNG), and PasteDocs iteratively lowers JPEG quality until the file is at or below 30KB (30,720 bytes). The engine also downscales large source images to ~600px max, which keeps signature strokes crisp at the small file size. The output is ready for direct NEET upload."
      },
      {
        question: "What is the NEET signature file size limit?",
        answer: "NEET UG requires the signature to be in JPG/JPEG format with a file size between 10KB and 30KB. The dimensions should be approximately 140×60 px (the standard exam signature box). Use the Signature Resize tool to set the dimensions first, then compress here if the file is still over 30KB."
      },
      {
        question: "Is my photo safe with PasteDocs?",
        answer: "No. The tool works entirely on your machine — no server upload, no storage. Your signature is read into local memory, recompressed in-memory, and offered back as a download. No file, no metadata and no filename is sent to any server — making this the safest way to prepare a biometric signature."
      },
      {
        question: "Can I compress a photo (not a signature) to 30KB?",
        answer: "Yes. The 30KB target works for both signatures and small portrait photos. For face photos at 30KB, the engine downscales to ~600px and iterates JPEG quality — the face remains clearly recognisable but lower quality than the original. For signatures, 30KB preserves stroke edges well."
      }
    ],
    relatedSlugs: ["compress-20kb", "compress-50kb", "signature-resize", "compress-100kb", "stamp-size"]
  },
  {
    slug: "compress-500kb",
    name: "Compress to 500KB",
    category: "Compress",
    icon: "📦",
    description: "Compress any photo or document scan to exactly 500KB",
    requirements: { maxSizeBytes: 512000, format: "jpeg" },
    metaTitle: "Compress Photo to 500KB Online Free — Documents & Scans | PasteDocs",
    metaDescription: "Compress JPG/PNG photo or scanned document to exactly 500KB online for job applications, admissions, GST returns and government portals. 100% browser-based, no upload. Free 500KB compressor.",
    keywords: ["compress photo to 500kb", "500kb image compressor online", "photo size 500kb converter", "reduce image to 500kb", "compress jpg to 500kb free", "document scan 500kb", "job application photo 500kb"],
    h1: "Compress Photo to 500KB Online — Free & 100% Private",
    intro: "The 500KB cap is one of the most common document-upload limits across Indian government and private portals — GST returns, e-filing court documents, job application portals (Naukri, government job sites), college admission scans, and several visa document uploads. This 500KB compressor runs entirely in your browser, so your sensitive documents (Aadhaar, PAN, marksheets, income certificates) never leave your device. The iterative engine lands your file just under the 512,000-byte ceiling while keeping scanned text legible.",
    specs: [
      { label: "Target size", value: "Max 500 KB (512,000 bytes)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Max dimension", value: "~1600 px (auto-downscaled)" },
      { label: "Processing", value: "Runs in your browser (Canvas API)" },
      { label: "Cost", value: "Free, no account, clean download" }
    ],
    useCases: [
      "GST return document upload (500KB per attachment cap)",
      "Court e-filing document scans (500KB per page cap)",
      "Job application photo and document uploads (Naukri, Sarkari)",
      "College / university admission document scans",
      "Visa supporting document uploads (bank statements, invitations)"
    ],
    faqs: [
      {
        question: "How do I compress a document scan to exactly 500KB?",
        answer: "Upload your scanned JPG or PNG, and PasteDocs iteratively lowers JPEG quality until the file is at or below 500KB (512,000 bytes). For multi-page documents, compress each page separately and then merge them into a single PDF using the Merge Images to PDF or Image to PDF tool. Scanned text remains legible at 500KB."
      },
      {
        question: "Do you upload my file to process it?",
        answer: "No. This is the safest way to compress a sensitive document (Aadhaar, PAN, marksheet, income certificate) before uploading it to a government portal. PasteDocs runs the Canvas API entirely in your browser — the file is read into local memory, recompressed in-memory, and offered back as a download. No part of the file is ever transmitted over the network."
      },
      {
        question: "Can I compress a PDF to 500KB?",
        answer: "This page compresses images (JPG/PNG) to 500KB. For PDF compression use the dedicated Compress PDF tool, which reduces PDF file size locally using pdf-lib. If you need a 500KB PDF from scanned images, compress each image here first, then merge to PDF."
      },
      {
        question: "Will 500KB compression affect document readability?",
        answer: "No. At 500KB the JPEG quality stays high enough that scanned text, signatures and stamp marks remain clearly legible — both for human review and for OCR at government portals. PasteDocs iterates quality down only as much as needed to hit the byte target, preserving maximum readability."
      }
    ],
    relatedSlugs: ["compress-200kb", "compress-100kb", "pdf-compress", "image-to-pdf", "merge-images-to-pdf"]
  },
  {
    slug: "compress-1mb",
    name: "Compress to 1MB",
    category: "Compress",
    icon: "📦",
    description: "Compress any photo or document to exactly 1MB",
    requirements: { maxSizeBytes: 1048576, format: "jpeg" },
    metaTitle: "Compress Photo to 1MB Online Free — High Quality | PasteDocs",
    metaDescription: "Compress JPG/PNG photo or document to exactly 1MB online for Aadhaar update, visa documents, email attachments. 100% browser-based, no upload. Free 1MB image compressor.",
    keywords: ["compress photo to 1mb", "1mb image compressor online", "photo size 1mb converter", "reduce image to 1mb", "compress jpg to 1mb free", "document scan 1mb compressor", "aadhaar document 1mb"],
    h1: "Compress Photo to 1MB Online — Free & 100% Private",
    intro: "The 1MB cap is a common upper limit for Aadhaar document-update uploads, several visa supporting documents, email attachment limits, and large-format photo submissions. This 1MB compressor runs entirely in your browser — no upload, no signup, no watermark. The iterative JPEG engine preserves near-original quality while landing your file just under 1,048,576 bytes. Ideal for high-quality document scans and photographs that must retain full detail while meeting a portal's byte ceiling.",
    specs: [
      { label: "Target size", value: "Max 1 MB (1,048,576 bytes)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Max dimension", value: "~2400 px (preserves detail)" },
      { label: "Processing", value: "Browser-only Canvas API, no server" },
      { label: "Cost", value: "Free to use, no signup required" }
    ],
    useCases: [
      "Aadhaar document-update uploads (1MB per document cap)",
      "Visa supporting documents (bank statements, invitation letters)",
      "Email attachments that must stay under 1MB",
      "High-quality ID-card scans for corporate / school submissions",
      "Portfolio / project photo uploads with a 1MB ceiling"
    ],
    faqs: [
      {
        question: "How do I compress a photo to exactly 1MB?",
        answer: "Upload your JPG or PNG, and PasteDocs iteratively lowers JPEG quality until the file is at or below 1MB (1,048,576 bytes). At the 1MB tier the engine preserves near-original quality — the visual difference is imperceptible for most photos and document scans. Large source images are kept at up to ~2400px."
      },
      {
        question: "Where is my photo processed — on your server or my device?",
        answer: "No. PasteDocs runs the entire compression pipeline inside your browser using the Canvas API. Your photo or document scan is read into local memory, recompressed in-memory, and offered back as a download. There is no HTTP upload, no server storage, and no third-party script that can read the file — making this safe for Aadhaar, PAN and other sensitive documents."
      },
      {
        question: "Can I compress a PDF to 1MB?",
        answer: "This page compresses images to 1MB. For PDF compression use the dedicated Compress PDF tool, which uses pdf-lib locally. For scanned PDFs, consider splitting the PDF into individual page images (PDF to JPG), compressing each to 1MB here, then merging back to PDF."
      },
      {
        question: "Will 1MB compression lose quality?",
        answer: "At 1MB the quality loss is virtually imperceptible — the JPEG quality stays at 85+ for most source images. This tier is designed for high-quality document scans and photographs that must retain full detail for human review or OCR. You would only see a visible difference on extremely large source images (10MB+) that are heavily downscaled."
      }
    ],
    relatedSlugs: ["compress-500kb", "compress-200kb", "pdf-compress", "image-to-pdf", "passport-size"]
  },
  {
    slug: "exif-remover",
    name: "Remove EXIF Metadata",
    category: "Privacy",
    icon: "🛡️",
    description: "Strip EXIF, GPS and camera metadata from photos — 100% on device",
    requirements: { format: "jpeg" },
    metaTitle: "Remove EXIF Metadata from Photo Online Free — On Device | PasteDocs",
    metaDescription: "Remove EXIF, GPS location and camera metadata from JPG/PNG photos online free. 100% browser-based, no upload. Privacy-first metadata stripper for safe photo sharing.",
    keywords: ["remove exif metadata", "exif remover online free", "strip metadata from photo", "remove gps location from photo", "delete camera data from image", "metadata remover no upload", "photo privacy stripper"],
    h1: "Remove EXIF Metadata from Photo — Free, On-Device Privacy",
    intro: "Every photo taken by a phone or digital camera carries hidden EXIF metadata — GPS coordinates of where the photo was taken, the camera model, the date and time, the software used, and sometimes even the owner's name. When you share or upload that photo, the metadata goes with it. This EXIF remover strips all metadata from your JPG or PNG photos entirely in your browser — no upload, no server, no trace. PasteDocs re-encodes the image through the HTML5 Canvas API, which produces a clean image with zero EXIF, GPS or XMP data. It is the privacy-first way to prepare any photo before sharing it online.",
    specs: [
      { label: "Input formats", value: "JPG, JPEG, PNG, HEIC, WEBP" },
      { label: "Output format", value: "JPEG (.jpg) — clean, no metadata" },
      { label: "Metadata removed", value: "EXIF, GPS, IPTC, XMP, ICC profile" },
      { label: "Processing", value: "100% client-side Canvas re-encode" },
      { label: "Cost", value: "Free, no watermark on output" }
    ],
    useCases: [
      "Strip GPS location from photos before posting on social media",
      "Remove camera/phone model metadata before sharing online",
      "Clean biometric photos before uploading to untrusted portals",
      "Prepare product photos for e-commerce (no EXIF bloat)",
      "Strip metadata from email attachments (privacy + smaller size)"
    ],
    faqs: [
      {
        question: "What is EXIF metadata and why should I remove it?",
        answer: "EXIF (Exchangeable Image File Format) metadata is hidden data embedded in every photo by your camera or phone. It includes GPS coordinates of where the photo was taken, the camera model, date and time, software version, and sometimes the owner's name. Anyone who receives the photo can read this data. Removing EXIF protects your privacy — especially for photos shared on social media, email, or uploaded to untrusted portals."
      },
      {
        question: "Does PasteDocs upload my photo to remove EXIF?",
        answer: "No. This is the safest way to strip EXIF metadata. PasteDocs re-encodes the image through the HTML5 Canvas API entirely in your browser. The photo is read into local memory, drawn onto a Canvas (which strips all metadata), and exported as a clean JPEG. No file is ever transmitted to any server."
      },
      {
        question: "What metadata is removed?",
        answer: "The Canvas re-encode removes all EXIF data (camera make/model, lens, exposure settings), GPS location data, IPTC metadata (copyright, keywords), XMP metadata (Adobe / Lightroom tags) and the ICC colour profile. The output is a clean image with only the pixel data — no hidden metadata of any kind."
      },
      {
        question: "Does removing EXIF affect image quality?",
        answer: "Minimal. The Canvas re-encode uses high-quality JPEG settings, so the visual difference is imperceptible for most photos. The pixel dimensions are preserved exactly. The file size may actually decrease because the metadata block (which can be 10-50KB on phone photos) is removed."
      }
    ],
    relatedSlugs: ["remove-background", "white-background", "compress-50kb", "jpg-to-png", "heic-to-jpg"]
  },
  {
    slug: "photo-rotate",
    name: "Rotate Photo",
    category: "Edit",
    icon: "🔄",
    description: "Rotate photo 90, 180 or 270 degrees clockwise — on device",
    requirements: { rotate: 90 },
    metaTitle: "Rotate Photo Online Free — 90, 180, 270 Degrees | PasteDocs",
    metaDescription: "Rotate JPG/PNG photo 90, 180 or 270 degrees clockwise online free. Fix sideways phone photos, scanned documents. 100% browser-based, no upload. Free photo rotator.",
    keywords: ["rotate photo online free", "rotate image 90 degrees", "rotate jpg online", "rotate photo clockwise", "fix sideways photo", "rotate scanned document", "photo rotator no upload"],
    h1: "Rotate Photo Online — 90, 180, 270° Free & 100% Private",
    intro: "Rotate any JPG, PNG or HEIC photo by 90, 180 or 270 degrees clockwise — entirely in your browser, no upload, no signup, no watermark. PasteDocs uses the HTML5 Canvas API to apply the rotation in local memory and export a clean, correctly-oriented JPEG. This is the standard tool for fixing sideways phone photos (often caused by EXIF orientation tags that some portals ignore), correcting the orientation of scanned documents, and preparing landscape photos for portrait-only form uploads.",
    specs: [
      { label: "Input formats", value: "JPG, JPEG, PNG, HEIC, WEBP" },
      { label: "Output format", value: "JPEG (.jpg) — correctly oriented" },
      { label: "Rotation", value: "90°, 180° or 270° clockwise" },
      { label: "Processing", value: "Local Canvas API processing" },
      { label: "Cost", value: "Free, no account, no catch" }
    ],
    useCases: [
      "Fix sideways phone photos that uploaded rotated",
      "Correct scanned documents that came out upside down",
      "Rotate a landscape photo to portrait for a portrait-only form",
      "Fix EXIF-orientation issues that some portals ignore",
      "Prepare ID / passport photos taken in the wrong orientation"
    ],
    faqs: [
      {
        question: "Why did my phone photo upload sideways?",
        answer: "Most modern phones store the photo right-side-up in the image data and add an EXIF 'orientation' tag that tells the viewer software to rotate it on display. Some websites and portals ignore the EXIF tag, so the photo appears sideways or upside down. PasteDocs rotates the actual pixel data so the orientation is correct regardless of EXIF — and the EXIF remover tool can strip the tag entirely."
      },
      {
        question: "Can I rotate a photo 180 degrees?",
        answer: "Yes. PasteDocs supports 90°, 180° and 270° clockwise rotation. For a 180° rotation (upside-down fix), the canvas dimensions stay the same and the image is rotated in place. For 90° and 270°, the canvas width and height are swapped so the rotated image fits exactly."
      },
      {
        question: "Is my file sent to any external server?",
        answer: "No. PasteDocs applies the rotation entirely in your browser using the Canvas API. The photo is read into local memory, drawn onto a rotated canvas, and exported as a new JPEG. No file is ever transmitted to any server."
      },
      {
        question: "Does rotation affect image quality?",
        answer: "Minimal. The Canvas re-encode uses high-quality JPEG settings. The only visible quality change comes from JPEG re-compression (imperceptible at high quality). Pixel dimensions are preserved (with width/height swapped for 90°/270° rotation). For lossless rotation of JPEGs, a dedicated lossless-JPEG-rotation tool would be needed — PasteDocs uses the universal Canvas approach for format compatibility."
      }
    ],
    relatedSlugs: ["exif-remover", "jpg-to-png", "png-to-jpg", "white-background", "compress-50kb"]
  },
  {
    slug: "webp-to-jpg",
    name: "WebP to JPG",
    category: "Convert",
    icon: "🌐",
    description: "Convert WebP images to JPG format locally",
    requirements: { format: "jpeg" },
    metaTitle: "WebP to JPG Converter Online Free — No Upload | PasteDocs",
    metaDescription: "Convert WebP images to JPG/JPEG format online free. 100% browser-based, no upload, no signup. Free WebP to JPG converter for portals that reject WebP format.",
    keywords: ["webp to jpg converter online free", "convert webp to jpg", "webp to jpeg free", "webp to jpg no upload", "change webp to jpg online", "webp image to jpg converter"],
    h1: "WebP to JPG Converter — Free, 100% Private, No Upload",
    intro: "Convert WebP images to JPG/JPEG format entirely in your browser — no upload, no signup, no watermark. WebP is a modern image format used by many websites (including Google-owned properties) to save bandwidth, but most Indian government portals, exam forms, and several legacy systems reject WebP uploads and require JPEG. PasteDocs uses the native Canvas API to re-encode each WebP as a clean JPEG locally, optionally flattening transparency to white and compressing under your KB target.",
    specs: [
      { label: "Input format", value: "WebP (.webp)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Transparency", value: "Flattened to white background" },
      { label: "Processing", value: "100% in-browser Canvas API" },
      { label: "Cost", value: "Free, no signup, clean output" }
    ],
    useCases: [
      "Convert WebP photos saved from websites for government portal upload",
      "Convert WebP screenshots for portals that reject the format",
      "Convert WebP images for email compatibility (older clients)",
      "Convert WebP for use in Word / Excel documents (limited WebP support)",
      "Batch convert a folder of WebP images to JPG"
    ],
    faqs: [
      {
        question: "Why do I need to convert WebP to JPG?",
        answer: "WebP is a modern image format used by many websites (including Google Images and news sites) because it produces smaller files. However, most Indian government portals, exam application forms, and several legacy systems only accept JPG/JPEG uploads and reject WebP. Converting to JPG before uploading avoids the 'invalid file format' error."
      },
      {
        question: "Do you store my photo anywhere?",
        answer: "No. PasteDocs uses the native Canvas API to decode the WebP and re-encode it as JPEG entirely in your browser. Your image stays on your device throughout — no upload, no caching, no third-party script."
      },
      {
        question: "Can I convert multiple WebP images at once?",
        answer: "Yes. Upload all the WebP files, paste the requirement (e.g. 'all webp to jpg, max 100kb'), and PasteDocs converts them in parallel. The output is a single ZIP download containing all the JPGs, already compressed to your KB cap if you specified one."
      },
      {
        question: "What happens to transparent WebP images?",
        answer: "JPEG does not support transparency. PasteDocs flattens any transparent area to a plain white background (the default for Indian government forms). If you need a different background colour, mention it in the requirements box (e.g. 'webp to jpg, light grey background')."
      }
    ],
    relatedSlugs: ["jpg-to-png", "png-to-jpg", "heic-to-jpg", "compress-50kb", "passport-size"]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADDITIONAL COMPRESS KB TARGETS — each is a separate low-KD Google query.
  // The processing engine already supports any byte target; these are dedicated
  // landing pages for each common KB limit searched by Indian users.
  // ═══════════════════════════════════════════════════════════════════════════

  {
    slug: "compress-5kb",
    name: "Compress to 5KB",
    category: "Compress",
    icon: "📦",
    description: "Compress any photo to exactly 5KB for tiny thumbnails and icons",
    requirements: { maxSizeBytes: 5120, format: "jpeg" },
    metaTitle: "Compress Photo to 5KB Online Free — Tiny Thumbnails | PasteDocs",
    metaDescription: "Compress JPG/PNG photo to exactly 5KB online free for tiny thumbnails, icons and favicon-size images. 100% browser-based, no upload. Free 5KB image compressor.",
    keywords: ["compress photo to 5kb", "5kb image compressor online", "photo size 5kb", "reduce image to 5kb", "compress jpg to 5kb free", "tiny thumbnail compressor"],
    h1: "Compress Photo to 5KB Online — Free & 100% Private",
    intro: "Need an extremely small image under 5KB? This 5KB compressor targets the tightest byte ceiling used by favicons, tiny icons, and some legacy government form fields with micro-photo uploads. The iterative JPEG engine downscales to ~200px and lowers quality until the file lands at or under 5,120 bytes — the subject remains barely recognisable but the byte target is met exactly. Runs entirely in your browser, no upload.",
    specs: [
      { label: "Target size", value: "Max 5 KB (5,120 bytes)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Max dimension", value: "~200 px (heavily downscaled)" },
      { label: "Processing", value: "Canvas API, runs on your device" },
      { label: "Cost", value: "Free forever, no account needed" }
    ],
    useCases: [
      "Favicon-size images for websites",
      "Tiny icons for legacy portals",
      "Micro-photo uploads for niche government fields",
      "Ultra-compact email signature images",
      "Placeholder thumbnails for directory listings"
    ],
    faqs: [
      { question: "How do I compress a photo to exactly 5KB?", answer: "Upload your image, and the iterative engine downscales to ~200px and lowers JPEG quality until the file is at or below 5,120 bytes. The output is extremely small — suitable for favicons and tiny icons, not for face photos." },
      { question: "Will a 5KB photo look good?", answer: "At 5KB the image will be visibly low quality — this is the extreme end of compression. The subject is barely recognisable. Use this only for favicons, tiny icons, and placeholder thumbnails, not for portraits or document photos." },
      { question: "Does PasteDocs keep a copy of my photo?", answer: "Nope. Everything runs locally on your device; no file gets sent over the network. Your photo is processed in local memory and never transmitted to any server." },
      { question: "Can I compress multiple photos to 5KB at once?", answer: "Yes. Upload all images, paste 'all max 5kb', and PasteDocs processes them in parallel. You get a ZIP download." }
    ],
    relatedSlugs: ["compress-10kb", "compress-20kb", "compress-15kb", "stamp-size", "custom-resize"]
  },
  {
    slug: "compress-15kb",
    name: "Compress to 15KB",
    category: "Compress",
    icon: "📦",
    description: "Compress any photo to exactly 15KB for OJAS and strict form caps",
    requirements: { maxSizeBytes: 15360, format: "jpeg" },
    metaTitle: "Compress Photo to 15KB Online Free — OJAS & Exam Forms | PasteDocs",
    metaDescription: "Compress JPG/PNG photo to exactly 15KB online for OJAS Gujarat, strict exam signature caps and tiny photo uploads. 100% browser-based, no upload. Free 15KB compressor.",
    keywords: ["compress photo to 15kb", "15kb image compressor online", "photo size 15kb", "reduce image to 15kb", "compress jpg to 15kb free", "ojas photo 15kb compressor"],
    h1: "Compress Photo to 15KB Online — Free & 100% Private",
    intro: "The 15KB cap is used by OJAS Gujarat recruitments (GPSC, GPSSSB photo uploads) and several niche government form fields that enforce an ultra-strict size limit. This 15KB compressor runs entirely in your browser and uses the iterative JPEG engine to land your file just under 15,360 bytes while keeping the face or signature as sharp as possible at the small size. Nothing is uploaded. No account, no watermark — just a clean download.",
    specs: [
      { label: "Target size", value: "Max 15 KB (15,360 bytes)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Max dimension", value: "~500 px (auto-downscaled)" },
      { label: "Processing", value: "Client-side Canvas API (no upload)" },
      { label: "Cost", value: "Free, no watermark, no account" }
    ],
    useCases: [
      "OJAS Gujarat photo upload (15KB cap)",
      "GPSC / GPSSSB photo and signature",
      "Niche government form fields with 15KB limit",
      "Small ID-card photos for staff directories",
      "Tiny profile pictures for legacy systems"
    ],
    faqs: [
      { question: "How do I compress a photo to exactly 15KB for OJAS?", answer: "Upload your photo, and the iterative engine lowers JPEG quality in small steps until the file is at or below 15,360 bytes. The engine also downscales large source images to ~500px max, keeping the face recognisable at the tight size." },
      { question: "What is the OJAS photo size limit?", answer: "OJAS Gujarat typically requires photos under 15KB for GPSC, GPSSSB and GSSSB recruitments. The standard dimensions are 150×200 pixels. Use this tool after resizing to the correct dimensions." },
      { question: "Can anyone access my uploaded photo?", answer: "Not at all. Your file is read into browser memory, processed, and offered back as a download. Your photo is processed in local memory and never transmitted to any server." },
      { question: "Can I compress my signature to 15KB?", answer: "Yes. The 15KB target works for both photos and signatures. For signatures, the iterative engine preserves stroke edges well at this size." }
    ],
    relatedSlugs: ["compress-10kb", "compress-20kb", "compress-25kb", "signature-resize", "stamp-size"]
  },
  {
    slug: "compress-25kb",
    name: "Compress to 25KB",
    category: "Compress",
    icon: "📦",
    description: "Compress any photo to exactly 25KB for SSC and strict signature caps",
    requirements: { maxSizeBytes: 25600, format: "jpeg" },
    metaTitle: "Compress Photo to 25KB Online Free — SSC & Exam Signatures | PasteDocs",
    metaDescription: "Compress JPG/PNG photo or signature to exactly 25KB online for SSC, IBPS and exam signature uploads. 100% browser-based, no upload. Free 25KB image compressor.",
    keywords: ["compress photo to 25kb", "25kb image compressor online", "photo size 25kb", "reduce image to 25kb", "compress jpg to 25kb free", "ssc signature 25kb"],
    h1: "Compress Photo to 25KB Online — Free & 100% Private",
    intro: "The 25KB cap sits between the SSC strict limit (20KB) and the NEET signature upper bound (30KB), making it a safe target for multiple exam forms. This 25KB compressor runs entirely in your browser and uses the iterative JPEG engine to land your file just under 25,600 bytes while preserving facial detail for photos and stroke sharpness for signatures. All processing is local. No server, no signup, no watermark.",
    specs: [
      { label: "Target size", value: "Max 25 KB (25,600 bytes)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Max dimension", value: "~550 px (auto-downscaled)" },
      { label: "Processing", value: "On-device Canvas API" },
      { label: "Cost", value: "Free — no signup, no branding" }
    ],
    useCases: [
      "SSC CGL / CHSL signature upload (under 25KB safe target)",
      "IBPS PO / Clerk signature upload",
      "State PSC signature uploads",
      "Small portrait photos for forms with 25KB cap",
      "Signature compression for multiple exam forms"
    ],
    faqs: [
      { question: "How do I compress a photo to exactly 25KB?", answer: "Upload your image, and the iterative engine lowers JPEG quality until the file is at or below 25,600 bytes. The engine downscales large sources to ~550px max, preserving the subject at the small size." },
      { question: "Is 25KB enough for SSC signature?", answer: "SSC requires signatures between 1KB and 20KB. 25KB exceeds the SSC cap — use the Compress to 20KB tool for SSC specifically. This 25KB tool is for forms that allow up to 25KB or as a safe buffer." },
      { question: "Is my photo safe with PasteDocs?", answer: "Not at all. Your file is read into browser memory, processed, and offered back as a download. Your photo is processed in local memory and never transmitted to any server." },
      { question: "Can I compress multiple photos to 25KB at once?", answer: "Yes. Upload all images, paste 'all max 25kb', and PasteDocs processes them in parallel. You get a ZIP download." }
    ],
    relatedSlugs: ["compress-20kb", "compress-30kb", "compress-50kb", "signature-resize", "compress-15kb"]
  },
  {
    slug: "compress-40kb",
    name: "Compress to 40KB",
    category: "Compress",
    icon: "📦",
    description: "Compress any photo to exactly 40KB for exam photos and form uploads",
    requirements: { maxSizeBytes: 40960, format: "jpeg" },
    metaTitle: "Compress Photo to 40KB Online Free — Exam Photos | PasteDocs",
    metaDescription: "Compress JPG/PNG photo to exactly 40KB online for exam photo uploads and government forms. 100% browser-based, no upload. Free 40KB image compressor with sharp output.",
    keywords: ["compress photo to 40kb", "40kb image compressor online", "photo size 40kb", "reduce image to 40kb", "compress jpg to 40kb free", "exam photo 40kb"],
    h1: "Compress Photo to 40KB Online — Free & 100% Private",
    intro: "The 40KB target is a safe buffer for exam forms that cap photos at 50KB — it guarantees acceptance with a 10KB safety margin. This 40KB compressor runs entirely in your browser and uses the iterative JPEG engine to land your file just under 40,960 bytes while keeping the face sharp. Your file stays private. No upload, no account, no watermark.",
    specs: [
      { label: "Target size", value: "Max 40 KB (40,960 bytes)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Max dimension", value: "~700 px (auto-downscaled)" },
      { label: "Processing", value: "Browser Canvas API, local only" },
      { label: "Cost", value: "Free, no account, clean download" }
    ],
    useCases: [
      "Exam photo uploads with 50KB cap (40KB safety buffer)",
      "UPSC / SSC / IBPS photo uploads",
      "State PSC photo uploads",
      "Scholarship form photo uploads",
      "Small ID-card photos"
    ],
    faqs: [
      { question: "How do I compress a photo to exactly 40KB?", answer: "Upload your image, and the iterative engine lowers JPEG quality until the file is at or below 40,960 bytes. The face stays sharp at this size — 40KB is enough for clear passport-size photos." },
      { question: "Why compress to 40KB instead of 50KB?", answer: "Some exam portals have inconsistent enforcement — a 49KB file may be rejected as 'over 50KB' due to server-side rounding. Compressing to 40KB gives a 10KB safety margin that guarantees acceptance." },
      { question: "Do you upload my file to process it?", answer: "No. The tool works entirely on your machine — no server upload, no storage. Your photo is processed in local memory and never transmitted to any server." },
      { question: "Will a 40KB photo look good?", answer: "Yes. At 200×230 pixels (passport size), 40KB preserves facial detail clearly. The iterative engine maximises quality within the byte budget." }
    ],
    relatedSlugs: ["compress-50kb", "compress-30kb", "compress-60kb", "passport-size", "signature-resize"]
  },
  {
    slug: "compress-60kb",
    name: "Compress to 60KB",
    category: "Compress",
    icon: "📦",
    description: "Compress any photo to exactly 60KB for forms with 60-80KB caps",
    requirements: { maxSizeBytes: 61440, format: "jpeg" },
    metaTitle: "Compress Photo to 60KB Online Free — Government Forms | PasteDocs",
    metaDescription: "Compress JPG/PNG photo to exactly 60KB online for government forms and portal uploads. 100% browser-based, no upload. Free 60KB image compressor with high quality.",
    keywords: ["compress photo to 60kb", "60kb image compressor online", "photo size 60kb", "reduce image to 60kb", "compress jpg to 60kb free", "government form photo 60kb"],
    h1: "Compress Photo to 60KB Online — Free & 100% Private",
    intro: "The 60KB target covers forms with a 60-80KB photo cap — some state government portals, scholarship applications, and university admission forms. This 60KB compressor runs entirely in your browser and preserves high facial detail while landing just under 61,440 bytes. Runs 100% locally — no signup wall, no server upload, no watermark.",
    specs: [
      { label: "Target size", value: "Max 60 KB (61,440 bytes)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Max dimension", value: "~900 px (auto-downscaled)" },
      { label: "Processing", value: "Runs in your browser (Canvas API)" },
      { label: "Cost", value: "Free to use, no signup required" }
    ],
    useCases: [
      "State government portal photo uploads (60-80KB cap)",
      "Scholarship application photos",
      "University admission form photos",
      "School / college ID card photos",
      "Corporate ID card photos"
    ],
    faqs: [
      { question: "How do I compress a photo to exactly 60KB?", answer: "Upload your image, and the iterative engine lowers JPEG quality until the file is at or below 61,440 bytes. At 60KB the quality stays high — facial detail is clearly preserved." },
      { question: "Where is my photo processed — on your server or my device?", answer: "Never. Your photo stays on your device throughout the entire process. Your photo is processed in local memory and never transmitted to any server." },
      { question: "Can I compress multiple photos to 60KB at once?", answer: "Yes. Upload all photos, paste 'all max 60kb', and PasteDocs processes them in parallel. You get a ZIP download." },
      { question: "Will a 60KB photo look good?", answer: "Yes. At 60KB the JPEG quality is high — the photo looks nearly identical to the original at passport dimensions. This is a comfortable quality level for any form upload." }
    ],
    relatedSlugs: ["compress-50kb", "compress-70kb", "compress-80kb", "passport-size", "compress-100kb"]
  },
  {
    slug: "compress-70kb",
    name: "Compress to 70KB",
    category: "Compress",
    icon: "📦",
    description: "Compress any photo to exactly 70KB for forms with 70-100KB caps",
    requirements: { maxSizeBytes: 71680, format: "jpeg" },
    metaTitle: "Compress Photo to 70KB Online Free — High Quality | PasteDocs",
    metaDescription: "Compress JPG/PNG photo to exactly 70KB online for government forms and portal uploads. 100% browser-based, no upload. Free 70KB image compressor with high quality output.",
    keywords: ["compress photo to 70kb", "70kb image compressor online", "photo size 70kb", "reduce image to 70kb", "compress jpg to 70kb free", "form photo 70kb"],
    h1: "Compress Photo to 70KB Online — Free & 100% Private",
    intro: "The 70KB target covers forms with a 70-100KB photo cap — several state government portals and educational institution forms. This 70KB compressor runs entirely in your browser and preserves near-original facial detail while landing just under 71,680 bytes. No data leaves your browser. No account, no watermark on the result.",
    specs: [
      { label: "Target size", value: "Max 70 KB (71,680 bytes)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Max dimension", value: "~1000 px (auto-downscaled)" },
      { label: "Processing", value: "Browser-only Canvas API, no server" },
      { label: "Cost", value: "Free, no watermark on output" }
    ],
    useCases: [
      "State government portal photo uploads (70-100KB cap)",
      "Educational institution form photos",
      "Corporate ID card photos",
      "Library card / staff ID photos",
      "Health insurance form photos"
    ],
    faqs: [
      { question: "How do I compress a photo to exactly 70KB?", answer: "Upload your image, and the iterative engine lowers JPEG quality until the file is at or below 71,680 bytes. At 70KB the quality is high — facial detail is clearly preserved." },
      { question: "Do you store my photo anywhere?", answer: "No, nothing leaves your browser. The Canvas API does all the work locally. Your photo is processed in local memory and never transmitted to any server." },
      { question: "Will a 70KB photo look good?", answer: "Yes. At 70KB the JPEG quality is high — the photo looks nearly identical to the original at passport dimensions. Visual loss is imperceptible." },
      { question: "Can I compress multiple photos to 70KB at once?", answer: "Yes. Upload all photos, paste 'all max 70kb', and PasteDocs processes them in parallel. You get a ZIP download." }
    ],
    relatedSlugs: ["compress-60kb", "compress-80kb", "compress-50kb", "compress-100kb", "passport-size"]
  },
  {
    slug: "compress-80kb",
    name: "Compress to 80KB",
    category: "Compress",
    icon: "📦",
    description: "Compress any photo to exactly 80KB for forms with 80-100KB caps",
    requirements: { maxSizeBytes: 81920, format: "jpeg" },
    metaTitle: "Compress Photo to 80KB Online Free — Government Forms | PasteDocs",
    metaDescription: "Compress JPG/PNG photo to exactly 80KB online for government forms and portal uploads. 100% browser-based, no upload. Free 80KB image compressor with high quality.",
    keywords: ["compress photo to 80kb", "80kb image compressor online", "photo size 80kb", "reduce image to 80kb", "compress jpg to 80kb free", "form photo 80kb"],
    h1: "Compress Photo to 80KB Online — Free & 100% Private",
    intro: "The 80KB target covers forms with an 80-100KB photo cap — several state government portals and institutional forms. This 80KB compressor runs entirely in your browser and preserves near-original facial detail while landing just under 81,920 bytes. The tool works entirely on your device. No signup, no upload, no branding.",
    specs: [
      { label: "Target size", value: "Max 80 KB (81,920 bytes)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Max dimension", value: "~1100 px (auto-downscaled)" },
      { label: "Processing", value: "Local Canvas API processing" },
      { label: "Cost", value: "Free, no account, no catch" }
    ],
    useCases: [
      "State government portal photo uploads (80-100KB cap)",
      "Institutional form photos",
      "Corporate / staff ID card photos",
      "Health insurance / PF form photos",
      "School admission photos"
    ],
    faqs: [
      { question: "How do I compress a photo to exactly 80KB?", answer: "Upload your image, and the iterative engine lowers JPEG quality until the file is at or below 81,920 bytes. At 80KB the quality is high — facial detail is clearly preserved." },
      { question: "Where does my photo go when I upload it here?", answer: "No server involved. Your file is processed in your browser's memory and that's it. Your photo is processed in local memory and never transmitted to any server." },
      { question: "Will an 80KB photo look good?", answer: "Yes. At 80KB the JPEG quality is high — the photo looks nearly identical to the original at passport dimensions. Visual loss is imperceptible for most photos." },
      { question: "Can I compress multiple photos to 80KB at once?", answer: "Yes. Upload all photos, paste 'all max 80kb', and PasteDocs processes them in parallel. You get a ZIP download." }
    ],
    relatedSlugs: ["compress-70kb", "compress-90kb", "compress-100kb", "passport-size", "compress-60kb"]
  },
  {
    slug: "compress-90kb",
    name: "Compress to 90KB",
    category: "Compress",
    icon: "📦",
    description: "Compress any photo to exactly 90KB for forms with 90-100KB caps",
    requirements: { maxSizeBytes: 92160, format: "jpeg" },
    metaTitle: "Compress Photo to 90KB Online Free — High Quality | PasteDocs",
    metaDescription: "Compress JPG/PNG photo to exactly 90KB online for government forms and portal uploads. 100% browser-based, no upload. Free 90KB image compressor with high quality output.",
    keywords: ["compress photo to 90kb", "90kb image compressor online", "photo size 90kb", "reduce image to 90kb", "compress jpg to 90kb free", "form photo 90kb"],
    h1: "Compress Photo to 90KB Online — Free & 100% Private",
    intro: "The 90KB target is a safe buffer for forms with a 100KB photo cap — it guarantees acceptance with a 10KB safety margin. This 90KB compressor runs entirely in your browser and preserves near-original facial detail while landing just under 92,160 bytes. Just upload, process, and download. No account, no server, no watermark.",
    specs: [
      { label: "Target size", value: "Max 90 KB (92,160 bytes)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Max dimension", value: "~1150 px (auto-downscaled)" },
      { label: "Processing", value: "100% in-browser Canvas API" },
      { label: "Cost", value: "Free, no signup, clean output" }
    ],
    useCases: [
      "Forms with 100KB cap (90KB safety buffer)",
      "State government portal photo uploads",
      "Institutional form photos",
      "Corporate ID card photos",
      "Health insurance form photos"
    ],
    faqs: [
      { question: "How do I compress a photo to exactly 90KB?", answer: "Upload your image, and the iterative engine lowers JPEG quality until the file is at or below 92,160 bytes. At 90KB the quality is high — facial detail is clearly preserved." },
      { question: "Why compress to 90KB instead of 100KB?", answer: "Some portals have inconsistent enforcement — a 99KB file may be rejected as 'over 100KB' due to server-side rounding. Compressing to 90KB gives a 10KB safety margin." },
      { question: "Is my file sent to any external server?", answer: "No — there's no server-side processing. Your photo goes nowhere. Your photo is processed in local memory and never transmitted to any server." },
      { question: "Will a 90KB photo look good?", answer: "Yes. At 90KB the JPEG quality is high — the photo looks nearly identical to the original. Visual loss is imperceptible." }
    ],
    relatedSlugs: ["compress-80kb", "compress-100kb", "compress-70kb", "passport-size", "compress-50kb"]
  },
  {
    slug: "compress-150kb",
    name: "Compress to 150KB",
    category: "Compress",
    icon: "📦",
    description: "Compress any photo or document scan to exactly 150KB",
    requirements: { maxSizeBytes: 153600, format: "jpeg" },
    metaTitle: "Compress Photo to 150KB Online Free — Documents & Scans | PasteDocs",
    metaDescription: "Compress JPG/PNG photo or scanned document to exactly 150KB online for government portals and document uploads. 100% browser-based, no upload. Free 150KB compressor.",
    keywords: ["compress photo to 150kb", "150kb image compressor online", "photo size 150kb", "reduce image to 150kb", "compress jpg to 150kb free", "document scan 150kb"],
    h1: "Compress Photo to 150KB Online — Free & 100% Private",
    intro: "The 150KB cap is used by several Indian government portals for document scans and photo uploads — CBSE Pariksha Sangam (150KB cap), some state scholarship portals, and institutional form uploads. This 150KB compressor runs entirely in your browser and keeps scanned text legible while landing just under 153,600 bytes. Your input never touches a server. No signup, no watermark on output.",
    specs: [
      { label: "Target size", value: "Max 150 KB (153,600 bytes)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Max dimension", value: "~1400 px (preserves detail)" },
      { label: "Processing", value: "Canvas API, runs on your device" },
      { label: "Cost", value: "Free forever, no account needed" }
    ],
    useCases: [
      "CBSE Pariksha Sangam document upload (150KB cap)",
      "State scholarship portal document scans",
      "Institutional form document uploads",
      "Marksheet and certificate scans",
      "Photo uploads for forms with 150KB cap"
    ],
    faqs: [
      { question: "How do I compress a document scan to exactly 150KB?", answer: "Upload your scanned JPG or PNG, and the iterative engine lowers JPEG quality until the file is at or below 153,600 bytes. Scanned text remains legible at 150KB — the quality is high enough for OCR and human review." },
      { question: "Where does my photo go when I upload it here?", answer: "No — PasteDocs processes everything in your browser using the Canvas API. Your document is processed in local memory and never transmitted to any server — safe for Aadhaar, PAN and other sensitive documents." },
      { question: "Can I compress a PDF to 150KB?", answer: "This page compresses images to 150KB. For PDF compression use the Compress PDF tool. For scanned PDFs, split to images (PDF to JPG), compress each to 150KB here, then merge to PDF." },
      { question: "Will 150KB compression affect document readability?", answer: "No. At 150KB the JPEG quality is high — scanned text, signatures and stamp marks remain clearly legible. PasteDocs iterates quality only as much as needed to hit the target." }
    ],
    relatedSlugs: ["compress-100kb", "compress-200kb", "compress-500kb", "pdf-compress", "image-to-pdf"]
  },
  {
    slug: "compress-250kb",
    name: "Compress to 250KB",
    category: "Compress",
    icon: "📦",
    description: "Compress any photo or document scan to exactly 250KB",
    requirements: { maxSizeBytes: 256000, format: "jpeg" },
    metaTitle: "Compress Photo to 250KB Online Free — Documents & Scans | PasteDocs",
    metaDescription: "Compress JPG/PNG photo or scanned document to exactly 250KB online for government portals and document uploads. 100% browser-based, no upload. Free 250KB compressor.",
    keywords: ["compress photo to 250kb", "250kb image compressor online", "photo size 250kb", "reduce image to 250kb", "compress jpg to 250kb free", "document scan 250kb"],
    h1: "Compress Photo to 250KB Online — Free & 100% Private",
    intro: "The 250KB cap is used by several Indian government portals for document scans and higher-quality photo uploads. This 250KB compressor runs entirely in your browser and preserves near-original quality while landing just under 256,000 bytes. Ideal for document scans that must retain text legibility for OCR. Local-only processing. No account needed, no upload, no watermark.",
    specs: [
      { label: "Target size", value: "Max 250 KB (256,000 bytes)" },
      { label: "Output format", value: "JPEG (.jpg)" },
      { label: "Max dimension", value: "~1700 px (preserves detail)" },
      { label: "Processing", value: "Client-side Canvas API (no upload)" },
      { label: "Cost", value: "Free, no watermark, no account" }
    ],
    useCases: [
      "Government portal document scans (250KB cap)",
      "High-quality marksheet and certificate scans",
      "Visa supporting document uploads",
      "Court e-filing document scans",
      "College admission document scans"
    ],
    faqs: [
      { question: "How do I compress a document scan to exactly 250KB?", answer: "Upload your scanned JPG or PNG, and the iterative engine lowers JPEG quality until the file is at or below 256,000 bytes. Scanned text remains fully legible at 250KB — the quality is high enough for OCR and government portal review." },
      { question: "Is my file sent to any external server?", answer: "Nope. Everything runs locally on your device; no file gets sent over the network. Your document is processed in local memory and never transmitted to any server — safe for Aadhaar, PAN, marksheets and other sensitive documents." },
      { question: "Can I compress a PDF to 250KB?", answer: "This page compresses images to 250KB. For PDF compression use the Compress PDF tool. For scanned PDFs, split to images (PDF to JPG), compress each to 250KB here, then merge to PDF." },
      { question: "Will 250KB compression affect document readability?", answer: "No. At 250KB the JPEG quality is high — scanned text, signatures and stamp marks remain fully legible. This is a comfortable quality level for any document upload." }
    ],
    relatedSlugs: ["compress-200kb", "compress-300kb", "compress-500kb", "pdf-compress", "image-to-pdf"]
  }
];

// Convenience: find a tool by slug (used by ToolTemplate and sitemap generator)
export const findToolBySlug = (slug: string): Tool | undefined =>
  ALL_TOOLS.find(t => t.slug === slug);
