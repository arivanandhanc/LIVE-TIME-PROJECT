'use client';

import { useEffect, useState } from 'react';
import { City, CITIES, cityId } from '@/lib/cities';
import {
  formatClock,
  formatInZone,
  getAbbreviation,
  formatOffset,
  getOffsetMinutes,
  getZonedParts,
  localTimeZone,
} from '@/lib/time';
import CityPicker from '@/components/CityPicker';
import { useNow } from '@/components/useNow';

const STORAGE_KEY = 'world-clock-cities';

const DEFAULTS = ['Asia/Kolkata', 'America/New_York', 'Europe/London', 'America/Los_Angeles'];

function loadInitial(): City[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const ids: string[] = JSON.parse(raw);
      const found = ids
        .map((id) => CITIES.find((c) => cityId(c) === id))
        .filter(Boolean) as City[];
      if (found.length) return found;
    }
  } catch {
    /* ignore */
  }
  return DEFAULTS.map((z) => CITIES.find((c) => c.timeZone === z)!).filter(Boolean);
}

export default function WorldClock() {
  const [cities, setCities] = useState<City[]>([]);
  const [hour12, setHour12] = useState(true);
  const now = useNow(1000);

  useEffect(() => {
    setCities(loadInitial());
  }, []);

  useEffect(() => {
    if (cities.length === 0) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cities.map(cityId)));
    } catch {
      /* ignore */
    }
  }, [cities]);

  function add(city: City) {
    setCities((prev) => (prev.some((c) => cityId(c) === cityId(city)) ? prev : [...prev, city]));
  }
  function remove(id: string) {
    setCities((prev) => prev.filter((c) => cityId(c) !== id));
  }

  const display = now ?? new Date();
  const localZone = localTimeZone();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="sm:max-w-md sm:flex-1">
          <CityPicker onSelect={add} placeholder="Add a city to your world clock…" />
        </div>
        <button className="btn-ghost self-start" onClick={() => setHour12((h) => !h)}>
          {hour12 ? '24-hour' : '12-hour'} format
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((c) => {
          const parts = getZonedParts(c.timeZone, display);
          const isNight = parts.hour < 6 || parts.hour >= 20;
          const isLocal = c.timeZone === localZone;
          return (
            <div key={cityId(c)} className="card relative">
              <button
                onClick={() => remove(cityId(c))}
                aria-label={`Remove ${c.city}`}
                className="absolute right-3 top-3 text-brand-300 hover:text-red-500"
              >
                ✕
              </button>
              <div className="flex items-center gap-2">
                <span aria-hidden className="text-xl">{c.flag}</span>
                <div>
                  <p className="font-semibold leading-tight">{c.city}</p>
                  <p className="text-xs text-brand-400">{c.country}</p>
                </div>
                <span aria-hidden className="ml-auto mr-6 text-lg">{isNight ? '🌙' : '☀️'}</span>
              </div>
              <p className="mt-3 font-mono text-3xl font-bold tabular-nums">
                {now ? formatClock(c.timeZone, display, hour12) : '—:—'}
                {!hour12 && now && (
                  <span className="text-base text-brand-400">:{String(parts.second).padStart(2, '0')}</span>
                )}
              </p>
              <p className="mt-1 text-sm text-brand-500">
                {formatInZone(c.timeZone, display, { weekday: 'short', month: 'short', day: 'numeric' })}
                {' · '}
                {getAbbreviation(c.timeZone, display)} ({formatOffset(getOffsetMinutes(c.timeZone, display))})
              </p>
              {isLocal && (
                <span className="mt-2 inline-block rounded-full bg-brand-100 px-2 py-0.5 text-[11px] font-medium text-brand-700 dark:bg-white/10 dark:text-brand-200">
                  Your timezone
                </span>
              )}
            </div>
          );
        })}
        {cities.length === 0 && (
          <p className="col-span-full text-sm text-brand-400">No cities yet — search above to add some.</p>
        )}
      </div>
    </div>
  );
}
