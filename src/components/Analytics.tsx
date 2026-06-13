'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

/**
 * Loads Google Analytics (GA4) only after the user grants cookie consent.
 * Set NEXT_PUBLIC_GA_ID in your environment to enable it; with no ID this
 * component renders nothing, so the site ships analytics-ready but privacy-first.
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        setAllowed(localStorage.getItem('cookie-consent') === 'granted');
      } catch {
        setAllowed(false);
      }
    };
    read();
    const handler = (e: Event) => setAllowed((e as CustomEvent).detail === 'granted');
    window.addEventListener('cookie-consent', handler);
    return () => window.removeEventListener('cookie-consent', handler);
  }, []);

  if (!gaId || !allowed) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
