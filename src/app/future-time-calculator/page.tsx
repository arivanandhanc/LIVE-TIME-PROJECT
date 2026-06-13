import type { Metadata } from 'next';
import { toolBySlug } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import ToolShell from '@/components/ToolShell';
import FutureTime from '@/components/tools/FutureTime';

const tool = toolBySlug('future-time-calculator')!;

export const metadata: Metadata = buildMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
  keywords: tool.keywords,
});

const faqs = [
  { q: 'Does it handle daylight saving?', a: 'Yes — adding hours across a DST boundary returns the correct wall-clock time for the chosen timezone.' },
];

export default function Page() {
  return (
    <ToolShell tool={tool} faqs={faqs} related={['timezone-converter', 'countdown-generator', 'world-clock']}>
      <FutureTime />
    </ToolShell>
  );
}
