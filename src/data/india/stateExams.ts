export interface StateExam {
  slug: string;
  name: string;
  authority: string;
  state: string;
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
  metaTitle: string;
  metaDesc: string;
  h1: string;
  keywords: string[];
  faq: { q: string; a: string }[];
}

export const stateExams: StateExam[] = [
  {
    slug: "gpsc",
    name: "GPSC 2026",
    authority: "GPSC",
    state: "Gujarat",
    category: "State PSC",
    photo: { format: "jpeg", width: 413, height: 531, minSizeBytes: 10240, maxSizeBytes: 51200, background: "white" },
    signature: { format: "jpeg", width: 413, height: 177, minSizeBytes: 4096, maxSizeBytes: 20480 },
    metaTitle: "GPSC Photo Resize Gujarat 2026 — Free | PasteDocs",
    metaDesc: "Resize GPSC photo to exact specs. Gujarat government exam photo tool.",
    h1: "GPSC 2026 Photo Ready in 10 Seconds",
    keywords: ["gpsc photo resize 2026", "gpsc gujarat photo size", "gpsc photo tool gujarati"],
    faq: [
      { q: "GPSC photo size?", a: "413x531px, 10-50KB, JPG, white background." },
      { q: "GPSC signature?", a: "413x177px, 4-20KB, JPG." },
      { q: "Gujarat PSC aur GPSC same hai?", a: "Haan, GPSC hi Gujarat Public Service Commission hai." },
      { q: "Gujarati me use ho sakta hai?", a: "PasteDocs Hindi aur English dono me available hai." },
      { q: "Free hai?", a: "Bilkul free, koi account nahi chahiye." }
    ]
  },
  {
    slug: "mpsc",
    name: "MPSC 2026",
    authority: "MPSC",
    state: "Maharashtra",
    category: "State PSC",
    photo: { format: "jpeg", width: 413, height: 531, minSizeBytes: 10240, maxSizeBytes: 51200, background: "white" },
    signature: { format: "jpeg", width: 300, height: 80, minSizeBytes: 4096, maxSizeBytes: 20480 },
    metaTitle: "MPSC Photo Resize Maharashtra 2026 — Free | PasteDocs",
    metaDesc: "Resize MPSC photo to exact Maharashtra PSC specs. Free tool.",
    h1: "MPSC 2026 Photo Ready in 10 Seconds",
    keywords: ["mpsc photo resize 2026", "mpsc maharashtra photo size"],
    faq: [
      { q: "MPSC photo size?", a: "413x531px, 10-50KB, JPG." },
      { q: "MPSC signature?", a: "300x80px, 4-20KB, JPG." },
      { q: "MPSC exam dates?", a: "mpsc.gov.in pe check karo." },
      { q: "Marathi me available hai?", a: "Tool Hindi/English me hai." },
      { q: "Mobile pe kaam karta hai?", a: "Haan, Android pe perfectly." }
    ]
  },
  {
    slug: "tnpsc",
    name: "TNPSC 2026",
    authority: "TNPSC",
    state: "Tamil Nadu",
    category: "State PSC",
    photo: { format: "jpeg", width: 413, height: 531, minSizeBytes: 10240, maxSizeBytes: 51200, background: "white" },
    signature: { format: "jpeg", width: 300, height: 80, minSizeBytes: 4096, maxSizeBytes: 20480 },
    metaTitle: "TNPSC Photo Resize 2026 — Free | PasteDocs",
    metaDesc: "Resize TNPSC photo to Tamil Nadu PSC specs.",
    h1: "TNPSC 2026 Photo in 10 Seconds",
    keywords: ["tnpsc photo resize 2026", "tnpsc photo size"],
    faq: [
      { q: "TNPSC photo size?", a: "413x531px, 10-50KB, JPG." },
      { q: "TNPSC signature?", a: "300x80px, 4-20KB, JPG." },
      { q: "TNPSC exam kab hoti hai?", a: "tnpsc.gov.in pe check karo." },
      { q: "Tamil me available?", a: "Tool English me hai." },
      { q: "Free hai?", a: "Haan." }
    ]
  }
];
