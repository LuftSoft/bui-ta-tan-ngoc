import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { Container } from '../layout/Container';

type Spacing = 'sm' | 'md' | 'lg' | 'xl';

const spacings: Record<Spacing, string> = {
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-24',
  lg: 'py-20 sm:py-32',
  xl: 'py-24 sm:py-40',
};

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: Spacing;
  bare?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = 'md', bare, children, ...props }, ref) => (
    <section ref={ref} className={cn(spacings[spacing], className)} {...props}>
      {bare ? children : <Container>{children}</Container>}
    </section>
  ),
);
Section.displayName = 'Section';
