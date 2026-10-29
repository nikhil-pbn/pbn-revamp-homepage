import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type IgCardProps = {
  /** Absolute position + size on the 500×440 artboard, plus layout classes. */
  className?: string;
  /** Gentle floating loop; `delay` offsets it like the design's `.d2` / `.d3`. */
  float?: boolean;
  delay?: "d2" | "d3";
  children: ReactNode;
};

const FLOAT_DELAY = {
  d2: "[animation-delay:-2s]",
  d3: "[animation-delay:-4s]",
} as const;

/** A white infographic card with the lavender halo (`.ig-c`). */
export function IgCard({ className, float, delay, children }: IgCardProps) {
  return (
    <div
      className={cn(
        "absolute rounded-[18px] bg-white shadow-ig-card group-data-[variant=dark]/scard:shadow-ig-card-dark",
        float && "animate-float-sm",
        float && delay && FLOAT_DELAY[delay],
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Small centred caption (`.ig-s`). */
export function IgCaption({ className, children }: { className?: string; children: ReactNode }) {
  return <span className={cn("text-center text-xs text-ink-soft", className)}>{children}</span>;
}

/** Brand pill button (`.ig-btn`). */
export function IgButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[9px] bg-brand px-3.5 py-1.75 text-[11px] font-medium text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}
