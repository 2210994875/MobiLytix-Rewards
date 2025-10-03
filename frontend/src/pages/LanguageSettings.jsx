// // // // src/pages/LanguageSettings.jsx
// // // import React, { useState } from "react";
// // // import "./LanguageSettings.css";

// // // export default function LanguageSettings() {
// // //   const [showDropdown, setShowDropdown] = useState(false);
// // //   const [selectedLanguage, setSelectedLanguage] = useState("");
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [description, setDescription] = useState("");

// // //   const languages = [
// // //     "English",
// // //     "Hindi",
// // //     "French",
// // //     "Spanish",
// // //     "German",
// // //     "Arabic",
// // //     "Chinese",
// // //     "Japanese",
// // //     "Russian",
// // //     "Portuguese",
// // //   ];

// // //   const handleAddLanguageClick = () => {
// // //     setShowDropdown(!showDropdown);
// // //   };

// // //   const handleLanguageSelect = (lang) => {
// // //     setSelectedLanguage(lang);
// // //     setShowDropdown(false);
// // //     setShowModal(true);
// // //   };

// // //   const handleSubmit = async () => {
// // //     const payload = { language: selectedLanguage, description };

// // //     try {
// // //       const res = await fetch("http://localhost:5000/api/languages", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(payload),
// // //       });

// // //       if (res.ok) {
// // //         alert("✅ Language added successfully!");
// // //         setShowModal(false);
// // //         setDescription("");
// // //       } else {
// // //         alert("❌ Error adding language");
// // //       }
// // //     } catch (error) {
// // //       console.error("❌ Error:", error);
// // //       alert("Failed to connect to backend.");
// // //     }
// // //   };

// // //   return (
// // //     <div className="language-container">
// // //       {/* Top header bar */}
// // //       <div className="top-header">
// // //         {/* <h2 className="section-title">🌍 Existing Languages</h2> */}
// // //         <div className="add-language-wrapper">
// // //           <button className="btn outline" onClick={handleAddLanguageClick}>
// // //             ➕ Add New Language
// // //           </button>

// // //           {/* Dropdown */}
// // //           {showDropdown && (
// // //             <div className="dropdown">
// // //               {languages.map((lang, index) => (
// // //                 <div
// // //                   key={index}
// // //                   className="dropdown-item"
// // //                   onClick={() => handleLanguageSelect(lang)}
// // //                 >
// // //                   {lang}
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* Page Heading */}
// // //       <h1 className="language-heading">Choose your language preference</h1>
// // //       <p className="language-subtitle">
// // //         A personalized experience begins with the language you love.
// // //       </p>

      

// // //       {/* Modal */}
// // //       {showModal && (
// // //         <div className="modal">
// // //           <div className="modal-content">
// // //             <h2>Add {selectedLanguage}</h2>
// // //             <textarea
// // //               placeholder="Describe the language..."
// // //               value={description}
// // //               onChange={(e) => setDescription(e.target.value)}
// // //             />
// // //             <div className="modal-actions">
// // //               <button className="btn primary" onClick={handleSubmit}>
// // //                 Save
// // //               </button>
// // //               <button className="btn outline" onClick={() => setShowModal(false)}>
// // //                 Cancel
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // src/pages/LanguageSettings.jsx
// // import React, { useState, useEffect } from "react";
// // import "./LanguageSettings.css";

// // export default function LanguageSettings() {
// //   const [showDropdown, setShowDropdown] = useState(false);
// //   const [selectedLanguage, setSelectedLanguage] = useState("");
// //   const [showModal, setShowModal] = useState(false);
// //   const [description, setDescription] = useState("");
// //   const [existingLanguages, setExistingLanguages] = useState([]); // ✅ state for table

// //   const languages = [
// //     "English",
// //     "Hindi",
// //     "French",
// //     "Spanish",
// //     "German",
// //     "Arabic",
// //     "Chinese",
// //     "Japanese",
// //     "Russian",
// //     "Portuguese",
// //   ];

