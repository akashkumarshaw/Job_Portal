import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">Job<span>Finder</span></h2>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/add">Post Job</Link>
        <Link to="/jobs">Browse Jobs</Link>

       
        <Link to="/resume-analyzer">Resume Analyzer</Link>

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/employer-dashboard">Dashboard</Link>
            <span className="welcome">Hi, {user.name}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
