import type { Metadata } from 'next';
import { toolBySlug } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import ToolShell from '@/components/ToolShell';
import BusinessDay from '@/components/tools/BusinessDay';

const tool = toolBySlug('business-day-calculator')!;

export const metadata: Metadata = buildMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
  keywords: tool.keywords,
});

const faqs = [
  { q: 'Are weekends excluded?', a: 'Yes — only Monday to Friday count as business days. Saturdays and Sundays are reported separately.' },
  { q: 'Does it remove public holidays?', a: 'Not currently. Subtract any regional public holidays manually for an exact working-day count.' },
];

export default function Page() {
  return (
    <ToolShell tool={tool} faqs={faqs} related={['date-duration-calculator', 'countdown-generator', 'meeting-planner']}>
      <BusinessDay />
    </ToolShell>
  );
}
