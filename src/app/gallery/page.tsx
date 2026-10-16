import type { Metadata } from "next";
import { gallery, img } from "@/lib/site";
import { ContactCta, GalleryGrid, PageHero } from "@/components/Sections";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Feast your eyes on our food gallery"
        image={img("gallery-hero", 2000, 1300)}
        cta={{ label: "Get a Quote", href: "/contact-us" }}
      />
      <GalleryGrid items={gallery("full-gallery", 40)} dark={false} />
      <ContactCta />
    </>
  );
}
