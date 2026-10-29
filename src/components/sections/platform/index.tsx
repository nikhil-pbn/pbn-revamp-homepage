import { Reveal } from "@/components/common";
import { PLATFORM } from "@/constants/platform";

import { PlatformShowcase } from "./platform-showcase";

export function Platform() {
  return (
    <section id="platform" aria-labelledby="platform-heading" className="py-28 max-md:py-section">
      <div className="wrap">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <h2 id="platform-heading" className="text-display-tight">
            {PLATFORM.heading}
          </h2>
        </Reveal>
        <PlatformShowcase />
      </div>
    </section>
  );
}
