import { requireUser } from "@/lib/auth";
import { FormCard, PageHeader, Panel } from "@/components/admin/ui";
import TestimonialForm from "../TestimonialForm";

export const metadata = { title: "Add testimonial" };

export default async function NewTestimonialPage() {
  await requireUser();
  return (
    <>
      <PageHeader title="Add testimonial" back={{ label: "Testimonials", href: "/admin/testimonials" }} />
      <Panel>
        <FormCard>
          <TestimonialForm />
        </FormCard>
      </Panel>
    </>
  );
}
