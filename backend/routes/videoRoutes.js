// backend/routes/videoRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// ensure upload directory exists
const UPLOAD_DIR = path.join(__dirname, "..", "uploads", "videos");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// multer disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    // use timestamp + original name
    const ext = path.extname(file.originalname);
    const safeName = file.originalname.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_\-\.]/g, "");
    cb(null, `${Date.now()}-${safeName}${ext}`);
  },
});

// file filter: only allow video files
function fileFilter(req, file, cb) {
  const allowed = /mp4|mov|mkv|webm|avi/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed (mp4, mov, mkv, webm, avi)"));
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 150 * 1024 * 1024 }, // 150 MB max (adjust if needed)
  fileFilter,
});

// POST /api/video/upload
// fields: video file in "video", userId in body (optional)
router.post("/upload", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No video uploaded" });

    // Build public URL (served earlier via app.use("/uploads", express.static(...)))
    const videoUrl = `/uploads/videos/${req.file.filename}`;

    // If you want to store the URL against a User, do it here:
    // const userId = req.body.userId;
    // if (userId) await User.findByIdAndUpdate(userId, { videoResumeUrl: videoUrl });

    return res.json({
      message: "Upload successful",
      filename: req.file.filename,
      size: req.file.size,
      videoUrl,
    });
  } catch (err) {
    console.error("Video upload error:", err);
    return res.status(500).json({ message: "Server error during upload" });
  }
});

module.exports = router;
