'use client';

import { useMemo, useState } from 'react';
import { City, CITIES, cityId } from '@/lib/cities';
import { getZonedParts, formatOffset, getOffsetMinutes } from '@/lib/time';
import CityPicker from '@/components/CityPicker';

interface Row {
  city: City;
  start: number;
  end: number;
}

function citiesFromZones(zones: string[]): City[] {
  return zones.map((z) => CITIES.find((c) => c.timeZone === z)).filter(Boolean) as City[];
}

/** 12am, 9am, 5pm style label for an hour number. */
function hourLabel(h: number): string {
  const period = h < 12 ? 'am' : 'pm';
  const display = h % 12 === 0 ? 12 : h % 12;
  return `${display}${period}`;
}

export default function OverlapPlanner({
  initialZones = ['Asia/Kolkata', 'Europe/London', 'America/New_York'],
  editable = true,
  callMode = false,
}: {
  initialZones?: string[];
  editable?: boolean;
  callMode?: boolean;
}) {
  const [rows, setRows] = useState<Row[]>(() =>
    citiesFromZones(initialZones).map((city) => ({ city, start: 9, end: 17 })),
  );
  // Anchor to today's UTC date; the grid columns are 24 UTC hours.
  const baseDate = useMemo(() => {
    const d = new Date();
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0);
  }, []);

  const hours = useMemo(() => {
    // For each UTC hour, compute every row's local hour + working status.
    return Array.from({ length: 24 }, (_, u) => {
      const instant = new Date(baseDate + u * 3600_000);
      const cells = rows.map((r) => {
        const local = getZonedParts(r.city.timeZone, instant).hour;
        // Call mode: "reachable" hours are wider (8am–9pm); meeting mode uses work hours.
        const working = callMode ? local >= 8 && local < 21 : local >= r.start && local < r.end;
        return { local, working };
      });
      const allWorking = cells.length > 0 && cells.every((c) => c.working);
      const count = cells.filter((c) => c.working).length;
      return { u, instant, cells, allWorking, count };
    });
  }, [rows, baseDate, callMode]);

  const overlapHours = hours.filter((h) => h.allWorking);

  function add(city: City) {
    setRows((prev) =>
      prev.some((r) => cityId(r.city) === cityId(city)) ? prev : [...prev, { city, start: 9, end: 17 }],
    );
  }
  function remove(id: string) {
    setRows((prev) => prev.filter((r) => cityId(r.city) !== id));
  }

  return (
    <div className="space-y-6">
      {editable && (
        <div className="sm:max-w-md">
          <CityPicker onSelect={add} placeholder="Add a person / location…" />
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-brand-200 dark:border-white/10">
        <table className="w-full min-w-[760px] border-collapse text-center text-xs">
          <thead>
            <tr className="bg-brand-50 dark:bg-white/[0.04]">
              <th className="sticky left-0 z-10 bg-brand-50 px-3 py-2 text-left font-medium dark:bg-brand-900">
                Location
              </th>
              {hours.map((h) => (
                <th
                  key={h.u}
                  className={`px-0 py-2 font-normal text-brand-400 ${h.allWorking ? 'bg-emerald-100 font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' : ''}`}
                >
                  {h.u % 2 === 0 ? `${String(h.u).padStart(2, '0')}` : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={cityId(r.city)} className="border-t border-brand-200/60 dark:border-white/10">
                <th className="sticky left-0 z-10 whitespace-nowrap bg-white px-3 py-2 text-left font-normal dark:bg-brand-950">
                  <div className="flex items-center gap-2">
                    <span aria-hidden>{r.city.flag}</span>
                    <span className="font-medium">{r.city.city}</span>
                    <span className="text-brand-300">{formatOffset(getOffsetMinutes(r.city.timeZone, new Date(baseDate)))}</span>
                    {editable && rows.length > 1 && (
                      <button
                        onClick={() => remove(cityId(r.city))}
                        aria-label={`Remove ${r.city.city}`}
                        className="ml-1 text-brand-300 hover:text-red-500"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </th>
                {hours.map((h) => {
                  const cell = h.cells[rows.indexOf(r)];
                  return (
                    <td
                      key={h.u}
                      title={`${r.city.city} ${hourLabel(cell.local)}`}
                      className={[
                        'h-7 border-l border-white/50 dark:border-black/20',
                        cell.working
                          ? h.allWorking
                            ? 'bg-emerald-400 text-white'
                            : 'bg-brand-400/80 text-white'
                          : cell.local < 6 || cell.local >= 22
                            ? 'bg-brand-100 dark:bg-white/[0.03]'
                            : 'bg-brand-50 dark:bg-white/[0.06]',
                      ].join(' ')}
                    >
                      <span className="text-[10px]">{cell.local % 3 === 0 ? cell.local : ''}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-brand-500">
        <span className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded bg-emerald-400" /> Everyone {callMode ? 'reachable' : 'available'}</span>
        <span className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded bg-brand-400/80" /> {callMode ? 'Reachable' : 'Working hours'}</span>
        <span className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded bg-brand-100 dark:bg-white/10" /> Off / night</span>
        <span>Column headers are UTC hours · cell numbers are each location’s local hour.</span>
      </div>

      <div className="card bg-brand-50/60 dark:bg-white/[0.03]">
        <h2 className="font-semibold">{callMode ? 'Best times to call' : 'Best overlapping hours'}</h2>
        {overlapHours.length > 0 ? (
          <>
            <p className="mt-1 text-sm text-brand-600 dark:text-brand-200">
              {overlapHours.length} hour{overlapHours.length === 1 ? '' : 's'} where everyone is {callMode ? 'reachable' : 'in working hours'}:
            </p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {overlapHours.map((h) => (
                <li key={h.u} className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    {String(h.u).padStart(2, '0')}:00 UTC
                  </span>
                  <span className="text-brand-400">
                    {rows.map((r, i) => `${r.city.city} ${hourLabel(h.cells[i].local)}`).join(' · ')}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-1 text-sm text-brand-500">
            No hour works for everyone{callMode ? '' : ' within 9–5 working hours'}. Try widening hours, splitting into two
            calls, or rotating who takes the early/late slot.
          </p>
        )}
      </div>
    </div>
  );
}
