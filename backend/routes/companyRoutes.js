const express = require('express');
const { createCompany, getCompanies } = require('../controllers/companyController');
const upload = require('../multer'); 

const router = express.Router();

router.post('/', upload.single('contract'), createCompany);
router.get('/', getCompanies);

module.exports = router;