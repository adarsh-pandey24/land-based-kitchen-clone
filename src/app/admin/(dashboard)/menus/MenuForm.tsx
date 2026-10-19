import type { ChefMenu } from "@prisma/client";
import { AdminForm, Checkbox, ImageUrlField, SubmitBar, TextArea, TextField } from "@/components/admin/Fields";
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
      <TextField name="category" label="Category" required defaultValue={menu?.category} hint="e.g. Canapés, Shared, Tasting" />
      <TextArea name="description" label="Description" required defaultValue={menu?.description} />
      <ImageUrlField name="imageUrl" label="Menu image URL (optional)" defaultValue={menu?.imageUrl} />
      <DishesEditor initial={dishes.success ? dishes.data : []} />
      <TextField name="sortOrder" label="Display order" type="number" defaultValue={menu?.sortOrder ?? 0} hint="Lower numbers show first" />
      <Checkbox name="published" label="Published (shown on Private Dining and Bespoke Catering)" defaultChecked={menu?.published} />
      <SubmitBar cancelHref="/admin/menus" />
    </AdminForm>
  );
}
