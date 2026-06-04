"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { urlForImage } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import type { Product, ProcessStep } from "@/lib/types";

/**
 * Section 04 — process timeline.
 *
 * Mobile (<lg): header stacks above the timeline. Track sits flush left,
 *               content (image + text) takes the remaining ~278px column.
 *               Step labels shrink to 32 (active) / 20 (others); image
 *               heights drop to 396 / 234; text and title shrink as well.
 *
 * Desktop (lg+): header column on the left (sticky), big timeline on the
 *               right with 480×360 images and 56px active labels.
 *
 * The active step is the one whose center is closest to the viewport
 * center, with a hysteresis zone so the active index doesn't flicker
 * when two steps are equidistant. Image scaling uses CSS transforms
 * (not width/height) so the layout never reflows.
 */
export function ProcessSection({
  data,
}: {
  data: NonNullable<Product["section04"]>;
}) {
  const steps = data.steps ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!steps.length) return;
    let frame = 0;
    let lastIndex = 0;

    const update = () => {
      const mid = window.innerHeight / 2;
      const distances: Array<{ idx: number; dist: number }> = [];
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        distances.push({ idx: i, dist: Math.abs(center - mid) });
      });
      if (!distances.length) return;

      distances.sort((a, b) => a.dist - b.dist);
      const winner = distances[0];
      if (winner.idx === lastIndex) return;
      const currentDist = distances.find((d) => d.idx === lastIndex)?.dist ?? Infinity;
      if (currentDist - winner.dist < 80) return;
      lastIndex = winner.idx;
      setActiveIndex(winner.idx);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [steps.length]);

  return (
    <section className="bg-sage">
      <Container
        as="div"
        className="flex flex-col gap-8 py-10 lg:flex-row lg:justify-between lg:py-24"
      >
        {/* Section header — stacked above on mobile, sticky on left on desktop */}
        <div className="flex h-fit flex-col gap-2 lg:sticky lg:top-24 lg:max-w-[423px]">
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

        {/* Timeline — full width on mobile (with extra left padding so the
            rotated STEP label has room to sit beside the track), narrower
            column on desktop. */}
        <div className="flex flex-col pl-10 lg:pl-0">
          {steps.map((step, i) => (
            <Step
              key={i}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              step={step}
              isActive={i === activeIndex}
              isFirst={i === 0}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

type StepProps = {
  step: ProcessStep;
  isActive: boolean;
  isFirst: boolean;
  ref?: React.Ref<HTMLDivElement>;
};

function Step({ step, isActive, isFirst, ref }: StepProps) {
  const trackColor = isActive ? "bg-forest" : "bg-track-muted";

  return (
    <div
      ref={ref}
      className={cn("flex h-[568px] flex-row", !isFirst && "-mt-1")}
    >
      {/* Track column — 40px wide */}
      <div className="relative flex h-full w-10 shrink-0 flex-col items-center">
        <div
          className={cn("h-1 w-5 transition-colors duration-500", trackColor)}
          aria-hidden
        />
        <div
          className={cn("w-[2px] flex-1 transition-colors duration-500", trackColor)}
          aria-hidden
        />
        <div
          className={cn("h-1 w-5 transition-colors duration-500", trackColor)}
          aria-hidden
        />

        {/* Rotated STEP label — sits to the LEFT of the track in the
            section's gutter, both on mobile and desktop. */}
        <div
          className="pointer-events-none absolute right-[calc(50%+2px)] top-[68%] flex h-0 w-0 items-center justify-end"
          aria-hidden
        >
          <span
            className={cn(
              "block origin-center whitespace-nowrap rotate-[-90deg] font-serif uppercase text-ink transition-[font-size,font-weight] duration-500",
              isActive
                ? "text-[32px] font-bold leading-none tracking-[0.4px] lg:text-[56px]"
                : "text-[20px] font-medium leading-none",
            )}
          >
            {step.label}
          </span>
        </div>
      </div>

      {/* Content column — 1fr on mobile (≈278), 544 on desktop */}
      <div className="flex flex-1 flex-col justify-end gap-5 p-5 lg:w-[544px] lg:flex-none lg:justify-center lg:gap-8 lg:p-8">
        {(step.image || step.fallbackImageSrc) && (
          <div
            className={cn(
              "relative w-full overflow-visible transition-[height] duration-500",
              // Mobile: active=396 tall, inactive=234. Desktop: fixed 360.
              isActive ? "h-[396px]" : "h-[234px]",
              "lg:h-[360px] lg:w-[480px]",
            )}
          >
            <div
              className={cn(
                "relative h-full w-full origin-top-left overflow-hidden transition-transform duration-500 ease-out",
                isActive ? "scale-[1.04] lg:scale-[1.08]" : "scale-100",
              )}
            >
              <Image
                src={
                  step.image
                    ? urlForImage(step.image).width(1200).url()
                    : (step.fallbackImageSrc as string)
                }
                alt={step.title}
                fill
                className={cn(
                  "object-cover transition-[filter] duration-500",
                  isActive ? "grayscale-0" : "grayscale-[35%]",
                )}
                sizes="(min-width: 1024px) 520px, 280px"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 lg:w-[420px] lg:gap-5">
          <h3 className="font-serif text-[18px] font-medium uppercase leading-[130%] text-forest lg:text-[20px]">
            {step.title}
          </h3>
          {step.description && (
            <p className="font-mono text-[14px] font-normal leading-[140%] text-forest/72 lg:text-[16px]">
              {step.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
