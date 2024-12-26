import { AlertTransfer } from "@/app/[locale]/(protected)/dashboard/_components/alert-transfer";
import { AlertWithdraw } from "@/app/[locale]/(protected)/dashboard/_components/alert-withdraw";
import { BusinessAccountDrawerDialog } from "@/app/[locale]/(protected)/dashboard/_components/business-account";
import { CheckingAccountDrawerDialog } from "@/app/[locale]/(protected)/dashboard/_components/checking-account";
import { SavingsAccountDrawerDialog } from "@/app/[locale]/(protected)/dashboard/_components/savings-account";
import { Transfer } from "@/app/[locale]/(protected)/dashboard/_components/transfer";
import { Withdraw } from "@/app/[locale]/(protected)/dashboard/_components/withdraw";
import { Icons } from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  BusinessAccount,
  CheckingAccount,
  SavingsAccount,
} from "@/db/schema";
import initTranslations from "@/lib/i18n";
import { cn, formatAmount } from "@/lib/utils";
import type { Card as CardType, DashData, Message } from "@/types/dash";
import Link from "next/link";

type Props = React.HTMLAttributes<HTMLElement> & {
  checkingAccount?: CheckingAccount;
  savingsAccount?: SavingsAccount;
  businessAccount?: BusinessAccount;
  locale: string;
};

const i18nNamespaces = ["dash"];

const Cards = async ({
  checkingAccount,
  savingsAccount,
  businessAccount,
  locale,
  className,
  ...props
}: Props) => {
  const { t } = await initTranslations(locale, i18nNamespaces);

  const dashData = {
    common: t("common", { returnObjects: true }),
    savings: t("savings", { returnObjects: true }),
    checking: t("checking", { returnObjects: true }),
    business: t("business", { returnObjects: true }),
  } as DashData;

  const cardData = t("card", { returnObjects: true }) as CardType;
  const messageData = t("message", { returnObjects: true }) as Message;

  const notEnough = {
    ...cardData.notEnough,
    btn: cardData.transfer,
  };

  const data = {
    transCard: cardData.transCard,
    message: messageData,
    type: {
      checking: dashData.common.checking,
      savings: dashData.common.savings,
      business: dashData.common.business,
    },
  };

  const withdrawData = {
    withdrawCard: cardData.withdrawCard,
    message: messageData,
    type: {
      checking: dashData.common.checking,
      savings: dashData.common.savings,
      business: dashData.common.business,
    },
  };

  const createChecking = {
    ...dashData.checking.create,
    action: dashData.common.action,
  };
  const createSavings = {
    ...dashData.savings.create,
    action: dashData.common.action,
  };
  const createBusiness = {
    ...dashData.business.create,
    action: dashData.common.action,
  };

  const noWith = {
    ...cardData.notEnough,
    btn: cardData.withdraw,
  };

  return (
    <section className={cn("grid gap-4 lg:grid-cols-3", className)} {...props}>
      <Card>
        <CardHeader className="flex-row justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold">
            {dashData.common.checking}
          </CardTitle>
          <Icons.billing className="h-6 w-6" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold mb-4">
            {checkingAccount ? formatAmount(checkingAccount.balance) : "******"}
          </p>
          {checkingAccount ? (
            <div className="flex gap-3 justify-between">
              {Number(checkingAccount.balance) <= 0 ? (
                <AlertTransfer data={notEnough} />
              ) : (
                <Transfer
                  type="personalCheckingAccounts"
                  id={checkingAccount.id}
                  data={data}
                />
              )}
              {/* <WithdrawLink title={withdrawTitle} /> */}
              {Number(checkingAccount.balance) <= 0 ? (
                <AlertWithdraw data={noWith} />
              ) : (
                <Withdraw
                  type="personalCheckingAccounts"
                  id={checkingAccount.id}
                  data={withdrawData}
                />
              )}
              <Link
                href="/dashboard/checking"
                // href={`/dashboard/checking/${checkingAccount.id}`}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "w-full",
                  })
                )}
              >
                {dashData.common.details}
              </Link>
            </div>
          ) : (
            <CheckingAccountDrawerDialog create={createChecking} />
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex-row justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold">
            {dashData.common.savings}
          </CardTitle>
          <Icons.wallet className="h-6 w-6" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold mb-4">
            {savingsAccount ? formatAmount(savingsAccount.balance) : "******"}
          </p>
          {savingsAccount ? (
            <div className="flex gap-3 justify-between">
              {Number(savingsAccount.balance) <= 0 ? (
                <AlertTransfer data={notEnough} />
              ) : (
                <Transfer
                  type="personalSavingsAccounts"
                  id={savingsAccount.id}
                  data={data}
                />
              )}
              {/* <WithdrawLink title={withdrawTitle} /> */}
              {Number(savingsAccount.balance) <= 0 ? (
                <AlertWithdraw data={noWith} />
              ) : (
                <Withdraw
                  type="personalSavingsAccounts"
                  id={savingsAccount.id}
                  data={withdrawData}
                />
              )}
              <Link
                href="/dashboard/savings"
                // href={`/dashboard/savings/${savingsAccount.id}`}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "w-full",
                  })
                )}
              >
                {dashData.common.details}
              </Link>
            </div>
          ) : (
            <SavingsAccountDrawerDialog create={createSavings} />
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex-row justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold">
            {dashData.common.business}
          </CardTitle>
          <Icons.analytics className="h-6 w-6" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold mb-4">
            {businessAccount ? formatAmount(businessAccount.balance) : "******"}
          </p>
          {businessAccount ? (
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
              {/* <WithdrawLink title={withdrawTitle} /> */}
              {Number(businessAccount.balance) <= 0 ? (
                <AlertWithdraw data={noWith} />
              ) : (
                <Withdraw
                  type="businessAccounts"
                  id={businessAccount.id}
                  data={withdrawData}
                />
              )}
              <Link
                href="/dashboard/business"
                // href={`/dashboard/business/${businessAccount.id}`}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "w-full",
                  })
                )}
              >
                {dashData.common.details}
              </Link>
            </div>
          ) : (
            <BusinessAccountDrawerDialog create={createBusiness} />
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export { Cards };
