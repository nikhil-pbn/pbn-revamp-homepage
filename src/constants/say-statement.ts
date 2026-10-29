import type { FilledIconName, IconName } from "@/icons";
import { ANCHORS } from "@/constants/site";

/** Marks where the inline icon cluster sits in the statement (it reveals like a word). */
const ICON_CLUSTER_TOKEN = { cluster: true } as const;

export type SayToken = string | typeof ICON_CLUSTER_TOKEN;

/** A run of tokens; `nowrap` keeps the run on one line. */
type SaySegment = { tokens: readonly SayToken[]; nowrap?: boolean };

/** A white icon inside a cluster circle: a named or custom-path stroke icon, or a filled icon. */
export type ClusterIcon =
  | { kind: "stroke"; name: IconName; d?: never }
  | { kind: "stroke"; d: string; name?: never }
  | { kind: "filled"; name: FilledIconName };

/** One circle of an inline icon cluster (also used by the closing marquee). */
export type ClusterIconSpec = {
  /** Circle fill, as a complete Tailwind class. */
  className: string;
  icon: ClusterIcon;
};

/** Team, headset and AI sparkle, overlapping. */
const CLUSTER: readonly ClusterIconSpec[] = [
  { className: "bg-purple", icon: { kind: "stroke", name: "team" } },
  {
    className: "bg-green",
    icon: {
      kind: "stroke",
      // headset with rounded ear cups (the design's rx=1.5 rects)
      d: "M4 14v-2a8 8 0 0 1 16 0v2M4.5 13h1A1.5 1.5 0 0 1 7 14.5v3A1.5 1.5 0 0 1 5.5 19h-1A1.5 1.5 0 0 1 3 17.5v-3A1.5 1.5 0 0 1 4.5 13zM18.5 13h1a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-3a1.5 1.5 0 0 1 1.5-1.5zM19 19a3 3 0 0 1-3 3h-3",
    },
  },
  { className: "bg-amber", icon: { kind: "filled", name: "sparkle4" } },
];

export const SAY_STATEMENT = {
  segments: [
    { tokens: ["Every", "call", "answered.", "Every"] },
    { tokens: ["visit", ICON_CLUSTER_TOKEN, "booked."], nowrap: true },
    { tokens: ["Every", "payment", "collected."] },
  ] satisfies readonly SaySegment[],
  cluster: CLUSTER,
  /** Stroke width of the cluster's stroke icons. */
  clusterStrokeWidth: 2.2,
  cta: { label: "Book a Demo", href: ANCHORS.demo },
} as const;
