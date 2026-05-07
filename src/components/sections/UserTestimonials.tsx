import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../motion/Reveal';
import { testimonials, type Testimonial } from '../../data/testimonials';

function ArrowUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 17L17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SpeakerOnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 5L6 9H3v6h3l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SpeakerOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 5L6 9H3v6h3l5 4V5zM16 9l5 5M21 9l-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !isHovered;
    if (isHovered) {
      // play() returns a promise that may reject if browser blocks unmute.
      void v.play().catch(() => {
        // If the browser blocks unmuted autoplay (no prior user gesture),
        // fall back silently to muted playback.
        v.muted = true;
        void v.play().catch(() => {});
      });
    }
  }, [isHovered]);

  const dim = isAnyHovered && !isHovered;

  return (
    <motion.div
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      animate={{ opacity: dim ? 0.4 : 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="relative w-[200px] h-[400px] rounded-[16px] overflow-hidden bg-black/40 shrink-0"
    >
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

      {/* Inner stroke (1px, white @ 10%) sitting on top of the video */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}
        aria-hidden
      />

      {/* Hover controls (bottom-right) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-3 bottom-3 flex gap-2"
          >
            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open original TikTok"
                className="size-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpIcon />
              </a>
            )}
            {/* Sound indicator — passive, not a toggle (hover already controls audio) */}
            <div
              aria-label="Audio on"
              className="size-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/80 pointer-events-none"
            >
              {isHovered ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
            </div>
          </motion.div>
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
        <Reveal>
          <h3 className="font-bold text-[28px] leading-tight text-white/80 text-center">
            What are users saying?
          </h3>
        </Reveal>
      </div>

      <Reveal delay={0.05}>
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
      </Reveal>
    </section>
  );
}
