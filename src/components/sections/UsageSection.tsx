"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { urlForImage } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import type { Product, UsageCard } from "@/lib/types";

/**
 * Section 03 — usage cards.
 *
 * Desktop (lg+): 4 cards in a row. Hover/click expands a card to 420px
 * (forest fill, cream text, flower illustration); inactive cards stay at
 * 277px. Adjacent cards collapse a 1px border via -mx-px overlap.
 *
 * Mobile (<lg): horizontal scroll-snap carousel of fixed 320×420 cards.
 * The card whose center is closest to the viewport center becomes the
 * active one, so swiping the row toggles state without needing a tap.
 * Tapping a card also activates it explicitly.
 */
export function UsageSection({
  data,
}: {
  data: NonNullable<Product["section03"]>;
}) {
  const cards = data.cards ?? [];
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  // On mobile we drive `active` from scroll position instead of hover.
  const visibleActive = hovered ?? active;

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Watch horizontal scroll position on mobile and mark whichever card's
  // center is nearest the scroller's center as active.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let frame = 0;
    const update = () => {
      const sr = scroller.getBoundingClientRect();
      const mid = sr.left + sr.width / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const cr = el.getBoundingClientRect();
        const center = cr.left + cr.width / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      setActive(bestIdx);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [cards.length]);

  // When `active` changes (tap or hover) on a small screen, scroll the
  // tapped card into view so it visually matches state.
  const handleClick = (i: number) => {
    setActive(i);
    const card = cardRefs.current[i];
    const scroller = scrollerRef.current;
    if (card && scroller && scroller.scrollWidth > scroller.clientWidth) {
      const cr = card.getBoundingClientRect();
      const sr = scroller.getBoundingClientRect();
      const delta = cr.left + cr.width / 2 - (sr.left + sr.width / 2);
      scroller.scrollBy({ left: delta, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#EEE8DA] lg:bg-cream">
      <Container as="div" className="flex flex-col gap-8 py-10 lg:py-24">
        <div className="flex max-w-[423px] flex-col gap-2">
          {data.label && (
            <span className="font-mono text-[12px] font-normal uppercase leading-4 text-forest">
              {data.label}
            </span>
          )}
          {data.heading && (
            <h2 className="font-serif text-[32px] font-bold leading-[120%] tracking-[0.4px] text-ink lg:text-[44px] lg:leading-[110%] lg:text-forest-ink">
              {data.heading}
            </h2>
          )}
          {data.subheading && (
            <p className="font-mono text-[16px] font-normal leading-[165%] text-muted">
              {data.subheading}
            </p>
          )}
        </div>

        {cards.length > 0 && (
          <div
            ref={scrollerRef}
            className="-mx-4 flex snap-x snap-mandatory flex-row items-start overflow-x-auto scroll-smooth px-4 pb-2 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
            onMouseLeave={() => setHovered(null)}
          >
            {cards.map((card, i) => (
              <UsageCardEl
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                card={card}
                isActive={i === visibleActive}
                onClick={() => handleClick(i)}
                onHover={() => setHovered(i)}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

type CardProps = {
  card: UsageCard;
  isActive: boolean;
  onClick: () => void;
  onHover: () => void;
  ref?: React.Ref<HTMLButtonElement>;
};

function UsageCardEl({ card, isActive, onClick, onHover, ref }: CardProps) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseEnter={onHover}
      onFocus={onHover}
      aria-pressed={isActive}
      className={cn(
        "relative flex h-[420px] w-[320px] shrink-0 snap-center flex-col justify-between overflow-hidden p-5 text-left transition-[width,background-color,color] duration-500 ease-out lg:-mx-px lg:h-[480px] lg:snap-none lg:p-6",
        isActive
          ? "z-10 bg-forest lg:w-[420px]"
          : "border border-card-border bg-cream lg:w-[277px] lg:flex-1",
      )}
    >
      {/* Numeral */}
      <span
        className={cn(
          "relative z-10 font-display text-[56px] font-bold leading-[120%] tracking-[0.4px] transition-[color,opacity] duration-500",
          isActive ? "text-cream" : "text-forest opacity-40",
        )}
      >
        {card.number}
      </span>

      {/* Active card has a botanical illustration positioned top-right */}
      {isActive && (card.image || card.fallbackImageSrc) && (
        <div
          className="pointer-events-none absolute right-0 top-0 h-[316px] w-[319px] animate-fade"
          aria-hidden
        >
          <Image
            src={
              card.image
                ? urlForImage(card.image).width(640).url()
                : (card.fallbackImageSrc as string)
            }
            alt=""
            fill
            className="object-contain object-right-top mix-blend-hard-light"
            sizes="320px"
            priority
          />
        </div>
      )}

      {/* Title + description */}
      <div className="relative z-10 flex flex-col gap-5">
        <h3
          className={cn(
            "font-serif text-[20px] font-medium uppercase leading-[130%] transition-colors duration-500",
            isActive ? "text-cream" : "text-forest",
          )}
        >
          {card.title}
        </h3>
        {isActive && card.description && (
          <p className="animate-fade font-mono text-[16px] font-normal leading-[140%] text-cream/72">
            {card.description}
          </p>
        )}
      </div>
    </button>
  );
}
