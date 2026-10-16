import type { Metadata } from "next";
import { ContactCta, PageHero, ServiceCards, Split, Testimonials } from "@/components/Sections";
import { img, site } from "@/lib/site";

export const metadata: Metadata = { title: "Find Out More" };

export default function FindOutMorePage() {
  return (
    <>
      <PageHero
        title="Find Out More"
        subtitle={`Everything ${site.name} can do for you`}
        image={img("more-hero", 2000, 1300)}
      />
      <Split
        title="How we work"
        image={img("more-intro", 900, 1100)}
        framed
        cta={{ label: "Start Planning", href: "/contact-us" }}
      >
        <p>
          Every booking starts with a conversation. We learn what you are celebrating, who is
          coming and what you love to eat.
        </p>
        <p>
          From there we design a menu, handle the shopping and logistics, and arrive on the day
          ready to cook and serve.
        </p>
      </Split>
      <ServiceCards title="Choose Your Experience" />
      <Testimonials />
      <ContactCta />
    </>
  );
}
