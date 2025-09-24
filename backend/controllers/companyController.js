const pool = require('../db');

const pick = (en, ar) => (en && en.trim()) || (ar && ar.trim()) || null;

exports.createCompany = async (req, res) => {
  try {
    const {
      companyEn, companyAr,
      descEn, descAr,
      addressEn, addressAr,
      ownerEn, ownerAr,
      email, mobile, landline,
      category, subcategory,   
      discount, comments
    } = req.body;

    const contractPath = req.file ? `/uploads/contracts/${req.file.filename}` : null;

    const company_name         = pick(companyEn, companyAr);
    const company_description  = pick(descEn, descAr);
    const address              = pick(addressEn, addressAr);
    const owner_name           = pick(ownerEn, ownerAr);

    const discount_percentage = (discount === '' || discount == null)
      ? 0
      : Number(discount);

    if (
      !company_name ||
      !company_description ||
      !address ||
      !owner_name ||
      !email ||
      !mobile ||
      !category ||
      !subcategory ||
      isNaN(discount_percentage) 
    ) {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid required fields'
      });
    }

    const insertSql = `
      INSERT INTO master_table
        (company_name, company_description, address, owner_name,
         email, mobile_number, landline_number,
         category, sub_category, discount_percentage, comments, contract_file)
      VALUES
        ($1,$2,$3,$4, $5,$6,$7, $8,$9,$10,$11,$12)
      RETURNING *;
    `;

    const params = [
      company_name,
      company_description,
      address,
      owner_name,
      email,
      String(mobile || ''),
      landline ? String(landline) : null,
      category,
      subcategory,
      discount_percentage,               
      comments ?? '',                    
      contractPath                       
    ];

    const { rows } = await pool.query(insertSql, params);
    return res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('Insert company failed:', err?.message, err?.detail || '');
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getCompanies = async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM master_table ORDER BY id DESC;');
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const mapped = rows.map(row => ({
    ...row,
    contract_file: row.contract_file ? `${baseUrl}${row.contract_file}` : null
  }));
  res.json({ success: true, data: mapped });
};

