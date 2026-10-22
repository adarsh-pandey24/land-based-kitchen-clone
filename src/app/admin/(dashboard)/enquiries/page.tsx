import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { PageHeader, Panel } from "@/components/admin/ui";
import EnquiryList, { type EnquiryRow } from "./EnquiryList";
import AutoRefresh from "@/components/admin/AutoRefresh";

export const metadata = { title: "Enquiries" };

// Dates are formatted on the server in Gold Coast time so every viewer sees
// the same value.
const formatReceived = new Intl.DateTimeFormat("en-AU", {
  timeZone: "Australia/Brisbane",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const formatEventDate = (value: string) => {
  const d = new Date(`${value}T00:00:00`);
  return Number.isNaN(d.getTime())
    ? value
    : new Intl.DateTimeFormat("en-AU", { weekday: "short", day: "numeric", month: "short", year: "numeric" }).format(d);
};

export default async function EnquiriesPage() {
  await requireUser();
  const rows = await db.enquiry.findMany({ orderBy: { createdAt: "desc" }, take: 500, omit: { updatedAt: true } });
  const enquiries: EnquiryRow[] = rows.map(({ createdAt, eventDate, ...r }) => ({
    ...r,
    received: formatReceived.format(createdAt),
    eventDate: formatEventDate(eventDate),
  }));
  return (
    <>
      <AutoRefresh />
      <PageHeader title="Enquiries" description="Every enquiry sent from the website form, newest first. Updates automatically." />
      <Panel>
        <EnquiryList enquiries={enquiries} />
      </Panel>
    </>
  );
}
