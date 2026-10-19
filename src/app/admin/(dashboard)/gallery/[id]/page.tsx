import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { FormCard, PageHeader, Panel } from "@/components/admin/ui";
import ImageForm from "../ImageForm";

export const metadata = { title: "Edit image" };

export default async function EditImagePage({ params }: PageProps<"/admin/gallery/[id]">) {
  await requireUser();
  const { id } = await params;
  const image = await db.galleryImage.findUnique({ where: { id } });
  if (!image) notFound();
  return (
    <>
      <PageHeader title="Edit gallery image" back={{ label: "Gallery", href: "/admin/gallery" }} />
      <Panel>
        <FormCard>
          <ImageForm image={image} />
        </FormCard>
      </Panel>
    </>
  );
}
