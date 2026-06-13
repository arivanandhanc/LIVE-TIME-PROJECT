import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { Breadcrumbs, PageHeader, Prose } from '@/components/ui';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: `Privacy policy for ${SITE.name}. We process nothing on a server; analytics are optional and consent-based.`,
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Privacy', path: '/privacy' }]} />
      <PageHeader icon="🔒" title="Privacy Policy" subtitle="Short version: your data stays on your device." />
      <div className="max-w-3xl">
        <Prose>
          <h2>What we collect</h2>
          <p>
            The tools on this site run entirely in your browser. Cities you enter, dates you pick,
            and times you convert are never transmitted to or stored on a server.
          </p>
          <h2>Local storage</h2>
          <p>
            Some tools (such as the World Clock) save your preferences in your browser’s local
            storage so they’re there when you return. This never leaves your device and you can clear
            it any time.
          </p>
          <h2>Analytics &amp; cookies</h2>
          <p>
            We use privacy-respecting, anonymised analytics only after you accept the cookie banner.
            Decline and no analytics cookies are set. We anonymise IP addresses and do not sell data.
          </p>
          <h2>Advertising</h2>
          <p>
            This site may display advertising to support free hosting. Ad partners may use cookies in
            accordance with their own policies and your consent choices.
          </p>
          <h2>Contact</h2>
          <p>For any privacy question, reach out via the site’s contact channels.</p>
        </Prose>
      </div>
    </div>
  );
}
