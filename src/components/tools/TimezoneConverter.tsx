'use client';

import { useMemo, useState } from 'react';
import { City, CITIES, cityByZone } from '@/lib/cities';
import {
  formatClock,
  formatInZone,
  getAbbreviation,
  formatOffset,
  getOffsetMinutes,
  getZonedParts,
  hourDifference,
  localTimeZone,
  zonedTimeToInstant,
} from '@/lib/time';
import CityPicker from '@/components/CityPicker';
import TimelineBar from './TimelineBar';

function defaultCity(zone: string): City {
  return cityByZone(zone) ?? CITIES.find((c) => c.timeZone === 'UTC')!;
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function TimezoneConverter() {
  const [from, setFrom] = useState<City>(() => defaultCity(localTimeZone()));
  const [to, setTo] = useState<City>(() => defaultCity('America/New_York'));
  const now = new Date();
  const initial = getZonedParts(from.timeZone, now);
  const [date, setDate] = useState(`${initial.year}-${pad(initial.month)}-${pad(initial.day)}`);
  const [time, setTime] = useState(`${pad(initial.hour)}:${pad(initial.minute)}`);

  const instant = useMemo(() => {
    const [y, mo, d] = date.split('-').map(Number);
    const [h, mi] = time.split(':').map(Number);
    if (!y || !mo || !d || Number.isNaN(h)) return null;
    return zonedTimeToInstant(from.timeZone, y, mo, d, h, mi);
  }, [date, time, from.timeZone]);

  const diff = hourDifference(from.timeZone, to.timeZone, instant ?? now);

  function swap() {
    setFrom(to);
    setTo(from);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <div>
          <label className="label">From</label>
          <div className="card !p-3">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <span aria-hidden>{from.flag}</span> {from.city}
              <span className="text-brand-400">{getAbbreviation(from.timeZone, instant ?? now)}</span>
            </div>
            <CityPicker onSelect={setFrom} placeholder="Change source city…" />
          </div>
        </div>
        <button onClick={swap} className="btn-ghost mx-auto !px-3" aria-label="Swap timezones" title="Swap">
          ⇄
        </button>
        <div>
          <label className="label">To</label>
          <div className="card !p-3">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <span aria-hidden>{to.flag}</span> {to.city}
              <span className="text-brand-400">{getAbbreviation(to.timeZone, instant ?? now)}</span>
            </div>
            <CityPicker onSelect={setTo} placeholder="Change target city…" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="conv-date">Date in {from.city}</label>
          <input id="conv-date" type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="conv-time">Time in {from.city}</label>
          <input id="conv-time" type="time" className="input" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
      </div>

      {instant && (
        <div className="card bg-brand-50/60 dark:bg-white/[0.03]">
          <div className="grid items-center gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-brand-400">{from.city}</p>
              <p className="text-2xl font-bold">{formatClock(from.timeZone, instant)}</p>
              <p className="text-sm text-brand-500">
                {formatInZone(from.timeZone, instant, { weekday: 'long', month: 'long', day: 'numeric' })} · {formatOffset(getOffsetMinutes(from.timeZone, instant))}
              </p>
            </div>
            <div className="sm:border-l sm:border-brand-200 sm:pl-4 dark:sm:border-white/10">
              <p className="text-xs uppercase tracking-wide text-brand-400">{to.city}</p>
              <p className="text-2xl font-bold text-brand-700 dark:text-brand-200">{formatClock(to.timeZone, instant)}</p>
              <p className="text-sm text-brand-500">
                {formatInZone(to.timeZone, instant, { weekday: 'long', month: 'long', day: 'numeric' })} · {formatOffset(getOffsetMinutes(to.timeZone, instant))}
              </p>
            </div>
          </div>
          <p className="mt-4 rounded-lg bg-white px-3 py-2 text-sm text-brand-600 dark:bg-white/5 dark:text-brand-200">
            {to.city} is{' '}
            <strong>
              {diff === 0 ? 'in the same timezone' : `${Math.abs(diff)} hour${Math.abs(diff) === 1 ? '' : 's'} ${diff > 0 ? 'ahead of' : 'behind'} ${from.city}`}
            </strong>
            .
          </p>
        </div>
      )}

      <div className="space-y-3">
        <p className="text-sm font-medium text-brand-500">24-hour comparison {instant ? '' : '(current)'}</p>
        {[from, to].map((c) => (
          <div key={c.timeZone + c.city} className="grid grid-cols-[7rem_1fr] items-center gap-3">
            <span className="truncate text-sm font-medium">
              {c.flag} {c.city}
            </span>
            <TimelineBar timeZone={c.timeZone} baseInstant={instant ?? now} />
          </div>
        ))}
        <p className="text-xs text-brand-400">Tinted blocks are 9am–5pm working hours · outlined block is the current hour.</p>
      </div>
    </div>
  );
}
