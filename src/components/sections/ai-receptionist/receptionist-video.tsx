"use client";

import Image from "next/image";
import { Dialog as DialogPrimitive } from "radix-ui";

import { Dialog, DialogClose, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AI_RECEPTIONIST } from "@/constants/ai-receptionist";
import { RECEPTIONIST_IMAGES } from "@/constants/images";
import { FilledIcon } from "@/icons";

/** Mini video thumbnail with a pulsing play button; opens the video in a modal. */
export function ReceptionistVideo() {
  const { video } = AI_RECEPTIONIST;

  return (
    <Dialog>
      <div className="mt-2 w-90 max-w-full">
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label={video.playLabel}
            className="group/vid relative block aspect-836/470 w-full cursor-pointer overflow-hidden rounded-[14px] border-0 bg-transparent p-0 shadow-video-thumb focus-visible:rounded-[14px] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            <Image
              src={RECEPTIONIST_IMAGES.callVideoThumb}
              alt=""
              fill
              sizes="320px"
              className="origin-[12%_82%] object-cover transition-transform duration-800 ease-pbn group-hover/vid:scale-105"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-3 left-3 grid size-11 place-items-center rounded-full bg-brand transition-[opacity,scale] duration-400 group-hover/vid:scale-112"
            >
              <i className="absolute inset-0 animate-play-ring rounded-full border-2 border-play-ring" />
              <i className="absolute inset-0 animate-play-ring rounded-full border-2 border-play-ring [animation-delay:1.2s]" />
              <FilledIcon name="play" size={15} className="relative ml-0.75 text-white" />
            </span>
          </button>
        </DialogTrigger>
        <small className="mt-2.5 block text-[12.5px] text-ink-muted">{video.caption}</small>
      </div>

      <DialogPortal>
        <DialogOverlay className="z-90 bg-video-overlay" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 z-90 w-[min(960px,calc(100%-48px))] -translate-1/2 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
        >
          <DialogTitle className="sr-only">{video.modalLabel}</DialogTitle>
          <DialogClose
            aria-label={video.closeLabel}
            className="absolute -top-12 -right-1.5 size-10 cursor-pointer rounded-full border-0 bg-white text-[22px] leading-none text-ink"
          >
            <span aria-hidden="true">×</span>
          </DialogClose>
          <div className="relative grid aspect-video place-items-center overflow-hidden rounded-[18px] border border-white/20 bg-ink-night text-sm text-lav-strong">
            {/* The iframe only exists while the dialog is open, so closing it stops playback. */}
            {video.embedUrl ? (
              <iframe
                src={video.embedUrl}
                title={video.embedTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 size-full border-0"
              />
            ) : (
              video.placeholder
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
