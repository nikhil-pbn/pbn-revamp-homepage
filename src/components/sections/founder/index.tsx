import { Reveal } from "@/components/common";
import { FOUNDER } from "@/constants/founder";

import { FounderMarquee } from "./founder-marquee";
import { FounderQuote } from "./founder-quote";
import { TiltPortrait } from "./tilt-portrait";

export function Founder() {
  return (
    <section id="founder" aria-labelledby="adhH" className="overflow-hidden pt-24 pb-18 max-md:pt-6 max-md:pb-8">
      <div className="wrap">
        <div className="relative py-6">
          <FounderMarquee />
          <div className="relative grid grid-cols-[minmax(0,1fr)_minmax(0,400px)_minmax(0,1fr)] items-center gap-10 max-lg:grid-cols-1 max-lg:gap-7">
            <Reveal className="flex flex-col gap-4.5 max-lg:items-center max-lg:text-center">
              <span className="text-eyebrow">{FOUNDER.eyebrow}</span>
              <h2
                id="adhH"
                className="m-0 text-[clamp(34px,3.6vw,52px)] leading-[1.08] font-normal tracking-[-0.04em] text-balance max-md:text-[30px]"
              >
                {FOUNDER.heading}
              </h2>
              <div className="flex flex-wrap gap-2 max-lg:justify-center">
                {FOUNDER.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white px-3.5 py-1.75 text-[13px] shadow-inset-line">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal className="max-lg:mx-auto max-lg:w-full max-lg:max-w-95">
              <TiltPortrait />
            </Reveal>
            <FounderQuote />
          </div>
        </div>
      </div>
    </section>
  );
}
