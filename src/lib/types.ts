/**
 * Shape of data returned by GROQ queries in src/sanity/lib/queries.ts.
 * Kept hand-written (vs. typegen) for readability in a small project.
 */
import type { Image } from "sanity";

export type SanityImage = Image & {
  asset: {
    _ref?: string;
    url?: string;
    metadata?: { lqip?: string; dimensions?: { width: number; height: number } };
  };
  alt?: string;
};

export type Badge = {
  label: string;
  icon?: SanityImage;
  alt?: string;
  /** Local fallback image used by preview data before Sanity is wired up. */
  fallbackSrc?: string;
};

export type Size = {
  label: string;
  ml: number;
  price?: number;
};

export type Reviews = {
  count?: number;
  rating?: number;
  questions?: number;
  users?: string;
};

export type Spec = { label: string; value: string };

export type CompositionComponent = {
  name: string;
  description: string;
  percentage: number;
};

export type UsageCard = {
  number: string;
  title: string;
  description?: string;
  image?: SanityImage;
  /** Local fallback used by preview data before Sanity is wired up. */
  fallbackImageSrc?: string;
};

export type ProcessStep = {
  label: string;
  title: string;
  description?: string;
  image?: SanityImage;
  /** Local fallback used by preview data before Sanity is wired up. */
  fallbackImageSrc?: string;
};

export type BotanicalCard = {
  label: string;
  title: string;
  description?: string;
  image?: SanityImage;
  /** Local fallback used by preview data before Sanity is wired up. */
  fallbackImageSrc?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Product = {
  _id: string;
  title: string;
  subtitle?: string;
  slug: { current: string };
  description?: string;
  price: number;
  currency?: string;
  sizes?: Size[];
  badges?: Badge[];
  images?: SanityImage[];
  /** Local fallback used by preview data before Sanity is wired up. */
  fallbackImageSrc?: string;
  /** Multiple local fallbacks per gallery slot — preview only. */
  fallbackGallery?: string[];
  reviews?: Reviews;
  section01?: {
    label?: string;
    heading?: string;
    subheading?: string;
    bullets?: string[];
    image?: SanityImage;
    /** Local fallback used by preview data before Sanity is wired up. */
    fallbackImageSrc?: string;
    specs?: Spec[];
  };
  section02?: {
    label?: string;
    heading?: string;
    subheading?: string;
    components?: CompositionComponent[];
  };
  section03?: {
    label?: string;
    heading?: string;
    subheading?: string;
    cards?: UsageCard[];
  };
  section04?: {
    label?: string;
    heading?: string;
    subheading?: string;
    steps?: ProcessStep[];
  };
  section05?: {
    label?: string;
    heading?: string;
    subheading?: string;
    cards?: BotanicalCard[];
  };
  section06?: {
    label?: string;
    heading?: string;
    subheading?: string;
    callout?: {
      text?: string;
      buttonLabel?: string;
      buttonHref?: string;
    };
    items?: FaqItem[];
  };
};

export type SiteSettings = {
  title?: string;
  logo?: SanityImage;
  nav?: Array<{ label: string; href: string }>;
  cta?: { loginLabel?: string; cartLabel?: string };
};
