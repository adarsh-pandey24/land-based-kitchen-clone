import type { Metadata } from "next";
import Link from "next/link";
import { img } from "@/lib/site";
import { getMenus } from "@/lib/content";
import { groups } from "@/content/services";
import { EnquirySection, MenuCard, PageHero, Rule } from "@/components/Sections";

export const metadata: Metadata = {
  title: { absolute: "Catering Menus Gold Coast · The Coast & Cardamom" },
  description:
    "Sample menus from Chef Joseph Raj: Chakna & Tonic, grazing tables, barbecues, Indian buffets and more. Every menu is adjusted to your guests.",
};

// Every published menu, grouped by service page. Menus set to "every service
// page" in the admin are listed under "For any occasion".
export default async function MenusPage() {
  const menus = await getMenus();
  const sections = [
    ...groups.map((g) => ({ id: g.key, name: g.name, href: g.href as string | null, items: menus.filter((m) => m.group === g.key) })),
    { id: "any-occasion", name: "For any occasion", href: null, items: menus.filter((m) => !m.group) },
  ].filter((s) => s.items.length > 0);

  return (
    <>
      <PageHero
        eyebrow="Sample menus"
        title="See what's on the table."
        line="Every menu is adjusted to your guests. These are starting points, not set packages."
        image={img("cc-menus-hero", 2400)}
      />

      {sections.length === 0 ? (
        <section className="px-5 py-20">
          <div className="mx-auto max-w-xl rounded-sm bg-shell px-6 py-14 text-center">
            <p className="font-serif text-2xl">Menus are on their way.</p>
            <p className="mt-3 text-muted">Tell us about your event and Joseph will send a menu idea with your quote.</p>
            <a href="#enquire" className="btn btn-arrow mt-6">
              Plan your event
            </a>
          </div>
        </section>
      ) : (
        <>
          {sections.length > 1 && (
            <nav aria-label="Menu groups" className="sticky top-[76px] z-30 border-b border-line bg-sea/95 backdrop-blur">
              <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3">
                {sections.map((s) => (
                  <li key={s.id} className="shrink-0">
                    <a href={`#${s.id}`} className="block rounded-full border border-line bg-sea px-4 py-1.5 text-sm font-medium hover:border-navy">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className={`scroll-mt-32 py-16 md:py-20 ${i % 2 ? "bg-shell" : ""}`}>
              <div className="mx-auto max-w-5xl px-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="eyebrow">
                      {s.items.length} {s.items.length === 1 ? "menu" : "menus"}
                    </p>
                    <h2 className="heading mt-3">{s.name}</h2>
                    <Rule />
                  </div>
                  {s.href && (
                    <Link href={s.href} className="btn btn-arrow self-start md:self-auto">
                      See {s.name}
                    </Link>
                  )}
                </div>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  {s.items.map((m) => (
                    <MenuCard key={m.title} menu={m} />
                  ))}
                </div>
              </div>
            </section>
          ))}
        </>
      )}

      <EnquirySection />
    </>
  );
}
