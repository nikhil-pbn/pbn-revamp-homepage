import type { StaticImageData } from "next/image";

import { CASE_STUDY_IMAGES } from "@/constants/images";
import { PLACEHOLDER_HREF } from "@/constants/site";

export const CASE_STUDIES_COPY = {
  heading: "Case Studies",
  lead: "Real-world examples of smarter dental practice management.",
  readMore: "Read More",
} as const;

export type CaseStudy = {
  title: string;
  date: string;
  dateTime: string;
  image: StaticImageData;
  imageAlt: string;
  href: string;
};

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    title: "Fighting the ‘Frankenstack’: How Atlanta Dental Center Reduced Costs and Simplified Operations",
    date: "June 22, 2026",
    dateTime: "2026-06-22",
    image: CASE_STUDY_IMAGES.atlanta,
    imageAlt: "Atlanta Dental Center case study",
    href: PLACEHOLDER_HREF,
  },
  {
    title: "How Automating with PbN Saved 30+ Hours a Week And Boosted the Bottom-Line",
    date: "May 1, 2026",
    dateTime: "2026-05-01",
    image: CASE_STUDY_IMAGES.baycove,
    imageAlt: "BayCove case study",
    href: PLACEHOLDER_HREF,
  },
  {
    title: "StoneRidge Dental Goes All-in-One with Practice by Numbers",
    date: "February 9, 2023",
    dateTime: "2023-02-09",
    image: CASE_STUDY_IMAGES.stoneridge,
    imageAlt: "StoneRidge Dental case study",
    href: PLACEHOLDER_HREF,
  },
];
