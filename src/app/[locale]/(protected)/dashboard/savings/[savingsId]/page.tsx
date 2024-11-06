import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AlertTransfer } from "@/app/[locale]/(protected)/dashboard/_components/alert-transfer";
import { AlertWithdraw } from "@/app/[locale]/(protected)/dashboard/_components/alert-withdraw";
import { Transfer } from "@/app/[locale]/(protected)/dashboard/_components/transfer";
import { WithdrawLink } from "@/app/[locale]/(protected)/dashboard/_components/withdraw-link";
import { CopyToClipboard } from "@/components/shared/copy-to-clipboard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import initTranslations from "@/lib/i18n";
import { getSavingsAcctById } from "@/lib/queries/account";
import { getCachedSession } from "@/lib/queries/auth";
import { formatAmount } from "@/lib/utils";
import type { Card as CardType, Common, Message } from "@/types/dash";

export const metadata: Metadata = {
  title: `Savings Account`,
};

const i18nNamespaces = ["dash"];
export default async function Page({
  params: { savingsId, locale },
}: {
  params: { savingsId: string; locale: string };
}) {
  const { t } = await initTranslations(locale, i18nNamespaces);
  const account = await getSavingsAcctById(savingsId);
  const session = await getCachedSession();
  const s_account = await account();

  if (!s_account) notFound();

  const active = s_account.status === "active";
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
  const withdrawTitle = dashData.card.withdraw;

  return (
    <>
      <Card>
        <CardHeader className="flex-row justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold">
            {session?.user.name ? session.user.name : dashData.common.savings}
          </CardTitle>
          <Badge variant={active ? "active" : "destructive"}>
            {active ? dashData.card.active : dashData.card.closed}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold mb-4">
            {s_account ? formatAmount(s_account.balance) : "******"}
          </p>
          <div className="flex items-center gap-2 justify-center">
            <p className="text-xl font-bold">{s_account.number}</p>
            <CopyToClipboard
              textToCopy={s_account.number}
              icon
              className="w-5 h-5 rounded"
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-3 justify-between">
        {Number(s_account.balance) <= 0 ? (
          <AlertTransfer data={notEnough} />
        ) : (
          <Transfer
            type="personalSavingsAccounts"
            id={s_account.id}
            data={data}
          />
        )}
        {Number(s_account.balance) <= 0 ? (
          <AlertWithdraw data={noWith} />
        ) : (
          <WithdrawLink title={withdrawTitle} />
        )}
      </div>
    </>
  );
}
