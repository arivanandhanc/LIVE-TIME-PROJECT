'use client';

import { useState } from 'react';
import { formatInZone, localTimeZone } from '@/lib/time';
import { useNow } from '@/components/useNow';

export default function UnixTimestamp() {
  const live = useNow(1000);
  const [input, setInput] = useState('');
  const [unit, setUnit] = useState<'s' | 'ms'>('s');

  const raw = input.trim() === '' ? null : Number(input.trim());
  const valid = raw !== null && Number.isFinite(raw);
  const ms = valid ? (unit === 's' ? raw! * 1000 : raw!) : null;
  const date = ms !== null ? new Date(ms) : null;
  const dateValid = date !== null && !Number.isNaN(date.getTime());

  const nowSec = live ? Math.floor(live.getTime() / 1000) : null;

  return (
    <div className="space-y-6">
      <div className="card text-center">
        <p className="label">Current Unix timestamp</p>
        <p className="font-mono text-3xl font-bold tabular-nums">{nowSec ?? '—'}</p>
        <button
          className="btn-ghost mt-3"
          onClick={() => nowSec && navigator.clipboard?.writeText(String(nowSec))}
        >
          Copy
        </button>
      </div>

      <div className="card space-y-4">
        <h2 className="font-semibold">Timestamp → date</h2>
        <div className="flex gap-3">
          <input
            className="input font-mono"
            inputMode="numeric"
            placeholder="e.g. 1718280000"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <select className="input !w-auto" value={unit} onChange={(e) => setUnit(e.target.value as 's' | 'ms')}>
            <option value="s">seconds</option>
            <option value="ms">milliseconds</option>
          </select>
        </div>
        {input && (dateValid ? (
          <div className="rounded-lg bg-brand-50 p-4 dark:bg-white/5">
            <p className="text-lg font-semibold">
              {formatInZone(localTimeZone(), date!, { dateStyle: 'full', timeStyle: 'long' })}
            </p>
            <p className="mt-1 text-sm text-brand-400">
              UTC: {formatInZone('UTC', date!, { dateStyle: 'medium', timeStyle: 'long' })}
            </p>
            <p className="text-sm text-brand-400">ISO 8601: {date!.toISOString()}</p>
          </div>
        ) : (
          <p className="text-sm text-red-500">That doesn’t look like a valid timestamp.</p>
        ))}
      </div>
    </div>
  );
}
