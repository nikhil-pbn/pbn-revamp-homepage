/**
 * Context scene: the AI receptionist illustration standing on the footer edge,
 * surrounded by floating cards that show the practice data she works with.
 */
import type { IconName } from "@/icons";

export const CONTEXT_AVATAR = {
  ariaLabel: "PbN AI Receptionist working with your practice data",
  imageSizes: "(max-width: 860px) min(340px, 84vw), 470px",
} as const;

/**
 * Scroll choreography (design `ctx` script). `p` is the 0..1 progress through the pinned run.
 * zoom = 1 + (startZoom − 1)·(1 − smoothstep(p / zoomUntil));
 * colour = drift = smoothstep((p − revealFrom) / revealSpan).
 */
export const CONTEXT_SCENE = {
  startZoom: 1.2,
  zoomUntil: 0.45,
  revealFrom: 0.08,
  revealSpan: 0.67,
  /** The sketch fades out over the last 1/12 of the colour reveal. */
  sketchFade: 12,
  /** Cards stop this fraction of the figure's width inside her silhouette. */
  overlap: 0.1,
  /** Cards drift vertically towards head height (30% down the figure) by this factor. */
  headY: 0.3,
  driftY: 0.32,
  /** Cards shrink by this much at full drift. */
  cardShrink: 0.1,
  /** Below this width (px) the visible cards just drop by `mobileDriftY` px. */
  mobileBelow: 860,
  mobileDriftY: 48,
  /** Unpinned (mobile) reveal starts when the scene's top is this fraction down the viewport. */
  mobileRevealStart: 0.85,
  /** Scroll tracking runs only while the scene is within this margin of the viewport. */
  trackMargin: "200px 0px",
} as const;

export const CONTEXT_PMS = {
  title: "Syncs With Your PMS",
  icon: "ops" satisfies IconName,
  systems: ["Dentrix", "Eaglesoft", "Open Dental", "Dentrix Ascend"],
  more: "+15",
} as const;

export const CONTEXT_TEXTING = {
  title: "Two-Way Texting",
  icon: "chat2" satisfies IconName,
  incoming: "Can I move my cleaning to Friday?",
  outgoing: "Done! You're booked Fri 2:15 PM ✓",
} as const;

export const CONTEXT_IQ = {
  title: "Practice IQ",
  icon: "chart" satisfies IconName,
  value: "$48,250",
  delta: "+12%",
  caption: "Production · this month",
} as const;

export const CONTEXT_INSURANCE = {
  title: "Insurance Verification",
  icon: "shield" satisfies IconName,
  status: "Verified",
  patients: ["Michael Thompson", "Grace Hall", "Ethan Brooks"],
} as const;

export const CONTEXT_PAYMENT = {
  symbol: "$",
  label: "Collected $2,480 · posted to PMS",
} as const;
