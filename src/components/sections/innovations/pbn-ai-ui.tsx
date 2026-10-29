import Image from "next/image";

import { AI_UI as UI } from "@/constants/innovations";
import { CALLER_IMAGES } from "@/constants/images";
import { AiSparkle, Icon } from "@/icons";
import { cn } from "@/lib/utils";

import { IgCard } from "./ig-card";

const BAR_CLASSES = [
  "h-[46%] bg-lav-strong [animation-delay:0s]",
  "h-[62%] bg-lav-strong [animation-delay:.08s]",
  "h-[54%] bg-lav-strong [animation-delay:.16s]",
  "h-[78%] bg-lav-strong [animation-delay:.24s]",
  "h-full bg-brand [animation-delay:.32s]",
  "h-[40%] bg-lav-strong [animation-delay:.4s]",
  "h-[30%] bg-lav-strong [animation-delay:.48s]",
] as const;

/** Infographic 4: "Ask PbN" window, AI tile, task card and summarised call. */
export function PbnAiUi() {
  return (
    <>
      {/* Ask PbN window */}
      <IgCard className="top-4.5 left-30 flex h-102.5 w-91 flex-col overflow-hidden text-xs">
        <div className="flex items-center justify-between bg-lav px-4 py-3 text-[13px] font-medium">
          <span className="flex items-center gap-1.75">
            <AiSparkle width={17} className="text-brand" />
            {UI.windowTitle}
          </span>
          <Icon name="chevronDown" size={16} strokeWidth={2.4} />
        </div>

        <div className="flex items-center gap-2 bg-panel px-4 py-3.5">
          <div className="flex min-w-0 flex-1 items-center gap-0.5 overflow-hidden rounded-[10px] bg-white px-3 py-2.5 text-[11.5px] whitespace-nowrap shadow-inset-line">
            <span className="inline-block max-w-0 animate-type overflow-hidden motion-reduce:max-w-none">
              {UI.question}
            </span>
            <i className="h-3.5 w-[1.5px] animate-caret bg-brand" />
          </div>
          <span className="flex flex-none items-center gap-1.5 rounded-[9px] bg-ink px-3 py-2.25 text-[11.5px] font-medium text-white">
            <AiSparkle width={14} />
            {UI.generate}
          </span>
        </div>

        <div className="flex flex-col gap-3.5 p-4">
          <span className="flex items-center gap-1.75 text-[11.5px] font-medium text-brand">
            <AiSparkle width={13} />
            {UI.answerLabel}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {UI.actions.map((a) => (
              <span
                key={a.label}
                className={cn(
                  "inline-flex items-center gap-1.25 rounded-full px-2.5 py-1.5 text-[10.5px] font-medium",
                  a.on ? "bg-brand text-white" : "bg-lav text-brand",
                )}
              >
                {a.on && <AiSparkle width={12} />}
                {a.label}
              </span>
            ))}
          </div>
          <div className="flex h-42.5 items-end gap-2.5 rounded-xl bg-panel px-3 pt-3">
            {UI.days.map((day, i) => (
              <span key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5 pb-2">
                <i
                  className={cn(
                    "block max-h-[calc(100%-22px)] w-full origin-bottom animate-bar-rise rounded-[6px_6px_3px_3px]",
                    BAR_CLASSES[i],
                  )}
                />
                <em className="text-[10px] text-ink-muted not-italic">{day}</em>
              </span>
            ))}
          </div>
        </div>
      </IgCard>

      {/* AI tile */}
      <IgCard float delay="d2" className="-top-1 left-102.5 grid h-21.5 w-26 place-items-center bg-surface-faint">
        <svg width="62" height="46" viewBox="25.7 27.7 67 50.3" role="img" aria-label={UI.tileLabel}>
          <path className="fill-brand" d={UI.tilePath} />
        </svg>
      </IgCard>

      {/* task */}
      <IgCard float className="top-56.5 left-0 flex w-56 flex-col gap-2.5 px-4 pt-3.5 pb-4">
        <div className="mb-0.5 flex items-center gap-2.5 text-[17px] font-semibold text-brand">
          <AiSparkle width={26} />
          {UI.task.title}
        </div>
        {UI.task.items.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5 text-[12.5px]">
            <span
              className={cn(
                "grid size-4.5 flex-none place-items-center rounded-[5px]",
                item.done ? "bg-brand text-white" : "shadow-inset-lav-1-5",
              )}
            >
              {item.done && <Icon d={UI.tickPath} size={11} strokeWidth={3} />}
            </span>
            {item.label}
          </div>
        ))}
      </IgCard>

      {/* summarised call */}
      <IgCard float delay="d3" className="top-93.5 left-14 flex w-75 items-center gap-3.5 px-4 py-3.5">
        <span className="relative flex-none">
          <Image
            src={CALLER_IMAGES.mikeThompsonAi}
            alt=""
            width={46}
            height={46}
            sizes="46px"
            className="block size-11.5 rounded-full object-cover shadow-ring-white-3"
          />
          <span className="absolute -bottom-1 -left-1.5 grid size-5.5 place-items-center rounded-md text-white shadow-ai-badge bg-ai-badge">
            <AiSparkle width={13} />
          </span>
        </span>
        <div>
          <b className="block text-sm font-semibold whitespace-nowrap">
            {UI.call.kind} <em className="mx-0.5 font-normal text-ink-muted not-italic">|</em> {UI.call.name}
          </b>
          <span className="text-xs text-ink-soft">
            {UI.call.durationLabel} <span>{UI.call.duration}</span>
          </span>
        </div>
      </IgCard>
    </>
  );
}
