'use client';

import { useState } from 'react';

export default function AgeCalculator() {
  const [dob, setDob] = useState('');
  const birth = dob ? new Date(dob + 'T00:00:00') : null;
  const valid = birth !== null && !Number.isNaN(birth.getTime());
  const now = new Date();

  let years = 0;
  let months = 0;
  let days = 0;
  let totalDays = 0;
  if (valid && birth! <= now) {
    years = now.getFullYear() - birth!.getFullYear();
    months = now.getMonth() - birth!.getMonth();
    days = now.getDate() - birth!.getDate();
    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += prevMonth;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    totalDays = Math.floor((now.getTime() - birth!.getTime()) / 86_400_000);
  }

  return (
    <div className="space-y-6">
      <div className="card sm:max-w-sm">
        <label className="label" htmlFor="age-dob">Date of birth</label>
        <input id="age-dob" type="date" className="input" value={dob} onChange={(e) => setDob(e.target.value)} max={`${now.getFullYear()}-12-31`} />
      </div>

      {valid && birth! <= now && (
        <>
          <div className="card bg-brand-50/60 text-center dark:bg-white/[0.03]">
            <p className="text-3xl font-bold">
              {years} <span className="text-lg font-medium text-brand-500">years</span> {months}{' '}
              <span className="text-lg font-medium text-brand-500">months</span> {days}{' '}
              <span className="text-lg font-medium text-brand-500">days</span>
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat label="total days" value={totalDays.toLocaleString()} />
            <Stat label="total weeks" value={Math.floor(totalDays / 7).toLocaleString()} />
            <Stat label="total hours" value={(totalDays * 24).toLocaleString()} />
          </div>
        </>
      )}
      {valid && birth! > now && <p className="text-sm text-red-500">Please choose a date in the past.</p>}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-brand-500">{label}</p>
    </div>
  );
}
