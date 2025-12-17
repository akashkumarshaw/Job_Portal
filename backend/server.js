const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ✅ Import Routes
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');
const applicationRoutes = require("./routes/applicationRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const videoRoutes = require("./routes/videoRoutes"); // ✅ Add here


// ✅ Use Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/video", videoRoutes); // ✅ Add here


// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection failed:', err));

// ✅ Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/build');
  app.use(express.static(frontendPath));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(frontendPath, 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
