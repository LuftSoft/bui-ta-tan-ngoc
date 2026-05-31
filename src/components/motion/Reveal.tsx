import { motion, useReducedMotion as useFramerReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { Variants } from 'framer-motion';

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  as?: 'div' | 'span' | 'section' | 'li';
  once?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.7,
  className,
  as = 'div',
  once = true,
}: RevealProps) {
  const reduced = useFramerReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: reduced ? 0 : duration, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
