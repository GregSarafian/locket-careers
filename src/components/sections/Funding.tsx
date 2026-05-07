import { Reveal } from '../motion/Reveal';

type Investor = { name: string; href: string };

const investors: Investor[] = [
  { name: 'Sam Altman', href: 'https://en.wikipedia.org/wiki/Sam_Altman' },
  { name: 'Nikita Bier', href: 'https://twitter.com/nikitabier' },
  { name: "Adam D'Angelo", href: 'https://en.wikipedia.org/wiki/Adam_D%27Angelo' },
  { name: 'Mike Krieger', href: 'https://en.wikipedia.org/wiki/Mike_Krieger' },
  { name: 'Dave Morin', href: 'https://en.wikipedia.org/wiki/Dave_Morin' },
  { name: 'Ben Rubin', href: 'https://www.linkedin.com/in/rubinben/' },
  { name: 'Brian Sugar', href: 'https://twitter.com/briansugar' },
];

const READ_MORE =
  'https://techcrunch.com/2022/08/02/locket-app-that-lets-yor-post-photos-to-your-loved-ones-homescreens-raises-12-5m/';

const linkClasses = 'underline decoration-white/30 underline-offset-2 hover:decoration-white/80 transition-colors';

export function Funding() {
  return (
    <section className="px-6 md:px-[120px] py-10">
      <div className="max-w-[1080px] mx-auto flex flex-col gap-6 items-start text-white/80">
        <Reveal>
          <h3 className="font-bold text-[28px] leading-tight">Has Locket raised money?</h3>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="font-semibold text-[20px] leading-[25px]">
            Yes! We've been lucky to partner with some of the best people in social, including{' '}
            {investors.map((inv, i) => (
              <span key={inv.name}>
                <a
                  href={inv.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClasses}
                >
                  {inv.name}
                </a>
                {i < investors.length - 1 ? ', ' : ''}
              </span>
            ))}
            , and many more. To date, Locket has raised $12.5M in funding.{' '}
            <a
              href={READ_MORE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] hover:underline whitespace-nowrap inline-flex items-center gap-1"
            >
              Read more here
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
