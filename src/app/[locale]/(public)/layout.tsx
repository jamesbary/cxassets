import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default async function HomeLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <section className="min-h-screen grid grid-rows-[auto,1fr,auto]">
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
    </section>
  );
}
