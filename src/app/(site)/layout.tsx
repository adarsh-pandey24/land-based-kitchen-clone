import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main className="pt-[76px]">{children}</main>
      <Footer />
    </>
  );
}
