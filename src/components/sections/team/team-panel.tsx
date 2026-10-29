"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

import { ProductAvatar } from "@/components/common";
import { TEAM_CARD_ORDER, TEAM_CARDS, TEAM_GROUP_PICK_HOLD_MS, TEAM_GROUPS, TEAM_SECTION } from "@/constants/team";
import { usePrefersReducedMotion } from "@/hooks";
import { Icon } from "@/icons";
import { cn } from "@/lib/utils";

import { TeamCard } from "./team-card";

/** Matches the track's `gap-5`. */
const CARD_GAP = 20;
/** Card width before the track has rendered (matches `w-80`). */
const FALLBACK_CARD_WIDTH = 320;
const EDGE_TOLERANCE = 4;

function groupOf(index: number) {
  const key = TEAM_CARD_ORDER[index];
  const j = TEAM_GROUPS.findIndex((g) => g.cards.includes(key));
  return j < 0 ? 0 : j;
}

/**
 * Left: accordion of feature groups. Right: scroll-snap carousel of feature cards.
 * Scrolling syncs the dots and opens the matching group; clicking a group scrolls to it.
 */
export function TeamPanel() {
  const reduce = usePrefersReducedMotion();
  const idPrefix = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const pick = useRef<{ group: number; at: number }>({ group: -1, at: 0 });

  const [current, setCurrent] = useState(0);
  const [openGroup, setOpenGroup] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const step = useCallback(() => {
    const first = trackRef.current?.firstElementChild;
    return (first instanceof HTMLElement ? first.offsetWidth : FALLBACK_CARD_WIDTH) + CARD_GAP;
  }, []);

  const index = useCallback(() => Math.round((trackRef.current?.scrollLeft ?? 0) / step()), [step]);

  // Runs at most once per frame; the setters bail out when nothing changed, so
  // scrolling only re-renders when the current card / open group / edges change.
  const sync = useCallback(() => {
    const trk = trackRef.current;
    if (!trk) return;
    const { scrollLeft, scrollWidth, clientWidth } = trk;
    const i = Math.min(TEAM_CARD_ORDER.length - 1, index());
    const forced = pick.current.group > -1 && performance.now() - pick.current.at < TEAM_GROUP_PICK_HOLD_MS;
    setCurrent(i);
    setOpenGroup(forced ? pick.current.group : groupOf(i));
    setAtStart(scrollLeft < EDGE_TOLERANCE);
    setAtEnd(scrollLeft > scrollWidth - clientWidth - EDGE_TOLERANCE);
  }, [index]);

  const go = useCallback(
    (i: number) => {
      trackRef.current?.scrollTo({ left: Math.max(0, i) * step(), behavior: reduce ? "auto" : "smooth" });
    },
    [reduce, step],
  );

  useEffect(() => {
    const trk = trackRef.current;
    if (!trk) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sync);
    };
    // the observer also fires once on observe, which does the initial sync
    const ro = new ResizeObserver(onScroll);
    ro.observe(trk);
    trk.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      trk.removeEventListener("scroll", onScroll);
    };
  }, [sync]);

  /** `at` is the click's event timestamp (same clock as `performance.now()`). */
  const pickGroup = (j: number, at: number) => {
    pick.current = { group: j, at };
    setOpenGroup(j);
    go(TEAM_CARD_ORDER.indexOf(TEAM_GROUPS[j].cards[0]));
  };

  const onTrackKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index() + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index() - 1);
    }
  };

  return (
    <div className="grid grid-cols-[300px_minmax(0,1fr)] items-center gap-8 overflow-hidden rounded-[32px] bg-panel py-10 pl-10 max-[980px]:grid-cols-1 max-[980px]:py-7 max-[980px]:pl-5">
      {/* groups */}
      <div className="flex flex-col gap-2.5 self-center max-[980px]:pr-5">
        {TEAM_GROUPS.map((g, j) => {
          const on = j === openGroup;
          const panelId = `${idPrefix}-group-${j}`;
          return (
            <div
              key={g.title}
              className={cn(
                "rounded-[18px] transition-[background-color,box-shadow] duration-300",
                on && "bg-white shadow-panel-card",
              )}
            >
              <button
                type="button"
                aria-expanded={on}
                aria-controls={panelId}
                onClick={(e) => pickGroup(j, e.timeStamp)}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-2.5 rounded-full border-0 bg-transparent text-left text-ink transition-[box-shadow,background-color] duration-300 focus-visible:rounded-full focus-visible:outline-offset-2",
                  on
                    ? "px-4.5 pt-4 pb-1.5 text-base font-medium shadow-none"
                    : "px-4 py-2.75 text-[14.5px] shadow-inset-line hover:bg-white",
                )}
              >
                {!on && (
                  <span
                    aria-hidden="true"
                    className="grid size-5 flex-none place-items-center rounded-full text-sm leading-none text-ink-soft shadow-[inset_0_0_0_1.5px_currentColor]"
                  >
                    +
                  </span>
                )}
                {g.title}
                {!on && (
                  <span aria-hidden="true" className="ml-auto flex">
                    {g.cards.map((k) => (
                      <ProductAvatar
                        key={k}
                        avatar={TEAM_CARDS[k].avatar}
                        sizes="22px"
                        className="-ml-1.5 size-5.5 rounded-full shadow-ring-panel"
                      />
                    ))}
                  </span>
                )}
              </button>
              <p
                id={panelId}
                className={cn(
                  "m-0 max-h-0 overflow-hidden px-4.5 text-[13.5px] leading-normal text-ink-soft opacity-0 transition-[max-height,opacity,padding] duration-[400ms,300ms,300ms] ease-[ease]",
                  on && "max-h-30 pb-4 opacity-100",
                )}
              >
                {g.text}
              </p>
            </div>
          );
        })}
      </div>

      {/* carousel */}
      <div className="relative min-w-0">
        <div
          ref={trackRef}
          role="region"
          aria-label={TEAM_SECTION.trackLabel}
          tabIndex={0}
          onKeyDown={onTrackKey}
          className="no-scrollbar flex snap-x snap-mandatory scroll-pl-0.5 gap-5 overflow-x-auto scroll-smooth py-1.5 pr-10 pl-0.5"
        >
          {TEAM_CARD_ORDER.map((k, i) => (
            <TeamCard key={k} card={TEAM_CARDS[k]} dim={i < current} />
          ))}
        </div>

        <div className="pointer-events-none absolute top-[calc(16px+300px*495/560/2)] right-7 -left-3.5 flex justify-between max-[980px]:hidden">
          <NavButton
            label={TEAM_SECTION.prevLabel}
            icon="chevronLeft"
            disabled={atStart}
            onClick={() => go(index() - 1)}
          />
          <NavButton
            label={TEAM_SECTION.nextLabel}
            icon="chevronRight"
            disabled={atEnd}
            onClick={() => go(index() + 1)}
          />
        </div>

        <div aria-hidden="true" className="mt-4 flex justify-center gap-1.5 pr-10 max-[980px]:pr-5">
          {TEAM_CARD_ORDER.map((k, i) => (
            <i
              key={k}
              className={cn(
                "size-1.5 rounded-full bg-dot-idle transition-[width,background-color] duration-300",
                i === current && "w-5 bg-brand",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function NavButton({
  label,
  icon,
  disabled,
  onClick,
}: {
  label: string;
  icon: "chevronLeft" | "chevronRight";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="pointer-events-auto grid size-9.5 cursor-pointer place-items-center rounded-full border-0 bg-white p-0 text-ink shadow-round-btn transition-[opacity,scale] duration-200 hover:scale-106 focus-visible:rounded-full focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-0"
    >
      <Icon name={icon} size={18} strokeWidth={2.2} />
    </button>
  );
}
