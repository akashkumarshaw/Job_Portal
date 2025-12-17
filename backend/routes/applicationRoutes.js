const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const multer = require("multer");
const sendEmail = require("../utils/sendEmail");


// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// POST apply (enhanced, not changed)
router.post(
  "/apply",
upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "videoResume", maxCount: 1 },
]),

  async (req, res) => {
    try {
      const {
        jobId,
        name,
        email,
        phone,
        skills,
        experience,
        message,
      } = req.body;


      const resume = req.files?.resume?.[0]?.filename || null;
      const video = req.files?.videoResume?.[0]?.filename || null;

      const newApplication = new Application({
        jobId,
        name,
        email,
        phone,
        skills,
        experience,
        message,
        resume,
        video,
      });


      await newApplication.save();
      res.status(201).json({ message: "Application submitted successfully!" });
    } catch (error) {
      console.error("Error submitting application:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Existing routes untouched
router.get("/:jobId", async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (status === "Shortlisted" || status === "Rejected") {
      await sendEmail(
        application.email,
        `Application ${status}`,
        `
          <h3>Hello ${application.name},</h3>
          <p>Your application status has been updated to:</p>
          <h2>${status}</h2>
          <p>Thank you for applying via JobFinder.</p>
        `
      );
    }

    res.json({ message: "Status updated", application });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
