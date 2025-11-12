import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./EmployerDashboard.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

Modal.setAppElement("#root"); // Required for accessibility

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filter, setFilter] = useState("All");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  // ✅ Load all jobs
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  // ✅ View applications for one job
  const viewApplications = (jobId) => {
    axios
      .get(`http://localhost:5000/api/applications/${jobId}`)
      .then((res) => {
        setApplications(res.data);
        setSelectedJob(jobId);
        setFilter("All");
      })
      .catch((err) => console.error("Error fetching applications:", err));
  };

  // ✅ Delete job
  const deleteJob = (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      axios
        .delete(`http://localhost:5000/api/jobs/${jobId}`)
        .then(() => {
          alert("Job deleted successfully!");
          setJobs(jobs.filter((job) => job._id !== jobId));
          if (selectedJob === jobId) {
            setApplications([]);
            setSelectedJob(null);
          }
        })
        .catch((err) => console.error("Error deleting job:", err));
    }
  };

  // ✅ Update applicant status
  const updateStatus = (appId, newStatus) => {
    axios
      .patch(`http://localhost:5000/api/applications/${appId}/status`, {
        status: newStatus,
      })
      .then(() => {
        setApplications((prev) =>
          prev.map((a) =>
            a._id === appId ? { ...a, status: newStatus } : a
          )
        );
      })
      .catch((err) => console.error("Error updating status:", err));
  };

  // ✅ Filter logic
  const filteredApplications =
    filter === "All"
      ? applications
      : applications.filter((a) => a.status === filter);

  // ✅ Open modal with selected applicant
  const openModal = (app) => {
    setSelectedApp(app);
    setModalIsOpen(true);
  };

  // ✅ Close modal
  const closeModal = () => {
    setSelectedApp(null);
    setModalIsOpen(false);
  };
  const downloadPDF = async () => {
  const element = document.getElementById("applicant-details");
  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${selectedApp.name}_Application.pdf`);
};

  return (
    <div className="dashboard-container">
      <h2>Employer Dashboard</h2>
      <div className="dashboard-content">
        <div className="jobs-list">
          <h3>Your Posted Jobs</h3>
          {jobs.length === 0 ? (
            <p>No jobs found</p>
          ) : (
            jobs.map((job) => (
              <div key={job._id} className="job-item">
                <div>
                  <h4>{job.title}</h4>
                  <p>{job.company}</p>
                </div>
                <div>
                  <button onClick={() => viewApplications(job._id)}>
                    View Applications
                  </button>
                  <button
                    style={{ backgroundColor: "#e74c3c", marginLeft: "10px" }}
                    onClick={() => deleteJob(job._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="applications-list">
          <h3>Applications</h3>
          {!selectedJob ? (
            <p>Select a job to view applications</p>
          ) : applications.length === 0 ? (
            <p>No one has applied yet.</p>
          ) : (
            <>
              <div className="filter-section">
                <label>Filter by Status:</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Shortlisted">Shortlisted</option>
                </select>
              </div>

              {filteredApplications.map((app) => (
                <div key={app._id} className="application-item">
                  <h4>{app.name}</h4>
                  <p><strong>Status:</strong> {app.status}</p>
                  <div>
                    <button
                      style={{ backgroundColor: "#0078d7", marginRight: "10px" }}
                      onClick={() => openModal(app)}
                    >
                      View Details
                    </button>
                    <button
                      style={{ backgroundColor: "#f39c12", marginRight: "10px" }}
                      onClick={() => updateStatus(app._id, "Reviewed")}
                    >
                      Mark Reviewed
                    </button>
                    <button
                      style={{ backgroundColor: "#2ecc71" }}
                      onClick={() => updateStatus(app._id, "Shortlisted")}
                    >
                      Shortlist
                    </button>
                  </div>
                  <hr />
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* ✅ Applicant Details Modal */}
      {/* ✅ Fancy Applicant Details Modal */}
{/* ✅ Fancy Applicant Details Modal */}
<Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Applicant Details"
  className="Modal fancy-modal"
  overlayClassName="Overlay fancy-overlay"
>
  {selectedApp && (
    <div id="applicant-details" className="modal-content">
      <div className="modal-header">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedApp.name)}&background=0078d7&color=fff&size=100`}
          alt="Profile"
          className="applicant-avatar"
        />
        <div>
          <h2>{selectedApp.name}</h2>
          <p className="modal-email">{selectedApp.email}</p>
        </div>
      </div>

      <div className="modal-body">
        <p><strong>Message:</strong></p>
        <p className="modal-message">{selectedApp.message || "No message provided"}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`status-badge ${selectedApp.status.toLowerCase()}`}
          >
            {selectedApp.status}
          </span>
        </p>
        <p>
          <strong>Applied on:</strong>{" "}
          {new Date(selectedApp.appliedAt).toLocaleString()}
        </p>
      </div>

      <div className="modal-actions">
        <button className="pdf-btn" onClick={downloadPDF}>
          📄 Download as PDF
        </button>
        <button className="close-btn" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  )}
</Modal>


    </div>
  );
};

export default EmployerDashboard;
