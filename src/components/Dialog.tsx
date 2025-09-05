"use client";

import { ReactNode } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Dialog({ isOpen, onClose, title, children }: DialogProps) {
  if (!isOpen) return null;



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer" 
        >
          ✕
        </button>

        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

        {children}
      </div>
    </div>
  );
}
