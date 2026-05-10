import { useState } from "react";

export default function Alert({ message, type = "success", onClose = null }) {
  const [visible, setVisible] = useState(true);

  if (!visible || !message) return null;

  const bgClass = type === "success" ? "bg-green-100 border-green-400 text-green-800" : "bg-red-100 border-red-400 text-red-800";

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  return (
    <div className={`border-l-4 p-4 mb-4 rounded ${bgClass}`}>
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
