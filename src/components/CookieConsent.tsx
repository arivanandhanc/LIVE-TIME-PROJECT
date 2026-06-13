'use client';

import { useEffect, useState } from 'react';

const KEY = 'cookie-consent';

/** Dispatch a window event so Analytics can react to consent changes. */
function setConsent(value: 'granted' | 'denied') {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent('cookie-consent', { detail: value }));
}

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* ignore */
    }
  }, []);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-xl border border-brand-200 bg-white p-4 shadow-lg dark:border-white/15 dark:bg-brand-900"
    >
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-brand-700 dark:text-brand-200">
          We use optional analytics cookies to understand how the tools are used. Calculations always
          run locally and are never sent anywhere.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            className="btn-ghost"
            onClick={() => {
              setConsent('denied');
              setShow(false);
            }}
          >
            Decline
          </button>
          <button
            className="btn-primary"
            onClick={() => {
              setConsent('granted');
              setShow(false);
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
