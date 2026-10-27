import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, Permanent_Marker } from "next/font/google";
import "./globals.css";
import { site, siteUrl } from "@/lib/site";

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

// Brush-marker face close to the logo lettering, used for the tagline.
const marker = Permanent_Marker({
  variable: "--font-marker",
  subsets: ["latin"],
  weight: "400",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Private Chef & Catering Gold Coast · The Coast & Cardamom", template: `%s · ${site.name}` },
  description:
    "Hotel-trained chef Joseph Raj caters Gold Coast birthdays, boat days and corporate events. Grazing boards to Indian buffets for 100.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${dmSerif.variable} ${dmSans.variable} ${marker.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
