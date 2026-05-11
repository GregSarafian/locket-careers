import { motion } from 'framer-motion';
import { selectionHaptic } from '../../lib/haptics';

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

const underlineVariants = {
  rest: {
    scaleX: 0,
    opacity: 0,
    transition: {
      scaleX: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
      opacity: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
    },
  },
  hover: {
    scaleX: 1,
    opacity: 1,
    transition: {
      scaleX: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
      opacity: { duration: 0.05 },
    },
  },
};

function InvestorLink({ name, href }: { name: string; href: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.9 }}
      onClick={() => selectionHaptic()}
      className="relative inline-block pb-1 text-white/80 hover:text-white transition-colors duration-200"
    >
      {name}
      <span aria-hidden className="absolute left-0 right-0 bottom-0 h-[2px] rounded-full bg-white/20" />
      <motion.span
        aria-hidden
        className="absolute left-0 right-0 bottom-0 h-[2px] rounded-full bg-white origin-center"
        variants={underlineVariants}
      />
    </motion.a>
  );
}

function ReadMoreLink({ href }: { href: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.9 }}
      onClick={() => selectionHaptic()}
      className="text-[var(--color-accent)] whitespace-nowrap inline-flex items-center gap-1"
    >
      <span className="relative pb-1">
        Read more here
        <span aria-hidden className="absolute left-0 right-0 bottom-0 h-[2px] rounded-full bg-current/20" />
        <motion.span
          aria-hidden
          className="absolute left-0 right-0 bottom-0 h-[2px] rounded-full bg-current origin-center"
          variants={underlineVariants}
        />
      </span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.a>
  );
}

export function Funding() {
  return (
    <section className="px-6 md:px-[120px] py-10">
      <div className="max-w-[1080px] mx-auto flex flex-col gap-6 items-start text-white/80">
        <h3 className="font-bold text-[28px] leading-tight">Has Locket raised money?</h3>

        <p className="font-semibold text-[20px] leading-[26px] text-white/60">
          Yes! We've been lucky to partner with some of the best people in social, including{' '}
          {investors.map((inv, i) => (
            <span key={inv.name}>
              <InvestorLink name={inv.name} href={inv.href} />
              {i < investors.length - 1 ? ', ' : ''}
            </span>
          ))}
          , and many more. To date, Locket has raised $12.5M in funding.{' '}
          <ReadMoreLink href={READ_MORE} />
        </p>
      </div>
    </section>
  );
}
