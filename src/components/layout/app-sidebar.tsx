import type { User } from "next-auth";
import * as React from "react";

import { AuthUser } from "@/components/layout/auth-user";
import { NavAccounts } from "@/components/layout/dashboard-accounts";
import { NavDashboard } from "@/components/layout/dashboard-main";
import { NavSecondary } from "@/components/layout/dashboard-secondary";
import { Icons } from "@/components/shared/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { appConfig } from "@/config";
import initTranslations from "@/lib/i18n";
import type {
  AccountNavItem,
  DashNavItem,
  SecondNavItem,
  UserNavItem,
} from "@/types";
import { Signout } from "@/types/auth";

const i18nNamespaces = ["nav", "auth"];

export async function AppSidebar({
  user,
  locale,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: User; locale: string }) {
  const { t } = await initTranslations(locale, i18nNamespaces);

  const translatedSidebarNav = t("sidebarNav", {
    returnObjects: true,
  }) as DashNavItem[];
  const translatedSecondaryNav = t("navSecondary", {
    returnObjects: true,
  }) as SecondNavItem[];
  const translatedAccountNav = t("accounts", {
    returnObjects: true,
  }) as AccountNavItem[];

  const translatedUserNav = t("userNav", {
    returnObjects: true,
  }) as UserNavItem[];
  const translatedSignout = t("signout", {
    returnObjects: true,
    ns: "auth",
  }) as Signout;

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Icons.logo className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {appConfig.name}
                  </span>
                  {/* <span className="truncate text-xs">Enterprise</span> */}
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavDashboard items={translatedSidebarNav} user={user} />
        <NavAccounts accounts={translatedAccountNav} />
        <NavSecondary items={translatedSecondaryNav} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <AuthUser
          user={user}
          dash={translatedSidebarNav[0].title}
          userNav={translatedUserNav}
          out={translatedSignout.title}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
