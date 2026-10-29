import { Fragment } from "react";

import { IconCluster } from "@/components/sections/say-statement/icon-cluster";
import { Button, ButtonArrow } from "@/components/ui/button";
import { CLOSING, CLOSING_CLUSTERS } from "@/constants/closing";

const MARQUEE_ITEM =
  "inline-flex items-center pr-[.35em] text-[length:clamp(48px,6.6vw,96px)] max-md:text-[38px] leading-[1.15] font-normal tracking-[-0.04em] whitespace-nowrap";

/** Closing CTA: giant "Your Practice, Handled." marquee + demo / pricing buttons. */
export function Closing() {
  return (
    <section
      id="demo"
      aria-labelledby="closing-heading"
      className="relative overflow-hidden pt-28 pb-18 text-center max-md:py-section"
    >
      <h2 id="closing-heading" className="sr-only">
        {CLOSING.heading}
      </h2>

      <div aria-hidden="true" className="flex w-max animate-marquee">
        {Array.from({ length: CLOSING.repeats }, (_, i) => (
          <Fragment key={i}>
            {CLOSING.words.map((word, w) => (
              <Fragment key={word}>
                <span className={MARQUEE_ITEM}>{word}</span>
                <span className={MARQUEE_ITEM}>
                  <IconCluster items={CLOSING_CLUSTERS[w]} strokeWidth={CLOSING.clusterStrokeWidth} />
                </span>
              </Fragment>
            ))}
          </Fragment>
        ))}
      </div>

      <p className="wrap mt-6 text-lg text-ink-soft">{CLOSING.subline}</p>

      <div className="mt-5.5 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <a href={CLOSING.primary.href}>
            {CLOSING.primary.label} <ButtonArrow />
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={CLOSING.secondary.href}>{CLOSING.secondary.label}</a>
        </Button>
      </div>
    </section>
  );
}
