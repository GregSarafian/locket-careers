import { Stagger, staggerItem } from '../motion/Stagger';
import { motion } from 'framer-motion';
import { Reveal } from '../motion/Reveal';
import { press } from '../../data/press';

function AppleGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.365 1.43c0 1.14-.42 2.21-1.16 3.02-.85.93-2.21 1.65-3.34 1.56-.13-1.16.5-2.36 1.18-3.13.78-.88 2.13-1.55 3.32-1.45zM21 17.4c-.45 1.04-1 2.04-1.69 2.95-.95 1.26-2.3 2.83-3.97 2.83-1.5 0-1.88-.92-3.93-.91-2.05.01-2.47.93-3.96.92-1.67-.01-2.95-1.42-3.91-2.68C1.5 17.84.7 14.74.7 11.7c0-3 1.45-5.32 3.62-6.62a4.95 4.95 0 0 1 4.5.07c1.27 0 2.27-.97 3.84-1.06 1.74-.13 3.04.95 3.83 1.95-3.4 2.06-2.85 7.16.51 8.36-.41 1.18-.74 2.34-1.5 3z" />
    </svg>
  );
}

function NewspaperGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M7 9h6M7 12h10M7 15h7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Press() {
  return (
    <section className="px-6 md:px-[120px] py-10">
      <div className="max-w-[1080px] mx-auto flex flex-col gap-8 items-center">
        <Reveal>
          <h3 className="font-bold text-[28px] leading-tight text-white/80 text-center">
            Where can I read more about Locket?
          </h3>
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full" stagger={0.05}>
          {press.map((p) => (
            <motion.a
              key={p.title + p.source}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={staggerItem}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 items-stretch border-2 border-white/10 rounded-[16px] overflow-hidden hover:border-white/20 transition-colors"
            >
              <div className="h-[182px] w-full overflow-hidden">
                <img
                  src={p.image}
                  alt=""
                  aria-hidden
                  className="block size-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="flex flex-col gap-2 px-4 pb-4 text-white/80">
                <p className="flex items-center gap-1.5 font-bold text-[13px] leading-[18px] tracking-[0.26px]">
                  {p.sourceIcon === 'apple' ? <AppleGlyph /> : <NewspaperGlyph />}
                  {p.source}
                </p>
                <p className="font-bold text-[17px] leading-tight">{p.title}</p>
              </div>
            </motion.a>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
