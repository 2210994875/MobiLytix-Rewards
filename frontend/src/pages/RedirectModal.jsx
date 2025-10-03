// src/components/RedirectModal.jsx
import React, { useEffect } from "react";
import "./RedirectModal.css"; // optional for styling

export default function RedirectModal({ open, onClose, message, delay = 2000 }) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, delay); // auto-close after delay
      return () => clearTimeout(timer);
    }
  }, [open, delay, onClose]);

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>{message}</h3>
        <p>You will be redirected shortly...</p>
      </div>
    </div>
  );
}
