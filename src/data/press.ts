export type PressItem = {
  source: string;
  title: string;
  href: string;
  image: string;
  /** "apple" for the Apple logo glyph, otherwise a generic newspaper icon. */
  sourceIcon?: 'apple' | 'newspaper';
};

export const press: PressItem[] = [
  {
    source: 'App Store Award',
    title: 'Cultural Impact Winner: Locket',
    href: 'https://apps.apple.com/story/id1660960561',
    image: '/assets/press/press-1.webp',
    sourceIcon: 'apple',
  },
  {
    source: 'The New York Times',
    title: 'The 2022 Good Tech Awards',
    href: 'https://www.nytimes.com/2022/12/30/technology/good-tech-awards-2022.html',
    image: '/assets/press/press-2.webp',
    sourceIcon: 'newspaper',
  },
  {
    source: 'Business Insider',
    title: "Locket Launches Weekly 'Photo Dump' Feature, Rollcall",
    href: '#',
    image: '/assets/press/press-3.webp',
    sourceIcon: 'newspaper',
  },
  {
    source: 'TechCrunch',
    title:
      "Locket, the popular app that lets you post photos to your loved ones' homescreens, raises $12.5M",
    href: 'https://techcrunch.com/2022/08/02/locket-app-that-lets-yor-post-photos-to-your-loved-ones-homescreens-raises-12-5m/',
    image: '/assets/press/press-4.webp',
    sourceIcon: 'newspaper',
  },
  {
    source: 'Fast Company',
    title: "Locket, the #1 app in Apple's App Store, uses a trick hiding in plain sight",
    href: 'https://www.fastcompany.com/90716499/locket-apple-app-store-1-app',
    image: '/assets/press/press-5.webp',
    sourceIcon: 'newspaper',
  },
  {
    source: 'TechCrunch',
    title:
      "Locket app for iPhone: How a birthday present turned into one of 2022's most popular apps",
    href: 'https://techcrunch.com/2022/01/10/locket-most-popular-app-iphone/',
    image: '/assets/press/press-6.webp',
    sourceIcon: 'newspaper',
  },
];
