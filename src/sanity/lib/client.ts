import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/**
 * Lazy-initialized Sanity client.
 *
 * createClient() throws if projectId is empty. We defer instantiation
 * until first use so the app boots (and the home page can render its
 * "Almost ready" placeholder) before env vars are configured.
 */
let _client: SanityClient | null = null;

export function getClient(): SanityClient | null {
  if (!projectId) return null;
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
      perspective: "published",
    });
  }
  return _client;
}
