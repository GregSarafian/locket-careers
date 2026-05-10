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
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
              className="flex-1 min-w-[200px] h-[160px] p-10 rounded-[40px] flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-white/[0.03] to-white/[0.05] text-white/80"
            >
              <div className="font-bold text-[40px] leading-tight">{s.value}</div>
              <div className="font-bold text-[20px] leading-[26px]">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
