import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { AdminForm, SelectField, TextField } from "@/components/admin/Fields";
import { FormCard, PageHeader, Panel } from "@/components/admin/ui";
import { createUser } from "./actions";
import UserRows from "./UserRows";

export const metadata = { title: "Admin users" };

export default async function UsersPage() {
  const me = await requireAdmin();
  const users = await db.adminUser.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, email: true, role: true, createdAt: true },
  });
  return (
    <>
      <PageHeader title="Admin users" description="Admins manage everything. Editors manage website content only." />
      <Panel>
        <UserRows users={users.map((u) => ({ ...u, createdAt: u.createdAt.toISOString().slice(0, 10) }))} meId={me.id} />
        <div className="mt-8">
          <FormCard>
            <h2 className="mb-6 font-serif text-xl">Add account</h2>
            <AdminForm action={createUser}>
              <TextField name="email" label="Email" type="email" required />
              <TextField name="password" label="Temporary password" type="password" required hint="At least 12 characters. Share it securely." />
              <SelectField
                name="role"
                label="Role"
                defaultValue="EDITOR"
                options={[
                  { value: "EDITOR", label: "Editor — content only" },
                  { value: "ADMIN", label: "Admin — content and accounts" },
                ]}
              />
              <button type="submit" className="btn">
                Create account
              </button>
            </AdminForm>
          </FormCard>
        </div>
      </Panel>
    </>
  );
}
