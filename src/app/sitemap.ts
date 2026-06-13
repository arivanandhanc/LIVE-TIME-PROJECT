import type { MetadataRoute } from 'next';
import { SITE, TOOLS } from '@/lib/site';
import { ARTICLES } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = SITE.url;

  const staticPages = ['', '/tools', '/blog', '/about', '/privacy'].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.7,
  }));

  const toolPages = TOOLS.map((t) => ({
    url: `${base}/${t.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: t.featured ? 0.9 : 0.6,
  }));

  const articlePages = ARTICLES.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...toolPages, ...articlePages];
}
