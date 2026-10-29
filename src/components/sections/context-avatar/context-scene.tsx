"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "framer-motion";

import { CONTEXT_AVATAR, CONTEXT_SCENE as S } from "@/constants/context-avatar";
import { RECEPTIONIST_IMAGES } from "@/constants/images";
import { usePrefersReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";
import { clamp01, smoothstep } from "@/utils/math";

export type ContextCardItem = {
  id: string;
  /** Position / size / responsive classes for the card. */
  className: string;
  content: ReactNode;
};

type Offset = readonly [number, number];

/** Layout values read on resize so the scroll handler needs a single rect read. */
type Metrics = { pinTop: number; pinHeight: number; mobile: boolean; navH: number };

/**
 * Scroll scene: the sketch fills with colour, the figure zooms 1.2→1 and the cards drift in.
 * Pinned ≥860px; below that an unpinned block that animates as it scrolls into view.
 */
export function ContextScene({ cards }: { cards: readonly ContextCardItem[] }) {
  const reduce = usePrefersReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metrics = useRef<Metrics>({ pinTop: 0, pinHeight: 0, mobile: false, navH: 0 });
  // only follow scroll while the scene is (nearly) on screen
  const active = useInView(sceneRef, { margin: S.trackMargin });

  const zoom = useMotionValue<number>(S.startZoom);
  /** Colour reveal 0..1; the cards' drift follows the same curve. */
  const colour = useMotionValue(0);
  const offsets = useMotionValue<readonly Offset[]>([]);
  const sketchOpacity = useTransform(colour, (c) => clamp01((1 - c) * S.sketchFade));

  /** Pin metrics + the distance each card travels towards the figure (design `measure()`). */
  const measure = useCallback(() => {
    const av = avatarRef.current;
    const pin = pinRef.current;
    if (!av || !pin) return;
    const mobile = window.innerWidth < S.mobileBelow;
    metrics.current = {
      pinTop: parseFloat(getComputedStyle(pin).top) || 0,
      pinHeight: pin.offsetHeight,
      mobile,
      navH: parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--navh")) || 0,
    };

    const w = av.offsetWidth;
    const h = av.offsetHeight;
    const centre = av.offsetLeft; // the figure is centred with translate-x(-50%)
    const left = centre - w / 2;
    const right = left + w;
    const headY = av.offsetTop + h * S.headY;
    const overlap = w * S.overlap;

    offsets.set(
      cardRefs.current.map((card): Offset => {
        if (!card || card.offsetParent === null) return [0, 0];
        if (mobile) return [0, S.mobileDriftY];
        const l = card.offsetLeft;
        const cw = card.offsetWidth;
        const cy = card.offsetTop + card.offsetHeight / 2;
        const dx = l + cw / 2 < centre ? Math.max(0, left + overlap - (l + cw)) : Math.min(0, right - overlap - l);
        return [dx, (headY - cy) * S.driftY];
      }),
    );
  }, [offsets]);

  const update = useCallback(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    if (reduce) {
      zoom.set(1);
      colour.set(1);
      return;
    }
    const { pinTop, pinHeight, mobile, navH } = metrics.current;
    const r = scene.getBoundingClientRect();
    let p: number;
    if (mobile) {
      // 0 when the block's top is `mobileRevealStart` down the screen, 1 when it reaches the header
      const start = window.innerHeight * S.mobileRevealStart;
      p = clamp01((start - r.top) / Math.max(1, start - navH));
    } else {
      const run = r.height - pinHeight;
      p = run > 0 ? clamp01((pinTop - r.top) / run) : 1;
    }
    zoom.set(1 + (S.startZoom - 1) * (1 - smoothstep(p / S.zoomUntil)));
    colour.set(smoothstep((p - S.revealFrom) / S.revealSpan));
  }, [reduce, zoom, colour]);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", () => {
    if (active) update();
  });

  // Measure on resize only (the scene's size tracks the viewport), never on scroll.
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const sync = () => {
      measure();
      update();
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(scene);
    return () => ro.disconnect();
  }, [measure, update]);

  // catch up when tracking resumes (e.g. after a jump to an anchor)
  useEffect(() => {
    if (active) update();
  }, [active, update]);

  return (
    <div
      ref={sceneRef}
      aria-hidden="true"
      className="relative h-[calc(100vh+1300px)] motion-reduce:h-160 max-md:h-auto"
    >
      <div
        ref={pinRef}
        className="sticky top-(--navh) h-[calc(100vh-var(--navh))] overflow-hidden motion-reduce:relative motion-reduce:top-0 motion-reduce:h-full max-md:relative max-md:top-0 max-md:h-auto"
      >
        {/* <860px: --avw is the figure width; the stage is the figure (aspect 771/620) plus room for the cards above it */}
        <div className="relative mx-auto h-full w-[calc(100%-2*max(16px,env(safe-area-inset-left,0px)))] max-w-325 max-md:h-[calc(var(--avw)*1.2435+200px)] max-md:[--avw:min(340px,84vw)]">
          {cards.map((card, i) => (
            <FloatingCard
              key={card.id}
              index={i}
              drift={colour}
              offsets={offsets}
              className={card.className}
              cardRef={(el) => {
                cardRefs.current[i] = el;
              }}
            >
              {card.content}
            </FloatingCard>
          ))}

          <motion.div
            ref={avatarRef}
            className="absolute bottom-0 left-1/2 z-2 aspect-620/771 w-[min(470px,70vw,calc((100vh-var(--navh)-110px)*.804))] origin-bottom -translate-x-1/2 max-md:w-(--avw)"
            // `--c` drives the CSS colour-reveal mask (allowed: a MotionValue-backed CSS variable)
            style={{ scale: zoom, "--c": colour } as MotionStyle}
          >
            <motion.div className="absolute inset-0" style={{ opacity: sketchOpacity }}>
              <Image
                src={RECEPTIONIST_IMAGES.sketch}
                alt=""
                fill
                sizes={CONTEXT_AVATAR.imageSizes}
                className="object-contain"
              />
            </motion.div>
            <Image
              src={RECEPTIONIST_IMAGES.colour}
              alt=""
              fill
              sizes={CONTEXT_AVATAR.imageSizes}
              className="mask-colour-reveal object-contain"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

type FloatingCardProps = {
  index: number;
  /** 0..1 drift towards the figure. */
  drift: MotionValue<number>;
  offsets: MotionValue<readonly Offset[]>;
  className: string;
  cardRef: (el: HTMLDivElement | null) => void;
  children: ReactNode;
};

function FloatingCard({ index, drift, offsets, className, cardRef, children }: FloatingCardProps) {
  const x = useTransform(() => (offsets.get()[index]?.[0] ?? 0) * drift.get());
  const y = useTransform(() => (offsets.get()[index]?.[1] ?? 0) * drift.get());
  const scale = useTransform(drift, (e) => 1 - S.cardShrink * e);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "absolute z-3 origin-center rounded-2xl bg-white p-3.5 text-left text-[12.5px] shadow-ctx-card will-change-transform",
        className,
      )}
      style={{ x, y, scale }}
    >
      {children}
    </motion.div>
  );
}
