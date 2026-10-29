"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { Orb, ProductAvatar } from "@/components/common";
import { MEGA_CAPABILITIES, MEGA_INTRO, MEGA_PROMO, MEGA_SOLUTIONS, PRODUCT_ICONS } from "@/constants/navigation";
import { PLACEHOLDER_HREF } from "@/constants/site";
import { Icon } from "@/icons";

/** Index of the hovered solution, or -1 for the "Platform capabilities" overview. */
type Active = number;

const CAPABILITIES: Active = -1;

/**
 * Solutions mega menu: product tiles on the left; on the right either the
 * platform capabilities overview or the hovered product's features.
 */
export function MegaMenu({ open }: { open: boolean }) {
  const [active, setActive] = useState<Active>(CAPABILITIES);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  // Every time the menu opens it starts on the capabilities overview.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setActive(CAPABILITIES);
  }

  // Small delay when switching between products so a diagonal mouse path
  // towards the right panel does not flick through every tile.
  const arm = (index: number) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setActive(index), active === CAPABILITIES ? 0 : 110);
  };

  return (
    <div className="grid max-h-[calc(100vh-150px)] grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] overflow-y-auto">
      <div className="flex flex-col gap-1.5 pt-[26px] pr-7 pb-[22px] pl-8">
        <h6 className="m-0 flex items-center gap-2 text-xs font-medium tracking-widest text-ink-muted uppercase">
          <Icon name="tooth" size={15} strokeWidth={1.7} className="text-brand" />
          {MEGA_INTRO.title}
        </h6>
        <p className="m-0 mb-2.5 text-[13px] text-ink-soft">{MEGA_INTRO.subtitle}</p>

        <div className="grid grid-cols-2 gap-x-2.5 gap-y-0.5">
          {MEGA_SOLUTIONS.map((solution, index) => {
            const on = active === index;
            return (
              <a
                key={solution.title}
                href={PLACEHOLDER_HREF}
                data-on={on}
                onMouseEnter={() => arm(index)}
                onMouseMove={() => active !== index && arm(index)}
                onMouseLeave={() => clearTimeout(hoverTimer.current)}
                onFocus={() => setActive(index)}
                className="group/tile flex items-start gap-3 rounded-[14px] p-2 transition-colors duration-200 hover:bg-panel data-[on=true]:bg-panel"
              >
                <ProductAvatar
                  avatar={solution.avatar}
                  sizes="46px"
                  className="mt-px size-[46px] rounded-[13px] transition-transform duration-350 ease-pbn group-hover/tile:scale-108 group-hover/tile:-rotate-3 group-data-[on=true]/tile:scale-108 group-data-[on=true]/tile:-rotate-3"
                />
                <span>
                  <b className="block text-sm font-medium text-ink transition-colors duration-200 group-hover/tile:text-brand group-data-[on=true]/tile:text-brand">
                    {solution.title}
                  </b>
                  <small className="block text-xs leading-[1.35] text-ink-muted">{solution.description}</small>
                </span>
              </a>
            );
          })}
        </div>

        <a
          href={PLACEHOLDER_HREF}
          className="mt-auto px-2 pt-3 text-[13px] text-ink-soft underline decoration-line underline-offset-4 hover:text-brand"
        >
          {MEGA_INTRO.seeAll}
        </a>
      </div>

      <div className="flex flex-col gap-1.5 px-8 py-[26px] shadow-divider-left">
        <div className="h-[412px] flex-none">
          {active === CAPABILITIES ? <CapabilitiesPanel /> : <SolutionPanel index={active} />}
        </div>

        <div className="relative mt-5 flex items-center gap-[18px] overflow-hidden rounded-[14px] py-4 pr-[18px] pl-[22px] text-white bg-promo-bar">
          <div>
            <b className="text-[19px] leading-[1.2] font-medium tracking-[-.02em]">{MEGA_PROMO.title}</b>
            <span className="mt-[3px] block text-[12.5px] text-lav-strong">{MEGA_PROMO.text}</span>
          </div>
          <Orb className="ml-auto h-[50px] w-[52px]" />
          <a
            href={MEGA_PROMO.href}
            className="flex-none rounded-full bg-mint px-4 py-[9px] text-[13px] font-medium text-ink transition-transform duration-200 hover:-translate-y-px"
          >
            {MEGA_PROMO.cta}
          </a>
        </div>
      </div>
    </div>
  );
}

function CapabilitiesPanel() {
  return (
    <>
      <h6 className="m-0 flex items-center gap-2 text-xs font-medium tracking-widest text-ink-muted uppercase">
        {MEGA_INTRO.capabilitiesTitle}
      </h6>
      <div className="mt-2 grid grid-cols-3 gap-[18px]">
        {MEGA_CAPABILITIES.map((column) => (
          <div key={column.title}>
            <h6 className="m-0 mb-2 text-xs font-medium text-ink-muted">{column.title}</h6>
            {column.items.map((item) => (
              <a
                key={item}
                href={PLACEHOLDER_HREF}
                className="group/cap flex items-center gap-2.5 py-[7px] text-sm text-ink transition-colors duration-200 hover:text-brand"
              >
                <Icon
                  name={PRODUCT_ICONS[item] ?? "doc"}
                  size={17}
                  strokeWidth={1.7}
                  className="text-ink-soft transition-colors duration-200 group-hover/cap:text-brand"
                />
                <span>{item}</span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function SolutionPanel({ index }: { index: number }) {
  const solution = MEGA_SOLUTIONS[index];

  return (
    <>
      <div className="mt-0.5 mb-3.5 flex items-center gap-3">
        <ProductAvatar avatar={solution.avatar} sizes="38px" className="size-[38px] rounded-[11px]" />
        <b className="text-lg font-medium tracking-[-.02em]">{solution.title}</b>
        <a href={PLACEHOLDER_HREF} className="ml-auto text-[13px] whitespace-nowrap text-brand">
          Explore {solution.title} →
        </a>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
        {solution.features.map((feature, j) => (
          <motion.a
            key={`${solution.title}-${feature.title}`}
            href={PLACEHOLDER_HREF}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: j * 0.035 }}
            className="group/feat flex items-center gap-3 rounded-xl px-2.5 py-[9px] transition-colors duration-200 hover:bg-panel"
          >
            <span className="grid size-[34px] flex-none place-items-center rounded-[10px] bg-lav text-brand">
              <Icon name={PRODUCT_ICONS[feature.title] ?? "doc"} size={17} strokeWidth={1.7} />
            </span>
            <span>
              <b className="block text-sm font-medium transition-colors duration-200 group-hover/feat:text-brand">
                {feature.title}
              </b>
              <small className="block text-xs leading-[1.35] text-ink-muted">{feature.description}</small>
            </span>
          </motion.a>
        ))}
      </div>
    </>
  );
}
