---
title: "10th Board Marksheet Compress: CBSE, GSEB, ICSE Marksheet PDF Size Guide"
excerpt: "How to compress your 10th board marksheet for online college admission, scholarship and verification portals. Exact KB limits for CBSE, GSEB, ICSE and state boards. Free online marksheet compressor."
date: "2026-11-05"
category: "Document Guides"
readTime: "7 min read"
image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
---

After the 10th board results are declared, every student needs to upload their marksheet to at least one online portal — college admission forms, scholarship applications, verification services, or the board's own digital marksheet service. Almost all of these portals have a strict file-size cap, typically between 100KB and 500KB.

If your 10th marksheet PDF or photo is too large (which it usually is — scanned marksheets are often 1-5 MB), the portal will reject the upload. This guide covers the exact file-size limits for major Indian boards and portals, and how to compress your marksheet to meet them.

## File-Size Limits for 10th Marksheet Uploads

| Portal / Board | File Size Cap | Format |
|----------------|--------------|--------|
| CBSE Pariksha Sangam | 150 KB | PDF |
| CBSE Digilocker | No strict cap (cloud) | PDF |
| GSEB (Gujarat) online admission | 200 KB | PDF / JPG |
| ICSE / ISC board portal | 200 KB | PDF |
| Maharashtra board admission | 500 KB | PDF |
| Karnataka KEA admission | 500 KB | PDF |
| UP board admission | 300 KB | PDF / JPG |
| Tamil Nadu admission | 200 KB | PDF |
| National Scholarship Portal (NSP) | 500 KB | PDF / JPG |
| Vidyalakshmi (education loan) | 1 MB | PDF |
| ACPC Gujarat admission | 500 KB | PDF |

The most common caps are **200KB** (for board portals) and **500KB** (for admission portals). If you compress your marksheet to under 200KB, it will be accepted by virtually every portal.

## How to Compress Your 10th Marksheet

### If your marksheet is a PDF

Use the [Compress PDF tool](/tool/pdf-compress) to reduce the PDF file size locally in your browser. The tool uses the open-source pdf-lib library to:
- Re-encode embedded images at lower quality
- Remove redundant PDF objects
- Strip unnecessary metadata
- Rebuild the PDF stream

All processing happens in your browser — your marksheet is never uploaded to any server. Target 200KB for board portals or 500KB for admission portals.

### If your marksheet is a scanned photo (JPG/PNG)

If you photographed your marksheet instead of downloading the PDF, use the [Compress to 200KB tool](/tool/compress-200kb) or the [Compress to 500KB tool](/tool/compress-500kb) to reduce the file size. The iterative JPEG engine lands your file just under the byte ceiling while keeping the text legible.

### If your marksheet is an image that needs to be a PDF

Many portals require PDF format only. If your marksheet is a photo, use the [Image to PDF tool](/tool/image-to-pdf) to convert it to PDF, then compress the PDF with the Compress PDF tool.

### If you need to merge multiple marksheet pages

If your marksheet has multiple pages (some boards issue a separate marks statement and a pass certificate), use the [Merge Images to PDF tool](/tool/merge-images-to-pdf) to combine them into a single PDF, then compress.

## Step-by-Step: Compress Your 10th Marksheet to 200KB

1. **Download or scan your marksheet** — if you have the PDF from Digilocker or the board website, download it. If not, photograph the physical marksheet in daylight, filling the frame with the document.

2. **Upload to the compress tool** — drag and drop the PDF or image into the [Compress PDF tool](/tool/pdf-compress) (for PDFs) or the [Compress to 200KB tool](/tool/compress-200kb) (for images).

3. **Set the target** — paste "max 200kb" in the requirements box. The tool will iteratively compress until the file is just under the byte ceiling.

4. **Download and verify** — check the file size in your file manager. It should be under 200KB. Open it to verify the text is still legible.

5. **Upload to the portal** — the compressed marksheet should now be accepted by the portal without a file-size error.

## Why Browser-Based Compression Is Safer for Marksheets

Your 10th marksheet contains sensitive personal information — your full name, date of birth, roll number, school name, parents' names, and your marks. When you upload it to an online compressor that processes files on a server, you are exposing this data to:
- Server-side storage that may persist indefinitely
- Third-party analytics scripts that may read the file
- Database breaches that expose your academic records
- Cached copies on CDN edges

Browser-based tools like PasteDocs process your marksheet entirely in your device's RAM using pdf-lib (for PDFs) or the Canvas API (for images). The file is read into local memory, compressed, and offered back as a download. **No part of the file is ever transmitted over the network.** This is the safest way to prepare a sensitive academic document for any portal.

## Common Marksheet Compression Problems

1. **Text becomes blurry after compression** — use an iterative compressor (like PasteDocs) that lowers quality gradually rather than in a single aggressive pass.
2. **PDF is still too large after compression** — the PDF may have high-resolution embedded images. Use the Compress PDF tool which re-encodes embedded images.
3. **Portal rejects the format** — some portals require PDF only, others accept JPG. Check the portal's format requirement and use the [Image to PDF](/tool/image-to-pdf) or [PNG to JPG](/tool/png-to-jpg) converter if needed.
4. **File size is below the minimum** — some portals have a minimum file size (e.g. 50KB). If your compressed file is too small, re-scan at higher resolution and re-compress.

## Frequently Asked Questions

**How do I compress my 10th marksheet PDF to under 200KB?**
Use the PasteDocs Compress PDF tool. Upload the PDF, set the target to 200KB, and the tool will iteratively recompress embedded images and rebuild the PDF stream until the file is just under the byte ceiling.

**Can I compress a photographed marksheet?**
Yes. If your marksheet is a JPG or PNG photo, use the Compress to 200KB or Compress to 500KB tool. The iterative JPEG engine keeps text legible at the small file size.

**Is my marksheet uploaded to a server?**
No. PasteDocs processes everything in your browser using pdf-lib (for PDFs) or the Canvas API (for images). Your marksheet is read into local memory, compressed, and offered back as a download — never transmitted to any server.

**What format should my marksheet be for online admission?**
Most portals require PDF. If your marksheet is a photo, use the Image to PDF tool to convert it, then compress the PDF to meet the portal's file-size cap.

*This guide was last updated on 5 November 2026. Always verify the exact file-size limit on the specific portal you are uploading to.*
