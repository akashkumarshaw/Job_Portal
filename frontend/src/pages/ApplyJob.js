import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ApplyJob.css";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/applications/apply", {
        jobId: id,
        name,
        email,
        message,
      });
      setSuccess(res.data.message);
      setError("");
      setTimeout(() => navigate("/jobs"), 1500);
    } catch (err) {
      console.error(err);
      setError("Failed to submit application");
      setSuccess("");
    }
  };

  return (
    <div className="apply-container">
      <h2>Apply for Job</h2>
      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Why should we hire you?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyJob;
