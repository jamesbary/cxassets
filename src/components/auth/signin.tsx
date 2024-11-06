import Link from "next/link";

import { SigninForm } from "@/components/auth/signin-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { appConfig } from "@/config";
import initTranslations from "@/lib/i18n";
import { AuthData } from "@/types/auth";

const i18nNamespaces = ["auth"];

const Signin = async ({ locale }: { locale: string }) => {
  const { t } = await initTranslations(locale, i18nNamespaces);
  const authData = {
    common: t("common", { returnObjects: true }),
    signin: t("signin", { returnObjects: true }),
    signup: t("signup", { returnObjects: true }),
    message: t("message", { returnObjects: true }),
    placeholder: t("placeholder", { returnObjects: true }),
  } as AuthData;

  const auth = {
    send: authData.signin.link,
    username: authData.placeholder.nameOrEmail,
    message: authData.message,
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl xs:text-2xl">
          {authData.signin.title}
        </CardTitle>
        <CardDescription className="text-xs xs:text-sm">
          {authData.signin.desc}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <SigninForm auth={auth} />
      </CardContent>
      <CardFooter>
        <div className="text-xs xs:text-sm text-muted-foreground">
          <span className="mr-1 hidden sm:inline-block">
            {authData.signin.sub}
          </span>
          <Link
            aria-label={appConfig.auth.signup.title}
            href={appConfig.auth.signup.href}
            replace
            className="text-primary underline-offset-4 transition-colors hover:underline"
          >
            {authData.signup.link}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export { Signin };
