export type Perk = {
  icon: string;
  title: string;
  body: string;
  /** Marks the final tile, which uses an outlined style. */
  outlined?: boolean;
};

export const perks: Perk[] = [
  {
    icon: '/assets/benefits/benefit-9.svg',
    title: 'Significant Equity\n& Competitive Salary',
    body:
      "We're still a small team and want our next teammates to feel true ownership.",
  },
  {
    icon: '/assets/benefits/benefit-1.svg',
    title: 'Remote Friendly & Hybrid in San Francisco',
    body: 'Remote friendly for anyone ±3 hours of Pacific Time, excluding Vietnam.',
  },
  {
    icon: '/assets/benefits/benefit-2.svg',
    title: 'Regular Team Offsites',
    body: 'The entire team comes together multiple times a year in a new place.',
  },
  {
    icon: '/assets/benefits/benefit-3.svg',
    title: 'Medical Coverage',
    body: 'Dental, Health, and Vision Coverage',
  },
  {
    icon: '/assets/benefits/benefit-4.svg',
    title: 'Wellness Benefit',
    body: 'Monthly stipend to support your mental and physical wellness',
  },
  {
    icon: '/assets/benefits/benefit-5.svg',
    title: '401K Matching',
    body: 'To support your personal, professional, and financial growth',
  },
  {
    icon: '/assets/benefits/benefit-6.svg',
    title: 'Generous Vacation & Sick Leave',
    body: 'Including travel tips from the team',
  },
  {
    icon: '/assets/benefits/benefit-7.svg',
    title: 'Co-working Membership',
    body: 'An in-person desk in San Francisco or at the co-working space in your city',
  },
  {
    icon: '/assets/benefits/benefit-8.svg',
    title: 'And more...',
    body: "We're in favor of anything that empowers you to do your best work.",
    outlined: true,
  },
];
