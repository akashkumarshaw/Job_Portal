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
import ApplyJob from "./pages/ApplyJob";
import EmployerDashboard from "./pages/EmployerDashboard";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Profile from "./pages/Profile";
import Applications from "./pages/Applications";
import EmployerRoute from "./components/EmployerRoute";




function App() {
  const user = JSON.parse(localStorage.getItem("user"));

 

  return (
    <Router>
      <Navbar /> {/* ✅ Top navigation */}
      <div style={{ padding: "20px", minHeight: "80vh" }}>
        <Routes>
          {/* ✅ All routes go inside Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobsList />} /> {/* ✅ Moved here */}
          <Route path="/apply/:id" element={<ApplyJob />} />
          <Route
            path="/employer-dashboard"
            element={
              <EmployerRoute>
                <EmployerDashboard />
              </EmployerRoute>
            }
          />

          <Route path="/resume-analyzer" element={<ResumeAnalyzer user={user} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/applications/:jobId" element={<Applications />} />
          <Route path="/applications/:jobId" element={<Applications />} />




          <Route
            path="/add"
            element={
              <EmployerRoute>
                <AddJob />
              </EmployerRoute>
            }
          />


          <Route
            path="/edit/:id"
            element={
              <EmployerRoute>
                <EditJob />
              </EmployerRoute>
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

