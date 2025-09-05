// ToastProvider.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import Toast, { ToastState } from "./Toast";

interface ToastContextType {
  showToast: (label: string, options?: { type?: ToastState["type"]; duration?: number }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (
    label: string,
    options?: { type?: ToastState["type"]; duration?: number }
  ) => {
    setToast({
      type: options?.type ?? "info",
      label,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          type={toast.type}
          label={toast.label}
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside a ToastProvider");
  return ctx;
}
