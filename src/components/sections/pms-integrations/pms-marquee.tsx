import { PMS_INTEGRATIONS, PMS_MARQUEE_ROWS } from "@/constants/pms-integrations";
import { cn } from "@/lib/utils";

const ROW_ANIMATIONS = ["animate-marquee-slow", "animate-marquee-slower"] as const;

/** Two counter-scrolling rows of PMS names; hovering a row pauses it. */
export function PmsMarquee() {
  return (
    <>
      {PMS_MARQUEE_ROWS.map((names, row) => (
        <div
          key={row}
          role={row === 0 ? "group" : undefined}
          aria-label={row === 0 ? PMS_INTEGRATIONS.marqueeLabel : undefined}
          aria-hidden={row === 0 ? undefined : true}
          className={cn("group overflow-hidden mask-fade-x", row > 0 && "mt-3")}
        >
          <div className={cn("flex w-max group-hover:paused", ROW_ANIMATIONS[row])}>
            {[0, 1].map((copy) =>
              names.map((name) => (
                <span
                  key={`${copy}-${name}`}
                  aria-hidden={copy === 1 ? true : undefined}
                  className="flex marquee-dot items-center gap-5 pr-5 text-[20px] whitespace-nowrap text-ink-soft"
                >
                  {name}
                </span>
              )),
            )}
          </div>
        </div>
      ))}
    </>
  );
}
