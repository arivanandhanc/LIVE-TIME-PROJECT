import type { Metadata } from 'next';
import { toolBySlug } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import ToolShell from '@/components/ToolShell';
import DstChecker from '@/components/tools/DstChecker';

const tool = toolBySlug('dst-checker')!;

export const metadata: Metadata = buildMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
  keywords: tool.keywords,
});

const faqs = [
  { q: 'Which countries don’t use DST?', a: 'India, China, Japan, most of Africa and much of Asia keep a fixed offset year-round, as does most of Arizona in the US.' },
  { q: 'When do the clocks change?', a: 'The checker finds the next transition for any location and tells you whether clocks spring forward or fall back, and by how much.' },
];

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      related={['timezone-converter', 'time-difference', 'world-clock']}
      about={
        <>
          <h2>Track daylight saving transitions</h2>
          <p>
            Daylight saving changes are the main reason recurring cross-border meetings drift. Check
            whether a location is currently on DST and see exactly when its next clock change happens
            so you can warn your team in advance.
          </p>
        </>
      }
    >
      <DstChecker />
    </ToolShell>
  );
}
