// Debug route to verify CORS from browser


require('dotenv').config();

const express = require('express');
const cors = require("cors");
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const companyRoutes = require('./routes/companyRoutes');

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5175";
console.log(`✅ Allowed CORS origin: ${allowedOrigin}`);
app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options(/.*/, (req, res) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
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
// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// Parse JSON request body
app.use(express.json({ limit: '2mb' }));

app.get('/test-cors', (req, res) => {
  res.json({ msg: 'CORS is working', origin: allowedOrigin });
});






/* ---------- Routes ---------- */
app.use('/api/companies', companyRoutes);
app.get('/api/health', (_req, res) => res.json({ ok: true }));

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
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));


// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const fs = require("fs");
// const multer = require("multer");

// const companyRoutes = require("./routes/companyRoutes");

// const app = express();

// /* ---------- Ensure uploads directory ---------- */
// const uploadsDir = path.join(__dirname, "uploads");
