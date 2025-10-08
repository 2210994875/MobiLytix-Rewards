const express = require("express");
const router = express.Router();
const pool = require("../db");

// ✅ GET dashboard statistics (active companies + supported languages)
router.get("/stats", async (req, res) => {
  try {
    const companyCountResult = await pool.query(
      "SELECT COUNT(*) AS active_companies FROM companies"
    );
    const languageCountResult = await pool.query(
      "SELECT COUNT(*) AS total_languages FROM languages"
    );

    res.json({
      activeCompanies: parseInt(companyCountResult.rows[0].active_companies, 10),
      totalLanguages: parseInt(languageCountResult.rows[0].total_languages, 10),
    });
  } catch (err) {
    console.error("❌ Error fetching dashboard stats:", err);
    res.status(500).json({ error: "Server error fetching dashboard stats" });
  }
});

module.exports = router;
