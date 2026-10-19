import { requireUser } from "@/lib/auth";
import { FormCard, PageHeader, Panel } from "@/components/admin/ui";
import ImageForm from "../ImageForm";

export const metadata = { title: "Add image" };

export default async function NewImagePage() {
  await requireUser();
  return (
    <>
      <PageHeader title="Add gallery image" back={{ label: "Gallery", href: "/admin/gallery" }} />
      <Panel>
        <FormCard>
          <ImageForm />
        </FormCard>
      </Panel>
    </>
  );
}
