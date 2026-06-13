'use client';

import { useState } from 'react';
import { City, CITIES, cityByZone } from '@/lib/cities';
import {
  formatClock,
  formatInZone,
  formatOffset,
  getOffsetMinutes,
  hourDifference,
  localTimeZone,
} from '@/lib/time';
import CityPicker from '@/components/CityPicker';
import { useNow } from '@/components/useNow';

function def(zone: string): City {
  return cityByZone(zone) ?? CITIES.find((c) => c.timeZone === 'UTC')!;
}

export default function TimeDifference() {
  const [a, setA] = useState<City>(() => def(localTimeZone()));
  const [b, setB] = useState<City>(() => def('Asia/Tokyo'));
  const live = useNow(1000);
  const now = live ?? new Date();
  const ready = live !== null;

  const diff = hourDifference(a.timeZone, b.timeZone, now);
  const abs = Math.abs(diff);
  const hWhole = Math.floor(abs);
  const mins = Math.round((abs - hWhole) * 60);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {[{ c: a, set: setA, label: 'First location' }, { c: b, set: setB, label: 'Second location' }].map(
          ({ c, set, label }) => (
            <div key={label} className="card">
              <p className="label">{label}</p>
              <div className="mb-3 flex items-center gap-2">
                <span aria-hidden className="text-lg">{c.flag}</span>
                <span className="font-semibold">{c.city}</span>
                <span className="text-sm text-brand-400">{formatOffset(getOffsetMinutes(c.timeZone, now))}</span>
              </div>
              <p className="mb-3 font-mono text-2xl font-bold">{ready ? formatClock(c.timeZone, now) : '—:—'}</p>
              <CityPicker onSelect={set as (city: City) => void} placeholder="Change location…" />
            </div>
          ),
        )}
      </div>

      <div className="card bg-brand-50/60 text-center dark:bg-white/[0.03]">
        <p className="text-sm text-brand-500">Time difference</p>
        <p className="mt-1 text-3xl font-bold">
          {abs === 0 ? 'Same time' : `${hWhole}h${mins ? ` ${mins}m` : ''}`}
        </p>
        {abs !== 0 && (
          <p className="mt-1 text-sm text-brand-500">
            <strong>{b.city}</strong> is {hWhole}
            {mins ? `h ${mins}m` : ' hours'} {diff > 0 ? 'ahead of' : 'behind'} <strong>{a.city}</strong>
          </p>
        )}
        {ready && (
          <p className="mt-3 text-xs text-brand-400">
            When it is {formatClock(a.timeZone, now)} in {a.city}, it is{' '}
            {formatInZone(b.timeZone, now, { weekday: 'short' })} {formatClock(b.timeZone, now)} in {b.city}.
          </p>
        )}
      </div>
    </div>
  );
}
