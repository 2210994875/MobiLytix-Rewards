const express = require("express");
const { createCompany, getCompany, getCompanies, deleteCompany, updateCompany } = require("../controllers/companyController");
const upload = require("../multer");
const { getLanguages } = require("../controllers/companyController");

const router = express.Router();

router.post("/", upload.single("contract"), createCompany);
router.get("/:id", getCompany); 
router.get("/", getCompanies);
router.delete("/:id", deleteCompany); 
router.put("/:id", upload.single("contract"), updateCompany);
router.get("/languages", getLanguages);



module.exports = router;
