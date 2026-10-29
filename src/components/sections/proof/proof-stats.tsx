import { Reveal } from "@/components/common";
import { PROOF_STATS } from "@/constants/proof";

import { ProofStat } from "./proof-stat";

/** White card with four count-up stats. */
export function ProofStats() {
  return (
    <Reveal className="mt-11 grid grid-cols-4 rounded-3xl bg-white px-2 py-7 text-left max-lg:text-center max-md:grid-cols-2 max-md:gap-y-6 max-md:px-0 max-md:py-5">
      {PROOF_STATS.map((stat) => (
        <ProofStat key={stat.label} stat={stat} />
      ))}
    </Reveal>
  );
}
