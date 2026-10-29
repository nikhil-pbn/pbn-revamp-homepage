import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

import { FILLED_ICON_PATHS, ICON_PATHS, type FilledIconName, type IconName } from "./paths";

type IconSource =
  | { name: IconName; d?: never }
  /** A raw 24×24 path, for icons that only one section uses (keep the path in that section's constants). */
  | { d: string; name?: never };

type IconProps = Omit<SVGProps<SVGSVGElement>, "name" | "d"> &
  IconSource & {
    /** Rendered width/height in px. */
    size?: number;
    strokeWidth?: number;
  };

/**
 * Stroke icon. Colour follows `currentColor`, so set it with a `text-*` class.
 */
export function Icon({ name, d, size = 16, strokeWidth = 2, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path d={name ? ICON_PATHS[name] : d} />
    </svg>
  );
}

type FilledIconProps = Omit<SVGProps<SVGSVGElement>, "name" | "d"> &
  ({ name: FilledIconName; d?: never } | { d: string; name?: never }) & {
    size?: number;
  };

/** Solid icon. Colour follows `currentColor`. */
export function FilledIcon({ name, d, size = 16, className, ...props }: FilledIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path d={name ? FILLED_ICON_PATHS[name] : d} />
    </svg>
  );
}
