import Link from "next/link";
import * as React from "react";

import { FooterNav } from "@/components/layout/footer-nav";
import { ModeToggle } from "@/components/shared/theme";
import { Separator } from "@/components/ui/separator";
import { appConfig } from "@/config";
import initTranslations from "@/lib/i18n";
import { addHrefProperties, cn } from "@/lib/utils";
import { NavItemWithOptionalChildren, Pages } from "@/types";

const i18nNamespaces = ["home", "nav"];

const Footer = async ({ locale }: { locale: string }) => {
  const { t } = await initTranslations(locale, i18nNamespaces);

  const pageData = t("pages", { returnObjects: true }) as Pages;

  const translatedNavItems = t("mainNav", {
    returnObjects: true,
    ns: "nav",
  }) as NavItemWithOptionalChildren[];

  const navItemsWithHrefs = addHrefProperties(
    translatedNavItems,
    appConfig.mainNav
  );

  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-border/50 pb-4 sm:pb-6 pt-8 sm:pt-16 space-y-2.5">
      <FooterNav items={navItemsWithHrefs} />

      <section className="container text-muted-foreground flex flex-col items-center xs:flex-row xs:justify-between text-xs leading-tight">
        <div className="flex items-center">
          <span className="mr-1">&copy; {year}</span>
          <Link href={"/"} className="transition-colors hover:text-foreground">
            <span className="xs:hidden">{appConfig.short}</span>
            <span className="hidden xs:inline-block">{appConfig.name} ltd</span>
            <span className="sr-only">Home</span>
          </Link>

          {/* Dynamically render links from pageData */}
          {Object.values(pageData).map((page, index) => (
            <React.Fragment key={page.href}>
              <Separator orientation="vertical" className="h-4 mx-1.5" />
              <Link
                href={page.href}
                className={cn("transition-colors hover:text-foreground")}
              >
                {page.title}
                <span className="sr-only">{page.title}</span>
              </Link>
            </React.Fragment>
          ))}
        </div>

        <ModeToggle />
      </section>
    </footer>
  );
};

export { Footer };
