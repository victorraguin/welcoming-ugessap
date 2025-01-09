import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Association from "@/pages/Association";
import Contact from "@/pages/Contact";
import HealthCenter from "@/pages/services/HealthCenter";
import ChildcareHealth from "@/pages/services/ChildcareHealth";
import MedEvent from "@/pages/services/MedEvent";
import DashboardIndex from "@/pages/dashboard/Index";
import ImagesPage from "@/pages/dashboard/Images";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/association" element={<Association />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services/health-center" element={<HealthCenter />} />
        <Route path="/services/childcare-health" element={<ChildcareHealth />} />
        <Route path="/services/med-event" element={<MedEvent />} />
        <Route path="/dashboard" element={<DashboardIndex />} />
        <Route path="/dashboard/images" element={<ImagesPage />} />
      </Routes>
    </Router>
  );
}

export default App;