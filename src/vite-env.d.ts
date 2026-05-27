/// <reference types="vite/client" />
/// <reference types="@types/mdx" />

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  export const frontmatter: Record<string, unknown>;
  const MDXComponent: ComponentType;
  export default MDXComponent;
}
