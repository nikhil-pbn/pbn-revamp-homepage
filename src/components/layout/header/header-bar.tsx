"use client";

import { useState, type ReactNode } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

import { cn } from "@/lib/utils";

/** Scroll distance after which the header shows its bottom hairline. */
const SCROLLED_AT = 40;

/** The sticky header element; adds a hairline shadow once the page scrolls. */
export function HeaderBar({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  // Only re-renders when the threshold is crossed, not on every scroll frame.
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > SCROLLED_AT));

  return (
    <header
      className={cn(
        "sticky top-(--safe-top) z-70 bg-nav-glass transition-shadow duration-300",
        scrolled && "shadow-nav",
      )}
    >
      {children}
    </header>
  );
}
