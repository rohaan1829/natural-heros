import { Container } from "@/components/ui/Container";
import type { Product } from "@/lib/types";

/** Total bars in each composition meter (Figma uses 30). */
const BAR_COUNT = 30;

/**
 * Renders the composition meter: 30 vertical 4×48px bars with an 8px gap.
 * Filled bars are forest green; the remainder are forest at 20% opacity.
 *
 * On mobile the meter spans the full row width; on desktop it's pinned
 * to 352px in the right column. Either way each bar keeps its 4×48 size
 * and the gap absorbs slack via flex-1.
 */
function CompositionBars({ percentage }: { percentage: number }) {
  const filled = Math.round((percentage / 100) * BAR_COUNT);
  return (
    <div className="flex w-full flex-col items-start gap-2 lg:w-[352px]">
      <div
        className="flex h-12 w-full items-center justify-between gap-2"
        role="img"
        aria-label={`${percentage} percent`}
      >
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <span
            key={i}
            className={
              i < filled ? "h-12 w-1 bg-forest" : "h-12 w-1 bg-forest/20"
            }
          />
        ))}
      </div>
      <span className="font-mono text-[48px] font-medium leading-[120%] tracking-[0.4px] text-ink">
        {percentage}%
      </span>
    </div>
  );
}

/**
 * Section 02 — what's in this oil.
 *
 * Mobile (<lg): single-column stack — name, description, bars+%. 40×16
 * section padding, 32px heading, 48px gap between rows.
 * Desktop (lg+): 3-column row (name 244 · description 420 · bars 352)
 * with 24px section padding, 44px heading, 40px gap between rows.
 */
export function CompositionSection({
  data,
}: {
  data: NonNullable<Product["section02"]>;
}) {
  return (
    <section className="bg-cream-soft">
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

        {data.components && data.components.length > 0 && (
          <div className="flex flex-col gap-12 lg:gap-10">
            {data.components.map((component, i) => (
              <div
                key={i}
                className="flex flex-col gap-5 border-t border-forest pt-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8"
              >
                <h3 className="font-serif text-[20px] font-medium uppercase leading-[130%] text-ink lg:w-[244px]">
                  {component.name}
                </h3>
                <p className="font-mono text-[16px] font-normal leading-[140%] text-muted lg:w-[420px]">
                  {component.description}
                </p>
                <CompositionBars percentage={component.percentage} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
