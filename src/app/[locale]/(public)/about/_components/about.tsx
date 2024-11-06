import { PageShell } from "@/components/shared/page-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { appConfig } from "@/config";
import initTranslations from "@/lib/i18n";
import type { Pages } from "@/types";
import { type AboutData } from "@/types/about";

type AboutProps = { locale: string };

const i18nNamespaces = ["about", "home"];
const About = async ({ locale }: AboutProps) => {
  const { t } = await initTranslations(locale, i18nNamespaces);

  const pageData = t("pages", { returnObjects: true, ns: "home" }) as Pages;

  const aboutData = {
    story: t("story", { returnObjects: true }),
    values: t("values", { returnObjects: true }),
    team: t("team", { returnObjects: true }),
    whyus: t("whyus", { returnObjects: true }),
  } as AboutData;
  return (
    <PageShell
      title={pageData.about.title}
      description={pageData.about.description}
      bgImage="/assets/hero/banner-1.jpeg"
      contentClassName="container"
    >
      <div className="space-y-3">
        <h3 className={"text-2xl font-semibold leading-none tracking-tight"}>
          {aboutData.story.title}
        </h3>
        <p className="">{aboutData.story.description}</p>
      </div>
      <Card className="border-border/50 shadow-none">
        <CardHeader className="pb-3 sm:pb-3">
          <CardTitle>{aboutData.values.title}</CardTitle>
          <CardDescription>{aboutData.values.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {aboutData.values.items.map((value) => (
              <Card key={value.title} className="bg-background shadow-none">
                <CardContent className="space-y-1.5 pt-4 sm:pt-6">
                  <h4>{value.title}</h4>
                  <p className="text-sm line-clamp-3">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-background text-foreground border-border/50 shadow-none">
        <CardHeader className="pb-3 sm:pb-3">
          <CardTitle>{aboutData.team.title}</CardTitle>
          <CardDescription>{aboutData.team.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {aboutData.team.items.map((team) => (
              <Card key={team.title} className="bg-background shadow-none">
                <CardContent className="space-y-1.5 pt-4 sm:pt-6">
                  <h4>{team.title}</h4>
                  <p className="text-sm line-clamp-3">{team.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-background text-foreground border-border/50 shadow-none">
        <CardHeader className="pb-3 sm:pb-3">
          <CardTitle>{aboutData.whyus.title}</CardTitle>
          <CardDescription>
            {appConfig.name} {aboutData.whyus.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {aboutData.whyus.items.map((team) => (
              <Card key={team.title} className="bg-background shadow-none">
                <CardContent className="space-y-1.5 pt-4 sm:pt-6">
                  <h4>{team.title}</h4>
                  <p className="text-sm line-clamp-3">{team.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
};

export { About };
