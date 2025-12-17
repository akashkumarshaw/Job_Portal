const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // ✅ ROLE-BASED ACCESS (ADD HERE)
    role: {
      type: String,
      enum: ["user", "employer", "admin"],
      default: "user",
    },

    skills: [String],            // ["React", "Node", "MongoDB"]
    resumeText: String,          // plain text version
    resumeUrl: String,           // file or drive link
    videoResumeUrl: String,      // for feature 3
    points: { type: Number, default: 0 }, // gamification
    badges: [String],            // ["Top Applicant", ...]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
