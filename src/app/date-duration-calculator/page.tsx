import type { Metadata } from 'next';
import { toolBySlug } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import ToolShell from '@/components/ToolShell';
import DateDuration from '@/components/tools/DateDuration';

const tool = toolBySlug('date-duration-calculator')!;

export const metadata: Metadata = buildMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
  keywords: [...tool.keywords, 'days between dates calculator'],
});

const faqs = [
  { q: 'Does it count both dates?', a: 'By default it counts the gap between the dates. Tick “include the end date” to count both endpoints.' },
];

export default function Page() {
  return (
    <ToolShell tool={tool} faqs={faqs} related={['business-day-calculator', 'age-calculator', 'countdown-generator']}>
      <DateDuration />
    </ToolShell>
  );
}
