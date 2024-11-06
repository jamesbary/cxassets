import Link from "next/link";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { appConfig } from "@/config";
import initTranslations from "@/lib/i18n";
import type { Verify } from "@/types/auth";

const i18nNamespaces = ["auth"];
const Verify = async ({
  token,
  locale,
}: {
  token: string | undefined;
  locale: string;
}) => {
  const { t } = await initTranslations(locale, i18nNamespaces);
  const verifyData = t("verify", { returnObjects: true }) as Verify;
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl xs:text-2xl">
          {verifyData.title}
        </CardTitle>
        <CardDescription className="text-xs xs:text-sm">
          {verifyData.desc}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link
          aria-label={verifyData.cancel}
          href={appConfig.auth.signin.href}
          replace
          className="text-xs xs:text-sm text-primary underline-offset-4 transition-colors hover:underline"
        >
          {verifyData.cancel}
        </Link>
      </CardFooter>
    </Card>
  );
};

export { Verify };
