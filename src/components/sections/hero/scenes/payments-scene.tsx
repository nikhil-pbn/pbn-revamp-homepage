"use client";

import { useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";

import type { PaymentsScene as Scene } from "@/constants/hero";
import { cn } from "@/lib/utils";
import { shortName } from "@/utils/format";

import { PatientAvatar } from "../patient-avatar";
import { DEMO_TIMING, PAY_TIMING } from "../scene-timing";
import { useSceneScript } from "../use-scene-script";
import type { SceneProps } from "./types";

type Columns = number[][];
type Move = { card: number; to: number; at: number };

/** The design's card moves: Link sent → Paid, then every Balance due card → Link sent → Paid. */
function planMoves(scene: Scene): Move[] {
  const [due, sent] = scene.initialColumns;
  const { firstGap, toLinkStagger, toPaidGap, toPaidStagger } = PAY_TIMING;
  const moves: Move[] = [];
  let t = DEMO_TIMING.start;
  if (sent.length) moves.push({ card: sent[0], to: 2, at: t });
  t += firstGap;
  due.forEach((card, k) => moves.push({ card, to: 1, at: t + k * toLinkStagger }));
  t += due.length * toLinkStagger + toPaidGap;
  due.forEach((card, k) => moves.push({ card, to: 2, at: t + k * toPaidStagger }));
  return moves;
}

function applyMove(columns: Columns, { card, to }: Move): Columns {
  return columns.map((col, i) => (i === to ? [...col.filter((c) => c !== card), card] : col.filter((c) => c !== card)));
}

const CARD_VARIANTS: Variants = {
  rest: { opacity: 1, x: 0, scale: 1 },
  out: { opacity: 0, x: 24, scale: 0.96, transition: { opacity: { duration: 0.3 }, default: { duration: 0.35 } } },
  pop: {
    opacity: 1,
    x: 0,
    scale: [1, 1.12, 1],
    transition: { opacity: { duration: 0.3 }, scale: { duration: 0.45, times: [0, 0.4, 1] }, x: { duration: 0 } },
  },
};

/** Payments: a collections kanban where cards move from balance due to paid. */
export function PaymentsScene({ scene, reduced, moveCursor }: SceneProps<Scene>) {
  const [columns, setColumns] = useState<Columns>(() => scene.initialColumns.map((c) => [...c]));
  const [leaving, setLeaving] = useState(-1);
  const [moved, setMoved] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useSceneScript((at) => {
    planMoves(scene).forEach((move) => {
      at(move.at, () => {
        moveCursor(cardRefs.current[move.card]);
        setLeaving(move.card);
      });
      at(move.at + PAY_TIMING.swap, () => {
        setColumns((cols) => applyMove(cols, move));
        setLeaving(-1);
        setMoved((m) => (m.includes(move.card) ? m : [...m, move.card]));
      });
    });
  });

  const view = reduced
    ? planMoves(scene).reduce(
        applyMove,
        scene.initialColumns.map((c) => [...c]),
      )
    : columns;

  return (
    <div className="grid h-full grid-cols-3 gap-3 px-5 pt-3.5 pb-4.5 max-xl:gap-1.5 max-xl:p-3">
      {scene.columns.map((column, i) => (
        <div
          key={column.title}
          className="flex min-w-0 flex-col gap-1.5 overflow-hidden rounded-xl bg-panel p-2.5 max-xl:p-1.75"
        >
          <div className="flex items-center justify-between px-0.5 pt-0.5 pb-1 text-[11.5px] font-medium max-xl:text-[10.5px]">
            <span className="flex items-center gap-1.5">
              <i className={cn("size-2 rounded-full", column.dotClassName)} />
              {column.title}
            </span>
            <em className="font-normal text-ink-muted not-italic">{view[i].length}</em>
          </div>
          {view[i].map((cardIndex) => {
            const card = scene.cards[cardIndex];
            const hasMoved = !reduced && moved.includes(cardIndex);
            return (
              <motion.div
                key={cardIndex}
                ref={(el) => {
                  cardRefs.current[cardIndex] = el;
                }}
                layout="position"
                className="rounded-[10px] bg-white px-2.25 py-1.5 text-[11.5px] shadow-kanban"
                variants={CARD_VARIANTS}
                initial={hasMoved ? { opacity: 0 } : false}
                animate={leaving === cardIndex ? "out" : hasMoved ? "pop" : "rest"}
              >
                <b className="flex items-center justify-between gap-1.5 text-xs font-medium max-xl:flex-col max-xl:text-[11px]">
                  <span className="flex min-w-0 items-center gap-1.75 truncate">
                    <PatientAvatar patient={card.patient} size={22} className="size-5.5 shadow-pav" />
                    {shortName(card.patient.name)}
                  </span>
                  <span className="ml-auto flex-none text-xs font-semibold text-ink">{card.amount}</span>
                </b>
                <span className="mt-px block pl-7.25 text-[10.5px] text-ink-muted">{card.method}</span>
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
