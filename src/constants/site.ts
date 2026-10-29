/** Site-wide copy, contact details and anchors. */
export const SITE = {
  name: "Practice by Numbers",
  /** Production origin, used for canonical and Open Graph URLs. */
  url: "https://practicenumbers.com",
  /** Browser UI colour (matches the white header). */
  themeColor: "white",
  shortName: "PbN",
  title: "PbN | One Place to Run, Manage, and Grow Your Practice",
  description:
    "PbN handles your dental practice from the first ring to the final payment: AI receptionist, online scheduling, patient texting, insurance verification, payments and real-time analytics, in one platform that works with your PMS.",
  supportPhone: "+1 866-216-8416",
  supportEmail: "support@practicenumbers.com",
  receptionistDemoPhone: "+1-425-295-2309",
  appHost: "app.practicenumbers.com",
  copyright: "Copyright © 2026 Practice by Numbers. All rights reserved.",
} as const;

/** In-page section anchors. */
export const ANCHORS = {
  top: "#top",
  stories: "#stories",
  founder: "#founder",
  aiReceptionist: "#ai-receptionist",
  team: "#team",
  pricing: "#pricing",
  platform: "#platform",
  pms: "#pms",
  innovations: "#innovations",
  caseStudies: "#case-studies",
  demo: "#demo",
} as const;

/** Placeholder for links whose destination pages do not exist yet. */
export const PLACEHOLDER_HREF = "#";
