import ServiceTemplate, { serviceMetadata } from "@/components/ServiceTemplate";

export const metadata = serviceMetadata("grazing-tables-boards");

export default function Page() {
  return <ServiceTemplate groupKey="grazing-tables-boards" />;
}
