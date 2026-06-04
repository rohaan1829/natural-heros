import Image from "next/image";

import { urlForImage } from "@/sanity/lib/image";
import type { Badge as BadgeData } from "@/lib/types";

/**
 * Product feature badge — 96×80 block.
 *
 * The badge image (whether served by Sanity or a local fallback) already
 * contains both the icon and its label baked in. We render it as a
 * single block to preserve the designer's typography exactly.
 */
export function Badge({ badge }: { badge: BadgeData }) {
  const src = badge.icon
    ? urlForImage(badge.icon).width(192).height(160).url()
    : badge.fallbackSrc;

  if (!src) return null;

  return (
    <div className="relative h-20 w-24">
      <Image
        src={src}
        alt={badge.alt ?? badge.label}
        fill
        sizes="96px"
        className="object-contain"
      />
    </div>
  );
}
