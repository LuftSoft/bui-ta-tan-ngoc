import { motion, useReducedMotion as useFramerReducedMotion } from 'framer-motion';
import { cn } from '../../lib/cn';

export interface TextSplitProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  by?: 'word' | 'char';
  once?: boolean;
}

export function TextSplit({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  by = 'word',
  once = true,
}: TextSplitProps) {
  const reduced = useFramerReducedMotion();
  const parts = by === 'word' ? text.split(/(\s+)/) : Array.from(text);

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={cn('inline-block', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-15% 0px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      variants={{ hidden: {}, visible: {} }}
      aria-label={text}
    >
      {parts.map((part, i) => {
        if (/^\s+$/.test(part)) return <span key={i}>{part}</span>;
        return (
          <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: '110%' },
                visible: { y: '0%' },
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {part}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
