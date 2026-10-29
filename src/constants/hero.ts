/**
 * Hero section: headline copy plus every piece of data the scripted
 * "monday-style" product demo plays through (one scene per feature chip).
 */
import type { StaticImageData } from "next/image";

import { PATIENT_IMAGES, TEAM_IMAGES, type AvatarKey } from "@/constants/images";

/* --------------------------------------------------------------------------
   Copy
   -------------------------------------------------------------------------- */

export const HERO_COPY = {
  /** Headline split into runs; `em` runs are brand-coloured. */
  headline: [
    { text: "One Place to " },
    { text: "Run", em: true },
    { text: ", " },
    { text: "Manage", em: true },
    { text: ", and " },
    { text: "Grow", em: true },
    { text: " Your Practice!" },
  ],
  lead: "Designed by dentist, powered by AI, and built around the way your practice actually works, PbN brings everything you need in one platform to streamline daily operations, improve efficiency, and grow with confidence.",
  chipsLabel: "See PbN features in action",
  previewLabel: "PbN product preview: features working on your practice data",
  cta: { label: "Book a Demo", href: "#demo" },
} as const;

/** Static chrome of the fake product board. */
export const HERO_BOARD = {
  menuDots: "···",
  collaborators: [TEAM_IMAGES.collaborator1, TEAM_IMAGES.collaborator2],
  moreCollaborators: "+3",
  automations: "Automations · 6",
  workingLabel: "Working",
  doneLabel: "Done",
  emptyValue: "—",
} as const;

/* --------------------------------------------------------------------------
   Sample patients (headshots from PATIENT_IMAGES)
   -------------------------------------------------------------------------- */

const PATIENT_PHOTO_INDEX = {
  "Emma Wilson": 4,
  "Liam Carter": 3,
  "Ava Patel": 6,
  "Noah Kim": 2,
  "Mia Lopez": 5,
  "Sarah Lee": 1,
  "David Kim": 2,
  "Ana Lopez": 6,
  "James Reed": 0,
  "Olivia Chen": 4,
  "Michael Thompson": 3,
  "Grace Hall": 5,
  "Ethan Brooks": 0,
  "Chloe Adams": 1,
  "Isabella Ross": 4,
  "Jack Turner": 0,
  "Sophia Diaz": 6,
  "Henry Ward": 2,
  "Ella Morgan": 5,
  "Lucas Bennett": 3,
  "Harper Young": 1,
  "Daniel Price": 0,
  "Zoe Martinez": 6,
  "Owen Clarke": 2,
  "Lily Foster": 4,
  "Ryan Scott": 3,
  "Nora Evans": 5,
  "Leo Grant": 0,
} as const;

type PatientName = keyof typeof PATIENT_PHOTO_INDEX;

export type HeroPatient = { name: string; photo: StaticImageData };

function patient(name: PatientName): HeroPatient {
  return { name, photo: PATIENT_IMAGES[PATIENT_PHOTO_INDEX[name]] };
}

/* --------------------------------------------------------------------------
   Scenes
   -------------------------------------------------------------------------- */

type SceneBase = {
  /** Feature chip label. */
  chip: string;
  /** 3D product avatar shown on the chip and the floating status bars. */
  avatar: AvatarKey;
  /** Board title. */
  title: string;
  /** Board tabs (the first one is active). */
  tabs: readonly string[];
  /** Agent name on the "Working" bar. */
  agent: string;
  /** "Working" bar subtitle. */
  working: string;
  /** "Done" bar text. */
  done: string;
  /** Team-member pop-up shown when the scene finishes. */
  member: { image: StaticImageData; role: string; quip: string };
};

export type ReceptionistScene = SceneBase & {
  id: "rec";
  group: string;
  columns: readonly [string, string, string, string];
  calling: string;
  booked: string;
  rows: readonly { patient: HeroPatient; call: string; appointment: string }[];
};

export type VoiceScene = SceneBase & {
  id: "voice";
  caller: HeroPatient;
  phone: string;
  incoming: string;
  onCall: string;
  declineIcon: string;
  acceptIcon: string;
  detailsLabel: string;
  syncedLabel: string;
  details: readonly { icon: string; label: string; value: string }[];
  summaryLabel: string;
  summary: string;
  writtenLabel: string;
};

