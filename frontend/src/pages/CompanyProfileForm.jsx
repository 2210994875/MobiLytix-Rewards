// // src/pages/CompanyProfileForm.jsx
// import React, { useState } from "react";
// import TermsModal from "../components/TermsModal";
// import "./CompanyProfile.css";
// //import "../styles/CompanyProfile.css";     // for the wrapper card + banner
// import "./CompanyProfileForm.css"; // for the gradient language card + inputs



// const messages = {
//   en: {
//     labels: {
//       welcome: "Welcome",      
//       company_id: "Company ID",
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
//       agree: "I agree to Terms & Conditions",
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
//       agree: "You must agree to Terms",
//     },
//   },
//   fr: {
//     labels: {
//       welcome: "Bienvenue",   
//       company_id: "ID d'entreprise",
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
//       agree: "J'accepte les conditions générales",
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
//       agree: "Vous devez accepter les conditions",
//     },
//   },
//   ar: {
//     labels: {
//       welcome: "أهلاً وسهلاً",   
//       company_id: "معرف الشركة ",
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
//       agree: "أوافق على الشروط والأحكام",
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
//       agree: "يجب أن توافق على الشروط",
//     },
//   },
// };

// export default function CompanyProfileForm() {
//   const [activeLang, setActiveLang] = useState("en");
//   const [form, setForm] = useState({
//     company_id: "",
//     companyEn: "",
//     descEn: "",
//     addressEn: "",
//     ownerEn: "",
//     companyFr: "",
//     descFr: "",
//     addressFr: "",
//     ownerFr: "",
//     companyAr: "",
//     descAr: "",
//     addressAr: "",
//     ownerAr: "",
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
//   const [showTerms, setShowTerms] = useState(false);

//   const has = (s) => !!(s && s.trim());
//   const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   const validate = (f) => {
//     const e = {};
//     const t = messages[activeLang].errors;

//     if (!has(f.company_id)) e.company_id = t.company_id;

//     if (activeLang === "en") {
//       if (!has(f.companyEn)) e.companyEn = t.company_name;
//       if (!has(f.descEn)) e.descEn = t.description;
//       if (!has(f.addressEn)) e.addressEn = t.address;
//       if (!has(f.ownerEn)) e.ownerEn = t.owner;
//     }
//     if (activeLang === "fr") {
//       if (!has(f.companyFr)) e.companyFr = t.company_name;
//       if (!has(f.descFr)) e.descFr = t.description;
//       if (!has(f.addressFr)) e.addressFr = t.address;
//       if (!has(f.ownerFr)) e.ownerFr = t.owner;
//     }
//     if (activeLang === "ar") {
//       if (!has(f.companyAr)) e.companyAr = t.company_name;
//       if (!has(f.descAr)) e.descAr = t.description;
//       if (!has(f.addressAr)) e.addressAr = t.address;
//       if (!has(f.ownerAr)) e.ownerAr = t.owner;
//     }

//     if (!emailRx.test(f.email)) e.email = t.email;
//     if (!/^\d{8,15}$/.test(String(f.mobile || ""))) e.mobile = t.mobile;
//     if (!has(f.discount)) e.discount = t.discount_required;
//     else if (!/^\d{1,2}$/.test(f.discount)) e.discount = t.discount_format;
//     if (!f.category) e.category = t.category;
//     if (!f.subcategory) e.subcategory = t.subcategory;
//     if (!f.agree) e.agree = t.agree;

//     return e;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const val = type === "checkbox" ? checked : value;

//     setForm((prev) => ({ ...prev, [name]: val }));

//     setErrors((prev) => {
//       const updated = { ...prev };
//       if (has(val)) delete updated[name];
//       return updated;
//     });
//   };

//   const handleFile = (e) => setFile(e.target.files?.[0] || null);

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const v = validate(form);
//   setErrors(v);
//   if (Object.keys(v).length > 0) return;

//   const fd = new FormData();

