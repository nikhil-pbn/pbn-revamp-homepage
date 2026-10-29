"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

import type { FormsScene as Scene } from "@/constants/hero";
import { Icon } from "@/icons";
import { cn } from "@/lib/utils";

import { PatientAvatar } from "../patient-avatar";
import { FORMS_TIMING, formsSchedule } from "../scene-timing";
import { useSceneScript } from "../use-scene-script";
import type { SceneProps } from "./types";

const GRID =
  "grid grid-cols-[minmax(0,1.7fr)_repeat(4,minmax(0,.8fr))] items-center gap-1.5 max-sm:grid-cols-[minmax(0,1.5fr)_repeat(4,minmax(0,.8fr))]";
const STEPS = 4;

/** Smart Forms: each patient's form steps through sent → opened → signed → in PMS. */
export function FormsScene({ scene, reduced, finished, moveCursor }: SceneProps<Scene>) {
  const [active, setActive] = useState(-1);
  const [progress, setProgress] = useState<number[]>(() => scene.rows.map(() => 0));
  const [kioskIn, setKioskIn] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[][]>([]);
  const badgeRef = useRef<HTMLElement>(null);

  useSceneScript((at) => {
    const { rowAt, kioskAt } = formsSchedule(scene);
    scene.rows.forEach((row, k) => {
      at(rowAt[k], () => {
        setActive(k);
        moveCursor(stepRefs.current[k]?.[row.steps - 1]);
      });
      for (let j = 0; j < row.steps; j++) {
        at(rowAt[k] + j * FORMS_TIMING.stepStagger, () => setProgress((p) => p.map((n, i) => (i === k ? j + 1 : n))));
      }
    });
    at(kioskAt, () => {
      setActive(-1);
      setKioskIn(true);
      moveCursor(badgeRef.current);
    });
  });

  const view = reduced
    ? { active: -1, progress: scene.rows.map((r) => r.steps), kioskIn: true }
    : { active, progress, kioskIn };

  return (
    <div className="flex h-full flex-col gap-1.5 px-5 pt-3 pb-3.5 max-sm:p-3">
      <div className={cn(GRID, "px-2.5 text-[10.5px] text-ink-muted max-sm:text-[9px]")}>
        {scene.columns.map((c, i) => (
          <span key={c} className={cn(i > 0 && "text-center")}>
            {c}
          </span>
        ))}
      </div>
      {scene.rows.map((row, k) => (
        <div
          key={row.patient.name}
          className={cn(
            GRID,
            "relative rounded-[11px] border border-line px-2.5 py-1.5 text-[11.5px] transition-[background-color,box-shadow] duration-300 max-sm:nth-[n+6]:hidden",
            !finished && view.active === k && "bg-surface-hl shadow-ring-brand-faint",
          )}
        >
          <span className="flex min-w-0 items-center gap-2.25 font-medium">
            <PatientAvatar patient={row.patient} />
            <span className="min-w-0 truncate">
              {row.patient.name}
              <small className="block truncate text-[9.5px] font-normal text-ink-muted">{row.form}</small>
            </span>
          </span>
          {Array.from({ length: STEPS }, (_, j) => {
            const on = j < view.progress[k];
            return (
              <div
                key={j}
                ref={(el) => {
                  (stepRefs.current[k] ??= [])[j] = el;
                }}
                data-on={on}
                data-sync={j === STEPS - 1}
                className="step-connector relative grid h-5.5 place-items-center"
              >
                <i
                  className={cn(
                    "relative z-1 grid size-5 place-items-center rounded-full text-white transition-all duration-300",
                    on ? (j === STEPS - 1 ? "bg-status-done" : "bg-brand") : "bg-white shadow-inset-lav-2",
                  )}
                >
                  <Icon
                    name="check"
                    size={12}
                    strokeWidth={3}
                    className={cn("transition-opacity duration-200", on ? "opacity-100" : "opacity-0")}
                  />
                </i>
              </div>
            );
          })}
        </div>
      ))}
      <motion.div
        className="mt-auto flex items-center gap-2.5 rounded-xl bg-lav px-3 py-1.75 text-[11.5px]"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={view.kioskIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4 }}
      >
        <i className="grid size-6.5 flex-none place-items-center rounded-lg bg-ink text-white">
          <Icon name="form" size={13} strokeWidth={2.2} />
        </i>
        <span className="min-w-0 truncate text-ink-soft">
          <b className="font-medium">{scene.kiosk.title}</b>
          {scene.kiosk.text}
        </span>
        <em
          ref={badgeRef}
          className="ml-auto inline-flex items-center rounded-full bg-white px-2.25 py-0.75 text-[10.5px] font-medium whitespace-nowrap text-green-ink not-italic"
        >
          <Icon name="check" size={12} strokeWidth={3} />
          {scene.kiosk.badge}
        </em>
      </motion.div>
    </div>
  );
}
