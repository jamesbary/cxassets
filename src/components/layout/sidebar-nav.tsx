"use client";

import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

import { Upload } from "@/app/[locale]/(protected)/dashboard/_components/upload-button";
import { Icons } from "@/components/shared/icons";
import { UserAvatar } from "@/components/shared/user-avatar";
import { cn } from "@/lib/utils";
import type { SideNavItem } from "@/types";
import type { Upload as UType } from "@/types/dash";
import { User } from "next-auth";

export interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SideNavItem[];
  user: User;
  upload: UType;
}

const SidebarNav = ({
  items,
  user,
  upload,
  className,
  ...props
}: SidebarNavProps) => {
  const segment = useSelectedLayoutSegment();
  const path = usePathname();

  if (!items?.length) return null;

  return (
    <div className={cn("flex w-full flex-col gap-2", className)} {...props}>
      <div className="relative mb-1 lg:mb-2">
        <UserAvatar
          user={user}
          avatarClassName="w-full h-auto"
          iconClassName="w-full h-auto"
          fallbackClassName="rounded-lg"
        />
        {!user.image ? (
          <Upload
            upload={upload}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2"
          />
        ) : // <Capture className="absolute inset-x-0 top-1/2 -translate-y-1/2" />
        null}
      </div>
      {items.map((item, index) => {
        const Icon = item.icon ? Icons[item.icon] : ChevronLeftIcon;

        return item.href ? (
          <Link aria-label={item.name} key={index} href={item.href}>
            <span
              className={cn(
                "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground",
                path === item.href
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>{item.name}</span>
            </span>
          </Link>
        ) : (
          <span
            key={index}
            className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
          >
            {item.name}
          </span>
        );
      })}
    </div>
  );
};

export { SidebarNav };
