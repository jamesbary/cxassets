import { redirect } from "next/navigation";

import { appConfig } from "@/config";
import initTranslations from "@/lib/i18n";
import { getCachedSession } from "@/lib/queries/auth";
import type { SideNavItem } from "@/types";
import type { Block, Upload } from "@/types/dash";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { DynamicBreadcrumbs } from "@/components/shared/dynamic-breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
// import { DynamicBreadcrumbs } from "@/components/shared/breadcrumb";

const i18nNamespaces = ["dash", "nav"];
// const i18nNamespaces = ["dash", "nav", "breadcrumbs"];
export default async function DashboardLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { t } = await initTranslations(locale, i18nNamespaces);

  const session = await getCachedSession();

  // if (!session?.user) return;
  if (!session?.user) redirect(appConfig.auth.signin.href);
  const status = session.user.status;
  const user = session.user;

  const notActiveData = t("block", { returnObjects: true }) as Block;
  const meta = t("meta.upload", { returnObjects: true }) as Upload;

  const translatedSidebarNav = t("sidebarNav", {
    returnObjects: true,
    ns: "nav",
  }) as SideNavItem[];

  const breadcrumbLabels = t("breadcrumbs", {
    returnObjects: true,
    ns: "breadcrumbs",
  });

  return (
    <SidebarProvider>
      <AppSidebar user={user} locale={locale} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {/* <DynamicBreadcrumbs /> */}
            {locale === "en" && <DynamicBreadcrumbs />}
            {/* <DynamicBreadcrumbs 
              labels={breadcrumbLabels} 
              t={(key) => t(key, { ns: "breadcrumbs" })}
            /> */}
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
