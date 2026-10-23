/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { dietary, images, site } from "@/lib/site";
import { getChefs, getGallery } from "@/lib/content";
import {
  ChaknaBand,
  EnquirySection,
  GalleryStrip,
  GroupTiles,
  PageHero,
  SectionIntro,
  Split,
} from "@/components/Sections";

const whyPoints = [
  { title: "The chef is the caterer.", text: "Joseph plans, cooks and serves. No faceless kitchen." },
  {
    title: "Built around your guests.",
    text: `${dietary.join(", ").replace(/, ([^,]*)$/, " and $1")}, every dish labelled.`,
  },
  {
    title: "Any size, any venue.",
    text: "A board on the coffee table, a barbecue in the backyard, a buffet for 100, or lunch on a boat.",
  },
  {
    title: "Three steps, no stress.",
    text: "Tell us the plan, get a tailored menu and quote, then enjoy your party. We clean up.",
  },
];

export default async function Home() {
  const [galleryItems, chefs] = await Promise.all([getGallery(null, 12), getChefs()]);
  const chef = chefs[0];
  return (
    <>
      <PageHero full badge align="left" title="Private chef & catering on the Gold Coast" line={site.line} image={images.hero} />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-[2fr_3fr] md:py-24">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -bottom-4 -left-4 h-2/3 w-2/3 bg-shell" aria-hidden />
          <img src={images.welcome} alt="" className="relative aspect-[4/5] w-full rounded-sm object-cover" />
        </div>
        <div>
        <SectionIntro eyebrow="Welcome to The Coast & Cardamom" title="Hotel-trained cooking, served at your place." center>
          <p>
            Chef Joseph Raj spent {site.yearsExperience} years in hotel kitchens in {site.countries}, including
            JW Marriott, Six Senses, Taj and Oberoi. Now he cooks for Gold Coast birthdays, boat days, office lunches and dinner parties,
            with Indian spice and the best of local produce.
          </p>
          <p>
            Every menu starts with your guest list: who&apos;s coming, what they love, and what they can&apos;t eat.
            Grazing boards for 10, buffets for 100, and everything in between.
          </p>
        </SectionIntro>
        <div className="mt-8 text-center">
          <a href="#enquire" className="btn btn-arrow">
            Plan your event
          </a>
        </div>
        </div>
      </section>

      <GroupTiles eyebrow="What we cater" title="Four ways to feed your guests." />
      <div className="bg-shell px-5 pb-16 text-center">
        <p className="text-muted">Drop-off or chef on-site. Every menu built around your guests&apos; dietary needs.</p>
        <Link href="/services" className="btn mt-6">
          See all 12 services
        </Link>
      </div>

      <ChaknaBand />

      <Split
        eyebrow="Meet the chef"
        title="A hotel chef, cooking in your kitchen."
        image={chef?.image ?? images.chef}
        reverse
        cta={{ label: "Read Joseph's story", href: "/about" }}
      >
        <p>
          Joseph cooked in hotel kitchens in {site.countries}, blending Indian spice with the cuisines he met along
          the way, before bringing it all to the Gold Coast. He plans your menu, cooks it, and is usually the one plating it. You&apos;ll have his number, not a call
          centre&apos;s.
        </p>
      </Split>

      <div className="bg-shell">
        <GalleryStrip eyebrow="From recent events" title="Real food from real Gold Coast events." items={galleryItems} />
      </div>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-24">
        <div className="grid gap-4">
          <img src={images.why1} alt="" className="aspect-[4/3] w-full rounded-sm object-cover" />
          <img src={images.why2} alt="" className="aspect-[4/3] w-full rounded-sm object-cover" />
        </div>
        <div>
          <SectionIntro eyebrow="Why us" title="Indian flavour, Australian formats, one chef who cares." />
          <ul className="mt-8 space-y-5">
            {whyPoints.map((p) => (
              <li key={p.title}>
                <p className="font-semibold">{p.title}</p>
                <p className="text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
          <a href="#enquire" className="btn mt-8">
            Plan your event
          </a>
        </div>
      </section>

      <EnquirySection />
    </>
  );
}
