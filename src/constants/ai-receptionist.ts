import type { AvatarKey } from "@/constants/images";
import { PLACEHOLDER_HREF, SITE } from "@/constants/site";
import type { IconName } from "@/icons";

/** "Say Hello to PbN AI Receptionist!" — copy, CTAs, video and the call-flow diagram. */

export type HeadlineWord = { text: string; accent?: boolean };

export const AI_RECEPTIONIST = {
  titleId: "ai-receptionist-title",
  headline: [
    { text: "Say" },
    { text: "Hello", accent: true },
    { text: "to" },
    { text: "PbN" },
    { text: "AI" },
    { text: "Receptionist!" },
  ] as readonly HeadlineWord[],
  body: "PbN AI Receptionist picks up every call, day or night, books patients straight into your schedule and knows when to bring in your team. It’s built into PbN, so there’s nothing extra to manage.",
  learnMore: { label: "Learn More", href: PLACEHOLDER_HREF },
  live: {
    label: "Hear It Live:",
    phone: SITE.receptionistDemoPhone,
    href: `tel:${SITE.receptionistDemoPhone.replace(/-/g, "")}`,
  },
  video: {
    playLabel: "Play video: First-Time Patient, Booked on the Call",
    caption: "Watch a real call: First-Time Patient, Booked on the Call",
    modalLabel: "PbN AI Receptionist video",
    closeLabel: "Close video",
    /**
     * YouTube embed URL for "First-Time Patient, Booked on the Call", played in
     * the modal. `autoplay=1` starts it as soon as the modal opens.
     * While it is empty the modal shows `placeholder`.
     */
    embedUrl: "https://www.youtube.com/embed/Khj2qpSjfYA?autoplay=1&rel=0&playsinline=1" as string,
    embedTitle: "PbN AI Receptionist: First-Time Patient, Booked on the Call",
    placeholder: "[Embed the PbN AI Receptionist video here]",
  },
} as const;

export type FlowNode = {
  title: string;
  subtitle: string;
  /** Icon from `@/icons` by name, or a raw 24×24 path. */
  icon: { name: IconName } | { d: string };
  iconClassName: string;
};

export type FlowBranch = {
  tag: { label: string };
  node: FlowNode;
  result: { label: string };
};

export const CALL_FLOW = {
  ariaLabel: "How PbN AI Receptionist handles a call",
  call: {
    title: "Incoming call",
    subtitle: "(555) 123-4567 · 9:42 PM",
    icon: { name: "phone" },
    iconClassName: "bg-cat-blue",
  } satisfies FlowNode,
  ai: {
    avatar: "rec" satisfies AvatarKey,
    title: "PbN AI Receptionist answers",
    subtitle: "Understands the reason for the call",
  },
  branches: [
    {
      tag: { label: "New patient" },
      node: {
        title: "Books the visit",
        subtitle: "Using your PMS rules",
        // calendar with rounded corners + tick (design path)
        icon: {
          d: "M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM3 10h18M8 3v4M16 3v4M9 15l2 2 4-4",
        },
        iconClassName: "bg-green-ink",
      },
      result: {
        label: "✓ Booked · Wed 10:30 AM",
      },
    },
    {
      tag: { label: "Reschedule" },
      node: {
        title: "Moves the appointment",
        subtitle: "Updates the schedule",
        icon: { name: "refresh" },
        iconClassName: "bg-brand",
      },
      result: {
        label: "✓ Moved to Fri 2:15 PM",
      },
    },
    {
      tag: { label: "Billing question" },
      node: {
        title: "Hands off to your team",
        subtitle: "With a call summary",
        icon: { name: "team" },
        iconClassName: "bg-amber",
      },
      result: {
        label: "✓ Summary sent to front desk",
      },
    },
  ] satisfies readonly FlowBranch[],
} as const;

/** Call-flow loop timings (ms), from the design script. */
export const CALL_FLOW_TIMING = {
  start: 500,
  toAi: 900,
  aiPause: 700,
  toBranch: 1100,
  hold: 2400,
  /** Below this viewport width the diagram is a stacked list without connector lines. */
  stackedMaxWidth: 640,
} as const;
