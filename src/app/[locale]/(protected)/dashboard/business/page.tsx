import { Terminal } from "lucide-react";
import type { Metadata } from "next";
import * as React from "react";

import { AlertTransfer } from "@/app/[locale]/(protected)/dashboard/_components/alert-transfer";
import { AlertWithdraw } from "@/app/[locale]/(protected)/dashboard/_components/alert-withdraw";
import { Create } from "@/app/[locale]/(protected)/dashboard/_components/business-account";
import { Transfer } from "@/app/[locale]/(protected)/dashboard/_components/transfer";
import { Withdraw } from "@/app/[locale]/(protected)/dashboard/_components/withdraw";
import { CopyToClipboard } from "@/components/shared/copy-to-clipboard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import initTranslations from "@/lib/i18n";
import { getAccounts } from "@/lib/queries/account";
import { getCachedSession } from "@/lib/queries/auth";
import { formatAmount } from "@/lib/utils";
import type { Account, Card as CardType, Common, Message } from "@/types/dash";

export const metadata: Metadata = {
  title: `Business Account`,
};

const i18nNamespaces = ["dash"];

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t } = await initTranslations(locale, i18nNamespaces);
  const { businessAccount } = await getAccounts();
  const session = await getCachedSession();

  const dashData = {
    card: t("card", { returnObjects: true }) as CardType,
    message: t("message", { returnObjects: true }) as Message,
    common: t("common", { returnObjects: true }) as Common,
    business: t("business", { returnObjects: true }) as Account,
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

  const createBusiness = {
    ...dashData.business.create,
    action: dashData.common.action,
  };

  return (
    <React.Fragment>
      {businessAccount ? (
        <React.Fragment>
          <Card>
            <CardHeader className="flex-row justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold">
                {businessAccount.businessName ?? "Business Account"}
              </CardTitle>
              <Badge
                variant={
                  businessAccount.status === "active" ? "active" : "destructive"
                }
              >
                {businessAccount.status === "active"
                  ? dashData.card.active
                  : dashData.card.closed}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">
                {formatAmount(businessAccount.balance)}
              </p>
              <div className="flex items-center gap-2 justify-center">
                <p className="text-xl font-bold">{businessAccount.number}</p>
                <CopyToClipboard
                  textToCopy={businessAccount.number}
                  icon
                  className="w-5 h-5 rounded"
                />
              </div>
            </CardContent>
          </Card>
          <div className="flex gap-3 justify-between">
            {Number(businessAccount.balance) <= 0 ? (
              <AlertTransfer data={notEnough} />
            ) : (
              <Transfer
                type="businessAccounts"
                id={businessAccount.id}
                data={data}
              />
            )}
            {Number(businessAccount.balance) <= 0 ? (
              <AlertWithdraw data={noWith} />
            ) : (
              <Withdraw
                type="businessAccounts"
                id={businessAccount.id}
                data={withdrawData}
              />
            )}
          </div>
        </React.Fragment>
      ) : (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>{createBusiness.title}</AlertTitle>
          <AlertDescription>{createBusiness.desc}</AlertDescription>
          <Create className="pt-6" create={createBusiness} />
        </Alert>
        // <BusinessAccountDrawerDialog create={createBusiness} />
      )}
    </React.Fragment>
  );
}
