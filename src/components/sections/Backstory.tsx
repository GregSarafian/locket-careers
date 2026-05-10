import { motion } from 'framer-motion';

const underlineVariants = {
  rest: {
    scaleX: 0,
    opacity: 0,
    transition: {
      scaleX: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
      opacity: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
    },
  },
  hover: {
    scaleX: 1,
    opacity: 1,
    transition: {
      scaleX: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
      opacity: { duration: 0.05 },
    },
  },
};

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
        <img src={src} alt="" aria-hidden draggable={false} loading="lazy" decoding="async" className="block size-full object-cover" />
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]" />
      </div>
    </motion.div>
  );
}

export function Backstory() {
  return (
    <section className="px-6 md:px-[120px] py-10">
      <div className="max-w-[1080px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20 items-center lg:items-start justify-center">
          {/* Left: stacked polaroids */}
          <div className="shrink-0">
            <div className="relative w-[256px] h-[360px]">
              <div className="absolute left-0 top-0">
                <Polaroid src="/assets/backstory/photo-1.webp" rotate={-8} />
              </div>
              <div className="absolute right-0 bottom-0">
                <Polaroid src="/assets/backstory/photo-2.webp" rotate={10} />
              </div>
            </div>
          </div>

          {/* Right: heading + body + signature */}
          <div className="max-w-[572px] flex flex-col gap-6">
            <h2 className="font-bold text-[28px] leading-tight text-white/80">
              The Backstory
            </h2>

            <div className="font-semibold text-[20px] leading-[26px] text-white/60 space-y-[1.25em]">
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

            <p className="mt-2 font-semibold text-[13px] leading-[18px] tracking-[0.26px] text-white/60">
              <motion.a
                href="https://x.com/thefuturematt"
                target="_blank"
                rel="noopener noreferrer"
                initial="rest"
                animate="rest"
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
                className="relative inline-block pb-0.5 hover:text-white/60 transition-colors duration-200"
              >
                Matt Moss
                <span aria-hidden className="absolute left-0 right-0 bottom-0 h-[1px] rounded-full bg-white/20" />
                <motion.span
                  aria-hidden
                  className="absolute left-0 right-0 bottom-0 h-[1px] rounded-full bg-white/30 origin-center"
                  variants={underlineVariants}
                />
              </motion.a>
              , Locket Founder
            </p>
          </div>
      </div>
    </section>
  );
}
