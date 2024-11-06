import { type Icons as IconType, Icons } from "@/components/shared/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import initTranslations from "@/lib/i18n";

type FeaturesProps = { locale: string };
const i18nNamespaces = ["home"];

interface FeaturesDataItem {
  title: string;
  description: string;
  icon: string;
}

interface FeaturesData {
  heading: string;
  description: string;
  items: FeaturesDataItem[];
}

const Features = async ({ locale }: FeaturesProps) => {
  const { t } = await initTranslations(locale, i18nNamespaces);

  const featuresData = t("features", { returnObjects: true }) as FeaturesData;

  return (
    <section className="relative z-10 container space-y-4 sm:space-y-6 lg:space-y-8 py-8 sm:py-16">
      <div className="space-y-2 text-center">
        <h2 className="text-light tracking-normal">{featuresData.heading}</h2>
        <p className="text-light/85 text-balance leading-normal text-base sm:text-lg">
          {featuresData.description}
        </p>
      </div>
      <div className="grid gap-4 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {featuresData.items.map((feature, i) => {
          const Icon = Icons[feature.icon as IconType];
          return (
            <Card className="bg-slate-800/85 border-brand/20" key={i}>
              <CardHeader className="pb-3 sm:pb-3 items-center text-brand text-center">
                <CardDescription className="border border-brand rounded-full p-2.5 text-brand">
                  <Icon className="size-6" />
                </CardDescription>
                <CardTitle className="text-lg md:text-xl font-semibold tracking-tight">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm line-clamp-6 text-center text-light/85">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export { Features };
