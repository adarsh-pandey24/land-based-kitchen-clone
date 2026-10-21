import type { CateringService } from "@prisma/client";
import { AdminForm, Checkbox, ImageUrlField, SelectField, SubmitBar, TextArea, TextField } from "@/components/admin/Fields";
import { groups } from "@/content/services";
import { saveService } from "./actions";

export const groupOptions = groups.map((g) => ({ value: g.key, label: g.name }));

export default function ServiceForm({ service }: { service?: CateringService }) {
  return (
    <AdminForm action={saveService.bind(null, service?.id ?? null)}>
      <SelectField
        name="group"
        label="Service page"
        defaultValue={service?.group || ""}
        options={[{ value: "", label: "Choose a page…" }, ...groupOptions]}
        hint="The page this service appears on."
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField name="title" label="Service name" required defaultValue={service?.title} hint="e.g. Barbecue Parties" />
        <TextField
          name="slug"
          label="Slug"
          required
          defaultValue={service?.slug}
          hint="Unique; also the page anchor, e.g. /party-catering#barbecue-parties"
        />
      </div>
      <TextField name="heading" label="Headline (optional)" defaultValue={service?.heading} hint="e.g. The barbecue, minus standing at the grill." />
      <TextField name="cardLine" label="Card line (optional)" defaultValue={service?.cardLine} hint="One-line summary" />
      <TextArea name="description" label="Description" required defaultValue={service?.description} />
      <ImageUrlField name="imageUrl" label="Image URL" required defaultValue={service?.imageUrl} />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField name="guests" label="Guests (optional)" defaultValue={service?.guests} hint="e.g. 10 to 50" />
        <TextField name="format" label="Format (optional)" defaultValue={service?.format} hint="e.g. Drop-off or on-site" />
        <TextField name="priceLabel" label="Price label (optional)" defaultValue={service?.priceLabel} hint="e.g. From $45 per guest" />
        <TextField name="buttonLabel" label="Button label (optional)" defaultValue={service?.buttonLabel} hint="e.g. Book a barbecue" />
      </div>
      <TextField name="goodFor" label="Good for (optional)" defaultValue={service?.goodFor} hint="e.g. backyard parties, long weekends" />
      <TextField
        name="sampleDishes"
        label="Sample dishes (optional)"
        defaultValue={service?.sampleDishes}
        hint="Comma-separated, e.g. tandoori chicken, lamb seekh kebab"
      />
      <TextField name="smallPrint" label="Small print (optional)" defaultValue={service?.smallPrint} />
      <TextField name="sortOrder" label="Display order" type="number" defaultValue={service?.sortOrder ?? 0} hint="Lower numbers show first" />
      <Checkbox name="published" label="Published (visible on the website)" defaultChecked={service?.published} />
      <SubmitBar cancelHref="/admin/services" />
    </AdminForm>
  );
}
