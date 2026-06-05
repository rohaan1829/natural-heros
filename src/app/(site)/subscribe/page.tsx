"use client";

import { useState } from "react";
import Image from "next/image";

import { ShopHeader } from "@/components/layout/ShopHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import {
  ArrowLeft,
  ArrowRight,
  ChatIcon,
  StarIcon,
} from "@/components/ui/icons";
import { previewSettings } from "@/lib/preview-data";
import { cn } from "@/lib/utils";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 8L10 13L15 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const productBullets = [
  "Vrij van Aluminium, Alcohol, Baking Soda en Parfum",
  "Beschermt 24 uur",
  "Ook geurloos verkrijgbaar",
  "Gaat tenminste 1 maand mee bij dagelijks gebruik",
];

const subscriptionInclusief = [
  "Exclusive Access to 90 Day IM8 Transformation Program",
  "Maximum savings - lowest price per serving",
  "90-Day Money-Back Guarantee",
  "Share with family and friends",
  "Free Mystery Gift",
  "Free Daily Ultimate Mixer (US$18)",
  "Cancel or pause anytime",
  "Free Shipping to US, UK, CA, and most of EU and APAC",
];

const welcomeKitItems = [
  { title: "Shea Butter (Biologisch & Ongeraffineerd)", oldPrice: "€5.99" },
  { title: "Shea Butter (Biologisch & Ongeraffineerd)", oldPrice: "€5.99" },
  { title: "Shea Butter (Biologisch & Ongeraffineerd)", oldPrice: "€5.99" },
  { title: "Shea Butter (Biologisch & Ongeraffineerd)", oldPrice: "€5.99" },
];

type PurchaseType = "90day" | "subscription" | "onetime";

const galleryImages = [
  "/images/gallery-1.svg",
  "/images/gallery-2.svg",
  "/images/gallery-3.svg",
  "/images/gallery-4.svg",
  // Extra dots get cycled through the same images
  "/images/gallery-1.svg",
  "/images/gallery-2.svg",
];

