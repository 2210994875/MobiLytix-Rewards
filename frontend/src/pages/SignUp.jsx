import React, { useState } from "react";
import "./SignUp.css";

export default function SignUp({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    userId: "",
    password: "",
    companyName: "",
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const has = (s) => !!(s && s.trim());
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRx = /^\d{8,15}$/; // 8–15 digits

  const validate = (f) => {
    const e = {};
    if (!has(f.name)) e.name = "Name is required";
    if (!phoneRx.test(f.phoneNumber)) e.phoneNumber = "Enter 8–15 digits";
    if (!emailRx.test(f.email)) e.email = "Valid email required";
    if (!has(f.userId)) e.userId = "User ID is required";
    if (!has(f.password) || f.password.length < 8) e.password = "Min 8 characters";
    if (!has(f.companyName)) e.companyName = "Company name is required";
    if (!f.agree) e.agree = "Please accept the Terms";
    return e;
  };

  const validateField = (name, nextForm) => {
    const e = validate(nextForm);
    const next = { ...errors };
    if (e[name]) next[name] = e[name]; else delete next[name];
    setErrors(next);
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    const v = type === "checkbox" ? checked : value;
    const nextForm = { ...form, [name]: v };
    setForm(nextForm);
    if (submitted) validateField(name, nextForm);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    // TODO: integrate with your backend
    // await fetch('/api/auth/signup', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })

    localStorage.setItem("user_name", form.name);
    onSuccess?.(); // navigate to app (Dashboard/Profile)
  };

  const invalid = (n) => (errors[n] ? "invalid" : "");

  return (
    <div className="signup-wrap">
      <div className="bg-bubbles">
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
      </div>

      <form className="signup-card" onSubmit={onSubmit} autoComplete="off">
        <h1>Create your account 🔐</h1>
        <p className="subtitle">Sign up to continue to your dashboard</p>

        <div className="field">
          <label data-required>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className={invalid("name")}
            placeholder="Your full name"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="field">
          <label data-required>Phone Number</label>
          <input
            name="phoneNumber"
            inputMode="numeric"
            value={form.phoneNumber}
            onChange={onChange}
            className={invalid("phoneNumber")}
            placeholder="10-digit phone"
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>

        <div className="field">
          <label data-required>Email ID</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            className={invalid("email")}
            placeholder="you@example.com"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="field">
          <label data-required>User ID</label>
          <input
            name="userId"
            value={form.userId}
            onChange={onChange}
            className={invalid("userId")}
            placeholder="Choose a username"
          />
          {errors.userId && <p className="error">{errors.userId}</p>}
        </div>

        <div className="field">
          <label data-required>Password</label>
          <div className="pwd-row">
            <input
              type={showPwd ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={onChange}
              className={invalid("password")}
              placeholder="Min 8 characters"
            />
            <button
              type="button"
              className="toggle"
              onClick={() => setShowPwd((s) => !s)}
              aria-label="Toggle password visibility"
            >
              {showPwd ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="field">
          <label data-required>Company Name</label>
          <input
            name="companyName"
            value={form.companyName}
            onChange={onChange}
            className={invalid("companyName")}
            placeholder="Your company"
          />
          {errors.companyName && <p className="error">{errors.companyName}</p>}
        </div>

        <label className="terms">
          <input type="checkbox" name="agree" checked={form.agree} onChange={onChange} />
          <span>
            I agree to the <a href="#">Terms & Conditions</a>
          </span>
        </label>
        {errors.agree && <p className="error">{errors.agree}</p>}

        <button className="btn-primary" type="submit">Sign up</button>
        <p className="footnote">Already have an account? Just proceed — this is a demo signup.</p>
      </form>
    </div>
  );
}