export type SchedulingScene = SceneBase & {
  id: "sched";
  widgetTitle: string;
  typeLabel: string;
  types: readonly string[];
  dayLabel: string;
  days: readonly { day: string; date: string }[];
  timeLabel: string;
  slots: readonly { time: string; taken?: boolean }[];
  /** Indices the cursor picks in the widget. */
  pick: { type: number; day: number; slot: number };
  confirm: string;
  confirmed: string;
  queueTitle: string;
  queueNote: string;
  pending: string;
  booked: string;
  newRequest: { patient: HeroPatient; detail: string };
  requests: readonly { patient: HeroPatient; detail: string }[];
};

export type PaymentsScene = SceneBase & {
  id: "pay";
  columns: readonly { title: string; dotClassName: string }[];
  cards: readonly { patient: HeroPatient; amount: string; method: string }[];
  /** Card indices per column before the scene plays. */
  initialColumns: readonly [readonly number[], readonly number[], readonly number[]];
};

export type InsuranceScene = SceneBase & {
  id: "ins";
  checking: string;
  verified: string;
  benefits: readonly string[];
  patients: readonly { patient: HeroPatient; insurer: string; coverage: readonly number[] }[];
};

export type FormsScene = SceneBase & {
  id: "forms";
  columns: readonly string[];
  rows: readonly { patient: HeroPatient; form: string; /** steps completed (of 4) */ steps: number }[];
  kiosk: { title: string; text: string; badge: string };
};

export type TextingScene = SceneBase & {
  id: "text";
  inbox: readonly HeroPatient[];
  preview: string;
  date: string;
  outgoing: string;
  reply: string;
  confirmed: string;
};

export type AnalyticsScene = SceneBase & {
  id: "iq";
  kpis: readonly { label: string; value: number; prefix: string; delta: string }[];
  chartLabel: string;
  bars: readonly { day: string; height: number; highlight?: boolean }[];
  gauge: { percent: number; label: string; detail: string };
};

export type HeroScene =
  | ReceptionistScene
  | VoiceScene
  | SchedulingScene
  | PaymentsScene
  | InsuranceScene
  | FormsScene
  | TextingScene
  | AnalyticsScene;

export type HeroSceneId = HeroScene["id"];

