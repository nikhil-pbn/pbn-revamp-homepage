"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { HeroScene } from "@/constants/hero";

import { EASE_PBN } from "./scene-timing";

/** Practice team member who pops up on the board's right edge when a scene finishes. */
export function TeamMember({ member, show }: { member: HeroScene["member"]; show: boolean }) {
  return (
    <motion.div
      className="absolute -right-14 bottom-28 z-4 flex items-center gap-2 max-xl:hidden"
      initial={false}
      animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ opacity: { duration: 0.4 }, scale: { duration: 0.5, ease: EASE_PBN } }}
    >
      <em className="rounded-[14px_14px_4px_14px] bg-white px-3.5 py-2.25 text-[12.5px] leading-[1.35] whitespace-nowrap not-italic shadow-float-strong">
        <b className="block text-[10.5px] font-medium text-ink-muted">{member.role}</b>
        <span>{member.quip}</span>
      </em>
      <Image
        src={member.image}
        alt=""
        width={56}
        height={56}
        sizes="56px"
        className="size-14 flex-none rounded-full object-cover shadow-me-avatar"
      />
    </motion.div>
  );
}
