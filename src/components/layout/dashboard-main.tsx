"use client";

import { ChevronRight } from "lucide-react";
import type { User } from "next-auth";
import { usePathname } from "next/navigation";
import * as React from "react";

import { Icons } from "@/components/shared/icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { DashNavItem } from "@/types";

// Helper function to remove language prefix and check if a path matches a nav item
const normalizePath = (path: string) => {
  // Remove the language code at the start if it exists (e.g., "/es/dashboard" -> "/dashboard")
  return path.replace(/^\/[a-z]{2}(\/|$)/, "/");
};

// // Helper function to check if a path matches a nav item
// const isPathActive = (itemPath: string, currentPath: string) => {
//   // Handle exact matches and subpaths
//   return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
// };

// // Helper function to process nav items and set active state
// const processNavItems = (
//   items: DashNavItem[],
//   currentPath: string
// ): DashNavItem[] => {
//   return items.map((item) => ({
//     ...item,
//     isActive: isPathActive(item.href, currentPath),
//     items: item.items.map((subItem) => ({
//       ...subItem,
//       isActive: isPathActive(subItem.href, currentPath),
//     })),
//   }));
// };

const isPathActive = (itemPath: string, currentPath: string) => {
  const normalizedCurrentPath = normalizePath(currentPath);
  const normalizedItemPath = normalizePath(itemPath);
  return (
    normalizedCurrentPath === normalizedItemPath ||
    normalizedCurrentPath.startsWith(`${normalizedItemPath}/`)
  );
};

// Helper function to process nav items and set active state
const processNavItems = (
  items: DashNavItem[],
  currentPath: string
): DashNavItem[] => {
  return items.map((item) => ({
    ...item,
    isActive: isPathActive(item.href, currentPath),
    items: item.items.map((subItem) => ({
      ...subItem,
      isActive: isPathActive(subItem.href, currentPath),
    })),
  }));
};

export function NavDashboard({
  items,
  user,
}: {
  items: DashNavItem[];
  user: User;
}) {
  const pathname = usePathname();

  // Process nav items with current path to set active states
  const processedNavMain = React.useMemo(
    () => processNavItems(items, pathname),
    [pathname]
  );
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Core</SidebarGroupLabel>
      <SidebarMenu>
        {processedNavMain
          .filter((item) => user.role === "admin" || user.role === item.role)
          .map((item) => {
            const Icon = Icons[item.icon ?? "account"];
            return (
              <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.href}>
                      {item.icon && <Icon />}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.slice(0, 1).map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.href}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
        {/* {processedNavMain.map((item) => {
          if (user.role === "admin" || user.role === item.role) {
            const Icon = Icons[item.icon ?? "account"];
            return (
              <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.href}>
                      {item.icon && <Icon />}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.href}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            );
          }
        })} */}
      </SidebarMenu>
    </SidebarGroup>
  );
}
