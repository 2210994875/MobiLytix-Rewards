// import React, { useState, useEffect } from "react";
// import "./LanguageSettings.css";

// export default function LanguageSettings() {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState("");
//   const [addedLangs, setAddedLangs] = useState([]);
//   const [languagesData, setLanguagesData] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [description, setDescription] = useState({ en: "", local: "" });

//   const staticLanguages = [
//     "Spanish",
//     "German",
//     "Hindi",
//     "Chinese",
//     "Japanese",
//     "Russian",
//     "Portuguese",
//   ];

//   const BASE_LANGS = ["EN", "FR", "AR"];

//   // ✅ Fetch all base + added languages
//   const fetchLanguages = async (activeAddedLangs = []) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/languages");
//       const data = await res.json();
//       const filtered = data.filter(
//         (lang) => BASE_LANGS.includes(lang.lang_id) || activeAddedLangs.includes(lang.lang_id)
//       );
//       setLanguagesData(filtered);
//     } catch (error) {
//       console.error("❌ Error fetching languages:", error);
//     }
//   };

//   // 🧠 Load addedLangs from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem("addedLangs");
//     if (saved) {
//       const parsed = JSON.parse(saved);
//       setAddedLangs(parsed);
//       fetchLanguages(parsed);
//     } else {
//       fetchLanguages([]);
//     }
//   }, []);

//   // 💾 Persist changes
//   useEffect(() => {
//     localStorage.setItem("addedLangs", JSON.stringify(addedLangs));
//     fetchLanguages(addedLangs);
//   }, [addedLangs]);

//   const handleAddLanguageClick = () => setShowDropdown(!showDropdown);

//   // ✅ Add language
//   // ✅ Add language (create if not found)
// const handleLanguageSelect = async (lang) => {
//   const langId = lang.slice(0, 2).toUpperCase().trim(); // e.g. "Spanish" → "SP"

//   try {
//     const res = await fetch(`http://localhost:5000/api/languages/${langId}`);
//     const response = await res.json();

//     if (res.ok && response.data) {
//       const languageData = response.data;

//       // ✅ Add only if not already displayed
//       setAddedLangs((prev) => [...new Set([...prev, langId])]);
//       setLanguagesData((prev) => {
//         if (prev.find((l) => l.lang_id === langId)) return prev; // already there
//         return [...prev, languageData];
//       });

//       setShowDropdown(false);
//       setSelectedLanguage(lang);
//     } else {
//       alert(`❌ Language ${langId} not found in database.`);
//     }
//   } catch (err) {
//     console.error("❌ Error fetching language:", err);
//     alert("Failed to fetch language. Please try again.");
//   }
// };

//   // ✅ Edit (update description)
//   const handleEdit = (lang) => {
//     setSelectedLanguage(lang.lang_name);
//     setDescription({
//       en: lang.lang_description_en || "",
//       local: lang.lang_description_local || "",
//     });
//     setEditMode(true);
//     setShowModal(true);
//   };

// const handleDelete = (langId) => {
//   const baseLangs = ["AR", "EN", "FR"]; // protect base langs

//   if (baseLangs.includes(langId)) {
//     alert(`⚠️ ${langId} is a base language and cannot be removed.`);
//     return;
//   }

//   if (!window.confirm("Are you sure you want to remove this language from view?")) return;

//   try {
//     setAddedLangs((prev) => prev.filter((id) => id !== langId));
//     setLanguagesData((prev) => prev.filter((lang) => lang.lang_id !== langId));

//     const updatedLangs = addedLangs.filter((id) => id !== langId);
//     localStorage.setItem("addedLangs", JSON.stringify(updatedLangs));

//     alert("✅ Language removed");
//   } catch (error) {
//     console.error("❌ Error removing language:", error);
//     alert("Something went wrong while removing the language.");
//   }
// };


//   // ✅ Save or update (shared for Add/Edit)
//   const handleSubmit = async () => {
//   const langId = selectedLanguage.slice(0, 2).toUpperCase();

//   const payload = {
//     lang_description_en: description.en,
//     lang_description_local: description.local,
//   };

