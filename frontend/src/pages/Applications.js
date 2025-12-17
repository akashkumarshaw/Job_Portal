import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Applications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/applications/${jobId}`)
      .then((res) => setApplications(res.data))
      .catch((err) => console.error(err));
  }, [jobId]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Job Applications</h2>

      {applications.length === 0 && <p>No applications yet</p>}

      {applications.map((app) => (
        <div
          key={app._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        >
          <p><strong>Name:</strong> {app.name}</p>
          <p><strong>Email:</strong> {app.email}</p>
          <p><strong>Message:</strong> {app.message}</p>

          {app.resume && (
            <p>
              <strong>Resume:</strong>{" "}
              <a
                href={`http://localhost:5000/uploads/${app.resume}`}
                target="_blank"
                rel="noreferrer"
              >
                View / Download
              </a>
            </p>
          )}

          {app.video && (
            <video width="300" controls>
              <source
                src={`http://localhost:5000/uploads/${app.video}`}
                type="video/mp4"
              />
              Your browser does not support video.
            </video>
          )}
        </div>
      ))}
    </div>
  );
};

export default Applications;
