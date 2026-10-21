import type { ChefMenu } from "@prisma/client";
import { AdminForm, Checkbox, ImageUrlField, SelectField, SubmitBar, TextArea, TextField } from "@/components/admin/Fields";
import { groupOptions } from "../services/ServiceForm";
import { dishSchema } from "@/lib/validation";
import { saveMenu } from "./actions";
import DishesEditor from "./DishesEditor";

export default function MenuForm({ menu }: { menu?: ChefMenu }) {
  const dishes = dishSchema.array().safeParse(menu?.dishes ?? []);
  return (
    <AdminForm action={saveMenu.bind(null, menu?.id ?? null)}>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField name="title" label="Title" required defaultValue={menu?.title} />
        <TextField name="slug" label="Slug" required defaultValue={menu?.slug} hint="Unique, e.g. canape-menu" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField
          name="group"
          label="Show on"
          defaultValue={menu?.group ?? ""}
          options={[{ value: "", label: "Every service page" }, ...groupOptions]}
        />
        <TextField name="category" label="Label" required defaultValue={menu?.category} hint="e.g. Canapés, Shared, Tasting" />
      </div>
      <TextArea name="description" label="Description" required defaultValue={menu?.description} />
      <ImageUrlField name="imageUrl" label="Menu image URL (optional)" defaultValue={menu?.imageUrl} />
      <TextField
        name="pdfUrl"
        label="Menu PDF URL (optional)"
        defaultValue={menu?.pdfUrl}
        hint="https:// link or a site path such as /menus/barbecue.pdf. Adds a download button."
      />
      <DishesEditor initial={dishes.success ? dishes.data : []} />
      <TextField name="sortOrder" label="Display order" type="number" defaultValue={menu?.sortOrder ?? 0} hint="Lower numbers show first" />
      <Checkbox name="published" label="Published (visible on the website)" defaultChecked={menu?.published} />
      <SubmitBar cancelHref="/admin/menus" />
    </AdminForm>
  );
}
