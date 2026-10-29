"use client";

import { motion } from "framer-motion";

import { FILLED_ICON_PATHS } from "@/icons";

import type { DemoCursorValues } from "./hero-demo";

/** The brand-coloured pointer that glides to whatever the demo is acting on. */
export function DemoCursor({ x, y, opacity }: DemoCursorValues) {
  return (
    <motion.svg
      aria-hidden="true"
      width={22}
      height={22}
      viewBox="0 0 24 24"
      className="pointer-events-none absolute top-0 left-0 z-4 drop-shadow-cursor"
      style={{ x, y, opacity }}
    >
      <path d={FILLED_ICON_PATHS.cursor} className="fill-brand stroke-white" strokeWidth={1.6} strokeLinejoin="round" />
    </motion.svg>
  );
}
