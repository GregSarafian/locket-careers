export type Testimonial = {
  src: string;
  /** Original TikTok URL — populated later. */
  href?: string;
  /** Optional poster image. */
  poster?: string;
};

export const testimonials: Testimonial[] = [
  { src: '/assets/tiktoks/tt-1.mp4' },
  { src: '/assets/tiktoks/tt-2.mp4' },
  { src: '/assets/tiktoks/tt-3.mp4' },
  { src: '/assets/tiktoks/tt-4.mp4' },
  { src: '/assets/tiktoks/tt-5.mp4' },
];
