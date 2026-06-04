import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Checkmark } from "@/components/ui/Checkmark";
import { urlForImage } from "@/sanity/lib/image";
import type { Product } from "@/lib/types";

/**
 * Section 01 — Why this oil is special.
 *
 * Desktop (lg+): 2-column grid — text + checklist on the left, image + specs
 * table on the right. Checkmarks render in forest.
 *
 * Mobile (<lg): single column stacked in order — heading, subhead, bullets,
 * spec table, image last. Heading shrinks to 32px and the checkmarks
 * lighten to sage #A8B2A8 per the mobile Figma frame.
 */
export function WhySection({ data }: { data: NonNullable<Product["section01"]> }) {
  return (
    <Container
      as="section"
      className="grid gap-8 py-10 lg:grid-cols-2 lg:gap-16 lg:py-20"
    >
      <div className="flex flex-col gap-6 lg:gap-8">
        {data.label && (
          <span className="font-mono text-[12px] font-normal uppercase leading-4 text-forest">
            {data.label}
          </span>
        )}
        {data.heading && (
          <h2 className="font-serif text-[32px] font-bold leading-[120%] tracking-[0.4px] text-ink lg:text-[44px] lg:leading-[110%]">
            {data.heading}
          </h2>
        )}
        {data.subheading && (
          <p className="font-mono text-[16px] font-normal leading-[165%] text-muted">
            {data.subheading}
          </p>
        )}

        {data.bullets && data.bullets.length > 0 && (
          <ul className="flex flex-col gap-3">
            {data.bullets.map((bullet, i) => (
              <li
                key={i}
                className="flex items-start gap-3 font-mono text-[16px] font-normal leading-[140%] tracking-[-0.04em] text-muted"
              >
                <Checkmark className="mt-1 h-4 w-4 shrink-0 text-[#A8B2A8] lg:text-forest" />
                <span className="flex-1">{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {/* MOBILE: spec table appears here, between bullets and image */}
        {data.specs && data.specs.length > 0 && (
          <table className="w-full border-collapse lg:hidden">
            <tbody>
              {data.specs.map((spec, i) => (
                <tr key={i}>
                  <th
                    scope="row"
                    className="w-[96px] border border-forest/20 bg-cream-soft px-3 py-2 text-left align-middle font-serif text-[12px] font-medium uppercase leading-[140%] text-ink"
                  >
                    {spec.label}
                  </th>
                  <td className="border border-l-0 border-forest/20 px-3 py-2 align-middle font-mono text-[14px] font-normal leading-[140%] text-muted">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex flex-col gap-6">
        {(data.image || data.fallbackImageSrc) && (
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={
                data.image
                  ? urlForImage(data.image).width(1400).url()
                  : (data.fallbackImageSrc as string)
              }
              alt={data.image?.alt ?? data.heading ?? ""}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        )}

        {/* DESKTOP: spec table sits next to image */}
        {data.specs && data.specs.length > 0 && (
          <table className="hidden w-full border-collapse lg:table">
            <tbody>
              {data.specs.map((spec, i) => (
                <tr key={i} className="h-10">
                  <th
                    scope="row"
                    className="w-[124px] border border-forest/20 bg-cream-soft px-4 py-3 text-left align-middle font-serif text-[12px] font-medium uppercase leading-[140%] text-ink"
                  >
                    {spec.label}
                  </th>
                  <td className="border border-l-0 border-forest/20 px-4 py-3 align-middle font-mono text-[14px] font-normal leading-[140%] text-muted">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Container>
  );
}
