import { Icon } from "@/icons";
import { cn } from "@/lib/utils";

type CheckListProps = {
  items: readonly string[];
  /** Tailwind text colour for the tick, e.g. `text-green`, `text-brand`, `text-mint`. */
  tickClassName?: string;
  className?: string;
  itemClassName?: string;
};

/** Bulleted list with a tick icon in front of each item. */
export function CheckList({ items, tickClassName = "text-green", className, itemClassName }: CheckListProps) {
  return (
    <ul className={cn("m-0 flex list-none flex-col gap-2.5 p-0", className)}>
      {items.map((item) => (
        <li key={item} className={cn("flex gap-3 text-[15px] leading-normal", itemClassName)}>
          <Icon name="check" strokeWidth={2.8} className={cn("mt-[3px]", tickClassName)} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
