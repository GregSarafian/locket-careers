import { motion } from 'framer-motion';
import { Reveal } from '../motion/Reveal';

// Card layout from Figma node 8:35.
// Native canvas: 1245 x 550 (8 photos, 200x200 each, 16px black border, 40px radius).
// We render at percentage positions inside a container-sized box, and use container
// query units (cqw) for size + border so everything scales proportionally.
type Card = {
  src: string;
  left: number;   // px from left within 1245px canvas
  top: number;    // px from top within 550px canvas
  rotate: number; // degrees
  title: string;
  subtitle: string;
};

const CANVAS_W = 1245;
const CANVAS_H = 550;

// Cards left-shifted by 69 from the original Figma coords so the row
// is horizontally centered within the canvas (Figma had ~138px gap on
// the left and ~0 on the right, so we balance to ~69px on each side).
const cards: Card[] = [
  { src: '/assets/hero/hero-1.webp', left: 69,   top: 221, rotate: -4,  title: 'Team Offsite',   subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-2.webp', left: 195,  top: 328, rotate: 11,  title: 'Family Dinner',  subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-7.webp', left: 343,  top: 254, rotate: -10, title: 'Locket Moment',  subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-3.webp', left: 500,  top: 172, rotate: 8,   title: 'Group Selfie',   subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-4.webp', left: 618,  top: 315, rotate: -8,  title: 'Lunch Break',    subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-5.webp', left: 774,  top: 221, rotate: 0,   title: 'Morning Hike',   subtitle: 'Monterey, CA · 2024' },
  { src: '/assets/hero/hero-6.webp', left: 888,  top: 343, rotate: 12,  title: 'Friends',        subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-8.webp', left: 976,  top: 210, rotate: -20, title: 'Studio Day',     subtitle: 'San Francisco, CA · 2024' },
];

const pct = (n: number, total: number) => `${(n / total) * 100}%`;

function PhotoCard({ src, left, top, rotate, index }: Card & { index: number }) {
  return (
    <div
      className="absolute"
      style={{
        left: pct(left, CANVAS_W),
        top: pct(top, CANVAS_H),
        // Card dimensions in container-width units so they scale with the collage.
        width: 'calc(200 / 1245 * 100cqw)',
        height: 'calc(200 / 1245 * 100cqw)',
      }}
    >
      <motion.div
        className="block size-full overflow-hidden bg-[#1a1a1a]"
        style={{
          borderWidth: 'calc(16 / 1245 * 100cqw)',
          borderRadius: 'calc(40 / 1245 * 100cqw)',
          borderColor: 'var(--color-bg)',
          borderStyle: 'solid',
          boxSizing: 'border-box',
          willChange: 'transform',
        }}
        initial={{ opacity: 0, y: 20, rotate: rotate * 0.4, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, rotate, scale: 1 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.05 * index,
        }}
        whileHover={{ rotate: rotate * 0.5, scale: 1.05, transition: { duration: 0.4 } }}
      >
        <img
          src={src}
          alt=""
          aria-hidden
          loading="eager"
          decoding="async"
          className="block size-full object-cover"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative pt-6 md:pt-7 pb-16 md:pb-20 overflow-hidden">
      <div
        className="relative mx-auto z-10"
        style={{
          width: `min(1500px, 100vw, calc((100dvh - 320px) * ${CANVAS_W} / ${CANVAS_H}))`,
          aspectRatio: `${CANVAS_W} / ${CANVAS_H}`,
          containerType: 'inline-size',
        }}
      >
        {cards.map((c, i) => (
          <PhotoCard key={c.src} {...c} index={i} />
        ))}
      </div>

      <div className="relative z-30 flex flex-col items-center justify-center gap-4 py-10 px-6 md:px-[120px] text-center">
        <Reveal delay={0.2}>
          <h1 className="font-bold text-[40px] leading-none text-white/80 whitespace-nowrap">
            Careers at Locket
          </h1>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="font-semibold text-[28px] leading-[34px] text-white/60">
            Build the social network that loves you back
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <motion.a
            href="#open-roles"
            initial="rest"
            animate="rest"
            whileHover="hover"
            whileTap={{ scale: 0.9 }}
            className="inline-flex items-start gap-2 text-[var(--color-accent)] font-bold text-[20px] leading-[25px]"
          >
            <span className="relative pb-1.5">
              Open Roles
              <span aria-hidden className="absolute left-0 right-0 bottom-0 h-[2px] rounded-full bg-current/20" />
              <motion.span
                aria-hidden
                className="absolute left-0 right-0 bottom-0 h-[2px] rounded-full bg-current origin-center"
                variants={{
                  rest: {
                    scaleX: 0,
                    opacity: 0,
                    transition: {
                      scaleX: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                    },
                  },
                  hover: {
                    scaleX: 1,
                    opacity: 1,
                    transition: {
                      scaleX: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.05 },
                    },
                  },
                }}
              />
            </span>
            <svg width="20" height="25" viewBox="0 0 20 25" fill="none" aria-hidden className="shrink-0">
              <path d="M5 10l5 5 5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
