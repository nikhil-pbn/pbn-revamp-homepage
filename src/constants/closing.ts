/** Closing call-to-action: the giant "Your Practice, Handled." marquee. */
import { ANCHORS, PLACEHOLDER_HREF } from "@/constants/site";
import type { ClusterIconSpec } from "@/constants/say-statement";

export const CLOSING = {
  heading: "Your Practice, Handled.",
  words: ["Your Practice,", "Handled."],
  /** How many times the "Your Practice, ● Handled. ●" unit repeats in the marquee. */
  repeats: 4,
  /** Stroke width of the clusters' stroke icons. */
  clusterStrokeWidth: 2.4,
  subline: "Book a 1:1 call with a Practice Advisor.",
  primary: { label: "Book a Demo", href: PLACEHOLDER_HREF },
  secondary: { label: "See Pricing", href: ANCHORS.pricing },
} as const;

/** The two coloured icon clusters that follow "Your Practice," and "Handled.". */
export const CLOSING_CLUSTERS: readonly (readonly ClusterIconSpec[])[] = [
  [
    { className: "bg-purple", icon: { kind: "stroke", d: "M5 20V11M10 20V5M15 20v-7M20 20V9" } },
    { className: "bg-green", icon: { kind: "filled", name: "sparkle4" } },
    { className: "bg-amber", icon: { kind: "stroke", d: "M3 6h18v15H3zM3 10h18M8 3v4M16 3v4M9 15l2 2 4-4" } },
  ],
  [
    { className: "bg-green", icon: { kind: "stroke", name: "card" } },
    { className: "bg-purple", icon: { kind: "filled", name: "tooth" } },
  ],
];
