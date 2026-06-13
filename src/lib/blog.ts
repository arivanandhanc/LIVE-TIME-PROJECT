export type Block =
  | { t: 'h2'; text: string }
  | { t: 'p'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'quote'; text: string };

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string; // ISO
  readMinutes: number;
  body: Block[];
}

const P = (text: string): Block => ({ t: 'p', text });
const H = (text: string): Block => ({ t: 'h2', text });
const UL = (...items: string[]): Block => ({ t: 'ul', items });
const OL = (...items: string[]): Block => ({ t: 'ol', items });

export const ARTICLES: Article[] = [
  {
    slug: 'what-is-utc',
    title: 'What Is UTC and Why It Matters for Global Teams',
    description:
      'A plain-English explanation of Coordinated Universal Time (UTC), how it differs from GMT, and why every distributed team should standardise on it.',
    category: 'Fundamentals',
    date: '2026-01-08',
    readMinutes: 5,
    body: [
      P('Coordinated Universal Time — UTC — is the time standard the entire world coordinates against. It does not observe daylight saving time and never shifts, which makes it the neutral reference point every other timezone is described in terms of.'),
      H('UTC vs GMT'),
      P('People use UTC and GMT interchangeably, and for everyday purposes they are the same. The difference is technical: GMT is a timezone based on the position of the sun at the Royal Observatory in Greenwich, while UTC is a time standard maintained by atomic clocks. UTC is what computers, aviation, and finance actually run on.'),
      H('Why teams standardise on UTC'),
      UL(
        'It removes ambiguity — "the deploy is at 14:00 UTC" means the same instant for everyone.',
        'It is immune to daylight saving changes, so recurring events never drift.',
        'Logs, databases, and APIs almost always store time in UTC, so your team speaks the same language as your systems.',
      ),
      H('How to use it day to day'),
      P('Pick UTC as the canonical timezone for shared calendars, status pages, and incident timelines. Let each person convert to their local time when they need to — a converter does that instantly. The key habit is to never schedule a cross-border event in a local timezone without also stating the UTC offset.'),
      P('Once a team adopts UTC as its backbone, an entire class of "wait, was that my 3pm or yours?" confusion simply disappears.'),
    ],
  },
  {
    slug: 'what-is-gmt',
    title: 'What Is GMT? Greenwich Mean Time Explained',
    description:
      'Where Greenwich Mean Time comes from, how it relates to UTC, and when you should use one over the other.',
    category: 'Fundamentals',
    date: '2026-01-10',
    readMinutes: 4,
    body: [
      P('Greenwich Mean Time (GMT) is the mean solar time at the Royal Observatory in Greenwich, London. For centuries it was the world’s reference clock, set by the moment the sun crosses the Greenwich meridian.'),
      H('GMT today'),
      P('GMT is still an official timezone — the United Kingdom uses it in winter, switching to British Summer Time (BST, GMT+1) in summer. So "London time" is not always GMT, which trips up a lot of people scheduling calls with the UK.'),
      H('GMT vs UTC'),
      P('For scheduling, GMT and UTC are functionally identical — both sit at offset zero. UTC is the modern, precise standard kept by atomic clocks; GMT is the historical, astronomy-based one. If you are coordinating software or international meetings, prefer UTC.'),
      H('A common mistake'),
      P('Saying "9am GMT" in July when you mean London time is wrong — London is on BST then, an hour ahead. Always check whether the location is currently observing daylight saving before quoting a GMT offset.'),
    ],
  },
  {
    slug: 'understanding-timezones',
    title: 'Understanding Timezones: A Practical Guide',
    description:
      'How timezones work, why offsets are not always whole hours, and how IANA timezone names keep software accurate.',
    category: 'Fundamentals',
    date: '2026-01-12',
    readMinutes: 6,
    body: [
      P('A timezone is a region that keeps the same standard time. The world is divided into roughly 38 of them, offset from UTC in steps that are usually — but not always — whole hours.'),
      H('Why some offsets are 30 or 45 minutes'),
      P('India runs on UTC+5:30, Nepal on UTC+5:45, and parts of Australia on UTC+9:30. These half- and quarter-hour offsets exist for geographic and political reasons, and they are a frequent source of scheduling bugs in software that assumes whole-hour offsets.'),
      H('IANA timezone names'),
      P('Software should never store "EST" or "+05:30". Instead it uses IANA names like America/New_York or Asia/Kolkata. These names encode the full history of a region’s clock rules, including daylight saving transitions, so a date in the past or future converts correctly.'),
      UL(
        'America/New_York — automatically switches between EST and EDT.',
        'Europe/London — switches between GMT and BST.',
        'Asia/Kolkata — fixed at UTC+5:30 with no DST.',
      ),
      H('The practical takeaway'),
      P('When you schedule across borders, think in terms of cities, not abbreviations. "New York" is unambiguous; "EST" is not, because New York is on EDT for more than half the year.'),
    ],
  },
  {
    slug: 'daylight-saving-time-explained',
    title: 'Daylight Saving Time Explained (and Why It Breaks Meetings)',
    description:
      'What daylight saving time is, which countries use it, and how to stop it from quietly shifting your recurring meetings.',
    category: 'Fundamentals',
    date: '2026-01-15',
    readMinutes: 6,
    body: [
      P('Daylight saving time (DST) is the practice of moving clocks forward by an hour in spring and back in autumn to make better use of daylight. Around 70 countries observe some form of it, but the dates differ.'),
      H('Why it breaks recurring meetings'),
      P('The US and Europe change their clocks on different weekends, and the southern hemisphere shifts in the opposite direction. For a few weeks each year, the gap between, say, New York and London is one hour different from usual. A standing call that "always works" suddenly lands an hour early or late.'),
      H('Countries that do not use DST'),
      UL(
        'India, China, Japan, and most of Africa and Asia keep a fixed offset year-round.',
        'Most of Arizona (US) stays on standard time.',
        'Several countries have abolished DST in recent years, so always verify with current data.',
      ),
      H('How to protect your schedule'),
      OL(
        'Anchor recurring meetings to one person’s timezone, not to UTC, so the meeting stays at a sensible local hour for them.',
        'Warn the team in the weeks when offsets are temporarily off.',
        'Use a planner that resolves DST automatically rather than doing the math by hand.',
      ),
    ],
  },
  {
    slug: 'best-practices-global-teams',
    title: 'Best Practices for Managing Time Across Global Teams',
    description:
      'Battle-tested habits for distributed teams: async defaults, overlap windows, and respecting off-hours.',
    category: 'Remote Work',
    date: '2026-01-18',
    readMinutes: 7,
    body: [
      P('When your team spans continents, time is the hardest resource to coordinate. These practices keep collaboration smooth without burning anyone out with 11pm calls.'),
      H('Default to async'),
      P('Treat written, asynchronous communication as the default and synchronous calls as the exception. A clear message, a recorded video, or a well-documented decision lets work continue across timezones without forcing everyone into the same hour.'),
      H('Define a core overlap window'),
      P('Identify the two to four hours when most of the team is awake and reserve them for the meetings that genuinely need to be live. Protect the rest of everyone’s day for deep, uninterrupted work.'),
      H('Respect off-hours explicitly'),
      UL(
        'Schedule send messages so they arrive during the recipient’s working day.',
        'Rotate the "painful" meeting slot so the same region is not always taking the late call.',
        'Make it culturally fine to decline a meeting that lands at midnight.',
      ),
      H('Write times unambiguously'),
      P('Always include the timezone and ideally the UTC offset, and link to a converter so nobody has to do mental arithmetic. "Thu 14:00 UTC (your 7:30pm IST)" beats "tomorrow afternoon" every time.'),
    ],
  },
  {
    slug: 'international-meeting-planning-guide',
    title: 'The Complete International Meeting Planning Guide',
    description:
      'A step-by-step method for scheduling meetings that work across countries without anyone losing sleep.',
    category: 'Meeting Planning',
    date: '2026-01-20',
    readMinutes: 7,
    body: [
      P('Scheduling a meeting across three or more countries is a small optimisation problem. Here is a repeatable method that gets you a fair, workable slot every time.'),
      H('Step 1 — List everyone in UTC'),
      P('Convert each participant’s working hours into UTC. Now you can compare them on a single axis instead of juggling offsets in your head.'),
      H('Step 2 — Find the overlap'),
      P('Look for the window where everyone’s working hours intersect. With wide spreads — say India to US West — the overlap may be only an hour or two, often early morning for one side and evening for the other.'),
      H('Step 3 — Share the load'),
      P('If there is no comfortable overlap, decide who takes the inconvenient hour, and rotate it across recurring meetings so it is not always the same region.'),
      H('Step 4 — Confirm in local time'),
      P('Send the invite with each person’s local time spelled out, and check that the date is right — a 9pm meeting in California is already "tomorrow" in Sydney.'),
      H('Step 5 — Account for holidays'),
      P('Before locking a date, check public holidays in each region. A perfect time slot is useless if half the attendees are on a national holiday.'),
    ],
  },
  {
    slug: 'async-communication-remote-teams',
    title: 'How Async Communication Saves Distributed Teams',
    description:
      'Why asynchronous-first communication is the antidote to timezone fatigue, and how to do it well.',
    category: 'Remote Work',
    date: '2026-01-22',
    readMinutes: 5,
    body: [
      P('Asynchronous communication means not everyone has to be online at the same moment. For teams spread across timezones, it is the single biggest lever for productivity and wellbeing.'),
      H('The cost of synchronous-by-default'),
      P('When every decision needs a call, you force a 12-hour-apart team into overlapping hours that simply do not exist comfortably. Someone always pays with a pre-dawn or late-night meeting.'),
      H('What good async looks like'),
      UL(
        'Decisions are written down where everyone can find them later.',
        'Questions include enough context to be answered without a follow-up.',
        'Status is visible in tools, not trapped in someone’s head or a standup.',
      ),
      H('When to still go synchronous'),
      P('Brainstorming, sensitive feedback, and relationship-building benefit from real-time conversation. Reserve your precious overlap hours for those, and handle everything else in writing.'),
    ],
  },
  {
    slug: 'best-time-to-schedule-meeting-different-timezones',
    title: 'The Best Time to Schedule a Meeting Across Different Timezones',
    description:
      'Concrete guidance on the fairest meeting slots for common timezone pairings like US–India and US–Europe.',
    category: 'Meeting Planning',
    date: '2026-01-25',
    readMinutes: 6,
    body: [
      P('Some timezone pairings have an obvious sweet spot; others require a compromise. Here are practical defaults for the most common cross-border combinations.'),
      H('US East ↔ Europe'),
      P('Mid-morning US Eastern (8–11am) is mid-afternoon to early-evening in Europe. This is one of the friendliest overlaps and rarely needs anyone to stretch.'),
      H('US ↔ India'),
      P('The kind overlap is early morning US (7–9am ET) which is evening in India (5:30–7:30pm IST). US West to India is harder — early morning Pacific lands late evening in India.'),
      H('Europe ↔ India'),
      P('Late morning to early afternoon in Europe overlaps neatly with afternoon-to-evening in India. One of the easier wide-span pairings.'),
      H('US West ↔ Australia'),
      P('There is almost no shared working day. Afternoon in California is the following morning in Sydney — workable, but it always crosses a date boundary, so double-check the day.'),
      H('General rule'),
      P('Aim for the earliest comfortable hour for the western party, which tends to be the latest comfortable hour for the eastern one. A meeting planner makes the trade-off visual.'),
    ],
  },
  {
    slug: 'unix-timestamps-explained',
    title: 'Unix Timestamps and Epoch Time, Explained Simply',
    description:
      'What a Unix timestamp is, why it starts in 1970, and how to read and convert epoch time.',
    category: 'Fundamentals',
    date: '2026-01-28',
    readMinutes: 5,
    body: [
      P('A Unix timestamp is the number of seconds that have elapsed since 00:00:00 UTC on 1 January 1970 — a moment known as the Unix epoch. It is how most software stores and exchanges time.'),
      H('Why 1970?'),
      P('The epoch was chosen by the engineers building early Unix systems as a convenient recent starting point. It stuck, and now it underpins databases, APIs, and operating systems everywhere.'),
      H('Seconds vs milliseconds'),
      P('Unix timestamps are traditionally in seconds, but JavaScript and many APIs use milliseconds — a 13-digit number instead of 10. If your converted date lands in 1970 or far in the future, you probably mixed up the two.'),
      H('Why engineers love it'),
      UL(
        'It is a single integer — easy to store, sort, and compare.',
        'It is timezone-independent, always counting from UTC.',
        'Arithmetic like "two hours later" is just adding 7200 seconds.',
      ),
      P('When you need a human-readable date, a timestamp converter turns the integer into a local date in any timezone you choose.'),
    ],
  },
  {
    slug: 'avoiding-timezone-bugs-software',
    title: 'Avoiding Timezone Bugs in Software',
    description:
      'The classic timezone mistakes developers make and the simple rules that prevent them.',
    category: 'Engineering',
    date: '2026-02-01',
    readMinutes: 6,
    body: [
      P('Timezone bugs are notorious because they often pass tests and only break in production for users in the "wrong" part of the world. A few disciplined rules prevent almost all of them.'),
      H('Store everything in UTC'),
      P('Persist all timestamps in UTC and convert to local time only at the moment you display them. Mixing local times in your database is the root of most timezone pain.'),
      H('Use IANA names, never offsets'),
      P('Store Europe/London, not "+00:00" or "GMT". Offsets change with daylight saving; the IANA name carries the rules so conversions stay correct across DST boundaries and historical dates.'),
      H('Beware the DST edge cases'),
      UL(
        'Some wall-clock times do not exist (the spring-forward hour) or happen twice (the autumn fall-back hour).',
        'Adding "24 hours" is not the same as "tomorrow at the same time" across a DST change.',
        'Always test with a half-hour-offset zone like Asia/Kolkata to catch whole-hour assumptions.',
      ),
      H('Let the platform do the math'),
      P('Modern environments ship the full IANA database. Use the built-in Intl API or a well-maintained library rather than hand-rolling offset arithmetic.'),
    ],
  },
  {
    slug: 'remote-work-across-timezones',
    title: 'Thriving in Remote Work Across Timezones',
    description:
      'Personal strategies for staying productive and connected when your team is scattered around the globe.',
    category: 'Remote Work',
    date: '2026-02-04',
    readMinutes: 6,
    body: [
      P('Working with colleagues many hours ahead or behind you is freeing but demands intention. These habits help you stay effective without being permanently on call.'),
      H('Design your overlap deliberately'),
      P('Know exactly when your key collaborators are online and concentrate your real-time communication there. Use the rest of your day for focused work that does not need anyone else awake.'),
      H('Hand off cleanly'),
      P('In a true follow-the-sun setup, end your day by writing a short handover: what you finished, what is blocked, and what the next person should pick up. The next timezone starts with momentum instead of questions.'),
      H('Guard your boundaries'),
      UL(
        'Set your working hours in shared calendars and honour them.',
        'Mute notifications outside those hours so a 2am ping does not wake you.',
        'Resist the pull to be "always available" just because someone, somewhere, is working.',
      ),
      P('Distributed work rewards clarity and trust far more than constant presence.'),
    ],
  },
  {
    slug: 'follow-the-sun-support-model',
    title: 'The Follow-the-Sun Support Model, Explained',
    description:
      'How global teams use timezone differences to deliver 24-hour coverage without night shifts.',
    category: 'Global Teams',
    date: '2026-02-07',
    readMinutes: 6,
    body: [
      P('Follow-the-sun is a workflow where work passes between teams in different timezones so that someone is always working during their normal daytime. It is how global support and engineering teams achieve round-the-clock coverage humanely.'),
      H('How it works'),
      P('A ticket opened in Asia gets worked during Asian business hours, handed to Europe as Asia logs off, then to the Americas, and back to Asia — a continuous relay around the globe.'),
      H('What makes it succeed'),
      UL(
        'Roughly evenly spaced timezones, so handovers happen near the end of each working day.',
        'Excellent written handovers, because the next team cannot just tap you on the shoulder.',
        'Shared tooling so context travels with the work, not the people.',
      ),
      H('Where it struggles'),
      P('Without disciplined documentation, follow-the-sun degrades into dropped context and duplicated effort. The model only pays off when every handoff is clean and every region trusts the next.'),
    ],
  },
  {
    slug: 'how-to-run-effective-global-standups',
    title: 'How to Run Effective Standups for Global Teams',
    description:
      'Rethinking the daily standup when your team can never all be awake at once.',
    category: 'Global Teams',
    date: '2026-02-10',
    readMinutes: 5,
    body: [
      P('The classic daily standup assumes everyone is in the room — or at least awake — at the same time. For a globally distributed team, that assumption falls apart. Here is how to keep the benefits without the 6am calls.'),
      H('Go written and async'),
      P('Replace the live meeting with a short written update each person posts at the start of their day: what they did, what they will do, and any blockers. Everyone reads at their convenience.'),
      H('Keep a thin synchronous core'),
      P('If you value face time, hold a brief live standup only for the sub-team that shares an overlap, and let the wider group rely on the written thread.'),
      H('Make blockers loud'),
      P('The one thing that must not wait is a blocker. Flag them clearly so whoever comes online next — in any timezone — can unblock the work and keep it moving around the clock.'),
    ],
  },
  {
    slug: 'choosing-a-timezone-for-your-startup',
    title: 'Choosing a "Company Timezone" for Your Startup',
    description:
      'Should a distributed startup pick an official timezone? The trade-offs and a recommendation.',
    category: 'Global Teams',
    date: '2026-02-13',
    readMinutes: 5,
    body: [
      P('As soon as a startup hires across borders, the question arises: should we declare an official company timezone? The answer shapes culture more than people expect.'),
      H('The case for a company timezone'),
      P('A single reference timezone simplifies scheduling, deadlines, and "end of day". Everyone knows what "Friday 5pm company time" means without conversion.'),
      H('The case against'),
      P('Anchoring everything to one timezone quietly privileges the people who live in it and disadvantages everyone else, whose "company hours" may fall at night.'),
      H('A balanced approach'),
      UL(
        'Use UTC as the neutral reference for deadlines and shared events.',
        'Define a core overlap window rather than full company hours.',
        'Let individuals keep their local working hours for everything async.',
      ),
      P('UTC as the backbone plus a respected overlap window gives you coordination without favouritism.'),
    ],
  },
  {
    slug: 'planning-product-launches-across-timezones',
    title: 'Planning a Product Launch Across Timezones',
    description:
      'How to pick a launch time that maximises reach when your audience spans the globe.',
    category: 'Meeting Planning',
    date: '2026-02-16',
    readMinutes: 5,
    body: [
      P('A global launch lives or dies on timing. Go too early and your biggest markets are asleep; too late and the news cycle has moved on. Here is how to choose.'),
      H('Anchor to your largest market'),
      P('Pick the timezone where most of your audience lives and aim for their mid-morning, when attention and energy are highest. Other regions will catch the wave as they wake.'),
      H('Coordinate the team in UTC'),
      P('Express the launch moment in UTC for everyone executing it — engineering, marketing, support — so nobody pushes the button an hour early because they read the schedule in their own timezone.'),
      H('Staff the hours after launch'),
      UL(
        'Make sure support is online in the regions that will see it first.',
        'Schedule social posts to re-surface as other timezones come online.',
        'Have a rollback owner awake for the critical first hours.',
      ),
    ],
  },
  {
    slug: 'time-blindness-distributed-teams',
    title: 'Fighting "Timezone Blindness" on Distributed Teams',
    description:
      'Why we forget colleagues are asleep, and the small habits that keep us mindful of each other’s clocks.',
    category: 'Remote Work',
    date: '2026-02-19',
    readMinutes: 4,
    body: [
      P('Timezone blindness is the easy, unintentional habit of forgetting that a colleague is fast asleep when you fire off a message expecting a quick reply. Left unchecked, it erodes trust and boundaries.'),
      H('Make the clock visible'),
      P('Add a couple of teammates’ local times to a world clock you glance at daily. Seeing "11:40pm" next to a name is a powerful nudge not to expect an instant answer.'),
      H('Use schedule-send'),
      P('Write when it suits you, but let your tools deliver the message during the recipient’s working hours. It removes the implicit pressure to respond at night.'),
      H('Set expectations in writing'),
      P('Label genuinely urgent messages as urgent, and let everything else wait. When people trust that "no reply yet" means "still asleep," not "ignoring you," the whole team relaxes.'),
    ],
  },
  {
    slug: 'public-holidays-global-scheduling',
    title: 'Don’t Forget Public Holidays When Scheduling Globally',
    description:
      'Why holidays are the silent killer of international schedules, and how to plan around them.',
    category: 'Meeting Planning',
    date: '2026-02-22',
    readMinutes: 4,
    body: [
      P('You can find the perfect overlapping hour and still schedule a meeting nobody attends — because it is a national holiday for half the room. Holidays are the most overlooked variable in global scheduling.'),
      H('Holidays are wildly different'),
      P('Public holidays vary by country, region, and even religion, and many move each year with lunar or local calendars. Assuming everyone shares your days off is a recipe for empty meetings.'),
      H('Build a shared holiday view'),
      UL(
        'Maintain a shared calendar with each region’s public holidays.',
        'Check it before locking recurring meetings or deadlines.',
        'Watch for long holiday stretches when an entire region effectively pauses.',
      ),
      H('Plan around, not through'),
      P('When a key region is out, move the deadline rather than expecting heroics. Respecting holidays signals that you value people over schedules — and they will return the favour.'),
    ],
  },
  {
    slug: 'why-12-vs-24-hour-time-matters',
    title: 'Why 12-Hour vs 24-Hour Time Matters for Global Teams',
    description:
      'How clock-format differences cause scheduling errors, and how to write times everyone reads the same way.',
    category: 'Fundamentals',
    date: '2026-02-25',
    readMinutes: 4,
    body: [
      P('Half the world reads "7:00" and pictures the evening; the other half needs to see "PM" to be sure. The 12- versus 24-hour clock divide causes more scheduling mistakes than people admit.'),
      H('Where each is used'),
      P('The US, UK, and several others favour the 12-hour clock with AM/PM, while most of Europe, Asia, and the military use the 24-hour clock. Neither is wrong, but mixing them invites error.'),
      H('Write times unambiguously'),
      UL(
        'Always include AM/PM when using the 12-hour format.',
        'Prefer 24-hour time in writing for international audiences — "14:00" cannot be misread.',
        'Add the timezone, e.g. "14:00 UTC", so the format and the offset are both pinned down.',
      ),
      P('A tiny formatting habit prevents a colleague from showing up twelve hours late.'),
    ],
  },
  {
    slug: 'international-call-etiquette',
    title: 'International Call Etiquette: When and How to Call Abroad',
    description:
      'Practical rules for calling across countries without interrupting dinners, sleep, or weekends.',
    category: 'Global Teams',
    date: '2026-02-28',
    readMinutes: 4,
    body: [
      P('A well-timed call builds relationships; a badly-timed one wakes someone’s family. When you are dialling across timezones, a little etiquette goes a long way.'),
      H('Check before you dial'),
      P('Always confirm the recipient’s local time before calling. What feels like a normal mid-afternoon for you might be the middle of their night.'),
      H('Aim for the comfortable hours'),
      UL(
        'Mid-morning and mid-afternoon are safest; avoid the first and last hour of the working day.',
        'Steer clear of lunch hours, which vary by culture.',
        'Never assume a weekend or public holiday is a workday for them.',
      ),
      H('Propose, don’t impose'),
      P('Offer a couple of options in the other person’s local time and let them choose. A call planner makes finding those mutually civilised windows trivial.'),
    ],
  },
  {
    slug: 'measuring-overlap-hours-team-design',
    title: 'Using Overlap Hours to Design a Better Global Team',
    description:
      'Why the number of shared working hours should shape who you hire and how you structure work.',
    category: 'Global Teams',
    date: '2026-03-03',
    readMinutes: 5,
    body: [
      P('Overlap hours — the time when two people’s working days coincide — are a measurable asset. Treating them as a design input, not an afterthought, leads to healthier, faster teams.'),
      H('Overlap shapes everything'),
      P('A pair with six overlapping hours can collaborate almost like co-located colleagues. A pair with one hour must work async or one of them works unsociable times. Knowing the number up front sets realistic expectations.'),
      H('Hire with overlap in mind'),
      UL(
        'For roles that need tight real-time collaboration, prefer candidates with healthy overlap.',
        'For independent, deliverable-based roles, wide timezone spread is an advantage — it extends coverage.',
        'Cluster tightly-coupled sub-teams within a few hours of each other.',
      ),
      H('Make overlap visible'),
      P('Chart your team’s overlap once and you will instantly see where collaboration is easy and where it needs deliberate async support. A team planner does this in seconds.'),
    ],
  },
];

export function articleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export const ARTICLES_SORTED = [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));
