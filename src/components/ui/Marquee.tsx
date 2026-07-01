import { Children } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface MarqueeProps {
  children: ReactNode;
  className?: string;
  pauseOnHover?: boolean;
  reverse?: boolean;
  speed?: 'slow' | 'normal' | 'fast';
}

const speeds = {
  slow: '60s',
  normal: '30s',
  fast: '15s',
} as const;

export function Marquee({
  children,
  className,
  pauseOnHover = true,
  reverse,
  speed = 'normal',
}: MarqueeProps) {
  const items = Children.toArray(children);
  const style = {
    animationDuration: speeds[speed],
    animationDirection: reverse ? 'reverse' : 'normal',
  } as const;

  return (
    <div
      className={cn(
        'group flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        className,
      )}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1 ? true : undefined}
          className={cn(
            'flex shrink-0 items-center gap-12 pr-12 animate-marquee',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
          )}
          style={style}
        >
          {items}
        </div>
      ))}
    </div>
  );
}
