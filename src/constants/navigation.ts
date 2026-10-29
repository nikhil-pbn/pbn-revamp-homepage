import type { AvatarKey } from "@/constants/images";
import { ANCHORS, PLACEHOLDER_HREF, SITE } from "@/constants/site";
import type { IconName } from "@/icons";

/* --------------------------------------------------------------------------
   Solutions mega menu
   -------------------------------------------------------------------------- */

export type MegaFeature = { title: string; description: string };

export type MegaSolution = {
  avatar: AvatarKey;
  title: string;
  description: string;
  features: MegaFeature[];
};

const ROI: MegaFeature = { title: "ROI Calculator", description: "See what PbN can do for your practice" };
const AI_RECEPTIONIST: MegaFeature = {
  title: "PbN AI Receptionist",
  description: "Answer every patient call, any time of the day",
};
const ONLINE_BOOKING: MegaFeature = {
  title: "Online Appointment Booking",
  description: "Reads empty slots and writes back appointments",
};

export const MEGA_SOLUTIONS: MegaSolution[] = [
  {
    avatar: "iq",
    title: "Business Analytics",
    description: "Track, analyze, and grow with real-time insights",
    features: [
      { title: "Practice IQ", description: "Optimize your dental practice with data-driven insights" },
      { title: "Revenue IQ", description: "Spot the revenue gaps and reach more patients" },
      { title: "Enterprise Dashboard", description: "Multi-location management made simple" },
      ROI,
    ],
  },
  {
    avatar: "text",
    title: "Patient Relationship Management",
    description: "Everything your practice needs to stay patient-first",
    features: [
      { title: "Patient Reminders", description: "Seamless reminders that sync with your PMS" },
      { title: "Essential Campaigns", description: "Build a practice where patients actually show up" },
      { title: "Follow-Up Campaigns", description: "Never lose track of patients again" },
      { title: "Two Way Patient Texting", description: "Messaging that works both ways" },
      ONLINE_BOOKING,
      { title: "Review Management", description: "Boost your practice with positive reviews" },
      { title: "PbN Voice", description: "The smarter phone system for dental practices" },
      { title: "Patient Portal", description: "Give patients complete control over their care" },
      ROI,
    ],
  },
  {
    avatar: "ins",
    title: "Operational Efficiency",
    description: "Save hours daily with connected workflows",
    features: [
      { title: "PbN Payments Suite", description: "Simplify dental payments with one smart platform" },
      { title: "Patient Flow", description: "Manage every step of the patient journey with ease" },
      { title: "Forms and Kiosk", description: "A friction-free check-in experience from start to finish" },
      { title: "Insurance Verification", description: "Verify all patients in advance, reducing denials" },
      ONLINE_BOOKING,
      { title: "Advanced Task Management", description: "Create, manage, and track tasks across your practice" },
      { title: "Grow App", description: "Manage your practice, anytime, anywhere" },
      { title: "Daily Huddle", description: "Daily huddles that drive results" },
      AI_RECEPTIONIST,
      ROI,
    ],
  },
  {
    avatar: "forms",
    title: "Smart Forms",
    description: "Streamline patient check-in from start to finish",
    features: [
      { title: "Digital Forms", description: "Streamline your workflow with digital patient forms" },
      { title: "Kiosk Check In", description: "Power up your front office with smart kiosk check-in" },
      ROI,
    ],
  },
  {
    avatar: "ai",
    title: "PbN AI",
    description: "Most advanced AI assistant for dental practices",
    features: [
      { title: "Call AI", description: "AI insights that transform every patient call" },
      { title: "Ops AI", description: "Automate admin work instantly with AI" },
      { title: "IntelliSuite", description: "All-in-one AI engine for dental operations" },
      AI_RECEPTIONIST,
      ROI,
    ],
  },
  {
    avatar: "sched",
    title: "Dental Marketing",
    description: "Every marketing tool your practice needs under one roof",
    features: [
      { title: "Marketing IQ", description: "Turn your marketing data into measurable growth" },
      { title: "Call Tracking", description: "Turn every phone call into a better patient experience" },
      { title: "Marketing ROI", description: "Dental marketing performance dashboard" },
      { title: "Webchat", description: "Connect with new and existing patients on your website" },
      { title: "Custom Campaigns", description: "Build custom dental marketing campaigns" },
      { title: "Review Management", description: "Collect & manage dental patient reviews easily" },
      ONLINE_BOOKING,
      ROI,
    ],
  },
  {
    avatar: "pay",
    title: "PbN Payments",
    description: "Simplify how you collect, track, and manage patient payments",
    features: [
      { title: "Anywhere Payments", description: "Make it easy for patients to pay: online or in-office" },
      { title: "Transparent Pricing", description: "Full visibility into every transaction and fee" },
      { title: "Payment Plans", description: "Offer customizable plans without compromising cash flow" },
      { title: "PbN ZeroPay", description: "Eliminate credit card processing fees, compliantly" },
      ROI,
    ],
  },
  {
    avatar: "voice",
    title: "PbN Voice",
    description: "A better call experience for you and your patients",
    features: [AI_RECEPTIONIST, ROI],
  },
  {
    avatar: "rec",
    title: "PbN AI Receptionist",
    description: "Answer every call, schedule every opportunity, 24/7",
    features: [{ title: "PbN AI Receptionist", description: "Answer every call, schedule every opportunity, 24/7" }],
  },
];

