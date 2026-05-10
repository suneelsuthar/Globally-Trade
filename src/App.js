import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navigation from "./components/Router";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Cargo from "./pages/Cargo";
import Ports from "./pages/Ports";
import Shipments from "./pages/Shipments";
import About from "./pages/About";

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAbout = location.pathname === "/about";

  return (
    <div className="App">
      <Navigation />
      <div className={isHome || isAbout ? "" : "container-fluid py-4"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cargo" element={<Cargo />} />
          <Route path="/ports" element={<Ports />} />
          <Route path="/shipments" element={<Shipments />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
