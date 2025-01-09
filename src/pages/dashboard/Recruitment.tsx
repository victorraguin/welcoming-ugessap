import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import RecruitmentEditor from "@/components/dashboard/RecruitmentEditor";

const RecruitmentPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <RecruitmentEditor />
      </div>
    </SidebarProvider>
  );
};

export default RecruitmentPage;