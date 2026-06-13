import type { Metadata } from 'next';
import { toolBySlug } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import ToolShell from '@/components/ToolShell';
import UnixTimestamp from '@/components/tools/UnixTimestamp';

const tool = toolBySlug('unix-timestamp-converter')!;

export const metadata: Metadata = buildMetadata({
  title: tool.title,
  description: tool.description,
  path: `/${tool.slug}`,
  keywords: [...tool.keywords, 'epoch converter', 'epoch time'],
});

const faqs = [
  { q: 'What is a Unix timestamp?', a: 'The number of seconds since 1 January 1970 00:00:00 UTC, known as the Unix epoch. It’s how most software stores time.' },
  { q: 'Seconds or milliseconds?', a: 'Classic Unix time is in seconds (10 digits today). JavaScript and many APIs use milliseconds (13 digits). Switch the unit if your result lands in 1970.' },
];

export default function Page() {
  return (
    <ToolShell tool={tool} faqs={faqs} related={['utc-converter', 'timezone-converter', 'world-clock']}>
      <UnixTimestamp />
    </ToolShell>
  );
}
