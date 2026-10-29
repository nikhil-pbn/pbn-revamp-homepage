"use client";

import { useEffect, useEffectEvent } from "react";
import { useIsPresent } from "framer-motion";

import type { Timeline } from "./demo-clock";
import { useHeroDemo } from "./hero-demo";

/**
 * Runs a scene's scripted sequence once on mount. `script` schedules state
 * changes with `at(ms, fn)` (times are relative to the scene starting) on the
 * demo's shared clock, so the sequence freezes while the hero is off-screen or
 * the tab is hidden. Everything is cancelled on unmount, when the scene starts
 * exiting, or when the demo is halted. With reduced motion nothing is
 * scheduled: scenes render their end state instead.
 */
export function useSceneScript(script: (at: Timeline["at"]) => void) {
  const { clock, reduced, halted } = useHeroDemo();
  const isPresent = useIsPresent();
  const run = useEffectEvent((at: Timeline["at"]) => script(at));

  useEffect(() => {
    if (reduced || halted || !isPresent) return;
    const timeline = clock.timeline();
    run(timeline.at);
    return timeline.clear;
  }, [clock, reduced, halted, isPresent]);
}
