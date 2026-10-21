import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import ContentList from "@/components/admin/ContentList";
import { PageHeader, Panel } from "@/components/admin/ui";
import { groupOptions } from "./ServiceForm";

export const metadata = { title: "Catering services" };

export default async function ServicesPage() {
  await requireUser();
  const rows = await db.cateringService.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
  return (
    <>
      <PageHeader
        title="Catering services"
        description="The service blocks on the four service pages, and the service list in the enquiry form."
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
            subtitle: [groupOptions.find((g) => g.value === r.group)?.label ?? "No page", r.priceLabel].filter(Boolean).join(" · "),
            image: r.imageUrl,
            published: r.published,
          }))}
        />
      </Panel>
    </>
  );
}
