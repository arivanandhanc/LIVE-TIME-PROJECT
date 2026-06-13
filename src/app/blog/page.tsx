import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ARTICLES_SORTED } from '@/lib/blog';
import { Breadcrumbs, PageHeader } from '@/components/ui';

export const metadata: Metadata = buildMetadata({
  title: 'Blog — Timezones, Remote Work & Global Teams',
  description:
    'Guides and articles on timezone management, remote work, meeting planning, UTC, daylight saving, and international collaboration.',
  path: '/blog',
  keywords: ['remote work blog', 'timezone management', 'global teams', 'meeting planning'],
});

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function BlogIndex() {
  const categories = Array.from(new Set(ARTICLES_SORTED.map((a) => a.category)));
  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }]} />
      <PageHeader
        icon="✍️"
        title="The Blog"
        subtitle="Practical writing on timezones, remote work, and running effective global teams."
      />
      <p className="mb-6 flex flex-wrap gap-2 text-xs">
        {categories.map((c) => (
          <span key={c} className="rounded-full bg-brand-100 px-2.5 py-1 font-medium text-brand-700 dark:bg-white/10 dark:text-brand-200">
            {c}
          </span>
        ))}
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        {ARTICLES_SORTED.map((a) => (
          <Link key={a.slug} href={`/blog/${a.slug}`} className="card flex flex-col">
            <div className="flex items-center gap-2 text-xs text-brand-400">
              <span className="font-medium uppercase tracking-wide text-brand-500">{a.category}</span>
              <span>·</span>
              <time dateTime={a.date}>{formatDate(a.date)}</time>
              <span>·</span>
              <span>{a.readMinutes} min read</span>
            </div>
            <h2 className="mt-2 text-lg font-semibold leading-snug">{a.title}</h2>
            <p className="mt-1 text-sm text-brand-500">{a.description}</p>
            <span className="mt-3 text-sm font-medium text-brand-600 dark:text-brand-300">Read article →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
