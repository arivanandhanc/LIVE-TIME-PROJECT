export interface City {
  city: string;
  country: string;
  countryCode: string;
  timeZone: string;
  flag: string;
  /** Rough population (millions) used to rank search results. */
  pop: number;
  aliases?: string[];
}

/**
 * Curated list of major world cities. Kept hand-maintained (rather than a huge
 * generated blob) so search stays fast and results are relevant. The IANA
 * `timeZone` is what drives all the math — DST is resolved by the Intl engine.
 */
export const CITIES: City[] = [
  // South Asia
  { city: 'Mumbai', country: 'India', countryCode: 'IN', timeZone: 'Asia/Kolkata', flag: '🇮🇳', pop: 20.4, aliases: ['bombay'] },
  { city: 'New Delhi', country: 'India', countryCode: 'IN', timeZone: 'Asia/Kolkata', flag: '🇮🇳', pop: 28.5, aliases: ['delhi'] },
  { city: 'Bengaluru', country: 'India', countryCode: 'IN', timeZone: 'Asia/Kolkata', flag: '🇮🇳', pop: 12.3, aliases: ['bangalore'] },
  { city: 'Chennai', country: 'India', countryCode: 'IN', timeZone: 'Asia/Kolkata', flag: '🇮🇳', pop: 10.9, aliases: ['madras'] },
  { city: 'Hyderabad', country: 'India', countryCode: 'IN', timeZone: 'Asia/Kolkata', flag: '🇮🇳', pop: 9.5 },
  { city: 'Kolkata', country: 'India', countryCode: 'IN', timeZone: 'Asia/Kolkata', flag: '🇮🇳', pop: 14.8, aliases: ['calcutta'] },
  { city: 'Colombo', country: 'Sri Lanka', countryCode: 'LK', timeZone: 'Asia/Colombo', flag: '🇱🇰', pop: 0.75 },
  { city: 'Karachi', country: 'Pakistan', countryCode: 'PK', timeZone: 'Asia/Karachi', flag: '🇵🇰', pop: 16.0 },
  { city: 'Dhaka', country: 'Bangladesh', countryCode: 'BD', timeZone: 'Asia/Dhaka', flag: '🇧🇩', pop: 21.0 },
  { city: 'Kathmandu', country: 'Nepal', countryCode: 'NP', timeZone: 'Asia/Kathmandu', flag: '🇳🇵', pop: 1.4 },

  // Middle East
  { city: 'Dubai', country: 'United Arab Emirates', countryCode: 'AE', timeZone: 'Asia/Dubai', flag: '🇦🇪', pop: 3.3 },
  { city: 'Abu Dhabi', country: 'United Arab Emirates', countryCode: 'AE', timeZone: 'Asia/Dubai', flag: '🇦🇪', pop: 1.5 },
  { city: 'Riyadh', country: 'Saudi Arabia', countryCode: 'SA', timeZone: 'Asia/Riyadh', flag: '🇸🇦', pop: 7.0 },
  { city: 'Doha', country: 'Qatar', countryCode: 'QA', timeZone: 'Asia/Qatar', flag: '🇶🇦', pop: 2.4 },
  { city: 'Tel Aviv', country: 'Israel', countryCode: 'IL', timeZone: 'Asia/Jerusalem', flag: '🇮🇱', pop: 4.2 },
  { city: 'Istanbul', country: 'Turkey', countryCode: 'TR', timeZone: 'Europe/Istanbul', flag: '🇹🇷', pop: 15.5 },
  { city: 'Tehran', country: 'Iran', countryCode: 'IR', timeZone: 'Asia/Tehran', flag: '🇮🇷', pop: 9.0 },

  // East & SE Asia
  { city: 'Singapore', country: 'Singapore', countryCode: 'SG', timeZone: 'Asia/Singapore', flag: '🇸🇬', pop: 5.7 },
  { city: 'Hong Kong', country: 'Hong Kong', countryCode: 'HK', timeZone: 'Asia/Hong_Kong', flag: '🇭🇰', pop: 7.5 },
  { city: 'Tokyo', country: 'Japan', countryCode: 'JP', timeZone: 'Asia/Tokyo', flag: '🇯🇵', pop: 37.4 },
  { city: 'Osaka', country: 'Japan', countryCode: 'JP', timeZone: 'Asia/Tokyo', flag: '🇯🇵', pop: 19.2 },
  { city: 'Seoul', country: 'South Korea', countryCode: 'KR', timeZone: 'Asia/Seoul', flag: '🇰🇷', pop: 25.5 },
  { city: 'Beijing', country: 'China', countryCode: 'CN', timeZone: 'Asia/Shanghai', flag: '🇨🇳', pop: 20.5 },
  { city: 'Shanghai', country: 'China', countryCode: 'CN', timeZone: 'Asia/Shanghai', flag: '🇨🇳', pop: 27.0 },
  { city: 'Shenzhen', country: 'China', countryCode: 'CN', timeZone: 'Asia/Shanghai', flag: '🇨🇳', pop: 12.5 },
  { city: 'Bangkok', country: 'Thailand', countryCode: 'TH', timeZone: 'Asia/Bangkok', flag: '🇹🇭', pop: 10.5 },
  { city: 'Jakarta', country: 'Indonesia', countryCode: 'ID', timeZone: 'Asia/Jakarta', flag: '🇮🇩', pop: 10.6 },
  { city: 'Kuala Lumpur', country: 'Malaysia', countryCode: 'MY', timeZone: 'Asia/Kuala_Lumpur', flag: '🇲🇾', pop: 7.8 },
  { city: 'Manila', country: 'Philippines', countryCode: 'PH', timeZone: 'Asia/Manila', flag: '🇵🇭', pop: 13.5 },
  { city: 'Ho Chi Minh City', country: 'Vietnam', countryCode: 'VN', timeZone: 'Asia/Ho_Chi_Minh', flag: '🇻🇳', pop: 8.6, aliases: ['saigon'] },
  { city: 'Taipei', country: 'Taiwan', countryCode: 'TW', timeZone: 'Asia/Taipei', flag: '🇹🇼', pop: 7.0 },

  // Europe
  { city: 'London', country: 'United Kingdom', countryCode: 'GB', timeZone: 'Europe/London', flag: '🇬🇧', pop: 9.3 },
  { city: 'Manchester', country: 'United Kingdom', countryCode: 'GB', timeZone: 'Europe/London', flag: '🇬🇧', pop: 2.7 },
  { city: 'Dublin', country: 'Ireland', countryCode: 'IE', timeZone: 'Europe/Dublin', flag: '🇮🇪', pop: 1.4 },
  { city: 'Paris', country: 'France', countryCode: 'FR', timeZone: 'Europe/Paris', flag: '🇫🇷', pop: 11.0 },
  { city: 'Berlin', country: 'Germany', countryCode: 'DE', timeZone: 'Europe/Berlin', flag: '🇩🇪', pop: 3.6 },
  { city: 'Munich', country: 'Germany', countryCode: 'DE', timeZone: 'Europe/Berlin', flag: '🇩🇪', pop: 1.5 },
  { city: 'Frankfurt', country: 'Germany', countryCode: 'DE', timeZone: 'Europe/Berlin', flag: '🇩🇪', pop: 0.75 },
  { city: 'Madrid', country: 'Spain', countryCode: 'ES', timeZone: 'Europe/Madrid', flag: '🇪🇸', pop: 6.6 },
  { city: 'Barcelona', country: 'Spain', countryCode: 'ES', timeZone: 'Europe/Madrid', flag: '🇪🇸', pop: 5.6 },
  { city: 'Rome', country: 'Italy', countryCode: 'IT', timeZone: 'Europe/Rome', flag: '🇮🇹', pop: 4.3 },
  { city: 'Milan', country: 'Italy', countryCode: 'IT', timeZone: 'Europe/Rome', flag: '🇮🇹', pop: 3.1 },
  { city: 'Amsterdam', country: 'Netherlands', countryCode: 'NL', timeZone: 'Europe/Amsterdam', flag: '🇳🇱', pop: 1.1 },
  { city: 'Brussels', country: 'Belgium', countryCode: 'BE', timeZone: 'Europe/Brussels', flag: '🇧🇪', pop: 2.1 },
  { city: 'Zurich', country: 'Switzerland', countryCode: 'CH', timeZone: 'Europe/Zurich', flag: '🇨🇭', pop: 1.4 },
  { city: 'Vienna', country: 'Austria', countryCode: 'AT', timeZone: 'Europe/Vienna', flag: '🇦🇹', pop: 1.9 },
  { city: 'Stockholm', country: 'Sweden', countryCode: 'SE', timeZone: 'Europe/Stockholm', flag: '🇸🇪', pop: 1.6 },
  { city: 'Oslo', country: 'Norway', countryCode: 'NO', timeZone: 'Europe/Oslo', flag: '🇳🇴', pop: 1.0 },
  { city: 'Copenhagen', country: 'Denmark', countryCode: 'DK', timeZone: 'Europe/Copenhagen', flag: '🇩🇰', pop: 1.3 },
  { city: 'Helsinki', country: 'Finland', countryCode: 'FI', timeZone: 'Europe/Helsinki', flag: '🇫🇮', pop: 1.3 },
  { city: 'Warsaw', country: 'Poland', countryCode: 'PL', timeZone: 'Europe/Warsaw', flag: '🇵🇱', pop: 1.8 },
  { city: 'Lisbon', country: 'Portugal', countryCode: 'PT', timeZone: 'Europe/Lisbon', flag: '🇵🇹', pop: 2.9 },
  { city: 'Athens', country: 'Greece', countryCode: 'GR', timeZone: 'Europe/Athens', flag: '🇬🇷', pop: 3.2 },
  { city: 'Moscow', country: 'Russia', countryCode: 'RU', timeZone: 'Europe/Moscow', flag: '🇷🇺', pop: 12.5 },
  { city: 'Kyiv', country: 'Ukraine', countryCode: 'UA', timeZone: 'Europe/Kyiv', flag: '🇺🇦', pop: 3.0, aliases: ['kiev'] },

  // Africa
  { city: 'Cairo', country: 'Egypt', countryCode: 'EG', timeZone: 'Africa/Cairo', flag: '🇪🇬', pop: 20.9 },
  { city: 'Lagos', country: 'Nigeria', countryCode: 'NG', timeZone: 'Africa/Lagos', flag: '🇳🇬', pop: 14.4 },
  { city: 'Nairobi', country: 'Kenya', countryCode: 'KE', timeZone: 'Africa/Nairobi', flag: '🇰🇪', pop: 4.7 },
  { city: 'Johannesburg', country: 'South Africa', countryCode: 'ZA', timeZone: 'Africa/Johannesburg', flag: '🇿🇦', pop: 5.8 },
  { city: 'Cape Town', country: 'South Africa', countryCode: 'ZA', timeZone: 'Africa/Johannesburg', flag: '🇿🇦', pop: 4.6 },
  { city: 'Casablanca', country: 'Morocco', countryCode: 'MA', timeZone: 'Africa/Casablanca', flag: '🇲🇦', pop: 3.7 },
  { city: 'Accra', country: 'Ghana', countryCode: 'GH', timeZone: 'Africa/Accra', flag: '🇬🇭', pop: 2.5 },

  // North America
  { city: 'New York', country: 'United States', countryCode: 'US', timeZone: 'America/New_York', flag: '🇺🇸', pop: 18.8, aliases: ['nyc', 'usa east', 'us east'] },
  { city: 'Washington, D.C.', country: 'United States', countryCode: 'US', timeZone: 'America/New_York', flag: '🇺🇸', pop: 5.4, aliases: ['dc'] },
  { city: 'Boston', country: 'United States', countryCode: 'US', timeZone: 'America/New_York', flag: '🇺🇸', pop: 4.3 },
  { city: 'Atlanta', country: 'United States', countryCode: 'US', timeZone: 'America/New_York', flag: '🇺🇸', pop: 5.9 },
  { city: 'Miami', country: 'United States', countryCode: 'US', timeZone: 'America/New_York', flag: '🇺🇸', pop: 6.1 },
  { city: 'Chicago', country: 'United States', countryCode: 'US', timeZone: 'America/Chicago', flag: '🇺🇸', pop: 8.9, aliases: ['usa central'] },
  { city: 'Dallas', country: 'United States', countryCode: 'US', timeZone: 'America/Chicago', flag: '🇺🇸', pop: 7.6 },
  { city: 'Houston', country: 'United States', countryCode: 'US', timeZone: 'America/Chicago', flag: '🇺🇸', pop: 7.1 },
  { city: 'Denver', country: 'United States', countryCode: 'US', timeZone: 'America/Denver', flag: '🇺🇸', pop: 2.9, aliases: ['usa mountain'] },
  { city: 'Phoenix', country: 'United States', countryCode: 'US', timeZone: 'America/Phoenix', flag: '🇺🇸', pop: 4.9 },
  { city: 'Los Angeles', country: 'United States', countryCode: 'US', timeZone: 'America/Los_Angeles', flag: '🇺🇸', pop: 12.4, aliases: ['la', 'usa west', 'us west'] },
  { city: 'San Francisco', country: 'United States', countryCode: 'US', timeZone: 'America/Los_Angeles', flag: '🇺🇸', pop: 4.7, aliases: ['sf', 'bay area'] },
  { city: 'Seattle', country: 'United States', countryCode: 'US', timeZone: 'America/Los_Angeles', flag: '🇺🇸', pop: 4.0 },
  { city: 'Toronto', country: 'Canada', countryCode: 'CA', timeZone: 'America/Toronto', flag: '🇨🇦', pop: 6.3 },
  { city: 'Vancouver', country: 'Canada', countryCode: 'CA', timeZone: 'America/Vancouver', flag: '🇨🇦', pop: 2.6 },
  { city: 'Montreal', country: 'Canada', countryCode: 'CA', timeZone: 'America/Toronto', flag: '🇨🇦', pop: 4.2 },
  { city: 'Mexico City', country: 'Mexico', countryCode: 'MX', timeZone: 'America/Mexico_City', flag: '🇲🇽', pop: 21.8 },

  // South America
  { city: 'São Paulo', country: 'Brazil', countryCode: 'BR', timeZone: 'America/Sao_Paulo', flag: '🇧🇷', pop: 22.0, aliases: ['sao paulo'] },
  { city: 'Rio de Janeiro', country: 'Brazil', countryCode: 'BR', timeZone: 'America/Sao_Paulo', flag: '🇧🇷', pop: 13.5 },
  { city: 'Buenos Aires', country: 'Argentina', countryCode: 'AR', timeZone: 'America/Argentina/Buenos_Aires', flag: '🇦🇷', pop: 15.2 },
  { city: 'Santiago', country: 'Chile', countryCode: 'CL', timeZone: 'America/Santiago', flag: '🇨🇱', pop: 6.8 },
  { city: 'Bogotá', country: 'Colombia', countryCode: 'CO', timeZone: 'America/Bogota', flag: '🇨🇴', pop: 11.0, aliases: ['bogota'] },
  { city: 'Lima', country: 'Peru', countryCode: 'PE', timeZone: 'America/Lima', flag: '🇵🇪', pop: 10.7 },

  // Oceania
  { city: 'Sydney', country: 'Australia', countryCode: 'AU', timeZone: 'Australia/Sydney', flag: '🇦🇺', pop: 5.3 },
  { city: 'Melbourne', country: 'Australia', countryCode: 'AU', timeZone: 'Australia/Melbourne', flag: '🇦🇺', pop: 5.0 },
  { city: 'Brisbane', country: 'Australia', countryCode: 'AU', timeZone: 'Australia/Brisbane', flag: '🇦🇺', pop: 2.5 },
  { city: 'Perth', country: 'Australia', countryCode: 'AU', timeZone: 'Australia/Perth', flag: '🇦🇺', pop: 2.1 },
  { city: 'Auckland', country: 'New Zealand', countryCode: 'NZ', timeZone: 'Pacific/Auckland', flag: '🇳🇿', pop: 1.7 },

  // Reference zone
  { city: 'UTC', country: 'Coordinated Universal Time', countryCode: 'UN', timeZone: 'UTC', flag: '🌐', pop: 0, aliases: ['gmt', 'zulu', 'universal'] },
];

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export function searchCities(query: string, limit = 8): City[] {
  const q = norm(query.trim());
  if (!q) return [];
  const scored: { city: City; score: number }[] = [];
  for (const c of CITIES) {
    const name = norm(c.city);
    const country = norm(c.country);
    const tz = norm(c.timeZone.replace(/_/g, ' '));
    const aliasHit = c.aliases?.some((a) => norm(a).includes(q));
    let score = -1;
    if (name === q) score = 1000;
    else if (name.startsWith(q)) score = 800;
    else if (name.includes(q)) score = 600;
    else if (aliasHit) score = 550;
    else if (country.startsWith(q)) score = 400;
    else if (country.includes(q)) score = 300;
    else if (tz.includes(q)) score = 200;
    if (score >= 0) scored.push({ city: c, score: score + c.pop });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.city);
}

export function cityByZone(timeZone: string): City | undefined {
  return CITIES.find((c) => c.timeZone === timeZone);
}

/** Stable id for a city (used as React keys / saved-state). */
export function cityId(c: City): string {
  return `${c.city}|${c.timeZone}`;
}
