"use client";

import { AnimatePresence, motion } from "framer-motion";

import { HERO_COPY } from "@/constants/hero";

import { BoardChrome } from "./board-chrome";
import { DemoCursor } from "./demo-cursor";
import { useHeroDemo } from "./hero-demo";
import { EASE_PBN } from "./scene-timing";
import { SceneView } from "./scenes";
import { StatusBars } from "./status-bars";
import { TeamMember } from "./team-member";

/**
 * The right-hand product board (`.hv`): board chrome, the live scene, the
 * floating status bars, the demo cursor and the team-member pop-up.
 * Hovering pauses auto-advance; leaving plays the next scene shortly after.
 */
export function DemoStage() {
  const {
    scene,
    runId,
    cursor,
    reduced,
    finished,
    showWorking,
    showDone,
    showMember,
    setStage,
    moveCursor,
    onStageEnter,
    onStageLeave,
  } = useHeroDemo();

  return (
    <div
      ref={setStage}
      role="group"
      aria-label={HERO_COPY.previewLabel}
      className="relative my-10 ml-9 max-xl:my-12 max-xl:ml-0 max-md:mb-10"
      onMouseEnter={onStageEnter}
      onMouseLeave={onStageLeave}
    >
      <div className="relative overflow-hidden rounded-[18px] border border-line bg-white text-[12.5px] shadow-board">
        <BoardChrome scene={scene} />
        <div className="relative h-93 overflow-hidden max-xl:h-85">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={runId}
              className="h-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.5, ease: EASE_PBN }}
            >
              <SceneView scene={scene} reduced={reduced} finished={finished} moveCursor={moveCursor} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <StatusBars scene={scene} working={showWorking} done={showDone} />
      {!reduced && <DemoCursor {...cursor} />}
      <TeamMember member={scene.member} show={showMember} />
    </div>
  );
}
