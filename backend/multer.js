const multer = require('multer');
const path = require('path');
const fs = require('fs');

const contractsDir = path.join(__dirname, 'uploads', 'contracts');

const storage = multer.diskStorage({
  // ensure the folder exists for every request
  destination: (_req, _file, cb) => {
    fs.mkdir(contractsDir, { recursive: true }, (err) => cb(err, contractsDir));
  },
  filename: (_req, file, cb) => {
    const safe = (file.originalname || 'file').replace(/[^a-zA-Z0-9._-]/g, '_');
    const ext = path.extname(safe);
    const base = path.basename(safe, ext);
    cb(null, `${Date.now()}_${base}${ext}`);
  }
});

const fileFilter = (_req, file, cb) => {
  const ok = [
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/jpg'
  ].includes(file.mimetype);
  cb(ok ? null : new Error('Unsupported file type'), ok);
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});
