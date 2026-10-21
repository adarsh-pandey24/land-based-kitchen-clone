import { requireUser } from "@/lib/auth";
import { FormCard, PageHeader, Panel } from "@/components/admin/ui";
import MenuForm from "../MenuForm";

export const metadata = { title: "Add menu" };

export default async function NewMenuPage() {
  await requireUser();
  return (
    <>
      <PageHeader title="Add menu" back={{ label: "Chef menus", href: "/admin/menus" }} />
      <Panel>
        <FormCard>
          <MenuForm />
        </FormCard>
      </Panel>
    </>
  );
}
