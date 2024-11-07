import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SelectLanguage } from "@/components/layout/select-language";
import TranslationsProvider from "@/components/providers/translation";
import { Icons } from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import { appConfig } from "@/config";
import initTranslations from "@/lib/i18n";
import { addHrefProperties, cn } from "@/lib/utils";
import { DashNavItem, NavItemWithOptionalChildren } from "@/types";
import type { User } from "next-auth";
import Link from "next/link";

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  user?: User;
  dashboard?: boolean;
  blur?: boolean;
  locale: string;
};

const i18nNamespaces = ["nav"];

const Header = async ({
  user,
  dashboard = false,
  blur,
  locale,
  className,
  ...props
}: HeaderProps) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const translatedNavItems = t("mainNav", {
    returnObjects: true,
  }) as NavItemWithOptionalChildren[];
  const translatedSidebarNav = t("sidebarNav", {
    returnObjects: true,
  }) as DashNavItem[];

  const navItemsWithHrefs = addHrefProperties(
    translatedNavItems,
    appConfig.mainNav
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b",
        blur
          ? "border-border/20 bg-background/5 backdrop-blur-lg"
          : "border-border/50 bg-background",
        className
      )}
      {...props}
    >
      <div className="container py-4 sm:py-6 flex items-center gap-3">
        <Link href={"/"} className={cn("hidden md:inline-flex gap-1")}>
          <Icons.logo aria-hidden="true" className="size-8" />

          <span className="sr-only">Home</span>
        </Link>
        <MainNav items={navItemsWithHrefs} blur={blur} />
        <MobileNav items={navItemsWithHrefs} />
        <div className={cn("ml-auto flex items-center", user && "gap-4")}>
          <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
          >
            <SelectLanguage user={user} />
          </TranslationsProvider>
          <nav className="flex items-center">
            <Link
              href={appConfig.entry.href}
              className={cn(
                buttonVariants({
                  className: "hidden lg:inline-flex rounded-sm",
                })
              )}
            >
              {translatedSidebarNav[0].title}
              <span className="sr-only">{appConfig.entry.title}</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export { Header };
