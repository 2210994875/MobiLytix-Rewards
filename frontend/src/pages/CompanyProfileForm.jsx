// src/pages/CompanyProfileForm.jsx
import React, { useState } from "react";
import TermsModal from "../components/TermsModal";
import "./CompanyProfile.css";
//import "../styles/CompanyProfile.css";     // for the wrapper card + banner
import "./CompanyProfileForm.css"; // for the gradient language card + inputs



const messages = {
  en: {
    labels: {
      welcome: "Welcome",      
      company_id: "Company ID (e.g., CMP001)",
      company_name: "Company Name",
      description: "Description",
      address: "Address",
      owner: "Owner",
      email: "Email",
      mobile: "Mobile",
      landline: "Landline",
      category: "Category",
      subcategory: "Subcategory",
      discount: "Discount (%)",
      comments: "Comments",
      contract: "Upload Contract",
      agree: "I agree to Terms & Conditions",
    },
    errors: {
      company_id: "Company ID is required",
      company_name: "Company Name is required",
      description: "Description is required",
      address: "Address is required",
      owner: "Owner is required",
      email: "Valid email required",
      mobile: "Mobile must be 8–15 digits",
      discount_required: "Discount is required",
      discount_format: "Max 2-digit number",
      category: "Select category",
      subcategory: "Select subcategory",
      agree: "You must agree to Terms",
    },
  },
  fr: {
    labels: {
      welcome: "Bienvenue",   
      company_id: "ID d'entreprise (ex: CMP001)",
      company_name: "Nom de l'entreprise",
      description: "Description",
      address: "Adresse",
      owner: "Propriétaire",
      email: "Email",
      mobile: "Téléphone portable",
      landline: "Ligne fixe",
      category: "Catégorie",
      subcategory: "Sous-catégorie",
      discount: "Remise (%)",
      comments: "Commentaires",
      contract: "Télécharger le contrat",
      agree: "J'accepte les conditions générales",
    },
    errors: {
      company_id: "ID d'entreprise requis",
      company_name: "Nom de l'entreprise requis",
      description: "Description requise",
      address: "Adresse requise",
      owner: "Propriétaire requis",
      email: "Email valide requis",
      mobile: "Le mobile doit comporter 8 à 15 chiffres",
      discount_required: "La remise est obligatoire",
      discount_format: "Nombre maximum à 2 chiffres",
      category: "Sélectionnez une catégorie",
      subcategory: "Sélectionnez une sous-catégorie",
      agree: "Vous devez accepter les conditions",
    },
  },
  ar: {
    labels: {
      welcome: "أهلاً وسهلاً",   
      company_id: "معرف الشركة (مثل: CMP001)",
      company_name: "اسم الشركة",
      description: "الوصف",
      address: "العنوان",
      owner: "المالك",
      email: "البريد الإلكتروني",
      mobile: "رقم الهاتف",
      landline: "الهاتف الأرضي",
      category: "الفئة",
      subcategory: "الفئة الفرعية",
      discount: "الخصم (%)",
      comments: "ملاحظات",
      contract: "تحميل العقد",
      agree: "أوافق على الشروط والأحكام",
    },
    errors: {
      company_id: "معرف الشركة مطلوب",
      company_name: "اسم الشركة مطلوب",
      description: "الوصف مطلوب",
      address: "العنوان مطلوب",
      owner: "المالك مطلوب",
      email: "البريد الإلكتروني غير صالح",
      mobile: "يجب أن يكون رقم الهاتف بين 8 و 15 رقمًا",
      discount_required: "الخصم مطلوب",
      discount_format: "الحد الأقصى رقم من رقمين",
      category: "اختر الفئة",
      subcategory: "اختر الفئة الفرعية",
      agree: "يجب أن توافق على الشروط",
    },
  },
};