/** Icon shown next to each product/feature name. */
export const PRODUCT_ICONS: Record<string, IconName> = {
  "Practice IQ": "gauge",
  "Revenue IQ": "trend",
  "Enterprise Dashboard": "grid",
  "Patient Reminders": "bell",
  "Essential Campaigns": "send",
  "Follow-Up Campaigns": "repeat",
  "Two Way Patient Texting": "chat2",
  "Online Appointment Booking": "calplus",
  "Review Management": "star",
  "PbN Voice": "voice",
  "Patient Portal": "portal",
  "PbN Payments Suite": "wallet",
  "Patient Flow": "flow",
  "Forms and Kiosk": "tablet",
  "Insurance Verification": "shieldok",
  "Advanced Task Management": "tasks",
  "Grow App": "mobile",
  "Daily Huddle": "sun",
  "PbN AI Receptionist": "head",
  "PbN AI": "sparkle",
  "Call AI": "callai",
  "Ops AI": "bolt",
  IntelliSuite: "layers",
  "Dental Marketing Suite": "target",
  "Marketing IQ": "search",
  "Call Tracking": "phonein",
  "Marketing ROI": "roi",
  Webchat: "webchat",
  "Custom Campaigns": "edit",
  "Smart Forms": "file",
  "Digital Forms": "filesig",
  "Kiosk Check In": "kiosk",
  "PbN Payments": "card",
  "Anywhere Payments": "globe",
  "Transparent Pricing": "tag",
  "Payment Plans": "plan",
  "PbN ZeroPay": "zero",
  "ROI Calculator": "chart",
};

export const MEGA_INTRO = {
  title: "One platform for your whole practice",
  subtitle: "Built for front desk, billing and doctors working together",
  seeAll: "See All Solutions →",
  capabilitiesTitle: "Platform capabilities",
};

export const MEGA_CAPABILITIES: { title: string; items: string[] }[] = [
  {
    title: "Analytics & AI",
    items: ["Practice IQ", "Revenue IQ", "Enterprise Dashboard", "Call AI", "Ops AI", "IntelliSuite"],
  },
  {
    title: "Patient Engagement",
    items: [
      "Patient Reminders",
      "Essential Campaigns",
      "Follow-Up Campaigns",
      "Review Management",
      "Patient Portal",
      "Webchat",
    ],
  },
  {
    title: "Operations & Growth",
    items: ["Patient Flow", "Advanced Task Management", "Daily Huddle", "Grow App", "Marketing IQ", "Call Tracking"],
  },
];

export const MEGA_PROMO = {
  title: "PbN AI Receptionist",
  text: "Answer every call, schedule every opportunity, 24/7.",
  cta: "Meet AI Receptionist →",
  href: ANCHORS.aiReceptionist,
};

/* --------------------------------------------------------------------------
   Small dropdown menus
   -------------------------------------------------------------------------- */

export type MenuLink = { title: string; description?: string; icon: IconName };
export type MenuGroup = { title: string; items: MenuLink[] };

/** Icon tile colours, cycled across the items of each small menu. */
export const MENU_TILE_COLORS = [
  "bg-brand",
  "bg-purple",
  "bg-green-ink",
  "bg-amber",
  "bg-cat-blue",
  "bg-cat-pink",
  "bg-indigo",
] as const;

export type NavItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "mega"; label: string }
  | {
      kind: "menu";
      label: string;
      /** Anchor the dropdown to the item's right edge instead of its left. */
      alignRight?: boolean;
      /** Wider columns with single-line titles (Support). */
      wide?: boolean;
      groups: MenuGroup[];
    };

