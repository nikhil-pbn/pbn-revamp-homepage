"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Schedules a choreographed sequence of timeouts and cancels all of them
 * together (on `clear()` or unmount). Used by the scripted product demos.
 */
export function useTimeline() {
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const at = useCallback((ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => clear, [clear]);

  return { at, clear };
}
