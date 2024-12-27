import initTranslations from "@/lib/i18n";

import { CreateForm } from "@/app/[locale]/(protected)/settings/create-pin/_components/create-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Card as CardType } from "@/types/dash";

type Props = React.HTMLAttributes<HTMLElement> & { locale: string };

const i18nNamespaces = ["dash"];

const Create = async ({ locale, className, ...props }: Props) => {
  const { t } = await initTranslations(locale, i18nNamespaces);

  const cardData = t("card", { returnObjects: true }) as CardType;
  const createData = cardData.pin.create;

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>{createData.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateForm data={createData} />
      </CardContent>
    </Card>
  );
};

export { Create };
