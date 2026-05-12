export type RoleBlock =
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: { lead: string; sub?: string }[] };

export type Role = {
  slug: string;
  title: string;
  location?: string;
  applyUrl: string;
  body?: RoleBlock[];
};

const APPLY_EMAIL = 'mailto:jobs@locketcamera.com';

export const roles: Role[] = [
  {
    slug: 'backend-engineer',
    title: 'Senior Backend Engineer',
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
    slug: 'growth-pm-ai-experimentation',
    title: 'Growth PM – AI & Experimentation',
    location: 'Growth',
    applyUrl: `${APPLY_EMAIL}?subject=Growth%20PM%20%E2%80%93%20AI%20%26%20Experimentation`,
    body: [
      {
        kind: 'p',
        text:
          'Locket has grown to 10M+ DAU with a team of 11. We obsessed over onboarding and friending. We built a UGC virality program that pioneered what creator content looks like on social today. We’ve shipped web apps that have gone viral overnight. Our biggest growth moments have come from creative, scrappy, and strategic experiments shipped in weeks, not quarters.',
      },
      {
        kind: 'p',
        text:
          'We’re looking for a Growth PM who can build the next wave of growth for Locket. You’ll look across the full loop from acquisition to activation to retention, while getting hands-on with AI tools and creative experiments. You’ll bring the same mindset behind our early growth wins: creative, analytical, and always looking for what actually moves the needle.',
      },
      {
        kind: 'p',
        text:
          "Here's what makes this role special: you'll have distribution from Day 1. Anything you build can be tested and shared immediately with millions of Locket users. If you've ever wanted to ship something and actually see it reach people at scale, this is your chance.",
      },
      { kind: 'p', text: "As Growth PM, you'll be responsible for:" },
      {
        kind: 'ul',
        items: [
          { lead: 'Ideating and building activations designed to grow Locket — in-app, web-based, or IRL' },
          { lead: 'Experimenting with AI tools (image generation, video editing, newest coding tools, etc.) to create novel user experiences' },
          { lead: 'Analyzing user funnels, retention curves, and engagement data to find opportunities' },
          { lead: 'Rapid prototyping — concept to live in days, not months' },
          { lead: 'Working with engineering to ship growth features (referrals, onboarding, notifications, etc.)' },
          { lead: "Keeping a pulse on emerging AI capabilities and figuring out what's actually useful vs. hype" },
        ],
      },
      { kind: 'p', text: "You'll be a great fit if you have some combination of…" },
      {
        kind: 'ul',
        items: [
          { lead: 'Have built products yourself (apps, websites, experiences, whatever!)' },
          { lead: 'Comfort with rapid prototyping — you can vibe-code a working demo in a weekend' },
          { lead: "Strong analytical skills — you're comfortable with numbers and dashboards" },
          { lead: "A genuine fascination with AI tools and what's newly possible" },
          { lead: 'A bias for shipping fast and iterating vs. planning for months' },
          { lead: 'An intuition for what makes products sticky with Gen Z/Gen Alpha' },
          { lead: 'Previous work that went viral or reached large audiences is a huge plus' },
        ],
      },
      {
        kind: 'p',
        text:
          'This role is less about years of experience and more about what you can dream and build, so tell us some growth ideas you have (for Locket or other products)! **Remote friendly** for anyone within +/- 3 hours of PST.',
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
  {
    slug: 'paid-acquisition-manager',
    title: 'Paid Acquisition Manager',
    location: 'Marketing',
    applyUrl: `${APPLY_EMAIL}?subject=Paid%20Acquisition%20Manager`,
    body: [
      {
        kind: 'p',
        text:
          "Locket has grown to 10M DAU almost entirely through organic and viral growth. Now, we're ready to explore how to strategically use paid growth to further scale Locket, drive awareness, and build a stronger overall brand.",
      },
      {
        kind: 'p',
        text:
          "We're looking for a senior paid acquisition manager to build Locket's paid growth engine with a primary focus on TikTok, Meta, and YouTube. This is a rare opportunity to define the paid strategy for one of the fastest-growing consumer social apps, with a massive organic base to build on top of.",
      },
      { kind: 'p', text: "As Paid Acquisition Manager, you'll be responsible for:" },
      {
        kind: 'ul',
        items: [
          { lead: 'Building and managing paid campaigns across TikTok, Meta, YouTube, and emerging platforms' },
          { lead: 'Developing creative testing frameworks to find winning ad formats for Gen Z/Gen Alpha audiences' },
          { lead: 'Managing and scaling budget while keeping CAC efficient' },
          { lead: 'Working closely with our content and growth teams to turn organic hits into paid winners' },
          { lead: 'Building dashboards and reporting to track performance and ROI' },
        ],
      },
      { kind: 'p', text: "You'll be a great fit if you have some combination of…" },
      {
        kind: 'ul',
        items: [
          { lead: 'Experience managing six-figure+ monthly paid budgets on TikTok and/or Meta' },
          { lead: "A creative eye — you understand what makes an ad feel native, not like an ad" },
          { lead: 'Strong analytical skills and comfort with attribution, LTV modeling, and ROAS optimization' },
          { lead: 'Experience in consumer social, gaming, or another high-growth mobile app' },
        ],
      },
      {
        kind: 'p',
        text:
          "We're looking for someone with **4+ years of relevant** experience in paid acquisition. **Remote friendly** for anyone within +/- 3 hours of PST.",
      },
    ],
  },
  {
    slug: 'strategic-partnerships-lead',
    title: 'Strategic Partnerships Lead',
    location: 'Marketing',
    applyUrl: `${APPLY_EMAIL}?subject=Strategic%20Partnerships%20Lead`,
    body: [
      {
        kind: 'p',
        text:
          "Gen Z and Gen Alpha are the future, and brands want to reach them authentically. At Locket, we already have the distribution: 10M+ people, 75% female, primarily Gen Z/Gen Alpha, all opening Locket every day.",
      },
      {
        kind: 'p',
        text:
          "That's a massive opportunity for the right partners. We've already launched partnerships with Zara Larsson, Suki Waterhouse, PresLee Faith, Warner Bros, and more, and we're exploring strategic fits ranging from beauty brands to music labels to clothing and everything in between.",
      },
      {
        kind: 'p',
        text:
          "Now, we're looking for someone to turn Locket's distribution into a partnerships engine. As our first hire dedicated to partnerships, you'll play a role in defining how artists, brands, creators, and studios connect with Gen Z and Gen Alpha through Locket, and how that will either generate more brand love, new users, or revenue for Locket",
      },
      { kind: 'p', text: "As Partnerships & Growth Lead, you'll be responsible for:" },
      {
        kind: 'ul',
        items: [
          { lead: 'Building and managing a pipeline of artist, brand, and studio partnerships' },
          { lead: "Developing Locket's pricing and partnership model from the ground up" },
          { lead: 'Owning outreach, negotiation, and relationship management end-to-end' },
          { lead: 'Thinking strategically about how partnerships drive user growth' },
          { lead: 'Exploring new revenue opportunities through brand activations, filters, and celebrity integrations' },
        ],
      },
      { kind: 'p', text: "You'll be a great fit if you have some combination of…" },
      {
        kind: 'ul',
        items: [
          { lead: 'Experience in business development, partnerships, or strategy at a consumer tech or media company' },
          { lead: 'Strong relationship-building instincts — you can cold email a label exec and close a brand deal in the same week' },
          { lead: "Comfort building playbooks from scratch (there's no template here — you're writing it)" },
          { lead: 'A genuine interest in Gen Z/Gen Alpha culture, music, fashion, and social media' },
        ],
      },
      {
        kind: 'p',
        text:
          "While all backgrounds are welcome, we're looking for someone with **3+ years of relevant** experience. **Remote friendly** for anyone within +/- 3 hours of PST.",
      },
    ],
  },
  {
    slug: 'dream-job',
    title: 'Dream Job',
    applyUrl: `${APPLY_EMAIL}?subject=Dream%20Job`,
    body: [
      {
        kind: 'p',
        text:
          "We have blindspots! If you think you belong on the Locket team but don't see a role above that fits, we’d love to hear from you.",
      },
      {
        kind: 'p',
        text:
          "Tell us what you want to work on, why Locket needs it, and why you're the person to do it. We're a team of 11 building for 10M+ users — there's no shortage of interesting problems to solve.",
      },
      {
        kind: 'p',
        text:
          "Maybe it's community building. Maybe it's data science. Maybe it's something we haven't even considered yet. If you can make a compelling case, we're all ears. Tell us what role you'd create for yourself and why we need to hire you",
      },
    ],
  },
];
