import type { Metadata } from 'next';
import { toolBySlug } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import ToolShell from '@/components/ToolShell';
import BusinessHours from '@/components/tools/BusinessHours';

const tool = toolBySlug('business-hours')!;

export const metadata: Metadata = buildMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
  keywords: [...tool.keywords, 'business hours calculator'],
});

const faqs = [
  {
    q: 'What working week does it assume?',
    a: 'By default Monday to Friday, with adjustable opening and closing hours. Weekends are flagged as closed.',
  },
  {
    q: 'Does it know about public holidays?',
    a: 'Not yet — the checker reflects regular weekly hours only. Always confirm local public holidays before relying on it for a specific date.',
  },
];

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      related={['world-clock', 'time-difference', 'meeting-planner']}
      about={
        <>
          <h2>Is that office open right now?</h2>
          <p>
            Add the locations you work with and instantly see a clear open or closed indicator for
            each, based on the working hours you set. It’s the fastest way to know whether you’ll
            reach someone before you pick up the phone.
          </p>
        </>
      }
    >
      <BusinessHours />
    </ToolShell>
  );
}