// //   // ✅ Fetch existing languages when page loads
// //   useEffect(() => {
// //     fetch("http://localhost:5000/api/languages")
// //       .then((res) => res.json())
// //       .then((data) => setExistingLanguages(data))
// //       .catch((err) => console.error("❌ Error fetching languages:", err));
// //   }, []);

// //   const handleAddLanguageClick = () => {
// //     setShowDropdown(!showDropdown);
// //   };

// //   const handleLanguageSelect = (lang) => {
// //     setSelectedLanguage(lang);
// //     setShowDropdown(false);
// //     setShowModal(true);
// //   };

// //   const handleSubmit = async () => {
// //     const payload = {
// //       lang_name: selectedLanguage,
// //       lang_description_en: description, // sending description
// //       lang_description_local: description, // (you can split later if needed)
// //     };

// //     try {
// //       const res = await fetch("http://localhost:5000/api/languages", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       if (res.ok) {
// //         alert("✅ Language added successfully!");
// //         setShowModal(false);
// //         setDescription("");

// //         // ✅ Refresh table instantly
// //         const updated = await fetch("http://localhost:5000/api/languages");
// //         const data = await updated.json();
// //         setExistingLanguages(data);
// //       } else {
// //         alert("❌ Error adding language");
// //       }
// //     } catch (error) {
// //       console.error("❌ Error:", error);
// //       alert("Failed to connect to backend.");
// //     }
// //   };

// //   return (
// //     <div className="language-container">
// //       {/* Top header bar */}
// //       <div className="top-header">
// //         <div className="add-language-wrapper">
// //           <button className="btn outline" onClick={handleAddLanguageClick}>
// //             ➕ Add New Language
// //           </button>

// //           {/* Dropdown */}
// //           {showDropdown && (
// //             <div className="dropdown">
// //               {languages.map((lang, index) => (
// //                 <div
// //                   key={index}
// //                   className="dropdown-item"
// //                   onClick={() => handleLanguageSelect(lang)}
// //                 >
// //                   {lang}
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Page Heading */}
// //       <h1 className="language-heading">Choose your language preference</h1>
// //       <p className="language-subtitle">
// //         A personalized experience begins with the language you love.
// //       </p>

// //       {/* ✅ Existing Languages Table */}
// // <div className="existing-languages">
// //   <table className="language-table">
// //     <thead>
// //       <tr>
// //         <th>Language ID</th>
// //         <th>Language Name</th>
// //         <th>Description (English)</th>
// //         <th>Description (Local)</th>
// //       </tr>
// //     </thead>
// //     <tbody>
// //       {existingLanguages.length > 0 ? (
// //         existingLanguages.map((lang) => (
// //           <tr key={lang.lang_id}>
// //             <td>{lang.lang_id}</td>
// //             <td>{lang.lang_name}</td>
// //             <td>{lang.lang_description_en}</td>
// //             <td>{lang.lang_description_local}</td>
// //           </tr>
// //         ))
// //       ) : (
// //         <tr>
// //           <td colSpan="4">No languages found</td>
// //         </tr>
// //       )}
// //     </tbody>
// //   </table>
// // </div>


// //       {/* Modal */}
// //       {showModal && (
// //         <div className="modal">
// //           <div className="modal-content">
// //             <h2>Add {selectedLanguage}</h2>
// //             <textarea
// //               placeholder="Describe the language..."
// //               value={description}
// //               onChange={(e) => setDescription(e.target.value)}
// //             />
// //             <div className="modal-actions">
// //               <button className="btn primary" onClick={handleSubmit}>
// //                 Save
// //               </button>
// //               <button className="btn outline" onClick={() => setShowModal(false)}>
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // src/pages/LanguageSettings.jsx
// import React, { useState, useEffect } from "react";
// import "./LanguageSettings.css";

// export default function LanguageSettings() {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [description, setDescription] = useState("");
//   const [languagesData, setLanguagesData] = useState([]); // ✅ DB languages

//   const staticLanguages = [
//     "English",
//     "Hindi",
//     "French",
//     "Spanish",
//     "German",
//     "Arabic",
//     "Chinese",
//     "Japanese",
//     "Russian",
//     "Portuguese",
//   ];

