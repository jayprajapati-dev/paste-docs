// PasteDocs blog loader.
//
// Only hand-written markdown posts in src/content/blogs/*.md are published.
// The previous auto-generated "dynamic blogs" (one per tool/exam/visa/doc slug)
// have been REMOVED — they were near-duplicate template-stuffed pages that
// caused AdSense "low value content" rejections and Google
// "Crawled - currently not indexed" issues.

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
  const todayStr = getLocalDateString();
  return post.date <= todayStr ? post : null;
}
