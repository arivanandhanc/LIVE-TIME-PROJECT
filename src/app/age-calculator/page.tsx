import type { Metadata } from 'next';
import { toolBySlug } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import ToolShell from '@/components/ToolShell';
import AgeCalculator from '@/components/tools/AgeCalculator';

const tool = toolBySlug('age-calculator')!;

export const metadata: Metadata = buildMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
  keywords: tool.keywords,
});

const faqs = [
  { q: 'How is age calculated?', a: 'It computes the exact number of years, months and days from the date of birth to today, then also shows total days, weeks and hours lived.' },
];

export default function Page() {
  return (
    <ToolShell tool={tool} faqs={faqs} related={['date-duration-calculator', 'business-day-calculator', 'countdown-generator']}>
      <AgeCalculator />
    </ToolShell>
  );
}
