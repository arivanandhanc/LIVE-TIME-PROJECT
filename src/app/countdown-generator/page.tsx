import type { Metadata } from 'next';
import { toolBySlug } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import ToolShell from '@/components/ToolShell';
import Countdown from '@/components/tools/Countdown';

const tool = toolBySlug('countdown-generator')!;

export const metadata: Metadata = buildMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
  keywords: tool.keywords,
});

const faqs = [
  { q: 'Can I count down to an event in another timezone?', a: 'Yes — set the target date, time and timezone, and the countdown is accurate from wherever you’re viewing it.' },
];

export default function Page() {
  return (
    <ToolShell tool={tool} faqs={faqs} related={['future-time-calculator', 'date-duration-calculator', 'world-clock']}>
      <Countdown />
    </ToolShell>
  );
}
