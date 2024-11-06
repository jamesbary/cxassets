import { columns } from "@/app/[locale]/(protected)/dashboard/_components/columns";
import { DataTable } from "@/app/[locale]/(protected)/dashboard/_components/data-table";
import TranslationsProvider from "@/components/providers/translation";
import { Card, CardContent } from "@/components/ui/card";
import initTranslations from "@/lib/i18n";
import { getUserTransactions } from "@/lib/queries/account";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transfers",
};

const i18nNamespaces = ["dash"];

export default async function TransactionsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { resources } = await initTranslations(locale, i18nNamespaces);
  const transactions = await getUserTransactions();

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <Card>
        <CardContent className="grid items-center pt-4 xx:pt-6">
          <DataTable data={transactions} columns={columns} />
        </CardContent>
      </Card>
    </TranslationsProvider>
  );
}
