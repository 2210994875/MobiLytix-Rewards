// const express = require("express");
// const { createCompany, getCompany, getCompanies, deleteCompany, updateCompany } = require("../controllers/companyController");
// const upload = require("../multer");
// const { getLanguages } = require("../controllers/companyController");

// const router = express.Router();

// router.post("/", upload.single("contract"), createCompany);
// router.get("/:id", getCompany); 
// router.get("/", getCompanies);
// router.delete("/:id", deleteCompany); 
// router.put("/:id", upload.single("contract"), updateCompany);
// router.get("/languages", getLanguages);



// module.exports = router;

const express = require("express");
const { 
  createCompany, 
  getCompany, 
  getCompanies, 
  deleteCompany, 
  updateCompany, 
  getLanguages 
} = require("../controllers/companyController");
const upload = require("../multer");

const router = express.Router();

// Company CRUD
router.post("/", upload.single("contract"), createCompany);
router.put("/:id", upload.single("contract"), updateCompany);
router.delete("/:id", deleteCompany);

// Languages must be above /:id
router.get("/languages", getLanguages);

// Company fetching
router.get("/:id", getCompany);
router.get("/", getCompanies);

module.exports = router;
