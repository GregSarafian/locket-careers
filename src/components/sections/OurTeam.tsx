import { InteractiveDottedMap } from './InteractiveDottedMap';

export function OurTeam() {
  return (
    <section className="px-6 md:px-[120px] py-10">
      <div className="max-w-[1080px] mx-auto flex flex-col gap-12 md:gap-6">
        <div className="flex gap-2 font-bold text-[28px] leading-tight justify-center md:justify-start">
          <span className="text-white/80">Our Team</span>
          <span className="text-white/30">Global by design</span>
        </div>

        <div className="rounded-[40px] md:bg-gradient-to-b md:from-white/[0.03] md:to-white/[0.05]">
          <div className="p-0 md:p-6">
            <InteractiveDottedMap />
          </div>
          <div className="px-0 py-6 md:p-6">
            <p className="font-semibold text-[18px] leading-[24px] text-white/60 text-left">
              Join a small team of 12, where everyone has high ownership and a massive impact on
              the product. Based in San Francisco with team members in Los Angeles, New York,
              Austin, Toronto, Argentina, and Vietnam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
