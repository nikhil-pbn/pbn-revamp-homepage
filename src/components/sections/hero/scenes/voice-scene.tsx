"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

import type { VoiceScene as Scene } from "@/constants/hero";
import { AiSparkle, Icon } from "@/icons";
import { cn } from "@/lib/utils";

import { PatientAvatar } from "../patient-avatar";
import { DEMO_TIMING, VOICE_TIMING, voiceCallAt, voiceTypeDuration } from "../scene-timing";
import { useSceneScript } from "../use-scene-script";
import type { SceneProps } from "./types";

/** PbN Voice: incoming call → patient details → AI summary written to the PMS. */
export function VoiceScene({ scene, reduced, moveCursor }: SceneProps<Scene>) {
  const [shown, setShown] = useState(0);
  const [onCall, setOnCall] = useState(false);
  const [summaryIn, setSummaryIn] = useState(false);
  // Typed character count drives the summary text directly (no re-render per keystroke).
  const typed = useMotionValue(0);
  const typedSummary = useTransform(typed, (n) => scene.summary.slice(0, n));
  const [written, setWritten] = useState(false);
  const firstRowRef = useRef<HTMLDivElement>(null);
  const acceptRef = useRef<HTMLElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  useSceneScript((at) => {
    const { rowStagger, summaryGap, typeChars, typeTick, okGap } = VOICE_TIMING;
    scene.details.forEach((_, k) => {
      at(DEMO_TIMING.start + k * rowStagger, () => {
        setShown(k + 1);
        if (k === 0) moveCursor(firstRowRef.current);
      });
    });
    const call = voiceCallAt(scene);
    at(call, () => {
      setOnCall(true);
      moveCursor(acceptRef.current);
    });
    const typeFrom = call + summaryGap;
    at(typeFrom, () => {
      setSummaryIn(true);
      moveCursor(summaryRef.current);
    });
    const ticks = Math.ceil(scene.summary.length / typeChars);
    for (let j = 0; j < ticks; j++) {
      at(typeFrom + j * typeTick, () => typed.set((j + 1) * typeChars));
    }
    at(typeFrom + voiceTypeDuration(scene) + okGap, () => setWritten(true));
  });

  const view = reduced
    ? { shown: scene.details.length, onCall: true, summaryIn: true, written: true }
    : { shown, onCall, summaryIn, written };

  return (
    <div className="grid h-full grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)] gap-3 px-5 pt-3.5 pb-4.5 max-sm:grid-cols-1 max-sm:p-3">
      {/* caller card */}
      <div className="relative flex flex-col items-center justify-center gap-1.5 overflow-hidden rounded-[14px] p-3.5 text-center text-white bg-call-card max-sm:hidden">
        <span aria-hidden="true" className="absolute -top-15 -right-15 size-40 rounded-full bg-call-glow" />
        <span className="relative mb-1 size-15.5 rounded-full">
          <PatientAvatar patient={scene.caller} size={62} className="size-full ring-3 ring-white/90" />
          {!view.onCall && (
            <>
              <i className="absolute inset-0 animate-call-ring rounded-full border-2 border-mint/80" />
              <i className="absolute inset-0 animate-call-ring rounded-full border-2 border-mint/80 [animation-delay:.8s]" />
            </>
          )}
        </span>
        <b className="text-[13.5px] font-medium">{scene.caller.name}</b>
        <span className="text-[11px] text-lav-strong">{scene.phone}</span>
        <span
          className={cn(
            "mt-1 rounded-full px-2.5 py-0.75 text-[10.5px] font-medium text-white",
            view.onCall ? "bg-status-done" : "bg-white/12",
          )}
        >
          {view.onCall ? scene.onCall : scene.incoming}
        </span>
        <div className="mt-2 flex gap-3.5">
          <i
            className={cn(
              "grid size-8.5 place-items-center rounded-full bg-status-stuck text-white transition-[scale,opacity] duration-300",
              view.onCall && "scale-105",
            )}
          >
            <Icon d={scene.declineIcon} size={15} strokeWidth={2.2} />
          </i>
          <i
            ref={acceptRef}
            className={cn(
              "grid size-8.5 place-items-center rounded-full bg-status-done text-white transition-[scale,opacity] duration-300",
              view.onCall ? "opacity-35" : "animate-call-wiggle",
            )}
          >
            <Icon d={scene.acceptIcon} size={15} strokeWidth={2.2} />
          </i>
        </div>
      </div>

      {/* patient details + summary */}
      <div className="flex min-w-0 flex-col gap-1.75">
        <div className="flex items-center justify-between text-[11px] text-ink-muted">
          <span>{scene.detailsLabel}</span>
          <em className="inline-flex items-center gap-1.25 font-medium text-green-ink not-italic">
            <i className="size-1.5 rounded-full bg-green" />
            {scene.syncedLabel}
          </em>
        </div>
        {scene.details.map((row, k) => (
          <motion.div
            key={row.label}
            ref={k === 0 ? firstRowRef : undefined}
            className="grid grid-cols-[22px_76px_minmax(0,1fr)] items-center gap-2 rounded-[10px] border border-line px-2.5 py-1.75 text-[11.5px]"
            initial={reduced ? false : { opacity: 0, x: 12 }}
            animate={k < view.shown ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
            transition={{ duration: 0.35 }}
          >
            <s className="grid size-5.5 place-items-center rounded-[7px] bg-lav text-brand no-underline">
              <Icon d={row.icon} size={12} strokeWidth={2.2} />
            </s>
            <span className="text-ink-muted">{row.label}</span>
            <b className="truncate font-medium">{row.value}</b>
          </motion.div>
        ))}
        <motion.div
          ref={summaryRef}
          className="mt-auto flex flex-col gap-1.5 rounded-xl bg-lav px-3 py-2.5"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={view.summaryIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.4 }}
        >
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-brand">
            <AiSparkle width={13} />
            {scene.summaryLabel}
          </span>
          <motion.p className="m-0 min-h-8.5 text-[11.5px] leading-[1.45] text-ink">
            {reduced ? scene.summary : typedSummary}
          </motion.p>
          <span
            className={cn(
              "inline-flex items-center gap-1.25 self-start rounded-full bg-white px-2.25 py-0.75 text-[10.5px] font-medium text-green-ink transition-opacity duration-300",
              view.written ? "opacity-100" : "opacity-0",
            )}
          >
            <Icon name="check" size={12} strokeWidth={3} />
            {scene.writtenLabel}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
