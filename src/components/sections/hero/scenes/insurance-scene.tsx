"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

import { HERO_BOARD, type InsuranceScene as Scene } from "@/constants/hero";
import { Icon } from "@/icons";
import { cn } from "@/lib/utils";
import { shortName } from "@/utils/format";

import { PatientAvatar } from "../patient-avatar";
import { DEMO_TIMING, EASE_PBN, INS_TIMING } from "../scene-timing";
import { useSceneScript } from "../use-scene-script";
import type { SceneProps } from "./types";

/** Insurance: eligibility cards check one by one, fill coverage bars and verify. */
export function InsuranceScene({ scene, reduced, finished, moveCursor }: SceneProps<Scene>) {
  const [active, setActive] = useState(-1);
  const [filled, setFilled] = useState<number[]>(() => scene.patients.map(() => 0));
  const [verified, setVerified] = useState(0);
  const statusRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useSceneScript((at) => {
    scene.patients.forEach((p, k) => {
      const t = DEMO_TIMING.start + k * INS_TIMING.step;
      at(t, () => {
        setActive(k);
        moveCursor(statusRefs.current[k]);
      });
      p.coverage.forEach((_, j) => {
        at(t + j * INS_TIMING.rowStagger, () => setFilled((f) => f.map((n, i) => (i === k ? j + 1 : n))));
      });
      at(t + INS_TIMING.verify, () => setVerified(k + 1));
    });
  });

  const view = reduced
    ? { active: -1, filled: scene.patients.map((p) => p.coverage.length), verified: scene.patients.length }
    : { active, filled, verified };

  return (
    <div className="grid h-full grid-cols-2 gap-3 px-5 pt-3.5 pb-4.5 max-xl:grid-cols-1 max-xl:gap-2 max-xl:p-3">
      {scene.patients.map((p, k) => {
        const isActive = !finished && view.active === k;
        const ok = k < view.verified;
        const name = p.patient.name.length > 13 ? shortName(p.patient.name) : p.patient.name;
        return (
          <div
            key={p.patient.name}
            className={cn(
              "flex min-w-0 flex-col gap-1.75 rounded-xl border border-line p-3 transition-[border-color,box-shadow] duration-300 max-xl:nth-[n+3]:hidden",
              isActive && "border-lav-strong shadow-ring-brand-4",
            )}
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <PatientAvatar patient={p.patient} size={30} className="size-7.5" />
              <div className="min-w-0">
                <b className="block truncate text-[12.5px] leading-[1.2] font-medium">{name}</b>
                <span className="text-[10.5px] text-ink-muted">{p.insurer}</span>
              </div>
              <span
                ref={(el) => {
                  statusRefs.current[k] = el;
                }}
                className={cn(
                  "ml-auto inline-flex flex-none items-center gap-1 rounded-full px-2 py-0.75 text-[10px] font-medium whitespace-nowrap",
                  ok ? "bg-green-soft text-green-ink" : "bg-panel text-ink-muted",
                )}
              >
                {ok ? (
                  <Icon name="check" size={12} strokeWidth={3} />
                ) : (
                  <i className="size-2.25 animate-spin-fast rounded-full border-2 border-lav-strong border-t-brand" />
                )}
                {ok ? scene.verified : scene.checking}
              </span>
            </div>
            {scene.benefits.map((benefit, j) => {
              const isFilled = j < view.filled[k];
              const pct = p.coverage[j];
              return (
                <div
                  key={benefit}
                  className="grid grid-cols-[54px_minmax(0,1fr)_30px] items-center gap-2 text-[10.5px] text-ink-soft"
                >
                  <span>{benefit}</span>
                  <i className="block h-1.5 overflow-hidden rounded-[3px] bg-lav">
                    <motion.b
                      className="block h-full rounded-[3px] bg-green"
                      initial={reduced ? false : { width: "0%" }}
                      animate={{ width: isFilled ? `${pct}%` : "0%" }}
                      transition={{ duration: 0.8, ease: EASE_PBN }}
                    />
                  </i>
                  <em className="text-right text-ink not-italic">{isFilled ? `${pct}%` : HERO_BOARD.emptyValue}</em>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
