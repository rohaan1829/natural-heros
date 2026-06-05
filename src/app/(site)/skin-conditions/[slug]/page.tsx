import { Fragment } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ShopHeader } from "@/components/layout/ShopHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { previewSettings } from "@/lib/preview-data";

export const dynamic = "force-dynamic";

/** Upward arrow used by the "Terug naar inhoudsopgave" back-link. */
function UpArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M8 13V3M3 8L8 3L13 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Hand-drawn brush stroke underline.
 *
 * Soft, thick, slightly arcing stroke that tapers at the ends — mimics
 * the highlighter / brush look of the Figma asset. Stretches to fill
 * its parent's width and inherits color via currentColor.
 */
function SquiggleUnderline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 8"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 4 Q 50 2, 100 4 T 198 4"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />
    </svg>
  );
}

/** Outlined circle with a check mark — bullet marker for content lists. */
function CircleCheck({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M5.5 9.5L8 12L12.5 7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ConditionDetail = {
  title: string;
  kicker: string;
  intro: string;
  image: string;
  facts: Array<{ label: string; value: string }>;
  anchorTitle: string;
  anchors: string[];
  testimonial: { text: string; author: string; avatar?: string };
  /** Long-form sections rendered after the testimonial. Each section's
   *  heading aligns with an anchor link above. Body blocks support
   *  paragraphs, sub-headings, and bullet lists; each section may end
   *  with an optional inline image. */
  sections: Array<{ heading: string; blocks: Block[]; endImage?: string }>;
  /** Product cards rendered between the long-form sections and the
   *  closing testimonial / conclusion. */
  products?: Array<{
    title: string;
    image: string;
    priceFrom: string;
    rating?: number;
  }>;
  /** Sources / references callout. Heading + list of links rendered in
   *  the same cream rail style as the testimonial card. */
  sources?: { heading: string; links: string[] };
};

type Block =
  | { kind: "p"; text: string }
  | { kind: "sub"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "table"; rows: Array<{ label: string; value: string }> };

const CONDITIONS: Record<string, ConditionDetail> = {
  acne: {
    title: "ACNE",
    kicker: "HUIDPROBLEEM",
    intro:
      "Acne is een van de meest voorkomende huidaandoeningen waarmee jongeren en volwassenen te maken krijgen. Het ontstaat door verstopte poriën, overmatige talgproductie en de groei van bacteriën in het huidoppervlak. Acne kan zich uiten in pukkels, mee-eters en pijnlijke ontstekingen, vooral op het gezicht, de rug en de borst.",
    image: "/images/skin-acne.svg",
    facts: [
      { label: "Type", value: "Inflammatoire huidaandoening" },
      { label: "Veroorzaakt door", value: "Hormonen, bacteriën, talgproductie" },
      { label: "Voorkomt op", value: "Gezicht, rug, borst, schouders" },
      { label: "Behandeling", value: "Reiniging, exfoliatie, hydratatie" },
      { label: "Helpt bij", value: "Lavendel, Tea Tree, Niacinamide" },
    ],
    anchorTitle: "Alles over Acne",
    anchors: [
      "Wat maakt acne zo vervelend?",
      "Oorzaken van acne",
      "Symptomen van acne herkennen",
      "Natuurlijke ingrediënten tegen acne",
      "Hoe kun je acne natuurlijk behandelen?",
      "Conclusie",
    ],
    testimonial: {
      text: "Na jarenlang agressieve chemicaliën te hebben gebruikt die mijn huid rood en schilferig maakten, was de overstap naar een natuurlijke routine de beste beslissing ooit. Mijn huid voelt voor het eerst in balans en de Tea Tree olie doet wonderen voor mijn onzuiverheden zonder irritatie op te wekken. Het is een proces, maar ik heb eindelijk het gevoel dat ik mét mijn huid werk in plaats van ertegen.",
      author: "Liefs Malou",
      avatar: "/images/liefs-malou.svg",
    },
    sections: [
      {
        heading: "Wat maakt acne zo vervelend?",
        blocks: [
          {
            kind: "p",
            text:
              "Acne is een van de meest voorkomende huidproblemen ter wereld. Het ontstaat wanneer haarzakjes in de huid verstopt raken door dode huidcellen en talg. Dit kan leiden tot mee-eters, puistjes, cysten en soms littekens.",
          },
          {
            kind: "p",
            text:
              "Acne komt niet alleen voor bij tieners, maar kan op elke leeftijd ontstaan. Hormonale veranderingen, stress, voeding en verzorgingsproducten spelen allemaal een rol bij het ontstaan en verergeren van acne.",
          },
        ],
      },
      {
        heading: "Oorzaken van acne",
        blocks: [
          { kind: "sub", text: "Belangrijkste oorzaken:" },
          {
            kind: "list",
            items: [
              "Hormonale veranderingen (puberteit, menstruatie, zwangerschap)",
              "Overmatige talgproductie",
              "Verstopte poriën door dode huidcellen",
              "Bacteriën (Propionibacterium acnes)",
              "Ontstekingen in de huid",
              "Stress en slaapgebrek",
              "Bepaalde voedingsmiddelen",
              "Onjuiste huidverzorging",
            ],
          },
          { kind: "sub", text: "Hoe werkt acne precies?" },
          {
            kind: "p",
            text:
              "Acne ontstaat in vier stappen. Eerst produceert de huid te veel talg. Vervolgens raken de haarzakjes verstopt door dode huidcellen. Bacteriën vermenigvuldigen zich in de verstopte poriën, wat leidt tot ontstekingen.",
          },
        ],
        endImage: "/images/youtube-video-ss.png",
      },
      {
        heading: "Symptomen van acne herkennen",
        blocks: [
          {
            kind: "p",
            text:
              "Acne kan zich op verschillende manieren uiten. Het is belangrijk om te weten welk type acne je hebt, zodat je de juiste behandeling kunt kiezen.",
          },
          {
            kind: "table",
            rows: [
              { label: "Mee-eters (Comedo's)", value: "Verstopte poriën die zwart of wit zien door oxidatie" },
              { label: "Puistjes (Papels)", value: "Rode, gezwollen bultjes die pijnlijk kunnen zijn" },
              { label: "Pustels", value: "Puistjes gevuld met pus, omringd door rode huid" },
              { label: "Cysten", value: "Diepe, pijnlijke bulten onder de huid" },
            ],
          },
        ],
      },
      {
        heading: "Natuurlijke ingrediënten tegen acne",
        blocks: [
          {
            kind: "p",
            text:
              "Gelukkig zijn er veel natuurlijke ingrediënten die kunnen helpen bij het verminderen van acne en het voorkomen van nieuwe uitbraken.",
          },
        ],
      },
      {
        heading: "Hoe kun je acne natuurlijk behandelen?",
        blocks: [
          {
            kind: "p",
            text:
              "Een goede huidverzorgingsroutine is essentieel bij de behandeling van acne. Hier zijn enkele belangrijke stappen die je kunt nemen:",
          },
          { kind: "sub", text: "Dagelijkse routine:" },
          {
            kind: "list",
            items: [
              "Reinig je gezicht 's ochtends en 's avonds met een milde reiniger",
              "Gebruik een toner met natuurlijke ingrediënten",
              "Breng een lichte, niet-comedogene moisturizer aan",
              "Vergeet zonbescherming overdag niet (SPF 30 of hoger)",
              "Verwijder make-up grondig voor het slapengaan",
              "Vermijd het aanraken van je gezicht met ongewassen handen",
            ],
          },
        ],
      },
      {
        heading: "Conclusie",
        blocks: [
          {
            kind: "p",
            text:
              "Acne is een complex huidprobleem dat verschillende oorzaken kan hebben. Door te begrijpen wat acne veroorzaakt en welke natuurlijke ingrediënten kunnen helpen, kun je een effectieve routine opbouwen die past bij jouw huid. Geduld en consistentie zijn de sleutel — geef je huid de tijd om te reageren op natuurlijke behandelingen.",
          },
        ],
      },
    ],
    products: [
      {
        title: "TEA TREE REINIGER",
        image: "/images/Zinc.svg",
        priceFrom: "vanaf €10.99",
        rating: 4.8,
      },
      {
        title: "BHA EXFOLIANT",
        image: "/images/Zinc.svg",
        priceFrom: "vanaf €10.99",
        rating: 4.8,
      },
      {
        title: "NIACINAMIDE SERUM",
        image: "/images/Zinc.svg",
        priceFrom: "vanaf €10.99",
        rating: 4.8,
      },
      {
        title: "ZINC CREAM",
        image: "/images/Zinc.svg",
        priceFrom: "vanaf €10.99",
        rating: 4.8,
      },
    ],
    sources: {
      heading: "References",
      links: [
        "https://www.slaapwijzer.net/gaba/",
        "https://pubmed.ncbi.nlm.nih.gov/31711477/",
        "https://www.degruyter.com/document/doi/10.1515/znc-1991-11-1223/html",
        "https://www.researchgate.net/profile/Hiroyuki-Yasui/publication/7639954",
        "https://roberttisserand.com/2011/08/lavender-oil-skin-savior-or-skin-irritant/",
      ],
    },
  },
  "eczeem-rosacea": {
    title: "ECZEEM - ROSACEA",
    kicker: "HUIDPROBLEEM",
    intro:
      "Eczeem en rosacea zijn chronische huidaandoeningen die roodheid, jeuk en irritatie veroorzaken. Ze kunnen door verschillende factoren worden uitgelokt en verergerd — van stress en weersomstandigheden tot voeding en huidverzorgingsproducten.",
    image: "/images/skin-eczeem.png",
    facts: [
      { label: "Type", value: "Chronische inflammatie" },
      { label: "Veroorzaakt door", value: "Genetica, allergenen, stress" },
      { label: "Voorkomt op", value: "Wangen, nek, plooien" },
      { label: "Behandeling", value: "Verzachten, hydrateren, kalmeren" },
      { label: "Helpt bij", value: "Kamille, Calendula, Aloë Vera" },
    ],
    anchorTitle: "Alles over Eczeem & Rosacea",
    anchors: [
      "Wat is eczeem en rosacea?",
      "Wat triggert een opvlamming?",
      "Symptomen herkennen",
      "Natuurlijke ingrediënten die kalmeren",
      "Hoe behandel je het rustig?",
      "Conclusie",
    ],
    testimonial: {
      text: "Mijn huid is altijd reactief geweest, en ik heb veel producten geprobeerd voordat ik vond wat werkt. De kamille en aloë vera producten hebben mijn routine getransformeerd — ik heb nu veel minder opvlammingen en mijn huid voelt eindelijk rustig en gehydrateerd.",
      author: "Liefs Sophie",
      avatar: "/images/liefs-malou.svg",
    },
    sections: [
      {
        heading: "Wat is eczeem en rosacea?",
        blocks: [
          {
            kind: "p",
            text:
              "Eczeem en rosacea zijn chronische huidaandoeningen die de barrièrefunctie van de huid verstoren. Hoewel ze verschillende oorzaken hebben, delen ze symptomen als roodheid, jeuk en gevoeligheid.",
          },
        ],
      },
    ],
  },
  "droge-huid-vette-huid": {
    title: "DROGE HUID - VETTE HUID",
    kicker: "HUIDPROBLEEM",
    intro:
      "Een droge of vette huid kan verschillende oorzaken hebben, waaronder genetica, levensstijl en omgevingsfactoren. De juiste verzorging kan helpen om de balans van je huid te herstellen en de natuurlijke barrière te ondersteunen.",
    image: "/images/skin-droge-huid.png",
    facts: [
      { label: "Type", value: "Onbalans in talgproductie" },
      { label: "Veroorzaakt door", value: "Klimaat, leeftijd, hormonen" },
      { label: "Voorkomt op", value: "Gehele gezicht en lichaam" },
      { label: "Behandeling", value: "Hydraterende routine, balanceren" },
      { label: "Helpt bij", value: "Jojoba, Argan, Squalane" },
    ],
    anchorTitle: "Alles over Droge & Vette huid",
    anchors: [
      "Wat bepaalt je huidtype?",
      "Oorzaken van onbalans",
      "Symptomen per huidtype",
      "Welke oliën helpen?",
      "Een routine die balanceert",
      "Conclusie",
    ],
    testimonial: {
      text: "Ik dacht altijd dat ik een droge huid had, maar het bleek een uitgedroogde vette huid te zijn. Squalane heeft mijn huid eindelijk in balans gebracht — niet meer dat strakke gevoel, en geen overmatige glans meer.",
      author: "Liefs Emma",
      avatar: "/images/liefs-malou.svg",
    },
    sections: [
      {
        heading: "Wat bepaalt je huidtype?",
        blocks: [
          {
            kind: "p",
            text:
              "Je huidtype wordt grotendeels bepaald door genetica, maar wordt sterk beïnvloed door leeftijd, hormonen, klimaat en je dagelijkse routine.",
          },
        ],
      },
    ],
  },
  psoriasis: {
    title: "PSORIASIS",
    kicker: "HUIDPROBLEEM",
    intro:
      "Psoriasis is een chronische auto-immuunziekte waarbij het lichaam te snel nieuwe huidcellen aanmaakt. Dit leidt tot dikke, schilferige plekken die rood zijn en kunnen jeuken of pijn doen. De aandoening verloopt vaak in cycli.",
    image: "/images/skin-psoriasis.png",
    facts: [
      { label: "Type", value: "Auto-immuun aandoening" },
      { label: "Veroorzaakt door", value: "Immuunsysteem, genetica" },
      { label: "Voorkomt op", value: "Ellebogen, knieën, hoofdhuid" },
      { label: "Behandeling", value: "Verzachten, ontstekingsremmend" },
      { label: "Helpt bij", value: "Hennep, Calendula, Sint-Janskruid" },
    ],
    anchorTitle: "Alles over Psoriasis",
    anchors: [
      "Wat is psoriasis?",
      "Triggers en flares",
      "Symptomen herkennen",
      "Verzachtende ingrediënten",
      "Natuurlijke ondersteuning",
      "Conclusie",
    ],
    testimonial: {
      text: "Psoriasis op mijn ellebogen heeft me jarenlang dwarsgezeten. Hennepolie en sint-janskruid hebben mijn huid kalmer gemaakt dan ik in jaren heb meegemaakt. Het is geen wondermiddel, maar het maakt het leven een stuk lichter.",
      author: "Liefs Tessa",
      avatar: "/images/liefs-malou.svg",
    },
    sections: [
      {
        heading: "Wat is psoriasis?",
        blocks: [
          {
            kind: "p",
            text:
              "Psoriasis is een chronische auto-immuunziekte waarbij het lichaam te snel nieuwe huidcellen aanmaakt. Dit leidt tot dikke, schilferige plekken die rood zijn en kunnen jeuken of pijn doen.",
          },
        ],
      },
    ],
  },
  hyperpigmentatie: {
    title: "HYPERPIGMENTATIE",
    kicker: "HUIDPROBLEEM",
    intro:
      "Hyperpigmentatie ontstaat door een overproductie van melanine, het pigment dat onze huid kleur geeft. Dit leidt tot donkere vlekken die op verschillende plekken op het lichaam kunnen verschijnen — meestal op plekken die veel aan de zon blootgesteld worden.",
    image: "/images/skin-hyperpigmentatie.png",
    facts: [
      { label: "Type", value: "Pigmentatie aandoening" },
      { label: "Veroorzaakt door", value: "Zon, hormonen, ontsteking" },
      { label: "Voorkomt op", value: "Gezicht, handen, decolleté" },
      { label: "Behandeling", value: "SPF, vitamine C, exfoliatie" },
      { label: "Helpt bij", value: "Rozenbottel, Vitamine C, Niacinamide" },
    ],
    anchorTitle: "Alles over Hyperpigmentatie",
    anchors: [
      "Wat is hyperpigmentatie?",
      "De rol van zonblootstelling",
      "Verschillende soorten vlekken",
      "Vervagende ingrediënten",
      "Preventie en zonbescherming",
      "Conclusie",
    ],
    testimonial: {
      text: "Na zwangerschapsmasker dacht ik dat mijn donkere vlekken er voor altijd zouden zijn. Vitamine C serum en consistente SPF hebben mijn huidtoon merkbaar lichter en gelijkmatiger gemaakt in een paar maanden.",
      author: "Liefs Anna",
      avatar: "/images/liefs-malou.svg",
    },
    sections: [
      {
        heading: "Wat is hyperpigmentatie?",
        blocks: [
          {
            kind: "p",
            text:
              "Hyperpigmentatie ontstaat door overproductie van melanine en kan worden veroorzaakt door zonblootstelling, hormonen, ontstekingen of medicijngebruik.",
          },
        ],
      },
    ],
  },
  contacteczeem: {
    title: "CONTACTECZEEM",
    kicker: "HUIDPROBLEEM",
    intro:
      "Contacteczeem ontstaat door direct contact met irriterende stoffen of allergenen. Het resulteert in rode, jeukende uitslag die kan blaren of schilferen — en is vaak een teken dat je huidbarrière hulp nodig heeft om te herstellen.",
    image: "/images/skin-contacteczeem.png",
    facts: [
      { label: "Type", value: "Allergische reactie" },
      { label: "Veroorzaakt door", value: "Allergenen, irritantia" },
      { label: "Voorkomt op", value: "Handen, gezicht, blootgestelde huid" },
      { label: "Behandeling", value: "Allergeen vermijden, herstellen" },
      { label: "Helpt bij", value: "Aloë Vera, Hennep, Sheaboter" },
    ],
    anchorTitle: "Alles over Contacteczeem",
    anchors: [
      "Wat is contacteczeem?",
      "Veelvoorkomende allergenen",
      "Symptomen herkennen",
      "Kalmerende ingrediënten",
      "Hoe vermijd je triggers?",
      "Conclusie",
    ],
    testimonial: {
      text: "Mijn handen waren zo geïrriteerd door schoonmaakmiddelen dat ik bang was om water aan te raken. Een routine met aloë vera en sheaboter heeft de barrière van mijn huid hersteld — eindelijk zonder dat brandende gevoel.",
      author: "Liefs Lotte",
      avatar: "/images/liefs-malou.svg",
    },
    sections: [
      {
        heading: "Wat is contacteczeem?",
        blocks: [
          {
            kind: "p",
            text:
              "Contacteczeem ontstaat door direct contact met allergenen of irriterende stoffen — vaak op de huid die het meest blootgesteld wordt aan dagelijkse triggers zoals zeep, parfums of metalen.",
          },
        ],
      },
    ],
  },
};

export default async function ConditionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = CONDITIONS[slug];
  if (!c) notFound();

  return (
    <>
      <ShopHeader
        crumbs={[
          { label: "Huidproblemen", href: "/skin-conditions" },
          { label: c.title },
        ]}
      />

      <main className="flex-1 bg-[linear-gradient(180deg,#F5F1E8_0%,#FFFFFF_100%)] py-10 md:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-10">
          {/* Hero — desktop: text left, image right. Mobile: kicker +
              title first, then image, then intro and facts table. */}
          <section className="flex flex-col gap-6 md:flex-row md:items-start md:gap-[25px]">
            {/* Kicker + title — shown above the image on mobile, inside
                the left column on desktop. */}
            <header className="flex flex-col gap-2 md:hidden">
              <span className="font-display text-[12px] font-normal uppercase leading-[14px] text-[#767473]">
                {c.kicker}
              </span>
              <h1 className="font-display text-[40px] font-bold leading-[120%] tracking-[0.4px] text-ink">
                {c.title}
              </h1>
            </header>

            {/* Image — order-2 on desktop (right), but appears second
                on mobile via DOM order. */}
            <div className="relative order-none aspect-[689/519] w-full overflow-hidden rounded-lg md:order-2 md:flex-1">
              <Image
                src={c.image}
                alt={c.title}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 768px) 689px, 100vw"
              />
            </div>

            {/* Left text column — kicker+title visible only md+; intro
                + facts table visible on all viewports. */}
            <div className="flex w-full flex-col gap-6 md:order-1 md:w-[486px] md:gap-10">
              <header className="hidden flex-col gap-2 md:flex">
                <span className="font-display text-[12px] font-normal uppercase leading-[14px] text-[#767473]">
                  {c.kicker}
                </span>
                <h1 className="font-display text-[56px] font-bold leading-[120%] tracking-[0.4px] text-ink">
                  {c.title}
                </h1>
              </header>

              <p className="font-sans text-[16px] font-normal leading-[140%] text-black md:text-[18px]">
                {c.intro}
              </p>

              {/* Facts table — 2 columns separated by horizontal rules. */}
              <dl className="flex flex-col">
                {c.facts.map((row, i) => (
                  <div
                    key={i}
                    className="flex flex-row items-baseline gap-4 border-b border-[#D9D9D9] py-2 last:border-b-0"
                  >
                    <dt className="w-[150px] shrink-0 font-sans text-[15px] font-medium leading-[24px] text-black md:w-[180px] md:text-[16px] md:leading-[28px]">
                      {row.label}
                    </dt>
                    <dd className="flex-1 font-sans text-[15px] font-normal leading-[24px] text-black md:text-[16px] md:leading-[28px]">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* Below-hero stack: anchor card + testimonial.
              Centered horizontally; max 792px wide to match Figma. */}
          <div className="mx-auto mt-12 flex w-full max-w-[792px] flex-col gap-8 md:mt-16">
            {/* Anchor / TOC card */}
            <section
              id="top"
              aria-label={c.anchorTitle}
              className="flex flex-col gap-5 rounded-lg border border-[#E1DFDF] bg-white/40 p-6 md:gap-6 md:p-10"
            >
              <h2 className="font-display text-[18px] font-bold leading-[32px] text-black md:text-[20px]">
                {c.anchorTitle}
              </h2>
              <ul className="flex flex-col gap-1">
                {c.anchors.map((anchor, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-3 font-sans text-[16px] font-normal leading-[160%] text-black md:text-[20px]"
                  >
                    <span aria-hidden className="text-ink">
                      •
                    </span>
                    <a href="#" className="underline-offset-2 hover:underline">
                      {anchor}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            {/* Testimonial card — left forest-cream rail accent */}
            <section
              aria-label="Testimonial"
              className="flex flex-col gap-5 border-l-8 border-[#EEE3D7] bg-[#FCF9F7] p-6 md:flex-row md:items-center md:gap-12 md:p-10"
            >
              <div className="flex w-full flex-col gap-5">
                <p className="font-sans text-[16px] font-normal leading-[140%] text-ink/80 md:text-[18px]">
                  {c.testimonial.text}
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full bg-[#D9D9D9] md:h-20 md:w-20">
                    {c.testimonial.avatar && (
                      <Image
                        src={c.testimonial.avatar}
                        alt={c.testimonial.author}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    )}
                  </div>
                  <span className="font-sans text-[18px] font-normal italic leading-[32px] text-black md:text-[20px]">
                    {c.testimonial.author}
                  </span>
                </div>
              </div>
            </section>

            {/* Long-form sections + product grid.
                Sections render in order; the products grid (if any)
                is injected before the final "Conclusie" section. */}
            {c.sections.map((section, i) => {
              const isConclusion = section.heading
                .toLowerCase()
                .startsWith("conclusie");
              const showProductsBefore =
                isConclusion && c.products && c.products.length > 0;
              return (
                <Fragment key={i}>
                  {showProductsBefore && (
                    <section
                      aria-label="Aanbevolen producten"
                      className="grid grid-cols-2 gap-3 sm:gap-6"
                    >
                      {c.products!.map((p, j) => (
                        <ProductCard key={j} product={p} />
                      ))}
                    </section>
                  )}
                  {renderSection(section, i)}
                </Fragment>
              );
            })}

            {/* References callout — cream rail accent. Each link gets a
                hand-drawn squiggle underline rendered as a repeating
                inline SVG so the wave shape matches the Figma asset. */}
            {c.sources && (
              <section
                aria-label={c.sources.heading}
                className="flex flex-col gap-5 border-l-4 border-[#EEE3D7] bg-[#FCF9F7] p-6 md:gap-6 md:p-10"
              >
                <h2 className="font-display text-[20px] font-bold leading-[130%] text-ink">
                  {c.sources.heading}
                </h2>
                <ul className="flex flex-col gap-5">
                  {c.sources.links.map((href, i) => (
                    <li
                      key={i}
                      className="flex items-baseline gap-3 font-sans text-[16px] font-normal leading-7 text-black md:text-[18px]"
                    >
                      <span aria-hidden className="text-ink">
                        •
                      </span>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex break-all"
                      >
                        <span className="relative z-10">{href}</span>
                        <span
                          className="pointer-events-none absolute -bottom-1 left-0 right-0 h-3 bg-[url(/icons/link-underline.svg)] bg-[length:100%_100%] bg-no-repeat"
                          aria-hidden
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </main>

      <SiteFooter settings={previewSettings} qrSrc="/images/qr.svg" />
    </>
  );
}

/* ----------------------------------------------------------------------
 * Rendering helpers
 * ------------------------------------------------------------------- */

function renderSection(
  section: ConditionDetail["sections"][number],
  i: number,
) {
  return (
    <section
      key={i}
      id={`section-${i}`}
      className="flex flex-col gap-5"
    >
      <h3 className="font-display text-[28px] font-bold leading-[120%] tracking-[0.4px] text-ink md:text-[36px]">
        {section.heading}
      </h3>
      <div className="flex flex-col gap-5">
        {section.blocks.map((block, j) => {
          if (block.kind === "p") {
            return (
              <p
                key={j}
                className="font-sans text-[16px] font-normal leading-[140%] text-black md:text-[18px]"
              >
                {block.text}
              </p>
            );
          }
          if (block.kind === "sub") {
            return (
              <h4
                key={j}
                className="font-sans text-[16px] font-bold leading-[140%] text-black md:text-[18px]"
              >
                {block.text}
              </h4>
            );
          }
          if (block.kind === "list") {
            return (
              <ul key={j} className="flex flex-col gap-2">
                {block.items.map((item, k) => (
                  <li
                    key={k}
                    className="flex items-start gap-3 font-sans text-[16px] font-normal leading-[140%] text-black md:text-[18px]"
                  >
                    <CircleCheck className="mt-1 h-[18px] w-[18px] shrink-0 text-ink" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          }
          // table — borderless 2-column list with thin row dividers.
          return (
            <dl key={j} className="flex w-full flex-col gap-2">
              {block.rows.map((row, k) => (
                <div
                  key={k}
                  className="flex flex-row items-baseline gap-6 border-b border-[#D9D9D9] py-1 last:border-b-0"
                >
                  <dt className="w-[180px] shrink-0 font-sans text-[16px] font-medium leading-7 text-black md:text-[18px]">
                    {row.label}
                  </dt>
                  <dd className="flex-1 font-sans text-[16px] font-normal leading-7 text-black md:text-[18px]">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          );
        })}
      </div>

      {section.endImage && (
        <div className="mt-6 flex flex-col gap-6">
          <div className="relative aspect-[792/446] w-full overflow-hidden">
            <Image
              src={section.endImage}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 768px) 792px, 100vw"
            />
          </div>
          <a
            href="#top"
            className="inline-flex items-center gap-2 font-sans text-[16px] font-medium leading-[22px] text-black hover:underline md:text-[18px]"
          >
            <UpArrow className="h-4 w-4" />
            <span>Terug naar inhoudsopgave</span>
          </a>
        </div>
      )}
    </section>
  );
}

/* ----------------------------------------------------------------------
 * Product card
 * ------------------------------------------------------------------- */

function HeartOutline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 18" fill="none" aria-hidden="true" className={className}>
      <path
        d="M2.45 3.75A4.4 4.4 0 0 1 5.58 2.45c1.17 0 2.29.46 3.12 1.3L10 5.04l1.3-1.3a4.42 4.42 0 0 1 6.25 6.25L10 17.55 2.45 10A4.4 4.4 0 0 1 2.45 3.75Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M10 4v12M4 10h12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BagOutline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M1.5 6.5h15l-1.2 12.4H2.7L1.5 6.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 6.5V4a3.5 3.5 0 1 1 7 0v2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarFilled({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 1.5l1.93 4.18 4.57.42-3.45 3.06 1.04 4.47L8 11.4l-4.08 2.23 1.04-4.47L1.5 6.1l4.57-.42L8 1.5z" />
    </svg>
  );
}

type ProductCardData = NonNullable<ConditionDetail["products"]>[number];

function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <article className="flex flex-col gap-3 lg:h-[322px] lg:gap-5 lg:rounded-[7px] lg:border lg:border-[#E2DFDF] lg:bg-white lg:p-5 lg:pb-[18px]">
      {/* Image area with hover icons */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-[#E2DFDF]/50 bg-white lg:aspect-auto lg:h-[218px]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-3"
          sizes="(min-width: 640px) 320px, 100vw"
        />
        {/* Floating wishlist icon (bottom-left) */}
        <button
          type="button"
          aria-label={`Add ${product.title} to wishlist`}
          className="absolute bottom-2 left-2 flex h-9 w-9 items-center justify-center text-ink transition-opacity hover:opacity-70"
        >
          <HeartOutline className="h-5 w-5" />
        </button>
        {/* Floating add-to-cart cluster (bottom-right) */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 text-ink">
          <button
            type="button"
            aria-label={`Add ${product.title} to cart`}
            className="flex h-9 w-9 items-center justify-center transition-opacity hover:opacity-70"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label={`Open cart for ${product.title}`}
            className="flex h-9 w-9 items-center justify-center transition-opacity hover:opacity-70"
          >
            <BagOutline className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Title + price + rating row.
          Phone / tablet widths use sentence-case title and tighter
          spacing; large screens uppercase to match the Figma spec. */}
      <div className="flex flex-col gap-2">
        <h3 className="truncate font-display text-[15px] font-bold leading-tight tracking-[0.02em] text-black sm:text-[16px] lg:overflow-visible lg:text-[18px] lg:uppercase">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-sans text-[15px] font-normal leading-[25px] text-[#767473] lg:text-[16px]">
            {product.priceFrom}
          </span>
          {product.rating != null && (
            <span className="flex items-center gap-1 font-sans text-[15px] font-bold leading-[25px] text-black lg:font-normal lg:text-[16px] lg:text-[#767473]">
              <span>{product.rating}</span>
              <StarFilled className="h-4 w-4 text-[#C39A91]" />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
