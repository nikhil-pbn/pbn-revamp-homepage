"use client";

import { motion } from "framer-motion";

import { PLATFORM, type PlatformProduct } from "@/constants/platform";
import { usePrefersReducedMotion } from "@/hooks";
import { Icon } from "@/icons";
import { cn } from "@/lib/utils";

const EASE = [0.2, 0.8, 0.2, 1] as const;
/** Reduced motion: snap to the end value (initial props stay identical for hydration). */
const INSTANT = { duration: 0 } as const;
/** Circumference of the r=40 ring gauge. */
const RING_LENGTH = 251.3;

type AppWindowProps = {
  products: readonly PlatformProduct[];
  active: number;
  onSelect: (index: number) => void;
};

/** Browser-window mock of the PbN app: chrome, URL bar, sidebar and the active product's dashboard. */
export function AppWindow({ products, active, onSelect }: AppWindowProps) {
  const reduce = usePrefersReducedMotion();
  const product = products[active];

  return (
    <div className="overflow-hidden rounded-xl bg-white">
      {/* chrome */}
      <div className="flex h-9.5 items-end gap-3 bg-lav px-3.5">
        <span className="flex gap-1.5 self-center">
          {PLATFORM.windowDots.map((dot) => (
            <i key={dot} className={cn("block size-2.5 rounded-full", dot)} />
          ))}
        </span>
        <span className="flex h-7.5 max-w-[60%] min-w-0 items-center gap-2 rounded-t-[9px] bg-white px-3.5 text-xs">
          <i className="block size-3 flex-none rounded-[3px] bg-brand" />
          <span className="truncate">
            {PLATFORM.tabTitlePrefix}
            {product.tab}
          </span>
        </span>
      </div>
      <div className="flex h-8.5 items-center border-b border-line px-3.5">
        <span className="flex h-5.5 flex-1 items-center overflow-hidden rounded-[11px] bg-panel px-3 text-[11.5px] whitespace-nowrap text-ink-soft">
          {PLATFORM.urlBase}
          {product.slug}
        </span>
      </div>

      <div className="flex min-h-105">
        <nav
          aria-label={PLATFORM.sidebarLabel}
          className="flex w-44 flex-none flex-col gap-0.75 px-2.5 py-3.5 bg-app-sidebar max-md:hidden"
        >
          {products.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              aria-current={index === active ? "true" : "false"}
              onClick={() => onSelect(index)}
              className="flex cursor-pointer items-center gap-2.5 rounded-[9px] border-0 bg-transparent px-2.5 py-2 text-left text-xs text-white/72 transition-[background,color] duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-mint aria-current:bg-brand aria-current:font-medium aria-current:text-white"
            >
              <Icon name={item.icon} size={15} strokeWidth={1.8} />
              <span>{item.tab}</span>
            </button>
          ))}
        </nav>

        <div className="flex min-w-0 flex-1 flex-col gap-3.5 p-4.5">
          <div className="flex items-center justify-between gap-2.5">
            <b className="text-sm font-medium">{product.dashboardTitle}</b>
            <span className="rounded-full border border-line px-2.5 py-1 text-[11px] whitespace-nowrap text-ink-soft">
              {PLATFORM.periodChip}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2.5 max-md:grid-cols-2">
            {/* keyed per product so each KPI bar re-grows from 0 on every switch */}
            {product.kpis.map((kpi, index) => (
              <div
                key={`${product.slug}-${index}`}
                className="flex min-w-0 flex-col gap-0.75 rounded-xl bg-lav px-3 py-2.5"
              >
                <span className="truncate text-[10.5px] text-ink-soft">{kpi.label}</span>
                <b className="text-[17px] font-medium whitespace-nowrap tabular-nums">{kpi.value}</b>
                <em className="mt-1 block h-1.5 overflow-hidden rounded-[3px] bg-lav-strong">
                  <motion.i
                    className="block h-full rounded-[3px] bg-brand"
                    initial={{ width: "0%" }}
                    animate={{ width: `${kpi.percent}%` }}
                    transition={reduce ? INSTANT : { duration: 0.9, ease: EASE }}
                  />
                </em>
              </div>
            ))}
          </div>

          <div className="grid flex-1 grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-2.5 max-md:grid-cols-1">
            <div className="flex min-w-0 flex-col gap-2 rounded-xl border border-line px-3.5 py-3">
              <b className="text-[12.5px] font-medium">{product.chartTitle}</b>
              <div className="flex min-h-37.5 flex-1 items-end gap-1.75 border-b border-line">
                {product.bars.map((height, index) => (
                  <motion.i
                    key={index}
                    className="flex-1 rounded-t-sm bg-lav-strong last:bg-brand"
                    initial={{ height: "10%" }}
                    animate={{ height: `${height}%` }}
                    transition={reduce ? INSTANT : { duration: 0.8, ease: EASE }}
                  />
                ))}
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-2 rounded-xl border border-line px-3.5 py-3">
              <b className="text-[12.5px] font-medium">{product.ringTitle}</b>
              <div className="flex items-center gap-2.5">
                <svg width="72" height="72" viewBox="0 0 100 100" aria-hidden="true">
                  <circle cx="50" cy="50" r="40" fill="none" strokeWidth="12" className="stroke-lav" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    strokeWidth="12"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    className="stroke-brand"
                    initial={false}
                    animate={{
                      strokeDasharray: `${((product.ringValue * RING_LENGTH) / 100).toFixed(1)} ${RING_LENGTH}`,
                    }}
                    transition={reduce ? INSTANT : { duration: 0.9, ease: EASE }}
                  />
                </svg>
                <b className="text-[22px] text-brand tabular-nums">{product.ringValue}%</b>
              </div>
              <div>
                {product.rows.map((row) => (
                  <div key={row.label} className="flex justify-between gap-2 border-t border-lav pt-2 text-[11.5px]">
                    <span className="text-ink-soft">{row.label}</span>
                    <b className="text-[11.5px] text-brand">{row.value}</b>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
