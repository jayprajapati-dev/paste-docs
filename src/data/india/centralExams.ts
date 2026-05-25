export interface CentralExam {
  slug: string;
  name: string;
  authority: string;
  category: string;
  photo: {
    format: string;
    width: number;
    height: number;
    minSizeBytes?: number;
    maxSizeBytes: number;
    background: string;
    dpi?: number;
  };
  signature?: {
    format: string;
    width: number;
    height: number;
    minSizeBytes?: number;
    maxSizeBytes: number;
  };
  postcard?: {
    format: string;
    width: number;
    height: number;
    minSizeBytes?: number;
    maxSizeBytes: number;
  };
  thumbImpression?: {
    format: string;
    width: number;
    height: number;
    minSizeBytes?: number;
    maxSizeBytes: number;
  };
  specialNote?: string;
  metaTitle: string;
  metaDesc: string;
  h1: string;
  keywords: string[];
  faq: { q: string; a: string }[];
}

export const centralExams: CentralExam[] = [
  // NTA EXAMS
  {
    slug: "neet-ug",
    name: "NEET UG 2026",
    authority: "NTA",
    category: "Medical",
    photo: { format: "jpeg", width: 413, height: 531, minSizeBytes: 10240, maxSizeBytes: 204800, background: "white", dpi: 300 },
    signature: { format: "jpeg", width: 800, height: 300, minSizeBytes: 4096, maxSizeBytes: 30720 },
    postcard: { format: "jpeg", width: 1800, height: 1200, minSizeBytes: 10240, maxSizeBytes: 204800 },
    thumbImpression: { format: "jpeg", width: 200, height: 200, minSizeBytes: 10240, maxSizeBytes: 204800 },
    specialNote: "NEET requires TWO photos: Passport size AND Postcard size (4x6 inch). Photo must be taken after Jan 1, 2021. Name and date visible.",
    metaTitle: "NEET 2026 Photo Resize — Passport & Postcard Size Free | PasteDocs",
    metaDesc: "Resize NEET 2026 photo to exact NTA specs: 413x531px passport size and 4x6 postcard size, max 200KB JPG. Free, instant, works on Android.",
    h1: "Fix Your NEET 2026 Photo Upload in 10 Seconds",
    keywords: ["neet photo resize 2026", "neet photo size nta", "neet postcard size photo"],
    faq: [
      { q: "NEET me kitne photos upload karne hote hain?", a: "NEET me 2 photos chahiye: Passport size (3.5x4.5cm, max 200KB) aur Postcard size (4x6 inch, max 200KB). Dono JPG format me." },
      { q: "NEET photo ka background kaunsa hona chahiye?", a: "Plain white background mandatory hai. Colored ya textured background se photo reject ho jayegi." },
      { q: "NEET signature ka size kya hai?", a: "Signature 4KB se 30KB ke beech, JPG format me honi chahiye." },
      { q: "Kya NEET photo me naam aur date likhna zaroori hai?", a: "Haan, NTA recommend karta hai ki photo pe naam aur date clearly visible ho." },
      { q: "NEET photo kitne purani ho sakti hai?", a: "Photo January 1, 2021 ke baad ki honi chahiye." }
    ]
  },
  {
    slug: "jee-main",
    name: "JEE Main 2026",
    authority: "NTA",
    category: "Engineering",
    photo: { format: "jpeg", width: 413, height: 531, minSizeBytes: 10240, maxSizeBytes: 40960, background: "white", dpi: 100 },
    signature: { format: "jpeg", width: 413, height: 177, minSizeBytes: 1024, maxSizeBytes: 30720 },
    specialNote: "Photo: 3.5x4.5cm at 100dpi, max 40KB. Signature: 3.5x1.5cm, max 30KB.",
    metaTitle: "JEE Main 2026 Photo Resize Free — 40KB JPG Auto | PasteDocs",
    metaDesc: "Resize JEE Main photo to NTA specs: 3.5x4.5cm, max 40KB JPG instantly. Pre-configured tool, just upload and download.",
    h1: "JEE Main 2026 Photo Ready in 10 Seconds",
    keywords: ["jee main photo resize 2026", "jee main photo size nta", "jee photo 40kb"],
    faq: [
      { q: "JEE Main photo ka maximum size kya hai?", a: "JEE Main ke liye photo maximum 40KB honi chahiye, JPG format me." },
      { q: "JEE Main photo ki dimensions kya hain?", a: "3.5cm x 4.5cm (approximately 413x531 pixels at 100 DPI)." },
      { q: "JEE Main signature ka size kya hai?", a: "Signature maximum 30KB, JPG format, 3.5x1.5cm dimensions." },
      { q: "Kya plain white background mandatory hai?", a: "Haan, JEE Main ke liye plain white background with clear face required hai." },
      { q: "Photo kitni purani ho sakti hai?", a: "Recent photo use karo — preferably last 3 months ki." }
    ]
  },
  {
    slug: "upsc-cse",
    name: "UPSC Civil Services 2026",
    authority: "UPSC",
    category: "Civil Services",
    photo: { format: "jpeg", width: 472, height: 591, minSizeBytes: 20480, maxSizeBytes: 307200, background: "white", dpi: 300 },
    signature: { format: "jpeg", width: 472, height: 133, minSizeBytes: 10240, maxSizeBytes: 102400 },
    specialNote: "UPSC UNIQUE requirement: Candidate name and date of photograph must be printed at bottom of photo. 4cm x 5cm at 300 DPI = 472x591px.",
    metaTitle: "UPSC Photo Resize 2026 — Name & Date Auto Add Free | PasteDocs",
    metaDesc: "Resize UPSC photo to 472x591px with name and date printed at bottom. Official NTA specs, 20-300KB JPG. Free tool.",
    h1: "UPSC 2026 Photo With Name & Date — Ready in 10 Seconds",
    keywords: ["upsc photo resize 2026", "upsc photo name date print", "upsc 4x5 photo resize"],
    faq: [
      { q: "UPSC photo me naam aur date kaise add kare?", a: "PasteDocs automatically naam aur date print kar sakta hai photo ke neeche. Bas naam input karo aur tool rest handle karega." },
      { q: "UPSC photo ki exact size kya hai?", a: "4cm x 5cm (472x591 pixels at 300 DPI), 20KB se 300KB ke beech, JPG format." },
      { q: "SSC wali photo UPSC me use ho sakti hai?", a: "Nahi. UPSC 4x5cm use karta hai jabki SSC 3.5x4.5cm. Alag alag photos zaroori hain." },
      { q: "UPSC signature ka size kya hai?", a: "10KB se 100KB, JPG format." },
      { q: "UPSC photo ka background kaunsa chahiye?", a: "Plain white background with clear facial features." }
    ]
  },
  {
    slug: "ssc-cgl",
    name: "SSC CGL 2026",
    authority: "SSC",
    category: "Government Job",
    photo: { format: "jpeg", width: 236, height: 295, minSizeBytes: 20480, maxSizeBytes: 51200, background: "white" },
    signature: { format: "jpeg", width: 177, height: 59, minSizeBytes: 10240, maxSizeBytes: 30720 },
    specialNote: "Photo: 3.5x4.5cm, 20-50KB. Signature: 3.5x1.5cm, 10-30KB. Date of photo within last 3 months.",
    metaTitle: "SSC CGL Photo Resize 2026 — 50KB JPG Free | PasteDocs",
    metaDesc: "Resize SSC CGL photo to exact 200x230px, max 50KB JPG instantly. Pre-configured tool for SSC. Free, no account.",
    h1: "SSC CGL 2026 Photo Ready in 10 Seconds",
    keywords: ["ssc cgl photo resize 2026", "ssc photo 50kb", "ssc signature resize"],
    faq: [
      { q: "SSC CGL photo ka size kya hona chahiye?", a: "Photo 3.5x4.5cm (approximately 200x230px), 20-50KB, JPG format." },
      { q: "SSC signature ki dimensions kya hain?", a: "Signature 3.5x1.5cm (177x59px approximately), 10-30KB, JPG." },
      { q: "Kya SSC me date stamp zaroori hai?", a: "SSC officially require karta hai ki photo last 3 months ki ho. Date stamp recommended hai." },
      { q: "SSC CGL aur SSC CHSL ki photo requirements same hain?", a: "Haan, dono ke requirements almost same hain." },
      { q: "Photo reject kyon hoti hai SSC me?", a: "Common reasons: file size 50KB se zyada, wrong format (PNG instead of JPG), colored background." }
    ]
  },
  {
    slug: "ibps-po",
    name: "IBPS PO 2026",
    authority: "IBPS",
    category: "Banking",
    photo: { format: "jpeg", width: 200, height: 230, minSizeBytes: 20480, maxSizeBytes: 51200, background: "white" },
    signature: { format: "jpeg", width: 140, height: 60, minSizeBytes: 10240, maxSizeBytes: 20480 },
    metaTitle: "IBPS PO Photo Resize 2026 — 50KB JPG Free | PasteDocs",
    metaDesc: "Resize IBPS PO photo to 200x230px max 50KB JPG. Signature 140x60px max 20KB. Pre-configured, free, instant.",
    h1: "IBPS PO 2026 Photo & Signature Ready in 10 Seconds",
    keywords: ["ibps po photo resize 2026", "ibps photo 50kb", "ibps signature 140x60"],
    faq: [
      { q: "IBPS PO photo size kya hai?", a: "200x230 pixels, 20-50KB, JPG format, white background." },
      { q: "IBPS PO signature dimensions kya hain?", a: "140x60 pixels, 10-20KB, JPG format." },
      { q: "Kya IBPS SBI ki photo use kar sakte hain?", a: "Requirements same hain, but fresh photo recommended hai." },
      { q: "IBPS photo reject kyun hoti hai?", a: "Size 50KB se zyada, PNG format, ya blurry photo common reasons hain." },
      { q: "Mobile se photo upload ho sakti hai?", a: "Haan, PasteDocs Android phone browser pe perfectly kaam karta hai." }
    ]
  },
  {
    slug: "sbi-po",
    name: "SBI PO 2026",
    authority: "SBI",
    category: "Banking",
    photo: { format: "jpeg", width: 200, height: 230, minSizeBytes: 20480, maxSizeBytes: 51200, background: "white" },
    signature: { format: "jpeg", width: 140, height: 60, minSizeBytes: 10240, maxSizeBytes: 20480 },
    metaTitle: "SBI PO Photo Resize 2026 — Free Auto Tool | PasteDocs",
    metaDesc: "Resize SBI PO photo to exact 200x230px 50KB JPG. Signature 140x60px 20KB. Pre-configured tool.",
    h1: "SBI PO 2026 Photo & Signature in 10 Seconds",
    keywords: ["sbi po photo resize 2026", "sbi photo 50kb", "sbi signature resize"],
    faq: [
      { q: "SBI PO photo size?", a: "200x230px, 20-50KB, JPG, white background." },
      { q: "SBI PO signature size?", a: "140x60px, 10-20KB, JPG." },
      { q: "SBI PO aur IBPS PO me kya difference hai requirements me?", a: "Dono ki requirements almost identical hain." },
      { q: "Photo reject hone pe kya kare?", a: "PasteDocs se re-process karo — tool automatically correct dimensions aur size set kar deta hai." },
      { q: "Kya offline bhi kaam karta hai?", a: "Haan, pehli baar load ke baad offline bhi kaam karta hai." }
    ]
  },
  {
    slug: "railway-ntpc",
    name: "Railway NTPC 2026",
    authority: "RRB",
    category: "Railway",
    photo: { format: "jpeg", width: 400, height: 500, minSizeBytes: 20480, maxSizeBytes: 40960, background: "white" },
    signature: { format: "jpeg", width: 400, height: 100, minSizeBytes: 10240, maxSizeBytes: 40960 },
    metaTitle: "Railway NTPC Photo Resize 2026 — Free Tool | PasteDocs",
    metaDesc: "Resize Railway NTPC photo to 400x500px max 40KB JPG. Auto-configured tool. Free.",
    h1: "Railway NTPC 2026 Photo Ready in 10 Seconds",
    keywords: ["railway ntpc photo resize 2026", "rrb ntpc photo size", "railway photo 40kb"],
    faq: [
      { q: "Railway NTPC photo size kya hai?", a: "400x500 pixels, 20-40KB, JPG format." },
      { q: "RRB signature ka size?", a: "400x100 pixels, 10-40KB, JPG." },
      { q: "Railway Group D aur NTPC ke requirements same hain?", a: "Similar hain but verify karo official notification se." },
      { q: "Photo compress kaise kare 40KB me?", a: "PasteDocs automatically compress kar deta hai exact 40KB tak." },
      { q: "Background color mandatory hai?", a: "Haan, plain white background required hai." }
    ]
  },
  {
    slug: "india-post-gds",
    name: "India Post GDS 2026",
    authority: "India Post",
    category: "Government Job",
    photo: { format: "jpeg", width: 320, height: 400, minSizeBytes: 30720, maxSizeBytes: 102400, background: "white" },
    signature: { format: "jpeg", width: 300, height: 120, minSizeBytes: 20480, maxSizeBytes: 102400 },
    metaTitle: "India Post GDS Photo Resize 2026 — Free | PasteDocs",
    metaDesc: "Resize India Post GDS photo to 320x400px, 30-100KB JPG. Auto tool.",
    h1: "India Post GDS 2026 Photo in 10 Seconds",
    keywords: ["india post gds photo resize 2026", "post office gds photo size"],
    faq: [
      { q: "GDS photo ka size?", a: "320x400px, 30-100KB, JPG." },
      { q: "GDS signature size?", a: "300x120px, 20-100KB." },
      { q: "GDS form kab aata hai?", a: "Official notifications check karo indiapostgdsonline.gov.in pe." },
      { q: "Photo reject hogi agar size galat ho?", a: "Haan, automated system reject kar deta hai." },
      { q: "Free me resize ho sakta hai?", a: "Haan, PasteDocs bilkul free hai." }
    ]
  },
  {
    slug: "ctet",
    name: "CTET 2026",
    authority: "CBSE",
    category: "Teaching",
    photo: { format: "jpeg", width: 200, height: 230, minSizeBytes: 10240, maxSizeBytes: 102400, background: "white" },
    signature: { format: "jpeg", width: 140, height: 60, minSizeBytes: 4096, maxSizeBytes: 30720 },
    metaTitle: "CTET Photo Resize 2026 — Free Auto Tool | PasteDocs",
    metaDesc: "Resize CTET photo to CBSE specs. Free tool.",
    h1: "CTET 2026 Photo Ready in 10 Seconds",
    keywords: ["ctet photo resize 2026", "ctet photo size cbse"],
    faq: [
      { q: "CTET photo size?", a: "200x230px, 10-100KB, JPG, white background." },
      { q: "CTET signature size?", a: "140x60px, 4-30KB, JPG." },
      { q: "Photo kab tak valid hai?", a: "Recent photo use karo — last 3 months recommended." },
      { q: "CTET aur TET me same requirements hain?", a: "CTET ke liye ye specs hain, state TET alag ho sakti hai." },
      { q: "Mobile se process ho sakta hai?", a: "Haan, PasteDocs phone pe perfectly kaam karta hai." }
    ]
  },
  {
    slug: "cuet-ug",
    name: "CUET UG 2026",
    authority: "NTA",
    category: "University Entrance",
    photo: { format: "jpeg", width: 413, height: 531, minSizeBytes: 10240, maxSizeBytes: 204800, background: "white" },
    signature: { format: "jpeg", width: 800, height: 300, minSizeBytes: 4096, maxSizeBytes: 30720 },
    metaTitle: "CUET UG Photo Resize 2026 — Free | PasteDocs",
    metaDesc: "Resize CUET UG photo to NTA specs instantly.",
    h1: "CUET UG 2026 Photo in 10 Seconds",
    keywords: ["cuet ug photo resize 2026", "cuet photo size nta"],
    faq: [
      { q: "CUET photo size?", a: "413x531px, 10-200KB, JPG." },
      { q: "CUET signature size?", a: "800x300px, 4-30KB, JPG." },
      { q: "NEET wali photo CUET me chalegi?", a: "Same specs hain, use kar sakte ho." },
      { q: "Background color?", a: "Plain white background required." },
      { q: "CUET form kab aata hai?", a: "NTA ki official website check karo." }
    ]
  }
];
