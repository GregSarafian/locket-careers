import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BlurhashImage } from '../motion/Blurhash';
import { mediumHaptic } from '../../lib/haptics';

type PhotoCard = {
  src: string;
};

const photos: PhotoCard[] = [
  { src: '/assets/whatitslike/photo-1.webp' },
  { src: '/assets/whatitslike/photo-2.webp' },
];

type Trait = {
  title: string;
  body?: string;
};

const traits: Trait[] = [
  {
    title: 'Fast-paced',
    body:
      'We routinely build new features in less than a week start-to-finish. Expect to ship code into production on your first day.',
  },
  {
    title: 'Small and scrappy',
    body:
      "Despite shipping to millions of DAU, we are still a small team of 10. We believe the best products are built by small teams of incredibly passionate people. This means you'll get to play a key role in defining the future of Locket.",
  },
  {
    title: 'Detail-obsessed',
    body:
      'We obsess over the user experience until all the details are right. Everyone is expected to go the extra mile in everything they do.',
  },
  {
    title: 'Constantly-evolving',
    body:
      "We're still early in building Locket. This means we're constantly defining new features, building prototypes, and testing them with our friends and family.",
  },
  {
    title: 'Ownership-focused',
    body:
      "You'll be given the trust and responsibility to take ownership over what you build. Nearly everyone on our team would be building their own things if they weren't working on Locket.",
  },
];

function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <motion.span
      className="relative inline-block w-[22px] h-[22px] text-[var(--color-accent)] shrink-0"
      aria-hidden
      animate={{ rotate: open ? 90 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Horizontal bar fades out so the vertical bar (rotated 90°) becomes the minus. */}
      <motion.span
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.2, ease: 'linear', delay: 0.1 }}
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full bg-current"
      />
      <span className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 rounded-full bg-current" />
    </motion.span>
  );
}

function AccordionRow({
  trait,
  open,
  onToggle,
  dimmed,
  onHoverStart,
  onHoverEnd,
}: {
  trait: Trait;
  open: boolean;
  onToggle: () => void;
  dimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const expandable = !!trait.body;
  return (
    <motion.div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      whileTap={expandable ? { scale: 0.985 } : undefined}
      className={[
        'rounded-[24px] transition-colors transition-opacity duration-200',
        open ? 'bg-white/5' : 'bg-transparent',
        dimmed ? '[@media(hover:hover)]:opacity-40' : 'opacity-100',
      ].join(' ')}
    >
      <button
        type="button"
        onClick={
          expandable
            ? () => {
                mediumHaptic();
                onToggle();
              }
            : undefined
        }
        aria-expanded={expandable ? open : undefined}
        data-no-emoji
        className="w-full flex items-start justify-between gap-4 pl-6 pr-4 py-4 text-left"
      >
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[20px] leading-[26px] text-white/80">
            {trait.title}
          </p>
          <AnimatePresence initial={false}>
            {open && trait.body && (
              <motion.p
                initial={{ height: 0, opacity: 0, marginTop: 0, filter: 'blur(6px)' }}
                animate={{ height: 'auto', opacity: 1, marginTop: 8, filter: 'blur(0px)' }}
                exit={{ height: 0, opacity: 0, marginTop: 0, filter: 'blur(6px)' }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="font-semibold text-[20px] leading-[26px] text-white/60 overflow-hidden"
              >
                {trait.body}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        {expandable && <PlusMinusIcon open={open} />}
      </button>
    </motion.div>
  );
}

export function WhatItsLike() {
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  return (
    <section className="px-3 md:px-[120px] py-10">
      <div className="max-w-[1080px] mx-auto flex flex-col md:flex-row gap-12 items-start">
        {/* Left column: heading + photo collage */}
        <div className="flex flex-col gap-6 shrink-0 md:max-w-[391px] px-3 md:px-0">
          <h3 className="font-bold text-[28px] leading-tight text-white/80">
            What's it like to work at Locket?
          </h3>

          <div className="flex items-end justify-center">
              <div className="size-[200px] -mr-[74px]">
                <motion.div
                  initial={{ rotate: -8 }}
                  animate={{ rotate: -8 }}
                  whileHover={{ rotate: -4, scale: 1.04, transition: { duration: 0.22 } }}
                  className="relative block size-full overflow-hidden"
                  style={{ borderRadius: 40, boxSizing: 'border-box', backgroundColor: '#312a1a', boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0, 0, 0, 0.5), 0 8px 16px rgba(0, 0, 0, 0.35)' }}
                >
                  <BlurhashImage
                    src={photos[0].src}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 block size-full object-cover"
                    draggable={false}
                  />
                </motion.div>
              </div>
              <div className="size-[167px]">
                <motion.div
                  initial={{ rotate: 9 }}
                  animate={{ rotate: 9 }}
                  whileHover={{ rotate: 4, scale: 1.04, transition: { duration: 0.22 } }}
                  className="relative block size-full overflow-hidden"
                  style={{ borderRadius: 32, boxSizing: 'border-box', boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0, 0, 0, 0.5), 0 8px 16px rgba(0, 0, 0, 0.35)' }}
                >
                  <BlurhashImage
                    src={photos[1].src}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 block size-full object-cover"
                    draggable={false}
                  />
                </motion.div>
              </div>
            </div>
        </div>

        {/* Right column: accordion */}
        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-col">
            {traits.map((t, i) => (
              <AccordionRow
                key={t.title}
                trait={t}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                dimmed={hoveredIndex !== -1 && hoveredIndex !== i}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(-1)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
