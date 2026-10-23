/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { img } from "@/lib/site";
import { getServices } from "@/lib/content";
import { groups } from "@/content/services";
import { EnquirySection, PageHero, Rule } from "@/components/Sections";

export const metadata: Metadata = {
  title: { absolute: "Catering Services Gold Coast · The Coast & Cardamom" },
  description:
    "Every service from The Coast & Cardamom in one place: Chakna & Tonic, boards and grazing tables, parties, barbecues, boat catering, cakes, canapés, tapas, Indian buffets and breakfast.",
};

// All services, grouped by service page. Each card links to that service's
// block on its page (e.g. /party-catering#boat-catering).
export default async function ServicesPage() {
  const services = await getServices();
  const sections = groups
    .map((g) => ({ group: g, items: services.filter((s) => s.group === g.key) }))
    .filter((s) => s.items.length > 0);

  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Everything we cater, in one place."
        line="Pick what fits your event. Every menu is built around your guests."
        image={img("cc-services-hero", 2400)}
      />

      <nav aria-label="Service groups" className="sticky top-[76px] z-30 border-b border-line bg-sea/95 backdrop-blur">
        <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3">
          {sections.map(({ group }) => (
            <li key={group.key} className="shrink-0">
              <a
                href={`#${group.key}`}
                className="block rounded-full border border-line bg-sea px-4 py-1.5 text-sm font-medium hover:border-navy"
              >
                {group.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {sections.map(({ group, items }, i) => (
        <section key={group.key} id={group.key} className={`scroll-mt-32 py-16 md:py-20 ${i % 2 ? "bg-shell" : ""}`}>
          <div className="mx-auto max-w-7xl px-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">
                  {items.length} {items.length === 1 ? "service" : "services"}
                </p>
                <h2 className="heading mt-3">{group.name}</h2>
                <Rule />
                <p className="mt-5 max-w-2xl text-muted">{group.tileLine}</p>
              </div>
              <Link href={group.href} className="btn btn-arrow self-start md:self-auto">
                See {group.name}
              </Link>
            </div>

            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`${group.href}#${s.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-sea transition-shadow hover:shadow-md"
                  >
                    <img src={s.image} alt="" className="aspect-[16/10] w-full object-cover" />
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-2xl">{s.title}</h3>
                      {s.cardLine && <p className="mt-2 text-[15px] text-muted">{s.cardLine}</p>}
                      {(s.guests || s.format) && (
                        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-curry">
                          {[s.guests, s.format].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      <span className="mt-auto pt-5 text-sm font-medium text-surf group-hover:underline">
                        View details →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <EnquirySection eyebrow="Not sure which one?" title="Tell us about your event and we'll suggest a menu." />
    </>
  );
}
