'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { City, searchCities } from '@/lib/cities';

/** Accessible city/timezone autocomplete used across all the tools. */
export default function CityPicker({
  onSelect,
  placeholder = 'Search city, country or timezone…',
  autoFocus = false,
}: {
  onSelect: (city: City) => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listId = useId();
  const boxRef = useRef<HTMLDivElement>(null);

  // Derive results during render instead of syncing via an effect.
  const results = useMemo(() => searchCities(query), [query]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  function choose(city: City) {
    onSelect(city);
    setQuery('');
    setActive(0);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div ref={boxRef} className="relative">
      <input
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        autoFocus={autoFocus}
        className="input"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => query && setOpen(true)}
        onKeyDown={onKeyDown}
      />
      {open && results.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1 max-h-72 w-full overflow-auto rounded-lg border border-brand-200 bg-white py-1 shadow-lg dark:border-white/15 dark:bg-brand-900"
        >
          {results.map((c, i) => (
            <li
              key={`${c.city}-${c.timeZone}`}
              role="option"
              aria-selected={i === active}
              className={`flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm ${
                i === active ? 'bg-brand-50 dark:bg-white/10' : ''
              }`}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                choose(c);
              }}
            >
              <span className="flex items-center gap-2">
                <span aria-hidden>{c.flag}</span>
                <span className="font-medium text-brand-950 dark:text-white">{c.city}</span>
                <span className="text-brand-400">{c.country}</span>
              </span>
              <span className="font-mono text-xs text-brand-400">{c.timeZone}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
