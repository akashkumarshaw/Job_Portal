const applyJobController = async (req, res) => {
  const {
    jobId, name, email, phone, skills, experience, message
  } = req.body;

  const resume = req.files.resume[0].filename;
  const videoResume = req.files.videoResume
    ? req.files.videoResume[0].filename
    : null;

  res.json({ message: "Application submitted successfully" });
};
