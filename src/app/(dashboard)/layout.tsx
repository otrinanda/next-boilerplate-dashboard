import { AppSidebar } from "@/components/common/layout/app-sidebar";
import { FatalErrorBoundary } from "@/components/common/fatal-error-boundary";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function WithSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-4">
        <FatalErrorBoundary>{children}</FatalErrorBoundary>
      </SidebarInset>
    </SidebarProvider>
  );
}
