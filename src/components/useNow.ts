'use client';

import { useEffect, useState } from 'react';

/**
 * Returns a Date that updates on an interval. Defaults to once per second for
 * live clocks; pass a larger interval for cheaper updates.
 * Starts as `null` on the server/first render to avoid hydration mismatches —
 * callers should guard for that.
 */
export function useNow(intervalMs = 1000): Date | null {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}
