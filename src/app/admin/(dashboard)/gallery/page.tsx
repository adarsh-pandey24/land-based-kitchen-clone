import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import ContentList from "@/components/admin/ContentList";
import { PageHeader, Panel } from "@/components/admin/ui";
import { galleryCategories } from "./ImageForm";

export const metadata = { title: "Gallery" };

export default async function GalleryAdminPage() {
  await requireUser();
  const rows = await db.galleryImage.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
  const label = (c: string | null) => galleryCategories.find((o) => o.value === (c ?? ""))?.label;
  return (
    <>
      <PageHeader
        title="Gallery"
        description="Images on the Gallery page, the home carousel, and the strips on service pages and About."
        action={{ label: "Add image", href: "/admin/gallery/new" }}
      />
      <Panel>
        <ContentList
          module="gallery"
          singular="Image"
          basePath="/admin/gallery"
          rows={rows.map((r) => ({
            id: r.id,
            title: r.caption || r.altText,
            subtitle: label(r.category),
            image: r.imageUrl,
            published: r.published,
          }))}
        />
      </Panel>
    </>
  );
}
