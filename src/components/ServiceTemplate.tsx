import type { Metadata } from "next";
import { groupByKey, serviceFaqs, type GroupKey } from "@/content/services";
import { getGallery, getServices } from "@/lib/content";
import {
  Benefits,
  EnquirySection,
  Faqs,
  GalleryStrip,
  GroupTiles,
  HowItWorks,
  MenuSection,
  PageHero,
  Reasons,
  ServiceBlocks,
  Split,
} from "./Sections";

export function serviceMetadata(key: GroupKey): Metadata {
  const group = groupByKey(key)!;
  return { title: { absolute: group.seo.title }, description: group.seo.description };
}

// One template for the four service pages, in the copy document's order.
export default async function ServiceTemplate({ groupKey }: { groupKey: GroupKey }) {
  const group = groupByKey(groupKey)!;
  const [galleryItems, services] = await Promise.all([getGallery(group.key, 6), getServices(group.key)]);
  // Pages with one service (e.g. Chakna & Tonic) pre-select it in the form.
  const single = services.length === 1 ? services[0].title : undefined;
  return (
    <>
      <PageHero title={group.hero.title} line={group.hero.line} image={group.hero.image} />
      <Split eyebrow={group.name} title={group.intro.title} image={group.intro.images}>
        <p>{group.intro.body}</p>
      </Split>
      <ServiceBlocks group={group.key} />
      <HowItWorks />
      <MenuSection group={group.key} />
      <GalleryStrip eyebrow="From our recent events" title={`${group.name}, from real events.`} items={galleryItems} />
      <Benefits images={group.intro.images} />
      <Reasons />
      <GroupTiles eyebrow="Other ways we cater" title="More from the kitchen." exclude={group.key} />
      <Faqs title={`${group.name} FAQs`} items={[...serviceFaqs, ...(group.extraFaqs ?? [])]} />
      <EnquirySection service={single} />
    </>
  );
}
