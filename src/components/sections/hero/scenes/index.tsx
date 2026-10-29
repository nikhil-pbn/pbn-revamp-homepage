"use client";

import type { HeroScene } from "@/constants/hero";

import { AnalyticsScene } from "./analytics-scene";
import { FormsScene } from "./forms-scene";
import { InsuranceScene } from "./insurance-scene";
import { PaymentsScene } from "./payments-scene";
import { ReceptionistScene } from "./receptionist-scene";
import { SchedulingScene } from "./scheduling-scene";
import { TextingScene } from "./texting-scene";
import type { SceneProps } from "./types";
import { VoiceScene } from "./voice-scene";

/** Renders the live view for whichever feature scene is playing. */
export function SceneView({ scene, ...props }: SceneProps<HeroScene>) {
  switch (scene.id) {
    case "rec":
      return <ReceptionistScene scene={scene} {...props} />;
    case "voice":
      return <VoiceScene scene={scene} {...props} />;
    case "sched":
      return <SchedulingScene scene={scene} {...props} />;
    case "pay":
      return <PaymentsScene scene={scene} {...props} />;
    case "ins":
      return <InsuranceScene scene={scene} {...props} />;
    case "forms":
      return <FormsScene scene={scene} {...props} />;
    case "text":
      return <TextingScene scene={scene} {...props} />;
    case "iq":
      return <AnalyticsScene scene={scene} {...props} />;
  }
}
