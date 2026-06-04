import Link from "next/link";

import { ChevronRight } from "@/components/ui/icons";

type Crumb = { label: string; href?: string };

/**
 * Breadcrumb row above the product hero.
 * Figma: DM Mono 400/15px, uppercase, ink at 80% opacity; current page
 * at 500 weight at full ink. Chevron separator at 12px.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-3">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li
              key={`${item.label}-${i}`}
              className="flex items-center gap-3"
            >
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="font-mono text-[15px] font-normal uppercase leading-[140%] tracking-[0.02em] text-ink/80 transition-colors hover:text-forest"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-mono text-[15px] font-medium uppercase leading-[140%] tracking-[0.02em] text-ink">
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="h-2 w-1.5 text-ink/80" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
