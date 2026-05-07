import { motion } from 'framer-motion';
import { Reveal } from '../motion/Reveal';

function Polaroid({
  src,
  size = 160,
  rotate = 0,
  className = '',
}: {
  src: string;
  size?: number;
  rotate?: number;
  className?: string;
}) {
  // White frame with photo inset; 10px top/sides, 40px bottom (classic polaroid).
  const padX = 10;
  const padTop = 10;
  const padBottom = 40;
  return (
    <motion.div
      initial={{ rotate }}
      animate={{ rotate }}
      whileHover={{ rotate: rotate * 0.4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        paddingTop: padTop,
        paddingLeft: padX,
        paddingRight: padX,
        paddingBottom: padBottom,
        // Use CSS filter drop-shadow so the shadow follows the rotated shape
        // and doesn't scale-bleed into adjacent sections.
        filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5))',
        willChange: 'transform',
      }}
      className={`bg-white rounded-[40px] inline-block ${className}`}
    >
      <div
        className="rounded-[30px] overflow-hidden relative"
        style={{ width: size, height: size }}
      >
        <img src={src} alt="" aria-hidden draggable={false} className="block size-full object-cover" />
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]" />
      </div>
    </motion.div>
  );
}

export function Backstory() {
  return (
    <section className="px-6 md:px-[120px] py-10">
      <div className="max-w-[1080px] mx-auto flex flex-col gap-10 items-center">
        <Reveal className="w-full">
          <div className="flex items-center gap-4 w-full">
            <img src="/assets/backstory/line-left.svg" alt="" aria-hidden className="flex-1 h-2" />
            <h3 className="font-bold text-[28px] leading-none text-white/80 whitespace-nowrap">
              The Backstory
            </h3>
            <img src="/assets/backstory/line-right.svg" alt="" aria-hidden className="flex-1 h-2 -scale-x-100" />
          </div>
        </Reveal>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center lg:items-start justify-center">
          {/* Left: stacked polaroids */}
          <Reveal className="shrink-0">
            <div className="relative w-[256px] h-[360px]">
              <div className="absolute left-0 top-0">
                <Polaroid src="/assets/backstory/photo-1.png" rotate={-8} />
              </div>
              <div className="absolute right-0 bottom-0">
                <Polaroid src="/assets/backstory/photo-2.png" rotate={10} />
              </div>
            </div>
          </Reveal>

          {/* Right: serif body + signature */}
          <Reveal delay={0.1} className="max-w-[572px]">
            <div
              className="font-serif text-[20px] leading-[25px] text-white/80 space-y-4"
              style={{
                fontFamily:
                  '"New York", "Iowan Old Style", "Palatino Linotype", "Georgia", "Cambria", serif',
              }}
            >
              <p>
                I built Locket as a birthday present for my girlfriend Ava back in 2022. She was
                heading back to school at UCSB, so we were about to go long distance. I wanted to
                find a way to reduce the distance between us, but none of the existing social
                platforms felt right. They were all too impersonal, high friction, or boring. I
                had the idea for Locket, and then built it over the course of a few weeks. It felt
                like magic to get updates from her throughout the day, right on my home screen.
                Over the next 6 months, we used the app extensively and sent over 1,500 pictures
                to each other.
              </p>
              <p>
                After friends asked to try the app, we invited a few people. Our friends began to
                get significant usage out of Locket and I even started getting messages daily about
                how much friends were enjoying it. With all this feedback, I launched Locket on the
                App Store January 1st, 2022. After a few viral videos and 25M views on TikTok,
                Locket became the #1 app in over 30 countries.
              </p>
            </div>

            <div className="mt-4 pl-2">
              <img
                src="/assets/backstory/signature.svg"
                alt="Matt"
                className="h-9 w-auto"
                draggable={false}
              />
            </div>

            <p className="mt-2 font-semibold text-[13px] leading-[18px] tracking-[0.26px] text-white/30">
              Matt Moss, Locket Founder
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
