import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ARTICLES, ARTICLES_SORTED, articleBySlug, Block } from '@/lib/blog';
import { buildMetadata, articleSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    type: 'article',
    publishedTime: article.date,
    keywords: [article.category.toLowerCase(), 'remote work', 'timezones'],
  });
}

function renderBlock(b: Block, i: number) {
  switch (b.t) {
    case 'h2':
      return <h2 key={i} className="mt-8 text-xl font-semibold tracking-tight text-brand-950 dark:text-white">{b.text}</h2>;
    case 'p':
      return <p key={i}>{b.text}</p>;
    case 'quote':
      return <blockquote key={i} className="border-l-4 border-brand-300 pl-4 italic text-brand-600 dark:text-brand-300">{b.text}</blockquote>;
    case 'ul':
      return (
        <ul key={i} className="list-disc space-y-1 pl-5">
          {b.items.map((it, j) => <li key={j}>{it}</li>)}
        </ul>
      );
    case 'ol':
      return (
        <ol key={i} className="list-decimal space-y-1 pl-5">
          {b.items.map((it, j) => <li key={j}>{it}</li>)}
        </ol>
      );
  }
}

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();

  const more = ARTICLES_SORTED.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article className="container py-8">
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: article.title, path: `/blog/${article.slug}` },
        ]}
      />

      <header className="mx-auto max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-500">{article.category}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{article.title}</h1>
        <p className="mt-3 text-brand-500">{article.description}</p>
        <p className="mt-3 text-sm text-brand-400">
          <time dateTime={article.date}>{formatDate(article.date)}</time> · {article.readMinutes} min read
        </p>
      </header>

      <div className="mx-auto mt-8 max-w-3xl space-y-4 text-[15px] leading-relaxed text-brand-700 dark:text-brand-200">
        {article.body.map(renderBlock)}
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <AdSlot className="min-h-[120px]" />
      </div>

      <section className="mx-auto mt-12 max-w-3xl">
        <h2 className="text-xl font-semibold tracking-tight">Keep reading</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {more.map((a) => (
            <Link key={a.slug} href={`/blog/${a.slug}`} className="card">
              <p className="text-xs uppercase tracking-wide text-brand-400">{a.category}</p>
              <h3 className="mt-1 text-sm font-semibold leading-snug">{a.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <JsonLd data={articleSchema(article.title, article.description, `/blog/${article.slug}`, article.date)} />
    </article>
  );
}
