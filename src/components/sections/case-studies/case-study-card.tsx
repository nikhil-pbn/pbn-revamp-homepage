import Image from "next/image";

import type { CaseStudy } from "@/constants/case-studies";

type CaseStudyCardProps = {
  study: CaseStudy;
  readMore: string;
};

export function CaseStudyCard({ study, readMore }: CaseStudyCardProps) {
  return (
    <a
      href={study.href}
      className="group flex w-full flex-col gap-4 rounded-3xl border border-line bg-white p-3 shadow-icard transition-[translate,box-shadow] duration-200 hover:-translate-y-1.5 hover:shadow-icard-hover"
    >
      <div className="relative aspect-video max-w-full overflow-hidden rounded-2xl border border-surface-edge bg-panel">
        <Image
          src={study.image}
          alt={study.imageAlt}
          fill
          sizes="(max-width: 860px) 100vw, (max-width: 1312px) 33vw, 420px"
          className="block object-cover transition-transform duration-600 ease-pbn group-hover:scale-104"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-2 max-md:text-center">
        <time dateTime={study.dateTime} className="text-[12.5px] text-ink-muted">
          {study.date}
        </time>
        <h3 className="m-0 text-[17px] leading-[1.35] font-medium transition-colors duration-200 group-hover:text-brand">
          {study.title}
        </h3>
      </div>
      <div className="mx-2 mb-1.5 flex items-center justify-between border-t border-surface-edge pt-3 text-sm font-medium text-brand">
        <span>{readMore}</span>
        <span
          aria-hidden="true"
          className="grid size-8.5 place-items-center rounded-full bg-lav transition-colors duration-200 group-hover:bg-brand group-hover:text-white"
        >
          →
        </span>
      </div>
    </a>
  );
}
