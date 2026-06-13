export const SITE = {
  name: 'Time.Arivanandhan.in',
  shortName: 'Time Tools',
  tagline: 'Time Tools for Global Teams',
  description:
    'Free, fast timezone tools for global teams — convert timezones, plan meetings across countries, compare world clocks, and find overlapping working hours. No sign-up, works offline.',
  url: 'https://time.arivanandhan.in',
  locale: 'en_US',
  twitter: '@arivanandhan',
  author: 'Arivanandhan',
  themeColor: '#426089',
} as const;

export interface ToolMeta {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string;
  /** featured on the homepage grid */
  featured?: boolean;
  keywords: string[];
}

/** Single source of truth for tool pages — drives nav, grid, sitemap & SEO. */
export const TOOLS: ToolMeta[] = [
  {
    slug: 'timezone-converter',
    title: 'Timezone Converter',
    short: 'Convert between any timezones',
    description:
      'Convert any time between any two timezones with automatic daylight-saving handling and a visual 24-hour timeline.',
    icon: '🔄',
    featured: true,
    keywords: ['timezone converter', 'convert time zones', 'time zone conversion', 'gmt converter'],
  },
  {
    slug: 'world-clock',
    title: 'World Clock',
    short: 'Live clocks for multiple cities',
    description:
      'Track the current time in multiple cities at once with live-updating clocks. Add favourites and compare day or night at a glance.',
    icon: '🌍',
    featured: true,
    keywords: ['world clock', 'current time', 'live world clock', 'time in cities'],
  },
  {
    slug: 'meeting-planner',
    title: 'Meeting Planner',
    short: 'Find overlapping working hours',
    description:
      'Find the best meeting time across multiple countries with a visual overlap chart of everyone’s working hours.',
    icon: '📅',
    featured: true,
    keywords: ['meeting planner', 'international meeting scheduler', 'overlapping working hours'],
  },
  {
    slug: 'time-difference',
    title: 'Time Difference Calculator',
    short: 'Compare two locations',
    description:
      'Compare two locations and see the exact hour difference between them right now, with DST taken into account.',
    icon: '⏱️',
    featured: true,
    keywords: ['time difference', 'time difference calculator', 'hours between timezones'],
  },
  {
    slug: 'business-hours',
    title: 'Business Hours Checker',
    short: 'Is a location open right now?',
    description:
      'Instantly see whether a location is inside working hours right now with a clear open / closed indicator.',
    icon: '🏢',
    featured: true,
    keywords: ['business hours checker', 'is it working hours', 'office hours timezone'],
  },
  {
    slug: 'global-team-planner',
    title: 'Global Team Planner',
    short: 'Overlap across India, US, UK, EU, AU',
    description:
      'See overlapping working hours across India, US East, US West, UK, Europe and Australia in one preset view built for distributed teams.',
    icon: '🛰️',
    featured: true,
    keywords: ['global team planner', 'distributed team timezones', 'team overlap hours'],
  },
  {
    slug: 'utc-converter',
    title: 'UTC Converter',
    short: 'UTC ⇄ local time',
    description:
      'Convert UTC to your local time and local time back to UTC instantly. Perfect for logs, APIs and coordinating release windows.',
    icon: '🧭',
    featured: true,
    keywords: ['utc converter', 'utc to local time', 'local to utc', 'gmt to local'],
  },
  {
    slug: 'international-call-planner',
    title: 'International Call Planner',
    short: 'Best times to call abroad',
    description:
      'Find the best times to call between two countries while avoiding everyone’s off-hours and late nights.',
    icon: '📞',
    featured: true,
    keywords: ['international call planner', 'best time to call', 'call abroad time'],
  },
  {
    slug: 'unix-timestamp-converter',
    title: 'Unix Timestamp Converter',
    short: 'Epoch ⇄ human date',
    description:
      'Convert Unix / epoch timestamps to a human-readable date in any timezone, and turn dates back into timestamps.',
    icon: '🔢',
    keywords: ['unix timestamp converter', 'epoch converter', 'unix time to date'],
  },
  {
    slug: 'future-time-calculator',
    title: 'Future Time Calculator',
    short: 'Add or subtract hours',
    description:
      'Work out what time it will be after X hours — or what time it was X hours ago — in any timezone.',
    icon: '⏳',
    keywords: ['future time calculator', 'time after hours', 'add hours to time'],
  },
  {
    slug: 'dst-checker',
    title: 'Daylight Saving Checker',
    short: 'Upcoming DST transitions',
    description:
      'Check whether a location is on daylight saving time right now and see exactly when the next clock change happens.',
    icon: '🌗',
    keywords: ['daylight saving checker', 'dst dates', 'when do clocks change'],
  },
  {
    slug: 'date-duration-calculator',
    title: 'Date Duration Calculator',
    short: 'Days between two dates',
    description:
      'Count the exact number of days, weeks and months between two dates — with or without the end date included.',
    icon: '📆',
    keywords: ['date duration calculator', 'days between dates', 'date difference'],
  },
  {
    slug: 'business-day-calculator',
    title: 'Business Day Calculator',
    short: 'Working days between dates',
    description:
      'Count working days between two dates, excluding weekends, to plan delivery dates and SLAs.',
    icon: '💼',
    keywords: ['business day calculator', 'working days between dates', 'add business days'],
  },
  {
    slug: 'countdown-generator',
    title: 'Countdown Generator',
    short: 'Live countdown to any moment',
    description:
      'Create a live countdown to any date and time, in any timezone — for launches, deadlines and events.',
    icon: '🚀',
    keywords: ['countdown generator', 'countdown timer', 'time until date'],
  },
  {
    slug: 'age-calculator',
    title: 'Age Calculator',
    short: 'Exact age in years, months, days',
    description:
      'Calculate an exact age in years, months and days from a date of birth, plus total days lived.',
    icon: '🎂',
    keywords: ['age calculator', 'calculate age', 'how old am i'],
  },
];

export function toolBySlug(slug: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export const FEATURED_TOOLS = TOOLS.filter((t) => t.featured);
