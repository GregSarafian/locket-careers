import { motion } from 'framer-motion';
import { press } from '../../data/press';

export function Press() {
  return (
    <section className="px-6 md:px-[120px] py-10">
      <div className="max-w-[1080px] mx-auto flex flex-col gap-8 items-start">
        <h3 className="font-bold text-[28px] leading-tight text-white/80">
          Where can I read more about Locket?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {press.map((p) => (
            <motion.a
              key={p.title + p.source}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col gap-4 items-stretch border-2 border-white/10 rounded-[16px] overflow-hidden hover:border-white/20 transition-colors"
            >
              <div className="h-[182px] w-full overflow-hidden">
                <img
                  src={p.image}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  className="block size-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="flex flex-col gap-2 px-4 pb-4 text-white/80">
                <img src={p.logo} alt={p.source} style={{ height: p.logoHeight ?? 16 }} className="w-auto object-contain brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity self-start" />
                <p className="font-bold text-[17px] leading-tight">{p.title}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
