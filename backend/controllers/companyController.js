
// controllers/companyController.js
const pool = require('../db');

/**
 * CREATE COMPANY
 */
exports.createCompany = async (req, res) => {
  const client = await pool.connect();
  try {
    let {
      company_id,
      email, mobile, landline,
      category, subcategory,
      discount, comments,
      properties // may come as string or object
    } = req.body;

    const contractPath = req.file ? `/uploads/contracts/${req.file.filename}` : null;

    if (!company_id) {
  return res.status(400).json({ success: false, error: "company_id is required" });
}
const { rows: existingId } = await client.query(
  `SELECT 1 FROM companies WHERE company_id = $1`,
  [company_id]
);
if (existingId.length > 0) {
  return res.status(400).json({ success: false, error: "company_id already exists" });
}

    // 🔹 Normalize properties
    if (typeof properties === "string") {
      try {
        properties = JSON.parse(properties);
      } catch (err) {
        console.error("❌ Failed to parse properties:", properties);
        properties = {};
      }
    }
    if (!properties || typeof properties !== "object") {
      properties = {};
    }

    console.log("Parsed properties:", properties);

    // 🔹 Validate required fields
    if (!email || !mobile || !category || !subcategory) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    // 🔹 Generate company_id (CMP001 style)
    // const { rows: existing } = await client.query(
    //   `SELECT COUNT(*)::int AS cnt FROM companies`
    // );
    // const company_id = `CMP${String(existing[0].cnt + 1).padStart(3, '0')}`;

    await client.query("BEGIN");

    // Insert into companies (root)
    await client.query(
      `INSERT INTO companies (company_id) VALUES ($1)`,
      [company_id]
    );

    // Insert into company_master
    await client.query(
      `INSERT INTO company_master
       (company_id, email, mobile, landline, category, subcategory, discount, comments, upload_contract)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        company_id,
        email,
        String(mobile || ""),
        landline || null,
        category,
        subcategory,
        discount || 0,
        comments ?? "",
        contractPath,
      ]
    );

    // Insert into company_properties (multilingual)
    // 🔹 Clean properties: keep only languages that have at least one non-empty field
properties = Object.fromEntries(
  Object.entries(properties).filter(([lang, vals]) =>
    vals && Object.values(vals).some(v => v && v.trim() !== "")
  )
);

    for (const [lang_id, vals] of Object.entries(properties)) {
      if (!vals) continue;
      const { company_name, description, address, owner_name } = vals;
      await client.query(
        `INSERT INTO company_properties
         (company_id, lang_id, company_name, description, address, owner_name)
         VALUES ($1,$2,$3,$4,$5,$6)`,
        [company_id, lang_id, company_name, description, address, owner_name]
      );
    }

    await client.query("COMMIT");
    // Fetch the newly created company with its properties
    const { rows: [company] } = await client.query(`
      SELECT m.company_id, m.email, m.mobile, m.landline,
             m.category, m.subcategory, m.discount, m.comments, m.upload_contract,
             COALESCE(
               jsonb_object_agg(
                 p.lang_id,
                 jsonb_build_object(
                   'company_name', p.company_name,
                   'description',  p.description,
                   'address',      p.address,
                   'owner_name',   p.owner_name
                 )
               ) FILTER (WHERE p.lang_id IS NOT NULL),
               '{}'::jsonb
             ) AS properties
      FROM company_master m
      LEFT JOIN company_properties p ON p.company_id = m.company_id
      WHERE m.company_id = $1
      GROUP BY m.company_id`, [company_id]
    );

    return res.json({ success: true, data: company });
   // return res.json({ success: true, company_id });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("createCompany error:", err.message);
    return res.status(500).json({ success: false, error: "Server error" });
  } finally {
    client.release();
  }
};

/**
 * GET COMPANIES
 */
exports.getCompanies = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT m.company_id, m.email, m.mobile, m.landline,
             m.category, m.subcategory, m.discount, m.comments, m.upload_contract,
             COALESCE(
               jsonb_object_agg(
                 p.lang_id,
                 jsonb_build_object(
                   'company_name', p.company_name,
                   'description',  p.description,
                   'address',      p.address,
                   'owner_name',   p.owner_name
                 )
               ) FILTER (WHERE p.lang_id IS NOT NULL),
               '{}'::jsonb
             ) AS properties
      FROM company_master m
      LEFT JOIN company_properties p ON p.company_id = m.company_id
      GROUP BY m.company_id
      ORDER BY m.company_id DESC;
    `);

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const mapped = rows.map(row => ({
      ...row,
      upload_contract: row.upload_contract ? `${baseUrl}${row.upload_contract}` : null
    }));

    res.json({ success: true, data: mapped });
  } catch (err) {
    console.error("getCompanies error:", err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
// DELETE COMPANY
// controllers/companyController.js
exports.deleteCompany = async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;

    await client.query("BEGIN");
    await client.query(`DELETE FROM company_properties WHERE company_id = $1`, [id]);
    await client.query(`DELETE FROM company_master WHERE company_id = $1`, [id]);
    await client.query(`DELETE FROM companies WHERE company_id = $1`, [id]);
    await client.query("COMMIT");

    res.json({ success: true, message: `Company ${id} deleted successfully` });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("deleteCompany error:", err.message);
    res.status(500).json({ success: false, error: "Server error" });
  } finally {
    client.release();
  }
};

exports.updateCompany = async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;
    let {
      email, mobile, landline,
      category, subcategory,
      discount, comments,
      properties
    } = req.body;

    const contractPath = req.file ? `/uploads/contracts/${req.file.filename}` : null;

    if (typeof properties === "string") {
      try {
        properties = JSON.parse(properties);
      } catch {
        properties = {};
      }
    }

    await client.query("BEGIN");

    // Update company_master
    await client.query(
      `UPDATE company_master
       SET email=$1, mobile=$2, landline=$3,
           category=$4, subcategory=$5, discount=$6, comments=$7,
           upload_contract=COALESCE($8, upload_contract)
       WHERE company_id=$9`,
      [
        email,
        String(mobile || ""),
        landline || null,
        category,
        subcategory,
        discount || 0,
        comments ?? "",
        contractPath,
        id
      ]
    );

    // Remove old properties
    await client.query(`DELETE FROM company_properties WHERE company_id=$1`, [id]);

    // Clean & re-insert properties
    properties = Object.fromEntries(
      Object.entries(properties).filter(([lang, vals]) =>
        vals && Object.values(vals).some((v) => v && v.trim() !== "")
      )
    );

    for (const [lang_id, vals] of Object.entries(properties)) {
      const { company_name, description, address, owner_name } = vals;
      await client.query(
        `INSERT INTO company_properties
         (company_id, lang_id, company_name, description, address, owner_name)
         VALUES ($1,$2,$3,$4,$5,$6)`,
        [id, lang_id, company_name, description, address, owner_name]
      );
    }

    await client.query("COMMIT");

    res.json({ success: true, message: "Company updated successfully" });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("updateCompany error:", err.message);
    res.status(500).json({ success: false, error: "Server error" });
  } finally {
    client.release();
  }
};

