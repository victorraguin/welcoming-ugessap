import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Association from "./pages/Association";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/association" element={<Association />} />
      </Routes>
    </Router>
  );
}

export default App;