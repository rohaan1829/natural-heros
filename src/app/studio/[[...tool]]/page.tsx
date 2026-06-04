/**
 * Embedded Sanity Studio mounted at /studio.
 *
 * The catch-all [[...tool]] segment lets Studio handle its own routing
 * (e.g. /studio/structure, /studio/vision). Marked client because
 * Studio uses React context heavily and is not server-renderable.
 */
"use client";

import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
