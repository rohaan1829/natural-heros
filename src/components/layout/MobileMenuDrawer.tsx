"use client";

import { useEffect } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string };

/**
 * Slide-in mobile navigation drawer.
 *
 * Renders a translucent backdrop + a left-anchored panel that animates
 * in from the screen edge. The body's overflow is locked while the
 * drawer is open so scrolling the page underneath doesn't bleed
 * through. Links close the drawer on tap, taking the user to the
 * destination route.
 */
export function MobileMenuDrawer({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}) {
  // Lock body scroll while the drawer is open. Restored on close /
  // unmount so the rest of the page behaves normally afterwards.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] md:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-ink/40 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={cn(
          "absolute left-0 top-0 h-full w-[280px] bg-cream shadow-xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col gap-2 p-6">
          <div className="flex items-center justify-between pb-4">
            <span className="font-display text-[14px] font-medium uppercase tracking-[0.18em] text-ink/60">
              Menu
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="text-ink"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
          <nav>
            <ul className="flex flex-col">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block border-b border-ink/10 py-4 font-mono text-[15px] font-medium uppercase tracking-[0.02em] text-ink transition-colors hover:text-forest"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 5L15 15M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
