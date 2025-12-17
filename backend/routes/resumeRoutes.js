// backend/routes/resumeRoutes.js
const express = require("express");
const multer = require("multer");

const router = express.Router();

// store files in memory (RAM). For real app you can change to disk storage.
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/resume/analyze
router.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 👉 Here you could parse the PDF and do real analysis.
    // For now we just send back some dummy data.
    const fakeScore = 82;
    const fakeSuggestions = [
      "Add more measurable achievements.",
      "Include relevant keywords from the job description.",
      "Keep your resume to 1–2 pages."
    ];

    return res.json({
      filename: req.file.originalname,
      size: req.file.size,
      score: fakeScore,
      suggestions: fakeSuggestions
    });
  } catch (err) {
    console.error("Resume analyze error:", err);
    return res.status(500).json({ message: "Server error while analyzing resume" });
  }
});

module.exports = router;
