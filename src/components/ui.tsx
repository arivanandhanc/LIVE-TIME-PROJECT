import Link from 'next/link';
import { ReactNode } from 'react';
import { ToolMeta } from '@/lib/site';
import JsonLd from './JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/seo';

export function PageHeader({
  icon,
  title,
  subtitle,
}: {
  icon?: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-8">
      <h1 className="flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
        {icon && <span aria-hidden>{icon}</span>}
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-brand-500">{subtitle}</p>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-brand-400">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((it, i) => (
            <li key={it.path} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden>/</span>}
              {i === items.length - 1 ? (
                <span className="text-brand-600 dark:text-brand-300">{it.name}</span>
              ) : (
                <Link href={it.path} className="hover:text-brand-700 dark:hover:text-brand-200">
                  {it.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function Faq({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <section className="mt-12" aria-label="Frequently asked questions">
      <h2 className="text-xl font-semibold tracking-tight">Frequently asked questions</h2>
      <div className="mt-4 divide-y divide-brand-200/70 dark:divide-white/10">
        {faqs.map((f) => (
          <details key={f.q} className="group py-3">
            <summary className="cursor-pointer list-none font-medium text-brand-900 marker:hidden dark:text-brand-100">
              <span className="flex items-center justify-between gap-3">
                {f.q}
                <span aria-hidden className="text-brand-400 transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-2 text-sm text-brand-500">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqSchema(faqs)} />
    </section>
  );
}

export function ToolCard({ tool }: { tool: ToolMeta }) {
  return (
    <Link href={`/${tool.slug}`} className="card group flex flex-col">
      <span aria-hidden className="text-2xl">{tool.icon}</span>
      <h3 className="mt-3 font-semibold text-brand-950 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-200">
        {tool.title}
      </h3>
      <p className="mt-1 text-sm text-brand-500">{tool.short}</p>
    </Link>
  );
}

export function RelatedTools({ tools }: { tools: ToolMeta[] }) {
  if (tools.length === 0) return null;
  return (
    <Section title="Related tools">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <ToolCard key={t.slug} tool={t} />
        ))}
      </div>
    </Section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 text-[15px] leading-relaxed text-brand-700 dark:text-brand-200 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-brand-950 dark:[&_h2]:text-white [&_a]:text-brand-600 [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5">
      {children}
    </div>
  );
}
