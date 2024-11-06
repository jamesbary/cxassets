"use client";

import { ChevronsUpDown, LogOutIcon } from "lucide-react";
import type { User } from "next-auth";
import Link from "next/link";

import { Icons } from "@/components/shared/icons";
import { UserAvatar } from "@/components/shared/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { appConfig } from "@/config";
import { type UserNavItem } from "@/types";
import React from "react";

type AuthUserProps = React.ComponentPropsWithRef<typeof DropdownMenuTrigger> & {
  user: User;
  dash: string;
  userNav: UserNavItem[];
  out: string;
};

const AuthUser = ({
  user,
  dash,
  userNav,
  out,
  className,
  ...props
}: AuthUserProps) => {
  const email = user?.email ?? "";
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserAvatar user={user} inline />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserAvatar user={user} />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {userNav.map((item, index) => {
                if (user.role === "admin" || user.role === item.role) {
                  const { href, title, icon, cmd } = item as UserNavItem;
                  const Icon = Icons[icon];
                  return (
                    <DropdownMenuItem
                      key={index}
                      asChild
                      className="hover:cursor-pointer"
                    >
                      <Link href={href}>
                        <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
                        {title}
                        <DropdownMenuShortcut>{cmd}</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                  );
                }
              })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="hover:cursor-pointer">
              <Link href={appConfig.auth.signout.href}>
                <LogOutIcon className="mr-2 size-4" aria-hidden="true" />
                {out}
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export { AuthUser };
