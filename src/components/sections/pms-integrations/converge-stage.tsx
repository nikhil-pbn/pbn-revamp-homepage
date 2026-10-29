"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

import { PMS_FEATURED, PMS_INTEGRATIONS, PMS_SCENE } from "@/constants/pms-integrations";
import { LogoMark } from "@/icons";
import { cn } from "@/lib/utils";
import { clamp01 } from "@/utils/math";

type Point = { sx: number; sy: number; ex: number; ey: number };

/** Start (outside, rotated ahead) and end (on the ellipse) positions in % of the stage. */
const POINTS: Point[] = PMS_FEATURED.map((_, i) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / PMS_FEATURED.length;
  const b = a + PMS_SCENE.startRotation;
  return {
    ex: 50 + Math.cos(a) * PMS_SCENE.endRadius.x,
    ey: 50 + Math.sin(a) * PMS_SCENE.endRadius.y,
    sx: 50 + Math.cos(b) * PMS_SCENE.startRadius,
    sy: 50 + Math.sin(b) * PMS_SCENE.startRadius,
  };
});

/** Per-chip arrival 0..1, staggered by index. */
function useArrival(progress: MotionValue<number>, index: number) {
  return useTransform(progress, (e) => clamp01(e * PMS_SCENE.speed - index * PMS_SCENE.stagger));
}

function Chip({ progress, index, name }: { progress: MotionValue<number>; index: number; name: string }) {
  const { sx, sy, ex, ey } = POINTS[index];
  const d = useArrival(progress, index);
  const left = useTransform(d, (v) => `${sx + (ex - sx) * v}%`);
  const top = useTransform(d, (v) => `${sy + (ey - sy) * v}%`);
  const opacity = useTransform(d, (v) => Math.min(1, 0.12 + v * 1.2));

  return (
    <motion.span
      style={{ left, top, opacity }}
      className="absolute -translate-1/2 rounded-full border border-line bg-white px-4 py-2 text-[13.5px] whitespace-nowrap shadow-soft will-change-[left,top,opacity] max-md:px-2.75 max-md:py-1.5 max-md:text-[11.5px] max-sm:hidden"
    >
      {name}
    </motion.span>
  );
}

function ConnectorLine({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const { ex, ey } = POINTS[index];
  const d = useArrival(progress, index);
  // on/off as a MotionValue (no React render per scroll frame); the CSS transition fades it
  const opacity = useTransform(d, (v) => (v > PMS_SCENE.lineAt ? 1 : 0));

  return (
    <motion.line
      x1={500}
      y1={300}
      x2={ex * 10}
      y2={ey * 6}
      strokeWidth={1.5}
      strokeDasharray="6 6"
      style={{ opacity }}
      className="stroke-lav-strong transition-opacity duration-400"
    />
  );
}

type ConvergeStageProps = {
  /** Eased scene progress 0..1. */
  progress: MotionValue<number>;
  /** How many hub rows read "Synced". */
  syncedRows: number;
  done: boolean;
};

/** PMS chips converging on the central PbN hub card. */
export function ConvergeStage({ progress, syncedRows, done }: ConvergeStageProps) {
  const { hub } = PMS_INTEGRATIONS;

  return (
    <div className="relative h-[min(520px,calc(100vh-var(--navh)-170px))] min-h-100 min-w-0 max-md:h-115 max-sm:flex max-sm:h-auto max-sm:min-h-0 max-sm:flex-col max-sm:gap-4">
      {/* <640px: the ring doesn't fit beside the hub, so the chips sit in rows above and below it. */}
      <StaticChips names={PMS_FEATURED.slice(0, MOBILE_SPLIT)} />
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 size-full overflow-visible max-sm:hidden"
      >
        {PMS_FEATURED.map((name, index) => (
          <ConnectorLine key={name} progress={progress} index={index} />
        ))}
      </svg>
      {PMS_FEATURED.map((name, index) => (
        <Chip key={name} progress={progress} index={index} name={name} />
      ))}
      <div
        role="group"
        aria-label={hub.label}
        className="absolute top-1/2 left-1/2 z-2 flex w-[min(320px,74%)] -translate-1/2 flex-col gap-2 rounded-[22px] bg-ink p-4.5 text-white shadow-hub max-sm:relative max-sm:top-auto max-sm:left-auto max-sm:mx-auto max-sm:w-full max-sm:max-w-80 max-sm:translate-none max-sm:text-left"
      >
        <div className="flex items-center gap-2.5">
          <LogoMark className="block h-7 w-auto" />
          <b className="text-sm font-medium">{hub.name}</b>
          <span
            className={cn(
              "ml-auto text-[11.5px] text-mint transition-opacity duration-300",
              done ? "opacity-100" : "opacity-0",
            )}
          >
            {hub.state}
          </span>
        </div>
        {hub.rows.map((row, index) => {
          const on = index < syncedRows;
          return (
            <div
              key={row}
              className="flex items-center justify-between rounded-[10px] bg-white/7 px-2.5 py-2 text-[12.5px]"
            >
              <span>{row}</span>
              <i
                className={cn(
                  "text-[11.5px] not-italic transition-colors duration-300",
                  on ? "text-mint" : "text-footer-muted",
                )}
              >
                {on ? hub.synced : hub.syncing}
              </i>
            </div>
          );
        })}
      </div>
      <StaticChips names={PMS_FEATURED.slice(MOBILE_SPLIT)} />
    </div>
  );
}

/** How many chips go in the row above the hub on small screens. */
const MOBILE_SPLIT = Math.ceil(PMS_FEATURED.length / 2);

/** Small-screen (<640px) chip row; the animated ring is hidden there. */
function StaticChips({ names }: { names: readonly string[] }) {
  return (
    <div className="hidden flex-wrap justify-center gap-2 max-sm:flex">
      {names.map((name) => (
        <span
          key={name}
          className="rounded-full border border-line bg-white px-2.75 py-1.5 text-[11.5px] whitespace-nowrap shadow-soft"
        >
          {name}
        </span>
      ))}
    </div>
  );
}
