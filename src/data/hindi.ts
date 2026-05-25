export interface HindiData {
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

export const hindiData: HindiData[] = [
  {
    slug: "photo-ka-size-kaise-kam-kare",
    name: "Photo Size Reduce in Hindi",
    metaTitle: "Photo ka Size Kaise Kam Kare Free (KB mein)",
    metaDescription: "Mobile se photo ka size 50KB, 20KB tak kaise kam karein? Bina quality kharab kiye 100% free tool.",
    h1: "Photo ka Size Kam Karein (Compress to KB) — Free",
    requirements: "Photo: JPG, max 50KB",
    content: "Agar aap online form (SSC, Railway, NEET) bhar rahe hain, toh zyadatar websites par likha hota hai 'File Size Too Large'. Phone se kheenchi gayi photo 5MB ki hoti hai, lekin form mein 50KB maanga jaata hai.\n\nIs tool ki madad se aap apni photo ka size turant kam kar sakte hain. Aapki photo bilkul safe rehgi kyunki ye tool sirf aapke phone mein kaam karta hai, photo internet par upload nahi hoti hai.",
    faq: [
      {
        question: "Photo ka size 20KB kaise banaye?",
        answer: "Bas photo select karein. Tool automatically uski quality ko adjust karke 20KB-50KB ke beech kar dega."
      },
      {
        question: "Kya signatiure (hastakshar) bhi resize kar sakte hain?",
        answer: "Haan, aap signature photo bhi idhar se crop aur compress kar sakte hain."
      },
      {
        question: "Bina app download kiye chalega?",
        answer: "Haan, browser mein direct chalega, koi app nahi chahiye."
      },
      {
        question: "Kya ye tool free hai?",
        answer: "100% free forever. Koi chhupa hua charge nahi hai."
      },
      {
        question: "Kya internet hona zaruri hai?",
        answer: "Ek baar website khulne ke baad, ye bina internet ke (offline) bhi kaam kar sakta hai."
      }
    ],
    relatedPages: [
      { name: "SSC Photo Formats", url: "/exam/ssc-cgl" },
      { name: "Compress to 20KB", url: "/tool/compress-photo-20kb" }
    ]
  }
];
