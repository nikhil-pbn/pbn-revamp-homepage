/** Hero demo timings (ms), taken from the design's `later(fn, ms)` calls. */
import type {
  FormsScene,
  HeroScene,
  HeroSceneId,
  InsuranceScene,
  PaymentsScene,
  ReceptionistScene,
  SchedulingScene,
  TextingScene,
  VoiceScene,
} from "@/constants/hero";

export const DEMO_TIMING = {
  /** When each scene's script starts acting. */
  start: 1400,
  /** "Working" bar slides in. */
  workingIn: 600,
  /** After the script ends: cursor hides, highlights clear, "Done" bar slides in. */
  doneAfter: 200,
  /** After the script ends: team-member pop-up appears. */
  memberAfter: 800,
  /** Hold the finished scene this long before advancing. */
  tail: 2600,
  /** Minimum time a scene is on screen. */
  minDuration: 8200,
  /** Leaving the board (after hovering) plays the next scene after this delay. */
  resumeDelay: 1600,
} as const;

/** Cursor glide: 1.1s cubic-bezier(.4,.1,.2,1). */
export const CURSOR_TRANSITION = { duration: 1.1, ease: [0.4, 0.1, 0.2, 1] } as const;
/** Cursor show/hide: opacity .3s. */
export const CURSOR_FADE = { duration: 0.3 } as const;
/** Where on its target the cursor tip lands (fraction of the target's width/height). */
export const CURSOR_POINT = { x: 0.7, y: 0.55 } as const;
/** The design's standard "pop" easing: cubic-bezier(.2,.8,.2,1). */
export const EASE_PBN = [0.2, 0.8, 0.2, 1] as const;

export const REC_TIMING = { rowIn: 120, rowInStagger: 90, step: 720, book: 380 } as const;
export const VOICE_TIMING = {
  rowStagger: 380,
  callGap: 300,
  summaryGap: 900,
  typeChars: 3,
  typeTick: 30,
  okGap: 300,
  tailGap: 700,
} as const;
export const SCHED_TIMING = {
  pickGap: 900,
  select: 350,
  confirmAt: 2700,
  requestsAt: 3700,
  requestStagger: 500,
} as const;
export const PAY_TIMING = { firstGap: 900, toLinkStagger: 700, toPaidGap: 200, toPaidStagger: 600, swap: 320 } as const;
export const INS_TIMING = { step: 1000, rowStagger: 180, verify: 700 } as const;
export const FORMS_TIMING = { stepStagger: 170, rowGap: 260, kioskGap: 200, tailGap: 500 } as const;
export const TEXT_TIMING = { typing: 800, reply: 2000, confirmed: 2700, tagsAt: 3300, tagStagger: 350 } as const;
export const IQ_TIMING = {
  countMs: 1400,
  barsAt: 400,
  barStagger: 150,
  gaugeAt: 1800,
  gaugeCountMs: 1100,
  end: 3400,
} as const;

/* ---- end time of each scene's script, relative to the scene starting ---- */

const t0 = DEMO_TIMING.start;

/** Voice: when the "on call" state begins (shared by the script and the end time). */
export function voiceCallAt(scene: VoiceScene) {
  return t0 + scene.details.length * VOICE_TIMING.rowStagger + VOICE_TIMING.callGap;
}

/** Voice: how long the summary takes to type out. */
export function voiceTypeDuration(scene: VoiceScene) {
  return (scene.summary.length / VOICE_TIMING.typeChars) * VOICE_TIMING.typeTick;
}

/** Forms: the time each row's turn starts, plus when the kiosk card appears. */
export function formsSchedule(scene: FormsScene) {
  let t = t0;
  const rowAt = scene.rows.map((row) => {
    const at = t;
    t += row.steps * FORMS_TIMING.stepStagger + FORMS_TIMING.rowGap;
    return at;
  });
  return { rowAt, kioskAt: t + FORMS_TIMING.kioskGap };
}

const END: { [K in HeroSceneId]: (scene: Extract<HeroScene, { id: K }>) => number } = {
  rec: (s: ReceptionistScene) => t0 + s.rows.length * REC_TIMING.step,
  voice: (s: VoiceScene) => voiceCallAt(s) + VOICE_TIMING.summaryGap + voiceTypeDuration(s) + VOICE_TIMING.tailGap,
  sched: (s: SchedulingScene) => t0 + SCHED_TIMING.requestsAt + s.requests.length * SCHED_TIMING.requestStagger,
  pay: (s: PaymentsScene) => {
    const moving = s.initialColumns[0].length;
    return (
      t0 +
      PAY_TIMING.firstGap +
      moving * PAY_TIMING.toLinkStagger +
      PAY_TIMING.toPaidGap +
      moving * PAY_TIMING.toPaidStagger
    );
  },
  ins: (s: InsuranceScene) => t0 + s.patients.length * INS_TIMING.step,
  forms: (s: FormsScene) => formsSchedule(s).kioskAt + FORMS_TIMING.tailGap,
  text: (s: TextingScene) => t0 + TEXT_TIMING.tagsAt + s.inbox.length * TEXT_TIMING.tagStagger,
  iq: () => t0 + IQ_TIMING.end,
};

/** When a scene's scripted actions finish. */
export function sceneEnd(scene: HeroScene) {
  return (END[scene.id] as (s: HeroScene) => number)(scene);
}

/** How long a scene stays on screen before auto-advancing. */
export function sceneDuration(scene: HeroScene) {
  return Math.max(DEMO_TIMING.minDuration, sceneEnd(scene) + DEMO_TIMING.tail);
}
