'use client';

import { useState } from 'react';

const pad = (n: number) => String(n).padStart(2, '0');
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function DateDuration() {
  const [from, setFrom] = useState(today());
  const [to, setTo] = useState(today());
  const [inclusive, setInclusive] = useState(false);

  const a = new Date(from + 'T00:00:00');
  const b = new Date(to + 'T00:00:00');
  const valid = !Number.isNaN(a.getTime()) && !Number.isNaN(b.getTime());

  const dayMs = 86_400_000;
  let days = valid ? Math.round((b.getTime() - a.getTime()) / dayMs) : 0;
  const sign = days < 0 ? -1 : 1;
  days = Math.abs(days) + (inclusive ? 1 : 0);

  const weeks = Math.floor(days / 7);
  const remDays = days % 7;

  return (
    <div className="space-y-6">
      <div className="card grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="dd-from">Start date</label>
          <input id="dd-from" type="date" className="input" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="dd-to">End date</label>
          <input id="dd-to" type="date" className="input" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" checked={inclusive} onChange={(e) => setInclusive(e.target.checked)} />
          Include the end date in the count
        </label>
      </div>

      {valid && (
        <div className="card bg-brand-50/60 text-center dark:bg-white/[0.03]">
          <p className="text-4xl font-bold">{days.toLocaleString()}</p>
          <p className="text-sm text-brand-500">day{days === 1 ? '' : 's'} {sign < 0 ? '(end is before start)' : ''}</p>
          <p className="mt-2 text-sm text-brand-400">
            = {weeks} week{weeks === 1 ? '' : 's'} {remDays} day{remDays === 1 ? '' : 's'} · {(days * 24).toLocaleString()} hours
          </p>
        </div>
      )}
    </div>
  );
}
