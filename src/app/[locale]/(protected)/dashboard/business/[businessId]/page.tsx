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
import { getBusinessAcctById } from "@/lib/queries/account";
import { formatAmount } from "@/lib/utils";
import type { Card as CardType, Common, Message } from "@/types/dash";

export const metadata: Metadata = {
  title: `Business Account`,
};

const i18nNamespaces = ["dash"];
export default async function Page({
  params: { businessId, locale },
}: {
  params: { businessId: string; locale: string };
}) {
  const { t } = await initTranslations(locale, i18nNamespaces);
  const account = await getBusinessAcctById(businessId);
  const b_account = await account();

  if (!b_account) notFound();

  const active = b_account.status === "active";

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
            {b_account.businessName ?? "Business Account"}
          </CardTitle>
          <Badge variant={active ? "active" : "destructive"}>
            {active ? dashData.card.active : dashData.card.closed}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold mb-4">
            {b_account ? formatAmount(b_account.balance) : "******"}
          </p>
          <div className="flex items-center gap-2 justify-center">
            <p className="text-xl font-bold">{b_account.number}</p>
            <CopyToClipboard
              textToCopy={b_account.number}
              icon
              className="w-5 h-5 rounded"
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-3 justify-between">
        {Number(b_account.balance) <= 0 ? (
          <AlertTransfer data={notEnough} />
        ) : (
          <Transfer type="businessAccounts" id={b_account.id} data={data} />
        )}
        {Number(b_account.balance) <= 0 ? (
          <AlertWithdraw data={noWith} />
        ) : (
          // <Withdraw type="businessAccounts" id={b_account.id} />
          <WithdrawLink title={withdrawTitle} />
        )}
      </div>
    </>
  );
}
