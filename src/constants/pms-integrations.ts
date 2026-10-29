import { PLACEHOLDER_HREF } from "@/constants/site";

export const PMS_INTEGRATIONS = {
  heading: "PbN Works With the PMS You Already Run",
  lead: "Seamlessly integrates with leading dental practice management systems to keep your tools, data, and workflows in sync.",
  cta: { label: "Explore All Integrations", href: PLACEHOLDER_HREF },
  status: { connecting: "Connecting your PMS…", done: "All systems in sync" },
  hub: {
    label: "PbN syncing with your PMS",
    name: "PbN",
    state: "In sync ✓",
    syncing: "Syncing…",
    synced: "Synced",
    rows: ["Patients", "Appointments", "Production & collections", "Insurance & claims"],
  },
  marqueeLabel: "Supported PMS",
} as const;

/** Every supported PMS. The marquee shows the first 13 on row one and the rest on row two. */
export const PMS_SYSTEMS = [
  "Dentrix",
  "Dentrix Ascend",
  "Eaglesoft",
  "Open Dental",
  "Practice-Web",
  "OrthoTrac",
  "SoftDent",
  "Dolphin Management",
  "Tracker",
  "ClearDent",
  "ABELDent",
  "DSN OMS",
  "DSN Perio",
  "DSN Dental",
  "PracticeWorks",
  "Dentrix Enterprise",
  "Curve Dental",
  "MacPractice",
  "OMSVision",
  "PBS Endo",
  "OMSVision Enterprise",
  "PerioVision",
  "TDO",
  "WinOMS",
  "XLDent",
] as const;

export const PMS_MARQUEE_ROWS = [PMS_SYSTEMS.slice(0, 13), PMS_SYSTEMS.slice(13)] as const;

/** The 10 PMS chips that fly in around the hub, clockwise from the top. */
export const PMS_FEATURED = [
  "Dentrix",
  "Eaglesoft",
  "Open Dental",
  "Curve Dental",
  "Dentrix Ascend",
  "Practice-Web",
  "Dolphin Management",
  "SoftDent",
  "OrthoTrac",
  "PracticeWorks",
] as const;

/**
 * Scroll choreography (progress `e` is the eased 0..1 scroll progress through the pinned scene).
 * Chips rest on an ellipse (radius 38% × 42% of the stage) and start 62% out, rotated 0.9 rad ahead.
 */
export const PMS_SCENE = {
  endRadius: { x: 38, y: 42 },
  startRadius: 62,
  startRotation: 0.9,
  /** Chip arrival `d = clamp(e * speed - i * stagger)`. */
  speed: 1.25,
  stagger: 0.025,
  /** Dashed connector appears once a chip is this far in. */
  lineAt: 0.85,
  /** Hub row `i` flips to "Synced" when `e > rowStart + i * rowStep`. */
  rowStart: 0.55,
  rowStep: 0.1,
  /** Marquee band rises in past this. */
  bandAt: 0.9,
  /** Hub "In sync" badge + final status text past this. */
  doneAt: 0.95,
  /** Gap (px) kept between the marquee band and the next section when pinned. */
  bottomGap: 32,
} as const;
