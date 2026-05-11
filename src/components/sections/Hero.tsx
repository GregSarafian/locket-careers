import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../motion/Reveal';
import { BlurhashImage } from '../motion/Blurhash';
import { selectionHaptic } from '../../lib/haptics';

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

const DESKTOP_CANVAS_W = 1245;
const DESKTOP_CANVAS_H = 550;

// Mobile collage canvas — from Figma frame 62:3219 (440px wide, ~552px tall).
const MOBILE_CANVAS_W = 440;
const MOBILE_CANVAS_H = 552;

// Desktop cards left-shifted by 69 from the original Figma coords so the row
// is horizontally centered within the canvas (Figma had ~138px gap on
// the left and ~0 on the right, so we balance to ~69px on each side).
const desktopCards: Card[] = [
  { src: '/assets/hero/hero-1.webp', left: 69,   top: 221, rotate: -4,  title: 'Team Offsite',   subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-2.webp', left: 195,  top: 328, rotate: 11,  title: 'Family Dinner',  subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-7.webp', left: 343,  top: 254, rotate: -10, title: 'Locket Moment',  subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-3.webp', left: 500,  top: 172, rotate: 8,   title: 'Group Selfie',   subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-4.webp', left: 618,  top: 315, rotate: -8,  title: 'Lunch Break',    subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-5.webp', left: 774,  top: 221, rotate: 0,   title: 'Morning Hike',   subtitle: 'Monterey, CA · 2024' },
  { src: '/assets/hero/hero-6.webp', left: 888,  top: 343, rotate: 12,  title: 'Friends',        subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-8.webp', left: 976,  top: 210, rotate: -20, title: 'Studio Day',     subtitle: 'San Francisco, CA · 2024' },
];

// Mobile cards — 5-card cluster from Figma. Card is 175x175 inside a rotated
// bounding box; `left`/`top` are the top-left of the un-rotated 175px square.
const mobileCards: Card[] = [
  { src: '/assets/hero/hero-1.webp', left: 2,   top: 71,  rotate: -10, title: 'Team Offsite',  subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-7.webp', left: 253, top: 35,  rotate: -6,  title: 'Locket Moment', subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-3.webp', left: 161, top: 163, rotate: 8,   title: 'Group Selfie',  subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-4.webp', left: 26,  top: 267, rotate: 12,  title: 'Family Dinner', subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-6.webp', left: 245, top: 305, rotate: -17, title: 'Friends',       subtitle: 'San Francisco, CA · 2024' },
];

const pct = (n: number, total: number) => `${(n / total) * 100}%`;

// Animation order: bottom-up (cards with the largest `top` value reveal first).
const computeBottomUpOrder = (list: Card[]): number[] => {
  const sorted = [...list].map((c, i) => ({ i, top: c.top })).sort((a, b) => b.top - a.top);
  const rank = new Array<number>(list.length);
  sorted.forEach((s, order) => {
    rank[s.i] = order;
  });
  return rank;
};
const desktopOrder = computeBottomUpOrder(desktopCards);
const mobileOrder = computeBottomUpOrder(mobileCards);

type Layout = {
  canvasW: number;
  canvasH: number;
  cardSize: number;
  border: number;
  radius: number;
  order: number[];
};

const DESKTOP_LAYOUT: Layout = {
  canvasW: DESKTOP_CANVAS_W,
  canvasH: DESKTOP_CANVAS_H,
  cardSize: 200,
  border: 16,
  radius: 40,
  order: desktopOrder,
};

const MOBILE_LAYOUT: Layout = {
  canvasW: MOBILE_CANVAS_W,
  canvasH: MOBILE_CANVAS_H,
  cardSize: 175,
  border: 12,
  radius: 36,
  order: mobileOrder,
};

function PhotoCard({
  src,
  left,
  top,
  rotate,
  index,
  ready,
  layout,
}: Card & { index: number; ready: boolean; layout: Layout }) {
  const { canvasW, canvasH, cardSize, border, radius, order } = layout;
  return (
    <div
      className="absolute"
      style={{
        left: pct(left, canvasW),
        top: pct(top, canvasH),
        width: `calc(${cardSize} / ${canvasW} * 100cqw)`,
        height: `calc(${cardSize} / ${canvasW} * 100cqw)`,
      }}
    >
      <motion.div
        className="relative block size-full overflow-hidden bg-[#1a1a1a]"
        style={{
          borderWidth: `calc(${border} / ${canvasW} * 100cqw)`,
          borderRadius: `calc(${radius} / ${canvasW} * 100cqw)`,
          borderColor: 'var(--color-bg)',
          borderStyle: 'solid',
          boxSizing: 'border-box',
          willChange: 'transform, filter',
        }}
        initial={{ opacity: 0, y: 20, rotate: rotate * 0.4, scale: 0.94, filter: 'blur(8px)' }}
        animate={ready ? { opacity: 1, y: 0, rotate, scale: 1, filter: 'blur(0px)' } : undefined}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.05 * order[index],
        }}
        whileHover={{ rotate: rotate === 0 ? 4 : rotate * 0.5, scale: 1.05, transition: { duration: 0.4 } }}
      >
        <BlurhashImage
          src={src}
          alt=""
          aria-hidden
          loading="eager"
          decoding="async"
          className="absolute inset-0 block size-full object-cover"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}

function useIsMobile(breakpointPx = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(`(max-width: ${breakpointPx - 1}px)`).matches;
  });
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpointPx - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [breakpointPx]);
  return isMobile;
}

export function Hero() {
  const [ready, setReady] = useState(false);
  const isMobile = useIsMobile();
  const cards = isMobile ? mobileCards : desktopCards;
  const layout = isMobile ? MOBILE_LAYOUT : DESKTOP_LAYOUT;

  useEffect(() => {
    let cancelled = false;
    const allSources = Array.from(new Set([...desktopCards, ...mobileCards].map((c) => c.src)));
    Promise.all(
      allSources.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
          }),
      ),
    ).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const collageWidth = isMobile
    ? '90vw'
    : `min(1500px, 100vw, calc((100dvh - 320px) * ${layout.canvasW} / ${layout.canvasH}))`;

  return (
    <section className="relative pt-15 md:pt-7 pb-2 md:pb-20 overflow-hidden">
      <div
        className="relative mx-auto z-10"
        style={{
          width: collageWidth,
          aspectRatio: `${layout.canvasW} / ${layout.canvasH}`,
          containerType: 'inline-size',
        }}
      >
        {cards.map((c, i) => (
          <PhotoCard key={c.src} {...c} index={i} ready={ready} layout={layout} />
        ))}
      </div>

      <div className="relative z-30 flex flex-col items-center justify-center gap-4 pt-1 pb-16 md:py-10 px-6 md:px-[120px] text-center">
        <Reveal delay={0.2}>
          <h1 className="font-bold text-[28px] md:text-[40px] leading-none text-white/80 whitespace-nowrap">
            Careers at Locket
          </h1>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="font-semibold text-[22px] leading-[28px] md:text-[28px] md:leading-tight text-white/60">
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
            onClick={() => selectionHaptic()}
            className="inline-flex items-start gap-2 text-[var(--color-accent)] font-bold text-[22px] leading-[28px] md:text-[20px] md:leading-[25px]"
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
