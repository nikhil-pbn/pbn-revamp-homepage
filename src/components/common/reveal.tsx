"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Delay in seconds. */
  delay?: number;
};

const REVEAL_EASE = [0.2, 0.7, 0.2, 1] as const;

/**
 * Fades + slides its children up the first time they scroll into view.
 * Replaces the design's `[data-reveal]` behaviour. Under "reduce motion" the
 * app-wide MotionConfig drops the slide and keeps a plain fade.
 */
export function Reveal({ delay = 0, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease: REVEAL_EASE, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
