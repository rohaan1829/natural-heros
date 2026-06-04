import { groq } from "next-sanity";

/**
 * Fetches the full product page payload by slug.
 * Edit content in Sanity Studio; tag-based revalidation pushes
 * changes live without a redeploy.
 */
export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
    subtitle,
    slug,
    description,
    price,
    currency,
    sizes,
    badges[]{ label, icon, alt },
    images[]{ ..., asset-> },
    reviews,
    section01{
      label, heading, subheading, bullets,
      image{ ..., asset-> },
      specs[]{ label, value }
    },
    section02{
      label, heading, subheading,
      components[]{ name, description, percentage }
    },
    section03{
      label, heading, subheading,
      cards[]{ number, title, description, image{ ..., asset-> } }
    },
    section04{
      label, heading, subheading,
      steps[]{ label, title, description, image{ ..., asset-> } }
    },
    section05{
      label, heading, subheading,
      cards[]{ label, title, description, image{ ..., asset-> } }
    },
    section06{
      label, heading, subheading,
      callout{ text, buttonLabel, buttonHref },
      items[]{ question, answer }
    }
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title,
    logo{ ..., asset-> },
    nav[]{ label, href },
    cta{ loginLabel, cartLabel }
  }
`;

/** Tag used by next: { tags } and revalidateTag in the webhook. */
export const PRODUCT_TAG = "product";
export const SETTINGS_TAG = "settings";
