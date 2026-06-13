/**
 * Timezone math built entirely on the native Intl API.
 * The browser/Node ship the full IANA tz database, so DST transitions are
 * handled automatically — no moment-timezone / date-fns-tz dependency needed.
 */

/** Offset (in minutes) of a given IANA time zone at a specific instant. */
export function getOffsetMinutes(timeZone: string, date: Date = new Date()): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const parts = dtf.formatToParts(date);
  const map: Record<string, string> = {};
  for (const p of parts) map[p.type] = p.value;
  // Intl can return hour "24" at midnight; normalise to 0.
  const hour = map.hour === '24' ? '0' : map.hour;
  const asUTC = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    Number(hour),
    Number(map.minute),
    Number(map.second),
  );
  return Math.round((asUTC - date.getTime()) / 60000);
}

/** Human readable offset, e.g. "UTC+5:30" or "UTC-8". */
export function formatOffset(minutes: number): string {
  const sign = minutes >= 0 ? '+' : '-';
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return m === 0 ? `UTC${sign}${h}` : `UTC${sign}${h}:${String(m).padStart(2, '0')}`;
}

export interface ZonedParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  weekday: string;
}

/** Break an instant into its wall-clock parts for a given time zone. */
export function getZonedParts(timeZone: string, date: Date = new Date()): ZonedParts {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const map: Record<string, string> = {};
  for (const p of dtf.formatToParts(date)) map[p.type] = p.value;
  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour: map.hour === '24' ? 0 : Number(map.hour),
    minute: Number(map.minute),
    second: Number(map.second),
    weekday: map.weekday,
  };
}

/** Format an instant in a time zone using Intl options. */
export function formatInZone(
  timeZone: string,
  date: Date,
  options: Intl.DateTimeFormatOptions,
  locale = 'en-US',
): string {
  return new Intl.DateTimeFormat(locale, { ...options, timeZone }).format(date);
}

/** "9:30 AM" style clock string. */
export function formatClock(timeZone: string, date: Date, hour12 = true): string {
  return formatInZone(timeZone, date, {
    hour: 'numeric',
    minute: '2-digit',
    hour12,
  });
}

/** "Fri, Jun 13" style date string. */
export function formatDate(timeZone: string, date: Date): string {
  return formatInZone(timeZone, date, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/** Short tz abbreviation, e.g. "PST", "IST", "GMT+2". */
export function getAbbreviation(timeZone: string, date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'short',
    hour: 'numeric',
  }).formatToParts(date);
  const tz = parts.find((p) => p.type === 'timeZoneName');
  return tz?.value ?? '';
}

/**
 * Given a wall-clock time in `fromZone`, return the instant (Date) it represents.
 * Used by converters/planners where the user types a local time.
 */
export function zonedTimeToInstant(
  timeZone: string,
  y: number,
  mo: number,
  d: number,
  h: number,
  mi: number,
): Date {
  // First guess: treat the wall time as if it were UTC.
  const guess = Date.UTC(y, mo - 1, d, h, mi, 0);
  const offset = getOffsetMinutes(timeZone, new Date(guess));
  // Subtract the offset to get the real instant, then refine once for DST edges.
  const instant = guess - offset * 60000;
  const offset2 = getOffsetMinutes(timeZone, new Date(instant));
  if (offset2 !== offset) {
    return new Date(guess - offset2 * 60000);
  }
  return new Date(instant);
}

/** Difference in hours between two zones at the current instant (b relative to a). */
export function hourDifference(zoneA: string, zoneB: string, date: Date = new Date()): number {
  return (getOffsetMinutes(zoneB, date) - getOffsetMinutes(zoneA, date)) / 60;
}

/** Detect whether a zone is currently observing DST (heuristic: compare Jan & Jul). */
export function isDST(timeZone: string, date: Date = new Date()): boolean {
  const year = getZonedParts(timeZone, date).year;
  const jan = getOffsetMinutes(timeZone, new Date(Date.UTC(year, 0, 1)));
  const jul = getOffsetMinutes(timeZone, new Date(Date.UTC(year, 6, 1)));
  const now = getOffsetMinutes(timeZone, date);
  // DST is in effect when the current offset equals the larger of the two.
  return Math.max(jan, jul) !== Math.min(jan, jul) && now === Math.max(jan, jul);
}

/** Find the next DST transition for a zone within the next ~13 months. */
export function nextDSTTransition(
  timeZone: string,
  from: Date = new Date(),
): { date: Date; before: number; after: number } | null {
  let prevOffset = getOffsetMinutes(timeZone, from);
  const step = 6 * 60 * 60 * 1000; // 6h granularity
  const limit = from.getTime() + 400 * 24 * 60 * 60 * 1000;
  for (let t = from.getTime() + step; t < limit; t += step) {
    const offset = getOffsetMinutes(timeZone, new Date(t));
    if (offset !== prevOffset) {
      // Binary-search the minute of change.
      let lo = t - step;
      let hi = t;
      while (hi - lo > 60000) {
        const mid = Math.floor((lo + hi) / 2);
        if (getOffsetMinutes(timeZone, new Date(mid)) === prevOffset) lo = mid;
        else hi = mid;
      }
      return { date: new Date(hi), before: prevOffset, after: offset };
    }
    prevOffset = offset;
  }
  return null;
}

/** Whether a wall-clock hour counts as working time (inclusive start, exclusive end). */
export function isWorkingHour(hour: number, start = 9, end = 17): boolean {
  return hour >= start && hour < end;
}

/** The user's own detected IANA time zone. */
export function localTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}
