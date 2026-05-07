import { Stagger, staggerItem } from '../motion/Stagger';
import { motion } from 'framer-motion';
import { Reveal } from '../motion/Reveal';
import type { ReactNode } from 'react';

type Challenge = {
  icon: ReactNode;
  title: string;
  body: string;
};

const ICON_PROPS = {
  width: 36,
  height: 36,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const DottedCircle = () => (
  <svg {...ICON_PROPS}>
    <circle cx="12" cy="12" r="9" strokeDasharray="2 3" />
  </svg>
);

const ChartLineUp = () => (
  <svg {...ICON_PROPS}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M7 14l3-3 3 3 4-5" />
  </svg>
);

const Heart = () => (
  <svg {...ICON_PROPS}>
    <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10z" fill="currentColor" stroke="none" />
  </svg>
);

const challenges: Challenge[] = [
  {
    icon: <DottedCircle />,
    title: 'Exploring a new form factor',
    body:
      "The widget is a new form factor with countless product and UI challenges still to be solved. Because Locket is on the Home Screen, we can become a core part of how people use their phones every day.",
  },
  {
    icon: <ChartLineUp />,
    title: 'Scaling Rapidly',
    body:
      'We grew from 20 beta testers to 1M+ sign ups in 2 weeks after launch and will need to continue scaling rapidly.',
  },
  {
    icon: <Heart />,
    title: 'Building something people love',
    body:
      'For Locket to succeed in the long run, we have to stay laser-focused on building features and products our users love.',
  },
];

export function Challenges() {
  return (
    <section className="px-6 md:px-[120px] py-10">
      <div className="max-w-[1080px] mx-auto flex flex-col gap-6 items-start">
        <Reveal>
          <h3 className="font-bold text-[28px] leading-tight text-white/80">
            What are some of the challenges?
          </h3>
        </Reveal>

        <Stagger className="grid md:grid-cols-3 gap-6 w-full" stagger={0.08}>
          {challenges.map((c) => (
            <motion.div
              key={c.title}
              variants={staggerItem}
              className="flex flex-col gap-2 items-start"
            >
              <div className="text-white/40 mb-1">{c.icon}</div>
              <h4 className="font-bold text-[22px] leading-[28px] text-white/80">{c.title}</h4>
              <p className="font-semibold text-[20px] leading-[25px] text-white/80">
                {c.body}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
