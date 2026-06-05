import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProductHero } from "@/components/sections/ProductHero";
import { WhySection } from "@/components/sections/WhySection";
import { CompositionSection } from "@/components/sections/CompositionSection";
import { UsageSection } from "@/components/sections/UsageSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { BotanicalSection } from "@/components/sections/BotanicalSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  PRODUCT_TAG,
  SETTINGS_TAG,
  productBySlugQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";
import { previewProduct, previewSettings } from "@/lib/preview-data";
import type { Product, SiteSettings } from "@/lib/types";

const DEFAULT_SLUG = "eucalyptus-globulus";

/**
 * Render at request time, not build time. The page reads content from
 * Sanity, which means the build environment doesn't need to reach the
 * CMS — and the rendered HTML always reflects the latest published
 * data (cache-busted by the /api/revalidate webhook).
 */
export const dynamic = "force-dynamic";

async function getData(): Promise<{
  product: Product;
  settings: SiteSettings;
}> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return { product: previewProduct, settings: previewSettings };
  }
  const [product, settings] = await Promise.all([
    sanityFetch<Product | null>({
      query: productBySlugQuery,
      params: { slug: DEFAULT_SLUG },
      tags: [PRODUCT_TAG],
    }),
    sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: [SETTINGS_TAG],
    }),
  ]);
  return {
    product: product ?? previewProduct,
    settings: settings ?? previewSettings,
  };
}

export default async function Home() {
  const { product, settings } = await getData();

  return (
    <>
      <SiteHeader settings={settings} />
      <main className="flex flex-col">
        <ProductHero product={product} />
        {product.section01 && <WhySection data={product.section01} />}
        {product.section02 && <CompositionSection data={product.section02} />}
        {product.section03 && <UsageSection data={product.section03} />}
        {product.section04 && <ProcessSection data={product.section04} />}
        {product.section05 && <BotanicalSection data={product.section05} />}
        {product.section06 && <FaqSection data={product.section06} />}
      </main>
      <SiteFooter settings={settings} qrSrc="/images/qr.svg" />
    </>
  );
}