function SageCheck({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 12"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M1 6L5.5 10.5L15 1"
        stroke="#A8B2A8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserOutline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M2.5 14C2.5 11.5 4.5 9.5 8 9.5C11.5 9.5 13.5 11.5 13.5 14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartOutlineThick({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 18"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2.45 3.75A4.4 4.4 0 0 1 5.58 2.45c1.17 0 2.29.46 3.12 1.3L10 5.04l1.3-1.3a4.42 4.42 0 0 1 6.25 6.25L10 17.55 2.45 10A4.4 4.4 0 0 1 2.45 3.75Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrustBadge({ src, label }: { src: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-[6px]">
      <Image src={src} alt="" width={60} height={60} className="h-[60px] w-[60px]" />
      <span className="text-center font-sans text-[14px] font-normal leading-[140%] text-ink">
        {label}
      </span>
    </div>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 8v4M9 5.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function SubscribePage() {
  const [activeImage, setActiveImage] = useState(0);
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("90day");

  const next = () => setActiveImage((i) => (i + 1) % galleryImages.length);
  const prev = () =>
    setActiveImage((i) => (i - 1 + galleryImages.length) % galleryImages.length);

  return (
    <>
      <ShopHeader
        crumbs={[
          { label: "Products", href: "#" },
          { label: "Bath Bombs" },
        ]}
      />

      <main className="flex-1 bg-[linear-gradient(180deg,#F5F1E8_0%,#FFFFFF_100%)] py-6 md:py-10">
        <div className="mx-auto w-full max-w-[1300px] px-4 md:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            {/* GALLERY */}
            <section
              aria-label="Product gallery"
              className="flex w-full shrink-0 flex-col gap-3 lg:w-[598px]"
            >
              {/* Main image */}
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
                <Image
                  src={galleryImages[activeImage]}
                  alt="No BS Deo"
                  fill
                  priority
                  className="object-contain p-4"
                  sizes="(min-width: 1024px) 598px, 100vw"
                />

                {/* Dot indicators */}
                <div className="pointer-events-none absolute bottom-6 left-0 right-0 flex items-center justify-center gap-[14px] drop-shadow-[0px_0px_20px_rgba(0,0,0,0.2)] md:bottom-8">
                  {galleryImages.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-[10px] w-[10px] rounded-full transition-colors",
                        i === activeImage ? "bg-white" : "bg-white/30",
                      )}
                      aria-hidden
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails + arrows.
                  Thumbnails span the full width (no inner padding).
                  Arrows float over the first/last thumb edges via
                  z-index stacking, with the active thumb getting the
                  forest-ink border directly on the image. */}
              <div className="relative h-[78px] md:h-[140.5px]" style={{ isolation: "isolate" }}>
                <div className="flex h-full justify-between gap-2 md:gap-3">
                  {galleryImages.slice(0, 4).map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      aria-label={`Image ${i + 1}`}
                      aria-pressed={i === activeImage}
                      className={cn(
                        "relative aspect-square h-full shrink-0 overflow-hidden rounded-lg transition-colors",
                        i === activeImage
                          ? "border border-ink/80"
                          : "border border-transparent",
                      )}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="140px"
                      />
                    </button>
                  ))}
                </div>

                {/* Floating arrow buttons — Figma SVG with built-in
                    slight tilt and white pill background. The right
                    arrow is the same SVG flipped horizontally. */}
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous image"
                  className="absolute -left-3 top-1/2 z-20 -translate-y-1/2 drop-shadow-[2px_4px_12px_rgba(0,0,0,0.12)] md:left-0 md:-translate-x-1/2"
                >
                  <Image
                    src="/icons/gallery-arrow.svg"
                    alt=""
                    width={32}
                    height={31}
                    className="h-[31px] w-[32px]"
                  />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next image"
                  className="absolute -right-3 top-1/2 z-20 -translate-y-1/2 drop-shadow-[2px_4px_12px_rgba(0,0,0,0.12)] md:right-0 md:translate-x-1/2"
                >
                  <Image
                    src="/icons/gallery-arrow.svg"
                    alt=""
                    width={32}
                    height={31}
                    className="h-[31px] w-[32px] -scale-x-100"
                  />
                </button>
              </div>
            </section>

            {/* RIGHT COLUMN — title block + buy flow */}
            <section
              aria-label="Product details"
              className="flex w-full flex-col gap-3"
            >
              {/* Reviews bar — text and gaps shrink on small screens
                  so all three groups fit on one line without wrapping. */}
              <div className="flex items-center gap-2 whitespace-nowrap border-y border-[#E2DFDF] py-2 font-sans text-[13px] leading-[140%] md:gap-[18px] md:text-[16px]">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="hidden font-semibold text-ink md:inline">
                    85 reviews
                  </span>
                  <span className="flex items-center gap-0.5 md:gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className="h-3.5 w-3.5 text-[#C39A91] md:h-[18px] md:w-[18px]"
                      />
                    ))}
                  </span>
                  <span className="font-semibold text-ink">4.8</span>
                </div>
                <span className="h-4 w-px bg-[#767473] md:h-[19px]" aria-hidden />
                <div className="flex items-center gap-1 text-[#767473] md:gap-[7px]">
                  <ChatIcon className="h-[14px] w-[14px] md:h-[17px] md:w-[17px]" />
                  <span>10 vragen</span>
                </div>
                <span className="h-4 w-px bg-[#767473] md:h-[19px]" aria-hidden />
                <span className="text-[#767473]">20m+ users</span>
              </div>

              {/* Title + tagline */}
              <div className="flex flex-col gap-0">
                <h1 className="font-display text-[40px] font-medium leading-[120%] text-ink">
                  No BS Deo
                </h1>
                <p className="font-sans text-[18px] font-normal italic leading-[140%] text-ink/80">
                  Eindelijk een natuurlijke deodorant waar je op kunt rekenen 🌿
                </p>
              </div>

              {/* Bullets */}
              <ul className="flex flex-col">
                {productBullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-3 font-sans text-[18px] font-normal leading-[140%] text-ink/80"
                  >
                    <span aria-hidden className="text-ink/80">
                      •
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* 1. Kies je inhoud — dropdown selector */}
              <div className="flex flex-col gap-2 pt-3">
                <span className="font-sans text-[16px] font-semibold leading-[140%] text-ink">
                  1. Kies je inhoud
                </span>
                <button
                  type="button"
                  className="flex h-[72px] w-full items-center justify-between gap-2 rounded-lg border border-[#E2DFDF] bg-white pl-1 pr-4 transition-colors hover:border-ink/40"
                >
                  <div className="flex items-center gap-2">
                    <div className="relative h-16 w-16 shrink-0">
                      <Image
                        src="/images/freshbalance.svg"
                        alt=""
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                    <span className="font-sans text-[18px] font-semibold leading-[140%] text-ink">
                      30 ml / Fresh Balance
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-[18px] font-semibold leading-[140%] text-ink">
                      € 12.99
                    </span>
                    <ChevronDown className="h-5 w-5 text-ink" />
                  </div>
                </button>
              </div>

              {/* 2. Kies je type — 3 option cards.
                  The active card expands to show price, inclusief list,
                  and a welcome-kit row. Inactive cards collapse to a
                  single 56px row. */}
              <div className="flex flex-col gap-2 pt-3">
                <span className="font-sans text-[16px] font-semibold leading-[140%] text-ink">
                  2. Kies je type
                </span>

                {/* Active card: 90-Dag Abonnement */}
                <PurchaseOption
                  type="90day"
                  isActive={purchaseType === "90day"}
                  onSelect={() => setPurchaseType("90day")}
                  label="90-Dag Abonnement"
                  savings="BESPAAR 30%"
                  bestValue
                />

                {/* Collapsed: Abonnement */}
                <PurchaseOption
                  type="subscription"
                  isActive={purchaseType === "subscription"}
                  onSelect={() => setPurchaseType("subscription")}
                  label="Abonnement"
                  savings="BESPAAR 10%"
                />

                {/* Collapsed: Eenmalig */}
                <PurchaseOption
                  type="onetime"
                  isActive={purchaseType === "onetime"}
                  onSelect={() => setPurchaseType("onetime")}
                  label="Eenmalig"
                />
              </div>

              {/* Prijs + Status row */}
              <div className="flex flex-col gap-4 pt-3 md:flex-row md:items-end md:justify-between">
                {/* Prijs block */}
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-[16px] font-semibold leading-[140%] text-ink">
                    Prijs
                  </span>
                  <div className="flex h-[68px] w-full max-w-[200px] flex-col justify-center gap-[3px] rounded-md bg-[#EEE3D7] px-[14px] py-4">
                    <span className="font-sans text-[16px] font-semibold leading-[140%] text-ink">
                      €7.72 vanaf incl. btw
                    </span>
                    <span className="font-sans text-[14px] font-medium leading-[140%] text-ink/80">
                      €6.72 excl. btw
                    </span>
                  </div>
                </div>

                {/* Status banner */}
                <div className="flex flex-col items-end gap-2 rounded-lg bg-[#FCF9F7] px-4 py-2 md:w-[297px]">
                  <div className="flex items-center gap-2">
                    <UserOutline className="h-4 w-4 text-ink" />
                    <span className="font-sans text-[16px] font-normal leading-[140%] text-ink">
                      Logged in as a wholesale customer
                    </span>
                  </div>
                  <a
                    href="#"
                    className="font-sans text-[16px] font-semibold leading-[140%] text-ink underline"
                  >
                    Switch to a consumer account
                  </a>
                </div>
              </div>

              {/* Aantal label + qty stepper + Bestel nu CTA + wishlist */}
              <div className="flex flex-col gap-2 pt-2">
                <span className="font-sans text-[16px] font-semibold leading-[140%] text-ink">
                  Aantal
                </span>
                <div className="flex flex-row items-stretch gap-2">
                  {/* Qty stepper */}
                  <div className="flex h-[57px] w-[91px] shrink-0 items-center justify-center gap-4 rounded-md border border-[#E2DFDF] bg-white px-4 font-sans text-[18px] font-medium leading-[140%]">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      className="text-[#767473] opacity-30 transition-opacity hover:opacity-60"
                    >
                      −
                    </button>
                    <span className="text-ink">1</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      className="text-[#767473] transition-opacity hover:opacity-60"
                    >
                      +
                    </button>
                  </div>

                  {/* CTA */}
                  <button
                    type="button"
                    className="flex h-[57px] flex-1 items-center justify-center gap-2 rounded-md bg-ink px-3 font-sans text-[18px] font-medium leading-[140%] text-white transition-colors hover:bg-forest"
                  >
                    Bestel nu! — €7.72
                  </button>

                  {/* Wishlist */}
                  <button
                    type="button"
                    aria-label="Add to wishlist"
                    className="flex h-[57px] w-[57px] shrink-0 items-center justify-center rounded-lg border border-[#E2DFDF] bg-white text-[#E2DFDF] transition-colors hover:text-ink"
                  >
                    <HeartOutlineThick className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Trust badges — 4 circles with icons + labels */}
              <div className="flex flex-row items-start gap-9 pt-3">
                <TrustBadge
                  src="/images/sub-badge-natural.svg"
                  label="Natuurlijk"
                />
                <TrustBadge
                  src="/images/sub-badge-vegan.svg"
                  label="Vegan"
                />
                <TrustBadge
                  src="/images/sub-badge-plastic.svg"
                  label="Plastic vrij"
                />
                <TrustBadge
                  src="/images/sub-badge-aluminium.svg"
                  label="Aluminium vrij"
                />
              </div>

              {/* Trust list — sage check marks + benefit text */}
              <ul className="flex flex-col gap-2 pt-2">
                {[
                  "Gratis verzending vanaf €35,- naar NL, BE & DUI.",
                  "Voor 23:30 besteld, morgen in huis.",
                  "Klanten geven ons een 9.4 op Kiyoh",
                  "Snel en persoonlijk geholpen door ons lieve team.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 font-sans text-[16px] font-normal leading-[140%] text-ink/80"
                  >
                    <SageCheck className="h-3 w-4 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter settings={previewSettings} qrSrc="/images/qr.svg" />
    </>
  );
}

