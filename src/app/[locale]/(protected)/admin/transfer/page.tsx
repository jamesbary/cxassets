import { columns } from "@/app/[locale]/(protected)/admin/_components/columns";
import { DataTable } from "@/app/[locale]/(protected)/admin/_components/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { getTransactions } from "@/lib/queries/account";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions",
};

export default async function TransactionsPage() {
  const transactions = await getTransactions();

  return (
    <Card>
      <CardContent className="grid items-center pt-4 xx:pt-6">
        <DataTable data={transactions} columns={columns} />
      </CardContent>
    </Card>
  );
}
