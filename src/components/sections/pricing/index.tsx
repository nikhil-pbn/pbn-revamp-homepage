import { Reveal } from "@/components/common";
import { Button, ButtonArrow } from "@/components/ui/button";
import { PRICING } from "@/constants/pricing";

import { TypedPrice } from "./typed-price";

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricingH" className="wrap pt-28 max-md:pt-section">
      <Reveal className="flex flex-col items-center gap-4 rounded-[32px] bg-panel px-10 py-22 text-center max-md:px-5 max-md:py-10">
        <h2 id="pricingH" className="text-display">
          {PRICING.headingLead}
          <TypedPrice text={PRICING.price} msPerChar={PRICING.typeMs} />
        </h2>
        <p className="text-lead">{PRICING.lead}</p>
        <Button asChild>
          <a href={PRICING.cta.href}>
            {PRICING.cta.label} <ButtonArrow />
          </a>
        </Button>
      </Reveal>
    </section>
  );
}
