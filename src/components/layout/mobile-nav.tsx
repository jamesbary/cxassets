"use client";

import { ChevronDownIcon, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { Icons } from "@/components/shared/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { appConfig } from "@/config";
import { cn } from "@/lib/utils";
import type { MainNavItem } from "@/types";

interface MobileNavProps {
  items: MainNavItem[];
}

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MainNavItem[];
  pathname: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MobileLinkProps extends React.PropsWithChildren {
  href: string;
  disabled?: boolean;
  pathname: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNav = ({ items }: MobileNavProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-6 bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <LayoutDashboard className="size-5" aria-hidden="true" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="px-0 py-4">
        <div className="w-full px-4 text-primary">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Icons.logo className="mr-1 size-5" aria-hidden="true" />
            <span className="font-bold xs:hidden">{appConfig.short}</span>
            <span className="hidden font-bold xs:inline-block">
              {appConfig.name}
            </span>
            <span className="sr-only">Home</span>
          </Link>
        </div>
        <ScrollArea className="mt-3 h-[calc(100vh-4.25rem)] h-[calc(100dvh-4.25rem)] pl-4">
          <div className="pr-4">
            <MainNav items={items} pathname={pathname} setIsOpen={setIsOpen} />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

const MainNav = ({
  items,
  pathname,
  setIsOpen,
  className,
  ...props
}: NavProps) => {
  const initialOpenItems = items.reduce((acc, item, index) => {
    if (item.items.length > 0) {
      acc[`${index}`] = true;
    }
    return acc;
  }, {} as { [key: string]: boolean });

  const [openItems, setOpenItems] = React.useState<{ [key: string]: boolean }>(
    initialOpenItems
  );

  const toggleSubMenu = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderNavItems = (items: MainNavItem[], parentKey = "") => {
    return items.map((item, index) => {
      const key = parentKey ? `${parentKey}-${index}` : `${index}`;

      return (
        <React.Fragment key={key}>
          {item.items.length === 0 ? (
            <MobileLink
              key={parentKey}
              href={item.href}
              pathname={pathname}
              setIsOpen={setIsOpen}
            >
              {item.title}
            </MobileLink>
          ) : (
            <Collapsible
              open={openItems[key]}
              onOpenChange={() => toggleSubMenu(key)}
            >
              <CollapsibleTrigger asChild className="transition-all">
                <Button
                  variant={pathname.includes(item.href) ? "secondary" : "ghost"}
                  className="w-full items-center gap-1.5 px-2"
                >
                  {item.title}
                  <ChevronDownIcon
                    className={cn(
                      "size-4 ml-auto transition-transform",
                      openItems[key] ? "rotate-180" : ""
                    )}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent
                className={cn("flex flex-col gap-0.5 pl-4 pt-0.5")}
              >
                {renderNavItems(item.items, key)}
              </CollapsibleContent>
            </Collapsible>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <nav className={cn("space-y-1.5", className)} {...props}>
      {renderNavItems(items)}
    </nav>
  );
};

function MobileLink({
  children,
  href,
  disabled,
  pathname,
  setIsOpen,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          variant: href === pathname ? "secondary" : "ghost",
          className: `px-2 justify-start gap-1.5 w-full ${
            disabled && "pointer-events-none opacity-60"
          }`,
        })
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );
}

export { MobileNav };