//   // ✅ Fetch languages from backend
//   useEffect(() => {
//     const fetchLanguages = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/languages"); // make sure your backend GET is ready
//         const data = await res.json();
//         setLanguagesData(data); // store in state
//       } catch (error) {
//         console.error("❌ Error fetching languages:", error);
//       }
//     };
//     fetchLanguages();
//   }, []);

//   const handleAddLanguageClick = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const handleLanguageSelect = (lang) => {
//     setSelectedLanguage(lang);
//     setShowDropdown(false);
//     setShowModal(true);
//   };

//   const handleSubmit = async () => {
//     const payload = { language: selectedLanguage, description };

//     try {
//       const res = await fetch("http://localhost:5000/api/languages", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         alert("✅ Language added successfully!");
//         setShowModal(false);
//         setDescription("");
//         // refresh list after adding
//         const updated = await fetch("http://localhost:5000/api/languages");
//         const data = await updated.json();
//         setLanguagesData(data);
//       } else {
//         alert("❌ Error adding language");
//       }
//     } catch (error) {
//       console.error("❌ Error:", error);
//       alert("Failed to connect to backend.");
//     }
//   };

//   return (
//     <div className="language-container">
//       {/* Top Right Add Language */}
//       <div className="top-header">
//         <div className="add-language-wrapper">
//           <button className="btn outline" onClick={handleAddLanguageClick}>
//             ➕ Add New Language
//           </button>

//           {showDropdown && (
//             <div className="dropdown">
//               {staticLanguages.map((lang, index) => (
//                 <div
//                   key={index}
//                   className="dropdown-item"
//                   onClick={() => handleLanguageSelect(lang)}
//                 >
//                   {lang}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Page Heading */}
//       <h1 className="language-heading">Choose your language preference</h1>
//       <p className="language-subtitle">
//         A personalized experience begins with the language you love.
//       </p>

//       {/* ✅ Table of DB languages */}
//       <div className="existing-languages">
//         <table className="language-table">
//           <thead>
//             <tr>
//               <th>Language ID</th>
//               <th>Language Name</th>
//               <th>Description (English)</th>
//               <th>Description (Local)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {languagesData.length > 0 ? (
//               languagesData.map((lang) => (
//                 <tr key={lang.lang_id}>
//                   <td>{lang.lang_id}</td>
//                   <td>{lang.lang_name}</td>
//                   <td>{lang.lang_description_en}</td>
//                   <td>{lang.lang_description_local}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4">No languages found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Add {selectedLanguage}</h2>
//             <textarea
//               placeholder="Describe the language..."
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//             <div className="modal-actions">
//               <button className="btn primary" onClick={handleSubmit}>
//                 Save
//               </button>
//               <button
//                 className="btn outline"
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// src/pages/LanguageSettings.jsx
// src/pages/LanguageSettings.jsx
// import React, { useState, useEffect } from "react";
// import "./LanguageSettings.css";

// export default function LanguageSettings() {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState("");
//   const [showModal, setShowModal] = useState(false);
// const [description, setDescription] = useState({ en: "", local: "" });

//   const [languagesData, setLanguagesData] = useState([]); // ✅ DB languages

//   const staticLanguages = [
//     "Spanish",
//     "German",
//      "Hindi",
//     "Chinese",
//     "Japanese",
//     "Russian",
//     "Portuguese",
//   ];

//   // ✅ Fetch languages from backend
//   const fetchLanguages = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/languages");
//       const data = await res.json();
//       setLanguagesData(data);
//     } catch (error) {
//       console.error("❌ Error fetching languages:", error);
//     }
//   };

//   useEffect(() => {
//     fetchLanguages();
//   }, []);

//   const handleAddLanguageClick = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const handleLanguageSelect = (lang) => {
//     setSelectedLanguage(lang);
//     setShowDropdown(false);
//     setShowModal(true);
//   };

//   const handleSubmit = async () => {
//   const langId = selectedLanguage.substring(0, 2).toUpperCase();

