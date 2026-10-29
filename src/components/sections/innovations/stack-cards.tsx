"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";

import { INNOVATION_STACK } from "@/constants/innovations";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";
import { clamp01 } from "@/utils/math";

export type StackCardItem = {
  id: string;
  /** Variant surface + sticky offset classes. */
  className: string;
  variant: string;
  content: ReactNode;
};

/**
 * Sticky stacking cards. As the next card slides over, the one beneath scales
 * to `1 − p·0.05` and dims to `brightness(1 − p·0.12)`, where
 * `p = clamp((a.bottom − b.top) / a.height)`.
 */
export function StackCards({ cards }: { cards: readonly StackCardItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  // only track scroll while the stack is (nearly) on screen
  const active = useInView(ref, { margin: INNOVATION_STACK.trackMargin });
  const reduce = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const stacking = !reduce && !isMobile;

  return (
    <div ref={ref} className="mt-12 flex flex-col gap-7">
      {cards.map((card) => (
        <StackCard key={card.id} variant={card.variant} className={card.className} active={active} stacking={stacking}>
          {card.content}
        </StackCard>
      ))}
    </div>
  );
}

type StackCardProps = {
  variant: string;
  className: string;
  /** The stack is near the viewport: follow scroll. */
  active: boolean;
  /** Desktop without reduced motion: apply the scale/dim effect. */
  stacking: boolean;
  children: ReactNode;
};

function StackCard({ variant, className, active, stacking, children }: StackCardProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const scale = useMotionValue(1);
  const filter = useMotionValue("none");

  const update = useCallback(() => {
    // the card that slides over this one is the next sibling in the stack
    const a = ref.current;
    const b = a?.nextElementSibling;
    if (!a || !b || !stacking) {
      scale.set(1);
      filter.set("none");
      return;
    }
    const ra = a.getBoundingClientRect();
    const rb = b.getBoundingClientRect();
    const p = clamp01((ra.bottom - rb.top) / ra.height);
    scale.set(1 - p * INNOVATION_STACK.scaleDrop);
    filter.set(p > 0 ? `brightness(${1 - p * INNOVATION_STACK.dimDrop})` : "none");
  }, [stacking, scale, filter]);

  useMotionValueEvent(scrollY, "change", () => {
    if (active) update();
  });

  // re-sync when tracking starts, the mode changes or the viewport resizes
  useEffect(() => {
    if (!active) return;
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active, update]);

  return (
    <motion.article
      ref={ref}
      data-variant={variant}
      className={cn(
        "group/scard sticky grid min-h-135 origin-top grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] items-center gap-10 rounded-4xl p-12 will-change-transform",
        "max-md:relative max-md:top-auto max-md:grid-cols-1 max-md:rounded-3xl max-md:px-5 max-md:py-7",
        className,
      )}
      style={{ scale, filter }}
    >
      {children}
    </motion.article>
  );
}
