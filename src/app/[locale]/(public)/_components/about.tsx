import { Icons, type Icons as IconType } from "@/components/shared/icons";
import { Section } from "@/components/shared/section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import initTranslations from "@/lib/i18n";

type AboutProps = { locale: string };
const i18nNamespaces = ["home"];

interface AboutDataItem {
  title: string;
  description: string;
  icon: string;
}

interface AboutData {
  heading: string;
  description: string;
  items: AboutDataItem[];
}

const About = async ({ locale }: AboutProps) => {
  const { t } = await initTranslations(locale, i18nNamespaces);

  const aboutData = t("about", { returnObjects: true }) as AboutData;

  return (
    <section>
      <Section
        title={aboutData.heading}
        description={aboutData.description}
        href="/about"
        className="container max-w-screen-md"
        asChild
      >
        <div className="grid gap-4 sm:gap-6 lg:gap-8 sm:grid-cols-2">
          {aboutData.items.map((item, index) => {
            // Access icons from the Icons object using the `icon` field from JSON
            const IconComponent = Icons[item.icon as IconType] || Icons.account;

            return (
              <Card key={index} className="bg-transparent border-brand">
                <CardHeader className="pb-3 sm:pb-3 items-center text-brand text-center">
                  <CardDescription className="border border-brand rounded-full p-2.5 text-brand">
                    <IconComponent className="size-8" />
                  </CardDescription>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-6 text-muted-foreground text-center">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>
    </section>
  );
};

export { About };