//   const payload = {
//     lang_id: langId,
//     lang_name: selectedLanguage,
//     lang_description_en: descriptionEn,   // you'll add 2 inputs now
//     lang_description_local: descriptionLocal,
//   };

//   try {
//     const res = await fetch("http://localhost:5000/api/languages", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (res.ok) {
//       alert("✅ Language added successfully!");
//       setShowModal(false);
//       setDescriptionEn("");
//       setDescriptionLocal("");
//       fetchLanguages(); // refresh
//     } else {
//       const err = await res.json();
//       alert(`❌ ${err.error || "Error adding language"}`);
//     }
//   } catch (error) {
//     console.error("❌ Error:", error);
//     alert("Failed to connect to backend.");
//   }
// };


//   return (
//     <div className="language-container">
//       {/* Top Right Add Language */}
//       <div className="top-header">
//         <div className="add-language-wrapper">
//           <button className="btn outline" onClick={handleAddLanguageClick}>
//             ➕ Add New Language
//           </button>

//           {showDropdown && (
//             <div className="dropdown">
//               {staticLanguages.map((lang, index) => (
//                 <div
//                   key={index}
//                   className="dropdown-item"
//                   onClick={() => handleLanguageSelect(lang)}
//                 >
//                   {lang}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Page Heading */}
//       <h1 className="language-heading">Choose your language preference</h1>
//       <p className="language-subtitle">
//         A personalized experience begins with the language you love.
//       </p>

//       {/* ✅ Existing Languages Table */}
//       <div className="existing-languages">
//         <table className="language-table">
//           <thead>
//             <tr>
//               <th>Language ID</th>
//               <th>Language Name</th>
//               <th>Description (English)</th>
//               <th>Description (Local)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {languagesData.length > 0 ? (
//               languagesData.map((lang) => (
//                 <tr key={lang.lang_id}>
//                   <td>{lang.lang_id}</td>
//                   <td>{lang.lang_name}</td>
//                   <td>{lang.lang_description_en}</td>
//                   <td>{lang.lang_description_local}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4">No languages found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//      {showModal && (
//   <div className="modal">
//     <div className="modal-content">
//       <h2>Add {selectedLanguage}</h2>
      
//       {/* English description */}
//       <textarea
//         placeholder={`Enter description in English...`}
//         value={description.en}
//         onChange={(e) => setDescription({ ...description, en: e.target.value })}
//       />

//       {/* Local description */}
//       <textarea
//         placeholder={`Enter description in ${selectedLanguage}...`}
//         value={description.local}
//         onChange={(e) => setDescription({ ...description, local: e.target.value })}
//       />

//       <div className="modal-actions">
//         <button className="btn primary" onClick={handleSubmit}>Save</button>
//         <button className="btn outline" onClick={() => setShowModal(false)}>Cancel</button>
//       </div>
//     </div>
//   </div>
// )}

//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "./LanguageSettings.css";

export default function LanguageSettings() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [description, setDescription] = useState({ en: "", local: "" });

  const [languagesData, setLanguagesData] = useState([]); // ✅ DB languages

  const staticLanguages = [
    "Spanish",
    "German",
    "Hindi",
    "Chinese",
    "Japanese",
    "Russian",
    "Portuguese",
  ];

  // ✅ Fetch languages from backend
const BASE_LANGS = ["EN", "AR", "FR"];

const fetchLanguages = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/languages");
    const data = await res.json();

    // filter only base 3
    const filtered = data.filter((lang) => BASE_LANGS.includes(lang.lang_id));
    setLanguagesData(filtered);
  } catch (error) {
    console.error("❌ Error fetching languages:", error);
  }
};




  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleAddLanguageClick = () => {
    setShowDropdown(!showDropdown);
  };
