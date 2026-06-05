import { defineField, defineType } from "sanity";

/**
 * subscriptionProduct
 *
 * Models the entire Subscribe page (No BS Deo). Editable from
 * Sanity Studio; every field maps to a visible piece of UI on
 * /subscribe so the hiring team can demo content updates live.
 */
export const subscriptionProduct = defineType({
  name: "subscriptionProduct",
  title: "Subscription Product",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "inhoud", title: "Inhoud (Step 1)" },
    { name: "type", title: "Type (Step 2)" },
    { name: "purchase", title: "Purchase & Trust" },
  ],
  fields: [
    /* ---------------- Hero ---------------- */
    defineField({
      name: "title",
      title: "Product title",
      type: "string",
      group: "hero",
      validation: (r) => r.required(),
      initialValue: "No BS Deo",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "hero",
      initialValue:
        "Eindelijk een natuurlijke deodorant waar je op kunt rekenen 🌿",
    }),
    defineField({
      name: "bullets",
      title: "Key benefit bullets",
      type: "array",
      group: "hero",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "reviews",
      title: "Reviews summary",
      type: "object",
      group: "hero",
      fields: [
        { name: "count", title: "Review count", type: "number" },
        { name: "rating", title: "Average rating", type: "number" },
        { name: "questions", title: "Question count", type: "number" },
        { name: "users", title: "Users badge (e.g. '20m+ users')", type: "string" },
      ],
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery images",
      type: "array",
      group: "hero",
      of: [{ type: "image", options: { hotspot: true } }],
    }),

    /* ---------------- Inhoud (Step 1 dropdown) ---------------- */
    defineField({
      name: "inhoudLabel",
      title: "Step 1 heading",
      type: "string",
      group: "inhoud",
      initialValue: "1. Kies je inhoud",
    }),
    defineField({
      name: "inhoudOption",
      title: "Inhoud option (currently selected)",
      type: "object",
      group: "inhoud",
      fields: [
        { name: "label", title: "Label (e.g. '30 ml / Fresh Balance')", type: "string" },
        { name: "price", title: "Display price (e.g. '€ 12.99')", type: "string" },
        { name: "image", title: "Thumbnail image", type: "image" },
      ],
    }),

    /* ---------------- Type (Step 2 cards) ---------------- */
    defineField({
      name: "typeLabel",
      title: "Step 2 heading",
      type: "string",
      group: "type",
      initialValue: "2. Kies je type",
    }),
    defineField({
      name: "typeOptions",
      title: "Purchase type options",
      type: "array",
      group: "type",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", title: "ID (e.g. '90day')", type: "string" },
            { name: "label", title: "Label (e.g. '90-Dag Abonnement')", type: "string" },
            { name: "savings", title: "Savings chip (e.g. 'BESPAAR 30%')", type: "string" },
            { name: "bestValue", title: "Show BEST VALUE flag?", type: "boolean" },
            { name: "displayPrice", title: "Display price (e.g. '€ 4.55')", type: "string" },
            { name: "originalPrice", title: "Strikethrough price", type: "string" },
            { name: "priceUnit", title: "Price unit (e.g. '/maand')", type: "string" },
            { name: "billingNote", title: "Billing note (e.g. 'Billed €235 every 12 weeks')", type: "string" },
            { name: "servingNote", title: "Serving note (e.g. '€40.00/serving')", type: "string" },
            {
              name: "inclusief",
              title: "Inclusief list",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "welcomeKitHeading",
      title: "Welcome kit heading",
      type: "string",
      group: "type",
      initialValue: "Gratis Welcome Kit (Eerste order)",
    }),
    defineField({
      name: "welcomeKitItems",
      title: "Welcome kit items",
      type: "array",
      group: "type",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "oldPrice", title: "Original price (struck through)", type: "string" },
            { name: "image", title: "Product image", type: "image" },
          ],
        },
      ],
    }),

    /* ---------------- Purchase & Trust ---------------- */
    defineField({
      name: "priceLabel",
      title: "Price label (e.g. 'Prijs')",
      type: "string",
      group: "purchase",
      initialValue: "Prijs",
    }),
    defineField({
      name: "priceInclBtw",
      title: "Price incl. BTW",
      type: "string",
      group: "purchase",
      initialValue: "€7.72 vanaf incl. btw",
    }),
    defineField({
      name: "priceExclBtw",
      title: "Price excl. BTW",
      type: "string",
      group: "purchase",
      initialValue: "€6.72 excl. btw",
    }),
    defineField({
      name: "wholesaleStatus",
      title: "Wholesale status text",
      type: "string",
      group: "purchase",
      initialValue: "Logged in as a wholesale customer",
    }),
    defineField({
      name: "wholesaleSwitchText",
      title: "Wholesale switch link text",
      type: "string",
      group: "purchase",
      initialValue: "Switch to a consumer account",
    }),
    defineField({
      name: "ctaLabel",
      title: "Main CTA label",
      type: "string",
      group: "purchase",
      initialValue: "Bestel nu! — €7.72",
    }),
    defineField({
      name: "trustBadges",
      title: "Trust badges (icon + label)",
      type: "array",
      group: "purchase",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label (e.g. 'Natuurlijk')", type: "string" },
            { name: "icon", title: "Icon SVG/image", type: "image" },
          ],
        },
      ],
    }),
    defineField({
      name: "trustList",
      title: "Trust list items (sage check rows)",
      type: "array",
      group: "purchase",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: { title: "title", media: "galleryImages.0" },
  },
});
