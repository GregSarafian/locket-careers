import { useState } from 'react';
import { motion } from 'framer-motion';
import { perks } from '../../data/perks';

type Perk = typeof perks[number];

const ease = [0.22, 1, 0.36, 1] as const;

function PerkCard({ p }: { p: Perk }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={[
        'h-[160px] rounded-[32px] px-6 overflow-hidden flex flex-col justify-center',
        p.outlined ? 'border-4 border-white/5 bg-transparent' : 'bg-white/5',
      ].join(' ')}
    >
      {/*
        Wrapper sized by icon+title only → justify-center centers them perfectly.
        On hover it nudges up. Subtitle is absolute top-full so it's always
        exactly gap-2 below the title regardless of title line count.
      */}
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
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease }}
        >
          {p.body}
        </motion.p>
      </motion.div>
    </div>
  );
}

export function Perks() {
  return (
    <section className="px-6 md:px-[120px] py-10">
      <div className="max-w-[1080px] mx-auto flex flex-col gap-6 items-start">
        <h3 className="font-bold text-[28px] leading-tight text-white/80">Benefits</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {perks.map((p) => (
            <PerkCard key={p.title} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
