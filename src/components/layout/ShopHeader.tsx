"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  BagIcon,
  ChevronRight,
  HamburgerIcon,
  HeartIcon,
  ProfileIcon,
} from "@/components/ui/icons";
import { MobileMenuDrawer } from "@/components/layout/MobileMenuDrawer";

/** Inline sage check mark for trust-strip rows. */
function SageCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M3 8.5L6.5 12L13 5"
        stroke="#A8B2A8"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M13.5 13.5L17 17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M3 7L8 3L13 7V13H10V10H6V13H3V7Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M3 6L8 11L13 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const trustItems: React.ReactNode[] = [
  <>Verzending gratis va. €35,-</>,
  <>★★★★★ 9.4 / 10 van 8000+ reviews</>,
  <>
    Voor 23:30 besteld,
    <br className="md:hidden" /> volgende werkdag in huis
  </>,
];

const navItems = [
  { label: "SHOP", href: "/subscribe" },
  { label: "RECEPTEN", href: "#" },
  { label: "INFORMATIE", href: "#" },
  { label: "COMMUNITY", href: "#" },
  { label: "OVER ONS", href: "/" },
];

type Crumb = { label: string; href?: string };

/**
 * Shop header used on category, subscription and cart pages.
 *
 * Desktop (md+) rows top → bottom:
 *   1. Black promo banner
 *   2. Trust strip (3 benefits with sage checks)
 *   3. Main row — wordmark · search · profile/wishlist/cart
 *   4. Nav row — 5 dropdowns
 *   5. Breadcrumb pill
 *
 * Mobile (<md):
 *   1. Promo banner (same)
 *   2. Main row — hamburger + NH monogram (left) + 3 icons (right)
 *   3. Full-width search
 *   4. Trust strip (3 columns with dividers)
 *   5. Breadcrumb pill
 *   (nav row is hidden; surfaced by the hamburger drawer)
 */
