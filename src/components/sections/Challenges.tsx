import { motion } from 'framer-motion';

type Challenge = {
  icon: string;
  title: string;
  body: string;
  rotate: number;
};

const challenges: Challenge[] = [
  {
    icon: '/assets/challenges/challenge-1.svg',
    title: 'Exploring a new form factor',
    body:
      "The widget is a new form factor with countless product and UI challenges still to be solved. Because Locket is on the Home Screen, we can become a core part of how people use their phones every day.",
    rotate: -2,
  },
  {
    icon: '/assets/challenges/challenge-2.svg',
    title: 'Scaling Rapidly',
    body:
      'We grew from 20 beta testers to 1M+ sign ups in 2 weeks after launch and will need to continue scaling rapidly.',
    rotate: 1.5,
  },
  {
    icon: '/assets/challenges/challenge-3.svg',
    title: 'Building something people love',
    body:
      'For Locket to succeed in the long run, we have to stay laser-focused on building features and products our users love.',
    rotate: -1.5,
  },
];

export function Challenges() {
  return (
    <section className="px-6 md:px-[120px] py-10">
      <div className="max-w-[1080px] mx-auto flex flex-col gap-6 items-start">
        <h3 className="font-bold text-[28px] leading-tight text-white/80">
          What are some of the challenges?
        </h3>

        <div className="grid md:grid-cols-3 gap-6 w-full">
          {challenges.map((c) => (
            <motion.div
              key={c.title}
              initial={{ rotate: c.rotate }}
              animate={{ rotate: c.rotate }}
              whileHover={{ rotate: c.rotate * 0.4, scale: 1.01 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3 items-start p-6 rounded-[32px] bg-gradient-to-b from-white/[0.03] to-white/[0.05]"
            >
              <img src={c.icon} alt="" aria-hidden="true" width={42} height={42} className="opacity-70" />
              <h4 className="font-bold text-[20px] leading-[26px] text-white/80">{c.title}</h4>
              <p className="font-semibold text-[20px] leading-[26px] text-white/60">
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
