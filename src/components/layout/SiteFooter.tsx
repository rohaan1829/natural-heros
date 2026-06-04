import Image from "next/image";
import Link from "next/link";

import {
  ArrowRightLong,
  FacebookIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/ui/icons";
import type { SiteSettings } from "@/lib/types";

const fallbackNav = [
  { label: "SHOP", href: "/shop" },
  { label: "JOURNAL", href: "/journal" },
  { label: "OVER ONS", href: "/over-ons" },
];

/**
 * Site footer.
 *
 * Three-column row on a forest background, with horizontal rules
 * running edge-to-edge above and below the row, and a single vertical
 * rule between each column. The bottom band carries copyright + Terms,
 * separated from the columns by another horizontal rule.
 *
 * Rule color is cream at 12% opacity, set on a Tailwind border-color.
 * We use `divide-x` for verticals between columns so they collapse
 * cleanly without -1px overlap hacks.
 */
export function SiteFooter({
  settings,
  qrSrc,
}: {
  settings?: SiteSettings;
  qrSrc?: string;
}) {
  const nav = settings?.nav?.length ? settings.nav : fallbackNav;

  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto max-w-(--container-site) px-4 py-6 md:px-16 md:py-7 lg:px-24">
        {/* Top region.
            Desktop: 3 equal columns separated by edge-to-edge horizontal
            rules and vertical inter-column rules.
            Mobile: 3 sections stacked vertically, separated by horizontal
            rules — order is reordered so logo+socials sits first, then
            nav links, then scan QR (matching the Figma mobile frame). */}
        <div className="grid grid-cols-1 divide-y divide-cream/12 border-y border-cream/12 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {/* Logo + socials.
              On desktop this is the center column (order-2); on mobile
              it leads (order-1 by default). */}
          <div className="flex flex-col items-center justify-center gap-9 px-12 py-12 lg:order-2">
            <Image
              src="/icons/natural-heros-logo.svg"
              alt="Natural Heroes"
              width={160}
              height={28}
              className="brightness-0 invert"
            />
            <div className="flex items-start gap-6">
              <SocialButton href="https://facebook.com" label="Facebook">
                <FacebookIcon className="h-6 w-6" />
              </SocialButton>
              <SocialButton href="https://twitter.com" label="Twitter / X">
                <TwitterIcon className="h-6 w-6" />
              </SocialButton>
              <SocialButton href="https://youtube.com" label="YouTube">
                <YoutubeIcon className="h-6 w-6" />
              </SocialButton>
            </div>
          </div>

          {/* Nav links.
              Desktop: left column (order-1). Mobile: second (order-2). */}
          <div className="flex flex-col items-start justify-center gap-5 py-8 lg:order-1 lg:gap-8 lg:py-12 lg:pl-0 lg:pr-12">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-[15px] font-medium leading-[140%] tracking-[0.02em] text-cream transition-opacity hover:opacity-80"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Scan QR.
              Desktop: right column (order-3). Mobile: third (order-3). */}
          <div className="flex flex-col items-start justify-center gap-6 py-8 lg:order-3 lg:py-12 lg:pl-12">
            <a
              href="#scan"
              className="flex items-center gap-2 font-serif text-[16px] font-normal leading-[140%] text-cream transition-opacity hover:opacity-80"
            >
              <span>SCAN TO SEE THE FARM</span>
              <ArrowRightLong className="h-3 w-6" />
            </a>
            <ScanQR qrSrc={qrSrc} />
          </div>
        </div>

        {/* Bottom row.
            Desktop: copyright left, Terms right (justify-between).
            Mobile: stacked, 8px gap. */}
        <div className="flex flex-col gap-2 pt-6 font-mono text-[14px] font-normal leading-[165%] text-cream lg:flex-row lg:justify-between">
          <span>© {new Date().getFullYear()} NATURAL HEROES B.V.</span>
          <Link href="/terms" className="transition-opacity hover:opacity-80">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}

/**
 * QR widget: 72×72 box with 4 L-shaped scan brackets at the corners
 * (cream 24% opacity) and the QR code centered inside at 54×54.
 *
 * The brackets are pure SVG so they scale crisply; the QR itself
 * can be either a raster (Sanity-uploaded PNG) or a local SVG.
 */
function ScanQR({ qrSrc }: { qrSrc?: string }) {
  return (
    <div className="relative h-[72px] w-[72px]">
      {/* Corner brackets — filled L-shapes at 24% opacity.
          Each L is a 16.875×16.875 cell (≈ 23.44% of 72) with a
          ~5px inner cutout, so the L is 5px thick. */}
      <svg
        viewBox="0 0 72 72"
        fill="currentColor"
        aria-hidden
        className="absolute inset-0 h-full w-full text-cream/24"
      >
        {/* Top-left */}
        <path d="M0 0H16.875V5H5V16.875H0V0Z" />
        {/* Top-right */}
        <path d="M55.125 0H72V16.875H67V5H55.125V0Z" />
        {/* Bottom-right */}
        <path d="M67 55.125H72V72H55.125V67H67V55.125Z" />
        {/* Bottom-left */}
        <path d="M0 55.125H5V67H16.875V72H0V55.125Z" />
      </svg>

      {/* QR code centered inside */}
      <div className="absolute left-1/2 top-1/2 h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2">
        {qrSrc ? (
          <Image
            src={qrSrc}
            alt="QR code to the farm"
            width={54}
            height={54}
            className="h-[54px] w-[54px]"
          />
        ) : (
          <div className="h-full w-full bg-cream/40" aria-hidden />
        )}
      </div>
    </div>
  );
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center border border-cream text-cream transition-colors hover:bg-cream hover:text-forest"
    >
      {children}
    </a>
  );
}
