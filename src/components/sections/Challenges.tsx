import { Stagger, staggerItem } from '../motion/Stagger';
import { motion } from 'framer-motion';
import { Reveal } from '../motion/Reveal';

type Challenge = {
  icon: string;
  title: string;
  body: string;
};

const challenges: Challenge[] = [
  {
    icon: '/assets/challenges/challenge-1.svg',
    title: 'Exploring a new form factor',
    body:
      "The widget is a new form factor with countless product and UI challenges still to be solved. Because Locket is on the Home Screen, we can become a core part of how people use their phones every day.",
  },
  {
    icon: '/assets/challenges/challenge-2.svg',
    title: 'Scaling Rapidly',
    body:
      'We grew from 20 beta testers to 1M+ sign ups in 2 weeks after launch and will need to continue scaling rapidly.',
  },
  {
    icon: '/assets/challenges/challenge-3.svg',
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
              <div className="mb-1"><img src={c.icon} alt="" aria-hidden="true" width={42} height={42} /></div>
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
