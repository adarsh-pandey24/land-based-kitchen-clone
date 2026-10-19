import { requireUser } from "@/lib/auth";
import { FormCard, PageHeader, Panel } from "@/components/admin/ui";
import ServiceForm from "../ServiceForm";

export const metadata = { title: "Add service" };

export default async function NewServicePage() {
  await requireUser();
  return (
    <>
      <PageHeader title="Add service" back={{ label: "Catering services", href: "/admin/services" }} />
      <Panel>
        <FormCard>
          <ServiceForm />
        </FormCard>
      </Panel>
    </>
  );
}
