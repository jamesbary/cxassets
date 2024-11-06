import type { Metadata } from "next";

import { About } from "@/app/[locale]/(public)/about/_components/about";

export const metadata: Metadata = {
  title: `About`,
};

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <main>
      <About locale={locale} />
    </main>
  );
}
