import Link from 'next/link';
import { SITE, TOOLS } from '@/lib/site';

const LEARN = [
  { href: '/blog/what-is-utc', label: 'What is UTC?' },
  { href: '/blog/what-is-gmt', label: 'What is GMT?' },
  { href: '/blog/understanding-timezones', label: 'Understanding Timezones' },
  { href: '/blog/daylight-saving-time-explained', label: 'Daylight Saving Time' },
  { href: '/blog/international-meeting-planning-guide', label: 'Meeting Planning Guide' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-brand-200/60 bg-brand-50/40 dark:border-white/10 dark:bg-white/[0.02]">
      <div className="container grid gap-8 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <span aria-hidden>🕒</span> {SITE.name}
          </div>
          <p className="mt-3 max-w-xs text-sm text-brand-500">{SITE.tagline}. Free, fast, and private — all calculations run in your browser.</p>
        </div>

        <nav aria-label="Popular tools">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-500">Popular Tools</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {TOOLS.filter((t) => t.featured).slice(0, 6).map((t) => (
              <li key={t.slug}>
                <Link href={`/${t.slug}`} className="text-brand-700 hover:text-brand-950 dark:text-brand-200 dark:hover:text-white">
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Learn">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-500">Learn</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {LEARN.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-brand-700 hover:text-brand-950 dark:text-brand-200 dark:hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/blog" className="text-brand-700 hover:text-brand-950 dark:text-brand-200 dark:hover:text-white">All Articles</Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Site">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-500">Site</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/tools" className="text-brand-700 hover:text-brand-950 dark:text-brand-200 dark:hover:text-white">All Tools</Link></li>
            <li><Link href="/about" className="text-brand-700 hover:text-brand-950 dark:text-brand-200 dark:hover:text-white">About</Link></li>
            <li><Link href="/privacy" className="text-brand-700 hover:text-brand-950 dark:text-brand-200 dark:hover:text-white">Privacy</Link></li>
            <li><Link href="/sitemap.xml" className="text-brand-700 hover:text-brand-950 dark:text-brand-200 dark:hover:text-white">Sitemap</Link></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-brand-200/60 py-5 dark:border-white/10">
        <div className="container flex flex-col items-center justify-between gap-2 text-xs text-brand-500 sm:flex-row">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <p>Built with Next.js · No tracking without consent · Works offline</p>
        </div>
      </div>
    </footer>
  );
}
