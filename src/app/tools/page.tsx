import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { TOOLS } from '@/lib/site';
import { Breadcrumbs, PageHeader, ToolCard } from '@/components/ui';

export const metadata: Metadata = buildMetadata({
  title: 'All Time Tools',
  description:
    'The complete set of free time and timezone tools — converters, planners, world clock, and date calculators for global teams.',
  path: '/tools',
  keywords: ['time tools', 'timezone tools', 'date calculators'],
});

export default function ToolsPage() {
  return (
    <div className="container py-8">
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Tools', path: '/tools' }]} />
      <PageHeader icon="🧰" title="All Time Tools" subtitle="Every calculator and planner on the site, in one place. All free, all private." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((t) => (
          <ToolCard key={t.slug} tool={t} />
        ))}
      </div>
    </div>
  );
}
