export interface IndiaDocument {
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
  specialNote?: string;
  metaTitle: string;
  metaDesc: string;
  h1: string;
  keywords: string[];
  faq: { q: string; a: string }[];
}

export const indiaDocuments: IndiaDocument[] = [
  {
    slug: "passport-photo",
    name: "Indian Passport",
    authority: "Passport Seva",
    category: "Identity",
    photo: { format: "jpeg", width: 413, height: 531, minSizeBytes: 10240, maxSizeBytes: 1048576, background: "white", dpi: 300 },
    specialNote: "Plain white background. Face must cover 70-80% of frame. No glasses.",
    metaTitle: "Passport Size Photo Resize Free — 413x531px | PasteDocs",
    metaDesc: "Resize photo to Indian passport size: 413x531px, max 1MB JPG. Free online tool.",
    h1: "Passport Size Photo Ready in 10 Seconds",
    keywords: ["passport size photo resize free", "passport photo 413x531", "passport photo maker india"],
    faq: [
      { q: "Indian passport photo size?", a: "35x45mm (413x531px at 300 DPI), JPG, max 1MB." },
      { q: "Background color?", a: "Plain white mandatory." },
      { q: "Glasses allowed?", a: "No, glasses not allowed in passport photos." },
      { q: "Photo kitni purani ho sakti hai?", a: "6 months se zyada purani nahi honi chahiye." },
      { q: "Kya ye USA visa me bhi chalegi?", a: "Nahi, US visa ke liye alag square format chahiye." }
    ]
  },
  {
    slug: "pan-card-photo",
    name: "PAN Card",
    authority: "NSDL/UTIITSL",
    category: "Identity",
    photo: { format: "jpeg", width: 213, height: 213, minSizeBytes: 10240, maxSizeBytes: 51200, background: "white" },
    signature: { format: "jpeg", width: 213, height: 71, minSizeBytes: 5120, maxSizeBytes: 30720 },
    metaTitle: "PAN Card Photo Resize Free — NSDL Specs | PasteDocs",
    metaDesc: "Resize photo for PAN card to 213x213px, max 50KB JPG. NSDL/UTIITSL compliant. Free.",
    h1: "PAN Card Photo Ready in 10 Seconds",
    keywords: ["pan card photo resize", "pan card photo size nsdl", "pan card photo 50kb"],
    faq: [
      { q: "PAN card photo size?", a: "213x213px, max 50KB, JPG format." },
      { q: "PAN signature size?", a: "213x71px, max 30KB, JPG." },
      { q: "NSDL aur UTIITSL me same specs?", a: "Mostly same hain." },
      { q: "Color ya black white?", a: "Color photo required." },
      { q: "Background?", a: "Plain white." }
    ]
  },
  {
    slug: "aadhaar-photo",
    name: "Aadhaar Update",
    authority: "UIDAI",
    category: "Identity",
    photo: { format: "jpeg", width: 200, height: 200, minSizeBytes: 10240, maxSizeBytes: 2097152, background: "white" },
    metaTitle: "Aadhaar Photo Resize Free — UIDAI Specs | PasteDocs",
    metaDesc: "Resize photo for Aadhaar update to 200x200px, max 2MB JPG. UIDAI compliant.",
    h1: "Aadhaar Update Photo in 10 Seconds",
    keywords: ["aadhaar photo resize", "uidai photo size", "aadhaar update photo"],
    faq: [
      { q: "Aadhaar photo size?", a: "200x200px, max 2MB, JPG." },
      { q: "Aadhaar update kaise kare?", a: "myaadhaar.uidai.gov.in pe jaao." },
      { q: "Photo reject kyun hoti hai?", a: "Blurry ya wrong format common reasons." },
      { q: "Black white chalega?", a: "Color photo preferred." },
      { q: "Free tool hai?", a: "Haan." }
    ]
  }
];
