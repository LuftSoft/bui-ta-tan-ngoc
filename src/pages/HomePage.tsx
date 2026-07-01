import { useTranslation } from 'react-i18next';
import { Seo } from '../components/Seo';
import { Hero } from '../components/sections/Hero';
import { TrustStrip } from '../components/sections/TrustStrip';
import { Services } from '../components/sections/Services';
import { FeaturedProjects } from '../components/sections/FeaturedProjects';
import { Process } from '../components/sections/Process';
import { Testimonials } from '../components/sections/Testimonials';
import { FinalCTA } from '../components/sections/FinalCTA';

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <>
      <Seo title={t('seo.home.title')} description={t('seo.home.description')} />
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
