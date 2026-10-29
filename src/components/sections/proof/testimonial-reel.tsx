"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";

import { Icon } from "@/icons";
import { PROOF_COPY, PROOF_TIMING, TESTIMONIALS } from "@/constants/proof";
import { usePrefersReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

import { TestimonialCard } from "./testimonial-card";

const ARROW_CLASS =
  "grid size-11 cursor-pointer place-items-center rounded-full border border-ink bg-white text-ink transition-[background,color,opacity] duration-200 hover:bg-ink hover:text-white focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand";

const PROGRESS_EASE = [0.25, 0.1, 0.25, 1] as const;

/**
 * Full-bleed, scroll-snapping reel of testimonial video cards with a progress bar,
 * prev/next arrows and a gentle auto-advance that stops as soon as the visitor interacts.
 */
export function TestimonialReel() {
  const reduce = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const revealed = useInView(trackRef, { once: true, amount: 0.2 });
  const trackVisible = useInView(trackRef, { amount: 0 });

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Only the arrow states live in React state (they change rarely); the bar
  // fill is a MotionValue so scrolling never re-renders the cards.
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [autoStopped, setAutoStopped] = useState(false);
  const hoverRef = useRef(false);

  const barPct = useMotionValue<number>(PROOF_TIMING.progressMinPct);
  const barWidth = useTransform(barPct, (p) => `${p}%`);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    let raf = 0;
    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = t;
      const max = scrollWidth - clientWidth;
      const progress = max > 0 ? scrollLeft / max : 1;
      setAtStart(scrollLeft < PROOF_TIMING.edgeTolerance);
      setAtEnd(scrollLeft >= max - PROOF_TIMING.edgeTolerance);
      animate(barPct, PROOF_TIMING.progressMinPct + progress * (100 - PROOF_TIMING.progressMinPct), {
        duration: PROOF_TIMING.progressTweenS,
        ease: PROGRESS_EASE,
      });
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    const ro = new ResizeObserver(schedule);
    ro.observe(t);
    t.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      t.removeEventListener("scroll", schedule);
    };
  }, [barPct]);

  const step = useCallback(() => {
    const card = trackRef.current?.firstElementChild;
    return (card instanceof HTMLElement ? card.offsetWidth : 0) + PROOF_TIMING.cardGap;
  }, []);

  // auto-advance by one card while on screen, untouched, not hovered and the tab is visible
  useEffect(() => {
    if (reduce || autoStopped || !trackVisible) return;
    const id = setInterval(() => {
      const t = trackRef.current;
      if (!t || hoverRef.current || document.hidden) return;
      const max = t.scrollWidth - t.clientWidth;
      if (t.scrollLeft >= max - PROOF_TIMING.edgeTolerance) t.scrollTo({ left: 0 });
      else t.scrollBy({ left: step() });
    }, PROOF_TIMING.autoAdvanceMs);
    return () => clearInterval(id);
  }, [reduce, autoStopped, trackVisible, step]);

  const stopAuto = () => setAutoStopped(true);

  const play = (i: number) => {
    stopAuto();
    setActiveIndex(i);
  };

  const stop = useCallback(() => setActiveIndex(null), []);

  const nudge = (dir: 1 | -1) => {
    stopAuto();
    setActiveIndex(null);
    trackRef.current?.scrollBy({ left: dir * step() });
  };

  // Escape closes the playing video (key events bubble up from the focused card)
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" && activeIndex !== null) stop();
  };

  return (
    <>
      <div className="relative mt-11">
        <div
          ref={trackRef}
          onKeyDown={onKeyDown}
          onPointerDown={stopAuto}
          onMouseEnter={() => (hoverRef.current = true)}
          onMouseLeave={() => (hoverRef.current = false)}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pt-1 pr-6 pb-2 pl-(--gut-l) after:flex-[0_0_1px] after:content-[''] 2xl:pl-[calc((100vw-1312px)/2+24px)]"
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard
              key={t.videoUrl}
              testimonial={t}
              index={i}
              revealed={revealed || reduce}
              active={activeIndex === i}
              trackVisible={trackVisible}
              onPlay={() => play(i)}
              onStop={stop}
            />
          ))}
        </div>
      </div>
      <div className="wrap">
        <div className="mt-7 flex items-center justify-between gap-6">
          <div aria-hidden="true" className="h-0.75 max-w-105 flex-1 rounded-xs bg-lav">
            <motion.i className="block h-full rounded-xs bg-brand" style={{ width: barWidth }} />
          </div>
          <div className="flex flex-none gap-2.5">
            <button
              type="button"
              aria-label={PROOF_COPY.prevLabel}
              onClick={() => nudge(-1)}
              className={cn(ARROW_CLASS, atStart && "pointer-events-none opacity-35")}
            >
              <Icon name="chevronLeft" size={18} strokeWidth={2.2} />
            </button>
            <button
              type="button"
              aria-label={PROOF_COPY.nextLabel}
              onClick={() => nudge(1)}
              className={cn(ARROW_CLASS, atEnd && "pointer-events-none opacity-35")}
            >
              <Icon name="chevronRight" size={18} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
