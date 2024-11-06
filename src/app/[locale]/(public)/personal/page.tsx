import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { appConfig } from "@/config";
import { addHrefProperties, cn } from "@/lib/utils";
import Link from "next/link";

// export const metadata: Metadata = {
//   title: `Personal Banking`,
// };

import { PageShell } from "@/components/shared/page-shell";
import initTranslations from "@/lib/i18n";
import { MainNavItem } from "@/types";
import type { Service } from "@/types/common";

const i18nNamespaces = ["common", "nav"];
export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t } = await initTranslations(locale, i18nNamespaces);
  const translatedServices = t("services", {
    returnObjects: true,
  }) as Service[];
  const translatedNavItems = t("mainNav", {
    returnObjects: true,
    ns: "nav",
  }) as MainNavItem[];

  const navItemsWithHrefs = addHrefProperties(
    translatedNavItems,
    appConfig.mainNav
  );

  const personal = translatedServices.find(
    (service) => service.href === "/personal"
  );
  const personalMenu = navItemsWithHrefs[0];
  return (
    <main>
      <PageShell
        title={personal?.title}
        description={personal?.description}
        bgImage="/assets/hero/long-3.jpeg"
        contentClassName="container"
      >
        <div className="grid gap-4 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {personal?.items.map((service) => {
            return (
              <Card key={service.title} className="flex flex-col">
                <CardHeader className="pb-3 sm:pb-3">
                  <CardDescription className="self-end"></CardDescription>
                  <CardTitle className="text-primary">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-5 text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-3">
          {personalMenu.items?.map(({ items, title }, i) => {
            return (
              <Card key={title + i} className="flex flex-col">
                <CardHeader className="pb-3 sm:pb-3">
                  <CardTitle className="text-primary text-xl">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex gap-2 flex-wrap">
                  {items.map((item, i) => (
                    <Link
                      className={cn(
                        buttonVariants({
                          className: "justify-start flex-1",
                          variant: "secondary",
                        })
                      )}
                      key={i}
                      href={item.href ?? ""}
                    >
                      {item.title}
                    </Link>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </PageShell>
    </main>
  );
}
