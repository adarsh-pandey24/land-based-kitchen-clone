import ServiceTemplate, { serviceMetadata } from "@/components/ServiceTemplate";

export const metadata = serviceMetadata("private-dining-events");

export default function Page() {
  return <ServiceTemplate groupKey="private-dining-events" />;
}
