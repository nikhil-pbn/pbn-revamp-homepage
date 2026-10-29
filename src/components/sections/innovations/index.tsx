import type { ReactNode } from "react";

import { ArrowLink, CheckList, Reveal } from "@/components/common";
import {
  INNOVATION_VARIANT_CLASSES,
  INNOVATIONS,
  INNOVATIONS_HEADING,
  type Innovation,
  type InnovationVisual,
} from "@/constants/innovations";
import { cn } from "@/lib/utils";

import { IgFrame } from "./ig-frame";
import { PaymentPlansUi } from "./payment-plans-ui";
import { PbnAiUi } from "./pbn-ai-ui";
import { ReceptionistUi } from "./receptionist-ui";
import { StackCards } from "./stack-cards";
import { VoiceUi } from "./voice-ui";

/** Sticky offsets: each card stops 22px lower than the one before. */
const STACK_TOP = [
  "top-[calc(var(--safe-top)+var(--navh)+24px)]",
  "top-[calc(var(--safe-top)+var(--navh)+46px)]",
  "top-[calc(var(--safe-top)+var(--navh)+68px)]",
  "top-[calc(var(--safe-top)+var(--navh)+90px)]",
] as const;

const VISUALS: Record<InnovationVisual, () => ReactNode> = {
  receptionist: ReceptionistUi,
  voice: VoiceUi,
  payments: PaymentPlansUi,
  ai: PbnAiUi,
};

function CardContent({ item }: { item: Innovation }) {
  const tone = INNOVATION_VARIANT_CLASSES[item.variant];
  const Visual = VISUALS[item.visual];

  return (
    <>
      <div className="flex min-w-0 flex-col gap-3.5 max-md:items-center max-md:text-center">
        <h3 className="m-0 text-[clamp(26px,2.6vw,38px)] leading-[1.15] font-normal tracking-[-0.03em] max-md:text-[24px]">
          {item.title}
        </h3>
        <p className={cn("m-0 text-[15px] leading-[1.6]", tone.body)}>{item.body}</p>
        <CheckList
          items={item.bullets}
          tickClassName={tone.tick}
          className="mt-0.5 gap-2 max-md:mx-auto max-md:w-fit max-md:text-left"
          itemClassName="gap-2.5 text-sm leading-normal"
        />
        <ArrowLink href={item.cta.href} className={cn("mt-1.5 max-md:self-center", tone.link)}>
          {item.cta.label}
        </ArrowLink>
      </div>
      <IgFrame>
        <Visual />
      </IgFrame>
    </>
  );
}

/** "Latest Innovations from PbN": four sticky cards that stack as you scroll. */
export function Innovations() {
  const cards = INNOVATIONS.map((item, i) => ({
    id: item.id,
    variant: item.variant,
    className: cn(INNOVATION_VARIANT_CLASSES[item.variant].card, STACK_TOP[i]),
    content: <CardContent item={item} />,
  }));

  return (
    <section
      id="innovations"
      aria-labelledby="innovations-heading"
      className="pt-10 pb-28 max-md:pt-4 max-md:pb-section"
    >
      <div className="wrap">
        <Reveal className="flex flex-col gap-3.5 max-lg:items-center max-lg:text-center">
          <span className="text-eyebrow">{INNOVATIONS_HEADING.eyebrow}</span>
          <h2 id="innovations-heading" className="text-display">
            {INNOVATIONS_HEADING.title}
          </h2>
        </Reveal>
        <StackCards cards={cards} />
      </div>
    </section>
  );
}