// controllers/companyController.js
exports.getCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      `SELECT m.company_id, m.email, m.mobile, m.landline,
              m.category, m.subcategory, m.discount, m.comments, m.upload_contract,
              COALESCE(
                jsonb_object_agg(
                  p.lang_id,
                  jsonb_build_object(
                    'company_name', p.company_name,
                    'description',  p.description,
                    'address',      p.address,
                    'owner_name',   p.owner_name
                  )
                ) FILTER (WHERE p.lang_id IS NOT NULL),
                '{}'::jsonb
              ) AS properties
       FROM company_master m
       LEFT JOIN company_properties p ON p.company_id = m.company_id
       WHERE m.company_id = $1
       GROUP BY m.company_id`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: "Company not found" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const company = {
      ...rows[0],
      upload_contract: rows[0].upload_contract
        ? `${baseUrl}${rows[0].upload_contract}`
        : null,
    };

    res.json({ success: true, data: company });
  } catch (err) {
    console.error("getCompany error:", err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
// controllers/companyController.js
exports.getLanguages = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT DISTINCT lang_id 
      FROM company_properties 
      WHERE lang_id IS NOT NULL
      ORDER BY lang_id;
    `);

    res.json({ success: true, data: rows });
  } catch (err) {
    console.error("getLanguages error:", err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