export const HERO_SCENES: readonly HeroScene[] = [
  {
    id: "rec",
    chip: "AI Receptionist",
    avatar: "rec",
    title: "Today's schedule",
    tabs: ["Main table", "Calendar", "Call log"],
    agent: "PbN AI Receptionist",
    working: "Answering after-hours calls",
    done: "Booked 5 new patients",
    member: { image: TEAM_IMAGES.officeManager, role: "Office Manager", quip: "No missed calls last night 🎉" },
    group: "New patient calls",
    columns: ["Patient", "Call", "Appointment", "Status"],
    calling: "Calling",
    booked: "Booked",
    rows: [
      { patient: patient("Emma Wilson"), call: "9:42 PM", appointment: "Wed 10:30 AM" },
      { patient: patient("Liam Carter"), call: "10:05 PM", appointment: "Thu 8:00 AM" },
      { patient: patient("Ava Patel"), call: "Lunch · 12:20", appointment: "Fri 2:15 PM" },
      { patient: patient("Noah Kim"), call: "Overflow", appointment: "Mon 9:00 AM" },
      { patient: patient("Mia Lopez"), call: "7:51 AM", appointment: "Tue 11:45 AM" },
    ],
  },
  {
    id: "voice",
    chip: "PbN Voice",
    avatar: "voice",
    title: "Calls",
    tabs: ["Live calls", "Call history", "Analytics"],
    agent: "PbN Voice",
    working: "Showing patient details as the phone rings",
    done: "Call summary written to PMS",
    member: { image: TEAM_IMAGES.frontDesk, role: "Front Desk", quip: "Knew who was calling before I said hello ☎️" },
    caller: patient("Michael Thompson"),
    phone: "(555) 214-0193",
    incoming: "Incoming call…",
    onCall: "On call · 02:14",
    declineIcon: "M4 15c4-4 12-4 16 0l-2 3-3-1v-3a9 9 0 0 0-6 0v3l-3 1z",
    acceptIcon: "M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
    detailsLabel: "Patient details · from your PMS",
    syncedLabel: "Synced",
    details: [
      { icon: "M4 20V10M10 20V4M16 20v-7", label: "Last visit", value: "Mar 12 · Cleaning" },
      { icon: "M3 5h18v16H3zM3 10h18M8 3v4M16 3v4", label: "Upcoming", value: "Wed 10:30 AM · Exam" },
      { icon: "M2 6h20v12H2zM2 10h20", label: "Balance", value: "$120 outstanding" },
      { icon: "M6 2h9l5 5v15H6zM9 13h8M9 17h6", label: "Notes", value: "Prefers morning visits" },
    ],
    summaryLabel: "AI call summary",
    summary: "Patient asked to move his cleaning. Rescheduled to Fri 2:15 PM and sent a confirmation text.",
    writtenLabel: "Written to PMS",
  },
  {
    id: "sched",
    chip: "Online Scheduling",
    avatar: "sched",
    title: "Online booking",
    tabs: ["Booking widget", "Requests", "Google"],
    agent: "Online Booking",
    working: "Booking from your website and Google",
    done: "6 new appointments booked online",
    member: {
      image: TEAM_IMAGES.officeManager,
      role: "Office Manager",
      quip: "Three new patients booked overnight 🗓️",
    },
    widgetTitle: "Book an appointment",
    typeLabel: "Visit type",
    types: ["New patient", "Cleaning", "Emergency"],
    dayLabel: "Day",
    days: [
      { day: "Mon", date: "14" },
      { day: "Tue", date: "15" },
      { day: "Wed", date: "16" },
      { day: "Thu", date: "17" },
      { day: "Fri", date: "18" },
    ],
    timeLabel: "Time",
    slots: [
      { time: "8:00 AM" },
      { time: "9:30 AM", taken: true },
      { time: "10:30 AM" },
      { time: "12:00 PM", taken: true },
      { time: "2:15 PM" },
      { time: "4:00 PM" },
    ],
    pick: { type: 0, day: 2, slot: 2 },
    confirm: "Confirm booking",
    confirmed: "Booked · Wed 10:30 AM",
    queueTitle: "Booking requests",
    queueNote: "Auto-accept on",
    pending: "Pending",
    booked: "Booked",
    newRequest: { patient: patient("Lucas Bennett"), detail: "Website · New patient · Wed 10:30 AM" },
    requests: [
      { patient: patient("Harper Young"), detail: "Website · Cleaning · Tue 8:30 AM" },
      { patient: patient("Daniel Price"), detail: "Google · Emergency · Mon 4:00 PM" },
      { patient: patient("Zoe Martinez"), detail: "Website · New patient · Thu 1:00 PM" },
      { patient: patient("Ella Morgan"), detail: "Google · Cleaning · Fri 9:00 AM" },
    ],
  },
  {
    id: "pay",
    chip: "Payments",
    avatar: "pay",
    title: "Collections",
    tabs: ["Kanban", "Main table", "Deposits"],
    agent: "PbN Payments",
    working: "Sending text-to-pay links",
    done: "Collected $2,480 · posted to PMS",
    member: { image: TEAM_IMAGES.practiceOwner, role: "Practice Owner", quip: "Cash flow looks great 💸" },
    columns: [
      { title: "Balance due", dotClassName: "bg-status-working" },
      { title: "Link sent", dotClassName: "bg-brand" },
      { title: "Paid", dotClassName: "bg-status-done" },
    ],
    cards: [
      { patient: patient("Sarah Lee"), amount: "$240", method: "Text-to-pay" },
      { patient: patient("David Kim"), amount: "$615", method: "Payment plan" },
      { patient: patient("Ana Lopez"), amount: "$180", method: "Card on file" },
      { patient: patient("James Reed"), amount: "$1,120", method: "Payment plan" },
      { patient: patient("Olivia Chen"), amount: "$325", method: "Text-to-pay" },
    ],
    initialColumns: [[0, 1, 2], [3], [4]],
  },
  {
    id: "ins",
    chip: "Insurance",
    avatar: "ins",
    title: "Eligibility",
    tabs: ["Tomorrow", "This week", "Batch verify"],
    agent: "Insurance Verification",
    working: "Verifying tomorrow’s patients",
    done: "12 patients verified",
    member: { image: TEAM_IMAGES.insuranceCoordinator, role: "Insurance Coordinator", quip: "That saved me hours ✓" },
    checking: "Checking",
    verified: "Verified",
    benefits: ["Preventive", "Basic", "Major"],
    patients: [
      { patient: patient("Michael Thompson"), insurer: "Delta Dental", coverage: [100, 80, 50] },
      { patient: patient("Grace Hall"), insurer: "MetLife", coverage: [100, 70, 50] },
      { patient: patient("Ethan Brooks"), insurer: "Cigna", coverage: [100, 80, 60] },
      { patient: patient("Chloe Adams"), insurer: "Aetna", coverage: [100, 90, 50] },
    ],
  },
  {
    id: "forms",
    chip: "Smart Forms",
    avatar: "forms",
    title: "Forms & check-in",
    tabs: ["Pending forms", "Kiosk", "Consents"],
    agent: "Smart Forms",
    working: "Sending forms before appointments",
    done: "5 forms completed · synced to PMS",
    member: { image: TEAM_IMAGES.practiceOwner, role: "Practice Owner", quip: "Paperless check-in, finally 📝" },
    columns: ["Patient · form", "Sent", "Opened", "Signed", "In PMS"],
    rows: [
      { patient: patient("Owen Clarke"), form: "New patient intake", steps: 4 },
      { patient: patient("Lily Foster"), form: "Medical history update", steps: 4 },
      { patient: patient("Ryan Scott"), form: "Treatment consent", steps: 4 },
      { patient: patient("Nora Evans"), form: "Insurance details & ID", steps: 4 },
      { patient: patient("Leo Grant"), form: "New patient intake", steps: 2 },
    ],
    kiosk: { title: "Kiosk check-in", text: " · Owen signed in with PIN", badge: "Ready for visit" },
  },
  {
    id: "text",
    chip: "Patient Texting",
    avatar: "text",
    title: "Inbox",
    tabs: ["All messages", "Unread", "Reminders"],
    agent: "Two-way Texting",
    working: "Sending appointment reminders",
    done: "9 visits confirmed by text",
    member: { image: TEAM_IMAGES.frontDesk, role: "Front Desk", quip: "Tomorrow is fully confirmed 🙌" },
    inbox: [
      patient("Isabella Ross"),
      patient("Jack Turner"),
      patient("Sophia Diaz"),
      patient("Henry Ward"),
      patient("Ella Morgan"),
    ],
    preview: "Reminder: visit tomorrow",
    date: "Today · 9:00 AM",
    outgoing: "Hi Isabella! Your cleaning at Main Street Dental is tomorrow at 10:30 AM. Reply C to confirm.",
    reply: "C 👍 See you then!",
    confirmed: "Appointment confirmed · synced to PMS",
  },
  {
    id: "iq",
    chip: "Practice Analytics",
    avatar: "iq",
    title: "Practice IQ",
    tabs: ["Dashboard", "Providers", "Reports"],
    agent: "Practice IQ",
    working: "Updating today’s numbers",
    done: "Production up 12% this week",
    member: { image: TEAM_IMAGES.associateDentist, role: "Associate Dentist", quip: "Best week this year 📈" },
    kpis: [
      { label: "Production", value: 104249, prefix: "$", delta: "▲ 12%" },
      { label: "Collections", value: 96880, prefix: "$", delta: "▲ 8%" },
      { label: "New patients", value: 32, prefix: "", delta: "▲ 5" },
    ],
    chartLabel: "Production this week",
    bars: [
      { day: "M", height: 46 },
      { day: "T", height: 58 },
      { day: "W", height: 52 },
      { day: "T", height: 70 },
      { day: "F", height: 64 },
      { day: "S", height: 82 },
      { day: "S", height: 94, highlight: true },
    ],
    gauge: { percent: 87, label: "Monthly goal", detail: "$104,249 of $120k" },
  },
];
