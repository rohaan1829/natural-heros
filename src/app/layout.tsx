import type { Metadata } from "next";
import { Solway, DM_Mono, DM_Sans, Barlow } from "next/font/google";
import "./globals.css";

const solway = Solway({
  variable: "--font-solway",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

/** Closest free substitute for DIN Pro used in the usage section numerals. */
const dmSans = DM_Sans({
  variable: "--font-din",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

/** Body font used on the shop/category pages (Skin Conditions, Cart, etc.). */
const barlow = Barlow({
  variable: "--font-barlow",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Natural Heroes",
  description:
    "Wild-harvested essential oils from the hills of Mértola. Farm to bottle, transparent and pure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${solway.variable} ${dmMono.variable} ${dmSans.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}
