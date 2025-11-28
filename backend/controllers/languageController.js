const pool = require("../db");

// ✅ Get all languages
exports.getLanguages = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM languages ORDER BY lang_id");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching languages:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Add new language (create if missing)
exports.addLanguage = async (req, res) => {
  const { lang_id, lang_name } = req.body;

  try {
    // Check if exists
    const existing = await pool.query("SELECT * FROM languages WHERE lang_id = $1", [lang_id]);
    if (existing.rows.length > 0) {
      return res.json({
        message: "ℹ️ Language already exists",
        data: existing.rows[0],
      });
    }

    // Otherwise insert new
    const query = `
      INSERT INTO languages (lang_id, lang_name, lang_description_en, lang_description_local)
      VALUES ($1, $2, '', '')
      RETURNING *;
    `;
    const result = await pool.query(query, [lang_id, lang_name]);

    res.status(201).json({
      message: "✅ Language added successfully!",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("❌ Error adding language:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Get single language by ID
exports.getLanguageById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM languages WHERE lang_id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Language ${id} not found in DB.` });
    }
    res.json({ message: "✅ Language fetched successfully!", data: result.rows[0] });
  } catch (err) {
    console.error("❌ Error fetching language:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Update a language
exports.updateLanguage = async (req, res) => {
  const { id } = req.params;
  const { lang_name, lang_description_en, lang_description_local } = req.body;

  try {
   const result = await pool.query(
  `UPDATE languages
   SET lang_description_en = $1,
       lang_description_local = $2
   WHERE lang_id = $3
   RETURNING *`,
  [lang_description_en, lang_description_local, id]
);


    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Language not found" });
    }

    res.json({ message: "✅ Language updated successfully!", data: result.rows[0] });
  } catch (err) {
    console.error("❌ Error updating language:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Delete a language
exports.deleteLanguage = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM languages WHERE lang_id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Language not found" });
    }
    res.json({ message: "🗑️ Language deleted successfully!", data: result.rows[0] });
  } catch (err) {
    console.error("❌ Error deleting language:", err);
    res.status(500).json({ error: "Server error" });
  }
};
