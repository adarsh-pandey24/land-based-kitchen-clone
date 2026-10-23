import type { Metadata } from "next";
import { img } from "@/lib/site";
import { faqGroups } from "@/content/services";
import { EnquirySection, FaqList, PageHero, SectionIntro } from "@/components/Sections";
import { getTestimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Reviews & FAQs · The Coast & Cardamom Gold Coast" },
  description:
    "What hosts say after the party, plus answers on booking times, service areas, dietary needs, pricing and what's included.",
};

export default async function ReviewsFaqsPage() {
  const hasReviews = (await getTestimonials()).length > 0;
  return (
    <>
      <PageHero
        eyebrow="Reviews & FAQs"
        title="What hosts say, and what they ask."
        image={img("cc-faq-hero", 2400)}
      />

      <nav aria-label="On this page" className="border-b border-line">
        <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2 px-5 py-4">
          {[...faqGroups.map((g) => ({ id: g.heading.toLowerCase().replace(/\s+/g, "-"), label: g.heading })), ...(hasReviews ? [{ id: "reviews", label: "Reviews" }] : [])].map(
            (l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="block rounded-full border border-line px-4 py-1.5 text-sm font-medium hover:border-navy">
                  {l.label}
                </a>
              </li>
            ),
          )}
        </ul>
      </nav>

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <SectionIntro eyebrow="FAQs" title="Questions hosts ask before they book." center />
          <div className="mt-6 space-y-14">
            {faqGroups.map((g) => (
              <div key={g.heading} id={g.heading.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-24">
                <h2 className="mt-8 text-[26px] leading-[34px]">{g.heading}</h2>
                <FaqList items={g.items} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnquirySection />
    </>
  );
}
