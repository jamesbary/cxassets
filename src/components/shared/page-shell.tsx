import { cn } from "@/lib/utils";
import * as React from "react";

interface PageShellProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  bgImage?: string;
  children: React.ReactNode;
  headerClassName?: string;
  contentClassName?: string;
}

export function PageShell({
  title,
  description,
  bgImage,
  children,
  className,
  headerClassName,
  contentClassName,
  ...props
}: PageShellProps) {
  return (
    <section className={cn("flex flex-col", className)} {...props}>
      {/* Header Section - full width with optional background */}
      {(title || description || bgImage) && (
        <div
          className={cn(
            "relative w-full py-16 sm:py-20 lg:py-24",
            bgImage && "bg-cover bg-center bg-no-repeat",
            headerClassName
          )}
          style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
        >
          {/* Optional overlay for better text readability when using bg image */}
          {bgImage && (
            <div
              className="absolute inset-0 bg-slate-800/40"
              aria-hidden="true"
            />
          )}

          {/* Title and Description Container */}
          <div className="container relative">
            <div className="mx-auto max-w-2xl text-center">
              {title && (
                <h2 className={cn(bgImage && "text-light")}>{title}</h2>
              )}
              {description && (
                <p
                  className={cn(
                    "mt-4 text-base leading-relaxed text-muted-foreground",
                    bgImage && "text-light/85"
                  )}
                >
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <section
        className={cn(
          "flex-1 space-y-4 sm:space-y-6 lg:space-y-8 py-4 sm:py-8",
          contentClassName
        )}
      >
        {children}
      </section>
    </section>
  );
}
