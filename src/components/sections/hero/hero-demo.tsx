"use client";

import {
  createContext,
  use,
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type FocusEvent,
} from "react";
import { animate, useInView, useMotionValue, type MotionValue } from "framer-motion";

import { HERO_SCENES, type HeroScene } from "@/constants/hero";
import { usePrefersReducedMotion } from "@/hooks";

import { DemoClock, type Timeline } from "./demo-clock";
import { CURSOR_FADE, CURSOR_POINT, CURSOR_TRANSITION, DEMO_TIMING, sceneDuration, sceneEnd } from "./scene-timing";
import { usePageVisible } from "./use-page-visible";

type Phase = { working: boolean; done: boolean; member: boolean; finished: boolean };

const IDLE_PHASE: Phase = { working: false, done: false, member: false, finished: false };

export type DemoCursorValues = { x: MotionValue<number>; y: MotionValue<number>; opacity: MotionValue<number> };

type HeroDemoValue = {
  index: number;
  /** Increments on every play, so replaying the same scene remounts it. */
  runId: number;
  scene: HeroScene;
  /** Total on-screen time of the current scene (drives the chip progress bar). */
  durationMs: number;
  reduced: boolean;
  /** Board is hovered or keyboard focus is in the chips/board: auto-advance and the chip progress bar are paused. */
  paused: boolean;
  /** Hero is off-screen or the tab is hidden: every scripted step is frozen. */
  suspended: boolean;
  /** The pointer left the board: the current scene stops where it is. */
  halted: boolean;
  /** Scripted actions are done: highlights clear. */
  finished: boolean;
  showWorking: boolean;
  showDone: boolean;
  showMember: boolean;
  /** Shared pausable clock every scripted sequence schedules on. */
  clock: DemoClock;
  /** Cursor position/opacity as MotionValues: moving it never re-renders React. */
  cursor: DemoCursorValues;
  /** Callback ref for the board wrapper (`.hv`): cursor positions are measured relative to it. */
  setStage: (el: HTMLDivElement | null) => () => void;
  play: (index: number) => void;
  moveCursor: (el: Element | null | undefined) => void;
  onStageEnter: () => void;
  onStageLeave: () => void;
};

const HeroDemoContext = createContext<HeroDemoValue | null>(null);

export function useHeroDemo() {
  const value = use(HeroDemoContext);
  if (!value) throw new Error("useHeroDemo must be used inside <HeroDemo>");
  return value;
}

/** Where the cursor tip lands on `el`, relative to the board; `null` if `el` is hidden at this breakpoint. */
function cursorPoint(stage: HTMLElement, el: Element) {
  const r = el.getBoundingClientRect();
  if (r.width === 0 && r.height === 0) return null;
  const s = stage.getBoundingClientRect();
  return { x: r.left - s.left + r.width * CURSOR_POINT.x, y: r.top - s.top + r.height * CURSOR_POINT.y };
}

