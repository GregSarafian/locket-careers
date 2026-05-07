export type Perk = {
  iconKey: string;
  title: string;
  body: string;
  /** Marks the final tile, which uses an outlined style. */
  outlined?: boolean;
};

export const perks: Perk[] = [
  {
    iconKey: 'wallet',
    title: 'Significant Equity & Competitive Salary',
    body:
      "We're still a small team and want our next teammates to feel true ownership over the company.",
  },
  {
    iconKey: 'globe',
    title: 'Remote Friendly & Hybrid in San Francisco',
    body: 'Remote friendly for anyone ±3 hours of Pacific Time, excluding Vietnam.',
  },
  {
    iconKey: 'ticket',
    title: 'Regular Team Offsites',
    body: 'The entire team comes together multiple times a year in a new place.',
  },
  {
    iconKey: 'heart',
    title: 'Medical Coverage',
    body: 'Dental, Health, and Vision Coverage',
  },
  {
    iconKey: 'dumbbell',
    title: 'Wellness Benefit',
    body: 'Monthly stipend to support your mental and physical wellness',
  },
  {
    iconKey: 'chart',
    title: '401K Matching',
    body: 'To support your personal, professional, and financial growth',
  },
  {
    iconKey: 'palm',
    title: 'Generous Vacation & Sick Leave',
    body: 'Including travel tips from the team',
  },
  {
    iconKey: 'desktop',
    title: 'Co-working Membership',
    body: 'An in-person desk in San Francisco or at the co-working space in your city',
  },
  {
    iconKey: 'dots',
    title: 'And more...',
    body: "We're in favor of anything that empowers you to do your best work.",
    outlined: true,
  },
];
