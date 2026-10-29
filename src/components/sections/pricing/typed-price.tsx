"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks";

type TypedPriceProps = {
  text: string;
  msPerChar: number;
};

/** Types the price out with a blinking caret once 60% of it is on screen. */
export function TypedPrice({ text, msPerChar }: TypedPriceProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  // null = not started yet: show the full price (SSR / reduced motion).
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || reduce) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i < text.length) timer = setTimeout(tick, msPerChar);
    };
    timer = setTimeout(tick, 0);
    return () => clearTimeout(timer);
  }, [inView, reduce, text, msPerChar]);

  const typing = count !== null && !reduce;

  return (
    <span ref={ref} className="text-brand">
      {typing ? (
        <>
          <span aria-hidden="true">{text.slice(0, count)}</span>
          <span className="sr-only">{text}</span>
          <span
            aria-hidden="true"
            className="ml-[0.04em] inline-block h-[0.9em] w-[0.06em] animate-caret bg-brand align-[-0.08em]"
          />
        </>
      ) : (
        text
      )}
    </span>
  );
}
