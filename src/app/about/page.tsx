import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { Breadcrumbs, PageHeader, Prose } from '@/components/ui';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: `About ${SITE.name} — free, fast, privacy-first time tools for global teams.`,
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]} />
      <PageHeader icon="ℹ️" title={`About ${SITE.name}`} subtitle={SITE.tagline} />
      <div className="max-w-3xl">
        <Prose>
          <p>
            {SITE.name} is a free collection of time and timezone tools built for people who work
            across borders. Whether you’re scheduling a meeting between three continents, checking if
            a client’s office is open, or just keeping track of a friend’s local time, the goal is to
            make it instant and effortless.
          </p>
          <h2>Principles</h2>
          <ul>
            <li><strong>Fast:</strong> statically generated and served from the edge — no loading spinners.</li>
            <li><strong>Private:</strong> every calculation runs in your browser. Nothing you type is sent anywhere.</li>
            <li><strong>Accurate:</strong> daylight saving and unusual offsets are handled via the IANA timezone database.</li>
            <li><strong>Accessible:</strong> keyboard-friendly, screen-reader-friendly, and built to work offline.</li>
          </ul>
          <h2>How it’s built</h2>
          <p>
            The site is built with Next.js and TypeScript, requires no backend or database, and is
            deployable to any static host. All timezone math is powered by the browser’s native Intl
            APIs.
          </p>
        </Prose>
      </div>
    </div>
  );
}
