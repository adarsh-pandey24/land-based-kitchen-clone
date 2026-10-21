import { requireUser } from "@/lib/auth";
import { FormCard, PageHeader, Panel } from "@/components/admin/ui";
import ChefForm from "../ChefForm";

export const metadata = { title: "Add chef" };

export default async function NewChefPage() {
  await requireUser();
  return (
    <>
      <PageHeader title="Add chef profile" back={{ label: "Chef profiles", href: "/admin/chefs" }} />
      <Panel>
        <FormCard>
          <ChefForm />
        </FormCard>
      </Panel>
    </>
  );
}
