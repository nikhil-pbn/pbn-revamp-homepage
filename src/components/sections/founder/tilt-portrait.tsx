"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

import { FOUNDER, FOUNDER_MOTION } from "@/constants/founder";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks";

// matches the design's `transition: transform .25s ease-out`
const SPRING = { stiffness: 260, damping: 30, mass: 0.6 };

/** Dr. Aditi's portrait card: tilts toward the cursor with a moving glare (fine pointers only). */
export function TiltPortrait() {
  const reduce = usePrefersReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const enabled = finePointer && !reduce;

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, SPRING);
  const rotateY = useSpring(ry, SPRING);
  const gxRaw = useMotionValue(50);
  const gyRaw = useMotionValue(30);
  const gx = useMotionTemplate`${gxRaw}%`;
  const gy = useMotionTemplate`${gyRaw}%`;
  // CSS custom properties that position the glare gradient (`bg-card-glare`).
  // Spread from a variable: MotionStyle has no index signature for `--*` keys.
  const glareVars = { "--gx": gx, "--gy": gy };

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    ry.set((x - 0.5) * 2 * FOUNDER_MOTION.maxRotateY);
    rx.set((0.5 - y) * 2 * FOUNDER_MOTION.maxRotateX);
    gxRaw.set(x * 100);
    gyRaw.set(y * 100);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div className="perspective-[1000px]" onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div
        className="relative aspect-683/930 overflow-hidden rounded-[26px] bg-photo-bg shadow-photo transform-3d"
        style={{ rotateX, rotateY, ...glareVars }}
      >
        <Image
          src={FOUNDER.image}
          alt={FOUNDER.imageAlt}
          fill
          sizes="(max-width: 1000px) 380px, 400px"
          className="block object-cover object-top"
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-card-glare" />
      </motion.div>
    </div>
  );
}
