import type { Metadata } from "next";
import { ContactCta, Faqs, PageHero } from "@/components/Sections";
import { servicePages } from "@/content/services";
import { img } from "@/lib/site";

export const metadata: Metadata = { title: "FAQs – Dining, Chef & Catering" };

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Private chef, dining & catering"
        image={img("faq-hero", 2000, 1300)}
        cta={{ label: "Ask Us Anything", href: "/contact-us" }}
      />
      {Object.values(servicePages).map((p, i) => (
        <div key={p.slug} className={i % 2 ? "bg-mist" : ""}>
          <Faqs title={`${p.name} FAQs`} items={p.faqs} />
        </div>
      ))}
      <ContactCta />
    </>
  );
}
