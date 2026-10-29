import { FOUNDER } from "@/constants/founder";

const COPIES = Array.from({ length: FOUNDER.marqueeRepeat }, (_, i) => i);

/** Giant, slow-scrolling type band behind the founder grid. */
export function FounderMarquee() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-[74%] left-1/2 w-screen -translate-1/2 overflow-hidden"
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {COPIES.map((i) => (
          <span
            key={i}
            className="pr-12 text-[clamp(80px,11vw,170px)] leading-none font-medium tracking-[-0.06em] whitespace-nowrap text-lav max-md:text-[60px]"
          >
            {FOUNDER.marquee.lead}
            <em className="text-brand/14 not-italic">{FOUNDER.marquee.accent}</em>
          </span>
        ))}
      </div>
    </div>
  );
}
