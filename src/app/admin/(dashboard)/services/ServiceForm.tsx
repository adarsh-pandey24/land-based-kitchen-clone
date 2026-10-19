import type { CateringService } from "@prisma/client";
import { AdminForm, Checkbox, ImageUrlField, SubmitBar, TextArea, TextField } from "@/components/admin/Fields";
import { saveService } from "./actions";

export default function ServiceForm({ service }: { service?: CateringService }) {
  return (
    <AdminForm action={saveService.bind(null, service?.id ?? null)}>
      <TextField name="title" label="Title" required defaultValue={service?.title} />
      <TextField
        name="slug"
        label="Slug"
        required
        defaultValue={service?.slug}
        hint="private-chef, private-dining or bespoke-catering link to their existing pages; other slugs link to the enquiry page."
      />
      <TextArea name="description" label="Description" required defaultValue={service?.description} />
      <ImageUrlField name="imageUrl" label="Image URL" required defaultValue={service?.imageUrl} />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField name="priceLabel" label="Price label (optional)" defaultValue={service?.priceLabel} hint="e.g. From $95 per guest" />
        <TextField name="sortOrder" label="Display order" type="number" defaultValue={service?.sortOrder ?? 0} hint="Lower numbers show first" />
      </div>
      <Checkbox name="published" label="Published (visible on the website)" defaultChecked={service?.published} />
      <SubmitBar cancelHref="/admin/services" />
    </AdminForm>
  );
}
