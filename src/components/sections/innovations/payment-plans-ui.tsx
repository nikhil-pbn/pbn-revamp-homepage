import { useId } from "react";
import Image from "next/image";

import { PAYMENTS_UI as UI } from "@/constants/innovations";
import { BRAND_IMAGES } from "@/constants/images";
import { cn } from "@/lib/utils";

import { IgButton, IgCaption, IgCard } from "./ig-card";

const SIGNAL_BARS = ["h-1.25", "h-1.75", "h-2.25"] as const;
const REQUEST_LINES = ["w-[30%]", "w-full", "w-full", "w-[88%]", "w-full", "w-[40%]"] as const;
const CHART_LINES = ["w-full", "w-[60%]"] as const;
const CHART_BARS = [
  "h-[45%] bg-ink [animation-delay:0s]",
  "h-[75%] bg-brand [animation-delay:.12s]",
  "h-[58%] bg-ink [animation-delay:.24s]",
  "h-full bg-brand [animation-delay:.36s]",
  "h-[70%] bg-ink [animation-delay:.48s]",
] as const;

function Lines({ widths, className }: { widths: readonly string[]; className?: string }) {
  return (
    <span className={cn("flex w-full flex-col gap-1.75", className)}>
      {widths.map((w, i) => (
        <i key={i} className={cn("block h-1.75 rounded-sm bg-line", w)} />
      ))}
    </span>
  );
}

/** Gradient card-and-wallet tile on the payment screen. */
function PaymentTile() {
  const gradientId = useId();
  return (
    <span className="block size-11">
      <svg width="44" height="44" viewBox="0 0 37 36" fill="none" aria-hidden="true" className="block">
        <rect width="36.5134" height="35.8728" rx="17.9364" fill={`url(#${gradientId})`} />
        {UI.tilePaths.thick.map((d) => (
          <path key={d} d={d} className="stroke-surface-faint" strokeWidth="1.58602" strokeMiterlimit="10" />
        ))}
        {UI.tilePaths.thin.map((d) => (
          <path key={d} d={d} className="stroke-surface-faint" strokeWidth=".792054" strokeMiterlimit="10" />
        ))}
        <path d={UI.tilePaths.dashes} className="stroke-surface-faint" strokeWidth="1.58602" strokeLinecap="round" />
        <defs>
          <linearGradient id={gradientId} x1="7.1" y1="8.97" x2="29.48" y2="9.03" gradientUnits="userSpaceOnUse">
            <stop offset=".011" stopColor="currentColor" className="text-brand" />
            <stop offset="1" stopColor="currentColor" className="text-purple" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}

/** Infographic 3: phone payment request, mini chart and the total-due options. */
export function PaymentPlansUi() {
  return (
    <>
      {/* phone payment screen */}
      <IgCard className="top-2 left-65.5 flex h-104 w-51.5 flex-col items-start gap-3 rounded-[34px] px-5 pt-3.5 pb-5.5">
        <div className="flex w-full justify-between text-[10px] font-semibold">
          <span>{UI.clock}</span>
          <span className="flex items-end gap-0.75">
            {SIGNAL_BARS.map((h) => (
              <i key={h} className={cn("w-0.75 rounded-[1px] bg-ink", h)} />
            ))}
          </span>
        </div>
        <Image
          src={BRAND_IMAGES.avondaleSmilesLogo}
          alt={UI.logoAlt}
          width={84}
          height={42}
          sizes="84px"
          className="mb-1 block h-10.5 w-21 self-center"
        />
        <PaymentTile />
        <b className="text-[22px] leading-[1.15] font-semibold tracking-[-0.02em]">{UI.requestTitle}</b>
        <Lines widths={REQUEST_LINES} />
        <IgButton className="mt-auto animate-cta-pulse-slow self-center">{UI.payButton}</IgButton>
      </IgCard>

      {/* mini chart */}
      <IgCard float className="top-8.5 left-15.5 flex h-32 w-37.5 flex-col gap-3.5 p-4">
        <Lines widths={CHART_LINES} className="w-[70%]" />
        <div className="flex flex-1 items-end justify-center gap-2.25">
          {CHART_BARS.map((bar, i) => (
            <i key={i} className={cn("block w-3.25 origin-bottom animate-bar-grow rounded-[4px_4px_2px_2px]", bar)} />
          ))}
        </div>
      </IgCard>

      {/* total due */}
      <IgCard float delay="d2" className="top-49 left-2.5 flex w-59 flex-col items-center gap-1.5 px-4 py-4.5">
        <IgCaption className="text-[10px] tracking-[.06em] uppercase">{UI.totalLabel}</IgCaption>
        <b className="mb-2 text-[26px] font-semibold tracking-[-0.02em]">{UI.total}</b>
        {UI.options.map((opt) => (
          <div
            key={opt.title}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3.5 py-2.75 text-xs",
              opt.on && "bg-brand text-white",
            )}
          >
            <span
              className={cn("size-3.5 flex-none rounded-sm", opt.on ? "shadow-radio-on" : "shadow-inset-lav-1-5")}
            />
            <div>
              <b className="block text-[13px] font-medium">{opt.title}</b>
              <span className={cn("text-[11.5px]", opt.on ? "text-lav-text" : "text-ink-soft")}>{opt.detail}</span>
            </div>
          </div>
        ))}
      </IgCard>
    </>
  );
}
