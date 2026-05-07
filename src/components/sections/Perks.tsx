import { Stagger, staggerItem } from '../motion/Stagger';
import { motion } from 'framer-motion';
import { Reveal } from '../motion/Reveal';
import { perks } from '../../data/perks';
import type { ReactNode } from 'react';

const ICON_SIZE = 28;

const iconBase = {
  width: ICON_SIZE,
  height: ICON_SIZE,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'url(#perkGradient)',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const ICONS: Record<string, ReactNode> = {
  wallet: (
    <svg {...iconBase}>
      <rect x="3" y="6" width="18" height="14" rx="3" />
      <path d="M3 9h13a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H3" />
      <circle cx="16" cy="13.5" r="1" fill="url(#perkGradient)" stroke="none" />
    </svg>
  ),
  globe: (
    <svg {...iconBase}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
  ticket: (
    <svg {...iconBase}>
      <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z" />
      <path d="M9 9l3 3-3 3" />
    </svg>
  ),
  heart: (
    <svg {...iconBase}>
      <path
        d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10z"
        fill="url(#perkGradient)"
        stroke="none"
      />
    </svg>
  ),
  dumbbell: (
    <svg {...iconBase}>
      <path d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12" />
    </svg>
  ),
  chart: (
    <svg {...iconBase}>
      <path d="M5 19V9M10 19V5M15 19v-6M20 19v-9" />
      <path d="M3 21h18" />
    </svg>
  ),
  palm: (
    <svg {...iconBase}>
      <path d="M12 21V11" />
      <path d="M12 11c-3-2-7-1-8 1M12 11c3-2 7-1 8 1M12 11c0-3 2-6 5-6M12 11c0-3-2-6-5-6M12 11c-1-2-1-4 0-6" />
    </svg>
  ),
  desktop: (
    <svg {...iconBase}>
      <rect x="2" y="4" width="14" height="10" rx="2" />
      <path d="M9 18v3M5 21h8" />
      <rect x="17" y="9" width="5" height="11" rx="1.4" />
    </svg>
  ),
  dots: (
    <svg {...iconBase}>
      <circle cx="12" cy="6" r="1.6" fill="url(#perkGradient)" stroke="none" />
      <circle cx="6.5" cy="9.5" r="1.6" fill="url(#perkGradient)" stroke="none" />
      <circle cx="17.5" cy="9.5" r="1.6" fill="url(#perkGradient)" stroke="none" />
      <circle cx="8.5" cy="15" r="1.6" fill="url(#perkGradient)" stroke="none" />
      <circle cx="15.5" cy="15" r="1.6" fill="url(#perkGradient)" stroke="none" />
      <circle cx="12" cy="18" r="1.6" fill="url(#perkGradient)" stroke="none" />
    </svg>
  ),
};

function PerkIconDefs() {
  // Single shared gradient definition. Rendered once at the section root.
  return (
    <svg width="0" height="0" aria-hidden style={{ position: 'absolute' }}>
      <defs>
        <linearGradient id="perkGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD25F" />
          <stop offset="100%" stopColor="#EAA900" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Perks() {
  return (
    <section className="px-6 md:px-[120px] py-10">
      <PerkIconDefs />
      <div className="max-w-[1080px] mx-auto flex flex-col gap-6 items-start">
        <Reveal>
          <h3 className="font-bold text-[28px] leading-tight text-white/80">Perks &amp; Benefits</h3>
        </Reveal>

        <Stagger
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          stagger={0.05}
        >
          {perks.map((p) => (
            <motion.div
              key={p.title}
              variants={staggerItem}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
              className={[
                'h-[200px] rounded-[32px] p-6 flex flex-col gap-2 items-start justify-center',
                p.outlined
                  ? 'border-4 border-white/5 bg-transparent'
                  : 'bg-white/5',
              ].join(' ')}
            >
              <div className="leading-none">{ICONS[p.iconKey]}</div>
              <h4 className="font-bold text-[17px] leading-[22px] tracking-[0.17px] text-white/80">
                {p.title}
              </h4>
              <p className="font-semibold text-[13px] leading-[18px] tracking-[0.26px] text-white/80">
                {p.body}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
