import { motion } from 'framer-motion';

export function WhatsNext() {
  return (
    <section className="px-6 md:px-[120px] py-20">
      <div className="max-w-[1080px] mx-auto flex flex-col items-center justify-center gap-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-bold text-[40px] leading-tight text-white/80">What's next?</h2>
          <p className="font-semibold text-[20px] leading-[26px] text-white/60">
            We have so much more to build and can't wait to tell you about what's next.
          </p>
        </div>

        <p className="font-bold text-[20px] leading-tight text-white/80">
            Email us at{' '}
            <motion.a
              href="mailto:jobs@locketcamera.com"
              initial="rest"
              animate="rest"
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
              className="inline-flex items-start text-[var(--color-accent)]"
            >
              <span className="relative pb-1.5">
                jobs@locketcamera.com
                <span aria-hidden className="absolute left-0 right-0 bottom-0 h-[2px] rounded-full bg-current/20" />
                <motion.span
                  aria-hidden
                  className="absolute left-0 right-0 bottom-0 h-[2px] rounded-full bg-current origin-center"
                  variants={{
                    rest: {
                      scaleX: 0,
                      opacity: 0,
                      transition: {
                        scaleX: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                      },
                    },
                    hover: {
                      scaleX: 1,
                      opacity: 1,
                      transition: {
                        scaleX: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.05 },
                      },
                    },
                  }}
                />
              </span>
            </motion.a>{' '}
            to apply or reach out to one of us personally.
          </p>
      </div>
    </section>
  );
}
