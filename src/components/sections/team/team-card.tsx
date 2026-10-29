import { ProductAvatar } from "@/components/common";
import { TEAM_SECTION, type TeamCard as TeamCardData } from "@/constants/team";
import { Icon } from "@/icons";
import { cn } from "@/lib/utils";

/** One feature card in the team carousel. */
export function TeamCard({ card, dim }: { card: TeamCardData; dim: boolean }) {
  return (
    <article
      className={cn(
        "group/card flex w-80 flex-none snap-start flex-col gap-2.5 rounded-[22px] bg-white px-2.5 pt-2.5 pb-4 shadow-agent-card transition-[scale,opacity] duration-400 ease-pbn max-xs:w-65",
        dim && "scale-97 opacity-55",
      )}
    >
      <div className="relative aspect-560/495 overflow-hidden rounded-2xl bg-lav">
        <ProductAvatar
          avatar={card.avatar}
          crop="bust"
          sizes="(max-width: 560px) 260px, 320px"
          alt={`${card.title} avatar`}
          className="absolute inset-0 size-full"
          imageClassName="transition-transform duration-700 ease-expo group-hover/card:scale-105"
        />
        <span className="absolute inset-x-2.5 bottom-2.5 flex items-center gap-2 truncate rounded-full py-1.5 pr-3 pl-1.5 text-[12.5px] font-medium text-ink shadow-agent-chip bg-glass">
          <ProductAvatar avatar={card.avatar} sizes="24px" className="size-6 rounded-full" />
          {card.outcome}
          <i className="ml-auto text-green-ink not-italic">
            <Icon name="check" size={14} strokeWidth={2.6} />
          </i>
        </span>
      </div>
      <h3 className="mx-2 mt-1 mb-0 text-lg font-medium tracking-[-0.02em]">{card.title}</h3>
      <p className="mx-2 my-0 min-h-[61px] text-[13.5px] leading-normal text-ink-soft max-xs:min-h-0">{card.text}</p>
      <div className="mx-2 mt-1 flex items-center justify-between">
        <span className={cn("grid size-7.5 flex-none place-items-center rounded-[9px] text-white", card.iconClassName)}>
          <Icon name={card.icon} size={15} strokeWidth={1.7} />
        </span>
        <a
          href={card.href}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium text-ink shadow-inset-ink transition-colors duration-200 hover:bg-ink hover:text-white"
        >
          {TEAM_SECTION.learnMore}
          <span className="sr-only">: {card.title}</span> <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}
