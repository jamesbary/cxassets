import { Notfound } from "@/components/shared/notfound";
import { Shell } from "@/components/shared/shell";
import { buttonVariants } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import type { Sub } from "@/types/common";
import { GitCommitVertical } from "lucide-react";
import Link from "next/link";

const i18nNamespaces = ["dynamic"];
export default async function Page({
  params,
}: {
  params: { pageId: string; locale: string };
}) {
  const locale = params.locale;
  const { t } = await initTranslations(locale, i18nNamespaces);
  const translatedSubs = t("sub", { returnObjects: true }) as Sub[];

  const menu = translatedSubs.find((menu) => menu.tag === params.pageId);
  if (!menu) return <Notfound locale={locale} />;
  return (
    <main>
      <Shell className="max-w-screen-xl">
        <Card>
          <CardHeader className="space-y-2.5">
            <CardTitle className="text-primary">{menu.title}</CardTitle>
            <CardDescription className="text-foreground/85">
              {menu.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="pl-6 space-y-1.5 text-foreground/75">
              {menu.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <GitCommitVertical className="h-4" /> {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2.5">
            <p className="text-sm text-foreground/80">{menu.calltoaction}</p>
            <Link
              className={cn(
                buttonVariants({ size: "sm", className: "w-full sm:w-1/3" })
              )}
              href={appConfig.entry.href}
            >
              Get Started
            </Link>
          </CardFooter>
        </Card>
      </Shell>
    </main>
  );
}