export const NAV_ITEMS: NavItem[] = [
  { kind: "mega", label: "Solutions" },
  {
    kind: "menu",
    label: "Use Cases",
    groups: [
      {
        title: "By Role",
        items: [
          { title: "Office Managers", description: "Streamline daily tasks and manage your practice", icon: "user" },
          { title: "Dentists", description: "Data-driven decisions, complete performance view", icon: "tooth" },
          { title: "Dental Consultants", description: "One-stop, all-encompassing solution", icon: "brief" },
          { title: "Marketing Agencies", description: "Accurate, reliable campaign results", icon: "mega" },
        ],
      },
      {
        title: "By Practice Size",
        items: [
          { title: "Single Practice", description: "Marketing, analytics, payments, VOIP and recall", icon: "home" },
          { title: "Multi Practice", description: "3 offices or 300, you're in good hands", icon: "build" },
          {
            title: "DSOs (Dental Service Organizations)",
            description: "Standardize systems across all locations",
            icon: "build",
          },
        ],
      },
    ],
  },
  { kind: "link", label: "Pricing", href: ANCHORS.pricing },
  {
    kind: "menu",
    label: "Company",
    alignRight: true,
    groups: [
      {
        title: "About",
        items: [
          { title: "About Us", icon: "heart" },
          { title: "Core Values", icon: "star" },
          { title: "Our People", icon: "users" },
        ],
      },
      {
        title: "Work With Us",
        items: [
          { title: "Careers at PbN", icon: "brief" },
          { title: "Partner", description: "Earn revenue share on referred practices", icon: "hand" },
          { title: "Security & Data Protection", icon: "shield" },
        ],
      },
    ],
  },
  { kind: "link", label: "Customers", href: ANCHORS.stories },
  {
    kind: "menu",
    label: "Resources",
    alignRight: true,
    groups: [
      {
        title: "Learn",
        items: [
          { title: "Blog", description: "Insights to build your practice", icon: "doc" },
          { title: "Podcast", description: "Dentistry professionals share their stories", icon: "mic" },
          { title: "PbN Learn", description: "Structured training to simplify learning", icon: "book" },
        ],
      },
      {
        title: "Customers",
        items: [{ title: "Case Studies", description: "How PbN helped practices grow", icon: "star" }],
      },
    ],
  },
  {
    kind: "menu",
    label: "Support",
    alignRight: true,
    wide: true,
    groups: [
      {
        title: "Support",
        items: [
          { title: SITE.supportPhone, description: "Call our support team", icon: "phone" },
          { title: SITE.supportEmail, description: "Email us anytime", icon: "mail" },
          { title: "Help Center", description: "Guides and answers", icon: "help" },
        ],
      },
    ],
  },
];

/** Solutions groups as shown in the mobile menu. */
export const MOBILE_SOLUTION_GROUPS: { title: string; items: string[] }[] = [
  { title: "Business Analytics", items: ["Practice IQ", "Revenue IQ", "Enterprise Dashboard"] },
  {
    title: "Patient Relationship Mgmt",
    items: [
      "Patient Reminders",
      "Essential Campaigns",
      "Follow-Up Campaigns",
      "Two Way Patient Texting",
      "Online Appointment Booking",
      "Review Management",
      "PbN Voice",
      "Patient Portal",
    ],
  },
  {
    title: "Operational Efficiency",
    items: [
      "PbN Payments Suite",
      "Patient Flow",
      "Forms and Kiosk",
      "Insurance Verification",
      "Online Appointment Booking",
      "Advanced Task Management",
      "Grow App",
      "Daily Huddle",
      "PbN AI Receptionist",
    ],
  },
  { title: "PbN AI", items: ["PbN AI", "Call AI", "Ops AI", "IntelliSuite", "PbN AI Receptionist"] },
  {
    title: "Dental Marketing",
    items: [
      "Dental Marketing Suite",
      "Marketing IQ",
      "Call Tracking",
      "Marketing ROI",
      "Webchat",
      "Custom Campaigns",
      "Review Management",
      "Online Appointment Booking",
    ],
  },
  { title: "Smart Forms", items: ["Smart Forms", "Digital Forms", "Kiosk Check In"] },
  {
    title: "PbN Payments",
    items: ["PbN Payments", "Anywhere Payments", "Transparent Pricing", "Payment Plans", "PbN ZeroPay"],
  },
  { title: "PbN Voice", items: ["PbN Voice", "PbN AI Receptionist"] },
  { title: "PbN AI Receptionist", items: ["PbN AI Receptionist"] },
];

/** Links on the right of the header. */
export const HEADER_ACTIONS = {
  utilityLinks: [
    { label: "Kiosk", href: PLACEHOLDER_HREF },
    { label: "Login", href: PLACEHOLDER_HREF },
  ],
  aiSuite: { label: "AI Suite", ariaLabel: "PbN AI Suite", href: PLACEHOLDER_HREF },
  demo: { label: "Book a Demo", href: ANCHORS.demo },
};
