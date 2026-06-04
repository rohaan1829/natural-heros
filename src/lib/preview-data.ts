/**
 * Local preview data — used only when Sanity isn't yet configured,
 * so the design pass can proceed without waiting for the CMS.
 * Once env vars are set and content is published, this fallback is
 * bypassed entirely; nothing in the production data path reads it.
 */
import type { Product, SiteSettings } from "./types";

export const previewSettings: SiteSettings = {
  title: "Natural Heroes",
  nav: [
    { label: "SHOP", href: "/shop" },
    { label: "JOURNAL", href: "/journal" },
    { label: "OVER ONS", href: "/over-ons" },
  ],
  cta: { loginLabel: "Login", cartLabel: "Cart" },
};

export const previewProduct: Product = {
  _id: "preview",
  title: "Eucalyptus globulus",
  subtitle: "Essential   Oil",
  slug: { current: "eucalyptus-globulus" },
  description:
    "De kenmerkende koele, kruidige geur van wilde eucalyptus uit de heuvels van Mértola.",
  price: 12.99,
  currency: "EUR",
  sizes: [
    { label: "5 ML", ml: 5 },
    { label: "10 ML", ml: 10 },
  ],
  badges: [
    { label: "100% Natural", fallbackSrc: "/images/badge-natural.svg" },
    { label: "Vegan", fallbackSrc: "/images/badge-vegan.svg" },
    { label: "Cruelty Free", fallbackSrc: "/images/badge-cruelty-free.svg" },
  ],
  images: [],
  fallbackImageSrc: "/images/eucalyptus.png",
  reviews: {
    count: 85,
    rating: 4.8,
    questions: 10,
    users: "20m+ users",
  },
  section01: {
    label: "SECTIE 01",
    heading: "Waarom deze olie zo bijzonder is",
    subheading:
      "De kenmerkende koele, kruidige geur van wilde eucalyptus uit de heuvels van Mértola.",
    bullets: [
      "De eerste lancering uit onze splinternieuwe Farm to Table lijn.",
      "Wild geoogst — geen plantage, geen kunstmest, geen irrigatie.",
      "Gedestilleerd door François Quéis en zijn team op de boerderij zelf.",
      "Volledige GC-MS analyse openlijk gedeeld — van blad tot fles.",
      "Donor apothekersglas met DIN-druppelaar.",
    ],
    fallbackImageSrc: "/images/trees-image.png",
    specs: [
      { label: "SPECIES", value: "Eucalyptus globulus (Myrtaceae)" },
      { label: "ORIGIN", value: "Verdade de Vale Côvo, Mórtola, Portugal" },
      { label: "HARVEST", value: "wild — vegetatieve fase" },
      { label: "METHODE", value: "stoomdestillatie binnen 24 uur na oogst" },
      { label: "ANALYSIS", value: "GC-MS · CESAM · Universiteit van Lissabon" },
    ],
  },
  section02: {
    label: "SECTIE 02",
    heading: "Wat zit er in deze olie?",
    subheading:
      "Gebaseerd op de GC-MS analyse door CESAM, Universiteit van Lissabon.",
    components: [
      {
        name: "1,8-CINEOOL",
        description:
          "De ziel van eucalyptus. Geeft die kenmerkende koele, scherpe geur die de lucht in huis verfrist — al eeuwen geliefd in aromatherapie- en huismentraditie.",
        percentage: 55,
      },
      {
        name: "LIMONEEN",
        description:
          "Brengt een lichte, opwekkende citrussfeer bovenop de eucalyptus. Versterkt de scherpte van cineool en maakt het profiel ronder.",
        percentage: 12,
      },
      {
        name: "P-CYMEEN & A-PINEEN",
        description:
          "Deze monoterpenen geven de kruidige, dennenpachtige draagkrant. Samen vormen ze de typische Mórtola-signatuur.",
        percentage: 14,
      },
    ],
  },
  section06: {
    label: "SECTIE 06",
    heading: "FAQ",
    subheading: "Veel gestelde vragen over gebruik, veiligheid en herkomst.",
    callout: {
      text: "Kunt u uw antwoord hier niet vinden? Wij kunnen u helpen!",
      buttonLabel: "Contact us",
      buttonHref: "/contact",
    },
    items: [
      {
        question: "Hoeveel druppels gebruik ik in een diffuser?",
        answer:
          "3–5 druppels per 100 ml water of zoals je apparaat aangeeft. Begin laag en bouw rustig op — eucalyptus is intens.",
      },
      {
        question: "Kan ik de olie direct op de huid aanbrengen?",
        answer:
          "Nee, etherische oliën moeten altijd verdund worden met een draagolie zoals jojoba of zoete amandelolie. Wij raden 1-2% verdunning aan voor veilig gebruik.",
      },
      {
        question: "Voor wie is deze olie niet geschikt?",
        answer:
          "Niet aanbevolen voor zwangere vrouwen, kinderen jonger dan 6 jaar, en mensen met astma of epilepsie. Raadpleeg altijd een arts bij twijfel.",
      },
      {
        question: "Wat is het verschil tussen wild geoogst en plantage-olie?",
        answer:
          "Wild geoogste olie heeft een rijker terpenenprofiel en variërt per oogst. Plantage-olie is consistenter maar mist de complexiteit van wilde planten.",
      },
      {
        question: "Waarom delen jullie de volledige GC-MS analyse?",
        answer:
          "Transparantie. Je verdient te weten wat er precies in je olie zit. Elk lot wordt geanalyseerd door CESAM aan de Universiteit van Lissabon.",
      },
      {
        question: "Waarom Mértola, Portugal?",
        answer:
          "De Alentejo regio heeft het ideale microklimaat voor eucalyptus globulus: hete zomers, milde winters, en arme grond die de planten dwingt meer etherische olie te produceren.",
      },
    ],
  },
  section05: {
    label: "SECTIE 05",
    heading: "Wat zit er in deze olie?",
    subheading:
      "Gebaseerd op de GC-MS analyse door CESAM, Universiteit van Lissabon.",
    cards: [
      {
        label: "INGREDIENT",
        title: "EUCALYPTUS GLOBULUS",
        description:
          "De Tasmaanse eucalyptus, ooit door Portugese kolonisten meegebracht en inmiddels diep geworteld in het Alentejaanse landschap. Smal, sikkelvormig blad, zwaar van olie.",
        fallbackImageSrc: "/images/botanical-eucalyptus.png",
      },
      {
        label: "BOERDERIJ",
        title: "HERDADE DE VALE CÔVO",
        description:
          "Een biologische boerderij in Corte Sines, Mértola, in het hart van de Alentejo. Geleid door François Goris en zijn team — wild oogsten, destilleren en verpakken.",
        fallbackImageSrc: "/images/botanical-farm.png",
      },
      {
        label: "METHODE",
        title: "WILD HARVEST",
        description:
          "Geen plantage, geen kunstmest, geen irrigatie. De planten staan waar ze willen staan. Compositie varieert per oogst — daar houden we van.",
        fallbackImageSrc: "/images/botanical-wild-harvest.png",
      },
      {
        label: "TECHNIEK",
        title: "STOOMDESTILLATIE",
        description:
          "De klassieke methode. Bladeren in een ketel, stoom trekt door de plant, vluchtige aromacomponenten gaan mee. Geen oplosmiddelen.",
        fallbackImageSrc: "/images/botanical-distillation-v2.png",
      },
      {
        label: "TRANSPARANTIE",
        title: "GC-MS · CESAM",
        description:
          "CESAM, Universiteit van Lissabon. Voor dit lot: 99% geïdentificeerd. 1,8-cineool 55,3% · limoneen 11,9% · p-cymeen 11,2% · β-phellandreen 4,0% · α-pineen 2,9%.",
        fallbackImageSrc: "/images/botanical-gc-ms.png",
      },
      {
        label: "VERPAKKING",
        title: "APOTHEKERSGLAS",
        description:
          "Etherische olie reageert op licht en zuurstof. Daarom donker apothekersglas, met DIN-druppelaar voor exacte dosering. Glas is recyclebaar en inert.",
        fallbackImageSrc: "/images/botanical-bottle.png",
      },
    ],
  },
  section04: {
    label: "SECTIE 04",
    heading: "Wat zit er in deze olie?",
    subheading:
      "Gebaseerd op de GC-MS analyse door CESAM, Universiteit van Lissabon.",
    steps: [
      {
        label: "STEP 01",
        title: "WILD HARVEST",
        description:
          "De bladeren worden niet aangeplant of bemest. Wilde oogst betekent: minder rendement, meer karakter.",
        fallbackImageSrc: "/images/wild-harvest.png",
      },
      {
        label: "STEP 02",
        title: "FARM-TO-BOTTLE",
        description:
          "Binnen 24 uur na de oogst gaan de bladeren de stoomketel in. Geen tussenhandel, geen tussenopslag.",
        fallbackImageSrc: "/images/farm-to-bottle.png",
      },
      {
        label: "STEP 03",
        title: "OPEN-SOURCED GC-MS",
        description:
          "Elk lot wordt geanalyseerd bij CESAM, Universiteit van Lissabon. Volledige analyse openlijk gedeeld.",
        fallbackImageSrc: "/images/open-sourced-gc-ms.png",
      },
      {
        label: "STEP 04",
        title: "AROMA",
        description:
          "Hoog in 1,8-cineool, met sprankels limoneen en kruidige p-cymeen. Een wandeling door een eucalyptusbos.",
        fallbackImageSrc: "/images/aroma.png",
      },
    ],
  },
  section03: {
    label: "SECTIE 03",
    heading: "Wat zit er in deze olie?",
    subheading:
      "Gebaseerd op de GC-MS analyse door CESAM, Universiteit van Lissabon.",
    cards: [
      {
        number: "01",
        title: "1,8-CINEOOL",
        description: "Diffuser, draagolie of zelfgemaakte balsem.",
        fallbackImageSrc: "/images/cistus-flower.svg",
      },
      { number: "02", title: "Verdun altijd" },
      { number: "03", title: "Doseer in diffuser" },
      { number: "04", title: "Bouw rustig op" },
    ],
  },
};
