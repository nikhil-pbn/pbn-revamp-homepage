import { Reveal } from "@/components/common";
import { CASE_STUDIES, CASE_STUDIES_COPY } from "@/constants/case-studies";

import { CaseStudyCard } from "./case-study-card";

export function CaseStudies() {
  return (
    <section id="case-studies" aria-labelledby="csH" className="pt-5 pb-28 max-md:pb-section">
      <div className="wrap">
        <Reveal className="flex flex-col gap-3 max-lg:items-center max-lg:text-center">
          <h2 id="csH" className="text-display">
            {CASE_STUDIES_COPY.heading}
          </h2>
          <p className="text-lead">{CASE_STUDIES_COPY.lead}</p>
        </Reveal>
        <div className="mt-11 grid grid-cols-3 gap-5.5 max-md:grid-cols-1">
          {CASE_STUDIES.map((study) => (
            <Reveal key={study.title} className="flex">
              <CaseStudyCard study={study} readMore={CASE_STUDIES_COPY.readMore} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
