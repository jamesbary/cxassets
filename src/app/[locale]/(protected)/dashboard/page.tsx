import type { Metadata } from "next";
import * as React from "react";

import { Cards } from "@/app/[locale]/(protected)/dashboard/_components/cards";
import { auth } from "@/auth";
import { UserLocation } from "@/components/shared/user-location";
import { appConfig } from "@/config";
import { getAccounts } from "@/lib/queries/account";

export const metadata: Metadata = {
  title: appConfig.entry.title,
};

export default async function DashboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { businessAccount, checkingAccount, savingsAccount } =
    await getAccounts();

  const session = await auth();

  return (
    <React.Fragment>
      <Cards
        locale={locale}
        checkingAccount={checkingAccount}
        savingsAccount={savingsAccount}
        businessAccount={businessAccount}
      />
      <UserLocation id={session?.user.id} />
    </React.Fragment>
  );
}
