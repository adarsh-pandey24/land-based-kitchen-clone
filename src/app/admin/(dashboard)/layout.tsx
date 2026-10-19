import type { Metadata } from "next";
import { Suspense } from "react";
import AdminNav from "@/components/admin/AdminNav";
import { requireUser } from "@/lib/auth";
import { site } from "@/lib/site";
import { Loading } from "@/components/admin/ui";

export const metadata: Metadata = {
  title: { default: "Admin", template: `%s | Admin | ${site.name}` },
  robots: { index: false, follow: false },
};

async function Sidebar() {
  const user = await requireUser();
  return <AdminNav email={user.email} role={user.role} siteName={site.name} />;
}

export default function DashboardLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="min-h-screen bg-mist text-ink lg:flex">
      <Suspense fallback={<div className="h-16 bg-ink lg:h-screen lg:w-64" />}>
        <Sidebar />
      </Suspense>
      <div className="min-w-0 flex-1">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}
