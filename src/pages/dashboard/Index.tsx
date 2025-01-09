import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import AssociationEditor from "@/components/dashboard/AssociationEditor";

const DashboardPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <AssociationEditor />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;