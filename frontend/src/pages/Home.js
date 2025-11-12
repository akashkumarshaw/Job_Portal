import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="hero-section">
      <div className="hero-text">
        <h1>
          Find the most <span>exciting</span> startup jobs
        </h1>
        <p>Discover opportunities that match your skills and ambitions.</p>

        <div className="search-bar">
          <input type="text" placeholder="Job Title or Keyword" />
          <input type="text" placeholder="Location" />
          <button>Find Job</button>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="./photo/WhatsApp Image 2025-11-12 at 22.15.21_350590d2.jpg"
          alt="Professional"
        />
      </div>
    </div>
  );
};

export default Home;
