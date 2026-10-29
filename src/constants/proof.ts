import type { StaticImageData } from "next/image";

import { TESTIMONIAL_IMAGES } from "@/constants/images";
import { PLACEHOLDER_HREF } from "@/constants/site";

export const PROOF_COPY = {
  eyebrow: "Practices that run on PbN",
  heading: "Trusted by 5,000+ Dental Providers",
  stars: "★★★★★",
  starsLabel: "5 out of 5 stars",
  reviews: "Read reviews from practices like yours.",
  testimonialsLink: { label: "View Testimonials", href: PLACEHOLDER_HREF },
  prevLabel: "Previous stories",
  nextLabel: "Next stories",
  playStory: "Play story",
  playStoryAria: "Play story",
  closeVideo: "Close video",
  mute: "Mute",
  unmute: "Unmute",
  videoError: "Video unavailable here",
} as const;

export type ProofStat = { value: number; suffix: string; label: string };

export const PROOF_STATS: readonly ProofStat[] = [
  { value: 375, suffix: "+", label: "Hours Saved Annually" },
  { value: 32, suffix: "%", label: "Decrease in Claim Denials" },
  { value: 40, suffix: "%", label: "More Positive Patient Reviews" },
  { value: 48, suffix: "+", label: "More Chairs Filled" },
];

/** Reel + count-up timings from the design. */
export const PROOF_TIMING = {
  countUpMs: 1400,
  autoAdvanceMs: 3600,
  /** Card stagger: delay = (index % staggerGroup) * staggerMs. */
  staggerMs: 70,
  staggerGroup: 6,
  /** Reel progress bar: minimum fill (%) and tween to a new position (s). */
  progressMinPct: 15,
  progressTweenS: 0.4,
  /** Card video progress bar tween between `timeupdate` events (s). */
  videoProgressTweenS: 0.25,
} as const;

export type Testimonial = {
  tag: string;
  quote: string;
  name: string;
  practice: string;
  image: StaticImageData;
  videoUrl: string;
};

