"use client"
import { useEffect, useState } from "react";

export interface ToastState {
  type: "info" | "success" | "warning" | "error";
  label: string;
}

interface ToastProps {
    type?: "info" | "success" | "warning" | "error";
    label: string;
    duration?: number;
    onClose?: () => void;
}

const toastDict: Record<string, { color: string; emoji: string }> = {
    info: {
        color: "bg-blue-100 text-blue-800",
        emoji: "ℹ️"
    },
    success: {
        color: "bg-green-100 text-green-800",
        emoji: "✔️"
    },
    warning: {
        color: "bg-yellow-100 text-yellow-800",
        emoji: "⚠️"
    },
    error: {
        color: "bg-red-100 text-red-800",
        emoji: "❌"
    },
};

export default function Toast({ type = "info", label, duration = 3000, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(false);
    const colorClasses = toastDict[type].color;

    // Fade in on mount
    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Handle fade-out and component unmount
    useEffect(() => {
        if (!isVisible) {
            const timer = setTimeout(() => {
                if (onClose) onClose();
            }, 300); // This duration should match your transition-duration
            
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    // Handle initial timeout
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    return (
        <div
            className={`fixed inset-x-0 bottom-6 flex uppercase items-center justify-center z-50 pointer-events-none transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div
            className={`px-3 py-2 rounded-lg shadow-md text-sm font-bold ${colorClasses} pointer-events-auto`}
            >
                {label} {toastDict[type].emoji}
            </div>
        </div>
    );
}