"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, type AnimationPlaybackControls } from "framer-motion";

import { ProductAvatar } from "@/components/common";
import { HERO_COPY, HERO_SCENES } from "@/constants/hero";
import { cn } from "@/lib/utils";

import { useHeroDemo } from "./hero-demo";

/**
 * 2px bar along the active chip's bottom edge that fills over the scene's
 * duration (`scaleX`, so it never triggers layout). Remounted per run.
 */
function ChipProgress({ durationMs, paused }: { durationMs: number; paused: boolean }) {
  const scaleX = useMotionValue(0);
  const controls = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    const c = animate(scaleX, [0, 1], { duration: durationMs / 1000, ease: "linear" });
    controls.current = c;
    return () => c.stop();
  }, [scaleX, durationMs]);

  // Declared after the effect above so a remount that starts paused pauses straight away.
  useEffect(() => {
    if (paused) controls.current?.pause();
    else controls.current?.play();
  }, [paused]);

  return (
    <motion.i
      aria-hidden="true"
      className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-brand"
      style={{ scaleX }}
    />
  );
}

/** Row of feature chips: shows which scene is playing, click to jump to one. */
export function FeatureChips() {
  const { index, runId, durationMs, paused, suspended, reduced, play } = useHeroDemo();

  return (
    <div
      role="tablist"
      aria-label={HERO_COPY.chipsLabel}
      className="flex max-w-150 flex-wrap gap-2 max-lg:justify-center"
    >
      {HERO_SCENES.map((scene, i) => {
        const on = i === index;
        return (
          <button
            key={scene.id}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => play(i)}
            className={cn(
              "relative inline-flex cursor-pointer items-center gap-1.5 overflow-hidden rounded-full px-3.5 py-1.75 text-[13px] transition-[background-color,color] duration-250 focus-visible:outline-offset-2",
              on ? "bg-lav font-medium text-brand" : "bg-panel text-ink-soft hover:bg-lav hover:text-ink",
            )}
          >
            <ProductAvatar
              avatar={scene.avatar}
              crop="face"
              sizes="24px"
              className={cn("-ml-2 size-6 rounded-full", on ? "shadow-ring-brand" : "shadow-ring-white")}
            />
            {scene.chip}
            {on && !reduced && <ChipProgress key={runId} durationMs={durationMs} paused={paused || suspended} />}
          </button>
        );
      })}
    </div>
  );
}
