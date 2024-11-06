import { Fund } from "@/app/[locale]/(protected)/admin/_components/fund";
import { Icons } from "@/components/shared/icons";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatAmount } from "@/lib/utils";
import { AdminUser } from "@/types";

type Props = React.HTMLAttributes<HTMLElement> & {
  user: AdminUser;
};
const Cards = ({ user, className, ...props }: Props) => {
  const checkingAccount = user.personalCheckingAccount;
  const savingsAccount = user.personalSavingsAccount;
  const businessAccount = user.businessAccount;
  return (
    <section className={cn("grid gap-4 lg:grid-cols-3", className)} {...props}>
      <Card>
        <CardHeader className="flex-row justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold">
            {user.name ?? "Personal Checking Account"}
          </CardTitle>
          {checkingAccount ? (
            <Badge
              variant={
                checkingAccount.status === "active" ? "active" : "destructive"
              }
            >
              {checkingAccount.status}
            </Badge>
          ) : (
            <Icons.billing className="h-6 w-6" />
          )}
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold mb-4">
            {checkingAccount ? formatAmount(checkingAccount.balance) : "******"}
          </p>
          <p className="text-xl font-bold text-center">
            {checkingAccount ? checkingAccount.number : "..."}
          </p>
        </CardContent>
        {checkingAccount ? (
          <CardFooter>
            <Fund
              id={checkingAccount.id}
              number={checkingAccount.number}
              type="personalCheckingAccounts"
            />
          </CardFooter>
        ) : null}
      </Card>
      <Card>
        <CardHeader className="flex-row justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold">
            {user.name ?? "Personal Savings Account"}
          </CardTitle>
          {savingsAccount ? (
            <Badge
              variant={
                savingsAccount.status === "active" ? "active" : "destructive"
              }
            >
              {savingsAccount.status}
            </Badge>
          ) : (
            <Icons.wallet className="h-6 w-6" />
          )}
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold mb-4">
            {savingsAccount ? formatAmount(savingsAccount.balance) : "******"}
          </p>
          <p className="text-xl font-bold text-center">
            {savingsAccount ? savingsAccount.number : "..."}
          </p>
        </CardContent>
        {savingsAccount ? (
          <CardFooter>
            <Fund
              id={savingsAccount.id}
              number={savingsAccount.number}
              type="personalSavingsAccounts"
            />
          </CardFooter>
        ) : null}
      </Card>
      <Card>
        <CardHeader className="flex-row justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold">
            {businessAccount?.businessName ?? "Business Account"}
          </CardTitle>
          {businessAccount ? (
            <Badge
              variant={
                businessAccount.status === "active" ? "active" : "destructive"
              }
            >
              {businessAccount.status}
            </Badge>
          ) : (
            <Icons.analytics className="h-6 w-6" />
          )}
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold mb-4">
            {businessAccount ? formatAmount(businessAccount.balance) : "******"}
          </p>
          <p className="text-xl font-bold text-center">
            {businessAccount ? businessAccount.number : "..."}
          </p>
        </CardContent>
        {businessAccount ? (
          <CardFooter>
            <Fund
              id={businessAccount.id}
              number={businessAccount.number}
              type="businessAccounts"
            />
          </CardFooter>
        ) : null}
      </Card>
    </section>
  );
};

export { Cards };