export function ShopHeader({ crumbs = [] }: { crumbs?: Crumb[] }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-cream">
      <MobileMenuDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={navItems}
      />
      {/* Row 1 — promo banner.
          Single 32px row on desktop. Mobile uses a smaller font and
          flexible height so the message can wrap without being clipped. */}
      <div className="flex min-h-8 items-center justify-center bg-ink px-4 py-1 text-white">
        <p className="text-center font-sans text-[12px] font-normal leading-[140%] md:text-[14px]">
          Nieuw: Lab in een doosje! Bekijk onze vernieuwde DIY Kits{" "}
          <Link href="#" className="underline">
            hier
          </Link>
        </p>
      </div>

      {/* MOBILE: main row + search + trust strip */}
      <div className="md:hidden">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="flex h-6 w-6 items-center justify-center text-ink"
            >
              <HamburgerIcon className="h-5 w-5" />
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
          <div className="flex items-center gap-4 text-ink">
            <button type="button" aria-label="Profile">
              <ProfileIcon className="h-5 w-5" />
            </button>
            <Link href="#" aria-label="Wishlist (2)" className="relative">
              <HeartIcon className="h-5 w-5" />
              <Badge>2</Badge>
            </Link>
            <Link href="#" aria-label="Cart (2)" className="relative">
              <BagIcon className="h-5 w-5" />
              <Badge>2</Badge>
            </Link>
          </div>
        </div>

        <div className="px-4 pb-3">
          <div className="flex h-[42px] w-full items-center gap-3 rounded-md border border-[#E2DFDF] bg-white px-4">
            <input
              type="text"
              placeholder="Zoek naar product, inspiratie of antwoord"
              className="flex-1 bg-transparent font-sans text-[14px] font-normal text-[#767473] placeholder:text-[#767473]/70 focus:outline-none"
            />
            <SearchIcon className="h-4 w-4 shrink-0 text-ink" />
          </div>
        </div>

        {/* Mobile trust strip — 3 columns separated by faint dividers.
            `text-balance` keeps line breaks evenly distributed so single
            words don't orphan onto a line of their own. */}
        <div className="grid grid-cols-3 divide-x divide-[#E2DFDF] border-y border-[#E2DFDF] py-2 px-2">
          {trustItems.map((text, i) => (
            <div
              key={i}
              className="text-balance px-2 text-center font-sans text-[11px] font-normal leading-[140%] text-ink"
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP: trust strip */}
      <div className="hidden border-b border-[#E2DFDF] md:block">
        <div className="mx-auto grid h-[38px] max-w-[1440px] grid-cols-3 items-center px-4">
          {trustItems.map((text, i) => (
            <div
              key={i}
              className="flex items-center justify-center gap-[5px] font-sans text-[14px] font-normal leading-[140%] text-ink"
            >
              <SageCheck className="h-4 w-4 shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP: logo · search · actions */}
      <div className="mx-auto hidden max-w-[1300px] items-center justify-between gap-8 px-10 py-4 md:flex">
        <Link href="/" aria-label="Natural Heroes — home" className="shrink-0">
          <Image
            src="/icons/natural-heros-logo.svg"
            alt="Natural Heroes"
            width={160}
            height={28}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <div className="flex h-[42px] w-full max-w-[354px] items-center gap-4 rounded-md border border-[#E2DFDF] bg-white px-4 py-[10px] text-ink">
          <input
            type="text"
            placeholder="Zoek naar product, inspiratie of antwoord"
            className="flex-1 bg-transparent font-sans text-[16px] font-normal leading-[140%] text-[#767473] placeholder:text-[#767473]/60 focus:outline-none"
          />
          <SearchIcon className="h-5 w-5 shrink-0 text-ink" />
        </div>

        <div className="flex items-center gap-7 text-ink">
          <button type="button" aria-label="Profile">
            <ProfileIcon className="h-6 w-6" />
          </button>
          <Link href="#" aria-label="Wishlist (2)" className="relative">
            <HeartIcon className="h-6 w-6" />
            <Badge>2</Badge>
          </Link>
          <Link href="#" aria-label="Cart (2)" className="relative">
            <BagIcon className="h-6 w-6" />
            <Badge>2</Badge>
          </Link>
        </div>
      </div>

      {/* DESKTOP: nav row */}
      <div className="mx-auto hidden max-w-[1300px] px-10 md:block">
        <nav className="flex items-stretch divide-x divide-[#E2DFDF] rounded-md bg-white">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-1 items-center justify-center gap-[10px] py-2 font-display text-[15px] font-medium uppercase leading-[140%] tracking-[0.02em] text-ink transition-colors hover:bg-cream"
            >
              <span>{item.label}</span>
              <ChevronDown className="h-4 w-4" />
            </Link>
          ))}
        </nav>
      </div>

      {/* Breadcrumb (both viewports) */}
      {crumbs.length > 0 && (
        <div className="mx-auto max-w-[1300px] px-4 pb-3 pt-[10px] md:px-10">
          <div className="flex h-[34px] items-center gap-2 rounded-md bg-white/65 px-[17px] font-sans text-[14px] font-normal leading-[140%] text-ink/80">
            <HomeIcon className="h-5 w-5 shrink-0" />
            <ChevronRight className="h-2 w-1.5 text-ink/80" />
            {crumbs.map((crumb, i) => {
              const isLast = i === crumbs.length - 1;
              return (
                <span
                  key={`${crumb.label}-${i}`}
                  className="flex items-center gap-2"
                >
                  {crumb.href && !isLast ? (
                    <Link href={crumb.href} className="hover:text-forest">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "text-ink" : undefined}>
                      {crumb.label}
                    </span>
                  )}
                  {!isLast && <ChevronRight className="h-2 w-1.5 text-ink/80" />}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="absolute -right-1 -top-1 flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-[#C39A91] px-[3px] font-display text-[10px] font-bold leading-none text-ink"
      aria-hidden
    >
      {children}
    </span>
  );
}