const handleLanguageSelect = async (lang) => {
  const langId = lang.substring(0, 2).toUpperCase();

  try {
    const res = await fetch(`http://localhost:5000/api/languages/${langId}`);
    const data = await res.json();

    if (res.ok) {
      setLanguagesData((prev) => {
        // Don’t duplicate
        if (prev.find((l) => l.lang_id === langId)) return prev;
        return [...prev, data]; // ✅ Add full row with description from DB
      });
    } else {
      alert(data.error || "Language not found in DB");
    }
  } catch (err) {
    console.error("❌ Error fetching language:", err);
  }

  setShowDropdown(false);
};



//   const handleSubmit = () => {
//   const langId = selectedLanguage.substring(0, 2).toUpperCase();

//   const payload = {
//     lang_id: langId,
//     lang_name: selectedLanguage,
//     lang_description_en: description.en,
//     lang_description_local: description.local,
//   };

//   // ✅ Add temporarily to state
//   setLanguagesData((prev) => [...prev, payload]);

//   // Reset modal
//   setShowModal(false);
//   setDescription({ en: "", local: "" });
// };

//   try {
//     const res = await fetch("http://localhost:5000/api/languages", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (res.ok) {
//       alert("✅ Language added successfully!");

//       // ✅ Update frontend immediately
//       setLanguagesData((prev) => [...prev, payload]);

//       setShowModal(false);
//       setDescription({ en: "", local: "" });
//     } else {
//       const err = await res.json();
//       alert(`❌ ${err.error || "Error adding language"}`);
//     }
//   } catch (error) {
//     console.error("❌ Error:", error);
//     alert("Failed to connect to backend.");
//   }
// };
const handleSubmit = async () => {
  const langId = selectedLanguage.substring(0, 2).toUpperCase();

  const payload = {
    lang_id: langId,
    lang_name: selectedLanguage,
    lang_description_en: description.en,
    lang_description_local: description.local,
  };

  try {
    const res = await fetch("http://localhost:5000/api/languages", {
      method: "POST", // 🔄 use UPSERT in backend
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("✅ Language saved/updated successfully!");
      // refresh data
      fetchLanguages();
      setShowModal(false);
      setDescription({ en: "", local: "" });
    } else {
      const err = await res.json();
      alert(`❌ ${err.error || "Error saving language"}`);
    }
  } catch (error) {
    console.error("❌ Error:", error);
    alert("Failed to connect to backend.");
  }
};



  return (
    <div className="language-container">
      {/* Top Right Add Language */}
      <div className="top-header">
        <div className="add-language-wrapper">
          <button className="btn outline" onClick={handleAddLanguageClick}>
            ➕ Add New Language
          </button>

          {showDropdown && (
            <div className="dropdown">
              {staticLanguages.map((lang, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleLanguageSelect(lang)}
                >
                  {lang}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Page Heading */}
      <h1 className="language-heading">Choose your language preference</h1>
      <p className="language-subtitle">
        A personalized experience begins with the language you love.
      </p>

      {/* ✅ Existing Languages Table */}
      <div className="existing-languages">
        <table className="language-table">
          <thead>
            <tr>
              <th>Language ID</th>
              <th>Language Name</th>
              <th>Description (English)</th>
              <th>Description (Local)</th>
            </tr>
          </thead>
          <tbody>
            {languagesData.length > 0 ? (
              languagesData.map((lang) => (
                <tr key={lang.lang_id}>
                  <td>{lang.lang_id}</td>
                  <td>{lang.lang_name}</td>
                  <td>{lang.lang_description_en}</td>
                  <td>{lang.lang_description_local}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No languages found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      

      {/* Modal
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add {selectedLanguage}</h2>

            {/* English description */}
            {/* <textarea
              placeholder={`Enter description in English...`}
              value={description.en}
              onChange={(e) =>
                setDescription({ ...description, en: e.target.value })
              }
            /> */}

            {/* Local description */}
            {/* <textarea
              placeholder={`Enter description in ${selectedLanguage}...`}
              value={description.local}
              onChange={(e) =>
                setDescription({ ...description, local: e.target.value })
              } */}
            {/* />

            <div className="modal-actions">
              <button className="btn primary" onClick={handleSubmit}>
                Save
              </button>
              <button className="btn outline" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}