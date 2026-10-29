import { Reveal } from "@/components/common";
import { TEAM_SECTION } from "@/constants/team";

import { TeamPanel } from "./team-panel";

/** "Meet the Rest of Your PbN Team" — feature groups + feature-card carousel. */
export function Team() {
  return (
    <section id="team" aria-labelledby={TEAM_SECTION.titleId} className="pt-30 pb-10 max-md:pt-section max-md:pb-4">
      <div className="wrap">
        <Reveal className="mb-7 flex flex-wrap items-end justify-between gap-6 max-lg:flex-col max-lg:items-center max-lg:text-center">
          <h2 id={TEAM_SECTION.titleId} className="text-display">
            {TEAM_SECTION.title}
          </h2>
          <p className="text-lead m-0 max-w-110">{TEAM_SECTION.lead}</p>
        </Reveal>
        <Reveal>
          <TeamPanel />
        </Reveal>
      </div>
    </section>
  );
}
