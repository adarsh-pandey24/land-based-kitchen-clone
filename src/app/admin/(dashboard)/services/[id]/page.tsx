import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { FormCard, PageHeader, Panel } from "@/components/admin/ui";
import ServiceForm from "../ServiceForm";

export const metadata = { title: "Edit service" };

export default async function EditServicePage({ params }: PageProps<"/admin/services/[id]">) {
  await requireUser();
  const { id } = await params;
  const service = await db.cateringService.findUnique({ where: { id } });
  if (!service) notFound();
  return (
    <>
      <PageHeader title={`Edit: ${service.title}`} back={{ label: "Catering services", href: "/admin/services" }} />
      <Panel>
        <FormCard>
          <ServiceForm service={service} />
        </FormCard>
      </Panel>
    </>
  );
}
