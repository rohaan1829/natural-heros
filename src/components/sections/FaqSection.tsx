"use client";

import { useState } from "react";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import type { FaqItem, Product } from "@/lib/types";

/**
 * Section 06 — FAQ.
 *
 * Two-column layout: left holds the heading + a "Contact us" callout
 * card, right holds an expandable accordion of questions.
 *
 * Accordion behavior: clicking a question expands it and collapses any
 * other open question (single-open mode). The expanded item gets a
 * forest border, a brighter background and reveals its answer; the
 * indicator switches from + to −.
 */
export function FaqSection({
  data,
}: {
  data: NonNullable<Product["section06"]>;
}) {
  const items = data.items ?? [];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-cream-soft">
      <Container
        as="div"
        className="flex flex-col gap-8 py-10 lg:flex-row lg:gap-8 lg:py-24"
      >
        {/* Header + contact callout — stacked above on mobile, left column on desktop */}
        <div className="flex flex-col justify-between gap-8 lg:w-[560px] lg:shrink-0">
          <div className="flex flex-col gap-2 lg:max-w-[411px]">
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

          {data.callout && (
            <div className="flex h-[156px] w-full flex-col items-start justify-end gap-6 border border-forest/20 bg-[#F1EDE3] p-5 lg:h-[164px] lg:w-[359px] lg:p-6">
              {data.callout.text && (
                <p className="max-w-[298px] font-serif text-[16px] font-normal leading-[140%] text-ink">
                  {data.callout.text}
                </p>
              )}
              {data.callout.buttonLabel && (
                <a
                  href={data.callout.buttonHref ?? "#"}
                  className="inline-flex h-12 w-[137px] items-center justify-center bg-forest px-[22px] py-3 font-mono text-[15px] font-medium leading-[140%] tracking-[0.02em] text-white transition-colors hover:bg-forest-deep"
                >
                  {data.callout.buttonLabel}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Accordion */}
        <div className="flex flex-1 flex-col gap-2">
          {items.map((item, i) => (
            <FaqItemEl
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FaqItemEl({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border px-6 py-5 transition-colors",
        isOpen
          ? "border-forest bg-white/32"
          : "border-forest/20 bg-cream-soft",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="font-serif text-[16px] font-normal leading-[140%] text-ink">
          {item.question}
        </span>
        <span
          className="font-serif text-[22px] font-bold leading-[26px] text-forest"
          aria-hidden
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && item.answer && (
        <p className="animate-fade font-mono text-[14px] font-normal leading-[165%] tracking-[-0.02em] text-muted">
          {item.answer}
        </p>
      )}
    </div>
  );
}
