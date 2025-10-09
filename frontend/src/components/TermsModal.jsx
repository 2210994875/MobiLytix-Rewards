// import React from "react";
// import "./TermsModal.css"; // ✅ import styles

// export default function TermsModal({ open, onClose }) {
//   if (!open) return null;

//   return (
//     <div className={`terms-modal ${open ? "show" : ""}`}>
//       <div className="terms-modal-content">
//         <header className="terms-modal-header">
//           <h2>Terms & Conditions</h2>
//           <button className="close-btn" onClick={onClose}>×</button>
//         </header>

      
//         <div className="terms-modal-body">
//           <p>
//             These terms and conditions outline the rules and regulations for using this service.
//             By submitting this form, you agree to be bound by these terms.
//           </p>
//           <ul>
//             <li>✔️ Provide accurate company details.</li>
//             <li>✔️ Ensure uploaded contracts are valid.</li>
//             <li>✔️ Respect privacy and data handling rules.</li>
//           </ul>
//           <p>If you disagree with these terms, you may not proceed with company registration.</p>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import "./TermsModal.css";

export default function TermsModal({ open, onClose, activeLang, messages }) {
  if (!open) return null;

  const langCode = activeLang?.toLowerCase();
  const t = messages?.[langCode]?.terms;

  // 🛑 show nothing or a message if terms missing
  if (!t) {
    return (
      <div className={`terms-modal ${open ? "show" : ""}`}>
        <div className="terms-modal-content">
          <header className="terms-modal-header">
            <h2>Terms Not Available</h2>
            <button className="close-btn" onClick={onClose}>×</button>
          </header>
          <div className="terms-modal-body">
            <p>Terms for this language are not yet available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`terms-modal ${open ? "show" : ""}`}
      dir={langCode === "ar" ? "rtl" : "ltr"}
    >
      <div className="terms-modal-content">
        <header className="terms-modal-header">
          <h2>{t.title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </header>

        <div className="terms-modal-body">
          <p>{t.intro}</p>
          <ul>
            {t.points.map((point, index) => (
              <li key={index}>✔️ {point}</li>
            ))}
          </ul>
          <p>{t.outro || t.footer}</p>
        </div>
      </div>
    </div>
  );
}
