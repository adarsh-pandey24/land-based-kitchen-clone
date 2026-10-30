/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { CSSProperties } from "react";
import { Playfair_Display, Poppins } from "next/font/google";
import { images, site } from "@/lib/site";
import { getChefs, getGallery } from "@/lib/content";
import {
  ChaknaBand,
  CoreValues,
  EnquirySection,
  GalleryStrip,
  GroupTiles,
  PageHero,
  SectionIntro,
  Split,
} from "@/components/Sections";

// Home page only: Playfair Display for headings, Poppins for body text.
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });
const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["300", "400", "500", "600"] });
// The site styles read these variables, so remapping them here swaps the fonts
// for everything inside the home page without touching other pages.
const homeFonts = {
  "--font-dm-serif": "var(--font-playfair)",
  "--font-dm-sans": "var(--font-poppins)",
  fontFamily: "var(--font-poppins), sans-serif",
} as CSSProperties;

export default async function Home() {
  const [galleryItems, chefs] = await Promise.all([getGallery(null, 12), getChefs()]);
  const chef = chefs[0];
  return (
    <div className={`${playfair.variable} ${poppins.variable}`} style={homeFonts}>
      <PageHero
        full
        badge
        align="left"
        eyebrow={site.tagline}
        title="Private chef & catering on the Gold Coast"
        line="An elevated culinary experience designed around your unique taste."
        image="/images/hero-beach.jpg"
      />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-[2fr_3fr] md:py-24">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -bottom-4 -left-4 h-2/3 w-2/3 bg-shell" aria-hidden />
          <img src={images.welcome} alt="" className="relative aspect-[4/5] w-full rounded-sm object-cover" />
        </div>
        <div>
        <SectionIntro eyebrow="Welcome to The Coast & Cardamom" title="Bespoke culinary experiences, brought to you." center>
          <p>
            Inspired by the beauty of Queensland&apos;s Gold Coast and the aromatic warmth of cardamom, The Coast &amp;
            Cardamom Catering Co. brings together modern Australian cuisine, contemporary Indian flavours and the art of
            slow cooking.
          </p>
          <p>
            Founded by Chef Joseph, with {site.yearsExperience} years of culinary experience, specialising in
            farm-to-table dining, fine dining, bespoke menu curation, barbecue and personalised catering, Chef Joseph
            crafts memorable food experiences for weddings, private celebrations, corporate events and gatherings of
            every size.
          </p>
          <p>
            Driven by quality ingredients, bold flavours, refined presentation and genuine hospitality, we believe every
            occasion deserves something extraordinary.
          </p>
          <p className="font-semibold text-navy">
            More than catering, we bring people together through food, crafted with passion, inspired by the coast and
            enriched with spice.
          </p>
        </SectionIntro>
        <div className="mt-8 text-center">
          <a href="#enquire" className="btn btn-arrow">
            Plan your event
          </a>
        </div>
        </div>
      </section>

      <GroupTiles eyebrow="What we cater" title="Four ways to feed your guests." />
      <div className="bg-shell px-5 pb-16 text-center">
        <p className="text-lg font-semibold text-navy md:text-xl">
          Drop-off or chef on-site. Every menu built around your guests&apos; dietary needs.
        </p>
        <Link href="/services" className="btn mt-6">
          See all 12 services
        </Link>
      </div>

      <ChaknaBand />

      <Split
        eyebrow="Meet the chef"
        title="World-class hospitality, right at your dining table."
        image={chef?.image ?? images.chef}
        reverse
      >
        <p>
          Chef Joseph is a trained Executive Chef and the founder of The Coast &amp; Cardamom, bringing over{" "}
          {site.yearsExperience} years of extensive culinary experience across multiple luxury hotel brands. Having
          worked closely alongside Michelin-starred chefs, his culinary repertoire is built on precision, creativity,
          and a deep respect for diverse flavours.
        </p>
        <p>
          His expertise spans fine dining, large-scale bulk catering, and the delicate art of slow-cooking meats to
          perfection. Most recently, he served as the Restaurant Chef at a prestigious 2-hatted restaurant specialising
          in modern Australian cuisine.
        </p>
      </Split>

      <div className="bg-shell">
        <GalleryStrip
          eyebrow="From our recent events"
          title="Locally grown, custom curated and catered for your perfect event."
          items={galleryItems}
        />
      </div>

      <CoreValues />

      <EnquirySection />
    </div>
  );
}
