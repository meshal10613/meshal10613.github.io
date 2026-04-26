"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme, PrimaryColor, Language } from "../../types";
import { hexToRgb } from "../../lib/utils";
import Loading from "../sections/Loading";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    primaryColor: PrimaryColor;
    setPrimaryColor: (color: PrimaryColor) => void;
    language: Language;
    setLanguage: (lang: Language) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    // const [theme, setTheme] = useState<Theme>(
    //     () => (localStorage.getItem("theme") as Theme) || "system",
    // );
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === "undefined") return "system";
        return (localStorage.getItem("theme") as Theme) ?? "system";
    });

    // Initial color set to #14b8a6 (Teal)
    const [primaryColor, setPrimaryColor] = useState<PrimaryColor>(() => {
        if (typeof window === "undefined") return "#14b8a6";
        return (
            (localStorage.getItem("primaryColor") as PrimaryColor) || "#14b8a6"
        );
    });
    const [language, setLanguage] = useState<Language>(() => {
        if (typeof window === "undefined") return "en";
        return (localStorage.getItem("language") as Language) || "en";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia(
                "(prefers-color-scheme: dark)",
            ).matches
                ? "dark"
                : "light";
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const root = window.document.documentElement;
        const rgb = hexToRgb(primaryColor);
        root.style.setProperty("--primary", primaryColor);
        root.style.setProperty("--primary-rgb", rgb);
        localStorage.setItem("primaryColor", primaryColor);

        // Dynamic Favicon (Meta Logo) Update
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            const color = primaryColor.startsWith("#")
                ? primaryColor
                : `#${primaryColor}`;
            const encodedColor = encodeURIComponent(color);
            // Constructing the SVG URI matching the Navbar Logo path
            const svg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='7' fill='${encodedColor}'/%3E%3Cpath d='M6 17V7l6 6 6-6v10' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E`;
            favicon.setAttribute("href", svg);
        }
    }, [primaryColor]);

    useEffect(() => {
        const root = window.document.documentElement;
        root.setAttribute("lang", language);
        localStorage.setItem("language", language);
    }, [language]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // 1 second

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                primaryColor,
                setPrimaryColor,
                language,
                setLanguage,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
