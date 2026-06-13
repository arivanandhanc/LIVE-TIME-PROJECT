import type { Metadata } from 'next';
import { toolBySlug } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import ToolShell from '@/components/ToolShell';
import WorldClock from '@/components/tools/WorldClock';

const tool = toolBySlug('world-clock')!;

export const metadata: Metadata = buildMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
  keywords: tool.keywords,
});

const faqs = [
  {
    q: 'Are my cities saved?',
    a: 'Yes. Your selected cities are stored locally in your browser, so they reappear next time you visit. Nothing is sent to a server.',
  },
  {
    q: 'Do the clocks update in real time?',
    a: 'Yes — every clock ticks live, once per second, and automatically reflects daylight saving changes.',
  },
  {
    q: 'How many cities can I add?',
    a: 'As many as you like. Add your whole distributed team and see who is awake at a glance.',
  },
];

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      related={['timezone-converter', 'meeting-planner', 'business-hours']}
      about={
        <>
          <h2>A live world clock for your team</h2>
          <p>
            Add the cities where your colleagues, clients, or family live and watch the current time
            update live in each one. A sun or moon icon tells you instantly whether it’s daytime or
            the middle of the night somewhere — a simple cure for timezone blindness.
          </p>
        </>
      }
    >
      <WorldClock />
    </ToolShell>
  );
}
