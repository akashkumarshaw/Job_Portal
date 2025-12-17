import React, { useState, useEffect } from "react";
import VideoResumeUpload from "../components/VideoResumeUpload";
import axios from "axios";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const [videoUrl, setVideoUrl] = useState(user?.videoResumeUrl || null);

  useEffect(() => {
    // optionally, fetch fresh user from API
  }, []);

  const handleUploaded = async (url) => {
    setVideoUrl(url);
    // optionally persist to backend: update user.profile.videoResumeUrl
    try {
      await axios.put(`/api/users/${user._id}`, { videoResumeUrl: url });
      // update local storage copy
      const updated = { ...user, videoResumeUrl: url };
      localStorage.setItem("user", JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save video URL to profile", err);
    }
  };

  return (
    <div>
      <h2>My Profile</h2>

      <VideoResumeUpload userId={user?._id} onUploaded={handleUploaded} />

      {videoUrl && (
        <div style={{ marginTop: 12 }}>
          <h5>Uploaded Video</h5>
          <video src={videoUrl} controls width="400" />
        </div>
      )}
    </div>
  );
};

export default Profile;
