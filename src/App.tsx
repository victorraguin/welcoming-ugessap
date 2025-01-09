import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import Association from "@/pages/Association";
import Contact from "@/pages/Contact";
import HealthCenter from "@/pages/services/HealthCenter";
import ChildcareHealth from "@/pages/services/ChildcareHealth";
import MedEvent from "@/pages/services/MedEvent";
import DashboardIndex from "@/pages/dashboard/Index";
import ImagesPage from "@/pages/dashboard/Images";
import ReviewsPage from "@/pages/dashboard/Reviews";
import Settings from "@/pages/dashboard/Settings";
import RecruitmentPage from "@/pages/dashboard/Recruitment";
import AssociationPage from "@/pages/dashboard/Association";
import ServicesPage from "@/pages/dashboard/Services";
import TeamPage from "@/pages/dashboard/Team";
import Login from "@/pages/Login";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/association" element={<Association />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/health-center" element={<HealthCenter />} />
          <Route path="/services/childcare-health" element={<ChildcareHealth />} />
          <Route path="/services/med-event" element={<MedEvent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardIndex />} />
          <Route path="/dashboard/association" element={<AssociationPage />} />
          <Route path="/dashboard/services" element={<ServicesPage />} />
          <Route path="/dashboard/images" element={<ImagesPage />} />
          <Route path="/dashboard/reviews" element={<ReviewsPage />} />
          <Route path="/dashboard/team" element={<TeamPage />} />
          <Route path="/dashboard/recruitment" element={<RecruitmentPage />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;