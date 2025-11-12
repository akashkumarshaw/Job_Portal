import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import JobDetails from "./pages/JobDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import JobsList from "./pages/JobsList"; // ✅ Import Browse Jobs
import ProtectedRoute from "./components/ProtectedRoute";
import ApplyJob from "./pages/ApplyJob";
import EmployerDashboard from "./pages/EmployerDashboard";


function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <Router>
      <Navbar /> {/* ✅ Top navigation */}
      <div style={{ padding: "20px", minHeight: "80vh" }}>
        <Routes>
          {/* ✅ All routes go inside Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobsList />} /> {/* ✅ Moved here */}
          <Route path="/apply/:id" element={<ApplyJob />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />


          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditJob />
              </ProtectedRoute>
            }
          />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer /> {/* ✅ Bottom footer */}
    </Router>
  );
}

export default App;

