import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offline',
  robots: { index: false },
};

export default function OfflinePage() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span aria-hidden className="text-5xl">📴</span>
      <h1 className="mt-4 text-2xl font-bold">You’re offline</h1>
      <p className="mt-2 max-w-md text-brand-500">
        This page isn’t cached yet, but the core calculators you’ve already opened still work offline.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/timezone-converter" className="btn-primary">Timezone Converter</Link>
        <Link href="/world-clock" className="btn-ghost">World Clock</Link>
      </div>
    </div>
  );
}
