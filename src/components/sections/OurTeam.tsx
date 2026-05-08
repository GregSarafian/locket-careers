import { Reveal } from '../motion/Reveal';

export function OurTeam() {
  return (
    <section className="px-6 md:px-[120px] py-10">
      <div className="max-w-[1080px] mx-auto flex flex-col gap-6">
        <Reveal>
          <div className="flex gap-2 font-bold text-[28px] leading-none">
            <span className="text-white/80">Our Team</span>
            <span className="text-white/30">Global by design</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="rounded-[40px] bg-gradient-to-b from-white/[0.03] to-white/[0.05]">
            <div className="p-6">
              <div className="aspect-[892/426] w-full">
                <img
                  src="/assets/team/dotted-map.svg"
                  alt="Map showing global team locations"
                  className="block w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="p-6">
              <p className="font-semibold text-[20px] leading-[25px] text-white/80">
                Join a small team of 10, where everyone has high ownership and a massive impact on
                the product. Based in San Francisco with team members in Los Angeles, New York,
                Austin, Toronto, and Argentina.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
