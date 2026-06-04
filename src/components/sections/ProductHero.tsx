"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import {
  ArrowLeft,
  ArrowRight,
  ArrowRightLong,
  ChatIcon,
  StarIcon,
} from "@/components/ui/icons";
import { urlForImage } from "@/sanity/lib/image";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

/**
 * Product hero section.
 *
 * Figma layout (1440 frame, 96px side padding → 1248px content):
 *   ┌──────────── 560 ────────────┐   gap 40   ┌──────── 648 ────────┐
 *   │ Main image (560 × 520)      │            │ Reviews bar          │
 *   │ Thumbs (5 × 100 + 2 arrows) │            │ Title + subtitle     │
 *   │                             │            │ Description          │
 *   │                             │            │ Separator (80×1)     │
 *   │                             │            │ 3 badges (96 each)   │
 *   │                             │            │ Price € 12,99        │
 *   │                             │            │ Size selector (2)    │
 *   │                             │            │ IN WINKELMAND CTA    │
 *   └─────────────────────────────┘            └──────────────────────┘
 */
/** Subtle transforms per slot so the same source image reads as distinct
 *  variants in the preview gallery. Removed automatically once real
 *  Sanity images replace the fallback. */
const PREVIEW_TRANSFORMS = [
  "rotate(0deg) scale(1)",
  "rotate(15deg) scale(0.95)",
  "rotate(-12deg) scale(1.05)",
  "rotate(180deg) scale(0.9)",
  "rotate(-180deg) scale(1)",
];

