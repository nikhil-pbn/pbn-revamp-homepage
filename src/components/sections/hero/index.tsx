import { Fragment } from "react";

import { Reveal } from "@/components/common";
import { Button, ButtonArrow } from "@/components/ui/button";
import { HERO_COPY } from "@/constants/hero";

import { DemoStage } from "./demo-stage";
import { FeatureChips } from "./feature-chips";
import { HeroDemo } from "./hero-demo";

/**
 * Homepage hero: headline + feature chips on the left, a scripted live
 * product demo on the right (one scene per chip, looping). The copy stays
 * server-rendered; `HeroDemo` (the `<section>` itself) is the client boundary
 * that runs the demo.
 */
export function Hero() {
  return (
    <HeroDemo
      aria-labelledby="hero-title"
      className="wrap grid grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] items-center gap-10 py-18 max-xl:grid-cols-1 max-xl:gap-14 max-md:pt-10 max-md:pb-2"
    >
      <Reveal className="flex min-w-0 flex-col gap-5.5 max-lg:items-center max-lg:text-center">
        <h1
          id="hero-title"
          className="m-0 max-w-[16em] text-[clamp(30px,2.75vw,42px)] leading-[1.12] font-normal tracking-[-0.035em] text-balance max-lg:mx-auto max-md:text-[28px]"
        >
          {HERO_COPY.headline.map((part, k) =>
            "em" in part ? (
              <em key={k} className="text-brand not-italic">
                {part.text}
              </em>
            ) : (
              <Fragment key={k}>{part.text}</Fragment>
            ),
          )}
        </h1>
        <p className="text-lead max-lg:mx-auto">{HERO_COPY.lead}</p>
        <FeatureChips />
        <div>
          <Button asChild>
            <a href={HERO_COPY.cta.href}>
              {HERO_COPY.cta.label} <ButtonArrow />
            </a>
          </Button>
        </div>
      </Reveal>
      <Reveal>
        <DemoStage />
      </Reveal>
    </HeroDemo>
  );
}
