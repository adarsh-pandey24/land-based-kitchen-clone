import type { Testimonial } from "@prisma/client";
import { AdminForm, Checkbox, SubmitBar, TextArea, TextField } from "@/components/admin/Fields";
import { saveTestimonial } from "./actions";

export default function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  return (
    <AdminForm action={saveTestimonial.bind(null, testimonial?.id ?? null)}>
      <p className="text-sm text-muted">Only add genuine reviews you have permission to publish.</p>
      <TextField name="clientName" label="Client name" required defaultValue={testimonial?.clientName} />
      <TextField name="roleOrCompany" label="Role or company (optional)" defaultValue={testimonial?.roleOrCompany} />
      <TextArea name="content" label="Review" required rows={6} defaultValue={testimonial?.content} />
      <TextField
        name="sortOrder"
        label="Display order"
        type="number"
        defaultValue={testimonial?.sortOrder ?? 0}
        hint="Lower numbers show first"
      />
      <Checkbox name="published" label="Published (visible on the website)" defaultChecked={testimonial?.published} />
      <SubmitBar cancelHref="/admin/testimonials" />
    </AdminForm>
  );
}
