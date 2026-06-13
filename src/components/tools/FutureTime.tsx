'use client';

import { useState } from 'react';
import { City, CITIES, cityByZone } from '@/lib/cities';
import { formatInZone, localTimeZone } from '@/lib/time';
import CityPicker from '@/components/CityPicker';
import { useNow } from '@/components/useNow';

export default function FutureTime() {
  const [zone, setZone] = useState<City>(() => cityByZone(localTimeZone()) ?? CITIES[0]);
  const [hours, setHours] = useState(3);
  const [minutes, setMinutes] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const live = useNow(1000);
  const now = live ?? new Date();
  const ready = live !== null;
  const target = new Date(now.getTime() + dir * (hours * 60 + minutes) * 60_000);

  return (
    <div className="space-y-6">
      <div className="card space-y-4">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="label" htmlFor="ft-h">Hours</label>
            <input id="ft-h" type="number" min={0} className="input !w-24" value={hours} onChange={(e) => setHours(Math.max(0, +e.target.value || 0))} />
          </div>
          <div>
            <label className="label" htmlFor="ft-m">Minutes</label>
            <input id="ft-m" type="number" min={0} max={59} className="input !w-24" value={minutes} onChange={(e) => setMinutes(Math.min(59, Math.max(0, +e.target.value || 0)))} />
          </div>
          <div className="flex gap-2">
            <button className={dir === 1 ? 'btn-primary' : 'btn-ghost'} onClick={() => setDir(1)}>From now</button>
            <button className={dir === -1 ? 'btn-primary' : 'btn-ghost'} onClick={() => setDir(-1)}>Ago</button>
          </div>
        </div>
        <div>
          <label className="label">Timezone</label>
          <div className="mb-2 text-sm">
            <span aria-hidden>{zone.flag}</span> <span className="font-medium">{zone.city}</span>
          </div>
          <CityPicker onSelect={setZone} placeholder="Change timezone…" />
        </div>
      </div>

      <div className="card bg-brand-50/60 text-center dark:bg-white/[0.03]">
        <p className="text-sm text-brand-500">
          {hours}h {minutes}m {dir === 1 ? 'from now' : 'ago'} it {dir === 1 ? 'will be' : 'was'}
        </p>
        <p className="mt-1 text-3xl font-bold">{ready ? formatInZone(zone.timeZone, target, { hour: 'numeric', minute: '2-digit' }) : '—:—'}</p>
        <p className="mt-1 text-sm text-brand-500">
          {ready ? `${formatInZone(zone.timeZone, target, { weekday: 'long', month: 'long', day: 'numeric' })} in ${zone.city}` : ' '}
        </p>
      </div>
    </div>
  );
}
