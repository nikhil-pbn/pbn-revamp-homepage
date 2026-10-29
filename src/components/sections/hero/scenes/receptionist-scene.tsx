"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

import { HERO_BOARD, type ReceptionistScene as Scene } from "@/constants/hero";
import { cn } from "@/lib/utils";

import { PatientAvatar } from "../patient-avatar";
import { DEMO_TIMING, REC_TIMING } from "../scene-timing";
import { useSceneScript } from "../use-scene-script";
import type { SceneProps } from "./types";

const GRID =
  "grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_minmax(0,1fr)_104px] items-center border border-t-0 border-line max-xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_92px]";
const CELL = "overflow-hidden text-ellipsis whitespace-nowrap border-l border-line px-2.5 py-2.75";

/** AI Receptionist: after-hours calls get booked one row at a time. */
export function ReceptionistScene({ scene, reduced, finished, moveCursor }: SceneProps<Scene>) {
  const total = scene.rows.length;
  const [shown, setShown] = useState(0);
  const [active, setActive] = useState(-1);
  const [booked, setBooked] = useState(0);
  const statusRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useSceneScript((at) => {
    scene.rows.forEach((_, k) => {
      at(REC_TIMING.rowIn + k * REC_TIMING.rowInStagger, () => setShown(k + 1));
      const t = DEMO_TIMING.start + k * REC_TIMING.step;
      at(t, () => {
        setActive(k);
        moveCursor(statusRefs.current[k]);
      });
      at(t + REC_TIMING.book, () => setBooked(k + 1));
    });
  });

  const view = reduced ? { shown: total, active: -1, booked: total } : { shown, active, booked };
  const [patientCol, callCol, apptCol, statusCol] = scene.columns;

  return (
    <div>
      <div className="flex items-center gap-2 px-5 pt-3.5 pb-2 text-[13px]">
        <i className="h-4 w-1 rounded-xs bg-brand" aria-hidden="true" />
        <b className="font-medium text-brand">{scene.group}</b>
      </div>
      <div className="px-5 pb-4.5">
        <div className={cn(GRID, "rounded-t-lg border-t bg-surface-soft text-[11px] text-ink-muted")}>
          <span className={cn(CELL, "border-l-0")}>{patientCol}</span>
          <span className={CELL}>{callCol}</span>
          <span className={cn(CELL, "max-xl:hidden")}>{apptCol}</span>
          <span className={cn(CELL, "text-center")}>{statusCol}</span>
        </div>
        {scene.rows.map((row, k) => {
          const isBooked = k < view.booked;
          return (
            <motion.div
              key={row.patient.name}
              className={cn(
                GRID,
                "relative transition-colors duration-400 last:rounded-b-lg",
                "before:absolute before:-inset-y-px before:-left-px before:w-1 before:rounded-l-xs before:bg-brand before:content-['']",
                !finished && view.active === k && "bg-surface-hl",
              )}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={k < view.shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.4 }}
            >
              <span className={cn(CELL, "flex min-w-0 items-center gap-2.25 border-l-0 pl-3.5 text-ink")}>
                <PatientAvatar patient={row.patient} />
                {row.patient.name}
              </span>
              <span className={cn(CELL, "text-ink-soft")}>{row.call}</span>
              <span
                className={cn(
                  CELL,
                  "transition-colors duration-300 max-xl:hidden",
                  isBooked ? "font-medium text-ink" : "text-ink-soft",
                )}
              >
                {isBooked ? row.appointment : HERO_BOARD.emptyValue}
              </span>
              <span
                ref={(el) => {
                  statusRefs.current[k] = el;
                }}
                className="grid self-stretch border-l border-line text-center"
              >
                <span
                  className={cn(
                    "grid place-items-center text-[11px] font-medium text-white transition-colors duration-350",
                    isBooked ? "animate-pop bg-status-done" : "bg-status-working",
                  )}
                >
                  {isBooked ? scene.booked : scene.calling}
                </span>
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
