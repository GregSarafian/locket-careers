import { motion } from 'framer-motion';

const stats = [
  { value: '10 Billion', valueMobile: '10B', label: 'Lockets Sent', labelMobile: 'Photos Sent' },
  { value: '10 Million', valueMobile: '10M', label: 'DAU', labelMobile: 'DAU' },
  { value: '100 Million', valueMobile: '100M', label: 'Downloads', labelMobile: 'Downloads' },
  { value: '$10M+', valueMobile: '$10M+', label: 'Annual Run Rate', labelMobile: 'ARR' },
];

export function AboutStats() {
  return (
    <section className="px-6 md:px-[120px] py-10">
      <div className="max-w-[1080px] mx-auto flex flex-col gap-6">
        <div className="flex gap-2 font-bold text-[28px] leading-tight justify-center md:justify-start">
          <span className="text-white/80">About Locket</span>
          <span className="text-white/30">Since 2022</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 justify-center">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial="rest"
              animate="rest"
              whileHover="hover"
              variants={{ rest: { y: 0 }, hover: { y: -3 } }}
              transition={{ duration: 0.3 }}
              className="h-[160px] p-6 md:p-10 rounded-[30px] md:rounded-[40px] flex flex-col items-center justify-center gap-1 md:gap-2 bg-gradient-to-b from-white/[0.03] to-white/[0.05] text-white/80"
            >
              <div className="relative font-bold text-[32px] leading-tight whitespace-nowrap">
                <span><span className="md:hidden">{s.valueMobile}</span><span className="hidden md:inline">{s.value}</span></span>
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
                  <span className="md:hidden">{s.valueMobile}</span><span className="hidden md:inline">{s.value}</span>
                </motion.span>
              </div>
              <div className="font-bold text-[20px] leading-[26px]"><span className="md:hidden">{s.labelMobile}</span><span className="hidden md:inline">{s.label}</span></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
