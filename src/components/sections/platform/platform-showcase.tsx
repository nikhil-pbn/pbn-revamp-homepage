"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import { Reveal } from "@/components/common";
import { PLATFORM, PLATFORM_PRODUCTS } from "@/constants/platform";
import { usePrefersReducedMotion, useTimeline } from "@/hooks";

import { AppWindow } from "./app-window";
import { ProductCopy } from "./product-copy";
import { ProductPills } from "./product-pills";

const COPY_SWAP_EASE = [0.25, 0.1, 0.25, 1] as const;

/**
 * Pill tabs + copy + browser-window dashboard. Auto-advances every 8s until the
 * visitor clicks a pill or a sidebar item; never auto-rotates with reduced motion,
 * and pauses (the progress bar restarts) while the showcase is off-screen.
 */
export function PlatformShowcase() {
  const reduce = usePrefersReducedMotion();
  const { at, clear } = useTimeline();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.2 });
  const idBase = useId();
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const [auto, setAuto] = useState(true);
  const running = auto && !reduce && inView;

  const select = useCallback(
    (index: number) => {
      setActive(index);
      clear();
      if (reduce) {
        setShown(index);
        setSwapping(false);
        return;
      }
      setSwapping(true);
      at(PLATFORM.swapDelayMs, () => {
        setShown(index);
        setSwapping(false);
      });
    },
    [reduce, at, clear],
  );

  const pick = (index: number) => {
    setAuto(false);
    select(index);
  };

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => select((active + 1) % PLATFORM_PRODUCTS.length), PLATFORM.autoAdvanceMs);
    return () => clearTimeout(timer);
  }, [running, active, select]);

  const tabId = (index: number) => `${idBase}-tab-${PLATFORM_PRODUCTS[index].slug}`;
  const panelId = `${idBase}-panel`;

  return (
    <div ref={rootRef}>
      <ProductPills
        products={PLATFORM_PRODUCTS}
        active={active}
        running={running}
        onSelect={pick}
        tabId={tabId}
        panelId={panelId}
      />
      <div className="mt-11 grid grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)] items-center gap-13 max-xl:grid-cols-1">
        <motion.div
          id={panelId}
          role="tabpanel"
          aria-labelledby={tabId(shown)}
          // only announce changes the visitor asked for, not every auto-rotation
          aria-live={auto ? "off" : "polite"}
          className="flex min-w-0 flex-col gap-4 max-lg:items-center max-lg:text-center"
          initial={false}
          animate={swapping ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: COPY_SWAP_EASE }}
        >
          <ProductCopy product={PLATFORM_PRODUCTS[shown]} />
        </motion.div>
        <Reveal className="min-w-0 rounded-[18px] bg-lav-strong p-2 shadow-window">
          <AppWindow products={PLATFORM_PRODUCTS} active={active} onSelect={pick} />
        </Reveal>
      </div>
    </div>
  );
}
