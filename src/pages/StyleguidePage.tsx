import { ArrowRight, Github, Mail, Sparkles } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Button } from '../components/ui/Button';
import { Card, CardTitle, CardDescription } from '../components/ui/Card';
import { Tag } from '../components/ui/Tag';
import { Marquee } from '../components/ui/Marquee';
import { Reveal } from '../components/motion/Reveal';
import { TextSplit } from '../components/motion/TextSplit';
import { MagneticButton } from '../components/motion/MagneticButton';

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      <div className="rounded-2xl border border-border bg-card p-6">{children}</div>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <>
      <Section spacing="md">
        <Eyebrow>Phase 1 · Design system</Eyebrow>
        <h1 className="mt-6 font-display text-display-lg text-balance">
          <TextSplit text="Building blocks for the rest of the site." />
        </h1>
        <p className="mt-6 max-w-2xl text-muted-fg text-pretty">
          A live reference for primitives, tokens and motion. Delete this route before production
          or gate it behind a dev flag.
        </p>
      </Section>

      <Section spacing="md" className="space-y-12">
        <Group title="Buttons">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">
              Large <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="md">
              <Github className="h-4 w-4" /> GitHub
            </Button>
          </div>
        </Group>

        <Group title="Magnetic button">
          <MagneticButton>
            <Button size="lg">
              <Sparkles className="h-4 w-4" /> Hover me
            </Button>
          </MagneticButton>
        </Group>

        <Group title="Tags">
          <div className="flex flex-wrap gap-2">
            <Tag>default</Tag>
            <Tag variant="accent">accent</Tag>
            <Tag variant="outline">outline</Tag>
            <Tag variant="accent">react</Tag>
            <Tag variant="accent">typescript</Tag>
            <Tag variant="outline">supabase</Tag>
          </div>
        </Group>

        <Group title="Cards">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: 'Web app', desc: 'End-to-end product development with modern stacks.' },
              { title: 'Mobile', desc: 'Cross-platform apps with React Native.' },
              { title: 'Consulting', desc: 'Code review, architecture, performance audits.' },
            ].map((s) => (
              <Card key={s.title}>
                <CardTitle>{s.title}</CardTitle>
                <CardDescription>{s.desc}</CardDescription>
              </Card>
            ))}
          </div>
        </Group>

        <Group title="Marquee">
          <Marquee>
            {['React', 'TypeScript', 'Node', 'Postgres', 'Tailwind', 'Vite', 'Supabase', 'Next.js'].map(
              (t) => (
                <span key={t} className="font-display text-2xl text-muted-fg">
                  {t}
                </span>
              ),
            )}
          </Marquee>
        </Group>

        <Group title="Reveal on scroll">
          <div className="space-y-4">
            {[0, 1, 2, 3].map((i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="rounded-xl bg-muted p-6">
                  Item {i + 1} — scrolls into view with stagger.
                </div>
              </Reveal>
            ))}
          </div>
        </Group>

        <Group title="Color tokens">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ['bg', 'bg-bg'],
              ['fg', 'bg-fg'],
              ['muted', 'bg-muted'],
              ['card', 'bg-card'],
              ['border', 'bg-border'],
              ['accent', 'bg-accent'],
            ].map(([name, cls]) => (
              <div key={name} className="space-y-2">
                <div className={`${cls} h-16 w-full rounded-lg border border-border`} />
                <p className="text-xs text-muted-fg">{name}</p>
              </div>
            ))}
          </div>
        </Group>

        <Group title="Typography">
          <div className="space-y-3">
            <p className="font-display text-display-xl">Display XL</p>
            <p className="font-display text-display-lg">Display LG</p>
            <p className="font-display text-display-md">Display MD</p>
            <p className="text-xl">Body XL</p>
            <p className="text-base text-muted-fg">Body base muted</p>
            <p className="font-mono text-sm">font-mono · JetBrains Mono</p>
          </div>
        </Group>

        <Group title="Icon link">
          <a
            href="mailto:tanngoc.dev@gmail.com"
            className="inline-flex items-center gap-2 text-sm text-muted-fg transition-colors hover:text-fg"
          >
            <Mail className="h-4 w-4" /> tanngoc.dev@gmail.com
          </a>
        </Group>
      </Section>
    </>
  );
}
