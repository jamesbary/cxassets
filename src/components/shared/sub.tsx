import { Slot } from "@radix-ui/react-slot";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SubProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
  href: string;
  linkText?: string;
  children: React.ReactNode;
  asChild?: boolean;
};

const Sub = ({
  title,
  description,
  href,
  linkText,
  children,
  className,
  asChild = false,
  ...props
}: SubProps) => {
  const ChildrenShell = asChild ? Slot : "section";

  return (
    <div
      className={cn(
        "space-y-4 sm:space-y-6 lg:space-y-8 py-8 sm:py-16",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          {title ? <h3 className="tracking-normal">{title}</h3> : null}
          {description ? (
            <p className="text-balance text-sm leading-normal text-muted-foreground sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
        {linkText ? (
          <Link
            href={href}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "hidden sm:flex"
            )}
          >
            {linkText}
            <MoveRightIcon className="ml-2 size-4" aria-hidden="true" />
            <span className="sr-only">{linkText}</span>
          </Link>
        ) : null}
      </div>
      <div className="space-y-4">
        <ChildrenShell
          className={cn(
            !asChild && "grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-3"
          )}
        >
          {children}
        </ChildrenShell>
        {linkText ? (
          <Link
            href={href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "mx-auto flex w-fit sm:hidden"
            )}
          >
            {linkText}
            <MoveRightIcon className="ml-2 size-4" aria-hidden="true" />
            <span className="sr-only"> {linkText}</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export { Sub };
