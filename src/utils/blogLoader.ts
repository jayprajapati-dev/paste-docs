import { ALL_TOOLS } from '../data/toolData';
import { ALL_EXAMS } from '../data/examData';
import { ALL_DOCUMENTS } from '../data/documentData';
import { ALL_VISAS } from '../data/visaData';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  category: string;
  image: string;
  readTime: string;
  content: string;
  metaTitle?: string;
  metaDesc?: string;
}

// Simple and robust client-side frontmatter parser
export function parseFrontmatter(rawContent: string): { metadata: Record<string, string>; content: string } {
  const match = rawContent.match(/^---\r?\n([\s\S]+?)\r?\n---/);
  const content = rawContent.replace(/^---\r?\n[\s\S]+?\r?\n---/, '').trim();
  const metadata: Record<string, string> = {};

  if (match) {
    const lines = match[1].split('\n');
    lines.forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join(':').trim().replace(/^['"]|['"]$/g, '');
        metadata[key] = value;
      }
    });
  }

  return { metadata, content };
}

export function getLocalDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// STRICT Automated Scheduling (1 Post Per Day): Today is May 24, 2026.
// Assign release date chronologically starting May 24, 2026
export function getToolReleaseDate(index: number, baseDateStr: string = "2026-05-24"): string {
  const baseDate = new Date(baseDateStr + "T00:00:00");
  baseDate.setDate(baseDate.getDate() + index);
  const year = baseDate.getFullYear();
  const month = String(baseDate.getMonth() + 1).padStart(2, '0');
  const day = String(baseDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// --- DYNAMIC ARTICLE Blueprint Generators ---

// 1. Tool Articles
const toolsList = ALL_TOOLS.map(t => {
  const kb = t.requirements?.maxSizeBytes ? `${Math.round(t.requirements.maxSizeBytes / 1024)}KB` : '';
  const dim = t.requirements?.width ? `${t.requirements.width}x${t.requirements.height}px` : '';
  const format = t.requirements?.format ? (t.requirements.format === 'jpeg' ? 'JPG' : t.requirements.format.toUpperCase()) : '';

  const body = `
## The Core Dilemma: Why Document Rejections Happen

When applying for official services or filling online admissions, formatting anxiety is an extremely common issue. Modern application portals rely heavily on server-side automated rejection bots to process thousands of uploads in real time. These bots discard your files instantly if they do not match strict parameters. There is rarely a human reviewer to overlook a 2-pixel mismatch or a file that stretches 10KB over the limit. 

Whether it is a state registration, GSEB, CBSE board portal, or an international visa application, minor pixel and size discrepancies create major delays. Squeezing an image to fit the layout manually can distort crucial document text, and using casual image tools often strips clean meta-headers, resulting in automated upload errors. It is not just about the size—it is about keeping perfect relative contrast and aspect ratio under rigid formatting conditions.

## Official Blueprint: Understanding Mapped Specifications

To bypass the computerized validation scripts of online checkers in one go, you need to follow these official specifications carefully. Our built-in validation engine automatically pre-sets the perfect workspace constraints so you do not have to guess:

*   **Allowed Format Extensions:** ${format || 'JPEG / JPG / PNG'}
*   **Exact Pixel Target Dimensions:** ${dim || 'Responsive Aspect Scale'}
*   **Target File Size Limits:** Max ${kb || 'Optimized compression limits'}
*   **Ideal Capture Style:** Plain white background, crisp neutral lighting, high-contrast flat layout.

> **Pro Tip:** Many official portals prefer exact-pixel outputs and look for crisp edge definition. When snapping document borders or your signature, ensure you use flat lighting without any diagonal page warps. For signatures, we recommend using a dark black ink pen on stark white unruled paper.

## Step-by-Step Optimization Roadmap

Getting your files compliant is straightforward when utilizing our local browser workflow. Our engine employs advanced canvas interpolation to convert, scale, and compress files perfectly:

1.  **Select Your Native File:** Drag and drop your image or scan directly into our browser interface.
2.  **Verify Preconfigured Presets:** Our compiler automatically aligns the canvas to match the official parameters for ${t.name}.
3.  **Adjust the Interactive Crop Box:** Drag the focus boundaries to frame your passport photo or center your file scan without losing proper aspect ratio.
4.  **Execute Progressive Compression:** Press "Process Document". The engine runs an iterative multi-pass compression algorithm locally, ensuring the file size drops safely below ${kb || 'the maximum threshold'} while preserving readability.
5.  **Safe Instant Download:** Save the final verified output directly. It is pre-checked and ready for submission to any automated portal.

## The Privacy Shield: Why Client-Side Local Processing Matters

Most online sizing platforms upload your personal records, marksheets, signatures, and biometric photos to cloud databases for server-side processing. This creates massive security vulnerabilities, making your private information and digital identity susceptible to cache leaks.

> **Warning:** Using obscure, free third-party file converters online poses extreme privacy hazards. Those servers frequently cache uploaded files in permanent directories. Real-time client-side processors are the only bulletproof way to secure precious records like passports, PANs, and signatures.

By utilizing PasteDocs, your files **never touch an external server.** The entire compression and cropping process is computed 100% offline within your browser using secure client-side canvas APIs. Absolute speed meets absolute security.
  `.trim();

  return {
    slug: t.slug,
    title: `How to Use the ${t.name} Tool Online - Complete Guide`,
    excerpt: `Learn how to resize, format, and compress your files with the ${t.name} tool. Perfect for official admissions, visa forms, and portal uploads.`,
    category: t.category || "Compress",
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=800',
    content: body
  };
});

// 2. Exam Articles
const examsList = ALL_EXAMS.map(exam => {
  const photoSpecText = exam.photo ? `Photo: ${exam.photo.width}x${exam.photo.height}px (${exam.photo.minKB ? `${exam.photo.minKB}-` : ''}${exam.photo.maxKB}KB, ${exam.photo.background || 'white'} bg)` : '';
  const signatureSpecText = exam.signature ? `Signature: ${exam.signature.width}x${exam.signature.height}px (${exam.signature.minKB ? `${exam.signature.minKB}-` : ''}${exam.signature.maxKB}KB)` : '';

  const body = `
## The Core Dilemma: Why Document Rejections Happen

Applying for elite government and entrance examinations like ${exam.name} organized by the ${exam.authority} comes with substantial formatting anxiety. Computerized recruitment software processes millions of candidate files, executing immediate server-side automated rejection bots if a passport photo or a digital signature exceeds strict parameters by even a few kilobytes. 

A large portion of student registrations are disqualified every year before the exam hall tickets are even generated, solely due to minor layout mistakes. Traditional image tools often stretch the aspect ratio of your signature or snapshot, changing the biometric proportions of your facial structures. The automated system flags these distortions as mismatched visual logs, leaving aspirational candidates stressed and locked out.

## Official Blueprint: Understanding Mapped Specifications

To ensure your application transitions smoothly past the ${exam.authority} verification bots, we have preloaded the official guideline specifications into this dedicated ${exam.name} interface:

*   **Official Passport Photo Sizing:** ${exam.photo?.width || 200}x${exam.photo?.height || 230}px (File Size: ${exam.photo?.minKB ? `${exam.photo.minKB}-` : ''}${exam.photo?.maxKB || 100}KB)
*   **Required Photographic Background:** Solid ${exam.photo?.background || 'plain white'} background
*   **Verification Signature Sizing:** ${exam.signature ? `${exam.signature.width}x${exam.signature.height}px (${exam.signature.minKB ? `${exam.signature.minKB}-` : ''}${exam.signature.maxKB}KB)` : 'N/A'}
*   **Official Postcard Template:** ${exam.postcard ? `${exam.postcard.width}x${exam.postcard.height}px (${exam.postcard.minKB ? `${exam.postcard.minKB}-` : ''}${exam.postcard.maxKB}KB)` : 'Optional / Standard'}

> **Pro Tip:** For competitive state board or central exams, ensure the background is solid bright white without any distracting backdrop shadows or curtains. For signatures, we highly recommend utilizing a dark black ink pen on clean unruled paper for maximum scan visibility.

## Step-by-Step Optimization Roadmap

You can achieve flawless compliance for your ${exam.name} submission within seconds by executing our local direct browser pipeline:

1.  **Launch Your Exam Preset:** Navigate directly to our integrated ${exam.name} template window.
2.  **Upload Your Files Securely:** Import your digital passport photo or signature scan.
3.  **Use the Split-Spec Selector:** Smoothly toggle between the dedicated Photo and Signature tabs to load the specific pixel frameworks.
4.  **Align with Biometric Guides:** Utilize our visual overlay guidelines to perfectly center your face contour or focus your signature.
5.  **Iterative Multi-Pass Squeeze:** The system locks the correct aspect ratio and crops the pixels while applying progressive client-side compression to compress the file under the maximum KB limits instantly.

## The Privacy Shield: Why Client-Side Local Processing Matters

Uploading intimate academic certificates, identity cards, signature sketches, and biometric portraits to general cloud-based converters online exposes your sensitive biographical profile to permanent storage on external hostings.

> **Warning:** Using obscure, free third-party file converters online poses extreme privacy hazards. Those servers frequently cache uploaded files in permanent directories. Real-time client-side processors are the only bulletproof way to secure precious records like passports, PANs, and signatures.

PasteDocs is designed directly as a serverless local utility. Your documents and photographs are read and processed entirely via browser sandboxed APIs. No packet of data is transmitted, cached, or saved on any remote database, offering absolute bank-level security for your personal details.
  `.trim();

  return {
    slug: exam.slug,
    title: `How to Resize ${exam.name} Photo and Signature - Step-by-Step Guide`,
    excerpt: `Avoid application rejection on the ${exam.authority} portal. A complete guiding checklist for sizing photos, scanned signatures, and postcards for ${exam.name}.`,
    category: `${exam.category || 'Govt'} Exams`,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    content: body
  };
});

// 3. Document Articles
const documentsList = ALL_DOCUMENTS.map(doc => {
  const format = doc.photo?.format?.toUpperCase() || 'JPEG / PDF';
  const sizeCap = doc.photo?.maxKB ? `${doc.photo.maxKB} KB` : 'Standard Optimized';

  const body = `
## The Core Dilemma: Why Document Rejections Happen

When processing official identity records like a ${doc.name} online, submitting credentials is often met with immense formatting anxiety. Official filing platforms use aggressive server-side automated rejection bots that rigorously analyze scans for high clarity, correct page geometry, and rigid KB targets. If your file size crosses the strict parameters, the submission fails with generic error logs, leading to massive friction.

Most users default to taking a quick smartphone photo, resulting in uneven page corners, diagonal angles, and file sizes ranging in multiple megabytes. Because portals cannot parse such heavy files or distorted dimensions, registration candidates face constant re-upload loops, risking missed filing deadlines and administrative bottlenecks.

## Official Blueprint: Understanding Mapped Specifications

Our local web platform resolves this challenge by pre-loading the exact administrative rules required for your ${doc.name} online:

*   **Compliant File Formats:** ${format}
*   **Target File Size Limits:** Max ${sizeCap}
*   **Dimension Aspect Controls:** ${doc.photo?.width ? `${doc.photo.width} x ${doc.photo.height} px` : 'Preserves original document proportions'}
*   **Digital Signature Sizing:** ${doc.signature ? `${doc.signature.width}x${doc.signature.height}px, max ${doc.signature.maxKB}KB` : 'Not required'}

> **Pro Tip:** Make sure your optical scanner resolution is configured to 300 DPI, and flatten the document completely. Avoid snapping images on glossy surfaces with direct overhead lighting to prevent white reflections on text areas. Check that all edges are visible with substantial background contrast.

## Step-by-Step Optimization Roadmap

Here is how you can crop, format, and compress your ${doc.name} within our local, secure client-side panel:

1.  **Import Your Document:** Open our tool and upload your raw file; the canvas loads it locally in milliseconds.
2.  **Confirm Target Presets:** The system automatically locks the correct size thresholds for ${doc.name}.
3.  **Adjust the Perspective Crop:** Use the smart positioning points to frame only the document area, purging redundant background objects.
4.  **Run Progressive Downscaling:** The resizer downscales the resolution to keep the text razor-sharp while computing the exact file size.
5.  **Reliable Sized Download:** Click "Process Document" and obtain the modified file immediately.

## The Privacy Shield: Why Client-Side Local Processing Matters

When dealing with highly sensitive primary credentials like ${doc.name}, security is of paramount importance. Entering your official ID or scanning document pages into random cloud converters risks your biometric details, identity numbers, and signatures being permanently archived by untrusted servers.

> **Warning:** Using obscure, free third-party file converters online poses extreme privacy hazards. Those servers frequently cache uploaded files in permanent directories. Real-time client-side processors are the only bulletproof way to secure precious records like passports, PANs, and signatures.

PasteDocs executes all tasks strictly offline. Your documents and papers never leave the security of your local desktop or phone. Using browser-level client canvas scripts, your privacy is fully air-gapped from the internet.
  `.trim();

  return {
    slug: doc.slug,
    title: `How to Format and Clear Your ${doc.name} Online`,
    excerpt: `A complete local formatting guide for your ${doc.name} application. Learn to correct dimensions, compress layout size, and format image files securely.`,
    category: 'Identity Documents',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800',
    content: body
  };
});

// 4. Visa Articles
const visasList = ALL_VISAS.map(visa => {
  const background = visa.photo?.background || 'white';
  const maxKB = visa.photo?.maxKB || 100;

  const body = `
## The Core Dilemma: Why Document Rejections Happen

Submitting a visa application for ${visa.country} brings significant formatting anxiety. Consular visa portals run rigorous server-side automated rejection bots configured with biometric verification scanners. If the uploaded portrait contains wrong head ratios, wrong dimensions, or incorrect compression qualities, passport checkers dismiss the registration instantly, stalling travel timelines and costing hefty appointment re-booking fees.

Biometric software maps precise coordinates on your face—including eye pupil spacing and chin alignments. Squeezing or cropping images via standard tools can easily stretch those dimensions, leading to visa rejection on grounds of falsified photo identities. Ensuring pixel-perfect accuracy under strict dimensions constraints is the only path to a smooth approval.

## Official Blueprint: Understanding Mapped Specifications

We have loaded the official, consular-grade specifications for ${visa.country} directly into our local optimizer matrix:

*   **Consular Backdrop Standard:** Solid plain ${background} background
*   **Biometric Dimension Coordinates:** ${visa.photo?.width || 350} x ${visa.photo?.height || 450} px
*   **File Size Standard Constraints:** ${visa.photo?.minKB ? `${visa.photo.minKB}KB` : '10KB'} to ${maxKB}KB
*   **Target Formats:** JPEG / JPG (Highly optimized file headers)

> **Pro Tip:** When capturing biometric visa snaps under embassy rules, never smile or tilt your chin. Hold a neutral expression, keep your eyes open, and look straight into the camera lens with both ears clearly visible. Avoid flashy accessories.

## Step-by-Step Optimization Roadmap

Process your biometric file safely using our direct local resizing grid:

1.  **Load the Visa Template:** Click the ${visa.country} option from our country catalog.
2.  **Select Your Passport Photo:** Browse your storage to import your raw camera capture.
3.  **Align with Face-Guides:** Adjust your face with our visual biometric overlay so head size is perfectly proportioned.
4.  **Multi-Pass Compression:** Our engine locks the exact ratio and applies continuous quality adjustments to squeeze the file below ${maxKB}KB.
5.  **Ready for Immigration Portals:** Download your certified JPG file. It is now completely compliant and ready to pass embassy automated checks.

## The Privacy Shield: Why Client-Side Local Processing Matters

Visa applications contain highly confidential biometric information, including high-resolution face portraits and signature scans. Uploading these visuals to cloud-based cropping servers leaves you vulnerable to image theft, profiling, and digital footprint tracing.

> **Warning:** Using obscure, free third-party file converters online poses extreme privacy hazards. Those servers frequently cache uploaded files in permanent directories. Real-time client-side processors are the only bulletproof way to secure precious records like passports, PANs, and signatures.

PasteDocs maintains deep compliance with security-first ideals. Sizing, aspect-ratio correction, and compression run fully client-side on your local browser engine. No visual bytes ever cross the internet, keeping your vital identity completely secure.
  `.trim();

  return {
    slug: visa.slug,
    title: `How to Format and Resize ${visa.country} Visa Photo Online`,
    excerpt: `Complete biometric specifications and formatting tutorial for ${visa.country} visa and passport photos. Check dimensions, background color, and head sizing rules.`,
    category: 'Visa Photos',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800',
    content: body
  };
});

// Combined lists sorted alphabetically by slug for absolute indexing stability
const dynamicBlogsRaw = [
  ...toolsList,
  ...examsList,
  ...documentsList,
  ...visasList
];

export const dynamicBlogsSorted = [...dynamicBlogsRaw].sort((a, b) => a.slug.localeCompare(b.slug));

// Map the stable indices to daily release dates starting May 24, 2026
export const dynamicBlogs: BlogPost[] = dynamicBlogsSorted.map((item, index) => {
  const dateStr = getToolReleaseDate(index);
  return {
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    date: dateStr,
    category: item.category,
    image: item.image,
    readTime: '4 min read',
    content: item.content
  };
});

// --- LOAD LOGIC ---

// Dynamically discover all markdown files from the filesystem
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const modules = (import.meta as any).glob('/src/content/blogs/*.md', { query: '?raw', import: 'default' });
  const posts: BlogPost[] = [];

  for (const path in modules) {
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const rawContent = (await modules[path]()) as string;
    const { metadata, content } = parseFrontmatter(rawContent);

    posts.push({
      slug,
      title: metadata.title || 'Untitled Post',
      excerpt: metadata.excerpt || '',
      date: metadata.date || '2026-05-24',
      category: metadata.category || 'Guides',
      image: metadata.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
      readTime: metadata.readTime || '4 min read',
      content,
      metaTitle: metadata.metaTitle || undefined,
      metaDesc: metadata.metaDesc || undefined,
    });
  }

  // Inject dynamically simulated/scheduled posts
  posts.push(...dynamicBlogs);

  // Sort posts by date descending
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

// Load and filter only published blog posts (date <= today)
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  const todayStr = getLocalDateString();
  return allPosts.filter(post => post.date <= todayStr);
}

// Get a single published post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const allPosts = await getAllBlogPosts();
  const post = allPosts.find(p => p.slug === slug);
  if (!post) return null;

  // Make sure we only return published posts (prevents leaks of scheduled items)
  const todayStr = getLocalDateString();
  if (post.date > todayStr) return null;

  return post;
}
