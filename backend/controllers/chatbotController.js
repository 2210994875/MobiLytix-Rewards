// controllers/chatbotController.js
const pool = require("../db");

// Get all FAQs
exports.getFaqs = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, question, answer FROM chatbot_faqs ORDER BY id"
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error("❌ Error fetching chatbot FAQs:", err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
