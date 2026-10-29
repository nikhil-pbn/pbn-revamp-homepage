import { RECEPTIONIST_UI as UI } from "@/constants/innovations";
import { FilledIcon, Icon } from "@/icons";
import { cn } from "@/lib/utils";

import { IgCaption, IgCard } from "./ig-card";

const RING_DELAYS = ["", "[animation-delay:-1s]", "[animation-delay:-2s]"] as const;
const DOT_DELAYS = ["", "[animation-delay:.2s]", "[animation-delay:.4s]"] as const;

/** Infographic 1: incoming call answered by the AI, coverage rows, booked appointment. */
export function ReceptionistUi() {
  return (
    <>
      {/* phone */}
      <IgCard className="top-2 left-1.5 flex h-104 w-50 flex-col items-center gap-2.5 rounded-[34px] px-4 pt-4 pb-5.5">
        <span className="mb-5.5 h-3.25 w-14.5 rounded-lg bg-lav-strong" />
        <IgCaption>{UI.incoming}</IgCaption>
        <b className="text-[19px] font-semibold tracking-[-0.01em] text-brand">{UI.number}</b>
        <IgCaption className="-mt-1.5">{UI.caller}</IgCaption>
        <span className="relative my-1 grid size-24 place-items-center">
          <span aria-hidden="true" className="block h-22 w-23 flex-none animate-orb bg-orb" />
          {RING_DELAYS.map((delay, i) => (
            <i
              key={i}
              className={cn("absolute inset-0 animate-ring-pulse rounded-full border-[1.5px] border-lav-strong", delay)}
            />
          ))}
        </span>
        <b className="text-sm font-medium text-brand">{UI.agent}</b>
        <IgCaption className="-mt-2">
          {UI.answering}
          {DOT_DELAYS.map((delay, i) => (
            <i key={i} className={cn("animate-dots not-italic", delay)}>
              .
            </i>
          ))}
        </IgCaption>
        <span className="mt-auto flex gap-6.5">
          <span className="grid size-11 place-items-center rounded-full bg-lav-strong text-white">
            <FilledIcon name="hangup" size={18} />
          </span>
          <span className="grid size-11 animate-cta-pulse place-items-center rounded-full bg-brand text-white">
            <FilledIcon name="phone" size={17} />
          </span>
        </span>
      </IgCard>

      {/* coverage rows */}
      <IgCard float className="top-4.5 left-56.5 flex w-67 flex-col gap-1 p-3">
        {UI.coverage.map((row) => (
          <div
            key={row.label}
            className={cn(
              "flex animate-row-highlight items-center gap-3 rounded-xl px-2 py-1.75 text-[13.5px]",
              row.delayClassName,
            )}
          >
            <span className="grid size-8 flex-none place-items-center rounded-full bg-lav text-brand">
              <Icon name={row.icon} size={15} strokeWidth={2.2} />
            </span>
            {row.label}
          </div>
        ))}
      </IgCard>

      <span className="absolute top-46 left-87 animate-bob text-brand">
        <Icon name="arrowDown" size={20} strokeWidth={2.6} />
      </span>

      {/* booked appointment */}
      <IgCard float delay="d2" className="top-55 left-56.5 flex w-67 flex-col gap-1.5 px-4 pt-4 pb-4.5">
        <span className="flex items-center gap-1.75 text-[13.5px] font-medium text-brand">
          <Icon name="checkCircle" size={15} strokeWidth={2.2} />
          {UI.booked}
        </span>
        <b className="mt-1 text-[21px] font-medium tracking-[-0.02em]">{UI.date}</b>
        <IgCaption className="text-left">{UI.time}</IgCaption>
        <div className="mt-2.5 grid grid-cols-7 gap-2">
          {UI.week.map((d, i) => (
            <span key={i} className="flex flex-col items-center gap-1.5">
              <em className="text-[10.5px] font-medium text-ink-soft not-italic">{d.day}</em>
              <i
                className={cn("block aspect-square w-full rounded-md", d.on ? "animate-cta-pulse bg-brand" : "bg-lav")}
              />
            </span>
          ))}
        </div>
      </IgCard>
    </>
  );
}
