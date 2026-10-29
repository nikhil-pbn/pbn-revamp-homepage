import Image from "next/image";

import { VOICE_UI as UI } from "@/constants/innovations";
import { CALLER_IMAGES } from "@/constants/images";
import { FilledIcon, Icon } from "@/icons";
import { cn } from "@/lib/utils";

import { IgButton, IgCard } from "./ig-card";

const TABLE_ROW = "grid grid-cols-[22px_1.4fr_.8fr_.8fr_.6fr] items-center gap-2 px-1.5 py-2.25";
const SKELETON_ROWS = 5;
const SKELETON_WIDTHS = ["w-3.5", "w-16", "w-11.5", "w-10", "w-7.5"] as const;
const LOADING_DOT_DELAYS = ["", "[animation-delay:.2s]", "[animation-delay:.4s]"] as const;

/** Infographic 2: the calls window, an incoming call card and the in-call control bar. */
export function VoiceUi() {
  return (
    <>
      {/* calls window */}
      <IgCard className="top-0 left-24 flex h-107 w-96 flex-col overflow-hidden text-[10.5px]">
        <div className="flex items-center justify-between bg-lav px-4 py-3 text-[13px] font-medium">
          <span className="flex items-center gap-1.75">
            <Icon name="phone" size={14} strokeWidth={2.2} />
            {UI.windowTitle}
          </span>
          <Icon name="chevronDown" size={16} strokeWidth={2.4} />
        </div>

        <div className="flex items-center gap-2 px-4 py-3">
          {UI.toolbar.map((tool) => (
            <span key={tool.icon} className="relative grid size-7 place-items-center rounded-full shadow-inset-line">
              <Icon name={tool.icon} size={13} strokeWidth={2.2} />
              {tool.badge && (
                <b className="absolute -top-1.25 -right-1 grid h-3.75 min-w-3.75 place-items-center rounded-lg bg-brand text-[9px] font-semibold text-white">
                  {tool.badge}
                </b>
              )}
            </span>
          ))}
          <IgButton className="ml-auto">{UI.makeCall}</IgButton>
        </div>

        <div className="flex flex-col gap-2.5 bg-panel px-4 py-3.5">
          <div className="flex gap-1.5">
            {UI.filters.map((f) => (
              <span
                key={f.label}
                className={cn(
                  "rounded-full px-2.25 py-1 text-[10px]",
                  f.on ? "bg-brand text-white" : "bg-white text-ink-soft shadow-inset-line",
                )}
              >
                {f.label}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.75 rounded-[9px] bg-white px-2.5 py-2 text-ink-muted shadow-inset-line">
            <Icon name="search" size={13} strokeWidth={2.2} />
            {UI.search}
          </div>
        </div>

        <div className="flex flex-col px-3 py-2.5">
          <div className={cn(TABLE_ROW, "rounded-lg bg-panel text-ink-muted")}>
            <span />
            {UI.columns.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          <div className={cn(TABLE_ROW, "animate-row-flash border-b border-line bg-white font-medium")}>
            <span className="size-3 rounded-[3px] shadow-inset-lav-1-5" />
            {UI.highlightRow.map((cell) => (
              <span key={cell}>{cell}</span>
            ))}
          </div>
          {Array.from({ length: SKELETON_ROWS }, (_, row) => (
            <div key={row} className={cn(TABLE_ROW, "border-b border-line")}>
              {SKELETON_WIDTHS.map((w, i) => (
                <i key={i} className={cn("block bg-line", i === 0 ? "h-3 rounded-[3px]" : "h-1.75 rounded-sm", w)} />
              ))}
            </div>
          ))}
        </div>
      </IgCard>

      {/* incoming call */}
      <IgCard float className="top-49 left-0 w-59 bg-brand px-4 pt-3 pb-4 text-white">
        <span className="mb-2.5 flex items-center gap-1.5 text-[10.5px] opacity-85">
          {UI.incoming.label}
          <em className="flex gap-0.75 not-italic">
            {LOADING_DOT_DELAYS.map((delay, i) => (
              <i key={i} className={cn("size-1 animate-dots-fast rounded-full bg-white", delay)} />
            ))}
          </em>
        </span>
        <div className="flex items-center gap-3">
          <Image
            src={CALLER_IMAGES.michaelThompson}
            alt=""
            width={46}
            height={46}
            sizes="46px"
            className="size-11.5 flex-none rounded-full object-cover shadow-ring-white-3"
          />
          <div>
            <b className="block text-[15px] font-medium whitespace-nowrap">{UI.incoming.name}</b>
            <span className="block text-[12.5px]">{UI.incoming.phone}</span>
            <span className="block text-[11.5px] opacity-70">{UI.incoming.note}</span>
          </div>
        </div>
      </IgCard>

      {/* call controls */}
      <IgCard float delay="d2" className="top-96 left-59 flex items-center gap-2 rounded-2xl bg-brand px-3.5 py-2.5">
        <Image
          src={CALLER_IMAGES.frontDeskAgent}
          alt=""
          width={36}
          height={36}
          sizes="36px"
          className="size-9 flex-none rounded-full object-cover shadow-ring-white-3"
        />
        <span className="grid size-7.5 place-items-center rounded-[9px] bg-white text-ink">
          <Icon name="pause" size={13} strokeWidth={2.6} />
        </span>
        <span className="grid size-7.5 place-items-center rounded-[9px] bg-white text-ink">
          <Icon name="micOff" size={13} strokeWidth={2.2} />
        </span>
        <span className="grid size-7.5 place-items-center rounded-[9px] bg-coral text-white">
          <FilledIcon name="hangup" size={15} />
        </span>
        <span className="grid size-7.5 place-items-center rounded-[9px] bg-green text-white">
          <FilledIcon name="phone" size={13} />
        </span>
      </IgCard>
    </>
  );
}
