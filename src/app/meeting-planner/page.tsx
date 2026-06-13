import type { Metadata } from 'next';
import { toolBySlug } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import ToolShell from '@/components/ToolShell';
import OverlapPlanner from '@/components/tools/OverlapPlanner';

const tool = toolBySlug('meeting-planner')!;

export const metadata: Metadata = buildMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
  keywords: [...tool.keywords, 'international meeting scheduler', 'timezone meeting planner'],
});

const faqs = [
  {
    q: 'How does the meeting planner find the best time?',
    a: 'It overlays everyone’s working hours (9am–5pm by default) on a single UTC timeline and highlights the hours when all participants are available at once.',
  },
  {
    q: 'What if there is no overlap?',
    a: 'When timezones are too far apart for a shared working hour, the planner says so and suggests rotating the inconvenient slot or splitting into two meetings.',
  },
  {
    q: 'Does it account for daylight saving time?',
    a: 'Yes. Each location’s local hours are derived from the IANA timezone database, so DST is always applied correctly.',
  },
];

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      related={['global-team-planner', 'international-call-planner', 'world-clock']}
      about={
        <>
          <h2>Plan meetings across multiple countries</h2>
          <p>
            Add each participant’s city and the planner charts everyone’s working day on one
            timeline. Green columns mark the hours when the whole group is inside working hours —
            your candidate meeting slots. The cell numbers show each person’s local hour so you can
            confirm nobody is being asked to join at 6am.
          </p>
        </>
      }
    >
      <OverlapPlanner />
    </ToolShell>
  );
}
