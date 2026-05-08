import { Nav } from '../components/layout/Nav';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { HappierIntro } from '../components/sections/HappierIntro';
import { AboutStats } from '../components/sections/AboutStats';
import { OurTeam } from '../components/sections/OurTeam';
import { WhatItsLike } from '../components/sections/WhatItsLike';
import { Challenges } from '../components/sections/Challenges';
import { Funding } from '../components/sections/Funding';
import { Backstory } from '../components/sections/Backstory';
import { Perks } from '../components/sections/Perks';
import { UserTestimonials } from '../components/sections/UserTestimonials';
import { Press } from '../components/sections/Press';
import { OpenRoles } from '../components/sections/OpenRoles';
import { WhatsNext } from '../components/sections/WhatsNext';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HappierIntro />
        <AboutStats />
        <OurTeam />
        <OpenRoles />
        <WhatItsLike />
        <Challenges />
        <Funding />
        <Backstory />
        <Perks />
        <UserTestimonials />
        <Press />
        <WhatsNext />
      </main>
      <Footer />
    </>
  );
}
