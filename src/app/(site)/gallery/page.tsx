import type { Metadata } from "next";
import { img } from "@/lib/site";
import { getGallery } from "@/lib/content";
import { ContactCta, GalleryGrid, PageHero } from "@/components/Sections";

export const metadata: Metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const items = await getGallery(null, "full-gallery");
  return (
    <>
      <PageHero
        title="Feast your eyes on our food gallery"
        image={img("gallery-hero", 2000, 1300)}
        cta={{ label: "Get a Quote", href: "/contact-us" }}
      />
      <GalleryGrid items={items} dark={false} />
      <ContactCta />
    </>
  );
}
