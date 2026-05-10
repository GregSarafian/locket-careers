import { motion } from 'framer-motion';

export function HappierIntro() {
  return (
    <section className="px-6 md:px-[120px] py-10">
      <div className="relative max-w-[1080px] mx-auto">
        <div className="relative p-8 md:p-[60px]">
          {/* Left iPhone mockup, decorative — bleeds beyond the card */}
          <motion.img
            src="/assets/happier/phone-left.webp"
            alt=""
            aria-hidden
            draggable={false}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, x: -60, rotate: 8 }}
            whileInView={{ opacity: 1, x: 0, rotate: 16 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block absolute left-[-280px] top-[60px] w-[360px] origin-top pointer-events-none select-none"
          />

          {/* Right iPhone mockup, decorative — bleeds beyond the card */}
          <motion.img
            src="/assets/happier/phone-right.webp"
            alt=""
            aria-hidden
            draggable={false}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, x: 60, rotate: -8 }}
            whileInView={{ opacity: 1, x: 0, rotate: -16 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block absolute right-[-280px] top-[60px] w-[360px] origin-top pointer-events-none select-none"
          />

          <div className="relative max-w-[729px] mx-auto flex flex-col gap-6">
            <h2 className="font-bold text-[28px] leading-tight text-white/80">
              What if social media actually made you{' '}
              <span className="text-[var(--color-accent)]">happier</span>?
            </h2>

            <div className="font-semibold text-[20px] leading-[26px] text-white/60 space-y-[1.25em]">
              <p>
                Everyone knows it kind of sucks to use your phone these days. Most social apps
                feel like they care more about grabbing your attention than keeping you connected
                with your real friends. As existing social platforms move further and further
                towards entertainment, we believe there's a huge opportunity for a platform that
                doubles down on authentic connection with close friends.
              </p>
              <p>
                At <span className="font-bold text-white">Locket</span>, we're
                building the platform that puts real friends first. Since launching in 2022,
                Locket has grown to{' '}
                <span className="font-bold text-white">10s of millions of active users</span>
                {' '}and is one of the{' '}
                <span className="font-bold text-white">fastest-growing apps amongst Gen Z and Gen Alpha</span>
                {' '}around the world. Add the widget to your Home Screen to see live pics from
                your favorite people every time you open your phone. Tap into the app to view
                memories, chat, and share weekly check ins with friends every Sunday using
                Rollcall.
              </p>
              <p>
                We have a unique shot to build one of the defining social companies of the
                decade — making Locket the go-to way to stay close with your favorite people.
              </p>
              <p className="font-bold text-white">We want your help!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
