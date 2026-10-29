import { ArrowLink, Reveal } from "@/components/common";
import { PROOF_COPY } from "@/constants/proof";

import { ProofStats } from "./proof-stats";
import { TestimonialReel } from "./testimonial-reel";

export function Proof() {
  return (
    <section id="stories" aria-labelledby="proofH" className="mt-14 bg-panel pt-24 pb-22 max-md:mt-6 max-md:py-section">
      <div className="wrap">
        <Reveal className="flex flex-wrap items-end justify-between gap-7 max-lg:flex-col max-lg:items-center max-lg:text-center">
          <div className="flex flex-col gap-3 max-lg:items-center">
            <span className="text-eyebrow">{PROOF_COPY.eyebrow}</span>
            <h2 id="proofH" className="text-display">
              {PROOF_COPY.heading}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-4.5 max-lg:justify-center">
            <div className="flex flex-col gap-0.5 text-[13.5px] text-ink-soft max-lg:items-center">
              <b role="img" aria-label={PROOF_COPY.starsLabel} className="text-[15px] tracking-[2px] text-amber">
                {PROOF_COPY.stars}
              </b>
              <span>
                {PROOF_COPY.reviews}{" "}
                <ArrowLink href={PROOF_COPY.testimonialsLink.href}>{PROOF_COPY.testimonialsLink.label}</ArrowLink>
              </span>
            </div>
          </div>
        </Reveal>
        <ProofStats />
      </div>
      <TestimonialReel />
    </section>
  );
}
