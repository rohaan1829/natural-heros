/**
 * Embedded Sanity Studio config.
 *
 * Mounted in the Next.js app at /studio via the catch-all route
 * src/app/studio/[[...tool]]/page.tsx. One deploy = one URL for
 * site + CMS. Editors visit /studio, publish content, and the
 * /api/revalidate webhook pushes changes live without a redeploy.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  name: "natural-heroes",
  title: "Natural Heroes — Content Studio",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