export function ProductHero({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const sizes = product.sizes ?? [];
  const badges = product.badges ?? [];
  const reviews = product.reviews;

  // Real Sanity images take precedence; otherwise fall back to local previews.
  const sanityImages = product.images ?? [];
  const usingPreview = sanityImages.length === 0 && !!product.fallbackImageSrc;
  const slotCount = sanityImages.length || (usingPreview ? 5 : 0);

  const next = () =>
    slotCount && setActiveImage((i) => (i + 1) % slotCount);
  const prev = () =>
    slotCount && setActiveImage((i) => (i - 1 + slotCount) % slotCount);

  // Keyboard navigation: ← / → arrow keys cycle the gallery.
  useEffect(() => {
    if (!slotCount) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slotCount]);

  // Keep the active thumb visible by scrolling the strip horizontally,
  // not the page. We compute the scroll delta inside the strip's own
  // overflow container so the rest of the page never moves.
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const stripRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = thumbRefs.current[activeImage];
    if (!strip || !thumb) return;
    const stripRect = strip.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();
    const thumbCenter = thumbRect.left + thumbRect.width / 2;
    const stripCenter = stripRect.left + stripRect.width / 2;
    strip.scrollBy({ left: thumbCenter - stripCenter, behavior: "smooth" });
  }, [activeImage]);

  return (
    <section className="flex flex-col gap-3 px-4 py-6 md:gap-8 md:px-16 md:py-8 lg:px-24">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/shop" },
          { label: "Product name" },
        ]}
      />

      <div className="mx-auto flex w-full max-w-(--container-content) flex-col items-stretch gap-10 lg:flex-row lg:items-center">
        {/* LEFT — gallery */}
        <div className="flex w-full flex-col gap-3 lg:w-[560px] lg:shrink-0">
          {/* Main image */}
          <div className="relative aspect-[560/520] w-full overflow-hidden bg-cream-soft">
            {sanityImages[activeImage] ? (
              <Image
                key={activeImage}
                src={urlForImage(sanityImages[activeImage]).width(1200).url()}
                alt={product.title}
                fill
                priority
                className="animate-fade object-contain p-6"
                sizes="(min-width: 1024px) 560px, 100vw"
              />
            ) : product.fallbackImageSrc ? (
              <Image
                key={activeImage}
                src={product.fallbackImageSrc}
                alt={product.title}
                fill
                priority
                className="animate-fade object-contain p-6 transition-transform duration-500"
                style={{ transform: PREVIEW_TRANSFORMS[activeImage] }}
                sizes="(min-width: 1024px) 560px, 100vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-[12px] uppercase tracking-[0.18em] text-muted">
                Product image
              </div>
            )}
          </div>

          {/* Thumb strip.
              Figma layout: 5 thumbs × 102.4px + 4 × 12px gap = exactly 560px
              (fills the gallery column). Arrows are absolutely positioned
              over the row, hanging off the left/right edges of the
              first/last thumb so they hug the gallery boundary. */}
          <div className="relative h-[84px] w-full md:h-[100px]">
            {/* On mobile, leave clearance on both ends for the 32px arrow
                buttons (which sit absolute at left:4 / right:4). 44px = 32
                arrow + ~12 gap. On desktop the thumbs span the full row
                and the arrows hang off the outside edges. */}
            <div
              ref={stripRef}
              className="flex h-full items-start gap-3 overflow-x-auto px-11 [&::-webkit-scrollbar]:hidden md:overflow-visible md:px-0"
              style={{ scrollbarWidth: "none" }}
            >
              {(sanityImages.length
                ? sanityImages
                : (Array.from({ length: slotCount }) as Array<undefined>)
              ).map((img, i) => {
                const thumbSrc = img
                  ? urlForImage(img).width(180).height(180).url()
                  : product.fallbackImageSrc;
                const isActive = i === activeImage;
                return (
                  <button
                    key={i}
                    ref={(el) => {
                      thumbRefs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`Image ${i + 1}`}
                    aria-pressed={isActive}
                    className={cn(
                      "flex h-[84px] w-[80px] shrink-0 items-start p-[6px] transition-colors md:h-[100px] md:w-[102.4px]",
                      isActive && "border border-forest",
                    )}
                  >
                    <div className="relative h-[72px] w-[68px] overflow-hidden bg-cream-soft md:h-[88px] md:w-[90.4px]">
                      {thumbSrc && (
                        <Image
                          src={thumbSrc}
                          alt=""
                          fill
                          className="object-contain p-1 transition-transform duration-300"
                          style={
                            usingPreview
                              ? { transform: PREVIEW_TRANSFORMS[i] }
                              : undefined
                          }
                          sizes="90px"
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-1 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-forest bg-cream-soft text-ink md:left-0 md:-translate-x-1/2"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-1 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-forest bg-cream-soft text-ink md:right-0 md:translate-x-1/2"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* RIGHT — product info */}
        <div className="flex w-full flex-col gap-5">
          {/* Reviews bar.
              Mobile shows a single star + rating; desktop shows the full
              "85 reviews ★★★★★ 4.8" cluster. Border softens to a neutral
              line on mobile, forest on desktop. */}
          {reviews && (
            <div className="flex items-center gap-[18px] border-y border-[#E2DFDF] py-2 font-mono text-[14px] leading-[140%] text-muted md:border-forest">
              <div className="flex items-center gap-2">
                {reviews.count != null && (
                  <span className="hidden md:inline">{reviews.count} reviews</span>
                )}
                <span className="flex items-center gap-1 text-forest">
                  <StarIcon className="h-[18px] w-[18px] md:hidden" />
                  <span className="hidden items-center gap-1 md:flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} className="h-[18px] w-[18px]" />
                    ))}
                  </span>
                </span>
                {reviews.rating != null && <span>{reviews.rating}</span>}
              </div>

              {reviews.questions != null && (
                <>
                  <span className="h-[19px] w-px bg-rule" aria-hidden />
                  <div className="flex items-center gap-[7px]">
                    <ChatIcon className="h-[17px] w-[17px]" />
                    <span>{reviews.questions} vragen</span>
                  </div>
                </>
              )}

              {reviews.users && (
                <>
                  <span className="h-[19px] w-px bg-rule" aria-hidden />
                  <span>{reviews.users}</span>
                </>
              )}
            </div>
          )}

          {/* Title + subtitle */}
          <div className="flex flex-col gap-1">
            <h1 className="font-serif text-[40px] font-bold leading-[120%] tracking-[0.4px] text-ink md:text-[56px]">
              {product.title}
            </h1>
            {product.subtitle && (
              <span className="font-mono text-[14px] font-normal uppercase leading-[18px] tracking-[0.3em] text-forest-ink md:text-[16px] md:leading-6">
                {product.subtitle}
              </span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="font-mono text-[14px] font-normal leading-[140%] text-forest-ink md:text-[16px] md:leading-[165%]">
              {product.description}
            </p>
          )}

          {/* Separator */}
          <span className="block h-px w-20 bg-forest" aria-hidden />

          {/* Badges — mobile uses 16px gap to match Figma frame */}
          {badges.length > 0 && (
            <div className="flex items-center gap-4">
              {badges.map((b, i) => (
                <Badge key={i} badge={b} />
              ))}
            </div>
          )}

          {/* Price */}
          <div className="font-serif text-[32px] font-bold leading-[38px] text-forest-ink">
            {formatPrice(
              sizes[activeSize]?.price ?? product.price,
              product.currency ?? "EUR",
            )}
          </div>

          {/* Size selector */}
          {sizes.length > 0 && (
            <div className="flex items-start gap-2">
              {sizes.map((size, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveSize(i)}
                  className={cn(
                    "flex h-[42px] items-start border border-forest px-[22px] py-[14px] font-mono text-[11px] font-normal uppercase leading-[14px] tracking-[0.14em] transition-colors",
                    i === activeSize
                      ? "bg-forest text-cream"
                      : "bg-transparent text-forest",
                  )}
                >
                  {size.label}
                </button>
              ))}
            </div>
          )}

          {/* CTA */}
          <button
            type="button"
            className="flex h-[52px] w-full items-center justify-center gap-3 bg-forest px-6 py-[18px] font-mono text-[12px] font-normal uppercase leading-4 tracking-[0.22em] text-cream transition-colors hover:bg-forest-deep"
          >
            <span>In winkelmand</span>
            <ArrowRightLong className="h-3 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
