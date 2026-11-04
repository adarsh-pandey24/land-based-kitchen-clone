import type { CSSProperties } from "react";
import { Playfair_Display, Poppins } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Page content: Playfair Display for headings, Poppins for body text.
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });
const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["300", "400", "500", "600"] });
// The site styles read these variables, so remapping them here swaps the fonts
// for all page content without touching the header, footer or admin.
const contentFonts = {
  "--font-dm-serif": "var(--font-playfair)",
  "--font-dm-sans": "var(--font-poppins)",
  fontFamily: "var(--font-poppins), sans-serif",
} as CSSProperties;

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main className={`${playfair.variable} ${poppins.variable} pt-[76px]`} style={contentFonts}>
        {children}
      </main>
      <Footer />
    </>
  );
}
