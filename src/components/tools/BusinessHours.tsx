'use client';

import { useState } from 'react';
import { City, CITIES, cityByZone, cityId } from '@/lib/cities';
import { formatClock, formatInZone, getZonedParts } from '@/lib/time';
import CityPicker from '@/components/CityPicker';
import { useNow } from '@/components/useNow';

const DEFAULTS = ['America/New_York', 'Europe/London', 'Asia/Kolkata', 'Australia/Sydney'];

function isWorkingDay(weekday: string): boolean {
  return !['Sat', 'Sun'].includes(weekday);
}

export default function BusinessHours() {
  const [cities, setCities] = useState<City[]>(() =>
    DEFAULTS.map((z) => cityByZone(z)!).filter(Boolean),
  );
  const [start, setStart] = useState(9);
  const [end, setEnd] = useState(17);
  const live = useNow(1000);
  const now = live ?? new Date();
  const ready = live !== null;

  function add(c: City) {
    setCities((p) => (p.some((x) => cityId(x) === cityId(c)) ? p : [...p, c]));
  }
  function remove(id: string) {
    setCities((p) => p.filter((c) => cityId(c) !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="sm:flex-1">
          <label className="label">Add a location</label>
          <CityPicker onSelect={add} placeholder="Search a city…" />
        </div>
        <div className="flex gap-3">
          <div>
            <label className="label" htmlFor="bh-start">Opens</label>
            <select id="bh-start" className="input" value={start} onChange={(e) => setStart(+e.target.value)}>
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i}>{String(i).padStart(2, '0')}:00</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="bh-end">Closes</label>
            <select id="bh-end" className="input" value={end} onChange={(e) => setEnd(+e.target.value)}>
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i + 1}>{String(i + 1).padStart(2, '0')}:00</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((c) => {
          const parts = getZonedParts(c.timeZone, now);
          const workday = isWorkingDay(parts.weekday);
          const open = workday && parts.hour >= start && parts.hour < end;
          return (
            <div key={cityId(c)} className="card relative">
              <button onClick={() => remove(cityId(c))} aria-label={`Remove ${c.city}`} className="absolute right-3 top-3 text-brand-300 hover:text-red-500">✕</button>
              <div className="flex items-center gap-2">
                <span aria-hidden className="text-lg">{c.flag}</span>
                <span className="font-semibold">{c.city}</span>
              </div>
              <p className="mt-2 font-mono text-xl font-bold">{ready ? formatClock(c.timeZone, now) : '—:—'}</p>
              <p className="text-xs text-brand-400">{ready ? formatInZone(c.timeZone, now, { weekday: 'long' }) : ' '}</p>
              {ready && (
                <span
                  className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    open
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
                      : 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${open ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  {open ? 'Open now' : workday ? 'Closed' : 'Weekend'}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-xs text-brand-400">
        Assumes a Mon–Fri, {String(start).padStart(2, '0')}:00–{String(end).padStart(2, '0')}:00 working week. Local public holidays are not accounted for.
      </p>
    </div>
  );
}
