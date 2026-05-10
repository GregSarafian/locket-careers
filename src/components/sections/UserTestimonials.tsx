import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials, type Testimonial } from '../../data/testimonials';

function VideoCard({
  item,
  isHovered,
  isAnyHovered,
  onHoverChange,
}: {
  item: Testimonial;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [muted, setMuted] = useState(true);

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

  useEffect(() => {
    if (!isHovered) {
      setMuted(true);
      const v = videoRef.current;
      if (v) v.muted = true;
    }
  }, [isHovered]);

  const toggleMute = () => {
    const v = videoRef.current;
    const next = !muted;
    setMuted(next);
    if (v) {
      v.muted = next;
      void v.play().catch(() => {
        v.muted = true;
        setMuted(true);
        void v.play().catch(() => {});
      });
    }
  };

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

      {/* Inner stroke (1px, white @ 10%) sitting on top of the video */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}
        aria-hidden
      />

      {/* Hover controls */}
      <AnimatePresence>
        {isHovered && (
          <>
            {/* Centered mute/unmute toggle */}
            <motion.button
              type="button"
              key="mute"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileTap={{ scale: 0.8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              onClick={toggleMute}
              data-no-emoji
              aria-label={muted ? 'Unmute' : 'Mute'}
              className="absolute left-3 bottom-3 size-10 rounded-full bg-[#777777]/50 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-[#777777]/70 transition-colors shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
            >
              <img
                src={muted ? '/assets/tiktoks/unmute.svg' : '/assets/tiktoks/mute.svg'}
                alt=""
                aria-hidden
                className="size-[22px]"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </motion.button>

            {/* Bottom-right link to original TikTok */}
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
                className="absolute right-3 bottom-3 size-10 rounded-full bg-[#777777]/50 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-[#777777]/70 transition-colors shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                onClick={(e) => {
                  e.stopPropagation();
                  setMuted(true);
                  const v = videoRef.current;
                  if (v) v.muted = true;
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

  return (
    <section className="py-10">
      <div className="max-w-[1080px] mx-auto px-6 md:px-[120px]">
        <h3 className="font-bold text-[28px] leading-tight text-white/80 text-center">
          What are users saying?
        </h3>
      </div>

      <div className="mt-6 flex gap-6 items-start justify-center px-6 overflow-x-auto">
        {testimonials.map((t, i) => (
          <VideoCard
            key={t.src}
            item={t}
            isHovered={hoveredIndex === i}
            isAnyHovered={hoveredIndex !== null}
            onHoverChange={(hovered) => setHoveredIndex(hovered ? i : null)}
          />
        ))}
      </div>
    </section>
  );
}
