import type { AvatarKey } from "@/constants/images";
import { PLACEHOLDER_HREF, SITE } from "@/constants/site";
import type { IconName } from "@/icons";

type PlatformKpi = {
  label: string;
  value: string;
  /** Fill of the KPI progress bar, 0–100. */
  percent: number;
};

export type PlatformProduct = {
  tab: string;
  slug: string;
  avatar: AvatarKey;
  icon: IconName;
  heading: string;
  body: string;
  bullets: readonly string[];
  dashboardTitle: string;
  kpis: readonly PlatformKpi[];
  chartTitle: string;
  /** 12 bar heights in %. */
  bars: readonly number[];
  ringTitle: string;
  /** Ring gauge value, 0–100. */
  ringValue: number;
  rows: readonly { label: string; value: string }[];
};

export const PLATFORM = {
  heading: "Everything You Need, in One Platform",
  tablistLabel: "PbN products",
  sidebarLabel: "Products in app",
  learnMore: { label: "Learn More", href: PLACEHOLDER_HREF },
  tabTitlePrefix: "PbN · ",
  urlBase: `${SITE.appHost}/`,
  periodChip: "Current month",
  /** Browser traffic-light dots. */
  windowDots: ["bg-coral", "bg-amber", "bg-green"],
  /** Auto-advance interval (ms); the active pill's progress bar fills over the same time. */
  autoAdvanceMs: 8000,
  /** Copy cross-fade: content swaps after this delay (ms). */
  swapDelayMs: 300,
} as const;

