'use client';

import { useState } from 'react';
import { City, CITIES, cityByZone } from '@/lib/cities';
import { formatInZone, localTimeZone, zonedTimeToInstant } from '@/lib/time';
import CityPicker from '@/components/CityPicker';
import { useNow } from '@/components/useNow';

const pad = (n: number) => String(n).padStart(2, '0');

export default function Countdown() {
  const now = useNow(1000);
  const [zone, setZone] = useState<City>(() => cityByZone(localTimeZone()) ?? CITIES[0]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('00:00');
  const [label, setLabel] = useState('');

  let target: Date | null = null;
  if (date) {
    const [y, mo, d] = date.split('-').map(Number);
    const [h, mi] = time.split(':').map(Number);
    if (y && mo && d) target = zonedTimeToInstant(zone.timeZone, y, mo, d, h || 0, mi || 0);
  }

  const diff = target && now ? target.getTime() - now.getTime() : null;
  const past = diff !== null && diff < 0;
  const abs = diff !== null ? Math.abs(diff) : 0;
  const days = Math.floor(abs / 86_400_000);
  const hrs = Math.floor((abs % 86_400_000) / 3_600_000);
  const mins = Math.floor((abs % 3_600_000) / 60_000);
  const secs = Math.floor((abs % 60_000) / 1000);

  return (
    <div className="space-y-6">
      <div className="card grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="cd-label">Event name (optional)</label>
          <input id="cd-label" className="input" placeholder="Product launch" value={label} onChange={(e) => setLabel(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="cd-date">Date</label>
          <input id="cd-date" type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="cd-time">Time</label>
          <input id="cd-time" type="time" className="input" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Timezone</label>
          <div className="mb-2 text-sm">
            <span aria-hidden>{zone.flag}</span> <span className="font-medium">{zone.city}</span>
          </div>
          <CityPicker onSelect={setZone} placeholder="Change timezone…" />
        </div>
      </div>

      {target && (
        <div className="card bg-brand-950 text-center text-white dark:bg-black/40">
          {label && <p className="text-sm text-brand-300">{past ? 'Since' : 'Until'} {label}</p>}
          <div className="mt-2 grid grid-cols-4 gap-2 font-mono">
            {[
              { v: days, l: 'days' },
              { v: hrs, l: 'hrs' },
              { v: mins, l: 'min' },
              { v: secs, l: 'sec' },
            ].map((x) => (
              <div key={x.l}>
                <p className="text-3xl font-bold tabular-nums sm:text-4xl">{pad(x.v)}</p>
                <p className="text-[11px] uppercase tracking-wide text-brand-300">{x.l}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-brand-300">
            {formatInZone(zone.timeZone, target, { dateStyle: 'full', timeStyle: 'short' })} · {zone.city}
            {past ? ' (already passed)' : ''}
          </p>
        </div>
      )}
    </div>
  );
}
