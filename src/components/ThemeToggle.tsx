'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
      className="btn-ghost !px-2.5 !py-2"
      title="Toggle theme"
    >
      {/* Render a stable icon until mounted to avoid hydration mismatch */}
      <span aria-hidden className="text-base leading-none">
        {mounted ? (dark ? '☀️' : '🌙') : '🌓'}
      </span>
    </button>
  );
}
