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
    slug: 'brand-partnership-manager',
    title: 'Brand Partnership Manager',
    location: 'Vietnam',
    applyUrl: 'mailto:khanh@locketcamera.com?subject=Brand%20Partnership%20Manager',
    body: [
      {
        kind: 'p',
        text:
          'In Vietnam, Locket has become something special: millions of daily users share daily snapshots with close friends, build streaks, and turn their home screens into living photo diaries of their friendships.',
      },
      {
        kind: 'p',
        text:
          'We’re a small, fast-moving team based in the US and VN that builds for users first. If you’re excited about shaping how the next generation of young people in SEA and global stay connected, this is your chance to get in early.',
      },
      { kind: 'p', text: '*About the Role*' },
      {
        kind: 'p',
        text:
          'Locket is ready to build its first brand partnerships function. We’re looking for a Brand Partnership Manager who can open two tracks simultaneously: monetizing Locket through brand-sponsored ad placements and widget integrations, and partnering with major brands on co-marketing campaigns that build Locket’s awareness and credibility among young consumers.',
      },
      {
        kind: 'p',
        text:
          'This is a zero-to-one role and you’ll get to build all of it — from identifying the right brand categories, to pitching, to closing deals, to managing live campaigns and reporting ROI. You’ll start with Vietnam and expand across SEA as we scale.',
      },
      { kind: 'p', text: "Here's what you'll do." },
      { kind: 'p', text: '*Ad Sales & Monetization*' },
      {
        kind: 'ul',
        items: [
          { lead: 'Build Locket’s brand advertising proposition from scratch: define ad formats (widget takeovers, sponsored lenses, branded stickers, interstitial placements), pricing models (CPM, CPC, flat fee), and inventory management.' },
          { lead: 'Create and iterate on the sales deck, rate card, and case studies that position Locket’s unique value to advertisers: intimate context, high engagement, Gen Z reach, home screen real estate.' },
          { lead: 'Prospect, pitch, and close brand advertising deals with FMCG, fashion, beauty, F&B, entertainment, and tech brands active in Vietnam — both directly and through media agencies (Dentsu, GroupM, Publicis, etc.).' },
          { lead: 'Manage the full ad sales cycle: outreach → pitch → proposal → negotiation → IO/contract → campaign setup → mid-flight optimization → post-campaign reporting.' },
          { lead: 'Track and report ad revenue, fill rates, campaign performance (impressions, CTR, engagement lift), and brand safety metrics.' },
        ],
      },
      { kind: 'p', text: '*Brand Collaborations & Co-Marketing*' },
      {
        kind: 'ul',
        items: [
          { lead: 'Identify and structure co-marketing partnerships with brands whose audience and values overlap with Locket’s: think youth-facing brands in lifestyle, fashion, music, education, and entertainment.' },
          { lead: 'Design partnership frameworks that go beyond standard sponsorship: co-branded widget themes, brand-exclusive group features, campus partnership bundles, event integrations (concerts, festivals, university events).' },
          { lead: 'Coordinate with the Community Manager and Creator Partnerships Manager to amplify brand campaigns through organic channels and creator content.' },
          { lead: 'Negotiate partnership terms: deliverables, co-investment, exclusivity, measurement frameworks, and usage rights.' },
          { lead: 'Build a pipeline of inbound and outbound brand partnership opportunities and maintain a CRM of brand contacts, agency relationships, and deal status.' },
        ],
      },
      { kind: 'p', text: '*Strategic & Cross-Functional*' },
      {
        kind: 'ul',
        items: [
          { lead: 'Work closely with the product team to define ad placement specs that respect the user experience — Locket’s intimacy-first positioning means not every ad format is appropriate.' },
          { lead: 'Develop brand partnership playbooks that can be localized for expansion into the Philippines, Indonesia, and Thailand.' },
          { lead: 'Report weekly to the SEA Advisor on pipeline health, revenue forecast, active campaigns, and learnings.' },
        ],
      },
      { kind: 'p', text: '*Who You Are*' },
      {
        kind: 'ul',
        items: [
          { lead: 'Startup mentality; no one-JD-fits-all mindset; willing to build the sales function from zero and roll up your sleeves on everything from deck design to cold outreach.' },
          { lead: '2–4 years of experience in brand partnerships, ad sales, media sales, or business development — ideally at a consumer tech company, digital media platform, advertising agency, or publisher in Vietnam.' },
          { lead: 'Understanding of the Vietnamese advertising ecosystem: who the major media buyers are, how brand budgets flow (direct vs. agency), and what brands are actively spending on youth-facing digital platforms.' },
          { lead: 'Strong pitch and presentation skills — you can build a compelling deck and present it to a room of brand managers without a script.' },
          { lead: 'Commercial discipline: comfortable negotiating deal terms, managing contracts, and holding brands to committed budgets and timelines.' },
          { lead: 'Written and verbal fluency in Vietnamese; professional English for internal reporting, sales materials, and communication with the US-based leadership team.' },
          { lead: 'Data-literate: can pull campaign performance data and translate it into ROI narratives that justify renewal and upsell.' },
          { lead: 'Genuine understanding of Locket’s brand position — wholesome, intimate, creative. You know why slapping a banner ad on someone’s home screen widget would destroy the product, and you can design ad formats that don’t.' },
        ],
      },
      { kind: 'p', text: '*Nice to Have*' },
      {
        kind: 'ul',
        items: [
          { lead: 'Existing relationships with brand marketing teams or media agencies in Vietnam (Unilever, Samsung, Shopee, Coca-Cola VN, L’Oréal, etc.).' },
          { lead: 'Experience selling advertising on social or mobile platforms (TikTok, Zalo, Viber, Gameloft, or similar).' },
          { lead: 'Familiarity with ad tech: programmatic buying, ad servers, campaign trafficking, attribution.' },
          { lead: 'Experience with co-marketing or brand collaboration deals (not just standard media buys).' },
          { lead: 'Familiarity with one or more SEA markets for eventual expansion.' },
          { lead: 'Prior work at a startup where you had to build the sales motion from scratch, not just inherit an existing book of business.' },
        ],
      },
      { kind: 'p', text: '*Compensation & Structure*' },
      {
        kind: 'ul',
        items: [
          { lead: 'Compensation: Please reach out to Khanh Ngo (khanh@locketcamera.com) if you’re interested.' },
          { lead: 'Engagement: Contractor (independent, monthly invoice)' },
          { lead: 'Commitment: Full-time equivalent (~40 hrs/week)' },
          { lead: 'Location: Ho Chi Minh City preferred. Hybrid working format is open for consideration. Must be able to attend brand meetings, agency pitches, and events in person.' },
        ],
      },
      {
        kind: 'p',
        text:
          'Compensation reflects the revenue-generating expectations of this role and will scale with ad revenue milestones and SEA expansion scope. Performance bonuses tied to closed deals may be layered on top of base compensation.',
      },
    ],
  },
  {
    slug: 'video-editor-short-form-social',
    title: 'Video Editor — Short-Form Social',
    location: 'Marketing',
    applyUrl: `${APPLY_EMAIL}?subject=Video%20Editor%20%E2%80%94%20Short-Form%20Social`,
    body: [
      {
        kind: 'p',
        text:
          'Hiring a part-time editor to cut 30s–60s vertical videos from iPhone footage and VO scripts. Think narrative-driven, fast cuts, fun animation, captions, and sound effects that hold attention [like this](https://www.tiktok.com/@locketcamera/video/7150371533867830571). This is the content that builds Locket\'s brand on social — funny, relatable, and made for teenage girls to send to their best friend.',
      },
      { kind: 'p', text: '**Example Videos**' },
      {
        kind: 'ul',
        items: [
          { lead: '[Story of Locket (2022)](https://www.tiktok.com/@locketcamera/video/7150371533867830571)' },
          { lead: '[Story of Locket (2026)](https://www.tiktok.com/@locketcamera/video/7632731579852344606)' },
        ],
      },
      { kind: 'p', text: "**You'll be responsible for**" },
      {
        kind: 'ul',
        items: [
          { lead: 'Editing 30s–60s vertical videos with motion graphics, text animation, SFX, and music' },
          { lead: 'Helping edit/write voiceover scripts' },
          { lead: 'Turning drafts around fast and iterating on notes' },
          { lead: 'Staying on top of trending edit styles, sounds, and formats' },
        ],
      },
      { kind: 'p', text: "**You're a fit if you...**" },
      {
        kind: 'ul',
        items: [
          { lead: "Have a short-form reel you're proud of (TikTok / Reels / Shorts)" },
          { lead: 'Love video editing and storytelling' },
          { lead: 'Understand what performs on TikTok right now, not six months ago' },
        ],
      },
      {
        kind: 'p',
        text:
          'Part-time, remote, freelance. To apply: send your reel + 1–2 short-form examples to [jobs@locketcamera.com](mailto:jobs@locketcamera.com)',
      },
    ],
  },
  {
    slug: 'video-editor-product-launches',
    title: 'Video Editor — Product & Feature Launches',
    location: 'Marketing',
    applyUrl: `${APPLY_EMAIL}?subject=Video%20Editor%20%E2%80%94%20Product%20%26%20Feature%20Launches`,
    body: [
      {
        kind: 'p',
        text:
          "We’re building more than ever, so we’re hiring a part-time editor to create polished product videos for Locket's feature launches, partnership announcements, and app updates. These are the videos that show off what's new — think clean product demos, launch teasers, and hype videos that make people want to download the app or try a new feature.",
      },
      {
        kind: 'p',
        text:
          'We’ve done videos like the below, but ideally you’ll take these feature demos to the next level.',
      },
      {
        kind: 'ul',
        items: [
          { lead: '[Locket Christmas Filters](https://x.com/GregSarafian/status/2004279845510070604?s=20)' },
          { lead: '[Celebrity Locket Launch](https://x.com/ksanok10/status/2003498412541710457?s=20)' },
          { lead: '[Locket Rewind](https://x.com/GregSarafian/status/2004970550649913569?s=20)' },
        ],
      },
      { kind: 'p', text: "You'll be responsible for:" },
      {
        kind: 'ul',
        items: [
          { lead: 'Creating product launch videos and feature announcement content' },
          { lead: 'Editing screen recordings and app demos into clean, engaging walkthroughs' },
          { lead: 'Building hype videos and teasers for new partnerships (artists, brands, celebrity filters)' },
          { lead: 'Adapting product content across formats (TikTok, IG, App Store, etc.)' },
        ],
      },
      { kind: 'p', text: "You're a fit if you:" },
      {
        kind: 'ul',
        items: [
          { lead: "Have experience editing product or tech content that doesn't feel boring" },
          { lead: 'Can make an app demo feel exciting in under 30 seconds' },
          { lead: 'Know After Effects and/or Motion — comfortable with screen capture compositing' },
          { lead: 'Have a portfolio that shows range between polished and scrappy' },
        ],
      },
      {
        kind: 'p',
        text:
          'Part-time, remote, freelance. To apply: send your portfolio + 1–2 product video examples to [jobs@locketcamera.com](mailto:jobs@locketcamera.com)',
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
