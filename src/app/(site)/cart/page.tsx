import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { previewSettings } from "@/lib/preview-data";

export const dynamic = "force-dynamic";

export default function CartPage() {
  return (
    <>
      <SiteHeader settings={previewSettings} />
      <main className="mx-auto w-full max-w-(--container-content) flex-1 px-4 py-16 md:px-16 lg:px-24">
        <h1 className="font-serif text-4xl">Cart</h1>
        <p className="mt-4 font-mono text-muted">Coming soon.</p>
      </main>
      <SiteFooter settings={previewSettings} qrSrc="/images/qr.svg" />
    </>
  );
}
