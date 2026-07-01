import { useTranslation } from 'react-i18next';
import { Section } from '../ui/Section';
import { Marquee } from '../ui/Marquee';

const LOGOS = [
  { name: 'React', src: '/assets/tech_stack_icon/fe/react.svg' },
  { name: 'TypeScript', src: '/assets/tech_stack_icon/fe/typescript.svg' },
  { name: 'Next.js', src: '/assets/tech_stack_icon/fe/nextjs.svg' },
  { name: 'Express', src: '/assets/tech_stack_icon/be/expressjs.svg' },
  { name: 'Spring Boot', src: '/assets/tech_stack_icon/be/springboot.svg' },
  { name: 'Prisma', src: '/assets/tech_stack_icon/be/prisma.svg' },
  { name: 'MongoDB', src: '/assets/tech_stack_icon/db/mongodb.svg' },
  { name: 'Postgres', src: '/assets/tech_stack_icon/db/mysql.svg' },
  { name: 'Redis', src: '/assets/tech_stack_icon/db/redis.svg' },
  { name: 'Docker', src: '/assets/tech_stack_icon/cicd/docker.svg' },
  { name: 'GitHub Actions', src: '/assets/tech_stack_icon/cicd/github_actions.svg' },
];

export function TrustStrip() {
  const { t } = useTranslation('home');
  return (
    <Section spacing="sm" bare className="border-y border-border bg-card/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="mb-6 text-center text-xs uppercase tracking-widest text-muted-fg">
          {t('trust.label')}
        </p>
        <Marquee speed="slow">
          {LOGOS.map((logo) => (
            <div
              key={logo.name}
              className="flex h-10 items-center gap-3 opacity-60 transition-opacity hover:opacity-100"
              title={logo.name}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-8 w-8 object-contain dark:[filter:invert(1)_brightness(1.2)]"
                loading="lazy"
                width={32}
                height={32}
              />
              <span className="font-display text-lg text-muted-fg">{logo.name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