//   try {
//     const res = await fetch(`http://localhost:5000/api/languages/${langId}`, {
//       method: "PUT", // ✅ use PUT for updates
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (res.ok) {
//       alert("✅ Language updated successfully!");
//       fetchLanguages(addedLangs); // refresh data
//       setShowModal(false);
//       setEditMode(false);
//       setDescription({ en: "", local: "" });
//     } else {
//       const err = await res.json();
//       alert(`❌ ${err.error || "Error updating language"}`);
//     }
//   } catch (error) {
//     console.error("❌ Error updating language:", error);
//     alert("Failed to connect to backend.");
//   }
// };

//   return (
//     <div className="language-container">
//       {/* 🔝 Top Right Add Button */}
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

//       {/* 🏷️ Page Header */}
//       <h1 className="language-heading">Choose your language preference</h1>
//       <p className="language-subtitle">
//         A personalized experience begins with the language you love.
//       </p>

//       {/* 📋 Table */}
//       <div className="existing-languages">
//         <table className="language-table">
//           <thead>
//             <tr>
//               <th>Language ID</th>
//               <th>Language Name</th>
//               <th>Description (English)</th>
//               <th>Description (Local)</th>
//               <th>Actions</th>
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
//                   <td className="action-buttons">
//   <button
//     className="action-btn edit"
//     title="Edit"
//     onClick={() => handleEdit(lang)}
//   >
//     <i className="fas fa-edit"></i>
//   </button>
//   <button
//     className="action-btn delete"
//     title="Delete"
//     onClick={() => handleDelete(lang.lang_id)}
//   >
//     <i className="fas fa-trash"></i>
//   </button>
// </td>

//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5">No languages found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* 🪟 Modal */}
//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>{editMode ? `Edit ${selectedLanguage}` : `Add ${selectedLanguage}`}</h2>

//             <textarea
//               placeholder="Enter description in English..."
//               value={description.en}
//               onChange={(e) => setDescription({ ...description, en: e.target.value })}
//             />

//             <textarea
//               placeholder={`Enter description in ${selectedLanguage}...`}
//               value={description.local}
//               onChange={(e) => setDescription({ ...description, local: e.target.value })}
//             />

//             <div className="modal-actions">
//               <button className="btn primary" onClick={handleSubmit}>
//                 Save
//               </button>
//               <button className="btn outline" onClick={() => setShowModal(false)}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import "./LanguageSettings.css";

export default function LanguageSettings() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [addedLangs, setAddedLangs] = useState([]);
  const [languagesData, setLanguagesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState({ en: "", local: "" });

  // 🌍 Universal languages for dropdown
  const staticLanguages = [
    "French",
    "Spanish",
    "German",
    "Hindi",
    "Chinese",
    "Japanese",
    "Russian",
    "Portuguese",
    "Bengali",
    "Urdu",
    "Indonesian",
    "Swahili",
    "Turkish",
    "Korean",
    "Italian",
  ];

  // ✅ Default languages: English & Arabic only
  const BASE_LANGS = ["EN", "AR"];

  // ✅ Fetch all base + added languages
  const fetchLanguages = async (activeAddedLangs = []) => {
    try {
      const res = await fetch("http://localhost:5000/api/languages");
      const data = await res.json();
      const filtered = data.filter(
        (lang) => BASE_LANGS.includes(lang.lang_id) || activeAddedLangs.includes(lang.lang_id)
      );
      setLanguagesData(filtered);
    } catch (error) {
      console.error("❌ Error fetching languages:", error);
    }
  };

  // 🧠 Load addedLangs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("addedLangs");
    if (saved) {
      const parsed = JSON.parse(saved);
      setAddedLangs(parsed);
      fetchLanguages(parsed);
    } else {
      fetchLanguages([]);
    }
  }, []);

  // 💾 Persist added languages to localStorage
  useEffect(() => {
    localStorage.setItem("addedLangs", JSON.stringify(addedLangs));
    fetchLanguages(addedLangs);
  }, [addedLangs]);

  const handleAddLanguageClick = () => setShowDropdown(!showDropdown);

  // ✅ Add a new language
  const handleLanguageSelect = async (lang) => {
    const langId = lang.slice(0, 2).toUpperCase().trim(); // e.g. "Spanish" → "SP"

    try {
      const res = await fetch(`http://localhost:5000/api/languages/${langId}`);
      const response = await res.json();

      if (res.ok && response.data) {
        const languageData = response.data;

        // Add only if not already added
        setAddedLangs((prev) => [...new Set([...prev, langId])]);
        setLanguagesData((prev) => {
          if (prev.find((l) => l.lang_id === langId)) return prev;
          return [...prev, languageData];
        });

        setShowDropdown(false);
        setSelectedLanguage(lang);
      } else {
        alert(`❌ Language ${langId} not found in database.`);
      }
    } catch (err) {
      console.error("❌ Error fetching language:", err);
      alert("Failed to fetch language. Please try again.");
    }
  };

  // ✅ Edit language
  const handleEdit = (lang) => {
    setSelectedLanguage(lang.lang_name);
    setDescription({
      en: lang.lang_description_en || "",
      local: lang.lang_description_local || "",
    });
    setEditMode(true);
    setShowModal(true);
  };

  // ✅ Delete (remove from list but not DB)
  const handleDelete = (langId) => {
    const baseLangs = ["AR", "EN"]; // protect base langs

    if (baseLangs.includes(langId)) {
      alert(`⚠️ ${langId} is a base language and cannot be removed.`);
      return;
    }

    if (!window.confirm("Are you sure you want to remove this language from view?")) return;

    try {
      setAddedLangs((prev) => prev.filter((id) => id !== langId));
      setLanguagesData((prev) => prev.filter((lang) => lang.lang_id !== langId));

      const updatedLangs = addedLangs.filter((id) => id !== langId);
      localStorage.setItem("addedLangs", JSON.stringify(updatedLangs));

      alert("✅ Language removed");
    } catch (error) {
      console.error("❌ Error removing language:", error);
      alert("Something went wrong while removing the language.");
    }
  };

  // ✅ Save or update language
  const handleSubmit = async () => {
    const langId = selectedLanguage.slice(0, 2).toUpperCase();

    const payload = {
      lang_description_en: description.en,
      lang_description_local: description.local,
    };

    try {
      const res = await fetch(`http://localhost:5000/api/languages/${langId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("✅ Language updated successfully!");
        fetchLanguages(addedLangs);
        setShowModal(false);
        setEditMode(false);
        setDescription({ en: "", local: "" });
      } else {
        const err = await res.json();
        alert(`❌ ${err.error || "Error updating language"}`);
      }
    } catch (error) {
      console.error("❌ Error updating language:", error);
      alert("Failed to connect to backend.");
    }
  };

  return (
    <div className="language-container">
      {/* 🔝 Add Language Button */}
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

      {/* 🏷️ Header */}
      <h1 className="language-heading">Choose your language preference</h1>
      <p className="language-subtitle">
        A personalized experience begins with the language you love.
      </p>

      {/* 📋 Table */}
      <div className="existing-languages">
        <table className="language-table">
          <thead>
            <tr>
              <th>Language ID</th>
              <th>Language Name</th>
              <th>Description (English)</th>
              <th>Description (Local)</th>
              <th>Actions</th>
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
                  <td className="action-buttons">
                    <button
                      className="action-btn edit"
                      title="Edit"
                      onClick={() => handleEdit(lang)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="action-btn delete"
                      title="Delete"
                      onClick={() => handleDelete(lang.lang_id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No languages found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🪟 Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editMode ? `Edit ${selectedLanguage}` : `Add ${selectedLanguage}`}</h2>

            <textarea
              placeholder="Enter description in English..."
              value={description.en}
              onChange={(e) => setDescription({ ...description, en: e.target.value })}
            />

            <textarea
              placeholder={`Enter description in ${selectedLanguage}...`}
              value={description.local}
              onChange={(e) => setDescription({ ...description, local: e.target.value })}
            />

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
      )}
    </div>
  );
}