//   // Append global fields
//   fd.append("company_id", form.company_id);
//   fd.append("email", form.email);
//   fd.append("mobile", form.mobile);
//   fd.append("landline", form.landline);
//   fd.append("category", form.category);
//   fd.append("subcategory", form.subcategory);
//   fd.append("discount", form.discount);
//   fd.append("comments", form.comments);

//   // Append file
//   if (file) fd.append("contract", file);

//   // ✅ Only send active language
//   let activeProperties = {};
//   if (activeLang === "en") {
//     activeProperties = {
//       EN: {
//         company_name: form.companyEn,
//         description: form.descEn,
//         address: form.addressEn,
//         owner_name: form.ownerEn,
//       },
//     };
//   } else if (activeLang === "fr") {
//     activeProperties = {
//       FR: {
//         company_name: form.companyFr,
//         description: form.descFr,
//         address: form.addressFr,
//         owner_name: form.ownerFr,
//       },
//     };
//   } else if (activeLang === "ar") {
//     activeProperties = {
//       AR: {
//         company_name: form.companyAr,
//         description: form.descAr,
//         address: form.addressAr,
//         owner_name: form.ownerAr,
//       },
//     };
//   }

//   fd.append("properties", JSON.stringify(activeProperties));

//   try {
//     const base = import.meta.env.VITE_API_URL || "";

//     // 🔹 Decide whether to create or update
//     const url = id
//       ? `${base}/api/companies/${id}` // update
//       : `${base}/api/companies`;      // create

//     const method = id ? "PUT" : "POST";

//     const res = await fetch(url, {
//       method,
//       body: fd,
//     });

//     const response = await res.json();

//     if (!res.ok) {
//       alert(`❌ Failed to save company: ${response.error || "Unknown error"}`);
//       return;
//     }

//     if (id) {
//       alert("✅ Company updated successfully!");
//     } else {
//       alert("✅ Company created successfully!");
//     }

//     // 👈 go back to list page after save
//     navigate("/company-profile");
//   } catch (err) {
//     console.error("❌ Error:", err);
//     alert("❌ Failed to save company: " + err.message);
//   }
// };

//   const langKey = activeLang.charAt(0).toUpperCase() + activeLang.slice(1);

//   return (
//     <div className="register-container">
//       <header className="banner">
//         <h1>Create Company Profile</h1>
//       </header>

//       <main className="form-card">
//         <h2>Company Information</h2>
//         <form onSubmit={handleSubmit} autoComplete="off">
//           {/* Company ID */}
//           <div className="row">
//             <div className="col">
//               <label>
//                 {messages[activeLang].labels.company_id}
//                 <span className="required">*</span>
//               </label>
//              <input
//   type="text"
//   name="company_id"
//   placeholder="Enter Company ID"
//   value={form.company_id}
//   onChange={handleChange}
// />
// {errors.company_id && <p className="error">{errors.company_id}</p>}

//             </div>
//           </div>

//         <div className="lang-tabs">
//         <button
//             className={`lang-btn ${activeLang === "en" ? "active" : ""}`}
//             onClick={(e) => { e.preventDefault(); setActiveLang("en"); }}
//         >
//             English
//         </button>
//         <button
//             className={`lang-btn ${activeLang === "fr" ? "active" : ""}`}
//             onClick={(e) => { e.preventDefault(); setActiveLang("fr"); }}
//         >
//             French
//         </button>
//         <button
//             className={`lang-btn ${activeLang === "ar" ? "active" : ""}`}
//             onClick={(e) => { e.preventDefault(); setActiveLang("ar"); }}
//         >
//             Arabic
//         </button>
//         </div>


//           {/* Language Card */}
//           <div className="lang-card" dir={activeLang === "ar" ? "rtl" : "ltr"}>
//             <h3 className="welcome-heading">
//   {messages[activeLang].labels.welcome}
// </h3>


//             <div className="field">
//               <label>
//                 {messages[activeLang].labels.company_name}
//                 <span className="required">*</span>
//               </label>
//               <input
//                 name={`company${langKey}`}
//                 value={form[`company${langKey}`]}
//                 onChange={handleChange}
//               />
//               {errors[`company${langKey}`] && (
//                 <p className="error">{errors[`company${langKey}`]}</p>
//               )}
//             </div>

