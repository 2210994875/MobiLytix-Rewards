const express = require("express");
const {
  getLanguages,
  addLanguage,
  getLanguageById,   // import it
} = require("../controllers/languageController");

const router = express.Router();

// Routes
router.get("/", getLanguages);       // all languages
router.post("/", addLanguage);       // add language
router.get("/:id", getLanguageById); // single language by ID

module.exports = router;
