"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

import { Separator } from "./ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { ThemeToogle } from "./theme-toogle";

export function AppHeader({
  list,
}: {
  list: {
    title: string;
    href: string;
  }[];
}) {
  return (
    <header className="flex h-12 shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-vertical:h-4 data-vertical:self-auto"
        />
        <Breadcrumb>
          <BreadcrumbList key="breadcrumb-list" className="gap-1">
            {list.map((item, index) => (
              <div key={item.title} className="flex items-center gap-1">
                <BreadcrumbItem className="hidden md:block">
                  {index < list.length - 1 ? (
                    <BreadcrumbLink href={item.href}>
                      {item.title}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < list.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="px-4">
        <ThemeToogle />
      </div>
    </header>
  );
}
