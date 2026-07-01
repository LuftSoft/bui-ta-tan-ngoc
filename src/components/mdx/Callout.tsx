import type { ReactNode } from 'react';
import { Info, AlertTriangle, Lightbulb } from 'lucide-react';
import { cn } from '../../lib/cn';

type Variant = 'info' | 'warning' | 'tip';

const styles: Record<Variant, { wrap: string; Icon: typeof Info }> = {
  info: { wrap: 'border-accent/30 bg-accent/5', Icon: Info },
  warning: { wrap: 'border-orange-500/30 bg-orange-500/5', Icon: AlertTriangle },
  tip: { wrap: 'border-emerald-500/30 bg-emerald-500/5', Icon: Lightbulb },
};

export function Callout({
  variant = 'info',
  children,
}: {
  variant?: Variant;
  children?: ReactNode;
}) {
  const { wrap, Icon } = styles[variant];
  return (
    <aside
      className={cn(
        'my-8 flex gap-4 rounded-xl border px-5 py-4 text-base',
        wrap,
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
      <div className="[&>p:first-child]:mt-0 [&>p:last-child]:mb-0">{children}</div>
    </aside>
  );
}