export default function CompanyProfileForm() {
  const [activeLang, setActiveLang] = useState("en");
  const [form, setForm] = useState({
    company_id: "",
    companyEn: "",
    descEn: "",
    addressEn: "",
    ownerEn: "",
    companyFr: "",
    descFr: "",
    addressFr: "",
    ownerFr: "",
    companyAr: "",
    descAr: "",
    addressAr: "",
    ownerAr: "",
    email: "",
    mobile: "",
    landline: "",
    category: "",
    subcategory: "",
    discount: "",
    comments: "",
    agree: false,
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [showTerms, setShowTerms] = useState(false);

  const has = (s) => !!(s && s.trim());
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = (f) => {
    const e = {};
    const t = messages[activeLang].errors;

    if (!has(f.company_id)) e.company_id = t.company_id;

    if (activeLang === "en") {
      if (!has(f.companyEn)) e.companyEn = t.company_name;
      if (!has(f.descEn)) e.descEn = t.description;
      if (!has(f.addressEn)) e.addressEn = t.address;
      if (!has(f.ownerEn)) e.ownerEn = t.owner;
    }
    if (activeLang === "fr") {
      if (!has(f.companyFr)) e.companyFr = t.company_name;
      if (!has(f.descFr)) e.descFr = t.description;
      if (!has(f.addressFr)) e.addressFr = t.address;
      if (!has(f.ownerFr)) e.ownerFr = t.owner;
    }
    if (activeLang === "ar") {
      if (!has(f.companyAr)) e.companyAr = t.company_name;
      if (!has(f.descAr)) e.descAr = t.description;
      if (!has(f.addressAr)) e.addressAr = t.address;
      if (!has(f.ownerAr)) e.ownerAr = t.owner;
    }

    if (!emailRx.test(f.email)) e.email = t.email;
    if (!/^\d{8,15}$/.test(String(f.mobile || ""))) e.mobile = t.mobile;
    if (!has(f.discount)) e.discount = t.discount_required;
    else if (!/^\d{1,2}$/.test(f.discount)) e.discount = t.discount_format;
    if (!f.category) e.category = t.category;
    if (!f.subcategory) e.subcategory = t.subcategory;
    if (!f.agree) e.agree = t.agree;

    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setForm((prev) => ({ ...prev, [name]: val }));

    setErrors((prev) => {
      const updated = { ...prev };
      if (has(val)) delete updated[name];
      return updated;
    });
  };

  const handleFile = (e) => setFile(e.target.files?.[0] || null);

const handleSubmit = async (e) => {
  e.preventDefault();
  const v = validate(form);
  setErrors(v);
  if (Object.keys(v).length > 0) return;

  const fd = new FormData();

  // Append global fields
  fd.append("email", form.email);
  fd.append("mobile", form.mobile);
  fd.append("landline", form.landline);
  fd.append("category", form.category);
  fd.append("subcategory", form.subcategory);
  fd.append("discount", form.discount);
  fd.append("comments", form.comments);

  // Append file
  if (file) fd.append("contract", file);

  // Build multilingual properties
  const properties = {
    EN: {
      company_name: form.companyEn,
      description: form.descEn,
      address: form.addressEn,
      owner_name: form.ownerEn,
    },
    FR: {
      company_name: form.companyFr,
      description: form.descFr,
      address: form.addressFr,
      owner_name: form.ownerFr,
    },
    AR: {
      company_name: form.companyAr,
      description: form.descAr,
      address: form.addressAr,
      owner_name: form.ownerAr,
    },
  };

  fd.append("properties", JSON.stringify(properties));

  // 🔍 Debug: log everything before sending
  console.log("🟢 Form state:", form);
  console.log("🟢 Properties being sent:", properties);

  for (let [key, value] of fd.entries()) {
    console.log("🟢 FormData entry:", key, value);
  }

  try {
    const base = import.meta.env.VITE_API_URL || "";
    const res = await fetch(`${base}/api/companies`, {
      method: "POST",
      body: fd,
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    alert("✅ Submitted:\n" + JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
    alert("❌ Failed to save company: " + err.message);
  }
};


  const langKey = activeLang.charAt(0).toUpperCase() + activeLang.slice(1);

  return (
    <div className="register-container">
      <header className="banner">
        <h1>Create Company Profile</h1>
      </header>

      <main className="form-card">
        <h2>Company Information</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Company ID */}
          <div className="row">
            <div className="col">
              <label>
                {messages[activeLang].labels.company_id}
                <span className="required">*</span>
              </label>
              <input
                name="company_id"
                value={form.company_id}
                onChange={handleChange}
              />
              {errors.company_id && <p className="error">{errors.company_id}</p>}
            </div>
          </div>

        <div className="lang-tabs">
        <button
            className={`lang-btn ${activeLang === "en" ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); setActiveLang("en"); }}
        >
            English
        </button>
        <button
            className={`lang-btn ${activeLang === "fr" ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); setActiveLang("fr"); }}
        >
            French
        </button>
        <button
            className={`lang-btn ${activeLang === "ar" ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); setActiveLang("ar"); }}
        >
            Arabic
        </button>
        </div>


          {/* Language Card */}
          <div className="lang-card" dir={activeLang === "ar" ? "rtl" : "ltr"}>
            <h3 className="welcome-heading">
  {messages[activeLang].labels.welcome}
</h3>


            <div className="field">
              <label>
                {messages[activeLang].labels.company_name}
                <span className="required">*</span>
              </label>
              <input
                name={`company${langKey}`}
                value={form[`company${langKey}`]}
                onChange={handleChange}
              />
              {errors[`company${langKey}`] && (
                <p className="error">{errors[`company${langKey}`]}</p>
              )}
            </div>

            <div className="field">
              <label>
                {messages[activeLang].labels.description}
                <span className="required">*</span>
              </label>
              <textarea
                name={`desc${langKey}`}
                rows="3"
                value={form[`desc${langKey}`]}
                onChange={handleChange}
              />
              {errors[`desc${langKey}`] && (
                <p className="error">{errors[`desc${langKey}`]}</p>
              )}
            </div>

            <div className="field">
              <label>
                {messages[activeLang].labels.address}
                <span className="required">*</span>
              </label>
              <textarea
                name={`address${langKey}`}
                rows="3"
                value={form[`address${langKey}`]}
                onChange={handleChange}
              />
              {errors[`address${langKey}`] && (
                <p className="error">{errors[`address${langKey}`]}</p>
              )}
            </div>

            <div className="field">
              <label>
                {messages[activeLang].labels.owner}
                <span className="required">*</span>
              </label>
              <input
                name={`owner${langKey}`}
                value={form[`owner${langKey}`]}
                onChange={handleChange}
              />
              {errors[`owner${langKey}`] && (
                <p className="error">{errors[`owner${langKey}`]}</p>
              )}
            </div>
          </div>

          {/* Global Fields */}
          <div className="row">
            <div className="col">
              <label>
                {messages[activeLang].labels.email}
                <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="col">
              <label>
                {messages[activeLang].labels.mobile}
                <span className="required">*</span>
              </label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
              />
              {errors.mobile && <p className="error">{errors.mobile}</p>}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>{messages[activeLang].labels.landline}</label>
              <input
                type="tel"
                name="landline"
                value={form.landline}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>
                {messages[activeLang].labels.category}
                <span className="required">*</span>
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">--Select--</option>
                <option value="hotel">Hotel</option>
                <option value="retail">Retail</option>
              </select>
              {errors.category && <p className="error">{errors.category}</p>}
            </div>
            <div className="col">
              <label>
                {messages[activeLang].labels.subcategory}
                <span className="required">*</span>
              </label>
              <select
                name="subcategory"
                value={form.subcategory}
                onChange={handleChange}
              >
                <option value="">--Select--</option>
                <option value="health">Health</option>
                <option value="grocery">Grocery</option>
                <option value="fashion">Fashion</option>
              </select>
              {errors.subcategory && (
                <p className="error">{errors.subcategory}</p>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>
                {messages[activeLang].labels.discount}
                <span className="required">*</span>
              </label>
              <input
                name="discount"
                value={form.discount}
                onChange={handleChange}
              />
              {errors.discount && <p className="error">{errors.discount}</p>}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>{messages[activeLang].labels.comments}</label>
              <textarea
                name="comments"
                rows="3"
                value={form.comments}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
  <div className="col">
    <label>Upload Contract</label>
    <input
      type="file"
      name="contract"
      accept=".pdf,.png,.jpg,.jpeg"
      onChange={(e) => setFile(e.target.files[0])}
    />
  </div>
</div>


       
{/* Terms & Conditions with toggle */}
<div className="row">
  <div className="col terms">
    <label className="terms-label">
      {/* Toggle Switch */}
      <div
        className={`toggle-switch ${form.agree ? "on" : ""}`}
        onClick={() =>
          setForm((prev) => ({ ...prev, agree: !prev.agree }))
        }
      >
        <div className="toggle-slider"></div>
      </div>

      {/* Text + Modal Link */}
      <span>
        I agree to{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setShowTerms(true); // ✅ open popup
          }}
        >
          Terms & Conditions
        </a>
      </span>
    </label>

    {/* Validation error */}
    {errors.agree && <p className="error">{errors.agree}</p>}
  </div>
</div>

{/* Terms Modal Popup */}
<TermsModal open={showTerms} onClose={() => setShowTerms(false)} />



          <div className="button-group">
            <button type="button" className="btn cancel">
              Reject
            </button>
            <button type="submit" className="btn submit">
              Approve
            </button>
          </div>
        </form>
      </main>

      <footer className="footer">© 2025 Comviva. All rights reserved.</footer>
      <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />
    </div>
  );
}
