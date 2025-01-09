import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import AssociationEditor from "@/components/dashboard/AssociationEditor";

const AssociationPage = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8">Gestion de l'association</h1>
          <AssociationEditor />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AssociationPage;