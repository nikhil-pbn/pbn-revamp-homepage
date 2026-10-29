"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { ProductAvatar } from "@/components/common";
import { HERO_BOARD, type HeroScene } from "@/constants/hero";
import { cn } from "@/lib/utils";

import { EASE_PBN } from "./scene-timing";

const HIDDEN = { opacity: 0, y: 14, scale: 0.96 };
const SHOWN = { opacity: 1, y: 0, scale: 1 };
const TRANSITION = { opacity: { duration: 0.5 }, default: { duration: 0.6, ease: EASE_PBN } };

function FloatingBar({ show, className, children }: { show: boolean; className: string; children: ReactNode }) {
  return (
    <motion.div
      className={cn(
        "absolute z-3 flex items-center gap-3 rounded-2xl bg-white px-2.5 py-2.25 whitespace-nowrap shadow-float max-xl:max-w-[calc(100%-28px)]",
        className,
      )}
      initial={false}
      animate={show ? SHOWN : HIDDEN}
      transition={TRANSITION}
    >
      {children}
    </motion.div>
  );
}

function AgentAvatar({ scene }: { scene: HeroScene }) {
  return (
    <ProductAvatar
      avatar={scene.avatar}
      crop="face"
      sizes="48px"
      className="size-12 rounded-full shadow-agent-avatar"
    />
  );
}

/** The two floating status bars around the board: "Working" (top-left) and "Done" (bottom-left). */
export function StatusBars({ scene, working, done }: { scene: HeroScene; working: boolean; done: boolean }) {
  return (
    <>
      <FloatingBar show={working} className="-top-11 -left-12 max-xl:-top-11.5 max-xl:left-2">
        <AgentAvatar scene={scene} />
        <span className="flex min-w-0 flex-col leading-tight">
          <b className="text-[15px] font-medium tracking-[-0.01em]">{scene.agent}</b>
          <span className="text-xs text-ink-muted max-xl:overflow-hidden max-xl:text-ellipsis">{scene.working}</span>
        </span>
        <span className="ml-3.5 animate-shimmer rounded-[10px] bg-shimmer px-4.5 py-2 text-[13px] font-medium text-brand">
          {HERO_BOARD.workingLabel}
        </span>
      </FloatingBar>
      <FloatingBar show={done} className="-bottom-7.5 -left-7.5 max-xl:-bottom-8.5 max-xl:left-3.5">
        <AgentAvatar scene={scene} />
        <span className="flex min-w-0 flex-col leading-tight">
          <b className="text-[15px] font-medium tracking-[-0.01em]">{scene.done}</b>
        </span>
        <span className="ml-3.5 rounded-[10px] bg-status-done px-4.5 py-2 text-[13px] font-medium text-white">
          {HERO_BOARD.doneLabel}
        </span>
      </FloatingBar>
    </>
  );
}
