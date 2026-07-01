import { useTranslation } from "react-i18next";
import { Seo } from "../components/Seo";
import { Section } from "../components/ui/Section";
import { Eyebrow } from "../components/ui/Eyebrow";
import { Tag } from "../components/ui/Tag";
import { Reveal } from "../components/motion/Reveal";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface SkillGroup {
  label: string;
  items: string[];
}

interface ValueItem {
  title: string;
  description: string;
}

export default function AboutPage() {
  const { t } = useTranslation("about");
  const { t: tc } = useTranslation();

  const story = t("story.paragraphs", { returnObjects: true }) as string[];
  const timeline = t("timeline.items", {
    returnObjects: true,
  }) as TimelineItem[];
  const skillGroups = t("skills.groups", { returnObjects: true }) as Record<
    string,
    SkillGroup
  >;
  const values = t("values.items", { returnObjects: true }) as ValueItem[];

  return (
    <>
      <Seo
        title={tc("seo.about.title")}
        description={tc("seo.about.description")}
      />
      <Section spacing="lg">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Reveal>
              <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 font-display text-display-lg text-balance">
                {t("hero.title")}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg text-muted-fg text-pretty">
                {t("hero.subtitle")}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-card">
              <div
                aria-hidden
                className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-accent/30 blur-3xl"
              />
              <img
                src="/assets/avatar.jpg"
                alt="Tan Ngoc"
                className="relative h-full w-full object-cover scale-[1.5]"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section spacing="lg" className="border-t border-border bg-card/30">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Reveal>
              <Eyebrow>{t("story.eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-display text-display-md text-balance">
                {t("story.title")}
              </h2>
            </Reveal>
          </div>
          <div className="space-y-5">
            {story.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-lg leading-relaxed text-fg/90 text-pretty">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section spacing="lg">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{t("timeline.eyebrow")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-display-md text-balance">
              {t("timeline.title")}
            </h2>
          </Reveal>
        </div>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border">
          {timeline.map((item, i) => (
            <Reveal key={i} delay={i * 0.06} as="div" className="bg-card">
              <div className="grid gap-4 p-6 sm:grid-cols-[180px_1fr] sm:p-8">
                <dt className="font-mono text-sm text-accent">{item.year}</dt>
                <dd>
                  <div className="font-display text-xl font-semibold">
                    {item.title}
                  </div>
                  <p className="mt-2 text-muted-fg text-pretty">
                    {item.description}
                  </p>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>

      <Section spacing="lg" className="border-y border-border bg-card/30">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{t("skills.eyebrow")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-display-md text-balance">
              {t("skills.title")}
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(skillGroups).map(([key, group], i) => (
            <Reveal key={key} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-fg">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item} variant="outline">
                      {item}
                    </Tag>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section spacing="lg">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{t("values.eyebrow")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-display-md text-balance">
              {t("values.title")}
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={i} delay={i * 0.08} className="h-full">
              <div className="flex h-full gap-5 rounded-2xl border border-border bg-card p-6">
                <span className="mt-1 font-mono text-sm text-accent">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-muted-fg text-pretty">
                    {v.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
