// const pool = require('../db');
// exports.createCompany = async (req, res) => {
//   const client = await pool.connect();
//   try {
//     let {
//       email, mobile, landline,
//       category, subcategory,
//       discount, comments,
//       properties // may come as string
//     } = req.body;

//     const contractPath = req.file ? `/uploads/contracts/${req.file.filename}` : null;

//     // 🔴 PLACE THE PARSING LOGIC RIGHT HERE 🔴
//     if (properties && typeof properties === "string") {
//       try {
//         properties = JSON.parse(properties);
//       } catch (err) {
//         console.error("❌ Failed to parse properties:", properties);
//         properties = {};
//       }
//     } else if (!properties) {
//       properties = {};
//     }

//     console.log("Parsed properties:", properties);
//     // --------------------------------------------------

//     if (!email || !mobile || !category || !subcategory) {
//       return res.status(400).json({ success: false, error: 'Missing required fields' });
//     }

//     // Generate company_id (e.g., CMP001 style)
//     const { rows: existing } = await client.query(
//       `SELECT COUNT(*)::int AS cnt FROM companies`
//     );
//     const company_id = `CMP${String(existing[0].cnt + 1).padStart(3, '0')}`;

//     await client.query('BEGIN');

//     // Insert into companies (root)
//     await client.query(
//       `INSERT INTO companies (company_id) VALUES ($1)`,
//       [company_id]
//     );

//     // Insert into company_master
//     await client.query(
//       `INSERT INTO company_master
//        (company_id, email, mobile, landline, category, subcategory, discount, comments, upload_contract)
//        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
//       [
//         company_id, email, String(mobile || ''), landline || null,
//         category, subcategory, discount || 0, comments ?? '', contractPath
//       ]
//     );

//     // Insert into company_properties (multilingual)
//     if (properties && typeof properties === 'object') {
//       for (const [lang_id, vals] of Object.entries(properties)) {
//         if (!vals) continue;
//         const { company_name, description, address, owner_name } = vals;
//         await client.query(
//           `INSERT INTO company_properties
//            (company_id, lang_id, company_name, description, address, owner_name)
//            VALUES ($1,$2,$3,$4,$5,$6)`,
//           [company_id, lang_id, company_name, description, address, owner_name]
//         );
//       }
//     }

//     await client.query('COMMIT');
//     return res.json({ success: true, company_id });
//   } catch (err) {
//     await client.query('ROLLBACK');
//     console.error('createCompany error:', err.message);
//     return res.status(500).json({ success: false, error: 'Server error' });
//     let {
//       email, mobile, landline,
//       category, subcategory,
//       discount, comments,
//       properties // may come as string or object
//     } = req.body;

//     const contractPath = req.file ? `/uploads/contracts/${req.file.filename}` : null;

//     if (!email || !mobile || !category || !subcategory) {
//       return res.status(400).json({ success: false, error: 'Missing required fields' });
//     }

//     // Always try to parse properties if it's a string
//     if (typeof properties === "string") {
//       try {
//         properties = JSON.parse(properties);
//       } catch (err) {
//         console.error("❌ Failed to parse properties:", properties);
//         properties = {};
//       }
//     }
//     // If properties is not an object, set to empty object
//     if (!properties || typeof properties !== "object") {
//       properties = {};
//     }

//     console.log("Parsed properties:", properties);
// //       } catch (err) {
// //         console.error("❌ Failed to parse properties:", properties);
// //         properties = {};
// //       }
// //     } else if (!properties) {
// //       properties = {};
// //     }

// //     console.log("Parsed properties:", properties);
// //     // Generate company_id (e.g., CMP001 style)
// //     const { rows: existing } = await client.query(
// //       `SELECT COUNT(*)::int AS cnt FROM companies`
// //     );
// //     const company_id = `CMP${String(existing[0].cnt + 1).padStart(3, '0')}`;

// //     await client.query('BEGIN');

// //     // Insert into companies (root)
// //     await client.query(
// //       `INSERT INTO companies (company_id) VALUES ($1)`,
// //       [company_id]
// //     );

// //     // Insert into company_master
// //     await client.query(
// //       `INSERT INTO company_master
// //        (company_id, email, mobile, landline, category, subcategory, discount, comments, upload_contract)
// //        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
// //       [
// //         company_id, email, String(mobile || ''), landline || null,
// //         category, subcategory, discount || 0, comments ?? '', contractPath
// //       ]
// //     );

// //     // Insert into company_properties (multilingual)
// //     if (properties && typeof properties === 'object') {
// //       for (const [lang_id, vals] of Object.entries(properties)) {
// //         if (!vals) continue; // skip empty
// //         const { company_name, description, address, owner_name } = vals;
// //         await client.query(
// //           `INSERT INTO company_properties
// //            (company_id, lang_id, company_name, description, address, owner_name)
// //            VALUES ($1,$2,$3,$4,$5,$6)`,
// //           [company_id, lang_id, company_name, description, address, owner_name]
// //         );
// //       }
// //     }

