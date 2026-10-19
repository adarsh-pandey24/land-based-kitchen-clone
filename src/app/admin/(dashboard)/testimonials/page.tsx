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
        description="Client reviews shown in the “Our clients love us” section."
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
