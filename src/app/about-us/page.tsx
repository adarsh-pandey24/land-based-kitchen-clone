/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { img, images, site } from "@/lib/site";
import { ContactCta, PageHero, Rule, ServiceCards, Split, Testimonials } from "@/components/Sections";

export const metadata: Metadata = { title: "About Us" };

// Placeholder team. Replace names, roles, photos and bios with your own.
const team = [
  {
    name: "Head Chef",
    role: "Co-director",
    image: img("team-chef", 800, 1000),
    points: [
      { title: "Experience", text: "Summarise your chef's background, training and kitchens they have worked in." },
      { title: "Cooking Style", text: "Describe the food: the flavours, techniques and produce they love." },
      { title: "Philosophy", text: "Explain what drives them and how they approach each menu." },
    ],
  },
  {
    name: "Service Lead",
    role: "Co-director",
    image: img("team-service", 800, 1000),
    points: [
      { title: "Background", text: "Describe their hospitality experience and where it began." },
      { title: "Service Standards", text: "Explain the level of care guests can expect at every event." },
      { title: "Discretion", text: "Note how privacy and confidentiality are respected for every client." },
      { title: "Styling", text: "Describe how they set the scene: tables, flowers and atmosphere." },
      { title: "Presentation", text: "Explain the attention to detail that goes into every space." },
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        image={img("about-hero", 2000, 1300)}
        cta={{ label: "Get in Touch", href: "/contact-us" }}
      />

      <Split
        title={`Who is ${site.name}?`}
        image={images.about}
        framed
        cta={{ label: "Reach Out to Us", href: "/contact-us" }}
      >
        <p>
          We create private dining and catering experiences for people who love good food and want
          to share it without the stress of hosting.
        </p>
        <p>
          Our small team of chefs and hospitality staff bring restaurant standards into homes,
          villas and venues across the region.
        </p>
        <p>
          Every booking, large or small, gets the same care: thoughtful menus, quality ingredients
          and calm, professional service.
        </p>
      </Split>

      <Split
        title="Our Journey"
        image={img("about-journey", 900, 1100)}
        reverse
        cta={{ label: "Get in Touch", href: "/contact-us" }}
      >
        <p>
          Tell the story of how your business began: the people, the moment you decided to start,
          and how it has grown since.
        </p>
        <p>Share a milestone or two, and what you are most proud of today.</p>
      </Split>

      <section className="bg-mist py-24">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="heading text-center">Meet Our Team</h2>
          <Rule center />
          <div className="mt-14 space-y-20">
            {team.map((m, i) => (
              <div key={m.name} className="grid items-start gap-12 md:grid-cols-[2fr_3fr]">
                <img
                  src={m.image}
                  alt={m.name}
                  className={`aspect-[4/5] w-full object-cover ${i % 2 ? "md:order-2" : ""}`}
                />
                <div>
                  <p className="eyebrow">{m.role}</p>
                  <h3 className="mt-3 font-serif text-3xl">{m.name}</h3>
                  <div className="mt-8 space-y-6">
                    {m.points.map((p) => (
                      <div key={p.title}>
                        <h4 className="font-serif text-xl text-gold">{p.title}</h4>
                        <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link href="/contact-us" className="btn">Get in Touch</Link>
          </div>
        </div>
      </section>

      <ServiceCards title="Our Luxury Services" />

      <Split
        title={`Why Choose ${site.name}`}
        image={images.why}
        cta={{ label: "Get a Quote", href: "/contact-us" }}
      >
        <p>
          Personal menus, local produce and a team that treats your home and guests with care. We
          handle every detail so you can enjoy the occasion.
        </p>
      </Split>

      <Testimonials />
      <ContactCta />
    </>
  );
}
