"use client";

import Link from "next/link";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MainNavItem } from "@/types";

interface FooterNavProps {
  items: MainNavItem[];
}

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MainNavItem[];
  pathname: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FooterLinkProps extends React.PropsWithChildren {
  href: string;
  disabled?: boolean;
}

const FooterNav = ({ items }: FooterNavProps) => {
  const validItems = items.filter((item) => item.items.length > 0);

  return (
    <section className="container max-w-screen-xl">
      <nav className="flex flex-wrap justify-center gap-x-2.5 gap-y-0.5">
        {validItems.map((item) =>
          item.items.map((subItem, subIndex) => (
            <FooterLink
              key={subIndex}
              href={subItem.href}
              disabled={subItem.disabled}
            >
              {subItem.title}
            </FooterLink>
          ))
        )}
      </nav>
    </section>
    // <section className="container grid gap-4 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-4">
    //   {validItems.map((item, index) => (
    //     <nav className="space-y-0.5 text-center" key={index}>
    //       {/* Title of the item */}
    //       <h3 className="text-brand text-base md:text-lg font-semibold tracking-tight">
    //         {item.title}
    //       </h3>
    //       {/* Render sub-items */}
    //       <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5">
    //         {item.items.map((subItem, subIndex) => (
    //           <FooterLink
    //             key={subIndex}
    //             href={subItem.href}
    //             disabled={subItem.disabled}
    //           >
    //             {subItem.title}
    //           </FooterLink>
    //         ))}
    //       </div>
    //     </nav>
    //   ))}
    // </section>
  );
};

function FooterLink({ children, href, disabled }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          variant: "link",
          //   className: "w-min pl-0 h-auto py-1",
          className: `w-min px-0 h-auto py-1 text-xs text-foreground/85 ${
            disabled && "pointer-events-none opacity-60"
          }`,
        })
      )}
    >
      {children}
    </Link>
  );
}

export { FooterNav };
