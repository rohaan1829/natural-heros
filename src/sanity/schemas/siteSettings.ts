import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site title",
      type: "string",
      initialValue: "Natural Heroes",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { accept: "image/svg+xml,image/png" },
    }),
    defineField({
      name: "nav",
      title: "Navigation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Href", type: "string" },
          ],
        },
      ],
      initialValue: [
        { label: "SHOP", href: "/shop" },
        { label: "JOURNAL", href: "/journal" },
        { label: "OVER ONS", href: "/over-ons" },
      ],
    }),
    defineField({
      name: "cta",
      title: "Header CTA labels",
      type: "object",
      fields: [
        { name: "loginLabel", title: "Login label", type: "string", initialValue: "Login" },
        { name: "cartLabel", title: "Cart label", type: "string", initialValue: "Cart" },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
