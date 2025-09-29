// src/pages/CompanyProfile.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import "./CompanyProfile.css";

// export default function CompanyProfile() {
//   return (
//     <div className="register-container">
//       {/* Top bar */}
//       <header
//         className="banner"
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <h1 style={{ margin: 0 }}>Company Profile</h1>
//         <Link to="/company-profile/new" className="create-file-btn">
//           Create a Company Profile
//         </Link>
//       </header>

//       <footer className="footer">© 2025 Comviva. All rights reserved.</footer>
//     </div>
//   );
// }







// src/pages/CompanyProfile.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CompanyProfile.css";

export default function CompanyProfile() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch companies from backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const base = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${base}/api/companies`);
        if (!res.ok) throw new Error("Failed to fetch companies");
        const data = await res.json();
        setCompanies(data.data || []); // backend returns {data: [...]}
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="register-container">
      {/* Top bar */}
      <header
        className="banner"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
       <Link to="/company-profile/new" className="create-file-btn">
  📂 Create a Company Profile
</Link>

      </header>

      {/* Table of registered companies */}
      <main className="company-table-container">
        <h2>Registered Companies</h2>
        {loading ? (
          <p>Loading...</p>
        ) : companies.length === 0 ? (
          <p>No companies registered yet.</p>
        ) : (
          <table className="company-table">
            <thead>
              <tr>
                <th>Company ID</th>
                <th>Company Name</th>
                <th>Owner</th>
                <th>Address</th>
                <th>Description</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Discount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => (
                <tr key={c.company_id}>
                  <td>{c.company_id}</td>
                  <td>{c.company_name}</td>
                  <td>{c.owner_name}</td>
                  <td>{c.address}</td>
                  <td>{c.company_description}</td>
                  <td>{c.email}</td>
                  <td>{c.mobile}</td>
                  <td>{c.category}</td>
                  <td>{c.subcategory}</td>
                  <td>{c.discount}%</td>
                  <td>
                    <button className="edit-btn">✏️</button>
                    <button className="delete-btn">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      <footer className="footer">© 2025 Comviva. All rights reserved.</footer>
    </div>
  );
}











// // src/pages/CompanyProfile.jsx
// import React, { useState } from "react";
// import TermsModal from "../components/TermsModal";
// import "./CompanyProfile.css";
// import { Link } from "react-router-dom";

// // 🔹 Add messages here
// const messages = {
//   en: {
//     labels: {
//       company_id: "Company ID (e.g., CMP001)",
//       company_name: "Company Name",
//       description: "Description",
//       address: "Address",
//       owner: "Owner",
//       email: "Email",
//       mobile: "Mobile",
//       landline: "Landline",
//       category: "Category",
//       subcategory: "Subcategory",
//       discount: "Discount (%)",
//       comments: "Comments",
//       contract: "Upload Contract",
//       agree: "I agree to Terms & Conditions"
//     },
//     errors: {
//       company_id: "Company ID is required",
//       company_name: "Company Name is required",
//       description: "Description is required",
//       address: "Address is required",
//       owner: "Owner is required",
//       email: "Valid email required",
//       mobile: "Mobile must be 8–15 digits",
//       discount_required: "Discount is required",
//       discount_format: "Max 2-digit number",
//       category: "Select category",
//       subcategory: "Select subcategory",
//       agree: "You must agree to Terms"
//     }
//   },
//   fr: {
//     labels: {
//       company_id: "ID d'entreprise (ex: CMP001)",
//       company_name: "Nom de l'entreprise",
//       description: "Description",
//       address: "Adresse",
//       owner: "Propriétaire",
//       email: "Email",
//       mobile: "Téléphone portable",
//       landline: "Ligne fixe",
//       category: "Catégorie",
//       subcategory: "Sous-catégorie",
//       discount: "Remise (%)",
//       comments: "Commentaires",
//       contract: "Télécharger le contrat",
//       agree: "J'accepte les conditions générales"
//     },
//     errors: {
//       company_id: "ID d'entreprise requis",
//       company_name: "Nom de l'entreprise requis",
//       description: "Description requise",
//       address: "Adresse requise",
//       owner: "Propriétaire requis",
//       email: "Email valide requis",
//       mobile: "Le mobile doit comporter 8 à 15 chiffres",
//       discount_required: "La remise est obligatoire",
//       discount_format: "Nombre maximum à 2 chiffres",
//       category: "Sélectionnez une catégorie",
//       subcategory: "Sélectionnez une sous-catégorie",
//       agree: "Vous devez accepter les conditions"
//     }
//   },
//   ar: {
//     labels: {
//       company_id: "معرف الشركة (مثل: CMP001)",
//       company_name: "اسم الشركة",
//       description: "الوصف",
//       address: "العنوان",
//       owner: "المالك",
//       email: "البريد الإلكتروني",
//       mobile: "رقم الهاتف",
//       landline: "الهاتف الأرضي",
//       category: "الفئة",
//       subcategory: "الفئة الفرعية",
//       discount: "الخصم (%)",
//       comments: "ملاحظات",
//       contract: "تحميل العقد",
//       agree: "أوافق على الشروط والأحكام"
//     },
//     errors: {
//       company_id: "معرف الشركة مطلوب",
//       company_name: "اسم الشركة مطلوب",
//       description: "الوصف مطلوب",
//       address: "العنوان مطلوب",
//       owner: "المالك مطلوب",
//       email: "البريد الإلكتروني غير صالح",
//       mobile: "يجب أن يكون رقم الهاتف بين 8 و 15 رقمًا",
//       discount_required: "الخصم مطلوب",
//       discount_format: "الحد الأقصى رقم من رقمين",
//       category: "اختر الفئة",
//       subcategory: "اختر الفئة الفرعية",
//       agree: "يجب أن توافق على الشروط"
//     }
//   }
// };



// export default function CompanyProfile() {
//   const [showForm, setShowForm] = useState(false);
//   const [activeLang, setActiveLang] = useState("en");

//   const [form, setForm] = useState({
//     company_id: "",
//     // EN
//     companyEn: "",
//     descEn: "",
//     addressEn: "",
//     ownerEn: "",
//     // AR
//     companyAr: "",
//     descAr: "",
//     addressAr: "",
//     ownerAr: "",
//     // FR
//     companyFr: "",
//     descFr: "",
//     addressFr: "",
//     ownerFr: "",
//     // Global
//     email: "",
//     mobile: "",
//     landline: "",
//     category: "",
//     subcategory: "",
//     discount: "",
//     comments: "",
//     agree: false,
//   });

//   const [file, setFile] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [showTerms, setShowTerms] = useState(false);

//   const has = (s) => !!(s && s.trim());
//   const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   const labels = {
//   en: {
//     title: "English",
//     company: "Company Name",
//     desc: "Description",
//     address: "Address",
//     owner: "Owner",
//   },
//   fr: {
//     title: "Français",
//     company: "Nom de l'entreprise",
//     desc: "Description",
//     address: "Adresse",
//     owner: "Propriétaire",
//   },
//   ar: {
//     title: "العربية",
//     company: "اسم الشركة",
//     desc: "الوصف",
//     address: "العنوان",
//     owner: "المالك",
//   },
// };


// //validation

// const validate = (f) => {
//   const e = {};
//   const t = messages[activeLang].errors;

//   if (!has(f.company_id)) e.company_id = t.company_id;

//   // Language block validation
//   if (activeLang === "en") {
//     if (!has(f.companyEn)) e.companyEn = t.company_name;
//     if (!has(f.descEn)) e.descEn = t.description;
//     if (!has(f.addressEn)) e.addressEn = t.address;
//     if (!has(f.ownerEn)) e.ownerEn = t.owner;
//   }
//   if (activeLang === "fr") {
//     if (!has(f.companyFr)) e.companyFr = t.company_name;
//     if (!has(f.descFr)) e.descFr = t.description;
//     if (!has(f.addressFr)) e.addressFr = t.address;
//     if (!has(f.ownerFr)) e.ownerFr = t.owner;
//   }
//   if (activeLang === "ar") {
//     if (!has(f.companyAr)) e.companyAr = t.company_name;
//     if (!has(f.descAr)) e.descAr = t.description;
//     if (!has(f.addressAr)) e.addressAr = t.address;
//     if (!has(f.ownerAr)) e.ownerAr = t.owner;
//   }

//   if (!emailRx.test(f.email)) e.email = t.email;
//   if (!/^\d{8,15}$/.test(String(f.mobile || ""))) e.mobile = t.mobile;
//   if (!has(f.discount)) e.discount = t.discount_required;
//   else if (!/^\d{1,2}$/.test(f.discount)) e.discount = t.discount_format;
//   if (!f.category) e.category = t.category;
//   if (!f.subcategory) e.subcategory = t.subcategory;
//   if (!f.agree) e.agree = t.agree;

//   return e;
// };
// const handleChange = (e) => {
//   const { name, value, type, checked } = e.target;
//   const val = type === "checkbox" ? checked : value;

//   setForm((prev) => ({ ...prev, [name]: val }));

//   // 🔹 Clear error immediately if user fixes the field
//   setErrors((prev) => {
//     const updated = { ...prev };

//     if (name === "company_id" && has(val)) delete updated.company_id;
//     if (name.startsWith("company") && has(val)) delete updated[`company${langKey}`];
//     if (name.startsWith("desc") && has(val)) delete updated[`desc${langKey}`];
//     if (name.startsWith("address") && has(val)) delete updated[`address${langKey}`];
//     if (name.startsWith("owner") && has(val)) delete updated[`owner${langKey}`];

//     if (name === "email" && emailRx.test(val)) delete updated.email;
//     if (name === "mobile" && /^\d{8,15}$/.test(String(val))) delete updated.mobile;
//     if (name === "discount" && /^\d{1,2}$/.test(String(val))) delete updated.discount;
//     if (name === "category" && val) delete updated.category;
//     if (name === "subcategory" && val) delete updated.subcategory;
//     if (name === "agree" && val) delete updated.agree;

//     return updated;
//   });
// };


//   const handleFile = (e) => setFile(e.target.files?.[0] || null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitted(true);
//     const v = validate(form);
//     setErrors(v);
//     if (Object.keys(v).length > 0) return;

//     const fd = new FormData();
//     Object.entries(form).forEach(([k, v]) => fd.append(k, v));
//     if (file) fd.append("contract", file);

//     try {
//       const base = import.meta.env.VITE_API_URL || "";
//       const res = await fetch(`${base}/api/companies`, {
//         method: "POST",
//         body: fd,
//       });
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data = await res.json();
//       alert("✅ Submitted:\n" + JSON.stringify(data.data, null, 2));

//       setForm({
//         company_id: "",
//         companyEn: "",
//         descEn: "",
//         addressEn: "",
//         ownerEn: "",
//         companyAr: "",
//         descAr: "",
//         addressAr: "",
//         ownerAr: "",
//         companyFr: "",
//         descFr: "",
//         addressFr: "",
//         ownerFr: "",
//         email: "",
//         mobile: "",
//         landline: "",
//         category: "",
//         subcategory: "",
//         discount: "",
//         comments: "",
//         agree: false,
//       });
//       setFile(null);
//       setErrors({});
//       setSubmitted(false);
//       setShowForm(false);
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to save company: " + err.message);
//     }
//   };

//   const langKey = activeLang.charAt(0).toUpperCase() + activeLang.slice(1);
//   return (
//     <div className="register-container">
//       {/* Top bar */}
//     <header
//   className="banner"
//   style={{
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   }}
// >
//   <h1 style={{ margin: 0 }}>Company Profile</h1>
//   <Link to="/company-profile" className="create-file-btn">
//     Create a Company Profile
//   </Link>
// </header>

//       {/* Toggle form */}
//       {showForm && (
//         <main className="form-card">
//           <h2>Company Information</h2>
//           <form onSubmit={handleSubmit} autoComplete="off">
//             {/* Company ID */}
//             <div className="row">
//               <div className="col">
//                 <label>Company ID<span className="required">*</span> </label>
//                 <input
//                   name="company_id"
//                   value={form.company_id}
//                   onChange={handleChange}
//                 />
//                 {errors.company_id && <p className="error">{errors.company_id}</p>}
//               </div>
//             </div>

       
//             {/* Language Tabs */}
//             <div className="lang-tabs">
//               <button
//                 className={`lang-btn ${activeLang === "en" ? "active" : ""}`}
//                 onClick={(e) => { e.preventDefault(); setActiveLang("en"); }}
//               >
//                 English
//               </button>
//               <button
//                 className={`lang-btn ${activeLang === "fr" ? "active" : ""}`}
//                 onClick={(e) => { e.preventDefault(); setActiveLang("fr"); }}
//               >
//                 French
//               </button>
//               <button
//                 className={`lang-btn ${activeLang === "ar" ? "active" : ""}`}
//                 onClick={(e) => { e.preventDefault(); setActiveLang("ar"); }}
//               >
//                 Arabic
//               </button>
//             </div>


// {/* Language Card */}
// <div className="lang-card" dir={activeLang === "ar" ? "rtl" : "ltr"}>
//   <h3>{labels[activeLang].title}</h3>
  
//   <div className="row">
//     <div className="col">
//       <label>{labels[activeLang].company}<span className="required">*</span></label>
//       <input
//         name={`company${activeLang.toUpperCase()}`}
//         value={form[`company${activeLang.toUpperCase()}`]}
//         onChange={handleChange}
//         className="form-input"
//       />
//  {errors[`company${langKey}`] && (
//   <p className="error">{errors[`company${langKey}`]}</p>
// )}
//     </div>
//   </div>

//   <div className="row">
//     <div className="col">
//       <label>{labels[activeLang].desc}<span className="required">*</span></label>
//       <textarea
//         name={`desc${activeLang.toUpperCase()}`}
//         rows="3"
//         value={form[`desc${activeLang.toUpperCase()}`]}
//         onChange={handleChange}
//         className="form-textarea"
//       />
// {errors[`desc${langKey}`] && (
//   <p className="error">{errors[`desc${langKey}`]}</p>
// )}

//     </div>
//   </div>

//   <div className="row">
//     <div className="col">
//       <label>{labels[activeLang].address}<span className="required">*</span></label>
//       <textarea
//         name={`address${activeLang.toUpperCase()}`}
//         rows="3"
//         value={form[`address${activeLang.toUpperCase()}`]}
//         onChange={handleChange}
//         className="form-textarea"
//       />
//  {errors[`address${langKey}`] && (
//   <p className="error">{errors[`address${langKey}`]}</p>
// )}

//     </div>
//   </div>

//   <div className="row">
//     <div className="col">
//       <label>{labels[activeLang].owner}<span className="required">*</span></label>
//       <input
//         name={`owner${activeLang.toUpperCase()}`}
//         value={form[`owner${activeLang.toUpperCase()}`]}
//         onChange={handleChange}
//         className="form-input"
//       />
// {errors[`owner${langKey}`] && (
//   <p className="error">{errors[`owner${langKey}`]}</p>
// )}


//     </div>
//   </div>
// </div>




//             {/* Global Fields */}
//             <div className="row">
//               <div className="col">
//                 <label>Email<span className="required">*</span></label> 
//                 <input
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                 />
//                 {errors.email && <p className="error">{errors.email}</p>}
//               </div>
//               <div className="col">
//                 <label>Mobile<span className="required">*</span></label>
//                 <input
//                   type="tel"
//                   name="mobile"
//                   value={form.mobile}
//                   onChange={handleChange}
//                 />
//                 {errors.mobile && <p className="error">{errors.mobile}</p>}
//               </div>
//             </div>

//             <div className="row">
//               <div className="col">
//                 <label>Landline</label>
//                 <input
//                   type="tel"
//                   name="landline"
//                   value={form.landline}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className="row">
//               <div className="col">
//                 <label>Category<span className="required">*</span></label>
//                 <select
//                   name="category"
//                   value={form.category}
//                   onChange={handleChange}
//                 >
//                   <option value="">--Select--</option>
//                   <option value="hotel">Hotel</option>
//                   <option value="retail">Retail</option>
//                 </select>
//                 {errors.category && <p className="error">{errors.category}</p>}
//               </div>
//               <div className="col">
//                 <label>Subcategory<span className="required">*</span></label>
//                 <select
//                   name="subcategory"
//                   value={form.subcategory}
//                   onChange={handleChange}
//                 >
//                   <option value="">--Select--</option>
//                   <option value="health">Health</option>
//                   <option value="grocery">Grocery</option>
//                   <option value="fashion">Fashion</option>
//                 </select>
//                 {errors.subcategory && (
//                   <p className="error">{errors.subcategory}</p>
//                 )}
//               </div>
//             </div>

//             <div className="row">
//               <div className="col">
//                 <label>Discount (%)<span className="required">*</span></label>
//                 <input
//                   name="discount"
//                   value={form.discount}
//                   onChange={handleChange}
//                 />
//                 {errors.discount && <p className="error">{errors.discount}</p>}
//               </div>
//             </div>

//             <div className="row">
//               <div className="col">
//                 <label>Comments</label>
//                 <textarea
//                   name="comments"
//                   rows="3"
//                   value={form.comments}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className="row">
//               <div className="col">
//                 <label>Upload Contract</label>
//                 <input type="file" name="contract" onChange={handleFile} />
//               </div>
//             </div>

//             <div className="row">
//               <div className="col terms">
//                 <label className="terms-label">
//                   <input
//                     type="checkbox"
//                     name="agree"
//                     checked={form.agree}
//                     onChange={handleChange}
//                   />
//                   <span>
//                     I agree to{" "}
//                     <a
//                       href="#"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         setShowTerms(true);
//                       }}
//                     >
//                       Terms & Conditions
//                     </a>
//                   </span>
//                 </label>
//                 {errors.agree && <p className="error">{errors.agree}</p>}
//               </div>
//             </div>

//             <div className="button-group">
//               <button type="button" className="btn cancel">
//                 Reject
//               </button>
//               <button type="submit" className="btn submit">
//                 Approve
//               </button>
//             </div>
//           </form>
//         </main>
//       )}

//       <footer className="footer">© 2025 Comviva. All rights reserved.</footer>
//       <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />
//     </div>
//   );
// }

