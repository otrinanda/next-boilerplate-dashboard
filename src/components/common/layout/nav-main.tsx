"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronRightIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavMain({
  items,
  pathname,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  pathname: string;
}) {
  const { isMobile, state } = useSidebar();
  console.log("NavMain render", { pathname, state });
  const MenuCollapse = ({
    menu,
    pathname,
  }: {
    menu: {
      title: string;
      url: string;
      icon?: React.ReactNode;
      isActive?: boolean;
      items?: {
        title: string;
        url: string;
      }[];
    };
    pathname: string;
  }) => {
    const isActive =
      menu.url === pathname || menu.items?.some((sub) => sub.url === pathname);
    if (!menu.items || menu.items.length === 0) {
      return (
        <SidebarMenuButton asChild tooltip={menu.title} isActive={isActive}>
          <a href={menu.url} className="flex items-center gap-2">
            {menu.icon}
          </a>
        </SidebarMenuButton>
      );
    }
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton tooltip={menu.title} isActive={isActive}>
            {menu.icon}
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-fit"
          align="start"
          side={isMobile ? "bottom" : "right"}
          sideOffset={4}
        >
          {menu.items?.map((subItem) => {
            const isSubItemActive = subItem.url === pathname;
            return (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild isActive={isSubItemActive}>
                  <a href={subItem.url}>
                    <span>{subItem.title}</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive =
            item.url === pathname ||
            item.items?.some((sub) => sub.url === pathname);
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                {state === "collapsed" ? (
                  <MenuCollapse menu={item} pathname={pathname} />
                ) : (
                  <>
                    <CollapsibleTrigger asChild>
                      {item.items && item.items.length > 0 ? (
                        <SidebarMenuButton
                          tooltip={`${item.title}`}
                          isActive={isActive}
                        >
                          {item.icon}
                          <span>{item.title}</span>
                          <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      ) : (
                        <SidebarMenuButton
                          asChild
                          tooltip={`${item.title}`}
                          isActive={isActive}
                        >
                          <a
                            href={item.url}
                            className="flex items-center gap-2"
                          >
                            {item.icon}
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => {
                          const isSubItemActive = subItem.url === pathname;
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isSubItemActive}
                              >
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
