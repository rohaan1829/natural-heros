/**
 * Sanity → Next.js revalidation webhook.
 *
 * Wired in Sanity Manage → API → Webhooks. On publish/unpublish,
 * Sanity POSTs a signed payload here; we verify the signature and
 * call revalidateTag() to bust the Next.js cache for the matching
 * content tag. Result: published content is live within ~1 second
 * with no rebuild and no redeploy.
 */
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { revalidateSecret } from "@/sanity/env";
import {
  PRODUCT_TAG,
  SETTINGS_TAG,
  SUBSCRIPTION_TAG,
} from "@/sanity/lib/queries";

type WebhookPayload = {
  _type?: string;
};

export async function POST(req: NextRequest) {
  try {
    if (!revalidateSecret) {
      return NextResponse.json(
        { message: "SANITY_REVALIDATE_SECRET not set" },
        { status: 500 },
      );
    }

    const { body, isValidSignature } = await parseBody<WebhookPayload>(
      req,
      revalidateSecret,
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Missing _type in body" }, { status: 400 });
    }

    const tag =
      body._type === "siteSettings"
        ? SETTINGS_TAG
        : body._type === "subscriptionProduct"
          ? SUBSCRIPTION_TAG
          : PRODUCT_TAG;
    // Next 16 requires a cache profile alongside the tag.
    revalidateTag(tag, "default");

    return NextResponse.json({ revalidated: true, tag, now: Date.now() });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
