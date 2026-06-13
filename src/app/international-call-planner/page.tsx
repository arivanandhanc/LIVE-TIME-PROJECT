import type { Metadata } from 'next';
import { toolBySlug } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import ToolShell from '@/components/ToolShell';
import OverlapPlanner from '@/components/tools/OverlapPlanner';

const tool = toolBySlug('international-call-planner')!;

export const metadata: Metadata = buildMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
  keywords: tool.keywords,
});

const faqs = [
  {
    q: 'What counts as a good time to call?',
    a: 'The call planner treats 8am–9pm local time as reachable hours — wider than strict office hours — and highlights when everyone is comfortably awake.',
  },
  {
    q: 'How is this different from the meeting planner?',
    a: 'The meeting planner uses 9–5 working hours; the call planner uses broader waking hours, which is more realistic for personal or client calls.',
  },
];

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      related={['meeting-planner', 'time-difference', 'world-clock']}
      about={
        <>
          <h2>Find a civilised time to call abroad</h2>
          <p>
            Add the countries you need to reach and the planner highlights the hours when everyone
            is awake and reachable — so you never wake someone at 3am. It’s ideal for sales calls,
            client check-ins, and keeping in touch with family overseas.
          </p>
        </>
      }
    >
      <OverlapPlanner initialZones={['America/New_York', 'Europe/London', 'Asia/Kolkata']} callMode />
    </ToolShell>
  );
}
