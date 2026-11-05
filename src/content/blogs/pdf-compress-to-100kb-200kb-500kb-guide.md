---
title: "PDF Compress to 100KB, 200KB, 500KB — Complete Guide"
excerpt: "How to compress PDF to 100KB, 200KB or 500KB for government portal uploads. Aadhaar, PAN, GST, court e-filing — exact KB caps and how to meet them."
date: "2026-11-05"
category: "Document Guides"
readTime: "6 min read"
image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
---

Government portals cap PDF uploads at specific file sizes — 100KB for Aadhaar updates, 200KB for PAN applications, 500KB for GST returns and court e-filing. If your PDF exceeds the cap, the portal rejects it.

## Common PDF File-Size Caps

| Portal | File Size Cap | Use |
|--------|--------------|-----|
| Aadhaar update (UIDAI) | 100 KB per document | ID proof upload |
| PAN application (NSDL/UTIITSL) | 200 KB | ID, address proof |
| GST returns | 500 KB per attachment | Supporting documents |
| Court e-filing | 500 KB per page | Case documents |
| College admission | 300-500 KB | Marksheets, certificates |
| Scholarship portal (NSP) | 500 KB | Income, caste certificates |
| Visa supporting documents | 1 MB | Bank statements, invitations |

## How to Compress PDF

Use the [Compress PDF tool](/tool/pdf-compress) to reduce PDF file size entirely in your browser. The tool uses pdf-lib to:
- Re-encode embedded images at lower quality
- Remove redundant PDF objects
- Strip unnecessary metadata
- Rebuild the PDF stream

No upload — your PDF is processed in your device's RAM.

## Step-by-Step: Compress PDF to 200KB

1. Upload your PDF to the Compress PDF tool
2. Set the target: paste "max 200kb" in the requirements box
3. The tool iteratively recompresses until the file is under 200KB
4. Download the compressed PDF
5. Verify text is still legible

## If the PDF Is Still Too Large

If recompression alone doesn't hit the target:
1. Use the [PDF to JPG tool](/tool/pdf-to-jpg) to split the PDF into page images
2. Compress each image with [Compress to 200KB](/tool/compress-200kb) or [Compress to 500KB](/tool/compress-500kb)
3. Merge the compressed images back to PDF with [Image to PDF](/tool/image-to-pdf)

## Frequently Asked Questions

**How do I compress PDF to 100KB?** Use the Compress PDF tool, set target to 100KB. The tool iteratively recompresses embedded images.
**How do I compress PDF to 200KB?** Same tool, set target to 200KB.
**How do I compress PDF to 500KB?** Same tool, set target to 500KB.
**Is my PDF uploaded to a server?** No. pdf-lib runs in your browser. Your PDF never leaves your device.
**Will compression affect text readability?** No — text is vector data and is preserved exactly. Only embedded raster images are recompressed.

*Last updated 5 November 2026.*
