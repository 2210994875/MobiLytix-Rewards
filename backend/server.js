require('dotenv').config();

const express = require('express');
const cors = require("cors");
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const companyRoutes = require('./routes/companyRoutes');
const languageRoutes = require("./routes/languageRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");




const app = express();



/* ---------- CORS ---------- */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options(/.*/, (req, res) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

/* ---------- Ensure uploads directory ---------- */
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/* ---------- Middleware ---------- */
// Parse JSON request body (must be BEFORE routes)
app.use(express.json({ limit: '5mb' }));

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

/* ---------- Routes ---------- */
app.use('/api/companies', companyRoutes);
app.get('/api/health', (_req, res) => res.json({ ok: true }));
// Language API
app.use("/api/languages", languageRoutes);
// app.use("/api/languages", languageRoutes);
app.use("/api/dashboard", dashboardRoutes); 


/* ---------- Error Handling ---------- */
app.use((err, _req, res, next) => {
  if (err instanceof multer.MulterError || err?.message === 'Unsupported file type') {
    return res.status(400).json({ success: false, error: err.message });
  }
  return next(err);
});

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, error: 'Server error' });
});

/* ---------- Start Server ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
