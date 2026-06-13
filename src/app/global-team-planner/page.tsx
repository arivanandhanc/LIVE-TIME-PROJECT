import type { Metadata } from 'next';
import { toolBySlug } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import ToolShell from '@/components/ToolShell';
import OverlapPlanner from '@/components/tools/OverlapPlanner';

const tool = toolBySlug('global-team-planner')!;

export const metadata: Metadata = buildMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
  keywords: tool.keywords,
});

const faqs = [
  {
    q: 'Which regions are preset?',
    a: 'The planner starts with India, US East, US West, UK, Central Europe and Australia — the most common hubs for distributed teams. You can add or remove any city.',
  },
  {
    q: 'Is there ever a time when all six regions overlap?',
    a: 'Rarely within 9–5. The chart makes this trade-off obvious and helps you choose which region takes the early or late slot, or whether to run two staggered meetings.',
  },
];

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      related={['meeting-planner', 'international-call-planner', 'world-clock']}
      about={
        <>
          <h2>Designed for globally distributed teams</h2>
          <p>
            This planner preloads the regions most distributed teams span — India, the US east and
            west coasts, the UK, continental Europe and Australia — so you can immediately see where
            working hours overlap and where they don’t. Use it to design fair meeting rhythms and
            follow-the-sun handoffs.
          </p>
        </>
      }
    >
      <OverlapPlanner
        initialZones={[
          'Asia/Kolkata',
          'America/New_York',
          'America/Los_Angeles',
          'Europe/London',
          'Europe/Berlin',
          'Australia/Sydney',
        ]}
      />
    </ToolShell>
  );
}
