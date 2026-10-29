import { Reveal } from "@/components/common";
import { Button, ButtonArrow } from "@/components/ui/button";
import { AI_RECEPTIONIST } from "@/constants/ai-receptionist";

import { CallFlow } from "./call-flow";
import { HelloHeadline } from "./hello-headline";
import { ReceptionistVideo } from "./receptionist-video";

/** "Say Hello to PbN AI Receptionist!" — intro copy + video on the left, animated call flow on the right. */
export function AiReceptionist() {
  const { titleId, body, learnMore, live } = AI_RECEPTIONIST;

  return (
    <section id="ai-receptionist" aria-labelledby={titleId} className="wrap pt-28 max-md:pt-section">
      <div className="grid grid-cols-[minmax(0,460px)_minmax(0,1fr)] items-center gap-12 max-[1080px]:grid-cols-1 max-[1080px]:gap-10">
        <Reveal className="flex flex-col items-start gap-5 max-lg:items-center max-lg:text-center">
          <HelloHeadline id={titleId} />
          <p className="m-0 text-base leading-[1.6] text-ink-soft">{body}</p>
          <div className="flex flex-wrap gap-2.5 max-lg:justify-center">
            <Button asChild variant="dark">
              <a href={learnMore.href}>
                {learnMore.label} <ButtonArrow />
              </a>
            </Button>
            <Button asChild variant="soft" className="text-sm">
              <a href={live.href}>
                <span aria-hidden="true" className="size-2 animate-blink rounded-full bg-green" />
                {live.label} <b className="font-medium">{live.phone}</b>
              </a>
            </Button>
          </div>
          <ReceptionistVideo />
        </Reveal>
        <CallFlow />
      </div>
    </section>
  );
}
