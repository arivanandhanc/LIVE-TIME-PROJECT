import type { Metadata } from 'next';
import { toolBySlug } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import ToolShell from '@/components/ToolShell';
import UtcConverter from '@/components/tools/UtcConverter';

const tool = toolBySlug('utc-converter')!;

export const metadata: Metadata = buildMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
  keywords: tool.keywords,
});

const faqs = [
  {
    q: 'What is the difference between UTC and GMT?',
    a: 'For everyday conversion they are identical (offset zero). UTC is the precise atomic-clock standard used by computers; GMT is the older, astronomy-based timezone. UTC never observes daylight saving.',
  },
  {
    q: 'Why do logs and APIs use UTC?',
    a: 'UTC is unambiguous and never shifts, so storing timestamps in UTC avoids daylight-saving bugs and lets systems around the world agree on the exact same instant.',
  },
];

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      related={['timezone-converter', 'unix-timestamp-converter', 'world-clock']}
      about={
        <>
          <h2>Convert UTC to local time and back</h2>
          <p>
            See the current UTC and your local time side by side, then convert any specific UTC
            moment into the timezone of your choice. Perfect for reading server logs, scheduling
            deploys, and coordinating release windows across a global team.
          </p>
        </>
      }
    >
      <UtcConverter />
    </ToolShell>
  );
}
