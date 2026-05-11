import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { perks } from '../../data/perks';
import { mediumHaptic } from '../../lib/haptics';

type Perk = typeof perks[number];

const ease = [0.22, 1, 0.36, 1] as const;

function PerkCard({
  p,
  expanded,
  onToggle,
}: {
  p: Perk;
  expanded: boolean;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {/* Mobile: tap-to-expand row layout */}
      <button
        type="button"
        onClick={() => {
          mediumHaptic();
          onToggle();
        }}
        data-no-emoji
        className={[
          'md:hidden w-full text-left rounded-[32px] px-6 py-6 overflow-hidden',
          p.outlined ? 'border-4 border-white/5 bg-transparent' : 'bg-white/5',
        ].join(' ')}
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          <img src={p.icon} alt="" aria-hidden="true" width={28} height={28} className="shrink-0" />
          <h4 className="font-bold text-[20px] leading-[26px] text-white/80">
            {p.title.replace(/\n/g, ' ')}
          </h4>
        </div>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0, filter: 'blur(6px)' }}
              animate={{ height: 'auto', opacity: 1, marginTop: 16, filter: 'blur(0px)' }}
              exit={{ height: 0, opacity: 0, marginTop: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.3, ease }}
              className="overflow-hidden"
            >
              <p className="font-semibold text-[18px] leading-[24px] text-white/60">{p.body}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Desktop: hover-to-reveal vertical layout */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={[
          'hidden md:flex h-[160px] rounded-[32px] px-6 overflow-hidden flex-col justify-center',
          p.outlined ? 'border-4 border-white/5 bg-transparent' : 'bg-white/5',
        ].join(' ')}
      >
        <motion.div
          className="relative flex flex-col items-start gap-2"
          animate={{ y: hovered ? -20 : 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <img src={p.icon} alt="" aria-hidden="true" width={28} height={28} />
          <h4 className="font-bold text-[17px] leading-[22px] tracking-[0.17px] text-white/80 whitespace-pre-line">
            {p.title}
          </h4>
          <motion.p
            className="absolute top-full left-0 right-0 mt-2 font-semibold text-[17px] leading-[22px] text-white/60"
            animate={{ opacity: hovered ? 1 : 0, filter: hovered ? 'blur(0px)' : 'blur(6px)' }}
            transition={{ duration: 0.4, ease }}
          >
            {p.body}
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}

export function Perks() {
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  return (
    <section className="px-6 md:px-[120px] py-10">
      <div className="max-w-[1080px] mx-auto flex flex-col gap-6 items-start">
        <h3 className="font-bold text-[28px] leading-tight text-white/80">Team Member Benefits</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 w-full">
          {perks.map((p) => (
            <PerkCard
              key={p.title}
              p={p}
              expanded={openTitle === p.title}
              onToggle={() => setOpenTitle(openTitle === p.title ? null : p.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
