"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";

import { PROOF_TIMING, type ProofStat as ProofStatData } from "@/constants/proof";
import { usePrefersReducedMotion } from "@/hooks";
import { formatNumber } from "@/utils/format";
import { easeOutCubic } from "@/utils/math";

/**
 * One count-up stat. The number is a MotionValue rendered straight into the DOM,
 * so the 1.4s count never re-renders React.
 */
export function ProofStat({ stat }: { stat: ProofStatData }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = usePrefersReducedMotion();
  const count = useMotionValue(0);
  const text = useTransform(count, (v) => formatNumber(Math.round(v)));

  useEffect(() => {
    if (reduce) {
      count.set(stat.value);
      return;
    }
    if (!inView) return;
    const controls = animate(count, stat.value, {
      duration: PROOF_TIMING.countUpMs / 1000,
      ease: easeOutCubic,
    });
    return () => controls.stop();
  }, [count, inView, reduce, stat.value]);

  return (
    <div className="flex flex-col items-start gap-1.5 px-7 not-first:shadow-divider-left max-lg:items-center max-md:px-4 max-md:nth-3:shadow-none">
      <b
        ref={ref}
        className="text-[clamp(40px,4.2vw,60px)] leading-[1.05] font-normal tracking-[-0.04em] text-brand tabular-nums max-md:text-[34px]"
      >
        <motion.span>{text}</motion.span>
        {stat.suffix}
      </b>
      <span className="text-[15px] text-ink-soft">{stat.label}</span>
    </div>
  );
}
