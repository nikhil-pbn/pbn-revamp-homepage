"use client";

import { useCallback, useEffect, useImperativeHandle, useRef, useState, type MouseEvent, type Ref } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

import { FilledIcon, Icon } from "@/icons";
import { PROOF_COPY, PROOF_TIMING } from "@/constants/proof";
import { cn } from "@/lib/utils";

export type CardPlayerHandle = { toggle: () => void };

type CardPlayerProps = {
  handleRef: Ref<CardPlayerHandle>;
  src: string;
  /** Pauses the video when the reel scrolls off screen. */
  trackVisible: boolean;
  onEnded: () => void;
  onClose: () => void;
};

const ROUND_BUTTON =
  "absolute top-2.5 grid size-7.5 cursor-pointer place-items-center rounded-full border-0 bg-ink-overlay/55 text-white backdrop-blur-[6px] transition-colors duration-200 hover:bg-ink-overlay/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/** Inline video player rendered inside the active testimonial card. */
export function CardPlayer({ handleRef, src, trackVisible, onEnded, onClose }: CardPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);
  // `paused` / `muted` mirror the element through its media events, so they stay
  // right however playback changes (our buttons, autoplay fallback, cleanup).
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(false);

  // progress bar: a MotionValue, so `timeupdate` never re-renders the card
  const progress = useMotionValue(0);
  const progressWidth = useTransform(progress, (p) => `${p}%`);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play().catch(() => {});
    else v.pause();
  }, []);

  useImperativeHandle(handleRef, () => ({ toggle }), [toggle]);

  // Attach the source and start playing; fall back to muted autoplay if the
  // browser blocks sound. The source is set here (not as a prop) so the cleanup
  // can release the download and a re-run of the effect (React Strict Mode
  // mounts effects twice in development) attaches it again.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let cancelled = false;
    v.src = src;
    v.play().catch((err: DOMException) => {
      // AbortError = playback interrupted by our own cleanup, not an autoplay block
      if (cancelled || err.name !== "NotAllowedError") return;
      v.muted = true;
      v.play().catch(() => {});
    });
    return () => {
      cancelled = true;
      v.pause();
      v.removeAttribute("src");
      v.load();
    };
  }, [src]);

  // pause when the reel leaves the viewport (the `pause` event shows the paused state)
  useEffect(() => {
    if (!trackVisible) videoRef.current?.pause();
  }, [trackVisible]);

  const onOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    toggle();
  };

  const onCloseClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose();
  };

  const onMuteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (v) v.muted = !v.muted;
  };

  return (
    <>
      <video
        ref={videoRef}
        playsInline
        preload="auto"
        className="absolute inset-0 z-3 size-full bg-ink-night object-cover"
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        onPlaying={() => setLoading(false)}
        onWaiting={() => setLoading(true)}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (v.duration) {
            animate(progress, (v.currentTime / v.duration) * 100, {
              duration: PROOF_TIMING.videoProgressTweenS,
              ease: "linear",
            });
          }
        }}
        onEnded={onEnded}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
      {/* click-to-toggle surface; keyboard users toggle via the card (Enter/Space) */}
      <div className="absolute inset-0 z-4" onClick={onOverlayClick}>
        <button
          type="button"
          aria-label={PROOF_COPY.closeVideo}
          onClick={onCloseClick}
          className={cn(ROUND_BUTTON, "right-2.5")}
        >
          <Icon name="close" size={12} strokeWidth={2.6} />
        </button>
        <button
          type="button"
          aria-label={muted ? PROOF_COPY.unmute : PROOF_COPY.mute}
          aria-pressed={muted}
          onClick={onMuteClick}
          className={cn(ROUND_BUTTON, "right-11.5")}
        >
          <Icon name={muted ? "mute" : "sound"} size={13} strokeWidth={2.2} />
        </button>
        {!error && (
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute top-1/2 left-1/2 -mt-6 -ml-6 grid size-12 place-items-center rounded-full transition-[opacity,scale] duration-250",
              loading
                ? "scale-85 bg-ink-overlay/55 opacity-0"
                : paused
                  ? "play-triangle bg-brand opacity-100"
                  : "scale-85 bg-ink-overlay/55 opacity-0 group-hover/cw:scale-100 group-hover/cw:opacity-100",
            )}
          >
            {!paused && <FilledIcon name="pause" size={12} className="text-white" />}
          </span>
        )}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-1/2 left-1/2 -mt-3.75 -ml-3.75 size-7.5 animate-spin-fast rounded-full border-3 border-white/30 border-t-white",
            loading ? "opacity-100" : "opacity-0",
          )}
        />
        {error && (
          <span
            role="alert"
            className="absolute inset-x-3 top-1/2 -translate-y-1/2 rounded-[10px] bg-ink-overlay/70 p-2.5 text-center text-xs text-white"
          >
            {PROOF_COPY.videoError}
          </span>
        )}
        <span aria-hidden="true" className="absolute inset-x-3 bottom-3 h-0.75 overflow-hidden rounded-xs bg-white/30">
          <motion.i className="block h-full rounded-xs bg-white" style={{ width: progressWidth }} />
        </span>
      </div>
    </>
  );
}
