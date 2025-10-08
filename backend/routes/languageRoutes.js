const express = require("express");
const {
  getLanguages,
  getLanguageById,
  addLanguage,
  updateLanguage,
  deleteLanguage,
} = require("../controllers/languageController");

const router = express.Router();

router.get("/", getLanguages);
router.get("/:id", getLanguageById);
router.post("/", addLanguage);
router.put("/:id", updateLanguage);
router.delete("/:id", deleteLanguage);

module.exports = router;
