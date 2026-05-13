import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
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

// Mobile collage canvas — 440px wide, height sized to tightly fit the 3-card
// cluster (lowest card bottom + ~20px margin).
const MOBILE_CANVAS_W = 440;
const MOBILE_CANVAS_H = 680;

// Pool of all hero photos. On desktop we render a random 4-card subset of this
// pool, placed into the fixed slots below.
const desktopPhotoPool: Pick<Card, 'src' | 'title' | 'subtitle'>[] = [
  { src: '/assets/hero/hero-1.webp', title: 'Team Offsite',   subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-2.webp', title: 'Family Dinner',  subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-7.webp', title: 'Locket Moment',  subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-3.webp', title: 'Group Selfie',   subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-4.webp', title: 'Lunch Break',    subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-5.webp', title: 'Morning Hike',   subtitle: 'Monterey, CA · 2024' },
  { src: '/assets/hero/hero-6.webp', title: 'Friends',        subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/hero/hero-8.webp', title: 'Studio Day',     subtitle: 'San Francisco, CA · 2024' },
];

// Four fixed slots distributed across the 1245x550 canvas. Slots overlap
// horizontally so the larger cards (360px) layer over each other, and tops
// stagger vertically while keeping top + 360 <= 550.
const desktopSlots: Omit<Card, 'src' | 'title' | 'subtitle'>[] = [
  { left: 30,  top: 120, rotate: -6 },
  { left: 315, top: 210, rotate: 10 },
  { left: 600, top: 110, rotate: -8 },
  { left: 885, top: 210, rotate: 6 },
];

// Mobile slots — three positions inside a 440x552 canvas. Cards are 260px
// each and overlap heavily: two on the top row (left + right), with a third
// pushed below and slightly off-center so it overlaps both.
const mobileSlots: Omit<Card, 'src' | 'title' | 'subtitle'>[] = [
  { left: 10,  top: 180, rotate: -10 },
  { left: 90,  top: 380, rotate: 7 },
  { left: 190, top: 60,  rotate: 8 },
];

const pct = (n: number, total: number) => `${(n / total) * 100}%`;

// Animation order: left-to-right (cards with the smallest `left` value reveal first).
const computeLeftToRightOrder = (list: Card[]): number[] => {
  const sorted = [...list].map((c, i) => ({ i, left: c.left })).sort((a, b) => a.left - b.left);
  const rank = new Array<number>(list.length);
  sorted.forEach((s, order) => {
    rank[s.i] = order;
  });
  return rank;
};
type Layout = {
  canvasW: number;
  canvasH: number;
  cardSize: number;
  radius: number;
  order: number[];
};

const DESKTOP_LAYOUT: Omit<Layout, 'order'> = {
  canvasW: DESKTOP_CANVAS_W,
  canvasH: DESKTOP_CANVAS_H,
  cardSize: 330,
  radius: 66,
};

const MOBILE_LAYOUT: Omit<Layout, 'order'> = {
  canvasW: MOBILE_CANVAS_W,
  canvasH: MOBILE_CANVAS_H,
  cardSize: 240,
  radius: 48,
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
  const { canvasW, canvasH, cardSize, radius, order } = layout;
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
          borderRadius: `calc(${radius} / ${canvasW} * 100cqw)`,
          boxSizing: 'border-box',
          boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0, 0, 0, 0.5), 0 8px 16px rgba(0, 0, 0, 0.35)',
          willChange: 'transform, filter',
        }}
        initial={{ opacity: 0, y: 20, rotate: rotate * 0.4, scale: 0.94, filter: 'blur(8px)' }}
        animate={ready ? { opacity: 1, y: 0, rotate, scale: 1, filter: 'blur(0px)' } : undefined}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.05 * order[index],
        }}
        whileHover={{ rotate: rotate === 0 ? 4 : rotate * 0.5, scale: 1.05, transition: { duration: 0.22 } }}
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

type Sparkle = {
  leftPct: number;
  topPct: number;
  size: number;
  delay: number;
  duration: number;
  peak: number;
};

function generateSparkles(count: number): Sparkle[] {
  // Stratified jitter: divide the area into a grid of cells and place one
  // sparkle per cell with random offset so they spread across the hero
  // instead of clumping.
  const cols = Math.ceil(Math.sqrt(count * 0.6));
  const rows = Math.ceil(count / cols);
  const out: Sparkle[] = [];
  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cellW = 100 / cols;
    const cellH = 100 / rows;
    const leftPct = col * cellW + Math.random() * cellW;
    const topPct = row * cellH + Math.random() * cellH;
    out.push({
      leftPct,
      topPct,
      size: 6 + Math.random() * 14,
      delay: -Math.random() * 5,
      duration: 3 + Math.random() * 2.5,
      peak: 0.1 + Math.random() * 0.2,
    });
  }
  return out;
}

