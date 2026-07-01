import type { ReactNode, AnchorHTMLAttributes, HTMLAttributes, ImgHTMLAttributes } from 'react';
import { MDXProvider as BaseMDXProvider } from '@mdx-js/react';
import { Callout } from './Callout';
import { cn } from '../../lib/cn';

const components = {
  h2: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'mt-14 scroll-mt-24 font-display text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn('mt-10 scroll-mt-24 font-display text-2xl font-semibold', className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn('my-5 text-lg leading-relaxed text-fg/90 text-pretty', className)} {...props} />
  ),
  ul: ({ className, ...props }: HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn('my-6 list-disc space-y-2 pl-6 text-lg text-fg/90 marker:text-accent', className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        'my-6 list-decimal space-y-2 pl-6 text-lg text-fg/90 marker:text-accent marker:font-mono',
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: HTMLAttributes<HTMLLIElement>) => (
    <li className={cn('text-pretty', className)} {...props} />
  ),
  a: ({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        'underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent',
        className,
      )}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        'my-8 border-l-2 border-accent pl-6 italic text-muted-fg [&>p]:text-fg/80',
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        'rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-accent',
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        'my-6 overflow-x-auto rounded-xl border border-border bg-muted p-4 font-mono text-sm leading-relaxed',
        className,
      )}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      alt={alt ?? ''}
      loading="lazy"
      className={cn('my-8 w-full rounded-xl border border-border', className)}
      {...props}
    />
  ),
  hr: ({ className, ...props }: HTMLAttributes<HTMLHRElement>) => (
    <hr className={cn('my-10 border-border', className)} {...props} />
  ),
  strong: ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
    <strong className={cn('font-semibold text-fg', className)} {...props} />
  ),
  Callout,
};

export function MDXProvider({ children }: { children: ReactNode }) {
  return <BaseMDXProvider components={components}>{children}</BaseMDXProvider>;
}
