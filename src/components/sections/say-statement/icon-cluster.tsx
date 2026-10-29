import type { ClusterIcon, ClusterIconSpec } from "@/constants/say-statement";
import { FilledIcon, Icon } from "@/icons";
import { cn } from "@/lib/utils";

type IconClusterProps = {
  items: readonly ClusterIconSpec[];
  /** Stroke width of the stroke icons. */
  strokeWidth: number;
  className?: string;
};

function ClusterGlyph({ icon, strokeWidth }: { icon: ClusterIcon; strokeWidth: number }) {
  if (icon.kind === "filled") return <FilledIcon name={icon.name} className="text-white" />;
  return icon.name !== undefined ? (
    <Icon name={icon.name} strokeWidth={strokeWidth} className="text-white" />
  ) : (
    <Icon d={icon.d} strokeWidth={strokeWidth} className="text-white" />
  );
}

/**
 * Inline row of overlapping coloured circles with white icons. Sized in `em`,
 * so it scales with the surrounding text (1em circles, 0.46em icons).
 * Used by the "Say" statement and the closing marquee.
 */
export function IconCluster({ items, strokeWidth, className }: IconClusterProps) {
  return (
    <span aria-hidden="true" className={cn("inline-flex translate-y-[-0.06em] align-middle", className)}>
      {items.map((item) => (
        <i
          key={item.className}
          className={cn(
            "ml-[-0.24em] inline-grid size-[1em] place-items-center rounded-full border-[0.06em] border-white shadow-icon-dot first:ml-0 [&_svg]:size-[0.46em]",
            item.className,
          )}
        >
          <ClusterGlyph icon={item.icon} strokeWidth={strokeWidth} />
        </i>
      ))}
    </span>
  );
}
