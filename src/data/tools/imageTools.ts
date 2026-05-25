export interface ImageTool {
  slug: string;
  name: string;
  description: string;
  requirements: {
    maxSizeBytes?: number;
    format?: string;
    width?: number;
    height?: number;
    backgroundColor?: string;
  };
  metaTitle: string;
  keywords: string[];
}

export const imageTools: ImageTool[] = [
  { slug: "compress-photo-20kb", name: "Compress to 20KB", description: "Compress any photo to exactly 20KB", requirements: { maxSizeBytes: 20480, format: "jpeg" }, metaTitle: "Compress Photo to 20KB Free Online | PasteDocs", keywords: ["compress photo 20kb", "photo size 20kb online"] },
  { slug: "compress-photo-50kb", name: "Compress to 50KB", description: "Compress any photo to exactly 50KB", requirements: { maxSizeBytes: 51200, format: "jpeg" }, metaTitle: "Compress Photo to 50KB Free Online | PasteDocs", keywords: ["compress photo 50kb", "photo size 50kb online"] },
  { slug: "compress-photo-100kb", name: "Compress to 100KB", description: "Compress any photo to exactly 100KB", requirements: { maxSizeBytes: 102400, format: "jpeg" }, metaTitle: "Compress Photo to 100KB Free Online | PasteDocs", keywords: ["compress photo 100kb"] },
  { slug: "compress-photo-200kb", name: "Compress to 200KB", description: "Compress any photo to exactly 200KB", requirements: { maxSizeBytes: 204800, format: "jpeg" }, metaTitle: "Compress Photo to 200KB Free Online | PasteDocs", keywords: ["compress photo 200kb"] },
  { slug: "passport-size-photo", name: "Passport Size Photo", description: "Standard 413x531px passport size", requirements: { width: 413, height: 531, format: "jpeg", maxSizeBytes: 204800 }, metaTitle: "Passport Size Photo Resize Free Online | PasteDocs", keywords: ["passport size photo free", "passport photo resize online"] },
  { slug: "stamp-size-photo", name: "Stamp Size Photo", description: "177x177px stamp size", requirements: { width: 177, height: 177, format: "jpeg", maxSizeBytes: 20480 }, metaTitle: "Stamp Size Photo Resize Free | PasteDocs", keywords: ["stamp size photo resize"] },
  { slug: "signature-resize", name: "Signature Resize", description: "Resize signature to 140x60px", requirements: { width: 140, height: 60, format: "jpeg", maxSizeBytes: 30720 }, metaTitle: "Signature Resize Online Free — 140x60px | PasteDocs", keywords: ["signature resize online", "signature 140x60 free"] },
  { slug: "jpg-to-png", name: "JPG to PNG", description: "Convert JPG to PNG format", requirements: { format: "png" }, metaTitle: "JPG to PNG Converter Free Online | PasteDocs", keywords: ["jpg to png converter free"] },
  { slug: "png-to-jpg", name: "PNG to JPG", description: "Convert PNG to JPG format", requirements: { format: "jpeg" }, metaTitle: "PNG to JPG Converter Free Online | PasteDocs", keywords: ["png to jpg converter free"] },
  { slug: "heic-to-jpg", name: "HEIC to JPG", description: "Convert iPhone HEIC to JPG", requirements: { format: "jpeg" }, metaTitle: "HEIC to JPG Converter Free — iPhone Fix | PasteDocs", keywords: ["heic to jpg converter free", "iphone photo to jpg"] },
  { slug: "white-background", name: "Add White Background", description: "Replace background with white", requirements: { backgroundColor: "#ffffff" }, metaTitle: "Add White Background to Photo Free | PasteDocs", keywords: ["add white background photo free"] },
  { slug: "pdf-compress", name: "Compress PDF", description: "Reduce PDF file size", requirements: { format: "pdf", maxSizeBytes: 204800 }, metaTitle: "Compress PDF Online Free — No Upload | PasteDocs", keywords: ["compress pdf online free", "pdf size reduce"] },
  { slug: "image-to-pdf", name: "Image to PDF", description: "Convert JPG/PNG to PDF", requirements: { format: "pdf" }, metaTitle: "Image to PDF Converter Free Online | PasteDocs", keywords: ["image to pdf converter free"] }
];
