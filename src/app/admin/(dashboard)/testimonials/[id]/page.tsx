import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { FormCard, PageHeader, Panel } from "@/components/admin/ui";
import TestimonialForm from "../TestimonialForm";

export const metadata = { title: "Edit testimonial" };

export default async function EditTestimonialPage({ params }: PageProps<"/admin/testimonials/[id]">) {
  await requireUser();
  const { id } = await params;
  const testimonial = await db.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();
  return (
    <>
      <PageHeader title={`Edit: ${testimonial.clientName}`} back={{ label: "Testimonials", href: "/admin/testimonials" }} />
      <Panel>
        <FormCard>
          <TestimonialForm testimonial={testimonial} />
        </FormCard>
      </Panel>
    </>
  );
}
