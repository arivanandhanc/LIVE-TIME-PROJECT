'use client';

import { useState } from 'react';
import { City, CITIES, cityByZone } from '@/lib/cities';
import {
  formatInZone,
  getOffsetMinutes,
  formatOffset,
  getZonedParts,
  localTimeZone,
} from '@/lib/time';
import CityPicker from '@/components/CityPicker';
import { useNow } from '@/components/useNow';

const pad = (n: number) => String(n).padStart(2, '0');

export default function UtcConverter() {
  const live = useNow(1000);
  const [zone, setZone] = useState<City>(() => cityByZone(localTimeZone()) ?? CITIES[0]);

  // Editable UTC fields (default: now).
  const initUtc = getZonedParts('UTC', new Date());
  const [date, setDate] = useState(`${initUtc.year}-${pad(initUtc.month)}-${pad(initUtc.day)}`);
  const [time, setTime] = useState(`${pad(initUtc.hour)}:${pad(initUtc.minute)}`);

  const [y, mo, d] = date.split('-').map(Number);
  const [h, mi] = time.split(':').map(Number);
  const instant =
    y && mo && d && !Number.isNaN(h) ? new Date(Date.UTC(y, mo - 1, d, h, mi)) : null;

  return (
    <div className="space-y-8">
      {/* Live clock */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card text-center">
          <p className="label">Current UTC</p>
          <p className="font-mono text-3xl font-bold">
            {live ? formatInZone('UTC', live, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) : '—'}
          </p>
          <p className="text-sm text-brand-400">{live && formatInZone('UTC', live, { weekday: 'short', month: 'short', day: 'numeric' })}</p>
        </div>
        <div className="card text-center">
          <p className="label">Your local time</p>
          <p className="font-mono text-3xl font-bold">
            {live ? formatInZone(localTimeZone(), live, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) : '—'}
          </p>
          <p className="text-sm text-brand-400">{localTimeZone()} · {formatOffset(getOffsetMinutes(localTimeZone(), new Date()))}</p>
        </div>
      </div>

      {/* Converter */}
      <div className="card space-y-4">
        <h2 className="font-semibold">Convert a specific time</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="utc-date">UTC date</label>
            <input id="utc-date" type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="utc-time">UTC time</label>
            <input id="utc-time" type="time" className="input" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
        </div>

        <div>
          <label className="label">Target timezone</label>
          <div className="mb-2 text-sm">
            <span aria-hidden>{zone.flag}</span> <span className="font-medium">{zone.city}</span>{' '}
            <span className="text-brand-400">{zone.timeZone}</span>
          </div>
          <CityPicker onSelect={setZone} placeholder="Change target timezone…" />
        </div>

        {instant && (
          <div className="rounded-lg bg-brand-50 p-4 dark:bg-white/5">
            <p className="text-sm text-brand-500">
              {formatInZone('UTC', instant, { dateStyle: 'medium', timeStyle: 'short' })} UTC equals
            </p>
            <p className="mt-1 text-2xl font-bold text-brand-700 dark:text-brand-200">
              {formatInZone(zone.timeZone, instant, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
            </p>
            <p className="text-sm text-brand-400">in {zone.city} ({formatOffset(getOffsetMinutes(zone.timeZone, instant))})</p>
          </div>
        )}
      </div>

      <p className="text-xs text-brand-400">
        Tip: to convert <em>local → UTC</em>, the offset shown above is reversible — your local time minus the offset gives UTC.
      </p>
    </div>
  );
}
