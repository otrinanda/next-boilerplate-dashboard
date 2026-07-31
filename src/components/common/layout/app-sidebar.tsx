"use client";

import * as React from "react";

import { NavMain } from "@/components/common/layout/nav-main";
import { NavProjects } from "@/components/common/layout/nav-projects";
import { NavUser } from "@/components/common/layout/nav-user";
import { TeamSwitcher } from "@/components/common/layout/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  FrameIcon,
  PieChartIcon,
  MapIcon,
  Library,
  Settings2,
  Briefcase,
  Banknote,
  Coins,
  PiggyBank,
  ClipboardList,
} from "lucide-react";
import { usePathname } from "next/navigation";

// This is sample data.
const data = {
  user: {
    name: "ILA Admin",
    email: "admin.ila@msone.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "MS One",
      logo: <GalleryVerticalEndIcon />,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Master Data",
      url: "/master-data",
      icon: <Library />,
      isActive: true,
      items: [
        {
          title: "Employees",
          url: "/master-data/employees",
        },
        {
          title: "Organization",
          url: "/master-data/organization",
        },
        {
          title: "Salary",
          url: "/master-data/salary",
        },
      ],
    },
    {
      title: "Configuration",
      url: "/configuration",
      icon: <Settings2 />,
      items: [
        {
          title: "Payroll Components",
          url: "/configuration/payroll-components",
        },
        {
          title: "Tax",
          url: "/configuration/tax",
        },
        {
          title: "BPJS",
          url: "/configuration/bpjs",
        },
      ],
    },
    {
      title: "Operational",
      url: "/operational",
      icon: <Briefcase />,
      items: [
        {
          title: "Attendance",
          url: "/operational/attendance",
        },
        {
          title: "Overtime",
          url: "/operational/overtime",
        },
        {
          title: "Loans",
          url: "/operational/loans",
        },
      ],
    },
    {
      title: "Payroll",
      url: "/payroll",
      icon: <Banknote />,
      items: [
        {
          title: "Payroll Run",
          url: "/payroll/run",
        },
        {
          title: "Review",
          url: "/payroll/review",
        },
        {
          title: "Approval",
          url: "/payroll/approval",
        },
      ],
    },
    {
      title: "THR",
      url: "/thr",
      icon: <Coins />,
    },
    {
      title: "Tax",
      url: "/tax",
      icon: <PiggyBank />,
      items: [
        {
          title: "Monthly",
          url: "/tax/monthly",
        },
        {
          title: "Reconciliation",
          url: "/tax/reconciliation",
        },
      ],
    },
    {
      title: "Reports",
      url: "/reports",
      icon: <ClipboardList />,
      items: [
        {
          title: "Payroll",
          url: "/reports/payroll",
        },
        {
          title: "Tax",
          url: "/reports/tax",
        },
        {
          title: "Loans",
          url: "/reports/loans",
        },
      ],
    },
    {
      title: "Payslip",
      url: "/payslip",
      icon: <Banknote />,
      items: [
        {
          title: "My Payslip",
          url: "/payslip/detail",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: <FrameIcon />,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: <PieChartIcon />,
    },
    {
      name: "Travel",
      url: "#",
      icon: <MapIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} pathname={pathname} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