// //     await client.query('COMMIT');
// //     return res.json({ success: true, company_id });
// //   } catch (err) {
// //     await client.query('ROLLBACK');
// //     console.error('createCompany error:', err.message);
// //     return res.status(500).json({ success: false, error: 'Server error' });
// //   } finally {
// //     client.release();
// //   }
// // };


// // // CREATE COMPANY
// // exports.createCompany = async (req, res) => {
// //   const client = await pool.connect();
// //   try {
// //     const {
// //       email, mobile, landline,
// //       category, subcategory,
// //       discount, comments,
// //       properties // object like { EN: {...}, FR: {...}, AR: {...} }
// //     } = req.body;

// //     const contractPath = req.file ? `/uploads/contracts/${req.file.filename}` : null;

// //     if (!email || !mobile || !category || !subcategory) {
// //       return res.status(400).json({ success: false, error: 'Missing required fields' });
// //     }

// //     // Generate company_id (e.g., CMP001 style)
// //     const { rows: existing } = await client.query(
// //       `SELECT COUNT(*)::int AS cnt FROM companies`
// //     );
// //     const company_id = `CMP${String(existing[0].cnt + 1).padStart(3, '0')}`;

// //     await client.query('BEGIN');

// //     // Insert into companies (root)
// //     await client.query(
// //       `INSERT INTO companies (company_id) VALUES ($1)`,
// //       [company_id]
// //     );

// //     // Insert into company_master
// //     await client.query(
// //       `INSERT INTO company_master
// //        (company_id, email, mobile, landline, category, subcategory, discount, comments, upload_contract)
// //        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
// //       [
// //         company_id, email, String(mobile || ''), landline || null,
// //         category, subcategory, discount || 0, comments ?? '', contractPath
// //       ]
// //     );

// //     // Insert into company_properties
// //     if (properties && typeof properties === 'object') {
// //       for (const [lang_id, vals] of Object.entries(properties)) {
// //         const { company_name, description, address, owner_name } = vals;
// //         await client.query(
// //           `INSERT INTO company_properties
// //            (company_id, lang_id, company_name, description, address, owner_name)
// //            VALUES ($1,$2,$3,$4,$5,$6)`,
// //           [company_id, lang_id, company_name, description, address, owner_name]
// //         );
// //       }
// //     }

// //     await client.query('COMMIT');
// //     return res.json({ success: true, company_id });
// //   } catch (err) {
// //     await client.query('ROLLBACK');
// //     console.error('createCompany error:', err.message);
// //     return res.status(500).json({ success: false, error: 'Server error' });
// //   } finally {
// //     client.release();
// //   }
// // };

// // GET COMPANIES
// exports.getCompanies = async (req, res) => {
//   try {
//     const { rows } = await pool.query(`
//       SELECT m.company_id, m.email, m.mobile, m.landline,
//              m.category, m.subcategory, m.discount, m.comments, m.upload_contract,
//              COALESCE(
//                jsonb_object_agg(
//                  p.lang_id,
//                  jsonb_build_object(
//                    'company_name', p.company_name,
//                    'description',  p.description,
//                    'address',      p.address,
//                    'owner_name',   p.owner_name
//                  )
//                ) FILTER (WHERE p.lang_id IS NOT NULL),
//                '{}'::jsonb
//              ) AS properties
//       FROM company_master m
//       LEFT JOIN company_properties p ON p.company_id = m.company_id
//       GROUP BY m.company_id
//       ORDER BY m.company_id DESC;
//     `);

//     const baseUrl = `${req.protocol}://${req.get('host')}`;
//     const mapped = rows.map(row => ({
//       ...row,
//       upload_contract: row.upload_contract ? `${baseUrl}${row.upload_contract}` : null
//     }));

//     res.json({ success: true, data: mapped });
//   } catch (err) {
//     console.error('getCompanies error:', err.message);
//     res.status(500).json({ success: false, error: 'Server error' });
//   }
// };

// controllers/companyController.js
const pool = require('../db');

/**
 * CREATE COMPANY
 */
exports.createCompany = async (req, res) => {
  const client = await pool.connect();
  try {
    let {
      email, mobile, landline,
      category, subcategory,
      discount, comments,
      properties // may come as string or object
    } = req.body;

    const contractPath = req.file ? `/uploads/contracts/${req.file.filename}` : null;

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
    const { rows: existing } = await client.query(
      `SELECT COUNT(*)::int AS cnt FROM companies`
    );
    const company_id = `CMP${String(existing[0].cnt + 1).padStart(3, '0')}`;

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
    return res.json({ success: true, company_id });
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
