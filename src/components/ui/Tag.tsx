import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'default' | 'accent' | 'outline';

const variants: Record<Variant, string> = {
  default: 'bg-muted text-muted-fg',
  accent: 'bg-accent/15 text-accent-fg dark:text-accent',
  outline: 'border border-border text-muted-fg',
};

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

export function Tag({ className, variant = 'default', ...props }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