//             <div className="field">
//               <label>
//                 {messages[activeLang].labels.description}
//                 <span className="required">*</span>
//               </label>
//               <textarea
//                 name={`desc${langKey}`}
//                 rows="3"
//                 value={form[`desc${langKey}`]}
//                 onChange={handleChange}
//               />
//               {errors[`desc${langKey}`] && (
//                 <p className="error">{errors[`desc${langKey}`]}</p>
//               )}
//             </div>

//             <div className="field">
//               <label>
//                 {messages[activeLang].labels.address}
//                 <span className="required">*</span>
//               </label>
//               <textarea
//                 name={`address${langKey}`}
//                 rows="3"
//                 value={form[`address${langKey}`]}
//                 onChange={handleChange}
//               />
//               {errors[`address${langKey}`] && (
//                 <p className="error">{errors[`address${langKey}`]}</p>
//               )}
//             </div>

//             <div className="field">
//               <label>
//                 {messages[activeLang].labels.owner}
//                 <span className="required">*</span>
//               </label>
//               <input
//                 name={`owner${langKey}`}
//                 value={form[`owner${langKey}`]}
//                 onChange={handleChange}
//               />
//               {errors[`owner${langKey}`] && (
//                 <p className="error">{errors[`owner${langKey}`]}</p>
//               )}
//             </div>
//           </div>

//           {/* Global Fields */}
//           <div className="row">
//             <div className="col">
//               <label>
//                 {messages[activeLang].labels.email}
//                 <span className="required">*</span>
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//               />
//               {errors.email && <p className="error">{errors.email}</p>}
//             </div>
//             <div className="col">
//               <label>
//                 {messages[activeLang].labels.mobile}
//                 <span className="required">*</span>
//               </label>
//               <input
//                 type="tel"
//                 name="mobile"
//                 value={form.mobile}
//                 onChange={handleChange}
//               />
//               {errors.mobile && <p className="error">{errors.mobile}</p>}
//             </div>
//           </div>

//           <div className="row">
//             <div className="col">
//               <label>{messages[activeLang].labels.landline}</label>
//               <input
//                 type="tel"
//                 name="landline"
//                 value={form.landline}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="row">
//             <div className="col">
//               <label>
//                 {messages[activeLang].labels.category}
//                 <span className="required">*</span>
//               </label>
//               <select
//                 name="category"
//                 value={form.category}
//                 onChange={handleChange}
//               >
//                 <option value="">--Select--</option>
//                 <option value="hotel">Hotel</option>
//                 <option value="retail">Retail</option>
//               </select>
//               {errors.category && <p className="error">{errors.category}</p>}
//             </div>
//             <div className="col">
//               <label>
//                 {messages[activeLang].labels.subcategory}
//                 <span className="required">*</span>
//               </label>
//               <select
//                 name="subcategory"
//                 value={form.subcategory}
//                 onChange={handleChange}
//               >
//                 <option value="">--Select--</option>
//                 <option value="health">Health</option>
//                 <option value="grocery">Grocery</option>
//                 <option value="fashion">Fashion</option>
//               </select>
//               {errors.subcategory && (
//                 <p className="error">{errors.subcategory}</p>
//               )}
//             </div>
//           </div>

//           <div className="row">
//             <div className="col">
//               <label>
//                 {messages[activeLang].labels.discount}
//                 <span className="required">*</span>
//               </label>
//               <input
//                 name="discount"
//                 value={form.discount}
//                 onChange={handleChange}
//               />
//               {errors.discount && <p className="error">{errors.discount}</p>}
//             </div>
//           </div>

//           <div className="row">
//             <div className="col">
//               <label>{messages[activeLang].labels.comments}</label>
//               <textarea
//                 name="comments"
//                 rows="3"
//                 value={form.comments}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="row">
//   <div className="col">
//     <label>Upload Contract</label>
//     <input
//       type="file"
//       name="contract"
//       accept=".pdf,.png,.jpg,.jpeg"
//       onChange={(e) => setFile(e.target.files[0])}
//     />
//   </div>
// </div>


       
// {/* Terms & Conditions with toggle */}
// <div className="row">
//   <div className="col terms">
//     <label className="terms-label">
//       {/* Toggle Switch */}
//       <div
//         className={`toggle-switch ${form.agree ? "on" : ""}`}
//         onClick={() =>
//           setForm((prev) => ({ ...prev, agree: !prev.agree }))
//         }
//       >
//         <div className="toggle-slider"></div>
//       </div>

