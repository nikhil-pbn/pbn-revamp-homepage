import Image from "next/image";

import { HERO_BOARD, type HeroScene } from "@/constants/hero";
import { cn } from "@/lib/utils";

/** Board header: title, "···" menu, tabs, collaborators and automations count. */
export function BoardChrome({ scene }: { scene: HeroScene }) {
  return (
    <div className="px-5 pt-4">
      <div className="flex items-center justify-between">
        <b className="text-[19px] font-medium tracking-[-0.02em]">{scene.title}</b>
        <span className="tracking-[2px] text-ink-muted" aria-hidden="true">
          {HERO_BOARD.menuDots}
        </span>
      </div>
      <div className="mt-2.5 flex items-center gap-4 border-b border-line text-[11.5px] text-ink-muted">
        {scene.tabs.map((tab, k) => (
          <span key={tab} className={cn("py-1.5", k === 0 ? "text-ink shadow-tab-on" : "max-xl:hidden")}>
            {tab}
          </span>
        ))}
        <span className="flex-1" />
        <span className="flex items-center max-xl:hidden" aria-hidden="true">
          {HERO_BOARD.collaborators.map((src, k) => (
            <Image
              key={k}
              src={src}
              alt=""
              width={22}
              height={22}
              sizes="22px"
              className="-ml-1.5 size-5.5 rounded-full object-cover shadow-ring-white first:ml-0"
            />
          ))}
          <i className="-ml-1.5 grid size-5.5 place-items-center rounded-full bg-lav-strong text-[8.5px] font-semibold text-ink not-italic shadow-ring-white">
            {HERO_BOARD.moreCollaborators}
          </i>
        </span>
        <span className="text-ink-soft max-xl:hidden">{HERO_BOARD.automations}</span>
      </div>
    </div>
  );
}
