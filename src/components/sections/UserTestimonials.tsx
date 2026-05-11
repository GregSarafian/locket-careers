import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials, type Testimonial } from '../../data/testimonials';

const CARD_WIDTH = 200;
const GAP = 24;
const ITEM_STEP = CARD_WIDTH + GAP;
const LOOPS = 5;
const N = testimonials.length;
const TOTAL = N * LOOPS;
const LOOP_WIDTH = N * ITEM_STEP;
const MIDDLE_INDEX = Math.floor(TOTAL / 2);

function VideoCard({
  item,
  isHovered,
  isAnyHovered,
  onHoverChange,
  wantSound,
  onSoundChange,
  tapEnabled,
}: {
  item: Testimonial;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
  wantSound: boolean;
  onSoundChange: (want: boolean) => void;
  tapEnabled: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);

  // Reset paused when this card is no longer active.
  useEffect(() => {
    if (!isHovered) setPaused(false);
  }, [isHovered]);

  // Sync muted state to (active && wantSound).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const shouldUnmute = isHovered && wantSound;
    v.muted = !shouldUnmute;
  }, [isHovered, wantSound]);

  // Sync paused state.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (paused) {
      v.pause();
    } else {
      void v.play().catch(() => {
        v.muted = true;
        void v.play().catch(() => {});
      });
    }
  }, [paused]);

  const muted = !(isHovered && wantSound);
  const dim = isAnyHovered && !isHovered;

  return (
    <motion.div
      ref={containerRef}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      animate={{ opacity: dim ? 0.4 : 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="relative w-[200px] h-[400px] rounded-[16px] overflow-hidden bg-black/40 shrink-0"
    >
      {inView && (
        <video
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 size-full object-cover"
        />
      )}

      {tapEnabled && (
        <button
          type="button"
          aria-label={paused ? 'Play' : 'Pause'}
          onClick={(e) => {
            e.stopPropagation();
            setPaused((p) => !p);
          }}
          data-no-emoji
          className="absolute inset-0 z-10 bg-transparent"
        />
      )}

      {/* Inner stroke (1px, white @ 10%) sitting on top of the video */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-20"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}
        aria-hidden
      />

      {/* Hover/active controls */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.button
              type="button"
              key="mute"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileTap={{ scale: 0.8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              onClick={(e) => {
                e.stopPropagation();
                onSoundChange(!wantSound);
              }}
              data-no-emoji
              aria-label={muted ? 'Unmute' : 'Mute'}
              className="absolute left-3 bottom-3 z-30 size-10 rounded-full bg-[#777777]/50 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-[#777777]/70 transition-colors shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
            >
              <img
                src={muted ? '/assets/tiktoks/unmute.svg' : '/assets/tiktoks/mute.svg'}
                alt=""
                aria-hidden
                className="size-[22px]"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </motion.button>

            {item.href && (
              <motion.a
                key="tiktok"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                whileTap={{ scale: 0.8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                aria-label="Open original TikTok"
                className="absolute right-3 bottom-3 z-30 size-10 rounded-full bg-[#777777]/50 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-[#777777]/70 transition-colors shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                onClick={(e) => {
                  e.stopPropagation();
                  onSoundChange(false);
                }}
              >
                <img
                  src="/assets/tiktoks/upright.svg"
                  alt=""
                  aria-hidden
                  className="size-[22px]"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </motion.a>
            )}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function UserTestimonials() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(MIDDLE_INDEX);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  );
  const [userWantsSound, setUserWantsSound] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Mobile detection.
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Mute when section scrolls out of view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) setUserWantsSound(false);
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Start centered on the middle copy (mobile only).
  useLayoutEffect(() => {
    if (!isMobile) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = MIDDLE_INDEX * ITEM_STEP;
  }, [isMobile]);

  // Track centered card + wrap infinitely.
  useEffect(() => {
    if (!isMobile) return;
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      let best = 0;
      let bestDist = Infinity;
      const children = Array.from(el.children) as HTMLElement[];
      children.forEach((child, i) => {
        const r = child.getBoundingClientRect();
        const c = r.left + r.width / 2;
        const d = Math.abs(c - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });

      // Wrap silently when entering the first or last copy.
      if (best < N) {
        el.scrollLeft += LOOP_WIDTH;
        best += N;
      } else if (best >= TOTAL - N) {
        el.scrollLeft -= LOOP_WIDTH;
        best -= N;
      }
      setActiveIndex(best);
    };

    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [isMobile]);

  const items = isMobile
    ? Array.from({ length: TOTAL }, (_, k) => testimonials[k % N])
    : testimonials;

  return (
    <section ref={sectionRef} className="py-10">
      <div className="max-w-[1080px] mx-auto px-6 md:px-[120px]">
        <h3 className="font-bold text-[28px] leading-tight text-white/80 text-center">
          What are users saying?
        </h3>
      </div>

      <div
        ref={scrollRef}
        className="mt-6 flex gap-6 items-start md:justify-center overflow-x-auto snap-x snap-mandatory md:snap-none px-[calc(50%-100px)] md:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((t, i) => {
          const hovered = isMobile ? activeIndex === i : hoveredIndex === i;
          const anyHovered = isMobile ? true : hoveredIndex !== null;
          return (
            <div key={`${t.src}-${i}`} className="snap-center shrink-0">
              <VideoCard
                item={t}
                isHovered={hovered}
                isAnyHovered={anyHovered}
                onHoverChange={(h) => {
                  if (isMobile) return;
                  setHoveredIndex(h ? i : null);
                }}
                wantSound={userWantsSound}
                onSoundChange={setUserWantsSound}
                tapEnabled={isMobile && hovered}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
