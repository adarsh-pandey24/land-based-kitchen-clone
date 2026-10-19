import type { ServicePage } from "@/content/services";
import { getGallery } from "@/lib/content";
import {
  Benefits,
  ContactCta,
  Faqs,
  Features,
  GalleryGrid,
  MenuDownloads,
  PageHero,
  Process,
  ServiceCards,
  Split,
  Testimonials,
} from "./Sections";

export default async function ServiceTemplate({ page }: { page: ServicePage }) {
  const galleryItems = await getGallery(page.slug, page.slug, 8);
  return (
    <>
      <PageHero
        title={page.hero.title}
        subtitle={page.hero.subtitle}
        image={page.hero.image}
        cta={{ label: "Enquire Now", href: "#enquire" }}
      />
      <Split
        title={page.intro.title}
        image={page.intro.image}
        framed
        cta={{ label: "Book a Service", href: "#enquire" }}
      >
        {page.intro.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </Split>
      <Process title={`Our ${page.name} Process`} steps={page.process} />
      {page.showMenus ? (
        <MenuDownloads title={`Sample ${page.name} Menus`} />
      ) : (
        <ServiceCards title="Our Other Services" exclude={page.name} />
      )}
      <GalleryGrid
        title={page.galleryTitle}
        items={galleryItems}
        cta={{ label: "Enquire Now", href: "#enquire" }}
      />
      <Benefits {...page.benefits} />
      <Features {...page.features} />
      <Testimonials />
      <Faqs title={`${page.name} FAQs`} items={page.faqs} />
      <ContactCta />
    </>
  );
}
