import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { urlForImage } from "@/sanity/lib/image";
import type { BotanicalCard, Product } from "@/lib/types";

/**
 * Section 05 — botanical / origin grid.
 *
 * 2 rows × 3 columns of cards, each card contains:
 *   image (top, fills available space)
 *   label · title · 40×1px green rule · description
 *
 * Cards share 1px borders (Figma uses -1px horizontal margin so
 * adjacent borders collapse into a single line). Identical card
 * heights keep the rows aligned regardless of description length.
 */
export function BotanicalSection({
  data,
}: {
  data: NonNullable<Product["section05"]>;
}) {
  const cards = data.cards ?? [];

  return (
    <section className="bg-cream">
      <Container as="div" className="flex flex-col gap-8 py-10 lg:py-24">
        {/* Section header */}
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

        {/* Card grid — single column stack on mobile, 3-column row+wrap
            on desktop. Cards share borders via -m-px (collapses adjacent
            borders into a single 1px line). */}
        {cards.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {cards.map((card, i) => (
              <BotanicalCardEl key={i} card={card} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

function BotanicalCardEl({ card }: { card: BotanicalCard }) {
  return (
    <article className="-m-px flex h-[540px] flex-col justify-end border border-card-border bg-cream p-6">
      {/* Image area — fills the top portion of the card */}
      {(card.image || card.fallbackImageSrc) && (
        <div className="relative h-[264px] w-full overflow-hidden">
          <Image
            src={
              card.image
                ? urlForImage(card.image).width(800).url()
                : (card.fallbackImageSrc as string)
            }
            alt={card.title}
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 400px, 100vw"
          />
        </div>
      )}

      {/* Text area */}
      <div className="flex flex-col gap-4 pt-5">
        <span className="font-mono text-[14px] font-normal uppercase leading-[140%] tracking-[0.12em] text-muted">
          {card.label}
        </span>
        <h3 className="font-serif text-[24px] font-medium uppercase leading-[120%] tracking-[0.4px] text-ink">
          {card.title}
        </h3>
        <span
          className="block h-px w-10 bg-forest"
          aria-hidden
        />
        {card.description && (
          <p className="font-mono text-[16px] font-normal leading-[140%] text-forest/72">
            {card.description}
          </p>
        )}
      </div>
    </article>
  );
}
