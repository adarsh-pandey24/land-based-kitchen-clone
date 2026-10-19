import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { FormCard, PageHeader, Panel } from "@/components/admin/ui";
import ChefForm from "../ChefForm";

export const metadata = { title: "Edit chef" };

export default async function EditChefPage({ params }: PageProps<"/admin/chefs/[id]">) {
  await requireUser();
  const { id } = await params;
  const chef = await db.chefProfile.findUnique({ where: { id } });
  if (!chef) notFound();
  return (
    <>
      <PageHeader title={`Edit: ${chef.name}`} back={{ label: "Chef profiles", href: "/admin/chefs" }} />
      <Panel>
        <FormCard>
          <ChefForm chef={chef} />
        </FormCard>
      </Panel>
    </>
  );
}
