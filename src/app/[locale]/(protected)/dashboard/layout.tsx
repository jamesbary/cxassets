import { redirect } from "next/navigation";

import { appConfig } from "@/config";
import { getCachedSession } from "@/lib/queries/auth";

import { NotActive } from "@/app/[locale]/(protected)/dashboard/_components/not-active";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { DynamicBreadcrumbs } from "@/components/shared/dynamic-breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import initTranslations from "@/lib/i18n";
import { Block } from "@/types/dash";

export default async function DashboardLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { t } = await initTranslations(locale, ["dash", "home"]);
  const session = await getCachedSession();

  if (!session?.user) redirect(appConfig.auth.signin.href);
  const user = session.user;
  const status = session.user.status;

  const data = t("block", { ns: "dash", returnObjects: true }) as Block;

  const placeholder = t("home_support", {
    ns: "home",
    returnObjects: true,
  }) as {
    email: string;
    message: string;
    send: string;
    success: string;
    cancel: string;
  };

  return (
    <SidebarProvider>
      <AppSidebar user={user} locale={locale} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {locale === "en" && <DynamicBreadcrumbs />}
          </div>
        </header>
        {status === "active" ? (
          <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
          </main>
        ) : (
          <NotActive
            email={session.user.email}
            data={data}
            placeholder={placeholder}
          />
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
