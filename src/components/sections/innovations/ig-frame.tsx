"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const ARTBOARD_W = 500;
const ARTBOARD_H = 440;

/**
 * Hosts a fixed 500×440 infographic artboard and scales it down to fit the
 * visual column (`--s = min(1, columnWidth / 500)` in the design).
 */
export function IgFrame({ children }: { children: ReactNode }) {
  const columnRef = useRef<HTMLDivElement>(null);
  const scale = useMotionValue(1);
  const height = useTransform(scale, (s) => ARTBOARD_H * s);

  useEffect(() => {
    const el = columnRef.current;
    if (!el) return;
    const update = () => scale.set(Math.min(1, el.clientWidth / ARTBOARD_W));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [scale]);

  return (
    <div ref={columnRef} className="flex min-w-0 justify-center">
      <motion.div className="relative w-full max-w-125" style={{ height }}>
        <motion.div
          className="absolute top-0 left-1/2 h-110 w-125 origin-top -translate-x-1/2 text-ink"
          style={{ scale }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
