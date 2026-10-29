"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";

import { AI_RECEPTIONIST } from "@/constants/ai-receptionist";
import { usePrefersReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

const WORD_STAGGER = 0.08;
/** Safety net from the design: show the words even if the observer never fires. */
const FALLBACK_MS = 3000;

/** `custom` is the word index, or `null` for reduced motion (show instantly). */
const word: Variants = {
  out: { opacity: 0, y: 18 },
  in: (i: number | null) => ({
    opacity: 1,
    y: 0,
    transition: i === null ? { duration: 0 } : { duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay: i * WORD_STAGGER },
  }),
};

/** "Say Hello to PbN AI Receptionist!" — words rise in one by one when 30% visible. */
export function HelloHeadline({ id }: { id: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFallback(true), FALLBACK_MS);
    return () => clearTimeout(t);
  }, []);

  const shown = inView || fallback;

  return (
    <h2
      ref={ref}
      id={id}
      className="m-0 text-[clamp(30px,3vw,42px)] leading-[1.15] font-normal tracking-[-0.04em] text-ink max-md:text-[28px]"
    >
      {AI_RECEPTIONIST.headline.map((w, i) => (
        <Fragment key={w.text}>
          {i > 0 && " "}
          <motion.span
            custom={reduce ? null : i}
            variants={word}
            // identical first paint on server and client; reduced motion jumps straight to "in"
            initial="out"
            animate={reduce || shown ? "in" : "out"}
            className={cn("inline-block", w.accent && "text-brand")}
          >
            {w.text}
          </motion.span>
        </Fragment>
      ))}
    </h2>
  );
}
