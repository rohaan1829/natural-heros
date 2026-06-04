export { metadata, viewport } from "next-sanity/studio";

/**
 * Studio renders its own shell; this layout simply forwards children
 * so the root layout's <body> is the only one in the tree.
 */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
