import React, { useState } from "react";
import axios from "axios";
import VideoResumeUpload from "../components/VideoResumeUpload";


const ResumeAnalyzer = ({ user }) => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please choose a resume file first.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      // ⚠️ MUST match upload.single("resume") in backend
      formData.append("resume", file);

      const res = await axios.post(
        "http://localhost:5000/api/resume/analyze",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setResult(res.data);
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h2 style={{ textAlign: "center", color: "#007bff" }}>AI Resume Analyzer</h2>

      <div style={{ marginTop: 20 }}>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
      </div>
      <div className="resume-container">
    <h2>AI Resume Analyzer</h2>

    {/* PDF Resume */}
    <input type="file" accept=".pdf" />
    <br /><br />
    <button>Analyze Resume</button>

    {/* ✅ VIDEO RESUME SECTION */}
    <VideoResumeUpload />
  </div>
      

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{
          marginTop: 16,
          padding: "10px 20px",
          backgroundColor: "#007bff",
          border: "none",
          color: "#fff",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {result && (
        <div
          style={{
            marginTop: 24,
            padding: 16,
            borderRadius: 8,
            background: "#f8f9fa",
          }}
        >
          <h3>Analysis Result</h3>
          <p>
            <strong>File:</strong> {result.filename} ({Math.round(result.size / 1024)} KB)
          </p>
          <p>
            <strong>Score:</strong> {result.score}/100
          </p>
          <ul>
            {result.suggestions?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
