import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./EmployerDashboard.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

Modal.setAppElement("#root");

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  // Load jobs
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  // View applications
  const viewApplications = (jobId) => {
    axios
      .get(`http://localhost:5000/api/applications/${jobId}`)
      .then((res) => {
        setApplications(res.data);
        setSelectedJob(jobId);
        setFilter("All");
        setSearch("");
      })
      .catch((err) => console.error(err));
  };

  // Update status
  const updateStatus = (appId, status) => {
    axios
      .patch(`http://localhost:5000/api/applications/${appId}/status`, { status })
      .then(() => {
        setApplications((prev) =>
          prev.map((a) =>
            a._id === appId ? { ...a, status } : a
          )
        );
      })
      .catch((err) => console.error(err));
  };

  // Search + Filter
  const filteredApplications = applications.filter((app) => {
    const statusMatch = filter === "All" || app.status === filter;
    const searchMatch =
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase());
    return statusMatch && searchMatch;
  });

  // Modal handlers
  const openModal = (app) => {
    setSelectedApp(app);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedApp(null);
    setModalIsOpen(false);
  };

  // PDF Download
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
        {/* Jobs */}
        <div className="jobs-list">
          <h3>Your Posted Jobs</h3>
          {jobs.map((job) => (
            <div key={job._id} className="job-item">
              <div>
                <h4>{job.title}</h4>
                <p>{job.company}</p>
              </div>
              <button onClick={() => viewApplications(job._id)}>
                View Applications
              </button>
            </div>
          ))}
        </div>

        {/* Applications */}
        <div className="applications-list">
          <h3>Applications</h3>

          {!selectedJob ? (
            <p>Select a job to view applications</p>
          ) : (
            <>
              <div className="filter-section">
                <input
                  type="text"
                  placeholder="Search by name or email"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              {filteredApplications.map((app) => (
                <div key={app._id} className="application-item">
                  <h4>{app.name}</h4>
                  <p><strong>Status:</strong> {app.status}</p>

                  <button onClick={() => openModal(app)}>
                    View Details
                  </button>

                  <button
                    style={{ background: "#f39c12" }}
                    onClick={() => updateStatus(app._id, "Reviewed")}
                  >
                    Reviewed
                  </button>

                  <button
                    style={{ background: "#2ecc71" }}
                    onClick={() => updateStatus(app._id, "Shortlisted")}
                  >
                    Shortlist
                  </button>

                  <button
                    style={{ background: "#e74c3c" }}
                    onClick={() => updateStatus(app._id, "Rejected")}
                  >
                    Reject
                  </button>

                  <hr />
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="Modal fancy-modal"
        overlayClassName="Overlay fancy-overlay"
      >
        {selectedApp && (
          <div id="applicant-details" className="modal-content">
            <h2>{selectedApp.name}</h2>
            <p>{selectedApp.email}</p>

            <p><strong>Phone:</strong> {selectedApp.phone}</p>
            <p><strong>Experience:</strong> {selectedApp.experience}</p>
            <p><strong>Skills:</strong> {selectedApp.skills}</p>

            <p><strong>Message:</strong> {selectedApp.message}</p>
            <p><strong>Status:</strong> {selectedApp.status}</p>
            <p>
              <strong>Applied on:</strong>{" "}
              {new Date(selectedApp.createdAt).toLocaleString()}
            </p>

            {/* Resume Download */}
            {selectedApp.resume && (
              <p>
                <a
                  href={`http://localhost:5000/uploads/${selectedApp.resume}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  📄 Download Resume
                </a>
              </p>
            )}

            {/* Video Resume */}
            {selectedApp.video && (
              <video width="100%" controls>
                <source
                  src={`http://localhost:5000/uploads/${selectedApp.video}`}
                  type="video/mp4"
                />
              </video>
            )}

            <button className="pdf-btn" onClick={downloadPDF}>
              Download Application PDF
            </button>

            <button className="close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EmployerDashboard;
