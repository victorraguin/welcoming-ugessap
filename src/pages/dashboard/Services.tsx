import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ServicesEditor from "@/components/dashboard/ServicesEditor";

const ServicesPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <ServicesEditor />
      </div>
    </SidebarProvider>
  );
};

export default ServicesPage;