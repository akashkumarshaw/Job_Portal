import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./JobsList.css";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs")
      .then((res) => {
        setJobs(res.data);
        setFilteredJobs(res.data);
      })
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  // Filter function
  const handleSearch = () => {
    const results = jobs.filter((job) => {
      const titleMatch = job.title.toLowerCase().includes(search.toLowerCase());
      const locationMatch = job.location?.toLowerCase().includes(location.toLowerCase());
      return titleMatch && locationMatch;
    });
    setFilteredJobs(results);
  };

  return (
    <div className="jobs-container">
      <h2>Browse Jobs</h2>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by job title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="jobs-list">
        {filteredJobs.length === 0 ? (
          <p>No jobs found 😞</p>
        ) : (
          filteredJobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.title}</h3>
              <p className="company">{job.company}</p>
              <p className="desc">{job.description.substring(0, 100)}...</p>
              <p className="location">📍 {job.location}</p>
              <Link to={`/job/${job._id}`} className="btn-view">
                View Details
              </Link>
              <Link to={`/applications/${job._id}`} className="btn-view">
                View Applications
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobsList;
