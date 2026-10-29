/**
 * "Latest Innovations from PbN" — the four sticky stacking cards and the copy
 * shown inside their infographics.
 */
import { PLACEHOLDER_HREF } from "@/constants/site";

export const INNOVATIONS_HEADING = {
  eyebrow: "What's new",
  title: "Latest Innovations from PbN",
} as const;

/** Sticky-stack scroll effect: the covered card scales to `1 − p·scaleDrop` and dims to `brightness(1 − p·dimDrop)`. */
export const INNOVATION_STACK = {
  scaleDrop: 0.05,
  dimDrop: 0.12,
  /** Scroll tracking runs only while the stack is within this margin of the viewport. */
  trackMargin: "200px 0px",
} as const;

export type InnovationVariant = "lav" | "light" | "dark";
export type InnovationVisual = "receptionist" | "voice" | "payments" | "ai";

export type Innovation = {
  id: string;
  variant: InnovationVariant;
  title: string;
  body: string;
  bullets: readonly string[];
  cta: { label: string; href: string };
  visual: InnovationVisual;
};

export const INNOVATIONS: readonly Innovation[] = [
  {
    id: "ai-receptionist",
    variant: "lav",
    title: "Get 24/7 Call Coverage That Supports Your Team",
    body: "PbN AI Receptionist answers your calls, books patients into your schedule, and identifies when to bring in a real person. It is built into your PbN platform, so there is nothing extra to manage.",
    bullets: [
      "Answer new and existing patient calls around-the-clock.",
      "Book, reschedule, and cancel appointments using your PMS rules.",
      "Communicate with patients in six languages in addition to English.",
      "Escalate billing, urgent, and sensitive issues to your team for approval before transferring calls.",
      "Record, transcribe, and summarize every call in your dashboard.",
    ],
    cta: { label: "Meet PbN AI Receptionist", href: PLACEHOLDER_HREF },
    visual: "receptionist",
  },
  {
    id: "voice",
    variant: "light",
    title: "A Smarter Phone System for Your Dental Practice.",
    body: "Make every call count with a cloud-based phone system that shows you who’s calling, why they’re calling, and what to do next, all synced with your PMS.",
    bullets: [
      "See patient info the moment they call, appointments, balances, notes.",
      "Send automatic texts when you miss a call to avoid lost bookings.",
      "Route calls to the right team member, at the right time.",
      "Track call volume, wait times, and missed calls with easy reports.",
      "Link multiple offices to share calls, schedules, and follow-ups.",
    ],
    cta: { label: "Upgrade Your Phone System", href: PLACEHOLDER_HREF },
    visual: "voice",
  },
  {
    id: "payment-plans",
    variant: "lav",
    title: "Make Patient Care More Affordable",
    body: "Give patients an easier way to say yes to treatment. PbN Payment Plans help you boost case acceptance, improve collections, and reduce admin stress. No third-party financing needed.",
    bullets: [
      "Create custom plans for any treatment or past-due balance.",
      "Let patients sign up from anywhere. No forms. No hassle.",
      "Automate payments and reminders with built-in messaging.",
      "Track payment activity and overdue accounts in real time.",
      "Syncs with your PMS, patient portal, and more.",
    ],
    cta: { label: "Try Payment Plans Today", href: PLACEHOLDER_HREF },
    visual: "payments",
  },
  {
    id: "pbn-ai",
    variant: "light",
    title: "Lighten Your Workload With PbN AI",
    body: "PbN AI helps your team save time on everyday tasks, like call follow-ups, messages, and paperwork, so you can focus on patients and growth.",
    bullets: [
      "Turn calls into clear summaries with patient insights and follow-up actions.",
      "AI writes your texts, emails, and review replies, no need to start from scratch.",
      "Spot trends and missed revenue opportunities with easy AI reports.",
      "Track which calls lead to bookings or cancellations.",
      "Translate messages and summarize forms in seconds.",
    ],
    cta: { label: "Get Started", href: PLACEHOLDER_HREF },
    visual: "ai",
  },
];

/** Per-variant card surface + text colours (complete class strings for Tailwind). */
export const INNOVATION_VARIANT_CLASSES: Record<
  InnovationVariant,
  { card: string; body: string; tick: string; link: string }
> = {
  lav: { card: "bg-surface-lav text-ink", body: "text-ink-soft", tick: "text-brand", link: "text-brand" },
  light: { card: "bg-panel text-ink", body: "text-ink-soft", tick: "text-brand", link: "text-brand" },
  dark: { card: "bg-ink-gradient text-white", body: "text-lav-text", tick: "text-mint", link: "text-mint" },
};

/* --------------------------------------------------------------------------
   Infographic 1 — AI Receptionist
   -------------------------------------------------------------------------- */

