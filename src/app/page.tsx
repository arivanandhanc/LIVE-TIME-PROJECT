import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { SITE, TOOLS, FEATURED_TOOLS } from '@/lib/site';
import { ARTICLES_SORTED } from '@/lib/blog';
import HeroSearch from '@/components/HeroSearch';
import { ToolCard } from '@/components/ui';

export const metadata: Metadata = buildMetadata({
  title: 'Time Tools for Global Teams',
  description: SITE.description,
  path: '/',
  keywords: ['timezone converter', 'world clock', 'meeting planner', 'time difference', 'global team planner'],
});

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-brand-100 bg-gradient-to-b from-brand-50/60 to-white dark:border-white/5 dark:from-white/[0.03] dark:to-transparent">
        <div className="container py-16 text-center sm:py-24">
          <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            Time Tools for <span className="text-brand-600 dark:text-brand-300">Global Teams</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-brand-500">
            Convert timezones, plan meetings across countries, and find overlapping working hours —
            free, fast, and private. Everything runs in your browser.
          </p>
          <div className="mt-8">
            <HeroSearch />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/timezone-converter" className="btn-primary">Timezone Converter</Link>
            <Link href="/meeting-planner" className="btn-ghost">Plan a Meeting</Link>
            <Link href="/world-clock" className="btn-ghost">World Clock</Link>
          </div>
        </div>
      </section>

      {/* Featured tools */}
      <section className="container py-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Everything you need to coordinate across timezones</h2>
          <p className="mt-2 text-brand-500">A focused toolkit for distributed and remote teams.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_TOOLS.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>

      {/* All utilities */}
      <section className="border-y border-brand-100 bg-brand-50/40 py-16 dark:border-white/5 dark:bg-white/[0.02]">
        <div className="container">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-bold tracking-tight">More time utilities</h2>
            <Link href="/tools" className="text-sm text-brand-600 hover:underline dark:text-brand-300">View all →</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {TOOLS.filter((t) => !t.featured).map((t) => (
              <Link
                key={t.slug}
                href={`/${t.slug}`}
                className="flex items-center gap-2 rounded-lg border border-brand-200/70 bg-white px-3 py-2.5 text-sm font-medium transition hover:border-brand-300 hover:shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
              >
                <span aria-hidden>{t.icon}</span>
                {t.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="container py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: '⚡', title: 'Fast & static', body: 'Statically generated and served from the edge. No spinners, no waiting.' },
            { icon: '🔒', title: 'Private by design', body: 'Every calculation happens locally in your browser. Your data never leaves your device.' },
            { icon: '📴', title: 'Works offline', body: 'Installable as an app with offline support for the core calculators.' },
          ].map((f) => (
            <div key={f.title} className="text-center">
              <span aria-hidden className="text-3xl">{f.icon}</span>
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-brand-500">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest from blog */}
      <section className="border-t border-brand-100 bg-brand-50/40 py-16 dark:border-white/5 dark:bg-white/[0.02]">
        <div className="container">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-bold tracking-tight">From the blog</h2>
            <Link href="/blog" className="text-sm text-brand-600 hover:underline dark:text-brand-300">All articles →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {ARTICLES_SORTED.slice(0, 3).map((a) => (
              <Link key={a.slug} href={`/blog/${a.slug}`} className="card">
                <p className="text-xs font-medium uppercase tracking-wide text-brand-400">{a.category}</p>
                <h3 className="mt-1 font-semibold">{a.title}</h3>
                <p className="mt-1 text-sm text-brand-500 line-clamp-2">{a.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