/**
 * Purchase option card.
 *
 * Collapsed state: 56px-tall row with a radio, label, and optional
 * savings chip. Active state for "90day" expands to show the price
 * block, inclusief list, and welcome kit grid, with a forest-on-cream
 * tint and a black "BEST VALUE" flag clipped to the top-right corner.
 */
function PurchaseOption({
  type,
  isActive,
  onSelect,
  label,
  savings,
  bestValue,
}: {
  type: PurchaseType;
  isActive: boolean;
  onSelect: () => void;
  label: string;
  savings?: string;
  bestValue?: boolean;
}) {
  const showExpanded = isActive && type === "90day";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border transition-colors",
        isActive
          ? "border-ink bg-[#C39A911F]"
          : "border-[#E2DFDF] bg-white",
      )}
    >
      {/* BEST VALUE chip — sits flush against the card's top-right
          rounded corner. Mobile uses smaller text/height to match the
          343px card width; desktop scales up. */}
      {bestValue && (
        <span className="pointer-events-none absolute right-0 top-0 z-10 flex h-5 items-center justify-center rounded-bl-lg rounded-tr-lg bg-ink px-[6px] font-sans text-[11px] font-bold uppercase tracking-[0.02em] text-white md:h-7 md:px-3 md:text-[14px]">
          BEST VALUE
        </span>
      )}

      {/* Header row — always visible */}
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={isActive}
        className="flex w-full items-center gap-3 px-3 py-2 text-left md:px-4"
      >
        {/* Custom radio */}
        <span
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px]",
            isActive ? "border-ink" : "border-[#E2DFDF]",
          )}
          aria-hidden
        >
          {isActive && <span className="h-2 w-2 rounded-full bg-ink" />}
        </span>

        <span className="font-sans text-[14px] font-medium leading-[140%] text-ink md:text-[18px]">
          {label}
        </span>

        {savings && (
          <span className="inline-flex h-6 items-center rounded border border-[#E2DFDF] bg-[#EEE3D8] px-2 font-sans text-[12px] font-bold uppercase tracking-[0.02em] leading-none text-ink">
            {savings}
          </span>
        )}
      </button>

      {/* Expanded content — only for the active 90day card */}
      {showExpanded && (
        <div className="flex flex-col gap-3 px-3 pb-3 md:gap-4 md:px-4 md:pb-4">
          {/* Price block */}
          <div className="flex flex-col gap-2 pt-2 md:pt-4">
            <div className="flex items-end gap-1">
              <span className="font-display text-[30px] font-bold leading-[120%] tracking-[0.4px] text-ink md:text-[36px]">
                € 4.55
              </span>
              <span className="font-sans text-[14px] font-normal leading-[140%] text-ink/80 line-through">
                €4.55
              </span>
              <span className="font-sans text-[14px] font-normal leading-[140%] text-ink/80">
                /maand
              </span>
            </div>
            <div className="flex items-center gap-3 font-sans text-[14px] font-normal leading-[140%] text-ink/80">
              <span>Billed €235.00 every 12 weeks</span>
              <span className="h-4 w-px bg-[#E2DFDF]" aria-hidden />
              <span>€40.00/serving</span>
            </div>
          </div>

          <hr className="border-[#E2DFDF]" />

          {/* Inclusief section */}
          <div className="flex flex-col gap-3">
            <span className="font-sans text-[16px] font-normal leading-[140%] text-black">
              Inclusief
            </span>
            <ul className="flex flex-col gap-2">
              {subscriptionInclusief.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 font-sans text-[14px] font-normal leading-[140%] text-ink/80 md:text-[16px]"
                >
                  <SageCheck className="h-3 w-4 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Welcome kit row — horizontal scroller on mobile (peeks the
              next card), 4-column grid from md+. */}
          <div className="flex flex-col gap-3 pt-2">
            <span className="font-sans text-[16px] font-normal leading-[140%] text-black">
              Gratis Welcome Kit (Eerste order)
            </span>
            <div
              className="-mx-3 flex gap-3 overflow-x-auto px-3 pb-1 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none" }}
            >
              {welcomeKitItems.map((item, i) => (
                <article
                  key={i}
                  className="relative flex h-[157px] w-[140px] shrink-0 flex-col items-center gap-2 rounded-lg border border-black/12 bg-white p-3 md:h-[170px] md:w-auto"
                >
                  <InfoIcon className="absolute right-3 top-3 h-[18px] w-[18px] text-black" />
                  <div className="relative h-20 w-20 shrink-0 md:h-24 md:w-24">
                    <Image
                      src="/images/sheabutter.svg"
                      alt={item.title}
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-0.5">
                    <h4 className="w-full truncate font-display text-[14px] font-medium uppercase leading-[140%] text-black">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans text-[14px] font-normal leading-[140%] text-[#767473] line-through">
                        {item.oldPrice}
                      </span>
                      <span className="font-sans text-[14px] font-medium leading-[140%] text-ink">
                        Gratis
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
