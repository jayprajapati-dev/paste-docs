export interface ToolData {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  requirements: string;
  content: string;
  faq: { question: string; answer: string }[];
  relatedPages: { name: string; url: string }[];
}

export const toolsData: ToolData[] = [
  {
    slug: "compress-photo-50kb",
    name: "Compress Photo to 50KB",
    metaTitle: "Compress Photo to 50KB Online Free | Reduce JPEG to 50KB",
    metaDescription: "Instantly compress image & photo to 50KB without losing quality. 100% free, private Client-Side tool for safe online form uploads.",
    h1: "Compress Any Photo to 50KB in 10 Seconds — Free",
    requirements: "Photo: JPG, max 50KB",
    content: "When applying for jobs, creating profiles out online or filling government forms, you are often asked to upload a profile photo under 50KB. Phone cameras often produce 5MB files. Our tool shrinks your file size to exactly under 50KB while retaining maximum visual clarity. Since no data leaves your mobile device, it remains completely private.",
    faq: [
      {
        question: "How do I reduce image to exactly 50KB?",
        answer: "Upload your image, the system has a pre-filled 50KB limit. It automatically balances quality compression algorithms to give you a file under 50KB."
      },
      {
        question: "Which formats are supported?",
        answer: "You can upload JPG, PNG, WEBP, or HEIC. The tool will automatically output a clean JPG image."
      },
      {
        question: "Will my image remain clear?",
        answer: "Yes. Given small display sizes for forms, 50KB is more than enough data to show a crisp human face if compressed intelligently."
      },
      {
        question: "Are there any watermarks?",
        answer: "No. The tool is absolutely free and leaves zero watermarks."
      },
      {
        question: "Is internet required?",
        answer: "After the website loads once, the actual compression algorithm operates offline directly in your browser."
      }
    ],
    relatedPages: [
      { name: "Compress Photo to 20KB", url: "/tool/compress-photo-20kb" },
      { name: "SSC CGL Photo Resize", url: "/exam/ssc-cgl" }
    ]
  },
  {
    slug: "compress-photo-20kb",
    name: "Compress Photo to 20KB",
    metaTitle: "Compress Photo to 20KB exactly (Free & Offline) | PasteDocs",
    metaDescription: "Reduce image file size to 20KB. Safe, private, watermark-free tool configured specifically for signature sizes & ID photos.",
    h1: "Reduce Photo Size to 20KB Fast & Securely",
    requirements: "Photo: JPG, max 20KB",
    content: "Shrinking images to 20KB is one of the hardest things to do manually without the photo turning into a pixelated mess. Our tool handles aggressive compression through smart local algorithms designed specifically for passport photos and signatures. 20KB is the upper limit for many signatures across Indian Government portals (like IBPS, SBI, SCC).",
    faq: [
      {
        question: "How can I guarantee the size is under 20KB?",
        answer: "PasteDocs acts as a compiler; simply click process and we dynamically test output quality until the byte footprint goes below 20KB."
      },
      {
        question: "Why do signatures look blurry under 20KB?",
        answer: "If you snap a photo with lots of background elements, the 20KB limit gets wasted on the background. Crop tightly around the signature."
      },
      {
        question: "Can I use this for photos?",
        answer: "Yes, though 20KB for a full color photograph will sacrifice some quality compared to signatures."
      },
      {
        question: "Does it convert PNG to JPG?",
        answer: "Yes. All output will be safely encoded in standard baseline JPEG formats."
      },
      {
        question: "Where is my data stored afterwards?",
        answer: "Nowhere. Your browser executes the script right inside the tab. When you close the tab, everything ceases to exist."
      }
    ],
    relatedPages: [
      { name: "Signature Resize", url: "/tool/signature-resize" },
      { name: "Compress Photo to 50KB", url: "/tool/compress-photo-50kb" }
    ]
  },
  {
    slug: "compress-photo-100kb",
    name: "Compress Photo to 100KB",
    metaTitle: "Compress Image to 100KB Online within 5 seconds",
    metaDescription: "Best tool to compress any JPEG/JPG photo up to 100KB size. Fast, works offline, completely free and safe.",
    h1: "Compress Photo to 100KB Instantly — Free",
    requirements: "Photo: JPG, max 100KB",
    content: "Looking to upload ID cards (like Aadhaar, PAN) or passport photographs where the form limits uploads to 100KB? You are in the right spot. This utility will automatically lower the resolution safely and apply JPEG compression to get you under the 100KB threshold in less than 5 seconds without uploading any sensitive ID cards to a random server in the cloud.",
    faq: [
      {
        question: "How fast is the 100KB compression?",
        answer: "Almost instant. Since it is processed entirely on the CPU of your phone or computer, it takes less than 1-2 seconds."
      },
      {
        question: "Is this secure for PAN or Aadhaar Cards?",
        answer: "100% Yes. PasteDocs is 'Client-Side', meaning no file ever travels over the internet to reach us. It's as safe as working in your local gallery."
      },
      {
        question: "What if it's already under 100KB?",
        answer: "We will not bloat it. We simply ensure it meets requirements and output the correctly verified file."
      },
      {
        question: "Can it process PDF?",
        answer: "This page configures for photos (JPG). If you want to compress PDF, check our PDF tool link."
      },
      {
        question: "Is there any cost?",
        answer: "No, this is permanently free."
      }
    ],
    relatedPages: [
      { name: "PDF Compress", url: "/tool/pdf-compress" },
      { name: "Compress Photo to 200KB", url: "/tool/compress-photo-200kb" }
    ]
  },
  {
    slug: "compress-photo-200kb",
    name: "Compress Photo to 200KB",
    metaTitle: "Reduce Photo Size to 200KB Free online",
    metaDescription: "Easily compress large photos to exactly under 200KB for NEET, CUET or general applications. Free browser-based secure tool.",
    h1: "Compress Photo to 200KB Precisely in 10 Seconds",
    requirements: "Photo: JPG, max 200KB",
    content: "The 200KB ceiling is standard for many higher-education portals (NEET, CUET, UGC NET). Dropping an 8MB camera phone image directly to 200KB manually takes lots of trial and error using Photoshop or generic apps. PasteDocs does it for you in one click. Our client-side algorithm respects privacy and executes instantly.",
    faq: [
      {
        question: "Is 200KB good for detailed photographs?",
        answer: "Yes. 200KB is plenty of space for a crisp, high-resolution portrait shot used in portal databases."
      },
      {
        question: "How do I use this?",
        answer: "Simply upload the image in the drop zone above. The 'max 200KB' logic is embedded, hit process and download!"
      },
      {
        question: "Can I crop the image while compressing?",
        answer: "PasteDocs acts as an all-in-one suite. You can define exact pixel requirements if the portal demands it."
      },
      {
        question: "What if the tool says 'Upload Failed'?",
        answer: "Our tool processes locally. It doesn't upload. If your device halts, your phone memory might be full."
      },
      {
        question: "Are uploads to server required?",
        answer: "Never. That is the core philosophy of PasteDocs."
      }
    ],
    relatedPages: [
      { name: "NEET Photo Resize", url: "/exam/neet-ug" },
      { name: "Compress Photo to 100KB", url: "/tool/compress-photo-100kb" }
    ]
  },
  {
    slug: "signature-resize",
    name: "Signature Resize 140x60",
    metaTitle: "Signature Crop & Resize to 140x60 pixels under 20KB",
    metaDescription: "Standard bank and govt exam signature size converter. Force dimensions to 140x60px at low file size safely.",
    h1: "Format Your Signature to 140x60px Instantly",
    requirements: "Signature: JPG, 140x60px, max 30KB",
    content: "Signatures are notorious for causing form rejections. The required dimensions (140 pixels wide by 60 pixels tall) create a strict wide rectangular box. If you upload a square image from your phone, the portal stretches it, distorting the ink and leading to application cancellation. Upload your snapshot here, and we'll proportionally crop and scale it exactly to 140x60px.",
    faq: [
      {
        question: "Why 140x60 pixels?",
        answer: "This is the standard aspect ratio used by IBPS, SBI, and several state recruitments to parse black/blue ink accurately."
      },
      {
        question: "My phone captures large sizes, how to crop?",
        answer: "Hold your phone flat, click a clean picture of the black ink signature on white paper. Upload it here, and the output is perfectly constrained."
      },
      {
        question: "What ink color should I use?",
        answer: "Most banking guidelines specify a BLACK ink pen on plain white unlined paper."
      },
      {
        question: "Will the background be made white?",
        answer: "If you shot on white paper, the high compression logic often blasts out slight grey shadows making it look pure white."
      },
      {
        question: "Is this free?",
        answer: "Yes, fully free and secure client-side."
      }
    ],
    relatedPages: [
      { name: "IBPS PO Formats", url: "/exam/ibps-po" },
      { name: "SBI PO Formats", url: "/exam/sbi-po" }
    ]
  },
  {
    slug: "pdf-compress",
    name: "Compress PDF Online",
    metaTitle: "Compress PDF to 100KB, 200KB Free",
    metaDescription: "Easily compress large PDF documents safely locally in your browser. Perfect for application forms and resume.",
    h1: "Compress PDF Files Easily",
    requirements: "Document: PDF",
    content: "PDFs can be too large for forms. Compress them quickly securely.",
    faq: [{ question: "Is this secure?", answer: "Yes, processed offline." }],
    relatedPages: []
  },
  {
    slug: "image-to-pdf",
    name: "Image to PDF",
    metaTitle: "Convert JPG to PDF Free",
    metaDescription: "Easily convert photos and images to PDF documents safely locally in your browser.",
    h1: "Image to PDF Converter",
    requirements: "Photo: JPG, PNG",
    content: "Easily convert your images to PDFs for government applications.",
    faq: [{ question: "Is this secure?", answer: "Yes." }],
    relatedPages: []
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    metaTitle: "Convert PDF to JPG Free",
    metaDescription: "Convert PDF pages into high quality JPG images offline.",
    h1: "Convert PDF to JPG Fast",
    requirements: "Document: PDF",
    content: "Some portals only accept JPGs. Convert your PDF document into images.",
    faq: [{ question: "Is this secure?", answer: "Yes." }],
    relatedPages: []
  }
];