import type { QueryParams } from "next-sanity";

import { getClient } from "./client";

/**
 * Server-side fetch helper with Next.js cache tags.
 *
 * `tags` map to revalidateTag() calls in /api/revalidate, so a
 * Sanity publish triggers an instant cache bust without a redeploy.
 * Returns null if Sanity isn't configured yet.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags: string[];
}): Promise<T | null> {
  const client = getClient();
  if (!client) return null;
  return client.fetch<T>(query, params, {
    next: { tags, revalidate: 3600 },
  });
}
