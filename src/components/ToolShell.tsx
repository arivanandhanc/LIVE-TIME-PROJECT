import { ReactNode } from 'react';
import { ToolMeta, TOOLS } from '@/lib/site';
import { Breadcrumbs, PageHeader, Faq, RelatedTools, Prose } from './ui';
import AdSlot from './AdSlot';
import JsonLd from './JsonLd';
import { softwareAppSchema } from '@/lib/seo';

/**
 * Consistent layout for every tool page: breadcrumbs, heading, the interactive
 * tool, an ad slot, optional explainer content, FAQs and related tools — plus
 * WebApplication structured data.
 */
export default function ToolShell({
  tool,
  children,
  faqs,
  about,
  related,
}: {
  tool: ToolMeta;
  children: ReactNode;
  faqs?: { q: string; a: string }[];
  about?: ReactNode;
  related?: string[];
}) {
  const relatedTools: ToolMeta[] = (related ?? TOOLS.filter((t) => t.featured && t.slug !== tool.slug).slice(0, 3).map((t) => t.slug))
    .map((slug) => TOOLS.find((t) => t.slug === slug))
    .filter(Boolean)
    .slice(0, 3) as ToolMeta[];

  return (
    <div className="container py-8">
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Tools', path: '/tools' },
          { name: tool.title, path: `/${tool.slug}` },
        ]}
      />
      <PageHeader icon={tool.icon} title={tool.title} subtitle={tool.description} />

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">{children}</div>
        <aside className="space-y-6">
          <AdSlot className="min-h-[250px]" />
          <div className="card">
            <h2 className="text-sm font-semibold">About this tool</h2>
            <p className="mt-2 text-sm text-brand-500">{tool.description}</p>
            <p className="mt-2 text-xs text-brand-400">
              Runs entirely in your browser. Daylight saving is handled automatically using the IANA
              timezone database.
            </p>
          </div>
        </aside>
      </div>

      {about && (
        <section className="mt-12 max-w-3xl">
          <Prose>{about}</Prose>
        </section>
      )}

      {faqs && faqs.length > 0 && <Faq faqs={faqs} />}

      <RelatedTools tools={relatedTools} />

      <JsonLd data={softwareAppSchema(tool.title, tool.description, `/${tool.slug}`)} />
    </div>
  );
}