function SparkleField() {
  const sparkles = useMemo(() => generateSparkles(120), []);
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none z-0">
      <style>{`
        @keyframes sparkle-twinkle {
          0% { opacity: 0; filter: blur(6px); transform: translate(-50%, calc(-50% + 10px)) scale(0.6); }
          50% { opacity: var(--sparkle-peak); filter: blur(0); transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; filter: blur(6px); transform: translate(-50%, calc(-50% - 10px)) scale(0.6); }
        }
        .sparkle {
          --sparkle-peak: 0.5;
          animation: sparkle-twinkle var(--sparkle-duration, 8s) ease-in-out var(--sparkle-delay, 0s) infinite;
          transition: --sparkle-peak 0.3s ease-out;
          will-change: opacity, filter, transform;
        }
        .sparkle:hover { --sparkle-peak: calc(var(--sparkle-base, 0.5) + 0.25); }
        @media (prefers-reduced-motion: reduce) {
          .sparkle { animation: none; opacity: var(--sparkle-base, 0.4); filter: none; transform: translate(-50%, -50%); }
        }
      `}</style>
      {sparkles.map((s, i) => (
        <svg
          key={i}
          viewBox="0 0 28 28"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          className="sparkle absolute pointer-events-auto block text-[var(--color-accent)]"
          style={{
            left: `${s.leftPct}%`,
            top: `${s.topPct}%`,
            width: s.size,
            height: s.size,
            ['--sparkle-base' as never]: s.peak,
            ['--sparkle-peak' as never]: s.peak,
            ['--sparkle-delay' as never]: `${s.delay}s`,
            ['--sparkle-duration' as never]: `${s.duration}s`,
          }}
        >
          <path d="M14.4111 24.6519C14.0566 24.6519 13.5195 24.3403 13.0254 24.0181C7.11719 20.1616 3.23926 15.564 3.23926 10.9556C3.23926 6.73389 6.17188 3.89795 9.69531 3.89795C11.8867 3.89795 13.4766 5.11182 14.4111 6.86279C15.3564 5.10107 16.9463 3.89795 19.1377 3.89795C22.6611 3.89795 25.5938 6.73389 25.5938 10.9556C25.5938 15.564 21.7158 20.1616 15.8076 24.0181C15.3135 24.3403 14.7764 24.6519 14.4111 24.6519Z" fill="currentColor" />
        </svg>
      ))}
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
  const [desktopCards] = useState<Card[]>(() => {
    const shuffled = [...desktopPhotoPool].sort(() => Math.random() - 0.5);
    return desktopSlots.map((slot, i) => ({ ...slot, ...shuffled[i] }));
  });
  const [mobileCards] = useState<Card[]>(() => {
    const shuffled = [...desktopPhotoPool].sort(() => Math.random() - 0.5);
    return mobileSlots.map((slot, i) => ({ ...slot, ...shuffled[i] }));
  });
  // Paint cards top-down: cards with the smallest `top` render first (behind),
  // so the visually-lowest card sits in front of the upper-row cards.
  const cards = useMemo(
    () =>
      [...(isMobile ? mobileCards : desktopCards)].sort((a, b) => a.top - b.top),
    [isMobile, desktopCards, mobileCards],
  );
  const layout: Layout = isMobile
    ? { ...MOBILE_LAYOUT, order: computeLeftToRightOrder(mobileCards) }
    : { ...DESKTOP_LAYOUT, order: computeLeftToRightOrder(desktopCards) };

  useEffect(() => {
    let cancelled = false;
    const allSources = desktopPhotoPool.map((p) => p.src);
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

  // Cap the collage by the small viewport height (svh stays constant as the
  // mobile browser toolbar collapses, so the collage doesn't resize on scroll)
  // minus space reserved for the nav offset and text/CTA block, so the headline
  // and Open Roles link stay above the fold without scrolling.
  const collageWidth = isMobile
    ? `min(92vw, calc((100svh - 230px) * ${layout.canvasW} / ${layout.canvasH}))`
    : `min(1300px, 100vw, calc((100svh - 380px) * ${layout.canvasW} / ${layout.canvasH}))`;

  return (
    <section className="relative pt-[90px] md:pt-0 pb-4 md:pb-0 min-h-[100svh] flex flex-col overflow-hidden">
      {ready && <SparkleField />}
      <div aria-hidden className="flex-[0.75] md:flex-1" />
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
      <div aria-hidden className="flex-1" />

      <div className="relative z-30 flex flex-col items-center justify-center gap-3 md:gap-4 md:py-0 px-6 md:px-[120px] text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="font-bold text-[28px] md:text-[40px] leading-none text-white/80 whitespace-nowrap"
        >
          Careers at Locket
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="font-semibold text-[22px] leading-[28px] md:text-[28px] md:leading-tight text-white/60"
        >
          Build the social network that loves you back
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        >
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
        </motion.div>
      </div>
      <div aria-hidden className="flex-1" />
    </section>
  );
}
