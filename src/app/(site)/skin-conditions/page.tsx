import Image from "next/image";
import Link from "next/link";

import { ShopHeader } from "@/components/layout/ShopHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { previewSettings } from "@/lib/preview-data";

export const dynamic = "force-dynamic";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type Condition = {
  slug: string;
  label: string;
  title: string;
  description: string;
  image: string;
  comments: number;
};

const conditions: Condition[] = [
  {
    slug: "acne",
    label: "HUIDPROBLEEM",
    title: "ACNE",
    description:
      "Acne is een veelvoorkomende huidaandoening die ontstaat door verstopte poriën, bacteriën en overmatige talgproductie. Het komt vaak voor in het gezicht, maar kan ook op andere delen van het lichaam verschijnen.",
    image: "/images/skin-acne.svg",
    comments: 12,
  },
  {
    slug: "eczeem-rosacea",
    label: "HUIDPROBLEEM",
    title: "ECZEEM - ROSACEA",
    description:
      "Eczeem en rosacea zijn chronische huidaandoeningen die roodheid, jeuk en irritatie veroorzaken. Ze kunnen door verschillende factoren worden uitgelokt en verergerd.",
    image: "/images/skin-eczeem.png",
    comments: 12,
  },
  {
    slug: "droge-huid-vette-huid",
    label: "HUIDPROBLEEM",
    title: "DROGE HUID - VETTE HUID",
    description:
      "Een droge of vette huid kan verschillende oorzaken hebben, waaronder genetica, levensstijl en omgeving. De juiste verzorging kan helpen om de balans te herstellen.",
    image: "/images/skin-droge-huid.png",
    comments: 12,
  },
  {
    slug: "psoriasis",
    label: "HUIDPROBLEEM",
    title: "PSORIASIS",
    description:
      "Psoriasis is een chronische auto-immuunziekte die zorgt voor snelle huidcelvernieuwing. Dit leidt tot schilferige, rode plekken die kunnen jeuken of pijn doen.",
    image: "/images/skin-psoriasis.png",
    comments: 12,
  },
  {
    slug: "hyperpigmentatie",
    label: "HUIDPROBLEEM",
    title: "HYPERPIGMENTATIE",
    description:
      "Hyperpigmentatie ontstaat door overproductie van melanine, wat leidt tot donkere vlekken op de huid. Zonblootstelling, hormonen en ontstekingen zijn veelvoorkomende triggers.",
    image: "/images/skin-hyperpigmentatie.png",
    comments: 12,
  },
  {
    slug: "contacteczeem",
    label: "HUIDPROBLEEM",
    title: "CONTACTECZEEM",
    description:
      "Contacteczeem wordt veroorzaakt door direct contact met irriterende stoffen of allergenen. Het resulteert in rode, jeukende uitslag die kan blaren of schilferen.",
    image: "/images/skin-contacteczeem.png",
    comments: 12,
  },
];

function CaretDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
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

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M11 11L14 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CommentIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 3h12v7H5l-3 3v-3H2z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FilterIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 6h10M3 14h7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="15" cy="6" r="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function SkinConditionsPage() {
  return (
    <>
      <ShopHeader
        crumbs={[
          { label: "Products", href: "#" },
          { label: "Bath Bombs" },
        ]}
      />

      {/* Background gradient from cream (top) to white (bottom) fades
          out behind the header content and underneath the card grid. */}
      <main className="flex-1 bg-[linear-gradient(180deg,#F6EFE6_0%,#FFFFFF_100%)] pb-24 pt-6 md:pb-20 md:pt-20">
        <div className="mx-auto flex w-full max-w-[1300px] flex-col items-center gap-6 px-4 md:gap-10 md:px-10">
          {/* Heading */}
          <header className="flex max-w-[792px] flex-col items-center gap-3 text-center md:gap-5">
            <h1 className="font-display text-[32px] font-bold leading-[120%] tracking-[0.4px] text-black md:text-[56px]">
              Huidproblemen
            </h1>
            <p className="font-sans text-[14px] font-normal leading-6 text-black md:text-[16px]">
              Begrijp huidproblemen vanaf de oorzaak tot en oplossing
            </p>
          </header>

          {/* A-Z pill bar — desktop only */}
          <nav
            aria-label="Alfabet filter"
            className="hidden flex-wrap justify-center gap-[10.56px] md:flex"
          >
            {ALPHABET.map((letter) => (
              <button
                key={letter}
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E1DFDF] bg-white font-sans text-[16px] font-normal text-black transition-colors hover:bg-ink hover:text-white"
              >
                {letter}
              </button>
            ))}
          </nav>

          {/* Mobile: full-width search only.
              Desktop: 3 filter dropdowns left + search right. */}
          <div className="flex w-full flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between md:gap-8">
            <div className="hidden flex-wrap items-center gap-[18px] md:flex">
              <FilterDropdown label="Type probleem" />
              <FilterDropdown label="Geschikt voor" />
              <FilterDropdown label="Geschikt voor" />
            </div>
            <div className="flex h-[42px] w-full items-center justify-between gap-3 rounded-md border border-[#E2DFDF] bg-white px-4 md:w-[282px]">
              <input
                type="text"
                placeholder="Zoek binnen planten"
                className="flex-1 bg-transparent font-sans text-[16px] font-normal leading-[140%] text-[#767473] placeholder:text-[#767473]/60 focus:outline-none"
              />
              <SearchIcon className="h-4 w-4 shrink-0 text-ink" />
            </div>
          </div>

          {/* Card grid.
              Mobile: single-column horizontal cards (small image + meta).
              Desktop: 3-column vertical cards (image on top + meta + body). */}
          <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {conditions.map((c, i) => (
              <ConditionCard key={i} c={c} />
            ))}
          </div>

          {/* Desktop Load more CTA — hidden on mobile (replaced by sticky bar) */}
          <button
            type="button"
            className="mt-6 hidden h-12 items-center justify-center bg-ink px-12 font-sans text-[15px] font-medium leading-[140%] tracking-[0.02em] text-white transition-colors hover:bg-forest md:inline-flex"
          >
            Laad meer artikelen
          </button>
        </div>
      </main>

      {/* Mobile-only sticky Filters bar at viewport bottom. Tapping it
          would surface a filter sheet — wired as a button for now. */}
      <button
        type="button"
        className="sticky bottom-0 left-0 right-0 flex h-14 w-full items-center justify-center gap-3 bg-ink font-sans text-[16px] font-medium leading-[140%] text-white md:hidden"
      >
        <span>Filters</span>
        <FilterIcon className="h-5 w-5" />
      </button>

      <SiteFooter settings={previewSettings} qrSrc="/images/qr.svg" />
    </>
  );
}

function FilterDropdown({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-[42px] items-center gap-2 rounded-md border border-[#E1DFDF] bg-white px-3 font-sans text-[16px] font-normal text-black transition-colors hover:border-ink"
    >
      <span>{label}</span>
      <CaretDown className="h-5 w-5" />
    </button>
  );
}

function ConditionCard({ c }: { c: Condition }) {
  return (
    <Link
      href={`/skin-conditions/${c.slug}`}
      className="block overflow-hidden rounded-md border border-[#E1DFDF] bg-white transition-shadow hover:shadow-md"
    >
      {/* Mobile: horizontal row.
          Desktop: vertical stack with bigger image. */}
      <div className="flex flex-row gap-3 p-2 md:flex-col md:gap-5 md:p-3">
        <div className="relative aspect-square h-[72px] w-[72px] shrink-0 overflow-hidden rounded-md bg-[#F5F1E8] md:aspect-[4/3] md:h-auto md:w-full">
          <Image
            src={c.image}
            alt={c.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 72px"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1 px-1 py-1 md:gap-3 md:px-3 md:pb-4 md:pt-0">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-ink/70 md:text-[12px]">
              {c.label}
            </span>
            <span className="flex items-center gap-1 font-sans text-[11px] font-normal text-ink/70 md:text-[12px]">
              <CommentIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span>{c.comments}</span>
            </span>
          </div>
          <h3 className="font-sans text-[15px] font-bold uppercase tracking-[0.02em] text-ink md:text-[18px]">
            {c.title}
          </h3>
          <p className="hidden font-sans text-[14px] font-normal leading-[160%] text-ink/80 md:block">
            {c.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
