import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import ContentList from "@/components/admin/ContentList";
import { PageHeader, Panel } from "@/components/admin/ui";

export const metadata = { title: "Chef menus" };

export default async function MenusPage() {
  await requireUser();
  const rows = await db.chefMenu.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
  return (
    <>
      <PageHeader
        title="Chef menus"
        description="The “Sample menus” section on the service pages."
        action={{ label: "Add menu", href: "/admin/menus/new" }}
      />
      <Panel>
        <ContentList
          module="menus"
          singular="Menu"
          basePath="/admin/menus"
          rows={rows.map((r) => ({
            id: r.id,
            title: r.title,
            subtitle: `${r.category} · ${Array.isArray(r.dishes) ? r.dishes.length : 0} dishes`,
            image: r.imageUrl,
            published: r.published,
          }))}
        />
      </Panel>
    </>
  );
}
