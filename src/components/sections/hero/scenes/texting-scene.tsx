"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

import type { TextingScene as Scene } from "@/constants/hero";
import { Icon } from "@/icons";
import { cn } from "@/lib/utils";

import { PatientAvatar } from "../patient-avatar";
import { DEMO_TIMING, TEXT_TIMING } from "../scene-timing";
import { useSceneScript } from "../use-scene-script";
import type { SceneProps } from "./types";

const MESSAGE = "max-w-[78%] rounded-[14px] px-3 py-2.25 text-xs leading-[1.4]";
const HIDDEN = { opacity: 0, y: 8 };
const SHOWN = { opacity: 1, y: 0 };

/** Patient Texting: reminder goes out, patient replies, visits get confirmed. */
export function TextingScene({ scene, reduced, moveCursor }: SceneProps<Scene>) {
  const [step, setStep] = useState(0); // 1 sent · 2 typing · 3 replied · 4 confirmed
  const [tags, setTags] = useState(0);
  const replyRef = useRef<HTMLDivElement>(null);

  useSceneScript((at) => {
    const t0 = DEMO_TIMING.start;
    at(t0, () => setStep(1));
    at(t0 + TEXT_TIMING.typing, () => setStep(2));
    at(t0 + TEXT_TIMING.reply, () => {
      setStep(3);
      moveCursor(replyRef.current);
    });
    at(t0 + TEXT_TIMING.confirmed, () => {
      setStep(4);
      setTags(1);
    });
    scene.inbox.slice(1).forEach((_, k) => {
      at(t0 + TEXT_TIMING.tagsAt + k * TEXT_TIMING.tagStagger, () => setTags(k + 2));
    });
  });

  const view = reduced ? { step: 4, tags: scene.inbox.length } : { step, tags };
  const motionInitial = reduced ? false : HIDDEN;

  return (
    <div className="mt-3 grid h-full grid-cols-[200px_1fr] border-t border-line max-xl:grid-cols-1">
      <div className="overflow-hidden border-r border-line max-xl:hidden">
        {scene.inbox.map((p, k) => (
          <div
            key={p.name}
            className={cn(
              "flex items-center gap-2.25 border-b border-surface-row py-2.5 pr-3 pl-5 transition-colors duration-300",
              k === 0 && "bg-panel",
            )}
          >
            <PatientAvatar patient={p} size={28} className="size-7" />
            <div className="min-w-0 flex-1">
              <b className="block text-[11.5px] font-medium">{p.name}</b>
              <span className="block truncate text-[10.5px] text-ink-muted">{scene.preview}</span>
            </div>
            <span
              className={cn(
                "grid size-4.5 flex-none place-items-center rounded-full bg-green-soft text-green-ink transition-[opacity,scale] duration-300",
                k < view.tags ? "scale-100 opacity-100" : "scale-60 opacity-0",
              )}
            >
              <Icon name="check" size={12} strokeWidth={3} />
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2.25 px-5 py-4 bg-chat-thread">
        <span className="self-center text-[10px] text-ink-muted">{scene.date}</span>
        <motion.div
          className={cn(MESSAGE, "self-end rounded-br-sm bg-brand text-white")}
          initial={motionInitial}
          animate={view.step >= 1 ? SHOWN : HIDDEN}
          transition={{ duration: 0.35 }}
        >
          {scene.outgoing}
        </motion.div>
        {view.step < 3 && (
          <div
            aria-hidden="true"
            className={cn(
              "flex gap-0.75 self-start rounded-[14px] bg-lav px-3 py-2.5 transition-opacity duration-200",
              view.step === 2 ? "opacity-100" : "opacity-0",
            )}
          >
            <i className="size-1.25 animate-typing-dot rounded-full bg-ink-muted" />
            <i className="size-1.25 animate-typing-dot rounded-full bg-ink-muted [animation-delay:.15s]" />
            <i className="size-1.25 animate-typing-dot rounded-full bg-ink-muted [animation-delay:.3s]" />
          </div>
        )}
        <motion.div
          ref={replyRef}
          className={cn(MESSAGE, "self-start rounded-bl-sm bg-lav")}
          initial={motionInitial}
          animate={view.step >= 3 ? SHOWN : HIDDEN}
          transition={{ duration: 0.35 }}
        >
          {scene.reply}
        </motion.div>
        <motion.span
          className="inline-flex items-center gap-1.5 self-center rounded-full bg-green-soft px-3 py-1.25 text-[11px] font-medium text-green-ink"
          initial={reduced ? false : { opacity: 0, scale: 0.9 }}
          animate={view.step >= 4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.35 }}
        >
          <Icon name="check" size={12} strokeWidth={3} />
          {scene.confirmed}
        </motion.span>
      </div>
    </div>
  );
}
