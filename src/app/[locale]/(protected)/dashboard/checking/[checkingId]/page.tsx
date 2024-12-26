import type { Metadata } from "next";
import { notFound } from "next/navigation";
import * as React from "react";

import { AlertTransfer } from "@/app/[locale]/(protected)/dashboard/_components/alert-transfer";
import { AlertWithdraw } from "@/app/[locale]/(protected)/dashboard/_components/alert-withdraw";
import { Transfer } from "@/app/[locale]/(protected)/dashboard/_components/transfer";
import { Withdraw } from "@/app/[locale]/(protected)/dashboard/_components/withdraw";
import { CopyToClipboard } from "@/components/shared/copy-to-clipboard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import initTranslations from "@/lib/i18n";
import { getCheckingAcctById } from "@/lib/queries/account";
import { getCachedSession } from "@/lib/queries/auth";
import { formatAmount } from "@/lib/utils";
import type { Card as CardType, Common, Message } from "@/types/dash";

export const metadata: Metadata = {
  title: `Checking Account`,
};

const i18nNamespaces = ["dash"];
export default async function Page({
  params: { checkingId, locale },
}: {
  params: { checkingId: string; locale: string };
}) {
  const { t } = await initTranslations(locale, i18nNamespaces);
  const account = await getCheckingAcctById(checkingId);
  const session = await getCachedSession();
  const c_account = await account();

  if (!c_account) notFound();

  const active = c_account.status === "active";

  const dashData = {
    card: t("card", { returnObjects: true }) as CardType,
    message: t("message", { returnObjects: true }) as Message,
    common: t("common", { returnObjects: true }) as Common,
  };
  const notEnough = {
    ...dashData.card.notEnough,
    btn: dashData.card.transfer,
  };
  const noWith = {
    ...dashData.card.notEnough,
    btn: dashData.card.withdraw,
  };

  const data = {
    transCard: dashData.card.transCard,
    message: dashData.message,
    type: {
      checking: dashData.common.checking,
      savings: dashData.common.savings,
      business: dashData.common.business,
    },
  };
  const withdrawData = {
    withdrawCard: dashData.card.withdrawCard,
    message: dashData.message,
    type: {
      checking: dashData.common.checking,
      savings: dashData.common.savings,
      business: dashData.common.business,
    },
  };

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="flex-row justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold">
            {session?.user.name ? session.user.name : dashData.common.checking}
          </CardTitle>
          <Badge variant={active ? "active" : "destructive"}>
            {active ? dashData.card.active : dashData.card.closed}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold mb-4">
            {c_account ? formatAmount(c_account.balance) : "******"}
          </p>
          <div className="flex items-center gap-2 justify-center">
            <p className="text-xl font-bold">{c_account.number}</p>
            <CopyToClipboard
              textToCopy={c_account.number}
              icon
              className="w-5 h-5 rounded"
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-3 justify-between">
        {Number(c_account.balance) <= 0 ? (
          <AlertTransfer data={notEnough} />
        ) : (
          <Transfer
            type="personalCheckingAccounts"
            id={c_account.id}
            data={data}
          />
        )}
        {Number(c_account.balance) <= 0 ? (
          <AlertWithdraw data={noWith} />
        ) : (
          <Withdraw
            type="personalCheckingAccounts"
            id={c_account.id}
            data={withdrawData}
          />
        )}
      </div>
    </React.Fragment>
  );
}
