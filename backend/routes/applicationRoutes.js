const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

// ✅ Route: POST /api/applications/apply
router.post("/apply", async (req, res) => {
  try {
    const { jobId, name, email, message } = req.body;

    const newApplication = new Application({
      jobId,
      name,
      email,
      message,
    });

    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Route: GET /api/applications/:jobId
router.get("/:jobId", async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId });
    res.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// ✅ Update application status (e.g., Reviewed or Shortlisted)
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json({ message: "Application status updated!", application });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
