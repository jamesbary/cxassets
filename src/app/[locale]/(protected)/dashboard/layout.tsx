import { redirect } from "next/navigation";

import { appConfig } from "@/config";
import { getCachedSession } from "@/lib/queries/auth";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { DynamicBreadcrumbs } from "@/components/shared/dynamic-breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default async function DashboardLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await getCachedSession();

  if (!session?.user) redirect(appConfig.auth.signin.href);
  const user = session.user;

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
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
