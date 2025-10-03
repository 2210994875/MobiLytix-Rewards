const pool = require("../db");

exports.getLanguages = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM languages ORDER BY lang_id");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching languages:", err);
    res.status(500).json({ error: "Server error" });
  }
};



exports.addLanguage = async (req, res) => {
  const { lang_id, lang_name } = req.body;

  try {
    // Insert or update if already exists
    const query = `
      INSERT INTO languages (lang_id, lang_name, lang_description_en, lang_description_local)
      VALUES ($1, $2,
              (SELECT lang_description_en FROM languages WHERE lang_id = $1 LIMIT 1),
              (SELECT lang_description_local FROM languages WHERE lang_id = $1 LIMIT 1))
      ON CONFLICT (lang_id) DO NOTHING
      RETURNING *;
    `;

    const result = await pool.query(query, [lang_id, lang_name]);

    if (result.rows.length > 0) {
      res.status(201).json({
        message: "✅ Language added successfully!",
        data: result.rows[0],
      });
    } else {
      // If already exists, just fetch it
      const existing = await pool.query(
        "SELECT * FROM languages WHERE lang_id = $1",
        [lang_id]
      );
      res.json({
        message: "ℹ️ Language already exists",
        data: existing.rows[0],
      });
    }
  } catch (err) {
    console.error("❌ Error adding language:", err);
    res.status(500).json({ error: "Server error" });
  }
};


// ✅ Get single language by ID
exports.getLanguageById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM languages WHERE lang_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Language not found" });
    }

    res.json({
      message: "✅ Language fetched successfully!",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("❌ Error fetching language:", err);
    res.status(500).json({ error: "Server error" });
  }
};

