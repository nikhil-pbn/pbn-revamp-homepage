/** Clamp a value into the 0..1 range. */
export function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

/** Smoothstep easing on a 0..1 progress value. */
export function smoothstep(value: number) {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

/** Ease-in-out quad, used for scroll-linked choreography. */
export function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/** Ease-out cubic, used by number count-ups. */
export function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
