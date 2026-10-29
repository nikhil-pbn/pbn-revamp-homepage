"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/** Honours the OS "reduce motion" setting for every framer-motion animation. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
