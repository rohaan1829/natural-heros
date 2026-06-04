/**
 * Environment configuration for Sanity.
 *
 * Reads from .env.local in development and Vercel project env vars
 * in production. We intentionally do NOT throw on missing values:
 * the home page renders an "Almost ready" placeholder so the scaffold
 * boots before the Sanity project exists.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET;
