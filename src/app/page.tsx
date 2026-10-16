import Link from "next/link";
import { gallery, images, site } from "@/lib/site";
import { ContactCta, GalleryGrid, PageHero, ServiceCards, Split, Testimonials } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <PageHero
        full
        title="Private chef, dining & catering services"
        subtitle={site.regions}
        image={images.hero}
        cta={{ label: "Get a Quote", href: "/contact-us" }}
      />

      <Split
        eyebrow={`Welcome to ${site.name}`}
        title="Thoughtful food, effortless hosting."
        image={images.welcome}
        framed
        cta={{ label: "Enquire Now", href: "/contact-us" }}
      >
        <p>
          Turn your home or venue into a restaurant for the night. Our chefs plan the menu, shop
          for the best local produce, cook on site and leave your kitchen spotless.
        </p>
        <p>
          Every event is planned around you: your guests, your dietary needs and the mood you want
          to create. You relax and enjoy the evening while we look after the details.
        </p>
      </Split>

      <ServiceCards>
        <p className="mx-auto mt-14 max-w-3xl text-center leading-relaxed text-muted">
          Whether it is a quiet anniversary dinner or a party for a hundred, we design a menu that
          fits the occasion and serve it with care.
        </p>
        <div className="mt-8 text-center">
          <Link href="/contact-us" className="btn">Enquire Now</Link>
        </div>
      </ServiceCards>

      <Split
        eyebrow="Our Story"
        title={`About ${site.name}`}
        image={images.about}
        reverse
        cta={{ label: "Learn More", href: "/about-us" }}
      >
        <p>
          We are a small team of chefs and hospitality professionals with a shared love of seasonal
          cooking and warm, attentive service. Add your own story here.
        </p>
      </Split>

      <GalleryGrid
        title="Gallery"
        items={gallery("home", 8)}
        cta={{ label: "View Full Gallery", href: "/gallery" }}
      />

      <Split
        title={`Why Choose ${site.name}`}
        image={images.why}
        cta={{ label: "Get a Quote", href: "/contact-us" }}
      >
        <p>
          Fresh produce from trusted local growers, menus written for each client and a team that
          treats your home with respect.
        </p>
        <p>
          From a single dinner to a full weekend of meals, we handle the planning, cooking, service
          and clean-up so you can focus on your guests.
        </p>
        <p>Introduce your head chef and front-of-house lead here.</p>
      </Split>

      <Testimonials />
      <ContactCta />
    </>
  );
}
