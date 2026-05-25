export interface DocumentData {
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

export const documentsData: DocumentData[] = [
  {
    slug: "passport",
    name: "Passport",
    metaTitle: "Passport Size Photo Maker & Resizer Online Free",
    metaDescription: "Make perfect passport size photos from your mobile device. Instantly convert any image to standard passport format securely.",
    h1: "Passport Size Photo Ready in 10 Seconds",
    requirements: "Photo: JPG, 35x45mm, plain background",
    content: "Creating a passport-size photo from a mobile picture requires specific cropping and dimension matching. Standard requirements dictate a 35x45mm physical printing size. This completely private browser utility aligns your image automatically, maintaining the required aspect ratio.",
    faq: [
      {
        question: "What is standard passport photo size?",
        answer: "In most regions, it is 35mm wide by 45mm tall (or roughly 2x2 inches in US)."
      },
      {
        question: "Can I use a selfie?",
        answer: "Selfies are typically rejected by authorities unless the camera is far away and facial features are completely flat and not distorted by wide-angle lenses."
      },
      {
        question: "What background is needed?",
        answer: "Almost universally, a plain white or off-white background is required for passport photos."
      },
      {
        question: "Does this cost anything?",
        answer: "No, this is 100% free with no hidden charges."
      },
      {
        question: "Is it safe?",
        answer: "PasteDocs acts as a local tool inside your browser. No files are uploaded to our servers."
      }
    ],
    relatedPages: [
      { name: "NEET Photo Format", url: "/exam/neet-ug" },
      { name: "PAN Card Photo", url: "/doc/pan-card" }
    ]
  },
  {
    slug: "pan-card",
    name: "PAN Card",
    metaTitle: "PAN Card Photo and Signature Resize Online Tool",
    metaDescription: "Format photo and signature specifically for NSDL/UTIITL PAN card applications. 213x213 pixels, max 50KB.",
    h1: "PAN Card Format exactly 213x213px in 10 Seconds",
    requirements: "Photo: JPG, 213x213px, max 50KB. Signature: JPG, 213x213px, max 50KB",
    content: "Uploading support documents for a new PAN card or PAN correction demands strict dimensional rules. The NSDL portal requests both the photograph and the signature to be sized at exactly 213x213 pixels, keeping the file size strictly under 50KB. Use this specifically configured page to hit those requirements perfectly.",
    faq: [
      {
        question: "What is PAN card photo resolution?",
        answer: "213x213 pixels at 200 DPI is required."
      },
      {
        question: "What size should the signature be for PAN?",
        answer: "Like the photo, the signature also needs to be bounded by a 213x213px dimension, under 50KB."
      },
      {
        question: "Is black ink required for the PAN signature?",
        answer: "Yes, black ink on white paper is strongly recommended by tax authorities."
      },
      {
        question: "Why is it getting rejected?",
        answer: "Often, if you crop it manually, it is not perfectly square (213x213). Our tool forces this aspect ratio."
      },
      {
        question: "Offline support?",
        answer: "Yes, you can operate this tool offline once the website has loaded."
      }
    ],
    relatedPages: [
      { name: "Aadhaar Card Sync", url: "/doc/aadhaar-card" },
      { name: "Compress to 50KB", url: "/tool/compress-photo-50kb" }
    ]
  }
];
