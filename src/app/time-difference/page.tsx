import type { Metadata } from 'next';
import { toolBySlug } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import ToolShell from '@/components/ToolShell';
import TimeDifference from '@/components/tools/TimeDifference';

const tool = toolBySlug('time-difference')!;

export const metadata: Metadata = buildMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
  keywords: tool.keywords,
});

const faqs = [
  {
    q: 'Why is the difference sometimes not a whole number of hours?',
    a: 'Several regions use 30- or 45-minute offsets — India (UTC+5:30) and Nepal (UTC+5:45), for example — so the difference can include minutes.',
  },
  {
    q: 'Is the difference always the same?',
    a: 'No. When one location observes daylight saving and the other doesn’t, the difference changes by an hour during part of the year.',
  },
];

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      related={['timezone-converter', 'world-clock', 'meeting-planner']}
      about={
        <>
          <h2>Compare the time in two locations</h2>
          <p>
            Pick two cities and see the exact current difference between them, including any minutes,
            with both live clocks side by side. The result updates automatically as clocks change for
            daylight saving.
          </p>
        </>
      }
    >
      <TimeDifference />
    </ToolShell>
  );
}
