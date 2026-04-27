import { useState } from "react";

export function useToast() {
  const [toasts, setToasts] = useState([]);

  function addToast(msg, type = "success") {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 2600);
  }

  return { toasts, addToast };
}

export function ToastContainer({ toasts }) {
  const icons = { success: "✅", error: "⚠️", info: "ℹ️" };
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <span>{icons[t.type]}</span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}
