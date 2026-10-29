"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

import type { SchedulingScene as Scene } from "@/constants/hero";
import { Icon } from "@/icons";
import { cn } from "@/lib/utils";

import { PatientAvatar } from "../patient-avatar";
import { DEMO_TIMING, EASE_PBN, SCHED_TIMING } from "../scene-timing";
import { useSceneScript } from "../use-scene-script";
import type { SceneProps } from "./types";

const SELECTED = "border-brand bg-brand text-white";
const LABEL = "text-[10px] tracking-[.04em] text-ink-muted uppercase";

/** Online Scheduling: a patient books in the widget, the request queue auto-accepts. */
export function SchedulingScene({ scene, reduced, moveCursor }: SceneProps<Scene>) {
  const [type, setType] = useState(-1);
  const [day, setDay] = useState(-1);
  const [slot, setSlot] = useState(-1);
  const [confirmed, setConfirmed] = useState(false);
  const [accepted, setAccepted] = useState(0);

  const typeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dayRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const slotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const confirmRef = useRef<HTMLSpanElement>(null);
  const pillRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useSceneScript((at) => {
    const t0 = DEMO_TIMING.start;
    const { pickGap, select, confirmAt, requestsAt, requestStagger } = SCHED_TIMING;
    const pick = (el: HTMLElement | null, ms: number, apply: () => void) => {
      at(ms, () => moveCursor(el));
      at(ms + select, apply);
    };
    pick(typeRefs.current[scene.pick.type], t0, () => setType(scene.pick.type));
    pick(dayRefs.current[scene.pick.day], t0 + pickGap, () => setDay(scene.pick.day));
    pick(slotRefs.current[scene.pick.slot], t0 + 2 * pickGap, () => setSlot(scene.pick.slot));
    pick(confirmRef.current, t0 + confirmAt, () => setConfirmed(true));
    scene.requests.forEach((_, k) => {
      at(t0 + requestsAt + k * requestStagger, () => {
        setAccepted(k + 1);
        moveCursor(pillRefs.current[k]);
      });
    });
  });

  const view = reduced
    ? { ...scene.pick, confirmed: true, accepted: scene.requests.length }
    : { type, day, slot, confirmed, accepted };

  return (
    <div className="grid h-full grid-cols-2 gap-3 px-5 pt-3.5 pb-4.5 max-sm:grid-cols-1 max-sm:p-3">
      {/* booking widget */}
      <div className="flex min-w-0 flex-col gap-1.5 rounded-[14px] border border-line px-3 py-2.5 shadow-widget">
        <div className="flex items-center gap-2 text-xs font-medium whitespace-nowrap">
          <i className="grid size-5.5 place-items-center rounded-[7px] bg-brand text-white">
            <Icon name="calendarCheck" size={13} strokeWidth={2.2} />
          </i>
          {scene.widgetTitle}
        </div>
        <span className={LABEL}>{scene.typeLabel}</span>
        <div className="flex gap-1.25">
          {scene.types.map((t, k) => (
            <span
              key={t}
              ref={(el) => {
                typeRefs.current[k] = el;
              }}
              className={cn(
                "rounded-full border border-line px-2 py-1 text-[10px] whitespace-nowrap transition-all duration-250",
                view.type === k && SELECTED,
              )}
            >
              {t}
            </span>
          ))}
        </div>
        <span className={LABEL}>{scene.dayLabel}</span>
        <div className="flex flex-wrap gap-1.25">
          {scene.days.map((d, k) => (
            <span
              key={d.day}
              ref={(el) => {
                dayRefs.current[k] = el;
              }}
              className={cn(
                "flex flex-1 flex-col items-center rounded-[9px] border border-line py-0.75 text-[9.5px] text-ink-muted transition-all duration-250",
                view.day === k && SELECTED,
              )}
            >
              {d.day}
              <b className={cn("text-[13px] font-medium", view.day === k ? "text-white" : "text-ink")}>{d.date}</b>
            </span>
          ))}
        </div>
        <span className={LABEL}>{scene.timeLabel}</span>
        <div className="flex flex-wrap gap-1.25">
          {scene.slots.map((s, k) => (
            <span
              key={s.time}
              ref={(el) => {
                slotRefs.current[k] = el;
              }}
              className={cn(
                "w-[calc(33.33%-4px)] rounded-lg border border-line py-1 text-center text-[10px] transition-all duration-250",
                s.taken && "bg-surface-soft text-slot-off line-through",
                view.slot === k && SELECTED,
              )}
            >
              {s.time}
            </span>
          ))}
        </div>
        <span
          ref={confirmRef}
          className={cn(
            "mt-auto rounded-[9px] p-1.75 text-center text-[11px] font-medium whitespace-nowrap text-white transition-colors duration-300",
            view.confirmed ? "bg-status-done" : "bg-ink",
          )}
        >
          {view.confirmed ? (
            <>
              <Icon name="check" size={12} strokeWidth={3} className="inline" /> {scene.confirmed}
            </>
          ) : (
            scene.confirm
          )}
        </span>
      </div>

      {/* request queue */}
      <div className="flex min-w-0 flex-col gap-1.75 max-sm:hidden">
        <div className="flex justify-between text-[11px] text-ink-muted">
          <b className="font-medium text-ink">{scene.queueTitle}</b>
          <span>{scene.queueNote}</span>
        </div>
        <motion.div
          className="flex items-center gap-2 overflow-hidden rounded-[11px] border-line bg-white px-2 text-[11px] shadow-ring-brand-soft"
          initial={reduced ? false : NEW_HIDDEN}
          animate={view.confirmed ? NEW_SHOWN : NEW_HIDDEN}
          transition={{ duration: 0.4, ease: EASE_PBN }}
        >
          <RequestBody request={scene.newRequest} />
          <Pill ok label={scene.booked} />
        </motion.div>
        {scene.requests.map((r, k) => (
          <div
            key={r.patient.name}
            className="flex items-center gap-2 rounded-[11px] border border-line bg-white px-2 py-1.5 text-[11px]"
          >
            <RequestBody request={r} />
            <span
              ref={(el) => {
                pillRefs.current[k] = el;
              }}
            >
              <Pill ok={k < view.accepted} label={k < view.accepted ? scene.booked : scene.pending} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const NEW_HIDDEN = { opacity: 0, y: -10, maxHeight: 0, paddingTop: 0, paddingBottom: 0, borderWidth: 0, marginTop: -7 };
const NEW_SHOWN = { opacity: 1, y: 0, maxHeight: 60, paddingTop: 6, paddingBottom: 6, borderWidth: 1, marginTop: 0 };

function RequestBody({ request }: { request: Scene["newRequest"] }) {
  return (
    <>
      <PatientAvatar patient={request.patient} className="size-6 shadow-pav" />
      <div className="min-w-0 flex-1">
        <b className="block truncate font-medium">{request.patient.name}</b>
        <span className="block truncate text-[10px] text-ink-muted">{request.detail}</span>
      </div>
    </>
  );
}

function Pill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-2 py-0.75 text-[9.5px] font-medium whitespace-nowrap",
        ok ? "bg-green-soft text-green-ink" : "bg-amber-soft text-amber-ink",
      )}
    >
      {ok && <Icon name="check" size={12} strokeWidth={3} />}
      {label}
    </span>
  );
}
