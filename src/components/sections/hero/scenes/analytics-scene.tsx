"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";

import type { AnalyticsScene as Scene } from "@/constants/hero";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/utils/format";
import { easeOutCubic } from "@/utils/math";

import { DEMO_TIMING, EASE_PBN, IQ_TIMING } from "../scene-timing";
import { useSceneScript } from "../use-scene-script";
import type { SceneProps } from "./types";

/** Circumference of the r=36 gauge ring (the design rounds it to 226). */
const RING = 226;

/**
 * 0 → 1 eased progress as a MotionValue: starts when `running` turns true,
 * jumps to 1 with reduced motion. Count-up text is bound to it, so the numbers
 * tick every frame without re-rendering the scene.
 */
function useEasedProgress(running: boolean, durationMs: number, reduced: boolean) {
  const progress = useMotionValue(0);
  useEffect(() => {
    if (reduced) {
      progress.jump(1);
      return;
    }
    if (!running) return;
    const controls = animate(progress, 1, { duration: durationMs / 1000, ease: easeOutCubic });
    return () => controls.stop();
  }, [progress, running, durationMs, reduced]);
  return progress;
}

/** A KPI figure counting up with `progress`. */
function KpiValue({ kpi, progress }: { kpi: Scene["kpis"][number]; progress: MotionValue<number> }) {
  const text = useTransform(progress, (p) => kpi.prefix + formatNumber(Math.round(kpi.value * p)));
  return <motion.span>{text}</motion.span>;
}

/** Practice Analytics: KPIs count up, the week's bars grow, the goal gauge fills. */
export function AnalyticsScene({ scene, reduced, moveCursor }: SceneProps<Scene>) {
  const [counting, setCounting] = useState(false);
  const [bars, setBars] = useState(0);
  const [gauge, setGauge] = useState(false);
  const firstKpiRef = useRef<HTMLElement>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);

  useSceneScript((at) => {
    const t0 = DEMO_TIMING.start;
    at(t0, () => {
      setCounting(true);
      moveCursor(firstKpiRef.current);
    });
    scene.bars.forEach((_, k) => {
      at(t0 + IQ_TIMING.barsAt + k * IQ_TIMING.barStagger, () => setBars(k + 1));
    });
    at(t0 + IQ_TIMING.gaugeAt, () => {
      setGauge(true);
      moveCursor(gaugeRef.current);
    });
  });

  const goal = scene.gauge.percent;
  const kpiProgress = useEasedProgress(counting, IQ_TIMING.countMs, reduced);
  const gaugeProgress = useEasedProgress(gauge, IQ_TIMING.gaugeCountMs, reduced);
  const gaugeText = useTransform(gaugeProgress, (p) => `${Math.round(goal * p)}%`);

  const view = reduced ? { bars: scene.bars.length, gauge: true } : { bars, gauge };

  return (
    <div className="grid h-full grid-cols-3 grid-rows-[auto_1fr] gap-3 px-5 pt-3.5 pb-4.5 max-xl:grid-cols-2 max-xl:p-3">
      {scene.kpis.map((kpi, k) => (
        <div key={kpi.label} className={cn("rounded-xl border border-line px-3 py-2.5", k === 2 && "max-xl:hidden")}>
          <span className="block text-[10.5px] text-ink-muted">{kpi.label}</span>
          <b
            ref={k === 0 ? firstKpiRef : undefined}
            className="block text-[19px] font-medium tracking-[-0.02em] tabular-nums"
          >
            <KpiValue kpi={kpi} progress={kpiProgress} />
          </b>
          <em className="text-[10.5px] font-medium text-green-ink not-italic">{kpi.delta}</em>
        </div>
      ))}

      <div className="col-span-2 flex flex-col rounded-xl border border-line px-3.5 py-3">
        <span className="text-[11px] text-ink-muted">{scene.chartLabel}</span>
        <div className="flex flex-1 items-end gap-2.5 pt-2.5">
          {scene.bars.map((bar, k) => (
            <div key={k} className="flex h-full flex-1 flex-col items-center justify-end gap-1.25">
              <div className="flex w-full flex-1 items-end">
                <motion.i
                  className={cn("block w-full rounded-[6px_6px_2px_2px]", bar.highlight ? "bg-brand" : "bg-lav-strong")}
                  initial={reduced ? false : { height: "0%" }}
                  animate={{ height: k < view.bars ? `${bar.height}%` : "0%" }}
                  transition={{ duration: 0.8, ease: EASE_PBN }}
                />
              </div>
              <em className="text-[9.5px] text-ink-muted not-italic">{bar.day}</em>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={gaugeRef}
        className="flex flex-col items-center justify-center gap-1 rounded-xl border border-line p-3 max-xl:hidden"
      >
        <div className="relative grid place-items-center">
          <svg viewBox="0 0 96 96" className="size-24" aria-hidden="true">
            <circle cx="48" cy="48" r="36" className="fill-none stroke-lav" strokeWidth={10} />
            <motion.circle
              cx="48"
              cy="48"
              r="36"
              className="origin-center -rotate-90 fill-none stroke-brand"
              strokeWidth={10}
              strokeLinecap="round"
              strokeDasharray={RING}
              initial={reduced ? false : { strokeDashoffset: RING }}
              animate={{ strokeDashoffset: view.gauge ? RING - (RING * goal) / 100 : RING }}
              transition={{ duration: 1.2, ease: EASE_PBN }}
            />
          </svg>
          <motion.strong className="absolute text-lg font-medium">{gaugeText}</motion.strong>
        </div>
        <b className="text-xs font-medium">{scene.gauge.label}</b>
        <span className="text-[10.5px] text-ink-muted">{scene.gauge.detail}</span>
      </div>
    </div>
  );
}
