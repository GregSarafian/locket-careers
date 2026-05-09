import { Stagger, staggerItem } from '../motion/Stagger';
import { motion } from 'framer-motion';
import { Reveal } from '../motion/Reveal';
import { perks } from '../../data/perks';

export function Perks() {
  return (
    <section className="px-6 md:px-[120px] py-10">
      <div className="max-w-[1080px] mx-auto flex flex-col gap-6 items-start">
        <Reveal>
          <h3 className="font-bold text-[28px] leading-tight text-white/80">Benefits</h3>
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
                'h-[160px] rounded-[32px] px-6 py-4 flex flex-col gap-2 items-start justify-center',
                p.outlined
                  ? 'border-4 border-white/5 bg-transparent'
                  : 'bg-white/5',
              ].join(' ')}
            >
              <div className="leading-none"><img src={p.icon} alt="" aria-hidden="true" width={28} height={28} /></div>
              <h4 className="font-bold text-[17px] leading-[22px] tracking-[0.17px] text-white/80 whitespace-pre-line">
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
