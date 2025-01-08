"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Fragment } from "react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="hidden md:block">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {paths.map((path, index) => {
          if (path == null) return null;
          const href = `/${paths.slice(0, index + 1).join("/")}`;
          const isLast = index === paths.length - 1;

          return (
            <Fragment key={`bc-${path}`}>
              <BreadcrumbSeparator />
              <BreadcrumbItem key={path}>
                {isLast ? (
                  <BreadcrumbPage>{path}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={`/${paths.slice(0, index + 1).join("/")}`}
                  >
                    {path}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
