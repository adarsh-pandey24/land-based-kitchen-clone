import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { PageHeader, Panel } from "@/components/admin/ui";

export const metadata = { title: "Overview" };

export default async function AdminHome() {
  const user = await requireUser();
  const count = (p: Promise<number>, q: Promise<number>) => Promise.all([p, q]);
  const [services, menus, gallery, testimonials, chefs] = await Promise.all([
    count(db.cateringService.count(), db.cateringService.count({ where: { published: true } })),
    count(db.chefMenu.count(), db.chefMenu.count({ where: { published: true } })),
    count(db.galleryImage.count(), db.galleryImage.count({ where: { published: true } })),
    count(db.testimonial.count(), db.testimonial.count({ where: { published: true } })),
    count(db.chefProfile.count(), db.chefProfile.count({ where: { published: true } })),
  ]);

  const cards = [
    { label: "Catering services", href: "/admin/services", counts: services, add: "Add service" },
    { label: "Chef menus", href: "/admin/menus", counts: menus, add: "Add menu" },
    { label: "Gallery images", href: "/admin/gallery", counts: gallery, add: "Add image" },
    { label: "Testimonials", href: "/admin/testimonials", counts: testimonials, add: "Add testimonial" },
    { label: "Chef profiles", href: "/admin/chefs", counts: chefs, add: "Add chef" },
  ];

  return (
    <>
      <PageHeader title="Overview" description={`Signed in as ${user.email}`} />
      <Panel>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {cards.map((c) => (
            <div key={c.href} className="flex flex-col border border-line bg-white p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">{c.label}</p>
              <p className="mt-3 font-serif text-4xl">{c.counts[0]}</p>
              <p className="text-sm text-muted">{c.counts[1]} published</p>
              <div className="mt-5 flex gap-3 text-sm">
                <Link href={c.href} className="text-gold-dark underline">
                  Manage
                </Link>
                <Link href={`${c.href}/new`} className="text-gold-dark underline">
                  {c.add}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-8 border border-line bg-white p-5 text-sm leading-relaxed text-muted">
          <h2 className="font-serif text-xl text-ink">How publishing works</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>Only published records appear on the public website. New records start as drafts unless you tick Published.</li>
            <li>While a module has no records at all, the website keeps showing its original placeholder content.</li>
            <li>Changes appear on the website on the next page load after saving.</li>
            <li>Gallery images can be assigned to a page (home or a service page); pages without their own images show the full gallery.</li>
          </ul>
        </section>
      </Panel>
    </>
  );
}
