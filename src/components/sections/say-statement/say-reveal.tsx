"use client";

import { Fragment, useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";

import { SAY_STATEMENT, type SayToken } from "@/constants/say-statement";
import { usePrefersReducedMotion } from "@/hooks";

/** Index of each segment's first word in the whole statement. */
const SEGMENT_OFFSETS = SAY_STATEMENT.segments.map((_, s) =>
  SAY_STATEMENT.segments.slice(0, s).reduce((n, segment) => n + segment.tokens.length, 0),
);
const WORD_COUNT = SAY_STATEMENT.segments.reduce((n, segment) => n + segment.tokens.length, 0);
const DIM_OPACITY = 0.14;

type SayRevealProps = {
  /** The inline icon cluster; it lights up like a word. */
  cluster: ReactNode;
  children: ReactNode;
};

/** One word: fully lit once `lit` passes its index. The CSS transition eases the step. */
function Word({ lit, index, children }: { lit: MotionValue<number>; index: number; children: ReactNode }) {
  const opacity = useTransform(lit, (n) => (index < n ? 1 : DIM_OPACITY));
  return (
    <motion.span className="transition-opacity duration-250" style={{ opacity }}>
      {children}
    </motion.span>
  );
}

/**
 * Lights the statement word by word as the section scrolls up:
 * p = clamp((0.85vh - top) / 0.75vh), lit = round(p * words).
 * Driven by a MotionValue, so scrolling never re-renders the statement.
 */
export function SayReveal({ cluster, children }: SayRevealProps) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.1"] });
  const lit = useMotionValue(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!reduce) lit.set(Math.round(p * WORD_COUNT));
  });
  useEffect(() => {
    lit.set(reduce ? WORD_COUNT : Math.round(scrollYProgress.get() * WORD_COUNT));
  }, [reduce, lit, scrollYProgress]);

  const renderWord = (token: SayToken, wordIndex: number, gap: boolean) => (
    <Fragment key={wordIndex}>
      {gap && " "}
      <Word lit={lit} index={wordIndex}>
        {typeof token === "string" ? token : cluster}
      </Word>
    </Fragment>
  );

  return (
    <section ref={ref} id="say" aria-labelledby="say-text" className="wrap pt-42 pb-32 text-center max-md:py-section">
      <p
        id="say-text"
        className="mx-auto my-0 max-w-275 text-[clamp(40px,5.6vw,80px)] leading-[1.12] font-normal tracking-[-0.045em] text-balance max-md:text-[32px]"
      >
        {SAY_STATEMENT.segments.map((segment, s) => {
          const words = segment.tokens.map((token, t) => renderWord(token, SEGMENT_OFFSETS[s] + t, t > 0));
          return (
            <Fragment key={s}>
              {s > 0 && " "}
              {segment.nowrap ? <span className="whitespace-nowrap">{words}</span> : words}
            </Fragment>
          );
        })}
      </p>
      {children}
    </section>
  );
}
