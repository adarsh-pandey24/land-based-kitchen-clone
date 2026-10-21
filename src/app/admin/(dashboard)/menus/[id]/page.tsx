import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { FormCard, PageHeader, Panel } from "@/components/admin/ui";
import MenuForm from "../MenuForm";

export const metadata = { title: "Edit menu" };

export default async function EditMenuPage({ params }: PageProps<"/admin/menus/[id]">) {
  await requireUser();
  const { id } = await params;
  const menu = await db.chefMenu.findUnique({ where: { id } });
  if (!menu) notFound();
  return (
    <>
      <PageHeader title={`Edit: ${menu.title}`} back={{ label: "Chef menus", href: "/admin/menus" }} />
      <Panel>
        <FormCard>
          <MenuForm menu={menu} />
        </FormCard>
      </Panel>
    </>
  );
}
