import { Button, ButtonArrow } from "@/components/ui/button";
import { SAY_STATEMENT } from "@/constants/say-statement";

import { IconCluster } from "./icon-cluster";
import { SayReveal } from "./say-reveal";

/** Giant scroll-lit statement + "Book a Demo". */
export function SayStatement() {
  return (
    <SayReveal cluster={<IconCluster items={SAY_STATEMENT.cluster} strokeWidth={SAY_STATEMENT.clusterStrokeWidth} />}>
      <Button asChild size="lg" className="mt-12">
        <a href={SAY_STATEMENT.cta.href}>
          {SAY_STATEMENT.cta.label} <ButtonArrow />
        </a>
      </Button>
    </SayReveal>
  );
}
