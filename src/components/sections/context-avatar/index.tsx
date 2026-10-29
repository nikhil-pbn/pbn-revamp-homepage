import type { ReactNode } from "react";

import {
  CONTEXT_AVATAR,
  CONTEXT_INSURANCE,
  CONTEXT_IQ,
  CONTEXT_PAYMENT,
  CONTEXT_PMS,
  CONTEXT_TEXTING,
} from "@/constants/context-avatar";
import { Icon, type IconName } from "@/icons";
import { cn } from "@/lib/utils";

import { ContextScene, type ContextCardItem } from "./context-scene";

function CardTitle({ icon, children }: { icon: IconName; children: ReactNode }) {
  return (
    <h6 className="m-0 mb-2.5 flex items-center gap-1.5 text-xs font-medium text-ink-muted">
      <Icon name={icon} size={14} className="text-brand" />
      {children}
    </h6>
  );
}

/** Practice IQ mini chart; the last bar is highlighted. */
const IQ_BARS = ["h-[42%]", "h-[58%]", "h-[50%]", "h-[70%]", "h-[64%]", "h-[86%]", "h-full"] as const;

const CARDS: readonly ContextCardItem[] = [
  {
    id: "pms",
    className: "top-[9%] left-[3%] w-62.5 max-md:hidden",
    content: (
      <>
        <CardTitle icon={CONTEXT_PMS.icon}>{CONTEXT_PMS.title}</CardTitle>
        <div className="flex flex-wrap gap-1.5">
          {CONTEXT_PMS.systems.map((name) => (
            <span key={name} className="rounded-full bg-panel px-2.5 py-1.5 font-medium">
              {name}
            </span>
          ))}
          <span className="rounded-full bg-lav px-2.5 py-1.5 font-medium text-brand">{CONTEXT_PMS.more}</span>
        </div>
      </>
    ),
  },
  {
    id: "texting",
    className: "top-1/2 left-[8%] w-72.5 max-[1100px]:left-0 max-[1100px]:w-65 max-md:hidden",
    content: (
      <>
        <CardTitle icon={CONTEXT_TEXTING.icon}>{CONTEXT_TEXTING.title}</CardTitle>
        <div className="mb-1.5 rounded-[12px_12px_12px_4px] bg-panel px-2.75 py-2 leading-[1.4]">
          {CONTEXT_TEXTING.incoming}
        </div>
        <div className="ml-5.5 rounded-[12px_12px_4px_12px] bg-brand px-2.75 py-2 leading-[1.4] text-white">
          {CONTEXT_TEXTING.outgoing}
        </div>
      </>
    ),
  },
  {
    id: "iq",
    className:
      "top-[7%] right-[3%] w-62.5 max-md:top-auto max-md:right-auto max-md:bottom-[calc(var(--avw)*1.2435+64px)] max-md:left-0 max-md:w-42.5 max-md:p-3 max-md:text-[11px]",
    content: (
      <>
        <CardTitle icon={CONTEXT_IQ.icon}>{CONTEXT_IQ.title}</CardTitle>
        <b className="block text-2xl font-medium tracking-[-0.02em] max-md:text-lg">
          {CONTEXT_IQ.value}
          <em className="ml-1.5 font-medium text-green-ink not-italic">{CONTEXT_IQ.delta}</em>
        </b>
        <small className="text-ink-muted">{CONTEXT_IQ.caption}</small>
        <div className="mt-2.5 flex h-11.5 items-end gap-1.25 max-md:h-7.5">
          {IQ_BARS.map((h, i) => (
            <i key={i} className={cn("flex-1 rounded-t", h, i === IQ_BARS.length - 1 ? "bg-brand" : "bg-lav-mid")} />
          ))}
        </div>
      </>
    ),
  },
  {
    id: "insurance",
    className:
      "top-[47%] right-[8%] w-60 max-[1100px]:right-0 max-md:top-auto max-md:bottom-[calc(var(--avw)*1.2435+64px)] max-md:w-42.5 max-md:p-3 max-md:text-[11px]",
    content: (
      <>
        <CardTitle icon={CONTEXT_INSURANCE.icon}>{CONTEXT_INSURANCE.title}</CardTitle>
        {CONTEXT_INSURANCE.patients.map((name) => (
          <p
            key={name}
            className="m-0 flex items-center justify-between border-t border-line py-1.5 first-of-type:border-t-0"
          >
            {name}
            <span className="font-medium text-green-ink">{CONTEXT_INSURANCE.status}</span>
          </p>
        ))}
      </>
    ),
  },
  {
    id: "payment",
    className:
      "top-[35%] left-[5%] flex items-center gap-2.5 rounded-full py-2.5 pr-3.5 pl-2.5 text-[13px] font-medium max-[1100px]:left-0 max-md:hidden",
    content: (
      <>
        <i className="grid size-7 place-items-center rounded-full bg-green-ink text-white not-italic">
          {CONTEXT_PAYMENT.symbol}
        </i>
        {CONTEXT_PAYMENT.label}
      </>
    ),
  },
];

/** The AI receptionist standing on the footer edge, sketch → colour as you scroll. */
export function ContextAvatar() {
  return (
    <section id="context" aria-label={CONTEXT_AVATAR.ariaLabel} className="relative">
      <ContextScene cards={CARDS} />
    </section>
  );
}
