/**
 * Inline SVG icons used in the product page.
 *
 * Sized at 1em so they scale with surrounding text. Stroke / fill use
 * currentColor so each icon inherits its parent's color — set color
 * via Tailwind text-* utilities at the call site.
 */

export function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M9 0.5l2.472 5.43 5.916.63-4.4 4.02 1.27 5.836L9 13.5l-5.258 2.916 1.27-5.835-4.4-4.021 5.916-.63z" />
    </svg>
  );
}

export function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 17 17"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 3h13v8H6l-3 3v-3H2z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="7" r="0.8" fill="currentColor" />
      <circle cx="8.5" cy="7" r="0.8" fill="currentColor" />
      <circle cx="11" cy="7" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 8 12"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M1.5 1L6.5 6L1.5 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function ArrowLeft({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M14 8H2M2 8L6 4M2 8L6 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 8H14M14 8L10 4M14 8L10 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function ArrowRightLong({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 12"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M0 6h22M16 1l6 5-6 5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M15 4h-2.5C11.12 4 10 5.12 10 6.5V9H8v3h2v8h3v-8h2.5l.5-3H13V7c0-.55.45-1 1-1h1.5V4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 3l7.5 9.5L3.5 21H6l5.5-6.5L16 21h5l-7.5-10L20.5 3H18l-5 6L8.5 3H3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ProfileIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M10 12C12.2091 12 14 10.2091 14 8C14 5.79086 12.2091 4 10 4C7.79086 4 6 5.79086 6 8C6 10.2091 7.79086 12 10 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <path
        d="M2 22C2 22 4.28571 16 10 16C15.7143 16 18 22 18 22"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 18"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2.453 3.748C2.042 4.158 1.717 4.646 1.495 5.182C1.272 5.718 1.158 6.293 1.158 6.874C1.158 7.454 1.272 8.029 1.495 8.566C1.717 9.102 2.042 9.589 2.453 10L10 17.547L17.547 10C18.376 9.171 18.842 8.046 18.842 6.874C18.842 5.701 18.376 4.577 17.547 3.748C16.718 2.919 15.593 2.453 14.421 2.453C13.248 2.453 12.124 2.919 11.295 3.748L10 5.043L8.705 3.748C8.295 3.337 7.807 3.012 7.271 2.789C6.735 2.567 6.16 2.453 5.579 2.453C4.999 2.453 4.424 2.567 3.887 2.789C3.351 3.012 2.864 3.337 2.453 3.748Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BagIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 22"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M0.531 21.942L1.789 8.973H14.156L15.47 21.942H0.531Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.851 10.714V6.908C10.851 5.334 9.575 4.057 8 4.057C6.426 4.057 5.149 5.334 5.149 6.908V10.714"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="2"
        y="5.5"
        width="20"
        height="13"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10 9.5l5 2.5-5 2.5v-5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
