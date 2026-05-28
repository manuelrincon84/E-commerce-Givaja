import { useState } from "react";

export default function Alert({ message, type = "success", onClose = null }) {
  const [visible, setVisible] = useState(true);

  if (!visible || !message) return null;

  const bgStyle = type === "success" ? {
    backgroundColor: 'var(--primary-50)',
    borderLeftColor: 'var(--primary-500)',
    color: 'var(--primary-700)'
  } : {
    backgroundColor: 'var(--error-50)',
    borderLeftColor: 'var(--error-500)',
    color: 'var(--error-700)'
  };

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  return (
    <div style={bgStyle} className="border-l-4 p-4 mb-4 rounded">
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={handleClose}
          className="text-lg font-bold hover:opacity-70"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