export const RECEPTIONIST_UI = {
  incoming: "Incoming Call",
  number: "(555) 123-4567",
  caller: "New Patient",
  agent: "PbN AI Receptionist",
  answering: "Answering",
  coverage: [
    { label: "After-Hours Coverage", icon: "moon", delayClassName: "" },
    { label: "Lunch Coverage", icon: "utensils", delayClassName: "[animation-delay:2s]" },
    { label: "Overflow Coverage", icon: "people", delayClassName: "[animation-delay:4s]" },
  ],
  booked: "Appointment Booked",
  date: "Wed, May 21, 2026",
  time: "10:30 AM · New Patient Exam",
  week: [
    { day: "S", on: false },
    { day: "M", on: false },
    { day: "T", on: false },
    { day: "W", on: true },
    { day: "T", on: false },
    { day: "F", on: false },
    { day: "S", on: false },
  ],
} as const;

/* --------------------------------------------------------------------------
   Infographic 2 — PbN Voice
   -------------------------------------------------------------------------- */

export const VOICE_UI = {
  windowTitle: "Calls",
  toolbar: [
    { icon: "phone", badge: null },
    { icon: "chat", badge: "4" },
    { icon: "people", badge: null },
    { icon: "settings", badge: null },
  ],
  makeCall: "Make a Call",
  filters: [
    { label: "Unknown Only", on: false },
    { label: "Show All", on: true },
    { label: "Incoming Only", on: false },
    { label: "Outgoing Only", on: false },
  ],
  search: "Search",
  columns: ["Date & Time", "Type", "Name", "Source"],
  highlightRow: ["02/05/2027 2:43AM", "Patient", "Sarah P.", "Yelp"],
  incoming: {
    label: "Incoming Call",
    name: "Michael Thompson",
    phone: "866-216-8416",
    note: "New Patient",
  },
} as const;

/* --------------------------------------------------------------------------
   Infographic 3 — Payment Plans
   -------------------------------------------------------------------------- */

export const PAYMENTS_UI = {
  clock: "9:41",
  logoAlt: "Aditi Agarwal Avondale Smiles",
  requestTitle: "One-Time Payment Request",
  payButton: "Make Payment Online",
  totalLabel: "Total Due",
  total: "$900.00",
  options: [
    { title: "Start Payment Plan", detail: "As low as $70 monthly", on: true },
    { title: "Pay Full Amount", detail: "with 30% Discount", on: false },
  ],
  /** Card-and-wallet glyph drawn inside the gradient tile (viewBox 0 0 37 36). */
  tilePaths: {
    thick: [
      "M23.595 16.0723H8.74396C8.57336 16.0723 8.43506 16.2106 8.43506 16.3812V25.1967C8.43506 25.3673 8.57336 25.5056 8.74396 25.5056H23.595C23.7656 25.5056 23.9039 25.3673 23.9039 25.1967V16.3812C23.9039 16.2106 23.7656 16.0723 23.595 16.0723Z",
      "M12.0732 15.7153V11.9552C12.0732 11.5117 12.4297 11.1553 12.8732 11.1553H26.75C27.1935 11.1553 27.55 11.5117 27.55 11.9552V19.7966C27.55 20.2401 27.1935 20.5966 26.75 20.5966H24.0921",
      "M12.1152 13.7705H27.4019",
    ],
    thin: [
      "M12.7872 20.0963C12.5891 20.2944 12.3119 20.4211 12.003 20.4211C11.3852 20.4211 10.8862 19.9221 10.8862 19.3043C10.8862 18.6865 11.3852 18.1875 12.003 18.1875C12.304 18.1875 12.5891 18.3142 12.7872 18.5122",
      "M12.7925 20.0963C12.9984 20.2944 13.2677 20.4211 13.5766 20.4211C14.1944 20.4211 14.6934 19.9221 14.6934 19.3043C14.6934 18.6865 14.1944 18.1875 13.5766 18.1875C13.2756 18.1875 12.9984 18.3142 12.7925 18.5122",
    ],
    dashes: "M11.5005 23.1562H12.7435M14.7759 23.1562H16.0189M18.0581 23.1562H19.3012",
  },
} as const;

/* --------------------------------------------------------------------------
   Infographic 4 — PbN AI
   -------------------------------------------------------------------------- */

export const AI_UI = {
  windowTitle: "Ask PbN",
  question: "Which calls need a follow-up this week?",
  generate: "Generate",
  answerLabel: "PbN AI · Calls answered this week",
  actions: [
    { label: "Create Task", on: true },
    { label: "Draft follow-up text", on: false },
  ],
  days: ["M", "T", "W", "T", "F", "S", "S"],
  tileLabel: "AI",
  /** The "AI" lettering in the floating tile (viewBox 25.7 27.7 67 50.3). */
  tilePath:
    "M60.8588 77.9404L59.0646 73.8286H41.3464L39.5521 77.9404H25.7214L48.1495 27.7015H52.2614L74.6895 77.9404H60.8588ZM54.5042 63.5117L50.2428 52.0733L45.9067 63.5117H54.5042ZM79.7866 77.9404V28.5986H92.6454V77.9404H79.7866Z",
  task: {
    title: "Create Task",
    items: [
      { label: "Call back Mike Thompson", done: true },
      { label: "Send follow-up text", done: false },
    ],
  },
  call: {
    kind: "Phone Call",
    name: "Mike Thompson",
    durationLabel: "Call duration:",
    duration: "02:41",
  },
  /** Tick used in the task checkboxes. */
  tickPath: "M5 12.5l4.5 4.5L19 7.5",
} as const;
