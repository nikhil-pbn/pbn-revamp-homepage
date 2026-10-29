"use client";

import { useRef, type KeyboardEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { FilledIcon } from "@/icons";
import { PROOF_COPY, PROOF_TIMING, type Testimonial } from "@/constants/proof";
import { usePrefersReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

import { CardPlayer, type CardPlayerHandle } from "./card-player";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

/** Hidden on hover/focus (fine pointers) and while playing. */
const FADE_ON_HOVER =
  "pointer-fine:group-hover/cw:translate-y-2 pointer-fine:group-hover/cw:opacity-0 pointer-fine:group-focus-visible/cw:translate-y-2 pointer-fine:group-focus-visible/cw:opacity-0";

type TestimonialCardProps = {
  testimonial: Testimonial;
  index: number;
  revealed: boolean;
  active: boolean;
  trackVisible: boolean;
  onPlay: () => void;
  onStop: () => void;
};

export function TestimonialCard({
  testimonial,
  index,
  revealed,
  active,
  trackVisible,
  onPlay,
  onStop,
}: TestimonialCardProps) {
  const reduce = usePrefersReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  const playerRef = useRef<CardPlayerHandle>(null);

  const activate = () => {
    if (active) playerRef.current?.toggle();
    else onPlay();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activate();
    }
  };

  const close = () => {
    onStop();
    cardRef.current?.focus();
  };

  return (
    <motion.article
      ref={cardRef}
      tabIndex={0}
      aria-label={`${PROOF_COPY.playStoryAria}: ${testimonial.quote}, ${testimonial.name}`}
      onClick={() => {
        if (!active) onPlay();
      }}
      onKeyDown={onKeyDown}
      // same initial markup on server and client; reduced motion just skips the tween
      initial={{ opacity: 0, y: 24 }}
      animate={revealed ? { opacity: 1, y: 0 } : undefined}
      transition={
        reduce
          ? { duration: 0 }
          : {
              duration: 0.7,
              ease: EASE_EXPO,
              delay: ((index % PROOF_TIMING.staggerGroup) * PROOF_TIMING.staggerMs) / 1000,
            }
      }
      className="group/cw relative isolate h-[301px] flex-[0_0_196px] cursor-pointer snap-start overflow-hidden rounded-2xl bg-lav text-white shadow-testimonial transition-shadow duration-300 outline-none focus-visible:ring-3 focus-visible:ring-brand"
    >
      <Image
        src={testimonial.image}
        alt=""
        fill
        sizes="196px"
        className={cn(
          "block object-cover object-top [transition:scale_.9s_cubic-bezier(.16,1,.3,1),filter_.6s_ease]",
          active
            ? "scale-106"
            : "contrast-104 grayscale pointer-fine:group-hover/cw:scale-107 pointer-fine:group-hover/cw:contrast-100 pointer-fine:group-hover/cw:grayscale-0 pointer-fine:group-focus-visible/cw:scale-107 pointer-fine:group-focus-visible/cw:contrast-100 pointer-fine:group-focus-visible/cw:grayscale-0",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 transition-opacity duration-450 bg-testimonial-shade",
          active
            ? "pointer-events-none opacity-0"
            : "pointer-fine:group-hover/cw:opacity-0 pointer-fine:group-focus-visible/cw:opacity-0",
        )}
      />
      <span
        className={cn(
          "absolute top-3.5 left-3.5 max-w-[calc(100%-28px)] rounded-full bg-white/92 px-2.25 py-1 text-[8.5px] leading-[1.3] font-bold tracking-[0.08em] text-ink uppercase transition-[opacity,translate] duration-450 [@media(hover:none)]:max-w-[calc(100%-64px)]",
          active ? "pointer-events-none opacity-0" : FADE_ON_HOVER,
        )}
      >
        {testimonial.tag}
      </span>
      <div
        className={cn(
          "absolute inset-x-4 bottom-4 flex flex-col gap-2.5 transition-[opacity,translate] duration-450",
          active ? "pointer-events-none opacity-0" : FADE_ON_HOVER,
        )}
      >
        <q className="text-[15px] leading-[1.28] font-semibold tracking-[-0.01em] text-balance [quotes:none]">
          {testimonial.quote}
        </q>
        <div className="flex flex-col gap-px text-[11px] leading-[1.35]">
          <b className="font-bold">{testimonial.name}</b>
          <span className="opacity-85">{testimonial.practice}</span>
        </div>
      </div>
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute bottom-7 left-1/2 inline-flex -translate-x-1/2 translate-y-4.5 scale-92 items-center gap-2 rounded-full bg-white py-1 pr-4 pl-1 text-[12.5px] font-semibold whitespace-nowrap text-ink opacity-0 transition-[opacity,transform,translate,scale] duration-450 ease-expo",
          "[@media(hover:none)]:top-3 [@media(hover:none)]:right-3 [@media(hover:none)]:bottom-auto [@media(hover:none)]:left-auto [@media(hover:none)]:translate-y-0 [@media(hover:none)]:scale-100 [@media(hover:none)]:gap-0 [@media(hover:none)]:bg-transparent [@media(hover:none)]:p-0 [@media(hover:none)]:text-[0px] [@media(hover:none)]:opacity-100",
          active
            ? "opacity-0! [@media(hover:none)]:opacity-0!"
            : "pointer-fine:group-hover/cw:translate-y-0 pointer-fine:group-hover/cw:scale-100 pointer-fine:group-hover/cw:opacity-100 pointer-fine:group-focus-visible/cw:translate-y-0 pointer-fine:group-focus-visible/cw:scale-100 pointer-fine:group-focus-visible/cw:opacity-100",
        )}
      >
        <i className="grid size-8 place-items-center rounded-full bg-brand [@media(hover:none)]:size-7.5">
          <FilledIcon name="play" size={12} className="ml-0.5 text-white" />
        </i>
        {PROOF_COPY.playStory}
      </span>
      {active && (
        <CardPlayer
          handleRef={playerRef}
          src={testimonial.videoUrl}
          trackVisible={trackVisible}
          onEnded={onStop}
          onClose={close}
        />
      )}
    </motion.article>
  );
}
