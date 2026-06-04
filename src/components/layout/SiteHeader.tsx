import Image from "next/image";
import Link from "next/link";

import {
  BagIcon,
  HamburgerIcon,
  HeartIcon,
  ProfileIcon,
} from "@/components/ui/icons";
import type { SiteSettings } from "@/lib/types";

const fallbackNav = [
  { label: "SHOP", href: "/shop" },
  { label: "JOURNAL", href: "/journal" },
  { label: "OVER ONS", href: "/over-ons" },
];

/**
 * Site header.
 *
 * Mobile (<md) per Figma 390×72 spec:
 *   row of 343×24 content, with hamburger + NH monogram grouped on the
 *   left (16px gap) and 3 action icons grouped on the right (16px gap).
 *   Wishlist + cart show a 12×12 pink "2" badge in the top-right corner.
 *
 * Desktop (md+) keeps the original 3-column grid: nav · wordmark · CTAs.
 */
export function SiteHeader({ settings }: { settings?: SiteSettings }) {
  const nav = settings?.nav?.length ? settings.nav : fallbackNav;
  const loginLabel = settings?.cta?.loginLabel ?? "Login";
  const cartLabel = settings?.cta?.cartLabel ?? "Cart";

  return (
    <header className="h-[72px] border-b border-forest bg-cream md:h-[100px]">
      {/* MOBILE row */}
      <div className="flex h-full items-center justify-between px-4 md:hidden">
        {/* Left cluster: hamburger + monogram */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Open menu"
            className="flex h-6 w-6 items-center justify-center text-ink"
          >
            <HamburgerIcon className="h-4 w-[18px]" />
          </button>
          <Link href="/" aria-label="Natural Heroes — home">
            <Image
              src="/icons/mobile-logo.svg"
              alt="Natural Heroes"
              width={20}
              height={26}
              priority
            />
          </Link>
        </div>

        {/* Right cluster: 3 action icons */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Profile"
            className="flex h-5 w-5 items-center justify-center text-ink"
          >
            <ProfileIcon className="h-5 w-5" />
          </button>
          <IconWithBadge label="Wishlist" badge={2}>
            <HeartIcon className="h-5 w-5" />
          </IconWithBadge>
          <IconWithBadge label="Cart" badge={2}>
            <BagIcon className="h-5 w-5" />
          </IconWithBadge>
        </div>
      </div>

      {/* DESKTOP row */}
      <div className="mx-auto hidden h-full max-w-(--container-site) grid-cols-3 items-center px-6 md:grid md:px-16 lg:px-24">
        <nav
          aria-label="Primary"
          className="flex items-center gap-8 font-mono text-[15px] font-medium leading-[140%] tracking-[0.02em] text-ink"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-forest"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-center">
          <Link href="/" aria-label="Natural Heroes — home">
            <Image
              src="/icons/natural-heros-logo.svg"
              alt="Natural Heroes"
              width={160}
              height={28}
              priority
            />
          </Link>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center border border-forest px-[22px] py-3 font-mono text-[15px] font-medium leading-[140%] tracking-[0.02em] text-ink transition-colors hover:bg-forest hover:text-cream"
          >
            {loginLabel}
          </button>
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center bg-forest px-[22px] py-3 font-mono text-[15px] font-medium leading-[140%] tracking-[0.02em] text-white transition-colors hover:bg-forest-deep"
          >
            {cartLabel}
          </button>
        </div>
      </div>
    </header>
  );
}

/**
 * Mobile action icon with a 12×12 pink "2" badge in the top-right.
 * Per Figma the badge sits ~2-3px outside the icon's bounds; we use
 * negative offsets to recreate that float without affecting flow.
 */
function IconWithBadge({
  label,
  badge,
  children,
}: {
  label: string;
  badge: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={`${label} (${badge})`}
      className="relative flex h-5 w-5 items-center justify-center text-ink"
    >
      {children}
      <span
        className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-[#C39A91] font-display text-[8px] font-bold leading-none text-ink"
        aria-hidden
      >
        {badge}
      </span>
    </button>
  );
}