//       {/* Text + Modal Link */}
//       <span>
//         I agree to{" "}
//         <a
//           href="#"
//           onClick={(e) => {
//             e.preventDefault();
//             setShowTerms(true); // ✅ open popup
//           }}
//         >
//           Terms & Conditions
//         </a>
//       </span>
//     </label>

//     {/* Validation error */}
//     {errors.agree && <p className="error">{errors.agree}</p>}
//   </div>
// </div>

// {/* Terms Modal Popup */}
// <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />



//           <div className="button-group">
//             <button type="button" className="btn cancel">
//               Reject
//             </button>
//             <button type="submit" className="btn submit">
//               Approve
//             </button>
//           </div>
//         </form>
//       </main>

//       <footer className="footer">© 2025 Comviva. All rights reserved.</footer>
//       <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />
//     </div>
//   );
// }

// src/pages/CompanyProfileForm.jsx
import React, { useState, useEffect } from "react";
import TermsModal from "../components/TermsModal";
import "./CompanyProfile.css";
import "./CompanyProfileForm.css";
import { useParams, useNavigate } from "react-router-dom";


 const messages = {
  en: {
    labels: {
    heading_create: "Create Company Profile",
       heading_edit: "Edit Company Profile",
      company_info: "Company Information",
      welcome: "Welcome",
      company_id: "Company ID",
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
       agree_prefix: "I agree to",
  terms: "Terms & Conditions",
   cancel: "Cancel",
  approve: "Approve",
  update: "Update",
  
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
     terms: {
    title: "Terms & Conditions",
    intro: "These terms and conditions outline the rules and regulations for using this service. By submitting this form, you agree to be bound by these terms.",
    points: [
      "Provide accurate company details.",
      "Ensure uploaded contracts are valid.",
      "Respect privacy and data handling rules."
    ],
    outro: "If you disagree with these terms, you may not proceed with company registration."
  }
  },
  fr: {
    labels: {
         heading_create: "Créer un profil d'entreprise",
    heading_edit: "Modifier le profil de l'entreprise",
    company_info: "Informations sur l'entreprise",
      welcome: "Bienvenue",
      company_id: "ID d'entreprise",
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
    agree_prefix: "J'accepte",
  terms: "les conditions générales",
  contract: "Télécharger le contrat",
no_file: "Aucun fichier choisi",
 cancel: "Annuler",
  approve: "Approuver",
  update: "Mettre à jour",

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
    terms: {
    title: "Conditions générales",
    intro: "Ces conditions générales définissent les règles et règlements pour utiliser ce service. En soumettant ce formulaire, vous acceptez d’être lié par ces conditions.",
    points: [
      "Fournir des informations exactes sur l'entreprise.",
      "S'assurer que les contrats téléchargés sont valides.",
      "Respecter la confidentialité et les règles de gestion des données."
    ],
    outro: "Si vous n'acceptez pas ces conditions, vous ne pouvez pas procéder à l'enregistrement de l'entreprise."
  }
  },
  ar: {
    labels: {
         heading_create: "إنشاء ملف الشركة",
  heading_edit: "تعديل ملف الشركة",
  company_info: "معلومات الشركة",
      welcome: "أهلاً وسهلاً",
      company_id: "معرف الشركة ",
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
       agree_prefix: "أوافق على",
  terms: "الشروط والأحكام",
  contract: "تحميل العقد",
no_file: "لم يتم اختيار ملف",
 cancel: "إلغاء",
  approve: "موافقة",
  update: "تحديث",

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
     terms: {
    title: "الشروط والأحكام",
    intro: "توضح هذه الشروط والأحكام القواعد واللوائح لاستخدام هذه الخدمة. من خلال إرسال هذا النموذج، فإنك توافق على الالتزام بهذه الشروط.",
    points: [
      "تقديم تفاصيل دقيقة عن الشركة.",
      "التأكد من أن العقود المرفوعة صالحة.",
      "احترام الخصوصية وقواعد معالجة البيانات."
    ],
    outro: "إذا كنت لا توافق على هذه الشروط، فلا يمكنك المتابعة في تسجيل الشركة."
  }
  },
  hi: {
    labels: {
      welcome: "स्वागत है",
      company_id: "कंपनी आईडी",
      company_name: "कंपनी का नाम",
      description: "विवरण",
      address: "पता",
      owner: "मालिक",
      email: "ईमेल",
      mobile: "मोबाइल",
      landline: "लैंडलाइन",
      category: "श्रेणी",
      subcategory: "उप-श्रेणी",
      discount: "छूट (%)",
      comments: "टिप्पणियाँ",
      contract: "अनुबंध अपलोड करें",
      agree: "मैं नियम और शर्तों से सहमत हूँ",
    },
    errors: {
      company_id: "कंपनी आईडी आवश्यक है",
      company_name: "कंपनी का नाम आवश्यक है",
      description: "विवरण आवश्यक है",
      address: "पता आवश्यक है",
      owner: "मालिक आवश्यक है",
      email: "मान्य ईमेल आवश्यक है",
      mobile: "मोबाइल 8–15 अंकों का होना चाहिए",
      discount_required: "छूट आवश्यक है",
      discount_format: "अधिकतम 2-अंकीय संख्या",
      category: "श्रेणी चुनें",
      subcategory: "उप-श्रेणी चुनें",
      agree: "आपको नियमों से सहमत होना चाहिए",
    },
  },
  ja: {
    labels: {
      welcome: "ようこそ",
      company_id: "会社ID",
      company_name: "会社名",
      description: "説明",
      address: "住所",
      owner: "オーナー",
      email: "メール",
      mobile: "携帯電話",
      landline: "固定電話",
      category: "カテゴリー",
      subcategory: "サブカテゴリー",
      discount: "割引 (%)",
      comments: "コメント",
      contract: "契約をアップロード",
      agree: "利用規約に同意します",
    },
    errors: {
      company_id: "会社IDは必須です",
      company_name: "会社名は必須です",
      description: "説明は必須です",
      address: "住所は必須です",
      owner: "オーナーは必須です",
      email: "有効なメールが必要です",
      mobile: "携帯番号は8〜15桁である必要があります",
      discount_required: "割引は必須です",
      discount_format: "最大2桁の数字",
      category: "カテゴリーを選択してください",
      subcategory: "サブカテゴリーを選択してください",
      agree: "利用規約に同意する必要があります",
    },
  },
  ch: {
    labels: {
      welcome: "欢迎",
      company_id: "公司编号",
      company_name: "公司名称",
      description: "描述",
      address: "地址",
      owner: "所有者",
      email: "电子邮件",
      mobile: "手机",
      landline: "座机",
      category: "类别",
      subcategory: "子类别",
      discount: "折扣 (%)",
      comments: "评论",
      contract: "上传合同",
      agree: "我同意条款和条件",
    },
    errors: {
      company_id: "公司编号是必填项",
      company_name: "公司名称是必填项",
      description: "描述是必填项",
      address: "地址是必填项",
      owner: "所有者是必填项",
      email: "需要有效的电子邮件",
      mobile: "手机必须为8到15位数字",
      discount_required: "需要折扣",
      discount_format: "最多2位数",
      category: "请选择类别",
      subcategory: "请选择子类别",
      agree: "您必须同意条款",
    },
  },
  es: {
    labels: {
      welcome: "Bienvenido",
      company_id: "ID de la empresa",
      company_name: "Nombre de la empresa",
      description: "Descripción",
      address: "Dirección",
      owner: "Propietario",
      email: "Correo electrónico",
      mobile: "Móvil",
      landline: "Teléfono fijo",
      category: "Categoría",
      subcategory: "Subcategoría",
      discount: "Descuento (%)",
      comments: "Comentarios",
      contract: "Subir contrato",
      agree: "Acepto los términos y condiciones",
    },
    errors: {
      company_id: "ID de la empresa es obligatorio",
      company_name: "Nombre de la empresa es obligatorio",
      description: "Descripción es obligatoria",
      address: "Dirección es obligatoria",
      owner: "Propietario es obligatorio",
      email: "Correo electrónico válido requerido",
      mobile: "El móvil debe tener entre 8 y 15 dígitos",
      discount_required: "El descuento es obligatorio",
      discount_format: "Número máximo de 2 dígitos",
      category: "Seleccione una categoría",
      subcategory: "Seleccione una subcategoría",
      agree: "Debe aceptar los términos",
    },
  },
  de: {
    labels: {
      welcome: "Willkommen",
      company_id: "Firmen-ID",
      company_name: "Firmenname",
      description: "Beschreibung",
      address: "Adresse",
      owner: "Inhaber",
      email: "E-Mail",
      mobile: "Mobiltelefon",
      landline: "Festnetz",
      category: "Kategorie",
      subcategory: "Unterkategorie",
      discount: "Rabatt (%)",
      comments: "Kommentare",
      contract: "Vertrag hochladen",
      agree: "Ich stimme den Geschäftsbedingungen zu",
    },
    errors: {
      company_id: "Firmen-ID ist erforderlich",
      company_name: "Firmenname ist erforderlich",
      description: "Beschreibung ist erforderlich",
      address: "Adresse ist erforderlich",
      owner: "Inhaber ist erforderlich",
      email: "Gültige E-Mail erforderlich",
      mobile: "Mobil muss 8–15 Ziffern haben",
      discount_required: "Rabatt ist erforderlich",
      discount_format: "Maximal 2-stellige Zahl",
      category: "Kategorie auswählen",
      subcategory: "Unterkategorie auswählen",
      agree: "Sie müssen den Bedingungen zustimmen",
    },
  },
  ru: {
    labels: {
      welcome: "Добро пожаловать",
      company_id: "ID компании",
      company_name: "Название компании",
      description: "Описание",
      address: "Адрес",
      owner: "Владелец",
      email: "Эл. почта",
      mobile: "Мобильный телефон",
      landline: "Стационарный телефон",
      category: "Категория",
      subcategory: "Подкатегория",
      discount: "Скидка (%)",
      comments: "Комментарии",
      contract: "Загрузить контракт",
      agree: "Я согласен с условиями",
    },
    errors: {
      company_id: "ID компании обязателен",
      company_name: "Название компании обязательно",
      description: "Описание обязательно",
      address: "Адрес обязателен",
      owner: "Владелец обязателен",
      email: "Требуется действительный адрес эл. почты",
      mobile: "Мобильный должен содержать 8–15 цифр",
      discount_required: "Скидка обязательна",
      discount_format: "Максимум 2-значное число",
      category: "Выберите категорию",
      subcategory: "Выберите подкатегорию",
      agree: "Вы должны согласиться с условиями",
    },
  },
  pt: {
    labels: {
      welcome: "Bem-vindo",
      company_id: "ID da empresa",
      company_name: "Nome da empresa",
      description: "Descrição",
      address: "Endereço",
      owner: "Proprietário",
      email: "Email",
      mobile: "Celular",
      landline: "Telefone fixo",
      category: "Categoria",
      subcategory: "Subcategoria",
      discount: "Desconto (%)",
      comments: "Comentários",
      contract: "Carregar contrato",
      agree: "Concordo com os Termos e Condições",
    },
    errors: {
      company_id: "ID da empresa é obrigatório",
      company_name: "Nome da empresa é obrigatório",
      description: "Descrição é obrigatória",
      address: "Endereço é obrigatório",
      owner: "Proprietário é obrigatório",
      email: "Email válido obrigatório",
      mobile: "Celular deve ter 8–15 dígitos",
      discount_required: "O desconto é obrigatório",
      discount_format: "Número máximo de 2 dígitos",
      category: "Selecione uma categoria",
      subcategory: "Selecione uma subcategoria",
      agree: "Você deve concordar com os termos",
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

  const { id } = useParams(); // edit mode if id exists
  const navigate = useNavigate();

  // Fetch existing company data when editing
  useEffect(() => {
    if (id) {
      const fetchCompany = async () => {
        try {
          const base = import.meta.env.VITE_API_URL || "";
          console.log("📡 Fetching company:", `${base}/api/companies/${id}`); // log request URL
          const res = await fetch(`${base}/api/companies/${id}`);
          const response = await res.json();

          if (response.success) {
            const c = response.data;
            setForm((prev) => ({
              ...prev,
              company_id: c.company_id,
              email: c.email,
              mobile: c.mobile,
              landline: c.landline,
              category: c.category,
              subcategory: c.subcategory,
              discount: c.discount,
              comments: c.comments,

              companyEn: c.properties?.EN?.company_name || "",
              descEn: c.properties?.EN?.description || "",
              addressEn: c.properties?.EN?.address || "",
              ownerEn: c.properties?.EN?.owner_name || "",

              companyFr: c.properties?.FR?.company_name || "",
              descFr: c.properties?.FR?.description || "",
              addressFr: c.properties?.FR?.address || "",
              ownerFr: c.properties?.FR?.owner_name || "",

              companyAr: c.properties?.AR?.company_name || "",
              descAr: c.properties?.AR?.description || "",
              addressAr: c.properties?.AR?.address || "",
              ownerAr: c.properties?.AR?.owner_name || "",
            }));
          }
        } catch (err) {
          console.error("❌ Failed to load company:", err);
        }
      };

      fetchCompany();
    }
  }, [id]);

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
    fd.append("company_id", form.company_id);
    fd.append("email", form.email);
    fd.append("mobile", form.mobile);
    fd.append("landline", form.landline);
    fd.append("category", form.category);
    fd.append("subcategory", form.subcategory);
    fd.append("discount", form.discount);
    fd.append("comments", form.comments);
    if (file) fd.append("contract", file);

    let activeProperties = {};
    if (activeLang === "en") {
      activeProperties = {
        EN: {
          company_name: form.companyEn,
          description: form.descEn,
          address: form.addressEn,
          owner_name: form.ownerEn,
        },
      };
    } else if (activeLang === "fr") {
      activeProperties = {
        FR: {
          company_name: form.companyFr,
          description: form.descFr,
          address: form.addressFr,
          owner_name: form.ownerFr,
        },
      };
    } else if (activeLang === "ar") {
      activeProperties = {
        AR: {
          company_name: form.companyAr,
          description: form.descAr,
          address: form.addressAr,
          owner_name: form.ownerAr,
        },
      };
    }
    fd.append("properties", JSON.stringify(activeProperties));

    try {
      const base = import.meta.env.VITE_API_URL || "";
      const url = id
        ? `${base}/api/companies/${id}` // update
        : `${base}/api/companies`; // create
      const method = id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: fd,
      });

      const response = await res.json();
      if (!res.ok) {
        alert(`❌ Failed to save company: ${response.error || "Unknown error"}`);
        return;
      }

      alert(id ? "✅ Company updated successfully!" : "✅ Company created successfully!");
      navigate("/company-profile");
    } catch (err) {
      console.error("❌ Error:", err);
      alert("❌ Failed to save company: " + err.message);
    }
  };

  const langKey = activeLang.charAt(0).toUpperCase() + activeLang.slice(1);

  return (
    <div className="register-container">
     <header className="banner" dir={activeLang === "ar" ? "rtl" : "ltr"}>
  <h1>
    {id
      ? messages[activeLang].labels.heading_edit
      : messages[activeLang].labels.heading_create}
  </h1>
</header>

<main className="form-card" dir={activeLang === "ar" ? "rtl" : "ltr"}>
  <h2>{messages[activeLang].labels.company_info}</h2>

        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Company ID */}
          <div className="row">
            <div className="col">
              <label>
                {messages[activeLang].labels.company_id}
                <span className="required">*</span>
              </label>
              <input
                type="text"
                name="company_id"
                placeholder="Enter Company ID"
                value={form.company_id}
                onChange={handleChange}
                disabled={!!id} // lock when editing
              />
              {errors.company_id && <p className="error">{errors.company_id}</p>}
            </div>
          </div>

          {/* Language tabs */}
          <div className="lang-tabs">
            <button
              className={`lang-btn ${activeLang === "en" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveLang("en");
              }}
            >
              English
            </button>
            <button
              className={`lang-btn ${activeLang === "fr" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveLang("fr");
              }}
            >
              Français
            </button>
            <button
              className={`lang-btn ${activeLang === "ar" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveLang("ar");
              }}
            >
               العربية
            </button>
          </div>

          {/* Language card */}
          <div className="lang-card" dir={activeLang === "ar" ? "rtl" : "ltr"}>
            <h3 className="welcome-heading">{messages[activeLang].labels.welcome}</h3>

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

          {/* Global fields */}
          <div className="row">
            <div className="col">
              <label>
                {messages[activeLang].labels.email}
                <span className="required">*</span>
              </label>
              <input type="email" name="email" value={form.email} onChange={handleChange} />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="col">
              <label>
                {messages[activeLang].labels.mobile}
                <span className="required">*</span>
              </label>
              <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} />
              {errors.mobile && <p className="error">{errors.mobile}</p>}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>{messages[activeLang].labels.landline}</label>
              <input type="tel" name="landline" value={form.landline} onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>
                {messages[activeLang].labels.category}
                <span className="required">*</span>
              </label>
              <select name="category" value={form.category} onChange={handleChange}>
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
              <select name="subcategory" value={form.subcategory} onChange={handleChange}>
                <option value="">--Select--</option>
                <option value="health">Health</option>
                <option value="grocery">Grocery</option>
                <option value="fashion">Fashion</option>
              </select>
              {errors.subcategory && <p className="error">{errors.subcategory}</p>}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>
                {messages[activeLang].labels.discount}
                <span className="required">*</span>
              </label>
              <input name="discount" value={form.discount} onChange={handleChange} />
              {errors.discount && <p className="error">{errors.discount}</p>}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>{messages[activeLang].labels.comments}</label>
              <textarea name="comments" rows="3" value={form.comments} onChange={handleChange} />
            </div>
          </div>

{/* File Upload */}

<div className="row">
  <div className="col file-upload">
    <label htmlFor="contract" className="custom-file-label">
      📤 {messages[activeLang].labels.contract}
    </label>
    <input
      id="contract"
      type="file"
      name="contract"
      accept=".pdf,.png,.jpg,.jpeg"
      onChange={(e) => setFile(e.target.files[0])}
      style={{ display: "none" }}
    />
    <span className="file-name">
      {file ? file.name : messages[activeLang].labels.no_file}
    </span>
  </div>
</div>



{/* Terms & Conditions */}
<div className="row">
  <div className="col terms">
    <label className="terms-label">
      <div
        className={`toggle-switch ${form.agree ? "on" : ""}`}
        onClick={() => setForm((prev) => ({ ...prev, agree: !prev.agree }))}
      >
        <div className="toggle-slider"></div>
      </div>
      <span>
        {messages[activeLang].labels.agree_prefix}{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setShowTerms(true);
          }}
        >
          {messages[activeLang].labels.terms}
        </a>
      </span>
    </label>
    {errors.agree && <p className="error">{errors.agree}</p>}
  </div>
</div>


<TermsModal 
  open={showTerms} 
  onClose={() => setShowTerms(false)} 
  activeLang={activeLang} 
/>



          {/* Buttons */}
   <div className="button-group">
  <button
    type="button"
    className="btn cancel"
    onClick={() => navigate("/company-profile")}
  >
    {messages[activeLang].labels.cancel}
  </button>
  <button type="submit" className="btn submit">
    {id
      ? messages[activeLang].labels.update
      : messages[activeLang].labels.approve}
  </button>
</div>


        </form>
      </main>

      <footer className="footer">© 2025 Comviva. All rights reserved.</footer>
    </div>
  );
}
