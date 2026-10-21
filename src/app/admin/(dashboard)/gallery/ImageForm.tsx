import type { GalleryImage } from "@prisma/client";
import { AdminForm, Checkbox, ImageUrlField, SelectField, SubmitBar, TextField } from "@/components/admin/Fields";
import { saveImage } from "./actions";
import { groupOptions } from "../services/ServiceForm";

export const galleryCategories = [
  { value: "", label: "General" },
  ...groupOptions,
  { value: "behind-the-scenes", label: "Behind the scenes" },
];

export default function ImageForm({ image }: { image?: GalleryImage }) {
  return (
    <AdminForm action={saveImage.bind(null, image?.id ?? null)}>
      <ImageUrlField name="imageUrl" label="Image URL" required defaultValue={image?.imageUrl} />
      <TextField
        name="altText"
        label="Alt text"
        required
        defaultValue={image?.altText}
        hint="Describe the image for screen readers and search engines"
      />
      <TextField name="caption" label="Caption (optional)" defaultValue={image?.caption} />
      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField
          name="category"
          label="Category"
          options={galleryCategories}
          defaultValue={image?.category ?? ""}
          hint="Sets the Gallery filter tab and which service page strip shows it. Behind the scenes shows on About."
        />
        <TextField name="sortOrder" label="Display order" type="number" defaultValue={image?.sortOrder ?? 0} hint="Lower numbers show first" />
      </div>
      <Checkbox name="published" label="Published (visible on the website)" defaultChecked={image?.published} />
      <SubmitBar cancelHref="/admin/gallery" />
    </AdminForm>
  );
}
