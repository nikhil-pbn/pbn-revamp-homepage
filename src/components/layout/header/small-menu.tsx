import { MENU_TILE_COLORS, type MenuGroup } from "@/constants/navigation";
import { PLACEHOLDER_HREF } from "@/constants/site";
import { Icon } from "@/icons";
import { cn } from "@/lib/utils";

/** Compact dropdown (Use Cases, Company, Resources, Support): one column per group. */
export function SmallMenu({ groups, wide }: { groups: MenuGroup[]; wide?: boolean }) {
  // Tile colours cycle across all items of the menu, not per group.
  let tile = 0;

  return (
    <div className="flex items-stretch">
      {groups.map((group, g) => (
        <div
          key={group.title}
          className={cn(
            "flex flex-col gap-0.5 px-4 py-[18px]",
            wide ? "w-[360px]" : "w-[300px]",
            g > 0 && "shadow-divider-left",
          )}
        >
          <h6 className="m-0 mx-2.5 mb-2 text-[11px] font-medium tracking-widest text-ink-muted uppercase">
            {group.title}
          </h6>
          {group.items.map((item) => (
            <a
              key={item.title}
              href={PLACEHOLDER_HREF}
              className="group/item flex gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-panel"
            >
              <span
                className={cn(
                  "grid size-[34px] flex-none place-items-center rounded-[10px] text-white",
                  MENU_TILE_COLORS[tile++ % MENU_TILE_COLORS.length],
                )}
              >
                <Icon name={item.icon} size={17} strokeWidth={1.7} />
              </span>
              <span>
                <b
                  className={cn(
                    "block text-sm font-medium transition-colors duration-200 group-hover/item:text-brand",
                    wide && "whitespace-nowrap",
                  )}
                >
                  {item.title}
                </b>
                {item.description && (
                  <small className="block text-xs leading-[1.4] text-ink-muted">{item.description}</small>
                )}
              </span>
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}
