import type { Metadata } from "next";
import ServiceTemplate from "@/components/ServiceTemplate";
import { servicePages } from "@/content/services";

export const metadata: Metadata = { title: "Bespoke Catering" };

export default function Page() {
  return <ServiceTemplate page={servicePages["bespoke-catering"]} />;
}
