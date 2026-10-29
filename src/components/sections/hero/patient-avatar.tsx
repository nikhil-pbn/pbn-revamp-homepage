import Image from "next/image";

import type { HeroPatient } from "@/constants/hero";
import { cn } from "@/lib/utils";

/** Small round patient headshot used throughout the demo board (`.hv-pav`). */
export function PatientAvatar({
  patient,
  size = 26,
  className,
}: {
  patient: HeroPatient;
  /** Intrinsic size in px. */
  size?: number;
  /** Rendered size + shadow; defaults to the 26px `.hv-pav` look. */
  className?: string;
}) {
  return (
    <Image
      src={patient.photo}
      alt=""
      width={size}
      height={size}
      sizes={`${size}px`}
      className={cn("flex-none rounded-full object-cover", className ?? "size-6.5 shadow-pav")}
    />
  );
}
