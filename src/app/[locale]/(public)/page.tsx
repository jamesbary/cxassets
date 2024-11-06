import { About } from "@/app/[locale]/(public)/_components/about";
import { Features } from "@/app/[locale]/(public)/_components/features";
import { Hero } from "@/app/[locale]/(public)/_components/hero";
import { Services } from "@/app/[locale]/(public)/_components/services";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <main>
      <Hero locale={locale} />
      <About locale={locale} />
      <section
        id="features"
        className="relative bg-[url('/assets/hero/banner-1.jpeg')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-slate-800/70" aria-hidden="true" />
        <Features locale={locale} />
        <Services locale={locale} />
      </section>
    </main>
  );
}
