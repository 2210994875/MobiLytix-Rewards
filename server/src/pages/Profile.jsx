import React, { useState } from "react";
 
export default function Profile() {
  const [form, setForm] = useState({
    companyNameEn: "",
    companyNameAr: "",
    ownerName: "",
    email: "",
    mobile: ""
  });
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile saved:\n" + JSON.stringify(form, null, 2));
  };
 
  return (
    <div>
      <h2>Existing Partner - Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="companyNameEn"
          placeholder="Company Name (English)"
          value={form.companyNameEn}
          onChange={handleChange}
        /><br/>
        <input
          name="companyNameAr"
          placeholder="Company Name (Arabic)"
          value={form.companyNameAr}
          onChange={handleChange}
        /><br/>
        <input
          name="ownerName"
          placeholder="Owner Name"
          value={form.ownerName}
          onChange={handleChange}
        /><br/>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        /><br/>
        <input
          name="mobile"
          placeholder="Mobile"
          value={form.mobile}
          onChange={handleChange}
        /><br/>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}