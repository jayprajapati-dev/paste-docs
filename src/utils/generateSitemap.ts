import fs from 'fs';
import path from 'path';

// Single source of truth — ALL_TOOLS is the canonical list of tool slugs.
import { ALL_TOOLS } from '../data/toolData';
import { ALL_EXAMS } from '../data/examData';
import { ALL_DOCUMENTS } from '../data/documentData';
import { ALL_VISAS } from '../data/visaData';

const domain = 'https://pastedocs.vercel.app';

// IndexNow key — hosted at public/{key}.txt, used to auto-ping search engines
// (Bing, Yandex, and eventually Google) when new content is published.
const INDEXNOW_KEY = 'd9f08ac2fbe74203a29972770cc358c9';

// Only high-value static pages. /share and /stats are intentionally excluded
// (low-value, dilute crawl budget, not useful for searchers).
const staticPages: { path: string; priority: string; changefreq: string }[] = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/tools', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.5', changefreq: 'monthly' },
  { path: '/terms', priority: '0.5', changefreq: 'monthly' },
  { path: '/disclaimer', priority: '0.5', changefreq: 'monthly' }
];

// ─────────────────────────────────────────────────────────────────────────────
// Collect ALL URLs for both sitemap and IndexNow ping
// ─────────────────────────────────────────────────────────────────────────────
function collectAllUrls(): string[] {
  const urls: string[] = [];
  staticPages.forEach((p) => urls.push(`${domain}${p.path}`));
  ALL_TOOLS.forEach((t) => urls.push(`${domain}/tool/${t.slug}`));
  ALL_EXAMS.forEach((e) => urls.push(`${domain}/exam/${e.slug}`));
  ALL_DOCUMENTS.forEach((d) => urls.push(`${domain}/doc/${d.slug}`));
  ALL_VISAS.forEach((v) => urls.push(`${domain}/visa/${v.slug}`));

  // Blog posts
  const blogsDir = path.resolve(process.cwd(), 'src', 'content', 'blogs');
  if (fs.existsSync(blogsDir)) {
    fs.readdirSync(blogsDir).forEach((file) => {
      if (file.endsWith('.md')) urls.push(`${domain}/blog/${file.replace('.md', '')}`);
    });
  }
  return urls;
}

// ─────────────────────────────────────────────────────────────────────────────
// Generate sitemap.xml — lastmod auto-updates to today's date on every build
// ─────────────────────────────────────────────────────────────────────────────
function generateSitemap(urls: string[]) {
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Static Pages
  staticPages.forEach((page) => {
    xml += `
  <url>
    <loc>${domain}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
  </url>`;
  });

  // Tool pages
  ALL_TOOLS.forEach((tool) => {
    xml += `
  <url>
    <loc>${domain}/tool/${tool.slug}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>`;
  });

  // Exam pages
  ALL_EXAMS.forEach((exam) => {
    xml += `
  <url>
    <loc>${domain}/exam/${exam.slug}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.8</priority>
    <changefreq>weekly</changefreq>
  </url>`;
  });

  // Document pages
  ALL_DOCUMENTS.forEach((doc) => {
    xml += `
  <url>
    <loc>${domain}/doc/${doc.slug}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.7</priority>
    <changefreq>monthly</changefreq>
  </url>`;
  });

  // Visa pages
  ALL_VISAS.forEach((visa) => {
    xml += `
  <url>
    <loc>${domain}/visa/${visa.slug}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.7</priority>
    <changefreq>monthly</changefreq>
  </url>`;
  });

  // Blog posts
  const blogsDir = path.resolve(process.cwd(), 'src', 'content', 'blogs');
  if (fs.existsSync(blogsDir)) {
    fs.readdirSync(blogsDir).forEach((file) => {
      if (file.endsWith('.md')) {
        const slug = file.replace('.md', '');
        xml += `
  <url>
    <loc>${domain}/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.7</priority>
    <changefreq>monthly</changefreq>
  </url>`;
      }
    });
  }

  xml += `
</urlset>`;

  const outputPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`✓ Sitemap: ${urls.length} URLs, lastmod=${today}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Generate RSS feed (rss.xml) for blog posts — Google subscribes to RSS
// for faster content discovery. Updated automatically on each build.
// ─────────────────────────────────────────────────────────────────────────────
function generateRSSFeed() {
  const blogsDir = path.resolve(process.cwd(), 'src', 'content', 'blogs');
  if (!fs.existsSync(blogsDir)) return;

  const today = new Date().toUTCString();
  const posts: { slug: string; title: string; excerpt: string; date: string }[] = [];

  fs.readdirSync(blogsDir).forEach((file) => {
    if (!file.endsWith('.md')) return;
    const slug = file.replace('.md', '');
    const raw = fs.readFileSync(path.join(blogsDir, file), 'utf8');
    const titleMatch = raw.match(/title:\s*"([^"]+)"/);
    const excerptMatch = raw.match(/excerpt:\s*"([^"]+)"/);
    const dateMatch = raw.match(/date:\s*"([^"]+)"/);
    posts.push({
      slug,
      title: titleMatch ? titleMatch[1] : slug,
      excerpt: excerptMatch ? excerptMatch[1] : '',
      date: dateMatch ? dateMatch[1] : today,
    });
  });

  // Sort by date descending
  posts.sort((a, b) => b.date.localeCompare(a.date));

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>PasteDocs Blog — Photo & Document Formatting Guides</title>
    <link>${domain}/blog</link>
    <description>Guides on photo resizing, signature compression, document formatting for Indian government exams (NEET, SSC, UPSC) and visa applications.</description>
    <language>en-IN</language>
    <lastBuildDate>${today}</lastBuildDate>
    <atom:link href="${domain}/rss.xml" rel="self" type="application/rss+xml" />`;

  for (const post of posts) {
    xml += `
    <item>
      <title>${post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</title>
      <link>${domain}/blog/${post.slug}</link>
      <guid isPermaLink="true">${domain}/blog/${post.slug}</guid>
      <description>${post.excerpt.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`;
  }

  xml += `
  </channel>
</rss>`;

  const outputPath = path.resolve(process.cwd(), 'public', 'rss.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`✓ RSS feed: ${posts.length} blog posts`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Ping IndexNow — auto-notifies Bing/Yandex (and soon Google) of new/changed
// URLs so they get crawled within hours instead of days/weeks.
// Runs automatically after sitemap generation during build.
// ─────────────────────────────────────────────────────────────────────────────
async function pingIndexNow(urls: string[]) {
  // IndexNow accepts up to 10,000 URLs per request. We have ~188 — one batch.
  const payload = {
    host: 'pastedocs.vercel.app',
    key: INDEXNOW_KEY,
    keyLocation: `${domain}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });
    if (response.ok || response.status === 202 || response.status === 200) {
      console.log(`✓ IndexNow: pinged ${urls.length} URLs (status ${response.status})`);
    } else {
      console.log(`⚠ IndexNow: status ${response.status} (non-fatal — will retry next build)`);
    }
  } catch (err: any) {
    // Non-fatal — the build should not fail if IndexNow is unreachable.
    console.log(`⚠ IndexNow: ${err.message || 'network error'} (non-fatal)`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main — generate sitemap + RSS, then ping IndexNow
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  const urls = collectAllUrls();
  generateSitemap(urls);
  generateRSSFeed();

  // Ping IndexNow (async, non-blocking — build won't fail if it's unreachable)
  // Skip during development (only ping on production builds via CI)
  if (process.env.SKIP_INDEXNOW !== 'true') {
    await pingIndexNow(urls);
  }

  console.log(`\nDone. ${urls.length} URLs generated and pinged.`);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
