import ServiceTemplate, { serviceMetadata } from "@/components/ServiceTemplate";

export const metadata = serviceMetadata("party-catering");

export default function Page() {
  return <ServiceTemplate groupKey="party-catering" />;
}
