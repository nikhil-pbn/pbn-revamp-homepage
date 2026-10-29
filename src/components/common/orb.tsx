import { cn } from "@/lib/utils";

/**
 * The floating AI orb artwork. Size it with `size-*` / `w-* h-*` classes.
 * The image and wobble animation are defined in globals.css (`bg-orb`, `animate-orb`).
 */
export function Orb({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("block size-[42px] flex-none animate-orb bg-orb", className)} />;
}
