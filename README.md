# Time.Arivanandhan.in — Time Tools for Global Teams

The internet's cleanest free timezone & global-team planning toolkit. Convert
timezones, plan meetings across countries, compare world clocks, and find
overlapping working hours — fast, mobile-friendly, SEO-optimised, and with **no
backend or database**.

All timezone math runs in the browser using the native `Intl` API, which ships
the full IANA timezone database — so daylight saving and unusual offsets (India
+5:30, Nepal +5:45) are always correct, with zero heavy dependencies.

## Tech stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS 3**
- Static generation for every page (one dynamic edge route: the OG image)
- PWA: installable, offline support via service worker
- Dark mode, accessible, mobile-first

## Quick start

```bash
npm install
npm run gen:icons      # generate PWA icons (already committed; run to regenerate)
npm run dev            # http://localhost:3000
npm run build && npm start   # production build
npm run lint
```

Requires Node 18.18+ (developed on Node 24).

## Project structure

```
src/
├─ app/                     # App Router pages (each tool is its own route)
│  ├─ page.tsx              # Homepage (hero search + tool grid)
│  ├─ layout.tsx            # Root layout, metadata, theme script, PWA wiring
│  ├─ timezone-converter/   # …and one folder per tool
│  ├─ blog/                 # Blog index + [slug] articles (20+ posts)
│  ├─ sitemap.ts            # XML sitemap (auto from tools + articles)
│  ├─ robots.ts             # robots.txt
│  ├─ manifest.ts           # PWA web app manifest
│  ├─ og/route.tsx          # Dynamic OpenGraph image (next/og, edge)
│  ├─ offline/ not-found/   # Offline fallback + 404
├─ components/
│  ├─ tools/                # Interactive client components for each tool
│  ├─ Header / Footer / ThemeToggle / CookieConsent / Analytics / AdSlot …
│  ├─ ToolShell.tsx         # Shared tool-page layout (breadcrumbs, FAQ, JSON-LD)
│  └─ CityPicker.tsx        # Accessible city/timezone autocomplete
├─ lib/
│  ├─ time.ts               # All Intl-based timezone math (DST, offsets, transitions)
│  ├─ cities.ts             # Curated world-city dataset + search
│  ├─ site.ts               # Site config + single source of truth for tools
│  ├─ seo.ts                # Metadata + JSON-LD (WebApplication, FAQ, Article, Breadcrumb)
│  └─ blog.ts               # 20+ structured articles
public/
├─ sw.js                    # Service worker (offline-first)
└─ icons/                   # Generated PWA icons
scripts/generate-icons.mjs  # Dependency-free PNG icon generator
```

## Tools included

Featured: Timezone Converter, World Clock, Meeting Planner, Time Difference,
Business Hours Checker, Global Team Planner, UTC Converter, International Call
Planner.

Utilities: Unix Timestamp / Epoch Converter, Future Time Calculator, Daylight
Saving Checker, Date Duration Calculator, Business Day Calculator, Countdown
Generator, Age Calculator.

To add a tool: add an entry to `TOOLS` in `src/lib/site.ts`, create a client
component in `src/components/tools/`, and a route folder under `src/app/`. The
sitemap, footer, and tool grid update automatically.

## SEO

- Per-page metadata, canonical URLs, OpenGraph + Twitter cards (via `buildMetadata`)
- Dynamic OG images at `/og?title=…`
- JSON-LD structured data: `WebSite`, `WebApplication`, `BreadcrumbList`,
  `FAQPage`, `Article`
- `sitemap.xml` and `robots.txt` generated at build time
- Dedicated SEO landing pages for converter, world clock, current time, UTC,
  meeting planner, time difference, business hours, global team planner, etc.

> Update the production domain in `src/lib/site.ts` (`SITE.url`) before deploying.

## Optional integrations (privacy-first)

Copy `.env.example` → `.env.local`:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4. Loads **only after** the visitor accepts the cookie banner. |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Google AdSense publisher ID (`ca-pub-…`). Ad slots render placeholders until set. |

With both blank, the site ships fully functional with no third-party scripts.

## Deployment

### Vercel (recommended)
1. Push to GitHub and import the repo at vercel.com — framework auto-detected.
2. Add any env vars in **Settings → Environment Variables**.
3. Deploy. The OG image route runs on Vercel Edge automatically.

### Netlify
1. Import the repo; Netlify auto-installs `@netlify/plugin-nextjs`.
2. Build command `npm run build`, publish handled by the plugin.
3. Add env vars in **Site settings → Environment variables**.

### Cloudflare Pages
1. Create a Pages project from the repo.
2. Build command: `npx @cloudflare/next-on-pages@1` · output dir: `.vercel/output/static`
   (or use the Workers/OpenNext adapter). Set the **nodejs_compat** flag.
3. Add env vars under the project's settings.

All three support the single dynamic `/og` route as an edge/serverless function;
every other route is static.

## License

© Arivanandhan. All rights reserved.
