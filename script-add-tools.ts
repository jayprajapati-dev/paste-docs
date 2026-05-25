import fs from 'fs';

let content = fs.readFileSync('src/data/tools.ts', 'utf8');

const additionalTools = `
  ,
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
];`;

content = content.replace(/\n  \}\n\];\n*$/, additionalTools);
fs.writeFileSync('src/data/tools.ts', content);
console.log("Appended tools!");
