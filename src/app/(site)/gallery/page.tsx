import type { Metadata } from "next";
import { img, site } from "@/lib/site";
import { getGallery } from "@/lib/content";
import { groups } from "@/content/services";
import { EnquirySection, PageHero } from "@/components/Sections";
import GalleryFilter from "@/components/GalleryFilter";

export const metadata: Metadata = {
  title: { absolute: "Catering Gallery · The Coast & Cardamom Gold Coast" },
  description:
    "Real events cooked by Chef Joseph Raj: plated dinners, buffets, grazing tables and private dining on the Gold Coast.",
};

const tabs = [...groups.map((g) => ({ key: g.key, label: g.name })), { key: "behind-the-scenes", label: "Behind the scenes" }];

export default async function GalleryPage() {
  const items = await getGallery(null);
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Real events. Real food. No stock photos."
        line="Everything here was cooked by Joseph for a Gold Coast client."
        image={img("cc-gallery-hero", 2400)}
      />
      <section className="mx-auto max-w-7xl px-5 py-20">
        <GalleryFilter items={items} tabs={tabs} instagram={site.socials.instagram} />
      </section>
      <EnquirySection />
    </>
  );
}
