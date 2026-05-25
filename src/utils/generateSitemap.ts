import fs from 'fs';
import path from 'path';

// Load our multi-category structured data
import { centralExams } from '../data/india/centralExams';
import { stateExams } from '../data/india/stateExams';
import { indiaDocuments } from '../data/india/documents';
import { visaRequirements } from '../data/world/visaRequirements';
import { imageTools } from '../data/tools/imageTools';

const domain = 'https://pastedocs.vercel.app';

const staticPages = [
  '',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/share',
  '/stats',
  '/tools',
  '/blog'
];

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Static Pages
  staticPages.forEach((page) => {
    xml += `
  <url>
    <loc>${domain}${page}</loc>
    <lastmod>${today}</lastmod>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
    <changefreq>monthly</changefreq>
  </url>`;
  });

  // Image Helper Tools
  imageTools.forEach((tool) => {
    xml += `
  <url>
    <loc>${domain}/tool/${tool.slug}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>`;
  });

  // Central Exams
  centralExams.forEach((exam) => {
    xml += `
  <url>
    <loc>${domain}/exam/${exam.slug}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.8</priority>
    <changefreq>weekly</changefreq>
  </url>`;
  });

  // State Exams
  stateExams.forEach((exam) => {
    xml += `
  <url>
    <loc>${domain}/exam/${exam.slug}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.8</priority>
    <changefreq>weekly</changefreq>
  </url>`;
  });

  // India Documents
  indiaDocuments.forEach((doc) => {
    xml += `
  <url>
    <loc>${domain}/doc/${doc.slug}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
  </url>`;
  });

  // Visa Requirements
  visaRequirements.forEach((visa) => {
    xml += `
  <url>
    <loc>${domain}/visa/${visa.slug}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
  </url>`;
  });

  // --- Dynamic and Static Blog URLs ---

  // 1. Static Markdown Blog Posts (from src/content/blogs/*.md)
  const blogsDir = path.resolve(process.cwd(), 'src', 'content', 'blogs');
  if (fs.existsSync(blogsDir)) {
    const files = fs.readdirSync(blogsDir);
    files.forEach((file) => {
      if (file.endsWith('.md')) {
        const slug = file.replace('.md', '');
        xml += `
  <url>
    <loc>${domain}/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
  </url>`;
      }
    });
  }

  // 2. Dynamic Blog Posts (one post per tool, exam, document, visa)
  imageTools.forEach((tool) => {
    xml += `
  <url>
    <loc>${domain}/blog/${tool.slug}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.8</priority>
    <changefreq>weekly</changefreq>
  </url>`;
  });

  centralExams.forEach((exam) => {
    xml += `
  <url>
    <loc>${domain}/blog/${exam.slug}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.8</priority>
    <changefreq>weekly</changefreq>
  </url>`;
  });

  stateExams.forEach((exam) => {
    xml += `
  <url>
    <loc>${domain}/blog/${exam.slug}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.8</priority>
    <changefreq>weekly</changefreq>
  </url>`;
  });

  indiaDocuments.forEach((doc) => {
    xml += `
  <url>
    <loc>${domain}/blog/${doc.slug}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.8</priority>
    <changefreq>weekly</changefreq>
  </url>`;
  });

  visaRequirements.forEach((visa) => {
    xml += `
  <url>
    <loc>${domain}/blog/${visa.slug}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.8</priority>
    <changefreq>weekly</changefreq>
  </url>`;
  });

  xml += `
</urlset>`;

  const outputPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`Sitemap generated successfully at ${outputPath}`);

  console.log('Skipping IndexNow API ping during build. To be configured securely in deployment pipeline.');
}

generateSitemap();
