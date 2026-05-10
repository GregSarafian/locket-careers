export type Testimonial = {
  src: string;
  /** Original TikTok URL — populated later. */
  href?: string;
  /** Optional poster image. */
  poster?: string;
};

export const testimonials: Testimonial[] = [
  {
    src: '/assets/tiktoks/tt-1.mp4',
    href: 'https://www.tiktok.com/@myallies/video/7448722107682508078',
  },
  {
    src: '/assets/tiktoks/tt-2.mp4',
    href: 'https://www.tiktok.com/@notedbynad/video/7522047299657157910',
  },
  {
    src: '/assets/tiktoks/tt-3.mp4',
    href: 'https://www.tiktok.com/@myxphuog/video/7170647267341339930',
  },
  {
    src: '/assets/tiktoks/tt-4.mp4',
    href: 'https://www.tiktok.com/@jinniemeltchwe/video/7321205136456535302',
  },
  {
    src: '/assets/tiktoks/tt-5.mp4',
    href: 'https://www.tiktok.com/@loiabasial/video/7280522874178342175',
  },
];
