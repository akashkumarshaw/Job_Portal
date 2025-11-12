import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch((err) => {
        console.error("Error fetching job:", err);
        setError("Failed to load job details");
      });
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="container">
      <h2>{job.title}</h2>
      <h4>{job.company}</h4>
      <p>{job.description}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <Link to={`/apply/${job._id}`}>
      <button style={{
        backgroundColor: "#0078d7",
        color: "white",
        border: "none",
        padding: "10px 16px",
        borderRadius: "6px",
        marginTop: "10px",
        cursor: "pointer"
      }}>
        Apply Now
      </button>
    </Link>
    </div>
  );
};

export default JobDetails;
