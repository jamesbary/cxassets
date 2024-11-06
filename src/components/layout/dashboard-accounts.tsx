"use client";

import {
  BookPlus,
  Folder,
  MoreHorizontal,
  Settings2,
  Share,
} from "lucide-react";

import { Icons } from "@/components/shared/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { AccountNavItem } from "@/types";

export function NavAccounts({ accounts }: { accounts: AccountNavItem[] }) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Accounts</SidebarGroupLabel>
      <SidebarMenu>
        {accounts.map((item) => {
          const Icon = Icons[item.icon] || Icons.account;
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <a href={item.href}>
                  {item.icon && <Icon />}
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <Folder className="text-muted-foreground" />
                    <a href={item.href}>
                      <span>{item.options.view}</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings2 className="text-muted-foreground" />
                    <span>{item.options.withdraw}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share className="text-muted-foreground" />
                    <span>{item.options.transfer}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <BookPlus className="text-muted-foreground" />
                    <span>{item.options.create}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
