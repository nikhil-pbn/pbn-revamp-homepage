/** Pausable clock shared by every hero-demo timeline: suspending it freezes all pending steps, resuming continues them. */

type Timer = {
  fire: () => void;
  /** Time left until the step fires (updated when the clock suspends). */
  remaining: number;
  startedAt: number;
  handle: ReturnType<typeof setTimeout> | undefined;
};

export type Timeline = {
  /** Run `fn` after `ms` of (unsuspended) clock time. */
  at: (ms: number, fn: () => void) => void;
  /** Cancel every step this timeline still has pending. */
  clear: () => void;
};

export class DemoClock {
  /** Starts suspended: the demo runs once it is known to be visible. */
  private suspended = true;
  private readonly pending = new Set<Timer>();

  /** A group of steps that can be cancelled together. */
  timeline(): Timeline {
    const own = new Set<Timer>();
    return {
      at: (ms, fn) => {
        const timer: Timer = {
          fire: () => {
            own.delete(timer);
            this.pending.delete(timer);
            fn();
          },
          remaining: ms,
          startedAt: 0,
          handle: undefined,
        };
        own.add(timer);
        this.pending.add(timer);
        if (!this.suspended) this.arm(timer);
      },
      clear: () => {
        own.forEach((timer) => {
          clearTimeout(timer.handle);
          this.pending.delete(timer);
        });
        own.clear();
      },
    };
  }

  setSuspended(suspended: boolean) {
    if (suspended === this.suspended) return;
    this.suspended = suspended;
    const now = performance.now();
    this.pending.forEach((timer) => {
      if (suspended) {
        clearTimeout(timer.handle);
        timer.handle = undefined;
        timer.remaining = Math.max(0, timer.remaining - (now - timer.startedAt));
      } else {
        this.arm(timer);
      }
    });
  }

  private arm(timer: Timer) {
    timer.startedAt = performance.now();
    timer.handle = setTimeout(timer.fire, timer.remaining);
  }
}
