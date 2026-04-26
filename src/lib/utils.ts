import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return "16, 185, 129"; // Default emerald
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

export const colorPresets: Record<string, string> = {
    emerald: "#10b981",
    lime: "#84cc16",
    teal: "#14b8a6",
    sky: "#0ea5e9",
    indigo: "#6366f1",
    violet: "#8b5cf6",
    pink: "#ec4899",
    orange: "#f97316",
};
