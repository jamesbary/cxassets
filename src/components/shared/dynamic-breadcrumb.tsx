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

// Helper to capitalize first letter
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Type for our breadcrumb data
type BreadcrumbData = {
  href: string;
  label: string;
  isCurrentPage: boolean;
};

export function DynamicBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = React.useMemo(() => {
    // Always start with home
    const crumbs: BreadcrumbData[] = [
      {
        href: "/",
        label: "Home",
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
        label: capitalizeFirstLetter(segment),
        isCurrentPage: index === segments.length - 1,
      });
    });

    return crumbs;
  }, [pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            <BreadcrumbItem className="hidden md:block">
              {crumb.isCurrentPage ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
