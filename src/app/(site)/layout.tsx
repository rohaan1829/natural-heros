/**
 * Site-wide route group.
 *
 * Just a pass-through wrapper. Each page renders its own header and
 * footer so the home page can use Sanity-fetched settings while the
 * other marketing pages use the local preview settings.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
