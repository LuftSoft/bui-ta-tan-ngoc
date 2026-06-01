import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, Clock, Mail, MapPin, Send } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Button } from '../components/ui/Button';
import { Input, Textarea, Select, Label, FieldError } from '../components/ui/Field';
import { Reveal } from '../components/motion/Reveal';
import { supabase } from '../lib/supabase';

const PROJECT_TYPES = ['web', 'mobile', 'mvp', 'consulting', 'other'] as const;
const BUDGETS = ['under_5k', '5_10k', '10_25k', '25k_plus', 'not_sure'] as const;
const TIMELINES = ['asap', '1_3m', '3_6m', 'exploring'] as const;

const EMAIL = 'tanngoc.dev@gmail.com';

type FormValues = z.infer<ReturnType<typeof buildSchema>>;

function buildSchema(t: (k: string) => string) {
  return z.object({
    name: z.string().trim().min(1, t('form.errors.name')).max(120),
    email: z.string().trim().email(t('form.errors.email')).max(254),
    project_type: z.enum(PROJECT_TYPES, { errorMap: () => ({ message: t('form.errors.projectType') }) }),
    budget_range: z.enum(BUDGETS).optional().or(z.literal('')),
    timeline: z.enum(TIMELINES).optional().or(z.literal('')),
    message: z.string().trim().min(10, t('form.errors.message')).max(5000),
  });
}

export default function ContactPage() {
  const { t } = useTranslation('contact');
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const schema = buildSchema(t);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', project_type: 'web', budget_range: '', timeline: '', message: '' },
  });

  async function onSubmit(values: FormValues) {
    setSubmitError(null);
    const subject =
      values.project_type === 'other'
        ? null
        : t(`form.projectTypeOptions.${values.project_type}`);

    const { error } = await supabase.from('contacts').insert({
      name: values.name,
      email: values.email,
      subject,
      message: values.message,
      project_type: values.project_type,
      budget_range: values.budget_range || null,
      timeline: values.timeline || null,
    });

    if (error) {
      console.error(error);
      setSubmitError(t('form.errors.generic'));
      return;
    }
    reset();
    setSubmitted(true);
  }

  return (
    <Section spacing="lg">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-display-md text-balance">{t('hero.title')}</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-muted-fg text-pretty">{t('hero.subtitle')}</p>
          </Reveal>

          <Reveal delay={0.3}>
            <ul className="space-y-3 border-t border-border pt-6 text-sm">
              <SidebarItem Icon={Mail} label={t('sidebar.email')}>
                <a className="hover:text-accent" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </SidebarItem>
              <SidebarItem Icon={Clock} label={t('sidebar.responseTime')} />
              <SidebarItem Icon={MapPin} label={t('sidebar.location')} />
            </ul>
          </Reveal>
        </aside>

        <Reveal delay={0.15}>
          {submitted ? (
            <SuccessState onReset={() => setSubmitted(false)} />
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="rounded-3xl border border-border bg-card p-6 sm:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <FormRow>
                  <Label htmlFor="name">{t('form.name')}</Label>
                  <Input
                    id="name"
                    placeholder={t('form.namePlaceholder')}
                    aria-invalid={!!errors.name}
                    {...register('name')}
                  />
                  <FieldError>{errors.name?.message}</FieldError>
                </FormRow>
                <FormRow>
                  <Label htmlFor="email">{t('form.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('form.emailPlaceholder')}
                    aria-invalid={!!errors.email}
                    {...register('email')}
                  />
                  <FieldError>{errors.email?.message}</FieldError>
                </FormRow>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                <FormRow>
                  <Label htmlFor="project_type">{t('form.projectType')}</Label>
                  <Select id="project_type" {...register('project_type')}>
                    {PROJECT_TYPES.map((v) => (
                      <option key={v} value={v}>
                        {t(`form.projectTypeOptions.${v}`)}
                      </option>
                    ))}
                  </Select>
                  <FieldError>{errors.project_type?.message}</FieldError>
                </FormRow>
                <FormRow>
                  <Label htmlFor="budget_range">{t('form.budget')}</Label>
                  <Select id="budget_range" {...register('budget_range')}>
                    <option value="">—</option>
                    {BUDGETS.map((v) => (
                      <option key={v} value={v}>
                        {t(`form.budgetOptions.${v}`)}
                      </option>
                    ))}
                  </Select>
                </FormRow>
                <FormRow>
                  <Label htmlFor="timeline">{t('form.timeline')}</Label>
                  <Select id="timeline" {...register('timeline')}>
                    <option value="">—</option>
                    {TIMELINES.map((v) => (
                      <option key={v} value={v}>
                        {t(`form.timelineOptions.${v}`)}
                      </option>
                    ))}
                  </Select>
                </FormRow>
              </div>

              <FormRow className="mt-5">
                <Label htmlFor="message">{t('form.message')}</Label>
                <Textarea
                  id="message"
                  placeholder={t('form.messagePlaceholder')}
                  rows={6}
                  aria-invalid={!!errors.message}
                  {...register('message')}
                />
                <FieldError>{errors.message?.message}</FieldError>
              </FormRow>

              {submitError && (
                <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-500">
                  {submitError}
                </p>
              )}

              <div className="mt-8 flex items-center justify-end">
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  <Send className="h-4 w-4" />
                  {isSubmitting ? t('form.submitting') : t('form.submit')}
                </Button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  );
}

function FormRow({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}

function SidebarItem({
  Icon,
  label,
  children,
}: {
  Icon: typeof Mail;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
      <div>
        <div className="text-muted-fg">{label}</div>
        {children && <div className="font-medium">{children}</div>}
      </div>
    </li>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  const { t } = useTranslation('contact');
  return (
    <div className="flex h-full flex-col items-start justify-center gap-6 rounded-3xl border border-border bg-card p-10 text-balance">
      <CheckCircle2 className="h-10 w-10 text-accent" />
      <h2 className="font-display text-display-md">{t('success.title')}</h2>
      <p className="text-muted-fg text-pretty">{t('success.body')}</p>
      <Button variant="outline" onClick={onReset}>
        {t('success.sendAnother')}
      </Button>
    </div>
  );
}
