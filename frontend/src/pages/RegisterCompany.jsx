import React, { useState } from "react";
import TermsModal from "../components/TermsModal";
import "./RegisterCompany.css";

export default function RegisterCompany() {
  const [form, setForm] = useState({
    companyEn: "",
    companyAr: "",
    descEn: "",
    descAr: "",
    addressEn: "",
    addressAr: "",
    ownerEn: "",
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

  // Arabic ranges: Arabic letters + presentation forms + Arabic supplement + Arabic-Indic/Eastern digits + spaces + a few safe punctuations
  const toArabicOnly = (s) =>
    (s || "").replace(
      /[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u0660-\u0669\u06F0-\u06F9\s.,\-()\/]+/g,
      ""
    );

  // English/Latin letters + digits + spaces + a few safe punctuations
  const toLatinOnly = (s) =>
    (s || "").replace(/[^A-Za-z0-9\s.,\-()\/]+/g, "");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Enforce script per field
    const arabicFields = new Set(["companyAr", "descAr", "addressAr", "ownerAr"]);
    const latinFields  = new Set(["companyEn", "descEn", "addressEn", "ownerEn"]);

    let nextValue = type === "checkbox" ? checked : value;

    if (arabicFields.has(name)) {
      nextValue = toArabicOnly(nextValue);
    } else if (latinFields.has(name)) {
      nextValue = toLatinOnly(nextValue);
    }

    setForm((prev) => ({ ...prev, [name]: nextValue }));
  };

  const handleFile = (e) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
  };

  const validate = () => {
    const newErrors = {};
    const has = (s) => !!(s && s.trim());

    // ---- Company name
    if (!has(form.companyEn) && !has(form.companyAr)) {
      const msg = "Enter company name in English OR Arabic";
      newErrors.companyEn = msg;
      newErrors.companyAr = msg;
    }
    if (has(form.companyEn) && has(form.companyAr)) {
      const msg = "Fill only one: English OR Arabic";
      newErrors.companyEn = msg;
      newErrors.companyAr = msg;
    }

    // ---- Description
    if (!has(form.descEn) && !has(form.descAr)) {
      const msg = "Enter description in English OR Arabic";
      newErrors.descEn = msg;
      newErrors.descAr = msg;
    }
    if (has(form.descEn) && has(form.descAr)) {
      const msg = "Fill only one: English OR Arabic";
      newErrors.descEn = msg;
      newErrors.descAr = msg;
    }

    // ---- Address
    if (!has(form.addressEn) && !has(form.addressAr)) {
      const msg = "Enter address in English OR Arabic";
      newErrors.addressEn = msg;
      newErrors.addressAr = msg;
    }
    if (has(form.addressEn) && has(form.addressAr)) {
      const msg = "Fill only one: English OR Arabic";
      newErrors.addressEn = msg;
      newErrors.addressAr = msg;
    }

    // ---- Owner
    if (!has(form.ownerEn) && !has(form.ownerAr)) {
      const msg = "Enter owner in English OR Arabic";
      newErrors.ownerEn = msg;
      newErrors.ownerAr = msg;
    }
    if (has(form.ownerEn) && has(form.ownerAr)) {
      const msg = "Fill only one: English OR Arabic";
      newErrors.ownerEn = msg;
      newErrors.ownerAr = msg;
    }

    // Other validations
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Valid email required";
    }
    if (!/^\d{8,10}$/.test(form.mobile)) {
      newErrors.mobile = "Mobile must be 8–10 digits";
    }
    // if (form.discount && !/^\d{1,2}$/.test(form.discount)) {
    //   newErrors.discount = "Max 2-digit number";
    // }.
    if (!form.discount.trim()) {
      newErrors.discount = "Discount is required";
    } 
    else if (!/^\d{1,2}$/.test(form.discount)) {
        newErrors.discount = "Max 2-digit number";
  }

    if (!form.category) {
      newErrors.category = "Select category";
    }
    if (!form.subcategory) {
      newErrors.subcategory = "Select subcategory";
    }
    if (!form.agree) {
      newErrors.agree = "You must agree to Terms";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }

    const fd = new FormData();
    fd.append("companyEn", form.companyEn);
    fd.append("companyAr", form.companyAr);
    fd.append("descEn", form.descEn);
    fd.append("descAr", form.descAr);
    fd.append("addressEn", form.addressEn);
    fd.append("addressAr", form.addressAr);
    fd.append("ownerEn", form.ownerEn);
    fd.append("ownerAr", form.ownerAr);
    fd.append("email", form.email);
    fd.append("mobile", String(form.mobile || ""));
    fd.append("landline", String(form.landline || ""));
    fd.append("category", form.category);
    fd.append("subcategory", form.subcategory);
    fd.append("discount", form.discount ? String(Number(form.discount)) : "");
    fd.append("comments", form.comments);
    if (file) fd.append("contract", file);

    try {
      const base = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${base}/api/companies`, {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      alert("Submitted:\n" + JSON.stringify(data.data, null, 2));

      // reset
      setForm({
        companyEn: "",
        companyAr: "",
        descEn: "",
        descAr: "",
        addressEn: "",
        addressAr: "",
        ownerEn: "",
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
      setFile(null);
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("Failed to save company: " + err.message);
    }
  };

  return (
    <div className="register-container">
      <header className="banner">
        <h1>Company Details</h1>
      </header>

      <main className="form-card">
        <h2>Company Information</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Company Names */}
          <div className="row">
            <div className="col">
              <label>Company Name (English)*</label>
              <input
                name="companyEn"
                value={form.companyEn}
                onChange={handleChange}
                disabled={form.companyAr.trim().length > 0}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                inputMode="latin"
              />
              {errors.companyEn && <p className="error">{errors.companyEn}</p>}
            </div>
            <div className="col">
              <label>Company Name (Arabic)*</label>
              <input
                dir="rtl"
                name="companyAr"
                value={form.companyAr}
                onChange={handleChange}
                disabled={form.companyEn.trim().length > 0}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                inputMode="text"
              />
              {errors.companyAr && <p className="error">{errors.companyAr}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="row">
            <div className="col">
              <label>Description (English)*</label>
              <textarea
                name="descEn"
                rows="3"
                value={form.descEn}
                onChange={handleChange}
                disabled={form.descAr.trim().length > 0}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
              {errors.descEn && <p className="error">{errors.descEn}</p>}
            </div>
            <div className="col">
              <label>Description (Arabic)*</label>
              <textarea
                dir="rtl"
                name="descAr"
                rows="3"
                value={form.descAr}
                onChange={handleChange}
                disabled={form.descEn.trim().length > 0}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
              {errors.descAr && <p className="error">{errors.descAr}</p>}
            </div>
          </div>

          {/* Address */}
          <div className="row">
            <div className="col">
              <label>Address (English)*</label>
              <textarea
                name="addressEn"
                rows="3"
                value={form.addressEn}
                onChange={handleChange}
                disabled={form.addressAr.trim().length > 0}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
              {errors.addressEn && <p className="error">{errors.addressEn}</p>}
            </div>
            <div className="col">
              <label>Address (Arabic)*</label>
              <textarea
                dir="rtl"
                name="addressAr"
                rows="3"
                value={form.addressAr}
                onChange={handleChange}
                disabled={form.addressEn.trim().length > 0}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
              {errors.addressAr && <p className="error">{errors.addressAr}</p>}
            </div>
          </div>

          {/* Owner */}
          <div className="row">
            <div className="col">
              <label>Owner (English)*</label>
              <input
                name="ownerEn"
                value={form.ownerEn}
                onChange={handleChange}
                disabled={form.ownerAr.trim().length > 0}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
              {errors.ownerEn && <p className="error">{errors.ownerEn}</p>}
            </div>
            <div className="col">
              <label>Owner (Arabic)*</label>
              <input
                dir="rtl"
                name="ownerAr"
                value={form.ownerAr}
                onChange={handleChange}
                disabled={form.ownerEn.trim().length > 0}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
              {errors.ownerAr && <p className="error">{errors.ownerAr}</p>}
            </div>
          </div>

          {/* Email + Mobile */}
          <div className="row">
            <div className="col">
              <label>Email*</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="col">
              <label>Mobile*</label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                inputMode="numeric"
              />
              {errors.mobile && <p className="error">{errors.mobile}</p>}
            </div>
          </div>

          {/* Landline */}
          <div className="row">
            <div className="col">
              <label>Landline</label>
              <input
                type="tel"
                name="landline"
                value={form.landline}
                onChange={handleChange}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                inputMode="numeric"
              />
            </div>
          </div>

          {/* Category + Subcategory */}
          <div className="row">
            <div className="col">
              <label>Category*</label>
              <select name="category" value={form.category} onChange={handleChange} autoComplete="off">
                <option value="">--Select--</option>
                <option value="hotel">Hotel</option>
                <option value="retail">Retail</option>
              </select>
              {errors.category && <p className="error">{errors.category}</p>}
            </div>
            <div className="col">
              <label>Subcategory*</label>
              <select name="subcategory" value={form.subcategory} onChange={handleChange} autoComplete="off">
                <option value="">--Select--</option>
                <option value="health">Health</option>
                <option value="grocery">Grocery</option>
                <option value="fashion">Fashion</option>
              </select>
              {errors.subcategory && <p className="error">{errors.subcategory}</p>}
            </div>
          </div>

          {/* Discount */}
          <div className="row">
            <div className="col">
              <label data-required="*">Discount (%)</label>
              <input
                name="discount"
                value={form.discount}
                onChange={handleChange}
                autoComplete="off"
                inputMode="numeric"
              />
              {errors.discount && <p className="error">{errors.discount}</p>}
            </div>
          </div>


          {/* Comments */}
          <div className="row">
            <div className="col">
              <label>Comments</label>
              <textarea
                name="comments"
                rows="3"
                value={form.comments}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
          </div>

          {/* Contract Upload */}
          <div className="row">
            <div className="col">
              <label>Upload Contract</label>
              <input type="file" name="contract" onChange={handleFile} />
            </div>
          </div>

          {/* Terms */}
          <div className="row">
            <div className="col terms">
              <label className="terms-label">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                />
                <span>
                  I agree to{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTerms(true);
                    }}
                  >
                    Terms & Conditions
                  </a>
                </span>
              </label>
              {errors.agree && <p className="error">{errors.agree}</p>}
            </div>
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button type="button" className="btn cancel">Reject</button>
            <button type="submit" className="btn submit">Approve</button>
          </div>
        </form>
      </main>

      <footer className="footer">© 2025 Comviva. All rights reserved.</footer>

      <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />
    </div>
  );
}


