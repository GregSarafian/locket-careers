import { motion } from 'framer-motion';

const stats = [
  { value: '10 Billion', label: 'Lockets Sent' },
  { value: '10 Million', label: 'DAU' },
  { value: '100 Million', label: 'Downloads' },
  { value: '$10M+', label: 'Annual Run Rate' },
];

export function AboutStats() {
  return (
    <section className="px-6 md:px-[120px] py-10">
      <div className="max-w-[1080px] mx-auto flex flex-col gap-6">
        <div className="flex gap-2 font-bold text-[28px] leading-tight">
          <span className="text-white/80">About Locket</span>
          <span className="text-white/30">Since 2022</span>
        </div>

        <div className="flex flex-wrap gap-6 justify-center">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial="rest"
              animate="rest"
              whileHover="hover"
              variants={{ rest: { y: 0 }, hover: { y: -3 } }}
              transition={{ duration: 0.3 }}
              className="flex-1 min-w-[200px] h-[160px] p-10 rounded-[40px] flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-white/[0.03] to-white/[0.05] text-white/80"
            >
              <div className="relative font-bold text-[32px] leading-tight whitespace-nowrap">
                <span>{s.value}</span>
                <motion.span
                  aria-hidden
                  variants={{
                    rest: { backgroundPosition: '150% 0', transition: { duration: 0 } },
                    hover: {
                      backgroundPosition: '-50% 0',
                      transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage:
                      'linear-gradient(110deg, transparent 35%, #fde68a 45%, #f59e0b 50%, #fde68a 55%, transparent 65%)',
                    backgroundSize: '200% 100%',
                    backgroundRepeat: 'no-repeat',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  {s.value}
                </motion.span>
              </div>
              <div className="font-bold text-[20px] leading-[26px]">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
