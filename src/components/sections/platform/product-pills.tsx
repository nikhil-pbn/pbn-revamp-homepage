import { useRef, type KeyboardEvent } from "react";

import { PLATFORM, type PlatformProduct } from "@/constants/platform";
import { cn } from "@/lib/utils";

type ProductPillsProps = {
  products: readonly PlatformProduct[];
  active: number;
  /** While auto-rotating, the active pill's bar fills over the advance interval. */
  running: boolean;
  onSelect: (index: number) => void;
  /** DOM id of the tab at `index` (for the tabpanel's `aria-labelledby`). */
  tabId: (index: number) => string;
  panelId: string;
};

/** Tablist with roving focus: ←/→ move between pills, Home/End jump to the ends. */
export function ProductPills({ products, active, running, onSelect, tabId, panelId }: ProductPillsProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = products.length - 1;
    const next =
      event.key === "ArrowRight"
        ? active === last
          ? 0
          : active + 1
        : event.key === "ArrowLeft"
          ? active === 0
            ? last
            : active - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    onSelect(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={PLATFORM.tablistLabel}
      onKeyDown={onKeyDown}
      className="mx-auto mt-9 flex w-max max-w-full flex-wrap justify-center gap-1 rounded-full bg-panel p-1.25 max-md:w-auto max-md:rounded-[20px]"
    >
      {products.map((product, index) => {
        const selected = index === active;
        return (
          <button
            key={product.slug}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            id={tabId(index)}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(index)}
            className="relative cursor-pointer overflow-hidden rounded-full border-0 bg-transparent px-3.75 py-2 text-sm text-ink-soft transition-[color,background] duration-200 hover:bg-white hover:text-ink aria-selected:bg-white aria-selected:font-medium aria-selected:text-ink aria-selected:shadow-pill-on"
          >
            {product.tab}
            {/* mounted only on the selected pill, so the fill restarts on every selection change */}
            {selected && (
              <span aria-hidden="true" className="absolute inset-x-3.75 bottom-0.75 h-0.5 rounded-xs bg-lav">
                <span className={cn("block h-full w-0 rounded-xs bg-brand", running && "animate-progress-fill")} />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
