import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import ContentList from "@/components/admin/ContentList";
import { PageHeader, Panel } from "@/components/admin/ui";

export const metadata = { title: "Chef profiles" };

export default async function ChefsPage() {
  await requireUser();
  const rows = await db.chefProfile.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
  return (
    <>
      <PageHeader
        title="Chef profiles"
        description="The first published profile is the About page story and home portrait; others appear as the team."
        action={{ label: "Add chef", href: "/admin/chefs/new" }}
      />
      <Panel>
        <ContentList
          module="chefs"
          singular="Chef profile"
          basePath="/admin/chefs"
          rows={rows.map((r) => ({ id: r.id, title: r.name, subtitle: r.designation, image: r.imageUrl, published: r.published }))}
        />
      </Panel>
    </>
  );
}
