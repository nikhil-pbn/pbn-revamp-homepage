import { FOUNDER_IMAGES } from "@/constants/images";
import { PLACEHOLDER_HREF } from "@/constants/site";

export const FOUNDER = {
  eyebrow: "Why PbN exists",
  heading: "Meet Dr. Aditi",
  tags: ["DMD, Co-Founder", "22+ years in dentistry", "5,000+ patients treated"],
  image: FOUNDER_IMAGES.drAditi,
  imageAlt: "Dr. Aditi Agarwal",
  quote:
    "“As a dentist, I know how much heart goes into building a practice and how easily the demands of running one can take time away from what matters most. I started Practice by Numbers because I believed there had to be a better way. My vision has always been to bring everything dentists need into one place, using AI and smart technology to make their lives easier and give them the freedom to focus on their passion, their patients, and the dreams that inspired them to start.”",
  signatureLabel: "Dr. Aditi Agarwal signature",
  storyLink: { label: "Read Dr. Aditi’s Story", href: PLACEHOLDER_HREF },
  marquee: { lead: "A Reason to Smile, ", accent: "for Your Team Too." },
  /** Copies of the marquee phrase laid end to end (the keyframe moves -50%). */
  marqueeRepeat: 4,
} as const;

/** Card tilt + signature reveal tuning from the design. */
export const FOUNDER_MOTION = {
  /** Max tilt in degrees. */
  maxRotateX: 6,
  maxRotateY: 8,
  /** Signature reveal, seconds. */
  signatureDelay: 0.4,
  signatureDuration: 2.2,
} as const;
