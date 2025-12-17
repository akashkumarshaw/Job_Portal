import React, { useState } from "react";
import axios from "axios";

const VideoResumeUpload = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!video) {
      alert("Please select a video file");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/video/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Video Resume Uploaded Successfully");
    } catch (err) {
      alert("Video upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h3>🎥 Video Resume Upload</h3>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files[0])}
      />
      <br /><br />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload Video Resume"}
      </button>
    </div>
  );
};

export default VideoResumeUpload;
