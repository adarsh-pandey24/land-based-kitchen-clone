import type { ChefProfile } from "@prisma/client";
import { AdminForm, Checkbox, ImageUrlField, SubmitBar, TextArea, TextField } from "@/components/admin/Fields";
import { saveChef } from "./actions";

export default function ChefForm({ chef }: { chef?: ChefProfile }) {
  return (
    <AdminForm action={saveChef.bind(null, chef?.id ?? null)}>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField name="name" label="Name" required defaultValue={chef?.name} />
        <TextField name="slug" label="Slug" required defaultValue={chef?.slug} hint="Unique, e.g. jane-smith" />
      </div>
      <TextField name="designation" label="Designation" required defaultValue={chef?.designation} hint="e.g. Head Chef" />
      <TextArea name="experience" label="Experience (optional)" rows={3} defaultValue={chef?.experience} />
      <TextArea name="biography" label="Biography" required rows={8} defaultValue={chef?.biography} />
      <ImageUrlField name="imageUrl" label="Photo URL" required defaultValue={chef?.imageUrl} />
      <TextField name="sortOrder" label="Display order" type="number" defaultValue={chef?.sortOrder ?? 0} hint="Lower numbers show first" />
      <Checkbox name="published" label="Published (visible on About Us)" defaultChecked={chef?.published} />
      <SubmitBar cancelHref="/admin/chefs" />
    </AdminForm>
  );
}
