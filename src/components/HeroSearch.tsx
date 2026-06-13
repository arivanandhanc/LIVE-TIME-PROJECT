'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { City } from '@/lib/cities';
import { formatClock, formatInZone, formatOffset, getOffsetMinutes } from '@/lib/time';
import CityPicker from './CityPicker';
import { useNow } from './useNow';

export default function HeroSearch() {
  const router = useRouter();
  const [picked, setPicked] = useState<City | null>(null);
  const now = useNow(1000);
  const display = now ?? new Date();

  return (
    <div className="mx-auto max-w-2xl">
      <CityPicker
        autoFocus
        onSelect={setPicked}
        placeholder="Search any city, country, or timezone…"
      />

      {picked && (
        <div className="card mt-4 flex flex-col items-center gap-1 text-center">
          <p className="text-sm text-brand-400">
            {picked.flag} Current time in {picked.city}, {picked.country}
          </p>
          <p className="font-mono text-4xl font-bold tabular-nums">
            {now ? formatClock(picked.timeZone, display) : '—:—'}
          </p>
          <p className="text-sm text-brand-500">
            {formatInZone(picked.timeZone, display, { weekday: 'long', month: 'long', day: 'numeric' })} ·{' '}
            {formatOffset(getOffsetMinutes(picked.timeZone, display))}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <button className="btn-primary" onClick={() => router.push('/world-clock')}>
              Add to World Clock
            </button>
            <button className="btn-ghost" onClick={() => router.push('/timezone-converter')}>
              Convert this timezone
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
