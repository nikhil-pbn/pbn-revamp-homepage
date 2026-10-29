import { Button, ButtonArrow } from "@/components/ui/button";
import { PMS_INTEGRATIONS } from "@/constants/pms-integrations";

import { PmsMarquee } from "./pms-marquee";
import { PmsScene } from "./pms-scene";

/** "PbN Works With the PMS You Already Run": scroll-pinned converge scene + PMS marquee. */
export function PmsIntegrations() {
  return (
    <PmsScene
      intro={
        <>
          <h2 id="pms-heading" className="text-display">
            {PMS_INTEGRATIONS.heading}
          </h2>
          <p className="text-lead">{PMS_INTEGRATIONS.lead}</p>
          <Button asChild variant="dark">
            <a href={PMS_INTEGRATIONS.cta.href}>
              {PMS_INTEGRATIONS.cta.label} <ButtonArrow />
            </a>
          </Button>
        </>
      }
      marquee={<PmsMarquee />}
    />
  );
}
