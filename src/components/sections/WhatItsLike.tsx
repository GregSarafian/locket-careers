import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal } from '../motion/Reveal';
import { ExpandedPhoto } from '../motion/ExpandedPhoto';

type PhotoCard = {
  src: string;
  title: string;
  subtitle: string;
};

const photos: PhotoCard[] = [
  { src: '/assets/whatitslike/photo-1.webp', title: 'In the Studio', subtitle: 'San Francisco, CA · 2024' },
  { src: '/assets/whatitslike/photo-2.webp', title: 'Team Time',     subtitle: 'San Francisco, CA · 2024' },
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
    <span
      className="relative inline-block w-[22px] h-[22px] text-[var(--color-accent)] shrink-0"
      aria-hidden
    >
      {/* Horizontal bar (always visible) */}
      <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full bg-current" />
      {/* Vertical bar (rotates away when open) */}
      <motion.span
        animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 rounded-full bg-current"
      />
    </span>
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
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className={[
        'rounded-[24px] transition-colors transition-opacity duration-200',
        open ? 'bg-white/5' : 'bg-transparent',
        dimmed ? 'opacity-40' : 'opacity-100',
      ].join(' ')}
    >
      <button
        type="button"
        onClick={expandable ? onToggle : undefined}
        aria-expanded={expandable ? open : undefined}
        className="w-full flex items-start justify-between gap-4 pl-6 pr-4 py-4 text-left"
      >
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[22px] leading-[28px] text-white/80">
            {trait.title}
          </p>
          <AnimatePresence initial={false}>
            {open && trait.body && (
              <motion.p
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="font-semibold text-[20px] leading-[25px] text-white/60 overflow-hidden"
              >
                {trait.body}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        {expandable && <PlusMinusIcon open={open} />}
      </button>
    </div>
  );
}

export function WhatItsLike() {
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [expandedPhoto, setExpandedPhoto] = useState<number | null>(null);

  return (
    <section className="px-6 md:px-[120px] py-10">
      <div className="max-w-[1080px] mx-auto flex flex-col md:flex-row gap-12 items-start">
        {/* Left column: heading + photo collage */}
        <div className="flex flex-col gap-6 shrink-0 md:max-w-[391px]">
          <Reveal>
            <h3 className="font-bold text-[28px] leading-tight text-white/80">
              What's it like to work at Locket?
            </h3>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-end justify-center">
              <div className="size-[200px] -mr-[74px]">
                {expandedPhoto !== 0 && (
                  <motion.button
                    type="button"
                    layoutId="whatitslike-photo-0"
                    onClick={() => setExpandedPhoto(0)}
                    aria-label="Expand photo"
                    initial={{ rotate: -8 }}
                    animate={{ rotate: -8 }}
                    whileHover={{ rotate: -4, scale: 1.04, transition: { duration: 0.4 } }}
                    className="block size-full p-0 cursor-pointer overflow-hidden"
                    style={{ borderColor: '#0d0900', borderWidth: 12, borderStyle: 'solid', borderRadius: 40, boxSizing: 'border-box', backgroundColor: '#312a1a' }}
                  >
                    <img
                      src={photos[0].src}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      decoding="async"
                      className="block size-full object-cover"
                      draggable={false}
                    />
                  </motion.button>
                )}
              </div>
              <div className="size-[167px]">
                {expandedPhoto !== 1 && (
                  <motion.button
                    type="button"
                    layoutId="whatitslike-photo-1"
                    onClick={() => setExpandedPhoto(1)}
                    aria-label="Expand photo"
                    initial={{ rotate: 9 }}
                    animate={{ rotate: 9 }}
                    whileHover={{ rotate: 4, scale: 1.04, transition: { duration: 0.4 } }}
                    className="block size-full p-0 cursor-pointer overflow-hidden"
                    style={{ borderColor: '#0d0900', borderWidth: 12, borderStyle: 'solid', borderRadius: 32, boxSizing: 'border-box', backgroundColor: 'transparent' }}
                  >
                    <img
                      src={photos[1].src}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      decoding="async"
                      className="block size-full object-cover"
                      draggable={false}
                    />
                  </motion.button>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right column: accordion */}
        <Reveal delay={0.15} className="flex-1 min-w-0 w-full">
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
        </Reveal>
      </div>

      <AnimatePresence>
        {expandedPhoto !== null && (
          <ExpandedPhoto
            key="expanded"
            layoutId={`whatitslike-photo-${expandedPhoto}`}
            src={photos[expandedPhoto].src}
            title={photos[expandedPhoto].title}
            subtitle={photos[expandedPhoto].subtitle}
            onClose={() => setExpandedPhoto(null)}
            borderWidth={12}
            borderRadius={expandedPhoto === 1 ? 32 : 40}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
