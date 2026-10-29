"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Subscribes to a CSS media query. `false` on the server and first client render (hydration-safe). */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function getServerSnapshot() {
  return false;
}

/** True below the design's main mobile breakpoint (860px). */
export function useIsMobile() {
  return useMediaQuery("(max-width: 860px)");
}

/** OS "reduce motion" setting. Unlike framer's `useReducedMotion()`, safe to branch markup on (no hydration mismatch). */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
