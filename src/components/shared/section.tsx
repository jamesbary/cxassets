import { Slot } from "@radix-ui/react-slot";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  title: string;
  description?: string;
  href: string;
  linkText?: string;
  children: React.ReactNode;
  asChild?: boolean;
};

const Section = ({
  title,
  description,
  href,
  linkText,
  children,
  className,
  asChild = false,
  ...props
}: SectionProps) => {
  const ChildrenShell = asChild ? Slot : "section";

  return (
    <section
      className={cn(
        "space-y-4 sm:space-y-6 lg:space-y-8 py-8 sm:py-16",
        className
      )}
      {...props}
    >
      <section
        className={cn(
          "flex items-center",
          linkText ? "justify-between gap-4" : "justify-center text-center"
        )}
      >
        <div className="space-y-2">
          <h2 className="tracking-normal">{title}</h2>
          {description ? (
            <p className="text-balance leading-normal text-muted-foreground text-base sm:text-lg">
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
      </section>
      <section className="space-y-4 sm:space-y-6 lg:space-y-8">
        <ChildrenShell
          className={cn(
            !asChild &&
              "grid gap-4 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-4"
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
      </section>
    </section>
  );
};

export { Section };
