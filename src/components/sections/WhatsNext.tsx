import { Reveal } from '../motion/Reveal';

export function WhatsNext() {
  return (
    <section className="px-6 md:px-[120px] py-20">
      <div className="max-w-[1080px] mx-auto flex flex-col items-center justify-center gap-6 text-center">
        <Reveal className="flex flex-col items-center gap-4">
          <h2 className="font-bold text-[40px] leading-tight text-white/80">What's next?</h2>
          <p className="font-semibold text-[20px] leading-[25px] text-white/60">
            We have so much more to build and can't wait to tell you about what's next.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-bold text-[20px] leading-tight text-white/80">
            Email us at{' '}
            <a
              href="mailto:jobs@locketcamera.com"
              className="text-[var(--color-accent)] underline decoration-solid"
            >
              jobs@locketcamera.com
            </a>{' '}
            to apply or reach out to one of us personally.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
