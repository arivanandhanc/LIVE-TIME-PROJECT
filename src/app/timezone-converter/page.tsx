import type { Metadata } from 'next';
import { toolBySlug } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import ToolShell from '@/components/ToolShell';
import TimezoneConverter from '@/components/tools/TimezoneConverter';

const tool = toolBySlug('timezone-converter')!;

export const metadata: Metadata = buildMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
  keywords: tool.keywords,
});

const faqs = [
  {
    q: 'Does the timezone converter handle daylight saving time?',
    a: 'Yes. It uses the IANA timezone database via your browser, so daylight saving transitions are applied automatically for the exact date you choose.',
  },
  {
    q: 'Can I convert a time on a specific future date?',
    a: 'Yes — pick any date and time in the source city and the converter shows the matching local time in the target city, correctly accounting for any DST change between now and then.',
  },
  {
    q: 'Why does the time difference change during the year?',
    a: 'Because countries shift their clocks for daylight saving on different dates. For a few weeks each spring and autumn the offset between two cities can be an hour different from usual.',
  },
];

export default function Page() {
  return (
    <ToolShell
      tool={tool}
      faqs={faqs}
      related={['world-clock', 'meeting-planner', 'time-difference']}
      about={
        <>
          <h2>How to convert between timezones</h2>
          <p>
            Choose a source city and a target city, then set the date and time you care about. The
            converter instantly shows the equivalent local time, the UTC offset for each location,
            and a 24-hour timeline so you can see at a glance when working hours overlap.
          </p>
          <p>
            Because the tool relies on the IANA timezone database, it always uses the correct rules
            for daylight saving time — including the half-hour and 45-minute offsets used by places
            like India and Nepal.
          </p>
        </>
      }
    >
      <TimezoneConverter />
    </ToolShell>
  );
}
