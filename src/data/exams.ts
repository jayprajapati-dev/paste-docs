export interface ExamData {
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

export const examsData: ExamData[] = [
  {
    slug: "neet-ug",
    name: "NEET UG",
    metaTitle: "Resize NEET Photo & Signature Online Free (Auto Format) | PasteDocs",
    metaDescription: "Free offline exact resizer for NEET UG format: Photo (JPG, 413x531px, 10-200KB, white background) and Signature (10-30KB). Fix photo errors instantly.",
    h1: "Resize Your NEET Photo in 10 Seconds — Free",
    requirements: "Photo: JPG, 413x531px, 10-200KB, white background. Signature: JPG, 800x300px, 10-30KB",
    content: `Applying for the NEET (National Eligibility cum Entrance Test) requires strict adherence to the Document Upload guidelines prescribed by NTA. Any slight deviation in the photo file size, pixel dimensions, or background color can lead to instant rejection or issues during the admit card download phase. 

    The most common reason for NEET application photo failure is the file size being too large, as phone cameras click photos above 3MB, while the NEET portal accepts a maximum of 200KB. Using PasteDocs, you can compress your photo exactly within the 10-200KB range while forcing the 413x531px dimensions requested by the portal.
    
    Similarly, the signature must be strictly between 10KB and 30KB. Because PasteDocs operates entirely on your device, your private identification documents are never uploaded to any external server, ensuring maximum privacy and security.`,
    faq: [
      {
        question: "What is the correct photo size for NEET?",
        answer: "The official NEET requirement for passport size photo is between 10KB and 200KB. The format must be JPG/JPEG and dimensions should ideally be 413x531 pixels with a plain white background."
      },
      {
        question: "How to resize my photo to 200KB for NEET?",
        answer: "Just upload your picture above, and the tool will automatically adjust the quality and resolution to ensure the final JPG is strictly under 200KB."
      },
      {
        question: "What is the signature size for NEET?",
        answer: "Your signature must be scanned on a plain white paper with a black pen, and the file size must be precisely between 10KB to 30KB."
      },
      {
        question: "Can I use my mobile phone to click the photograph?",
        answer: "Yes, you can use your smartphone, provided you stand against a plain white wall and ensure bright, even lighting on your face. Then compress the image here before uploading."
      },
      {
        question: "Why does the NEET portal say 'Invalid Image Dimension'?",
        answer: "The automated system checks the proportions of your image. If you crop it incorrectly or upload a square image instead of the required portrait format (413x531px), it will be rejected."
      }
    ],
    relatedPages: [
      { name: "Compress Photo to 50KB", url: "/tool/compress-photo-50kb" },
      { name: "JEE Main Photo Resize", url: "/exam/jee-main" },
      { name: "UPSC Photo Format", url: "/exam/upsc-cse" },
      { name: "Passport Size Photo Maker", url: "/doc/passport" }
    ]
  },
  {
    slug: "jee-main",
    name: "JEE Main",
    metaTitle: "Resize JEE Main Photo & Signature to Exact Pixels and KB | PasteDocs",
    metaDescription: "Instant JEE Main photo (max 40KB) and signature (max 30KB) resizer. No registration needed, 100% device secure.",
    h1: "Fix Your JEE Main Photo Upload Errors in 10 Seconds",
    requirements: "Photo: JPG, 3.5x4.5cm, max 40KB. Signature: JPG, 3.5x1.5cm, max 30KB",
    content: "When applying for JEE Main, the NTA specifies clear rules. Your photograph needs to be maximum 40KB in JPG format, and your scanned signature must not exceed 30KB. Formatting failures delay applications and cause unnecessary stress for students. This tool instantly resizes, compresses, and crops your files locally on your browser to meet the JEE Main criteria to the exact byte.",
    faq: [
      {
        question: "What is the required photo size for JEE Main?",
        answer: "The JEE Main photo should be in standard passport size (3.5 cm x 4.5 cm) and the file size must be between 10KB and 40KB."
      },
      {
        question: "What is the correct signature size and format?",
        answer: "The signature size should be between 4KB and 30KB (max 30KB), formatted as JPG/JPEG."
      },
      {
        question: "How to fix 'File Size Too Large' on NTA portal?",
        answer: "Simply use the tool above. Select your image, and the system is pre-configured to output a file strictly under the 40KB limit."
      },
      {
        question: "Is it safe to upload my photo here?",
        answer: "Yes! PasteDocs never uploads your photo to any server. Everything is compressed locally on your own device."
      },
      {
        question: "Does the photo need a white background?",
        answer: "Yes, NTA recommends a plain white or very light background without any borders or dark spots."
      }
    ],
    relatedPages: [
      { name: "NEET Photo Resize", url: "/exam/neet-ug" },
      { name: "Compress Photo to 20KB", url: "/tool/compress-photo-20kb" },
      { name: "Signature Resize 140x60", url: "/tool/signature-resize" }
    ]
  },
  {
    slug: "upsc-cse",
    name: "UPSC CSE",
    metaTitle: "UPSC Photo & Signature Resizer Online Free 350x350px",
    metaDescription: "Format your photo and signature for UPSC exactly in 10 seconds. Resize to 350x350 pixels and strictly within 40-300KB limit for immediate accpetance.",
    h1: "UPSC Application: Resize Photo & Sign to 350x350px Instantly",
    requirements: "Photo: JPG, 350x350px, 40-300KB. Signature: JPG, 350x100px, 10-100KB",
    content: "The Union Public Service Commission (UPSC) uses a very strict dimension rule. Most forms will reject your file unless it is exactly 350x350 pixels in size for the photo, and 350x100 pixels for the signature. Doing this manually via generic photo apps often distorts the face. Using our pre-configured UPSC resizer guarantees the exact dimensions and keeps the file size safely between 40KB and 300KB.",
    faq: [
      {
        question: "What is the pixel dimension required for UPSC?",
        answer: "UPSC requires exact pixel dimensions: 350x350 pixels for your photograph."
      },
      {
        question: "What is the file size limit for UPSC documents?",
        answer: "Your passport photo must be between 40KB and 300KB. Signatures must be between 10KB and 100KB."
      },
      {
        question: "My photo is getting distorted. What should I do?",
        answer: "Avoid manually stretching an image to fit 350x350px. Using this tool, the image is proportionally cropped and intelligently scaled to fit those dimensions without stretching."
      },
      {
        question: "What is the exact signature dimension?",
        answer: "Unlike the square photograph, the UPSC signature needs to be 350 pixels wide and 100 pixels in height."
      },
      {
        question: "Can I do this on my phone?",
        answer: "Yes, this tool is fully mobile-responsive and works inside your smartphone browser offline."
      }
    ],
    relatedPages: [
      { name: "SSC CGL Format", url: "/exam/ssc-cgl" },
      { name: "IBPS Photo Prep", url: "/exam/ibps-po" }
    ]
  },
  {
    slug: "ssc-cgl",
    name: "SSC CGL",
    metaTitle: "SSC CGL Photo & Signature Resizer Free (200x230px) | PasteDocs",
    metaDescription: "Quickly resize your photo to 200x230px, under 50KB for SSC CGL. Get your signature formatted perfectly. 100% private.",
    h1: "Format Your Photo for SSC CGL in 10 Seconds — Free",
    requirements: "Photo: JPG, 200x230px, 20-50KB. Signature: JPG, 140x60px, 10-30KB",
    content: "Staff Selection Commission (SSC) applications are notorious for document rejections. The required photo size is extremely strict: 200x230 pixels, ranging strictly between 20KB and 50KB. Submitting pictures outside of this parameter guarantees rejection. The signature mandate indicates 140x60 pixels under 30KB. With PasteDocs, all configurations are automatically applied out of the box when you use this page.",
    faq: [
      {
        question: "What is the photo size for SSC CGL application?",
        answer: "The allowed file size is 20 KB to 50 KB."
      },
      {
        question: "What are the dimensions for SSC CGL photo?",
        answer: "Image dimension must be exactly about 3.5 cm (width) x 4.5 cm (height) or roughly 200x230px."
      },
      {
        question: "How to crop signature for SSC?",
        answer: "Upload your signature image here. The tool will automatically crop it proportional to 140x60 pixels and compress it under 30KB."
      },
      {
        question: "Is there an issue with glasses for SSC photo?",
        answer: "Yes. SSC strictly advises against wearing spectacles with glare or dark glasses in the photograph."
      },
      {
        question: "Can I compress the file without losing clarity?",
        answer: "Yes. Our intelligent client-side compression maintains visual fidelity while dropping the byte weight precisely into the 20-50KB window."
      }
    ],
    relatedPages: [
      { name: "Railway NTPC Prep", url: "/exam/railway-ntpc" },
      { name: "Compress Photo to 50KB", url: "/tool/compress-photo-50kb" }
    ]
  },
  {
    slug: "ibps-po",
    name: "IBPS PO",
    metaTitle: "IBPS PO Photo and Signature Maker Online Free | PasteDocs",
    metaDescription: "Create exactly spec'd photo (200x230px, 20-50KB) and signature (140x60px, 10-20KB) for IBPS banking exams offline.",
    h1: "Banking Exams: Resize Photo & Sign for IBPS Instantly",
    requirements: "Photo: JPG, 200x230px, 20-50KB. Signature: JPG, 140x60px, 10-20KB",
    content: "For Institute of Banking Personnel Selection (IBPS) clerk or PO exams, the specifications are highly rigid. Candidates often struggle with compressing their signature document between 10KB and 20KB while retaining readability. This utility allows you to hit those exact target numbers offline from your mobile device.",
    faq: [
      {
        question: "What is the size limit for IBPS Photo?",
        answer: "The photo must be between 20KB and 50KB."
      },
      {
        question: "What should be the signature dimensions?",
        answer: "The signature should be scanned and resized to 140x60 pixels, and file size needs to be 10KB to 20KB max."
      },
      {
        question: "Can I compress my thumb impression here?",
        answer: "Absolutely. Simply input the requirements (e.g. 20KB to 50KB, JPG) and we will process the thumb impression document for IBPS just like the photo."
      },
      {
        question: "Are old files deleted from server?",
        answer: "Files are NEVER uploaded to any servers. The tool processes everything locally in your web browser securely."
      },
      {
        question: "Which ink should be used for the IBPS signature?",
        answer: "The official notification explicitly states you must sign on a white paper with a Black Ink pen."
      }
    ],
    relatedPages: [
      { name: "SBI PO Format", url: "/exam/sbi-po" },
      { name: "Signature Resize 140x60", url: "/tool/signature-resize" }
    ]
  },
  {
    slug: "sbi-po",
    name: "SBI PO",
    metaTitle: "SBI PO Photo Size Configurator | Free Image Compressor",
    metaDescription: "Automatic resize for SBI Probationary Officer form. Format your snapshot and signature perfectly for State Bank of India portal.",
    h1: "SBI Online Application Photo Resize (200x230px) — Free",
    requirements: "Photo: JPG, 200x230px, 20-50KB. Signature: JPG, 140x60px, 10-20KB",
    content: "Applying for SBI PO? Make sure you never see the 'Invalid Image Format' error again. SBI shares the exact same dimension requirements as IBPS (200x230px for photographs). This pre-set template ensures your images adhere totally to the State Bank of India's HR guidelines before submission.",
    faq: [
      {
        question: "Photo requirements for SBI PO?",
        answer: "JPG format, 20KB to 50KB, dimensions of 200 x 230 pixels."
      },
      {
        question: "Is signature required in black ink?",
        answer: "Yes, SBI prefers the signature to be in black ink, keeping the size strictly between 10KB and 20KB."
      },
      {
        question: "How to fix file size issue?",
        answer: "Upload it here, and the output file downloaded will automatically fall into the 20-50KB limits."
      },
      {
        question: "Is there a limit on usage?",
        answer: "No, PasteDocs is completely free with no usage limits or hidden paywalls."
      },
      {
        question: "What resolution is needed?",
        answer: "Ensure the scan is clear; typically 200 DPI is recommended before cropping."
      }
    ],
    relatedPages: [
      { name: "IBPS PO Format", url: "/exam/ibps-po" }
    ]
  },
  {
    slug: "railway-ntpc",
    name: "Railway NTPC",
    metaTitle: "RRB NTPC Photo Resize | 400x500px Image Compressor",
    metaDescription: "Get your RRB/Railway Recruitment Board photo perfect. Auto scale to 400x500 pixels and 20-40KB for hassle-free web upload.",
    h1: "Resize RRB NTPC Photo to 400x500px in 10 Seconds",
    requirements: "Photo: JPG, 400x500px, 20-40KB. Signature: JPG, 400x100px, 10-40KB",
    content: "The RRB NTPC exam photo standards are slightly different from banking exams. You need a portrait photograph sized 400x500 pixels. A common frustration is compressing an image to 400x500px while squeezing the memory footprint strictly into the 20KB-40KB limit. Our WebAssembly powered compressor engine balances both requirements flawlessly on your device without ruining quality.",
    faq: [
      {
        question: "What is the Railway NTPC photo size?",
        answer: "The RRB requests 35mm x 45mm or 400x500 pixels, sized between 20KB and 40KB."
      },
      {
        question: "What is RRB Signature specification?",
        answer: "Sign on white paper, scan and crop it to 400x100 pixels, maintaining 10KB to 40KB in size."
      },
      {
        question: "Does the date need to be on the RRB photo?",
        answer: "Check the exact latest notification! Some years RRB requires the candidate's name and date of photo printed on it clearly."
      },
      {
        question: "My photo is 5MB, can I use this tool?",
        answer: "Yes. You can upload an image up to 20MB and our tool will crush it down to 40KB instantly."
      },
      {
        question: "Does the background color matter?",
        answer: "Yes, light or plain white backgrounds are explicitly mandated by the Railway Recruitment Boards."
      }
    ],
    relatedPages: [
      { name: "SSC CGL Format", url: "/exam/ssc-cgl" },
      { name: "Increase DPI", url: "/tool/increase-dpi" }
    ]
  },
  {
    slug: "india-post-gds",
    name: "India Post GDS",
    metaTitle: "India Post GDS Photo and Signature Resizer online free",
    metaDescription: "Resize your photo for Gramin Dak Sevak (GDS) portal instantly. Format limits: 30-100KB, Dimensions 320x400 pixels.",
    h1: "Format Photo for India Post GDS Registration Instantly",
    requirements: "Photo: JPG, 320x400px, 30-100KB. Signature: JPG, 300x120px, 20-100KB",
    content: "Registration on the India Post Gramin Dak Sevak (GDS) portal requires a specific photo crop format (320x400 pixels). If the photo doesn't look correct on the portal preview, it can compromise the application. PasteDocs precisely aligns your photo and compresses the data size under the generous 100KB limit allowed by the post office portal.",
    faq: [
      {
        question: "GDS Photo requirements?",
        answer: "The required dimensions are 320x400px with a file size strictly within 30 to 100 KB."
      },
      {
        question: "GDS Signature requirements?",
        answer: "Signature should be within 20KB to 100KB, JPG format, roughly 300x120 pixels."
      },
      {
        question: "How to reduce KB size for India Post?",
        answer: "Use our pre-configured tool. It handles the compression algorithm locally while respecting edge boundaries."
      },
      {
        question: "Can I do everything from my mobile browser?",
        answer: "Yes, PasteDocs works perfectly on Chrome or Safari on your phone."
      },
      {
        question: "Is this a free tool?",
        answer: "Absolutely. Everything happens on your device internally and is 100% free."
      }
    ],
    relatedPages: [
      { name: "Compress Photo to 100KB", url: "/tool/compress-photo-100kb" },
      { name: "Change Background", url: "/tool/white-background" }
    ]
  }
];
