import { Hero } from '../components/sections/Hero';
import { TrustStrip } from '../components/sections/TrustStrip';
import { Services } from '../components/sections/Services';
import { FeaturedProjects } from '../components/sections/FeaturedProjects';
import { Process } from '../components/sections/Process';
import { Testimonials } from '../components/sections/Testimonials';
import { FinalCTA } from '../components/sections/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <FeaturedProjects />
      <Process />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
