"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { Reveal } from "@/components/common";
import { FOUNDER, FOUNDER_MOTION } from "@/constants/founder";
import { usePrefersReducedMotion } from "@/hooks";

const SIGN_EASE = [0.45, 0.05, 0.3, 1] as const;

/** Right column: quote, handwritten signature that draws itself in, and the story link. */
export function FounderQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <Reveal ref={ref} className="flex flex-col gap-4.5 max-lg:items-center max-lg:text-center">
      <p className="m-0 text-lg leading-[1.55] tracking-[-0.01em] text-ink">{FOUNDER.quote}</p>
      <motion.span
        role="img"
        aria-label={FOUNDER.signatureLabel}
        className="block aspect-967/180 w-55 max-w-full flex-none text-ink signature-mask"
        // same first paint on server and client; reduced motion reveals it instantly
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={inView || reduce ? { clipPath: "inset(0 0% 0 0)" } : undefined}
        transition={
          reduce
            ? { duration: 0 }
            : {
                delay: FOUNDER_MOTION.signatureDelay,
                duration: FOUNDER_MOTION.signatureDuration,
                ease: SIGN_EASE,
              }
        }
      />
      <a
        href={FOUNDER.storyLink.href}
        className="self-start text-[15px] font-medium text-ink underline decoration-1 underline-offset-4 hover:decoration-2 max-lg:self-center"
      >
        {FOUNDER.storyLink.label} <span aria-hidden="true">→</span>
      </a>
    </Reveal>
  );
}
