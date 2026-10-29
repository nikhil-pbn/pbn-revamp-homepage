import type { HeroScene } from "@/constants/hero";

/** Props every scene receives from the demo stage. */
export type SceneProps<S extends HeroScene> = {
  scene: S;
  /** Render the end state (the script schedules nothing). */
  reduced: boolean;
  /** Script finished: clear row/card highlights. */
  finished: boolean;
  /** Glide the demo cursor onto an element. */
  moveCursor: (el: Element | null | undefined) => void;
};