/** Hero section + demo orchestrator (current scene, status bars, cursor, auto-advance). Scenes run their own scripts. */
export function HeroDemo({ children, ...props }: ComponentProps<"section">) {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);
  const pageVisible = usePageVisible();
  const suspended = !inView || !pageVisible;

  const [clock] = useState(() => new DemoClock());
  const timelineRef = useRef<Timeline | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cursorTargetRef = useRef<Element | null>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorOpacity = useMotionValue(0);

  const [run, setRun] = useState({ index: 0, id: 0 });
  const [phase, setPhase] = useState<Phase>(IDLE_PHASE);
  const [hovered, setHovered] = useState(false);
  /** Keyboard focus is inside the hero (WCAG 2.2.2: lets keyboard users stop the rotation). */
  const [focused, setFocused] = useState(false);
  const paused = hovered || focused;
  /** Counts pointer-leaves since the scene started (each one restarts the resume delay). */
  const [halts, setHalts] = useState(0);

  const scene = HERO_SCENES[run.index];

  useEffect(() => {
    clock.setSuspended(suspended);
  }, [clock, suspended]);

  const hideCursor = useCallback(() => {
    cursorTargetRef.current = null;
    animate(cursorOpacity, 0, CURSOR_FADE);
  }, [cursorOpacity]);

  const play = useCallback(
    (index: number) => {
      timelineRef.current?.clear();
      setRun((r) => ({ index, id: r.id + 1 }));
      setPhase(IDLE_PHASE);
      setHalts(0);
      hideCursor();
    },
    [hideCursor],
  );

  const playNext = useEffectEvent(() => play((run.index + 1) % HERO_SCENES.length));
  const advance = useEffectEvent(() => {
    if (!paused) play((run.index + 1) % HERO_SCENES.length);
  });

  // Per-scene choreography around the scene's own script; after the pointer
  // leaves the board, just the delayed jump to the next scene.
  useEffect(() => {
    const timeline = clock.timeline();
    timelineRef.current = timeline;
    const current = HERO_SCENES[run.index];
    if (halts > 0) {
      timeline.at(DEMO_TIMING.resumeDelay, () => playNext());
    } else if (!reduced) {
      const end = sceneEnd(current);
      timeline.at(DEMO_TIMING.workingIn, () => setPhase((p) => ({ ...p, working: true })));
      timeline.at(end + DEMO_TIMING.doneAfter, () => {
        hideCursor();
        setPhase((p) => ({ ...p, done: true, finished: true }));
      });
      timeline.at(end + DEMO_TIMING.memberAfter, () => setPhase((p) => ({ ...p, member: true })));
      timeline.at(sceneDuration(current), () => advance());
    }
    return timeline.clear;
  }, [clock, run.id, run.index, halts, reduced, hideCursor]);

  const moveCursor = useCallback(
    (el: Element | null | undefined) => {
      const stage = stageRef.current;
      if (!el || !stage) return;
      const point = cursorPoint(stage, el);
      if (!point) return;
      cursorTargetRef.current = el;
      animate(cursorX, point.x, CURSOR_TRANSITION);
      animate(cursorY, point.y, CURSOR_TRANSITION);
      animate(cursorOpacity, 1, CURSOR_FADE);
    },
    [cursorX, cursorY, cursorOpacity],
  );

  // Keep a parked cursor on its target when the board is resized.
  const setStage = useCallback(
    (el: HTMLDivElement | null) => {
      stageRef.current = el;
      const observer = new ResizeObserver(() => {
        const target = cursorTargetRef.current;
        const point = el && target?.isConnected ? cursorPoint(el, target) : null;
        if (!point) return;
        cursorX.jump(point.x);
        cursorY.jump(point.y);
      });
      if (el) observer.observe(el);
      return () => {
        observer.disconnect();
        stageRef.current = null;
      };
    },
    [cursorX, cursorY],
  );

  /** Pause ended: stop the current scene where it is and play the next one shortly after. */
  const resume = useCallback(() => {
    timelineRef.current?.clear();
    setHalts((h) => h + 1);
  }, []);

  const onStageEnter = useCallback(() => setHovered(true), []);

  const onStageLeave = useCallback(() => {
    setHovered(false);
    if (!focused) resume();
  }, [focused, resume]);

  // Only keyboard focus pauses (`:focus-visible`): a mouse click on a chip keeps the auto-advance running.
  const onFocus = (e: FocusEvent) => {
    if (e.target instanceof Element && e.target.matches(":focus-visible")) setFocused(true);
  };

  const onBlur = (e: FocusEvent<HTMLElement>) => {
    if (!focused || (e.relatedTarget instanceof Node && e.currentTarget.contains(e.relatedTarget))) return;
    setFocused(false);
    if (!hovered) resume();
  };

  const cursor = useMemo(() => ({ x: cursorX, y: cursorY, opacity: cursorOpacity }), [cursorX, cursorY, cursorOpacity]);

  const value = useMemo<HeroDemoValue>(
    () => ({
      index: run.index,
      runId: run.id,
      scene,
      durationMs: sceneDuration(scene),
      reduced,
      paused,
      suspended,
      halted: halts > 0,
      finished: reduced || phase.finished,
      showWorking: !reduced && phase.working,
      showDone: reduced || phase.done,
      showMember: !reduced && phase.member,
      clock,
      cursor,
      setStage,
      play,
      moveCursor,
      onStageEnter,
      onStageLeave,
    }),
    [
      run,
      scene,
      reduced,
      paused,
      suspended,
      halts,
      phase,
      clock,
      cursor,
      setStage,
      play,
      moveCursor,
      onStageEnter,
      onStageLeave,
    ],
  );

  return (
    <HeroDemoContext value={value}>
      <section ref={sectionRef} onFocus={onFocus} onBlur={onBlur} {...props}>
        {children}
      </section>
    </HeroDemoContext>
  );
}
