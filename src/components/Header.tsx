'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SITE } from '@/lib/site';
import ThemeToggle from './ThemeToggle';

const NAV = [
  { href: '/timezone-converter', label: 'Converter' },
  { href: '/world-clock', label: 'World Clock' },
  { href: '/meeting-planner', label: 'Meeting Planner' },
  { href: '/global-team-planner', label: 'Team Planner' },
  { href: '/tools', label: 'All Tools' },
  { href: '/blog', label: 'Blog' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-brand-200/60 bg-white/85 backdrop-blur dark:border-white/10 dark:bg-brand-950/85">
      <div className="container flex h-14 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span aria-hidden className="text-lg">🕒</span>
          <span className="hidden sm:inline">{SITE.name}</span>
          <span className="sm:hidden">Time Tools</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-lg px-3 py-2 text-sm text-brand-700 transition hover:bg-brand-50 hover:text-brand-950 dark:text-brand-200 dark:hover:bg-white/5 dark:hover:text-white"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="btn-ghost !px-2.5 !py-2 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden>{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-brand-200/60 px-4 pb-3 md:hidden dark:border-white/10" aria-label="Mobile">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-brand-700 hover:bg-brand-50 dark:text-brand-200 dark:hover:bg-white/5"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
