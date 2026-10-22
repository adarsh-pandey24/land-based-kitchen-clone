/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { images, site, values } from "@/lib/site";
import { getChefs, getGallery } from "@/lib/content";
import { groups } from "@/content/services";
import { EnquirySection, GalleryStrip, PageHero, Rule, SectionIntro, Split } from "@/components/Sections";
import Icon, { type IconName } from "@/components/Icon";

export const metadata: Metadata = {
  title: { absolute: "Chef Joseph Raj · Private Chef Gold Coast" },
  description:
    "Meet Joseph Raj: 16 years in luxury hotel kitchens across Australia and Asia, now cooking for Gold Coast homes, offices and boats.",
};

const principles = [
  {
    title: "Fresh, then spiced.",
    text: "I buy for the menu, not the other way round. Spices are toasted and ground in my kitchen.",
  },
  {
    title: "Your guest list writes the menu.",
    text: "Allergies and preferences come first, and every dish gets a label.",
  },
  {
    title: "Hotel standards, home warmth.",
    text: "Timing, hygiene and presentation from banquet kitchens. The conversation and the second helpings from my family's table.",
  },
];

// From Joseph's bio.
const specialities = [
  "Farm-to-table cooking",
  "Fine dining",
  "Modern Australian",
  "Contemporary Indian",
  "Slow-cooked meats",
  "Barbecue catering",
];

const stats = [
  { value: String(site.yearsExperience), label: "Years cooking professionally" },
  { value: "AU & Asia", label: "Luxury hotels and restaurants" },
  ...(site.countriesWorked ? [{ value: String(site.countriesWorked), label: "Countries" }] : []),
  { value: "100", label: "Guests at the largest buffet format" },
];

const groupIcons: Record<string, IconName> = {
  "chakna-and-tonic": "glass",
  "grazing-tables-boards": "board",
  "party-catering": "cake",
  "private-dining-events": "chef",
};

export default async function AboutPage() {
  const [chefs, workPhotos] = await Promise.all([getChefs(), getGallery("behind-the-scenes", 6)]);
  const [joseph, ...team] = chefs;
  return (
    <>
      <PageHero
        eyebrow="Meet the chef"
        title="I'm Joseph. I'll be cooking for your guests."
        line={`${site.yearsExperience} years in hotel kitchens across Australia and Asia. Now cooking for Gold Coast homes, offices and boats.`}
        image={images.chef}
      />

      {joseph && (
        <Split eyebrow="My story" title={joseph.name} image={joseph.image}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-curry">{joseph.role}</p>
          {joseph.biography.split(/\n\s*\n/).map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
          {joseph.experience && <p className="whitespace-pre-line">{joseph.experience}</p>}
        </Split>
      )}

      <section className="bg-navy py-12 text-sea">
        <dl
          className={`mx-auto grid max-w-6xl gap-8 px-5 text-center sm:grid-cols-2 ${stats.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-serif text-4xl text-gold md:text-5xl">{s.value}</span>
                <span className="mt-2 block text-sm text-sea/80">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-shell py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionIntro eyebrow="How I cook" title="Three rules in my kitchen." center />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="rounded-sm bg-sea p-7">
                <h3 className="text-2xl">{p.title}</h3>
                <p className="mt-3 text-muted">{p.text}</p>
              </div>
            ))}
          </div>
          <ul className="mt-12 flex flex-wrap justify-center gap-3">
            {specialities.map((s) => (
              <li key={s} className="rounded-full border border-curry/40 bg-sea px-4 py-1.5 text-sm text-curry">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {team.length > 0 && (
        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-5">
            <SectionIntro eyebrow="The team" title="Who you'll meet on the day." center />
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m, i) => (
                <div key={`${m.name}-${i}`}>
                  <img src={m.image} alt={m.name} className="aspect-[4/5] w-full rounded-sm object-cover" />
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-curry">{m.role}</p>
                  <h3 className="mt-1 text-2xl">{m.name}</h3>
                  <p className="mt-2 whitespace-pre-line text-muted">{m.biography}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <GalleryStrip eyebrow="In the kitchen" title="Joseph at work." items={workPhotos} />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5">
          <SectionIntro eyebrow={site.tagline} title="What we stand for." center />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v) => (
              <li key={v.title} className="rounded-sm border border-line p-5">
                <p className="font-semibold">{v.title}</p>
                <p className="mt-1 text-[15px] text-muted">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-shell py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionIntro eyebrow="What I cater" title="Four ways I can feed your guests." center />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((g) => (
              <Link key={g.key} href={g.href} className="group rounded-sm bg-sea p-7 transition-shadow hover:shadow-md">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-gold">
                  <Icon name={groupIcons[g.key]} />
                </span>
                <h3 className="mt-5 text-xl">{g.name}</h3>
                <p className="mt-2 text-[15px] text-muted">{g.tileLine}</p>
                <span className="mt-4 inline-block text-sm font-medium text-surf group-hover:underline">See {g.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Split
        eyebrow="Why choose Coast & Cardamom"
        title="One chef, from first enquiry to clean-up."
        image={[images.why1, images.why2]}
        reverse
        cta={{ label: "Plan your event", href: "#enquire" }}
      >
        <p>
          You get a chef trained in hotel kitchens, cooking at your place, with your guests&apos; dietary needs planned
          in from the first draft of the menu.
        </p>
        <p>
          I handle every booking myself, from the first enquiry to the clean-up. You deal with one person who knows
          your event.
        </p>
      </Split>

      <section className="bg-navy px-5 py-16 text-center text-sea">
        <h2 className="heading">Want me to cook for your next event?</h2>
        <Rule center />
        <a href="#enquire" className="btn-gold mt-8">
          Plan your event
        </a>
      </section>

      <EnquirySection />
    </>
  );
}
