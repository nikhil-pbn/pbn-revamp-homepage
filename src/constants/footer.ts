import { ANCHORS, PLACEHOLDER_HREF, SITE } from "@/constants/site";
import type { FilledIconName } from "@/icons";

type LinkGroup = { title: string; links: string[] };

export const FOOTER_CONTACT = [
  { label: SITE.supportPhone, href: PLACEHOLDER_HREF },
  { label: SITE.supportEmail, href: PLACEHOLDER_HREF },
];

export const FOOTER_SOCIAL: { label: string; icon: FilledIconName; size: number; href: string }[] = [
  { label: "Facebook", icon: "facebook", size: 16, href: PLACEHOLDER_HREF },
  { label: "LinkedIn", icon: "linkedin", size: 16, href: PLACEHOLDER_HREF },
  { label: "YouTube", icon: "youtube", size: 16, href: PLACEHOLDER_HREF },
  { label: "X (Twitter)", icon: "x", size: 15, href: PLACEHOLDER_HREF },
];

export const FOOTER_CTA = {
  /** Rendered as two lines that never break internally. */
  lines: ["Run a More Organized,", "Profitable Practice."],
  button: "Book a Demo",
  href: ANCHORS.demo,
};

export const FOOTER_SOLUTIONS_TITLE = "Our Solutions";

export const FOOTER_SOLUTIONS: LinkGroup[] = [
  { title: "Business Analytics", links: ["Practice IQ", "Revenue IQ", "Enterprise Dashboard", "ROI Calculator"] },
  { title: "PbN AI", links: ["Call AI", "Ops AI", "IntelliSuite", "PbN AI Receptionist", "ROI Calculator"] },
  {
    title: "PRM",
    links: [
      "Patient Reminders",
      "Advanced Campaigns",
      "Essential Campaigns",
      "Custom Campaigns",
      "Follow-Up Campaigns",
      "Two-Way Patient Texting",
      "Online Appointment Booking",
      "PbN Voice",
      "Review Management",
      "Patient Portal",
      "ROI Calculator",
    ],
  },
  {
    title: "Operational Efficiency",
    links: [
      "PbN Payments Suite",
      "Patient Flow",
      "Forms and Kiosk",
      "Insurance Verification",
      "Online Appointment Booking",
      "Advanced Task Management",
      "Daily Huddle",
      "Grow App",
      "PbN AI Receptionist",
      "ROI Calculator",
    ],
  },
  { title: "PbN Voice", links: ["PbN Voice", "PbN AI Receptionist", "ROI Calculator"] },
  {
    title: "PbN Payments Suite",
    links: ["Transparent Pricing", "Anywhere Payments", "Payment Plans", "PbN ZeroPay", "ROI Calculator"],
  },
  { title: "Smart Forms", links: ["Smart Forms", "Digital Forms", "Kiosk Check In", "ROI Calculator"] },
  {
    title: "Dental Marketing",
    links: [
      "Marketing IQ",
      "Call Tracking",
      "Marketing ROI",
      "Webchat",
      "Custom Campaigns",
      "Review Management",
      "Online Appointment Booking",
      "ROI Calculator",
    ],
  },
];

export const FOOTER_COLUMNS: LinkGroup[] = [
  {
    title: "Company",
    links: [
      "About Us",
      "Our People",
      "Core Values",
      "Careers at PbN",
      "Partner Program",
      "Pricing",
      "Customers",
      "PbN Insider",
      "Trust",
      "Security & Data Protection",
    ],
  },
  {
    title: "Use Cases",
    links: [
      "Dentists",
      "Office Managers",
      "Single Practices",
      "Multi-Practice",
      "Dental Consultants",
      "DSOs",
      "Marketing Agencies",
    ],
  },
  {
    title: "Compare",
    links: [
      "Weave",
      "Nexhealth",
      "RevenueWell",
      "Dental Intel",
      "Flex Dental",
      "Adit",
      "Yapi",
      "Solutionreach",
      "Lighthouse360",
    ],
  },
  { title: "Resources", links: ["PbN Presents", "PbN Blog", "Podcast", "PbN Learn", "Case Studies"] },
  { title: "Support", links: ["Login", "Kiosk", "Call Us", "Email Us", "Help Center", "Contact Us"] },
  {
    title: "Integrations",
    links: [
      "Dentrix",
      "Dentrix Ascend",
      "Practice Web",
      "EagleSoft",
      "Open Dental",
      "Curve Dental",
      "Explore All Integrations",
    ],
  },
  {
    title: "Legal",
    links: [
      "Privacy Policy",
      "Terms of Use",
      "Cancellation Policy",
      "Payments Terms of Service",
      "VoIP Service Terms",
      "Patient Terms of Service",
    ],
  },
];

export const FOOTER_BOTTOM = {
  copyright: SITE.copyright,
  legal: "Privacy Policy · Terms of Use",
};
