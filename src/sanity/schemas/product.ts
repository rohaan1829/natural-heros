import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "section01", title: "Section 01 — Why" },
    { name: "section02", title: "Section 02 — Composition" },
    { name: "section03", title: "Section 03 — Usage" },
    { name: "section04", title: "Section 04 — Process" },
    { name: "section05", title: "Section 05 — Botanical" },
    { name: "section06", title: "Section 06 — FAQ" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Product name",
      type: "string",
      group: "hero",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle (e.g. 'Essential Oil')",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "hero",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      group: "hero",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      group: "hero",
      initialValue: "EUR",
    }),
    defineField({
      name: "sizes",
      title: "Available sizes",
      type: "array",
      group: "hero",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label (e.g. '5 ML')", type: "string" },
            { name: "ml", title: "Volume (ml)", type: "number" },
            { name: "price", title: "Price override (optional)", type: "number" },
          ],
        },
      ],
    }),
    defineField({
      name: "badges",
      title: "Badges (100% Natural, Vegan, etc.)",
      type: "array",
      group: "hero",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            {
              name: "icon",
              title: "Icon",
              type: "image",
              options: { accept: "image/svg+xml,image/png" },
            },
            { name: "alt", title: "Alt text", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "images",
      title: "Gallery images",
      type: "array",
      group: "hero",
      of: [{ type: "image", options: { hotspot: true } }],
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
        { name: "users", title: "User badge (e.g. '20m+ users')", type: "string" },
      ],
    }),

    /* Section 01 — Why this oil is special */
    defineField({
      name: "section01",
      title: "Section 01",
      type: "object",
      group: "section01",
      fields: [
        { name: "label", title: "Label (e.g. SECTIE 01)", type: "string" },
        { name: "heading", title: "Heading", type: "string" },
        { name: "subheading", title: "Subheading", type: "text", rows: 2 },
        {
          name: "bullets",
          title: "Checkmark bullets",
          type: "array",
          of: [{ type: "string" }],
        },
        {
          name: "image",
          title: "Side image",
          type: "image",
          options: { hotspot: true },
        },
        {
          name: "specs",
          title: "Spec table",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Label", type: "string" },
                { name: "value", title: "Value", type: "string" },
              ],
            },
          ],
        },
      ],
    }),

    /* Section 02 — Composition */
    defineField({
      name: "section02",
      title: "Section 02",
      type: "object",
      group: "section02",
      fields: [
        { name: "label", title: "Label (e.g. SECTIE 02)", type: "string" },
        { name: "heading", title: "Heading", type: "string" },
        { name: "subheading", title: "Subheading", type: "text", rows: 2 },
        {
          name: "components",
          title: "Composition components",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "name", title: "Name (e.g. 1,8-CINEOOL)", type: "string" },
                { name: "description", title: "Description", type: "text", rows: 3 },
                {
                  name: "percentage",
                  title: "Percentage (0-100)",
                  type: "number",
                  validation: (r) => r.min(0).max(100),
                },
              ],
            },
          ],
        },
      ],
    }),

    /* Section 06 — FAQ accordion */
    defineField({
      name: "section06",
      title: "Section 06",
      type: "object",
      group: "section06",
      fields: [
        { name: "label", title: "Label (e.g. SECTIE 06)", type: "string" },
        { name: "heading", title: "Heading", type: "string" },
        { name: "subheading", title: "Subheading", type: "text", rows: 2 },
        {
          name: "callout",
          title: "Contact callout",
          type: "object",
          fields: [
            { name: "text", title: "Text", type: "text", rows: 2 },
            { name: "buttonLabel", title: "Button label", type: "string" },
            { name: "buttonHref", title: "Button href", type: "string" },
          ],
        },
        {
          name: "items",
          title: "FAQ items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "question", title: "Question", type: "string" },
                { name: "answer", title: "Answer", type: "text", rows: 4 },
              ],
            },
          ],
        },
      ],
    }),

    /* Section 05 — Botanical card grid */
    defineField({
      name: "section05",
      title: "Section 05",
      type: "object",
      group: "section05",
      fields: [
        { name: "label", title: "Label (e.g. SECTIE 05)", type: "string" },
        { name: "heading", title: "Heading", type: "string" },
        { name: "subheading", title: "Subheading", type: "text", rows: 2 },
        {
          name: "cards",
          title: "Botanical cards",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Label (e.g. INGREDIENT)", type: "string" },
                { name: "title", title: "Title", type: "string" },
                { name: "description", title: "Description", type: "text", rows: 4 },
                {
                  name: "image",
                  title: "Card image",
                  type: "image",
                  options: { hotspot: true },
                },
              ],
            },
          ],
        },
      ],
    }),

    /* Section 04 — Process timeline */
    defineField({
      name: "section04",
      title: "Section 04",
      type: "object",
      group: "section04",
      fields: [
        { name: "label", title: "Label (e.g. SECTIE 04)", type: "string" },
        { name: "heading", title: "Heading", type: "string" },
        { name: "subheading", title: "Subheading", type: "text", rows: 2 },
        {
          name: "steps",
          title: "Process steps",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Step label (e.g. STEP 01)", type: "string" },
                { name: "title", title: "Title", type: "string" },
                { name: "description", title: "Description", type: "text", rows: 3 },
                {
                  name: "image",
                  title: "Step image",
                  type: "image",
                  options: { hotspot: true },
                },
              ],
            },
          ],
        },
      ],
    }),

    /* Section 03 — Usage cards */
    defineField({
      name: "section03",
      title: "Section 03",
      type: "object",
      group: "section03",
      fields: [
        { name: "label", title: "Label (e.g. SECTIE 03)", type: "string" },
        { name: "heading", title: "Heading", type: "string" },
        { name: "subheading", title: "Subheading", type: "text", rows: 2 },
        {
          name: "cards",
          title: "Usage cards",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "number", title: "Number (e.g. 01)", type: "string" },
                { name: "title", title: "Title", type: "string" },
                { name: "description", title: "Description", type: "text", rows: 3 },
                {
                  name: "image",
                  title: "Card image (optional)",
                  type: "image",
                  options: { hotspot: true },
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle", media: "images.0" },
  },
});
