import { sanityFetch } from "@/sanity/lib/fetch";
import {
  SUBSCRIPTION_TAG,
  subscriptionProductQuery,
} from "@/sanity/lib/queries";
import { previewSubscriptionProduct } from "@/lib/preview-data";
import type { SubscriptionProduct } from "@/lib/types";

import SubscribeClient from "./SubscribeClient";

/**
 * Render at request time so published Sanity content shows up
 * immediately after the /api/revalidate webhook fires.
 */
export const dynamic = "force-dynamic";

async function getData(): Promise<SubscriptionProduct> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return previewSubscriptionProduct;
  }
  const data = await sanityFetch<SubscriptionProduct | null>({
    query: subscriptionProductQuery,
    tags: [SUBSCRIPTION_TAG],
  });
  return data ?? previewSubscriptionProduct;
}

export default async function SubscribePage() {
  const data = await getData();
  return <SubscribeClient data={data} />;
}
