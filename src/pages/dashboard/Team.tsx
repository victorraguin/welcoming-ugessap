import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import TeamEditor from "@/components/dashboard/TeamEditor";

const TeamPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <TeamEditor />
      </div>
    </SidebarProvider>
  );
};

export default TeamPage;