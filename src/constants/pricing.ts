import { ANCHORS } from "@/constants/site";

export const PRICING = {
  headingLead: "Plans from ",
  price: "$249/month.",
  lead: "Replace the tools you’re paying for separately.",
  cta: { label: "Book a Demo", href: ANCHORS.demo },
  /** Typewriter speed, ms per character. */
  typeMs: 95,
} as const;
