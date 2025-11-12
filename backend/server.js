const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Import Routes
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes'); // 👈 ADD THIS LINE

// ✅ Use Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes); // 👈 ADD THIS LINE

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection failed:', err));

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
 
const applicationRoutes = require("./routes/applicationRoutes");
app.use("/api/applications", applicationRoutes);
