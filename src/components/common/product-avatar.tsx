import Image from "next/image";

import { AVATARS, type AvatarKey } from "@/constants/images";
import { cn } from "@/lib/utils";

type ProductAvatarProps = {
  avatar: AvatarKey;
  /**
   * `face` crops tightly to the head for small circles/tiles.
   * `bust` shows head and shoulders for the large carousel cards.
   */
  crop?: "face" | "bust";
  /** Next/Image `sizes` hint, e.g. "48px". */
  sizes: string;
  className?: string;
  imageClassName?: string;
  alt?: string;
};

/**
 * One of the nine PbN 3D avatars (from `src/Avatars`). The wrapper controls the
 * size and shape; the image fills it and is cropped to the face or the bust.
 */
export function ProductAvatar({
  avatar,
  crop = "face",
  sizes,
  className,
  imageClassName,
  alt = "",
}: ProductAvatarProps) {
  return (
    <span className={cn("relative block flex-none overflow-hidden bg-lav", className)}>
      <Image
        src={AVATARS[avatar]}
        alt={alt}
        fill
        sizes={sizes}
        className={cn(
          "object-cover",
          crop === "face" ? "origin-[42%_24%] scale-[1.85] object-[42%_24%]" : "object-[40%_12%]",
          imageClassName,
        )}
      />
    </span>
  );
}