const VIDEO_BASE = "https://practicenumbers.com/wp-content/uploads/2026/10/";

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    tag: "Operational Efficiency",
    quote: "Seamless Front Office Automation for Dentists",
    name: "Dr. Samira Shafaee",
    practice: "Barranca Canyon Dentistry",
    image: TESTIMONIAL_IMAGES.samiraShafaee,
    videoUrl: `${VIDEO_BASE}PbN_Dr._Samira-Shafaee_Testimonial_Compressed-1.mp4`,
  },
  {
    tag: "Patient Payments",
    quote: "Smarter AR Management and Schedule Analytics",
    name: "Dr. Shaina Holman",
    practice: "Holman Family Dental Care",
    image: TESTIMONIAL_IMAGES.shainaHolman,
    videoUrl: `${VIDEO_BASE}PbN_Dr._Shaina_Holman_Testimonial_Compressed.mp4`,
  },
  {
    tag: "Patient Engagement",
    quote: "Time-Saving Patient Forms and Scheduling Tools",
    name: "Dr. Melissa Scaggs",
    practice: "Jose Lane Dentistry",
    image: TESTIMONIAL_IMAGES.melissaScaggs,
    videoUrl: `${VIDEO_BASE}PbN_Dr._melissa_Testimonial_Compressed.mp4`,
  },
  {
    tag: "Easy to Use",
    quote: "Extremely User-Friendly Platform",
    name: "Dr. Jaclyn Johnson",
    practice: "Preston Dental Care",
    image: TESTIMONIAL_IMAGES.jaclynJohnson,
    videoUrl: `${VIDEO_BASE}PbN_Dr._Jaclyn_Johnson_Testimonial_Compressed.mp4`,
  },
  {
    tag: "Practice Insights",
    quote: "Easy-to-Read Data and Powerful Practice Features",
    name: "Dr. Julie Kwon",
    practice: "Kwon & Jabbour Dental",
    image: TESTIMONIAL_IMAGES.julieKwon,
    videoUrl: `${VIDEO_BASE}PbN_Dr._Julie_Kwon_Testimonial_Compressed.mp4`,
  },
  {
    tag: "Patient Engagement",
    quote: "Effortless Data Mining and Patient Messaging",
    name: "Dr. William Moorhead",
    practice: "Flemingsburg Dental Care",
    image: TESTIMONIAL_IMAGES.williamMoorhead,
    videoUrl: `${VIDEO_BASE}PbN_Dr._William_Testimonial_Compressed.mp4`,
  },
  {
    tag: "Customer Support",
    quote: "Customer Service Really Knocks It Out",
    name: "Dr. Eric Block",
    practice: "The Stress-Free Dentist",
    image: TESTIMONIAL_IMAGES.ericBlock,
    videoUrl: `${VIDEO_BASE}PbN_Dr._Eric_Block-_The_Stress_Free_Dentist_Testimonial_Compressed.mp4`,
  },
  {
    tag: "All-in-One Platform",
    quote: "PbN Has Everything We Were Looking For",
    name: "Dr. Ammon Baus",
    practice: "Lehigh Dental",
    image: TESTIMONIAL_IMAGES.ammonBaus,
    videoUrl: `${VIDEO_BASE}PbN_Dr._Ammon_Baus_Lehigh_Dental_Testimonial_Compressed.mp4`,
  },
  {
    tag: "Patient Engagement",
    quote: "Our Patients Enjoy the Convenience of Text-to-Pay",
    name: "Dr. Brittany Eirwin-Maqueda",
    practice: "Reo Family Dental",
    image: TESTIMONIAL_IMAGES.brittanyMaqueda,
    videoUrl: `${VIDEO_BASE}PbN_Dr._Brittany_Maqueda_Testimonial_Compressed.mp4`,
  },
  {
    tag: "Review Management",
    quote: "Elevating Practice Growth in Saturated Markets",
    name: "Dr. Parul Dua Makkar",
    practice: "PDM Family Dentistry",
    image: TESTIMONIAL_IMAGES.parulDuaMakkar,
    videoUrl: `${VIDEO_BASE}PbN_Dr._Parul_Dua_Makkar_Testimonial_Compressed.mp4`,
  },
  {
    tag: "Practice Insights",
    quote: "Actionable Metrics for Maximum Dental Profitability",
    name: "Dr. Rehan Shahid",
    practice: "Shahid Dental Group",
    image: TESTIMONIAL_IMAGES.rehanShahid,
    videoUrl: `${VIDEO_BASE}PbN_Dr._Rehan_Shahid_Testimonial_Compressed.mp4`,
  },
  {
    tag: "All-in-One Platform",
    quote: "Fantastic KPIs and Integrated Patient Texting",
    name: "Dr. Praj Kamat",
    practice: "Transcendentist",
    image: TESTIMONIAL_IMAGES.prajKamat,
    videoUrl: `${VIDEO_BASE}PbN_Dr_Praj_Kamat_Testimonial_Compressed.mp4.mp4`,
  },
  {
    tag: "All-in-One Platform",
    quote: "Transforming Practice Workflow with Integrated Features",
    name: "Sophie Wright",
    practice: "Merrillville Dental Center",
    image: TESTIMONIAL_IMAGES.sophieWright,
    videoUrl: `${VIDEO_BASE}PbN_Dr._Sophie_Testimonial_Compressed.mp4`,
  },
  {
    tag: "All-in-One Platform",
    quote: "The All-in-One Platform We Cannot Operate Without",
    name: "Dr. Robert Stanley and Dr. Bobby Stanley",
    practice: "Stanley Dentistry",
    image: TESTIMONIAL_IMAGES.stanleyBrothers,
    videoUrl: `${VIDEO_BASE}PbN_Dr._Robort__DR._Bobby_Testimonial_Compressed-1.mp4`,
  },
];
