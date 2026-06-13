'use client';

import { useState } from 'react';

const pad = (n: number) => String(n).padStart(2, '0');
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Count working days (Mon–Fri) between two dates, inclusive of both ends. */
function countBusinessDays(a: Date, b: Date): number {
  const start = a <= b ? a : b;
  const end = a <= b ? b : a;
  let count = 0;
  const cur = new Date(start);
  while (cur <= end) {
    const day = cur.getDay();
    if (day !== 0 && day !== 6) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}

export default function BusinessDay() {
  const [from, setFrom] = useState(today());
  const [to, setTo] = useState(today());

  const a = new Date(from + 'T00:00:00');
  const b = new Date(to + 'T00:00:00');
  const valid = !Number.isNaN(a.getTime()) && !Number.isNaN(b.getTime());
  const business = valid ? countBusinessDays(a, b) : 0;
  const total = valid ? Math.abs(Math.round((b.getTime() - a.getTime()) / 86_400_000)) + 1 : 0;
  const weekend = total - business;

  return (
    <div className="space-y-6">
      <div className="card grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="bd-from">Start date</label>
          <input id="bd-from" type="date" className="input" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="bd-to">End date</label>
          <input id="bd-to" type="date" className="input" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
      </div>

      {valid && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="card text-center">
            <p className="text-3xl font-bold text-brand-700 dark:text-brand-200">{business}</p>
            <p className="text-sm text-brand-500">business days</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold">{weekend}</p>
            <p className="text-sm text-brand-500">weekend days</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold">{total}</p>
            <p className="text-sm text-brand-500">total days</p>
          </div>
        </div>
      )}
      <p className="text-xs text-brand-400">Counts both the start and end date. Public holidays are not excluded.</p>
    </div>
  );
}