export const PLATFORM_PRODUCTS: readonly PlatformProduct[] = [
  {
    tab: "Business Analytics",
    slug: "analytics",
    avatar: "iq",
    icon: "chart",
    heading: "See How Your Practice Is Performing.",
    body: "Track everything from production to payments in one dashboard. Make faster decisions and help your practice grow.",
    bullets: [
      "Monitor production, collections, and case acceptance in real time.",
      "Compare performance by provider, team, or location.",
      "Spot gaps in revenue, scheduling, or insurance workflows.",
      "Set goals and track progress across the team.",
      "Keep every business number at your fingertips.",
    ],
    dashboardTitle: "Practice overview",
    kpis: [
      { label: "Production", value: "$104,249", percent: 72 },
      { label: "Collections", value: "$96,880", percent: 66 },
      { label: "Case acceptance", value: "68%", percent: 68 },
      { label: "New patients", value: "32", percent: 54 },
    ],
    chartTitle: "Production by day",
    bars: [48, 62, 55, 70, 40, 66, 58, 74, 61, 80, 69, 88],
    ringTitle: "Goal progress",
    ringValue: 78,
    rows: [
      { label: "On schedule", value: "$14,751" },
      { label: "Appointments added", value: "72" },
    ],
  },
  {
    tab: "PRM",
    slug: "prm",
    avatar: "text",
    icon: "user",
    heading: "Keep Patients Engaged and Returning.",
    body: "Automated reminders and communication tools help your team stay connected without adding more work.",
    bullets: [
      "Send appointment confirmations, check-ins, and follow-ups.",
      "Request reviews to build your online reputation.",
      "Chat with patients using simple two-way texting.",
      "Reactivate patients who haven't returned in months.",
      "Boost satisfaction and reduce no-shows without extra work.",
    ],
    dashboardTitle: "Patient engagement",
    kpis: [
      { label: "Confirmations sent", value: "1,284", percent: 82 },
      { label: "Reviews requested", value: "214", percent: 60 },
      { label: "Two-way texts", value: "3,906", percent: 74 },
      { label: "Reactivated", value: "86", percent: 44 },
    ],
    chartTitle: "Patients reactivated by day",
    bars: [30, 42, 38, 51, 47, 55, 49, 63, 58, 66, 71, 79],
    ringTitle: "Confirmation rate",
    ringValue: 92,
    rows: [
      { label: "No-shows this month", value: "11" },
      { label: "Avg. rating", value: "4.9 ★" },
    ],
  },
  {
    tab: "Operational Efficiency",
    slug: "operations",
    avatar: "ins",
    icon: "ops",
    heading: "Take the Busywork Off Your Front Desk.",
    body: "Give your team the tools to handle scheduling, payments, forms, and insurance without the manual back-and-forth.",
    bullets: [
      "Automate daily front-office tasks and reduce repetitive manual effort.",
      "Manage the full patient journey from a single, connected dashboard.",
      "Let patients book appointments online and replace paper forms with smart digital check-ins.",
      "Verify insurance eligibility in seconds. No calls, no delays.",
      "Organize team tasks with bulk actions, custom workflows, and clear tracking.",
    ],
    dashboardTitle: "Front office today",
    kpis: [
      { label: "Online bookings", value: "18", percent: 58 },
      { label: "Digital check-ins", value: "41", percent: 80 },
      { label: "Eligibility verified", value: "64", percent: 90 },
      { label: "Open tasks", value: "23", percent: 40 },
    ],
    chartTitle: "Tasks completed by day",
    bars: [52, 60, 57, 66, 63, 72, 68, 75, 70, 82, 79, 90],
    ringTitle: "Tasks completed",
    ringValue: 68,
    rows: [
      { label: "Bulk actions run", value: "6" },
      { label: "Hours saved this week", value: "14" },
    ],
  },
  {
    tab: "PbN AI",
    slug: "ai",
    avatar: "ai",
    icon: "ai",
    heading: "Let AI Handle the Busywork.",
    body: "Automate routine tasks so your team can focus on patients, not paperwork.",
    bullets: [
      "Turn voicemails into transcripts your team can act on.",
      "Summarize and score calls for follow-ups and training.",
      "Auto-text patients when calls are missed.",
      "Reactivate patients and follow up on collections with less effort.",
      "Keep things running smoothly with fewer errors.",
      "Keep patient calls covered 24/7 with PbN AI Receptionist",
    ],
    dashboardTitle: "AI activity",
    kpis: [
      { label: "Voicemails transcribed", value: "148", percent: 70 },
      { label: "Calls summarized", value: "312", percent: 82 },
      { label: "Missed-call texts", value: "57", percent: 48 },
      { label: "AI Receptionist calls", value: "96", percent: 64 },
    ],
    chartTitle: "Calls handled by AI per day",
    bars: [20, 28, 34, 30, 41, 46, 39, 52, 57, 49, 63, 72],
    ringTitle: "Calls covered",
    ringValue: 100,
    rows: [
      { label: "Avg. call score", value: "8.6 / 10" },
      { label: "Follow-ups created", value: "39" },
    ],
  },
  {
    tab: "Dental Marketing",
    slug: "marketing",
    avatar: "sched",
    icon: "mega",
    heading: "Know Which Marketing Fills Your Chairs.",
    body: "Track, automate, and optimize every patient touchpoint in one place. No more juggling multiple tools.",
    bullets: [
      "Unified dashboard tracks calls, leads, and ROI in real time.",
      "See true ROI by source and spend on what converts.",
      "Automate email and text campaigns with 200+ templates.",
      "Capture every lead with instant chat and booking.",
      "Grow your 5-star reputation with automatic review requests.",
    ],
    dashboardTitle: "Marketing performance",
    kpis: [
      { label: "New leads", value: "118", percent: 64 },
      { label: "Booked from leads", value: "41", percent: 52 },
      { label: "Campaigns live", value: "6", percent: 60 },
      { label: "Return on spend", value: "4.2x", percent: 84 },
    ],
    chartTitle: "New patients by day",
    bars: [22, 35, 28, 40, 33, 46, 38, 52, 44, 58, 50, 64],
    ringTitle: "Lead-to-booking",
    ringValue: 35,
    rows: [
      { label: "Top source", value: "Google Ads" },
      { label: "5-star reviews", value: "37" },
    ],
  },
  {
    tab: "PbN Payments",
    slug: "payments",
    avatar: "pay",
    icon: "card",
    heading: "Get Paid In Office, Online or by Text.",
    body: "One integrated platform for everything from card processing to payment plans, with every payment posted back to your PMS.",
    bullets: [
      "Take payments in-office, online, or by text. Flat-rate, no hidden fees.",
      "Instant PMS writebacks and automated reminders.",
      "Keep 100% of your revenue with compliant surcharging.",
      "Free or discounted terminal options.",
      "Customizable financing with no or low interest.",
    ],
    dashboardTitle: "Collections",
    kpis: [
      { label: "Collected", value: "$86,410", percent: 78 },
      { label: "Text-to-pay sent", value: "312", percent: 62 },
      { label: "PMS writebacks", value: "100%", percent: 100 },
      { label: "Payment plans", value: "48", percent: 50 },
    ],
    chartTitle: "Collections by day",
    bars: [55, 48, 63, 70, 52, 66, 74, 61, 79, 68, 83, 90],
    ringTitle: "Deposit ratio",
    ringValue: 94,
    rows: [
      { label: "PMS collection", value: "$1.19M" },
      { label: "Bank collection", value: "$1.12M" },
    ],
  },
  {
    tab: "PbN Voice",
    slug: "voice",
    avatar: "voice",
    icon: "phone",
    heading: "Grow Your Practice With Smarter Call Insights.",
    body: "Simplify patient communication with a phone system built for dental practices. Intelligent, integrated, and cloud-powered VoIP.",
    bullets: [
      "See patient history & appointments the moment they call.",
      "Route calls automatically based on time, team, or location.",
      "Call from anywhere with cloud-based VoIP technology.",
      "Integrate directly with leading practice management systems.",
      "Understand call patterns and team performance with analytics.",
    ],
    dashboardTitle: "Call analytics",
    kpis: [
      { label: "Calls today", value: "184", percent: 74 },
      { label: "Answered", value: "97%", percent: 97 },
      { label: "Avg. wait", value: "0:18", percent: 25 },
      { label: "Booked from calls", value: "64", percent: 58 },
    ],
    chartTitle: "Calls by day",
    bars: [62, 80, 74, 68, 85, 58, 77, 90, 72, 66, 83, 79],
    ringTitle: "Answer rate",
    ringValue: 97,
    rows: [
      { label: "Routed automatically", value: "142" },
      { label: "Voicemails", value: "7" },
    ],
  },
  {
    tab: "Smart Forms",
    slug: "forms",
    avatar: "forms",
    icon: "form",
    heading: "Go Paperless With Digital Forms.",
    body: "Replace paperwork with secure, online forms that sync directly with your practice management system.",
    bullets: [
      "Send forms automatically after appointments are booked.",
      "Customize forms by visit type or provider.",
      "Eliminate printing, scanning, and double entry.",
      "Sync patient data straight into your PMS.",
      "Speed up check-in and reduce bottlenecks at the front desk.",
    ],
    dashboardTitle: "Forms",
    kpis: [
      { label: "Forms sent", value: "228", percent: 70 },
      { label: "Completed", value: "91%", percent: 91 },
      { label: "Synced to PMS", value: "207", percent: 86 },
      { label: "Avg. check-in", value: "4 min", percent: 35 },
    ],
    chartTitle: "Forms completed by day",
    bars: [40, 46, 52, 44, 58, 63, 55, 67, 71, 60, 74, 82],
    ringTitle: "Completion",
    ringValue: 91,
    rows: [
      { label: "Pending signatures", value: "12" },
      { label: "Kiosk check-ins", value: "58" },
    ],
  },
];
