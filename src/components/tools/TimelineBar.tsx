'use client';

import { getZonedParts, isWorkingHour } from '@/lib/time';

/**
 * A 24-hour strip for a single zone, anchored to a reference instant.
 * Each cell is one hour of that zone's local day; working hours are tinted and
 * the current hour is outlined.
 */
export default function TimelineBar({
  timeZone,
  baseInstant,
  workStart = 9,
  workEnd = 17,
  highlightHour,
}: {
  timeZone: string;
  baseInstant: Date;
  workStart?: number;
  workEnd?: number;
  highlightHour?: number;
}) {
  // Start from local midnight of the base instant in this zone.
  const parts = getZonedParts(timeZone, baseInstant);
  const cells = Array.from({ length: 24 }, (_, h) => {
    const working = isWorkingHour(h, workStart, workEnd);
    const isNight = h < 6 || h >= 22;
    return { h, working, isNight, current: h === parts.hour };
  });

  return (
    <div className="flex overflow-hidden rounded-md border border-brand-200 dark:border-white/10">
      {cells.map((c) => (
        <div
          key={c.h}
          title={`${String(c.h).padStart(2, '0')}:00`}
          className={[
            'h-8 flex-1 border-r border-white/40 text-[9px] leading-8 last:border-r-0 dark:border-black/30',
            c.working
              ? 'bg-brand-400/80 text-white'
              : c.isNight
                ? 'bg-brand-100 dark:bg-white/[0.03]'
                : 'bg-brand-50 dark:bg-white/[0.06]',
            c.current ? 'ring-2 ring-inset ring-brand-700 dark:ring-white' : '',
            highlightHour === c.h ? 'outline outline-2 outline-amber-400' : '',
          ].join(' ')}
        >
          <span className="hidden text-center sm:block">{c.h % 3 === 0 ? c.h : ''}</span>
        </div>
      ))}
    </div>
  );
}
