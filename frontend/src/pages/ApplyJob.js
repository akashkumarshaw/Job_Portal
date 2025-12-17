import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ApplyJob.css";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [resume, setResume] = useState(null);
  const [videoResume, setVideoResume] = useState(null);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("jobId", id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("skills", skills);
    formData.append("experience", experience);
    formData.append("message", message);
    formData.append("resume", resume);

    if (videoResume) {
      formData.append("videoResume", videoResume);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/applications/apply",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

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

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          required
        >
          <option value="">Select Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="1-2 Years">1–2 Years</option>
          <option value="3+ Years">3+ Years</option>
        </select>

        <input
          type="text"
          placeholder="Skills (React, Node, MongoDB)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <label>Upload Resume (PDF/DOC)</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          required
        />

        <label>Upload Video Resume (Optional)</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoResume(e.target.files[0])}
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
