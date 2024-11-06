"use client";

import { type MainNavItem } from "@/types";
import Link from "next/link";
import * as React from "react";

import { Icons } from "@/components/shared/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface MainNavProps {
  items: MainNavItem[];
  blur?: boolean;
}

const MainNav = ({ items, blur = false }: MainNavProps) => {
  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        {items.map((item, index) => {
          const Icon = Icons[item.icon ?? "account"];

          return item.items.length === 0 ? (
            <NavigationMenuItem key={item.title}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    blur && "bg-transparent hover:bg-accent/10",
                    "font-semibold md:text-sm lg:text-base h-auto"
                  )}
                >
                  {item.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={index}>
              <NavigationMenuTrigger
                className={cn(
                  blur && "bg-transparent hover:bg-accent/10",
                  "font-semibold md:text-sm lg:text-base h-auto capitalize"
                )}
              >
                {item.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="space-y-1 p-4 lg:p-6 md:w-[500px] lg:w-[700px]">
                  <li className="mb-3">
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex size-full select-none rounded-md pt-10 no-underline outline-none focus:shadow-md bg-[url('/assets/hero/long-2.jpeg')] bg-cover bg-center"
                        )}
                      >
                        {item.icon && (
                          <Icon
                            className="size-9 text-brand"
                            aria-hidden="true"
                          />
                        )}
                        <div className="bg-slate-800/90 py-6 px-8 rounded-md text-2xl font-bold text-brand">
                          {item.title}
                        </div>
                        {item.description && (
                          <p className="text-sm leading-tight text-muted-foreground">
                            {item.description}
                          </p>
                        )}
                        <span className="sr-only">{item.title}</span>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {item.items.map((item) => (
                    <MenuItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </MenuItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const MenuItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={String(href)}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-base font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
MenuItem.displayName = "MenuItem";

export { MainNav };
