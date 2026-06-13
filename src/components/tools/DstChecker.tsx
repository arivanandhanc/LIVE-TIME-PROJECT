'use client';

import { useState } from 'react';
import { City, CITIES, cityByZone } from '@/lib/cities';
import { formatInZone, formatOffset, getOffsetMinutes, isDST, localTimeZone, nextDSTTransition } from '@/lib/time';
import CityPicker from '@/components/CityPicker';

export default function DstChecker() {
  const [zone, setZone] = useState<City>(() => cityByZone(localTimeZone()) ?? CITIES[0]);
  const now = new Date();
  const observing = isDST(zone.timeZone, now);
  const next = nextDSTTransition(zone.timeZone, now);
  // A zone with no transition in the next ~13 months doesn't observe DST.
  const hasDST = next !== null || observing;

  return (
    <div className="space-y-6">
      <div className="sm:max-w-md">
        <label className="label">Location</label>
        <div className="mb-2 text-sm">
          <span aria-hidden>{zone.flag}</span> <span className="font-medium">{zone.city}</span>{' '}
          <span className="text-brand-400">{zone.timeZone}</span>
        </div>
        <CityPicker onSelect={setZone} placeholder="Change location…" />
      </div>

      <div className="card">
        <div className="flex items-center gap-3">
          <span aria-hidden className="text-2xl">{observing ? '🌞' : '🌗'}</span>
          <div>
            <p className="font-semibold">
              {!hasDST
                ? `${zone.city} does not observe daylight saving time`
                : observing
                  ? `${zone.city} is currently on daylight saving time`
                  : `${zone.city} is currently on standard time`}
            </p>
            <p className="text-sm text-brand-400">Current offset: {formatOffset(getOffsetMinutes(zone.timeZone, now))}</p>
          </div>
        </div>
      </div>

      {next && (
        <div className="card bg-brand-50/60 dark:bg-white/[0.03]">
          <h2 className="font-semibold">Next clock change</h2>
          <p className="mt-1 text-lg font-bold">
            {formatInZone(zone.timeZone, next.date, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <p className="text-sm text-brand-500">
            Clocks {next.after > next.before ? 'spring forward' : 'fall back'} from{' '}
            {formatOffset(next.before)} to {formatOffset(next.after)} at{' '}
            {formatInZone(zone.timeZone, new Date(next.date.getTime() - 60_000), { hour: 'numeric', minute: '2-digit' })} local time.
          </p>
        </div>
      )}

      {!hasDST && (
        <p className="text-sm text-brand-400">
          This region keeps a fixed UTC offset all year, so recurring meetings here never drift.
        </p>
      )}
    </div>
  );
}
