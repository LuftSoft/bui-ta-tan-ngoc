import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export function Eyebrow({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-wider text-muted-fg',
        className,
      )}
      {...props}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
      <span>{children}</span>
    </div>
  );
}
