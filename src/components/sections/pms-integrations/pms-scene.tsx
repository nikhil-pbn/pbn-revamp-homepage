"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

import { PMS_INTEGRATIONS, PMS_SCENE } from "@/constants/pms-integrations";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks";
import { clamp01, easeInOutQuad } from "@/utils/math";

import { ConvergeStage } from "./converge-stage";

const EXPO = [0.16, 1, 0.3, 1] as const;

/** The discrete states the scene steps through; only these trigger React renders. */
type Phase = { syncedRows: number; band: boolean; done: boolean };

function phaseOf(e: number): Phase {
  let syncedRows = 0;
  for (let i = 0; i < PMS_INTEGRATIONS.hub.rows.length; i++) {
    if (e > PMS_SCENE.rowStart + i * PMS_SCENE.rowStep) syncedRows = i + 1;
  }
  return { syncedRows, band: e > PMS_SCENE.bandAt, done: e > PMS_SCENE.doneAt };
}

function samePhase(a: Phase, b: Phase) {
  return a.syncedRows === b.syncedRows && a.band === b.band && a.done === b.done;
}

type PmsSceneProps = {
  /** Static heading, lead and CTA (server-rendered). */
  intro: ReactNode;
  /** Static PMS marquee band (server-rendered). */
  marquee: ReactNode;
};

/**
 * A 210vh scroll scene with a pinned panel. Scroll progress drives the chips,
 * hub rows, progress line and marquee band. Below 860px or with reduced motion
 * there is no pin and the scene renders its end state.
 */
export function PmsScene({ intro, marquee }: PmsSceneProps) {
  const reduce = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const pinned = !reduce && !isMobile;

  const sceneRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);

  // p = (-top + 0.1vh) / (height - vh): 0 when the scene top is at 10% of the
  // viewport, 1 when its bottom is at 110%.
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start 0.1", "end 1.1"] });
  const scrolled = useTransform(scrollYProgress, (p) => easeInOutQuad(clamp01(p)));

  /** Eased scene progress the whole scene paints from (1 = end state when not pinned). */
  const progress = useMotionValue(0);
  const barWidth = useTransform(progress, (e) => `${e * 100}%`);
  const [phase, setPhase] = useState<Phase>(() => phaseOf(0));

  useMotionValueEvent(scrolled, "change", (e) => {
    if (pinned) progress.set(e);
  });
  useMotionValueEvent(progress, "change", (e) => {
    const next = phaseOf(e);
    setPhase((prev) => (samePhase(prev, next) ? prev : next));
  });
  useLayoutEffect(() => {
    progress.set(pinned ? scrolled.get() : 1);
  }, [pinned, progress, scrolled]);

  // Pull the next section up over the empty space below the band (design `pmsSlack`); measured on resize only.
  const slack = useMotionValue(0);
  useEffect(() => {
    const pin = pinRef.current;
    const band = bandRef.current;
    if (!pinned || !pin || !band) {
      slack.set(0);
      return;
    }
    const measure = () => {
      const space = pin.clientHeight - band.offsetTop - band.offsetHeight;
      slack.set(PMS_SCENE.bottomGap - Math.max(PMS_SCENE.bottomGap, space));
    };
    measure();
    const observer = new ResizeObserver(measure);
    // the band moves when anything above it resizes (e.g. webfonts), so watch every child
    observer.observe(pin);
    for (const child of pin.children) observer.observe(child);
    return () => observer.disconnect();
  }, [pinned, slack]);

  return (
    <motion.section id="pms" aria-labelledby="pms-heading" style={{ marginBottom: slack }}>
      <div className="wrap">
        <div ref={sceneRef} className="relative h-[210vh] max-md:h-auto">
          <div
            ref={pinRef}
            className="sticky top-safe-nav flex h-[calc(100vh-var(--navh))] min-h-150 flex-col justify-center gap-7 max-md:relative max-md:top-auto max-md:h-auto max-md:min-h-0 max-md:py-5"
          >
            <div className="grid grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] items-center gap-12 max-md:grid-cols-1 max-md:gap-7">
              <div className="flex flex-col items-start gap-5 max-md:items-center max-md:text-center">
                {intro}
                <span className="flex items-center gap-2.5 text-[13px] text-ink-muted">
                  <i className="block h-0.75 w-30 overflow-hidden rounded-xs bg-lav">
                    <motion.b style={{ width: barWidth }} className="block h-full bg-brand" />
                  </i>
                  <span>{phase.done ? PMS_INTEGRATIONS.status.done : PMS_INTEGRATIONS.status.connecting}</span>
                </span>
              </div>
              <ConvergeStage progress={progress} syncedRows={phase.syncedRows} done={phase.done} />
            </div>

            <motion.div
              ref={bandRef}
              className="mx-[calc(50%-50vw)]"
              initial={false}
              animate={phase.band ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ opacity: { duration: 0.7, ease: EXPO }, y: { duration: 0.8, ease: EXPO } }}
            >
              {marquee}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
