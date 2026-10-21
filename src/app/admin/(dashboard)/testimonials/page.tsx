import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import ContentList from "@/components/admin/ContentList";
import { PageHeader, Panel } from "@/components/admin/ui";

export const metadata = { title: "Testimonials" };

export default async function TestimonialsPage() {
  await requireUser();
  const rows = await db.testimonial.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
  return (
    <>
      <PageHeader
        title="Testimonials"
        description="The “What hosts say after the party” reviews section. Hidden until one is published."
        action={{ label: "Add testimonial", href: "/admin/testimonials/new" }}
      />
      <Panel>
        <ContentList
          module="testimonials"
          singular="Testimonial"
          basePath="/admin/testimonials"
          rows={rows.map((r) => ({
            id: r.id,
            title: r.clientName + (r.roleOrCompany ? ` — ${r.roleOrCompany}` : ""),
            subtitle: r.content,
            published: r.published,
          }))}
        />
      </Panel>
    </>
  );
}
