import type { AvatarKey } from "@/constants/images";
import { PLACEHOLDER_HREF } from "@/constants/site";
import type { IconName } from "@/icons";

/** "Meet the Rest of Your PbN Team" — feature groups and the feature-card carousel. */

export const TEAM_SECTION = {
  titleId: "team-title",
  title: "Meet the Rest of Your PbN Team",
  lead: "From scheduling to payments to insights, every part of your practice in one platform.",
  trackLabel: "PbN features",
  prevLabel: "Previous feature",
  nextLabel: "Next feature",
  learnMore: "Learn More",
} as const;

type TeamCardKey = "rec" | "voice" | "prm" | "ops" | "forms" | "pay" | "ba" | "mkt" | "ai";

export type TeamCard = {
  key: TeamCardKey;
  title: string;
  text: string;
  /** Outcome shown on the glass chip over the avatar. */
  outcome: string;
  /** Complete Tailwind class for the footer icon tile colour. */
  iconClassName: string;
  icon: IconName;
  avatar: AvatarKey;
  href: string;
};

type TeamGroup = {
  title: string;
  text: string;
  cards: readonly TeamCardKey[];
};

export const TEAM_GROUPS: readonly TeamGroup[] = [
  {
    title: "Front Desk",
    text: "Answer every call, keep patients in the loop and bring them back.",
    cards: ["rec", "voice", "prm"],
  },
  {
    title: "Operations & Billing",
    text: "Run check-in, insurance and payments without the manual back-and-forth.",
    cards: ["ops", "forms", "pay"],
  },
  {
    title: "Insights & Growth",
    text: "See how your practice is performing and which marketing fills your chairs.",
    cards: ["ba", "mkt"],
  },
  {
    title: "PbN AI",
    text: "Let AI handle the busywork so your team can focus on patients.",
    cards: ["ai"],
  },
];

export const TEAM_CARDS: Record<TeamCardKey, TeamCard> = {
  rec: {
    key: "rec",
    title: "PbN AI Receptionist",
    text: "Answer every call, schedule every opportunity, 24/7. Knows when to bring in a real person.",
    outcome: "Booked 5 new patients",
    iconClassName: "bg-purple",
    icon: "head",
    avatar: "rec",
    href: PLACEHOLDER_HREF,
  },
  voice: {
    key: "voice",
    title: "PbN Voice",
    text: "A better call experience for you and your patients, with caller insights the moment the phone rings.",
    outcome: "Call summary written to PMS",
    iconClassName: "bg-cat-blue",
    icon: "phone",
    avatar: "voice",
    href: PLACEHOLDER_HREF,
  },
  prm: {
    key: "prm",
    title: "Patient Relationship Management",
    text: "Everything your practice needs to stay patient-first: reminders, campaigns, texting and reviews.",
    outcome: "9 visits confirmed by text",
    iconClassName: "bg-purple",
    icon: "users",
    avatar: "text",
    href: PLACEHOLDER_HREF,
  },
  ops: {
    key: "ops",
    title: "Operational Efficiency",
    text: "Save hours daily with connected workflows for scheduling, insurance, tasks and check-in.",
    outcome: "12 patients verified",
    iconClassName: "bg-green-ink",
    icon: "ops",
    avatar: "ins",
    href: PLACEHOLDER_HREF,
  },
  forms: {
    key: "forms",
    title: "Smart Forms",
    text: "Streamline patient check-in from start to finish with forms that sync to your PMS.",
    outcome: "5 forms completed · synced",
    iconClassName: "bg-amber",
    icon: "form",
    avatar: "forms",
    href: PLACEHOLDER_HREF,
  },
  pay: {
    key: "pay",
    title: "PbN Payments",
    text: "Simplify how you collect, track, and manage patient payments. Flat-rate, no hidden fees.",
    outcome: "Collected $2,480 · posted to PMS",
    iconClassName: "bg-cat-teal",
    icon: "card",
    avatar: "pay",
    href: PLACEHOLDER_HREF,
  },
  ba: {
    key: "ba",
    title: "Business Analytics",
    text: "Track, analyze, and grow with real-time insights on production, collections and case acceptance.",
    outcome: "Production up 12% this week",
    iconClassName: "bg-brand",
    icon: "chart",
    avatar: "iq",
    href: PLACEHOLDER_HREF,
  },
  mkt: {
    key: "mkt",
    title: "Dental Marketing",
    text: "Every marketing tool your practice needs under one roof, with true ROI by source.",
    outcome: "41 new patients from Google Ads",
    iconClassName: "bg-cat-pink",
    icon: "mega",
    avatar: "sched",
    href: PLACEHOLDER_HREF,
  },
  ai: {
    key: "ai",
    title: "PbN AI",
    text: "The most advanced AI assistant for dental practices: call insights, admin automation and more.",
    outcome: "38 call follow-ups drafted",
    iconClassName: "bg-indigo",
    icon: "ai",
    avatar: "ai",
    href: PLACEHOLDER_HREF,
  },
};

/** Carousel order: every group's cards, in group order. */
export const TEAM_CARD_ORDER: readonly TeamCardKey[] = TEAM_GROUPS.flatMap((g) => g.cards);

/** How long a clicked group stays open while the track scrolls to it (ms). */
export const TEAM_GROUP_PICK_HOLD_MS = 1500;
