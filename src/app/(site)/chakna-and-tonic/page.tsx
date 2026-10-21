import ServiceTemplate, { serviceMetadata } from "@/components/ServiceTemplate";

export const metadata = serviceMetadata("chakna-and-tonic");

export default function Page() {
  return <ServiceTemplate groupKey="chakna-and-tonic" />;
}
