import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import ContentList from "@/components/admin/ContentList";
import { PageHeader, Panel } from "@/components/admin/ui";

export const metadata = { title: "Catering services" };

export default async function ServicesPage() {
  await requireUser();
  const rows = await db.cateringService.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
  return (
    <>
      <PageHeader
        title="Catering services"
        description="Service cards shown on the home, about and service pages."
        action={{ label: "Add service", href: "/admin/services/new" }}
      />
      <Panel>
        <ContentList
          module="services"
          singular="Service"
          basePath="/admin/services"
          rows={rows.map((r) => ({
            id: r.id,
            title: r.title,
            subtitle: [`/${r.slug}`, r.priceLabel].filter(Boolean).join(" · "),
            image: r.imageUrl,
            published: r.published,
          }))}
        />
      </Panel>
    </>
  );
}
