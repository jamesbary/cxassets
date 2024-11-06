import { SignoutButton } from "@/components/auth/signout-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import initTranslations from "@/lib/i18n";
import { type Signout } from "@/types/auth";

const Signout = async ({ locale }: { locale: string }) => {
  const { t } = await initTranslations(locale, ["auth"]);
  const translatedSignout = t("signout", {
    returnObjects: true,
  }) as Signout;
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl xs:text-2xl">
          {translatedSignout.title}
        </CardTitle>
        <CardDescription className="text-xs xs:text-sm">
          {translatedSignout.desc}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignoutButton
          auth={{
            title: translatedSignout.title,
            cancel: translatedSignout.cancel,
          }}
        />
      </CardContent>
    </Card>
  );
};

export { Signout };
