"use client";

import { usePathname } from "next/navigation";
import * as React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Type for our breadcrumb data
type BreadcrumbData = {
  href: string;
  label: string;
  isCurrentPage: boolean;
};

interface DynamicBreadcrumbsProps {
  labels: {
    home: string;
    [key: string]: string;
  };
  t: (key: string) => string;
}

export function DynamicBreadcrumbs({ labels, t }: DynamicBreadcrumbsProps) {
  const pathname = usePathname();

  const breadcrumbs = React.useMemo(() => {
    // Always start with home
    const crumbs: BreadcrumbData[] = [
      {
        href: "/",
        label: labels.home,
        isCurrentPage: pathname === "/",
      },
    ];

    // Split the pathname into segments
    const segments = pathname.split("/").filter(Boolean);

    // Build up the breadcrumb trail
    let currentPath = "";
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      crumbs.push({
        href: currentPath,
        // Try to find a translation key for this segment, fallback to the segment itself
        label: labels[segment] || segment,
        isCurrentPage: index === segments.length - 1,
      });
    });

    return crumbs;
  }, [pathname, labels]);

  return (
    <Breadcrumb aria-label={t("navigation")}>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            <BreadcrumbItem
              className="hidden md:block"
              aria-current={crumb.isCurrentPage ? "page" : undefined}
            >
              {crumb.isCurrentPage ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={crumb.href}
                  aria-label={t("navigateTo", { page: crumb.label })}
                >
                  {crumb.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator
                className="hidden md:block"
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
