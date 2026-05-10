export type RoleBlock =
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: { lead: string; sub?: string }[] };

export type Role = {
  slug: string;
  title: string;
  location: string;
  applyUrl: string;
  body?: RoleBlock[];
};

const APPLY_EMAIL = 'mailto:jobs@locketcamera.com';

export const roles: Role[] = [
  {
    slug: 'backend-engineer',
    title: 'Backend Engineer',
    location: 'Product',
    applyUrl: `${APPLY_EMAIL}?subject=Backend%20Engineer`,
    body: [
      {
        kind: 'p',
        text:
          "We're looking for talented engineers to continue scaling the Locket backend. When Locket launched three years ago, we scaled from 20 beta testers to 1M+ sign ups in a few weeks time. If scaling this fast sounds exciting, we want to work with you.",
      },
      {
        kind: 'p',
        text:
          "As one of our first ten engineers, you'll be able to touch all parts of the stack, have the opportunity to ship to millions of daily users from day one, and be given ownership over large parts of the product.",
      },
      { kind: 'p', text: 'Some of the backend challenges we have today include:' },
      {
        kind: 'ul',
        items: [
          {
            lead:
              'Optimizing performance, reliability, and costs of our micro-services infra, which serves 1B+ requests per day.',
          },
          { lead: 'Designing AI data pipelines to process billions of data points.' },
          {
            lead:
              'Designing a next-generation backend architecture that will support our growth for the years to come.',
          },
        ],
      },
      {
        kind: 'p',
        text:
          'Our tech stack is built on NodeJS and Typescript along with a wide variety of GCP products including Firebase, Firestore, Bigtable, Bigquery, Redis, Cloud Run, Vertex AI.',
      },
      {
        kind: 'p',
        text:
          "We care more about what you've done than your resume, so tell us the thing you've built that you're most proud of.",
      },
      {
        kind: 'ul',
        items: [
          {
            lead: '3+ Years of Relevant Experience',
            sub:
              'We are looking for a range of skill levels as we value execution, creativity and passion.',
          },
          { lead: 'Strong background in Computer Science.' },
          { lead: 'Remote friendly for anyone within +/- 3 hours of PST' },
        ],
      },
    ],
  },
  {
    slug: 'monetization-lead',
    title: 'Monetization Lead',
    location: 'Operations',
    applyUrl: `${APPLY_EMAIL}?subject=Monetization%20Lead`,
    body: [
      {
        kind: 'p',
        text:
          'Last year, we introduced Locket Gold, a subscription offering to allow power users to get the most out of Locket, as well as in-feed advertising. Over the last 18 months, Locket Gold has grown to millions in ARR, and in-feed ads now generate nearly 1B impressions per month.',
      },
      {
        kind: 'p',
        text:
          "Now, we're looking for a leader to own monetization within Locket and continue to grow both business lines. As our first hire focused on monetization, you'll play a big role in shaping our subscription and ads businesses. It's the rare opportunity to take ownership over a multi-million dollar consumer business used by 10s of millions of people every month.",
      },
      { kind: 'p', text: "As Monetization Lead, you'll be responsible for:" },
      {
        kind: 'ul',
        items: [
          { lead: 'Growing Locket Gold subscription revenue' },
          { lead: 'Optimizing programatic ad performance and managing direct ad sales' },
          { lead: 'Exploring new monetization opportunities' },
        ],
      },
      { kind: 'p', text: "You'll be a great fit if you've already done some combination of…" },
      {
        kind: 'ul',
        items: [
          { lead: 'Managing product development for a consumer product' },
          { lead: 'Owning monetization roadmaps at a large-scale consumer app' },
          { lead: 'Launching mobile subscription products' },
          { lead: 'Conducting ad sales and partnerships' },
        ],
      },
      {
        kind: 'p',
        text:
          "While all backgrounds are welcome, we're looking for someone with **3+ years of relevant** experience building and growing consumer products at-scale. **Remote friendly** for anyone within +/- 3 hours of PST.",
      },
    ],
  },
  {
    slug: 'creator-socials-lead',
    title: 'Creator & Socials Lead',
    location: 'Marketing',
    applyUrl: `${APPLY_EMAIL}?subject=Creator%20%26%20Socials%20Lead`,
    body: [
      {
        kind: 'p',
        text:
          "Locket got its start on TikTok, jumping from 20 users to over 1 million in a single week — all thanks to a viral video. Since then, we've embraced TikTok, capturing over a billion views and growing our socials to 500K on TikTok and 200K on Instagram.",
      },
      {
        kind: 'p',
        text:
          "Now, we're searching for a creative, digitally-savvy content creator to take Locket's socials to the next level. You should thrive online, be digitally connected to culture, and know how to craft moments that resonate and go viral.",
      },
      { kind: 'p', text: '**Why is this role rare?**' },
      {
        kind: 'p',
        text:
          "This position isn't a normal social media manager. Given our scale, it's an opportunity to shape the voice of a brand loved by millions of people. You'll step to the front of Locket, leading content creation, ideating new trends, and building experiences that connect deeply with our Gen Z and Gen Alpha audience. We're talking Stanley Cup, Crumbl Cookies, Labubu level brand love here.",
      },
      {
        kind: 'p',
        text: "As the Content Creator Lead, you'll be responsible for:",
      },
      {
        kind: 'ul',
        items: [
          { lead: 'Growing our TikTok and Instagram accounts' },
          { lead: 'Brainstorming and creating content for socials' },
          { lead: 'Developing new partnerships or viral brand activations' },
          { lead: 'Working closely with product team to launch new features' },
        ],
      },
      { kind: 'p', text: "You'll be a great fit if you have some combination of…" },
      {
        kind: 'ul',
        items: [
          { lead: 'Experience significantly growing social accounts (personal or brand)' },
          { lead: '*(Not required)* A strong personal following yourself' },
          { lead: 'Experience running successful brand activations' },
          { lead: 'Video editing and content production skills' },
        ],
      },
      {
        kind: 'p',
        text:
          "While all backgrounds are welcome, we're looking for someone with **2+ years of relevant** experience. **Remote friendly** for anyone within +/- 3 hours of PST.",
      },
    ],
  },
];
