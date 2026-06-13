'use client';

import { useEffect, useRef } from 'react';

/**
 * Google AdSense placeholder. Reserves layout space (no CLS) and only renders a
 * live ad unit when NEXT_PUBLIC_ADSENSE_CLIENT is configured. Until then it shows
 * a neutral, unobtrusive placeholder so the layout is final.
 */
export default function AdSlot({
  slot,
  className = '',
  format = 'auto',
}: {
  slot?: string;
  className?: string;
  format?: string;
}) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!client) return;
    try {
      // @ts-expect-error adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ignore */
    }
  }, [client]);

  if (!client) {
    return (
      <div
        className={`flex min-h-[90px] items-center justify-center rounded-lg border border-dashed border-brand-200 text-xs text-brand-400 dark:border-white/10 ${className}`}
        aria-hidden
      >
        Advertisement
      </div>
    );
  }

  return (
    <ins
      ref={ref}
      className={`adsbygoogle block ${className}`}
      style={{ display: 'block' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
