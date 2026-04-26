"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
const motion = m as any;
import {
    Sun,
    Moon,
    Monitor,
    Palette,
    Menu,
    X,
    Check,
    Globe,
    Search,
    Loader2,
    Plus,
    ArrowRight,
    Sparkles,
    ExternalLink,
    Cpu,
    Settings2,
    ChevronRight,
    Github,
    Linkedin,
    Mail,
} from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";
import { Theme } from "../../types";
import { cn } from "../../lib/utils";
import { GoogleGenAI } from "@google/genai";
import { portfolioData } from "../../data/portfolio";
import { translations } from "../../data/translation";

export default function Navbar() {
    const { theme, setTheme, primaryColor, setPrimaryColor, language } =
        useTheme();
    const { socialLinks } = portfolioData.personalInfo;
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<
        "lang" | "search" | "theme" | "palette" | null
    >(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchResult, setSearchResult] = useState<string | null>(null);
    const [searchSources, setSearchSources] = useState<
        { title: string; uri: string }[]
    >([]);
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);
    const colorInputRef = useRef<HTMLInputElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const t = translations[language];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (activeMenu === "search") {
            setTimeout(() => searchInputRef.current?.focus(), 100);
            document.body.style.overflow = "hidden";
        } else if (!isMobileMenuOpen) {
            document.body.style.overflow = "";
        }
    }, [activeMenu, isMobileMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                activeMenu === "search" &&
                !target.closest(".search-modal-container")
            ) {
                setActiveMenu(null);
            } else if (
                activeMenu &&
                !target.closest(".nav-popover-container")
            ) {
                setActiveMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [activeMenu]);

    const navLinks = [
        { name: t.nav.about, href: "#about", id: "about" },
        { name: t.nav.skills, href: "#skills", id: "skills" },
        { name: t.nav.projects, href: "#projects", id: "projects" },
        { name: t.nav.contact, href: "#contact", id: "contact" },
    ];

    const themes: { id: Theme; name: string; icon: React.ReactNode }[] = [
        { id: "light", name: "Light", icon: <Sun size={14} /> },
        { id: "dark", name: "Dark", icon: <Moon size={14} /> },
        { id: "system", name: "System", icon: <Monitor size={14} /> },
    ];

    // const languages: { code: Language; name: string }[] = [
    //     { code: "en", name: "English" },
    //     { code: "fr", name: "Français" },
    //     { code: "es", name: "Español" },
    //     { code: "nl", name: "Dutch" },
    // ];

    const presets = ["#14b8a6", "#8b5cf6", "#f97316", "#3b82f6", "#f43f5e"];

    const handleSearch = async (
        e?: React.FormEvent,
        queryOverride?: string,
    ) => {
        if (e) e.preventDefault();
        const query = queryOverride || searchQuery;
        if (!query.trim()) return;

        setSearchQuery(query);
        setIsSearching(true);
        setSearchResult(null);
        setSearchSources([]);

        try {
            const ai = new GoogleGenAI({
                apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
            });
            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: `Portfolio info: ${JSON.stringify(portfolioData)}. User Query: ${query}`,
                config: {
                    tools: [{ googleSearch: {} }],
                    systemInstruction:
                        "You are an intelligent assistant for Meshal's portfolio. Provide precise, impressive, and friendly answers about his skills, projects, and career.",
                },
            });

            setSearchResult(response.text || "No specific details found.");
            const chunks =
                response.candidates?.[0]?.groundingMetadata?.groundingChunks;
            if (chunks) {
                const sources = chunks
                    .filter((chunk) => chunk.web)
                    .map((chunk) => ({
                        title: chunk.web?.title || "Knowledge Source",
                        uri: chunk.web?.uri || "#",
                    }));
                setSearchSources(sources);
            }
        } catch (err) {
            console.error(err);
            setSearchResult(
                "The Neural Hub is currently offline. Please try again in a moment.",
            );
        } finally {
            setIsSearching(false);
        }
    };

    const scrollToSection = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string,
    ) => {
        e.preventDefault();
        const id = href.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            setIsMobileMenuOpen(false);
            setActiveMenu(null);
        }
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 w-full z-100 transition-all duration-500",
                isScrolled
                    ? "bg-background/70 backdrop-blur-2xl py-2.5 shadow-2xl shadow-black/5"
                    : "bg-transparent py-6",
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="flex items-center group gap-3"
                    >
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                            <svg
                                viewBox="0 0 24 24"
                                className="w-6 h-6 stroke-white"
                                fill="none"
                                strokeWidth="2"
                            >
                                <path
                                    d="M4 18V6l4 6 4-6 4 6 4-6v12"
                                    className="stroke-dasharray-100 stroke-dashoffset-100 group-hover:stroke-dashoffset-0 transition-all duration-700"
                                />
                            </svg>
                        </div>
                        {/* <div className="w-10 h-10 rounded-xl bg-primary items-center justify-center text-white shadow-lg shadow-primary/30 transition-all group-hover:scale-110 active:scale-95 hidden md:flex">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-6 h-6"
                            >
                                <path d="M6 17V7l6 6 6-6v10" />
                            </svg>
                        </div> */}
                        <span
                            className="text-lg tracking-widest text-foreground"
                            style={{ fontFamily: "var(--font-mrdafoe)" }}
                        >
                            <span className="text-primary">M</span>eshal
                        </span>
                    </a>
                </motion.div>

                <nav className="hidden lg:flex items-center">
                    <div className="inline-flex items-center p-1.5 bg-card/40 backdrop-blur-3xl rounded-full shadow-sm border border-border/50">
                        {navLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                onMouseEnter={() => setHoveredNav(link.id)}
                                onMouseLeave={() => setHoveredNav(null)}
                                className={cn(
                                    "relative px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 z-10",
                                    hoveredNav === link.id
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground",
                                )}
                            >
                                {link.name}
                                <AnimatePresence>
                                    {hoveredNav === link.id && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{
                                                type: "spring",
                                                bounce: 0.2,
                                                duration: 0.6,
                                            }}
                                        />
                                    )}
                                </AnimatePresence>
                            </a>
                        ))}
                    </div>
                </nav>

                <div className="flex items-center gap-1.5 sm:gap-2 nav-popover-container">
                    <div className="flex items-center gap-1.5 pr-2 border-r border-border/50 mr-1.5">
                        {/* <div className="relative">
                            <button
                                onClick={() =>
                                    setActiveMenu(
                                        activeMenu === "lang" ? null : "lang",
                                    )
                                }
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                                    activeMenu === "lang"
                                        ? "bg-primary text-white border-primary"
                                        : "bg-muted/5 border-transparent hover:border-border text-foreground",
                                )}
                            >
                                <Globe size={14} />
                                <span>{language}</span>
                                <ChevronDown
                                    size={10}
                                    className={cn(
                                        "transition-transform",
                                        activeMenu === "lang" && "rotate-180",
                                    )}
                                />
                            </button>
                            <AnimatePresence>
                                {activeMenu === "lang" && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 10,
                                            scale: 0.95,
                                        }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{
                                            opacity: 0,
                                            y: 10,
                                            scale: 0.95,
                                        }}
                                        className="absolute right-0 top-full mt-2 p-2 bg-card border border-border rounded-2xl shadow-2xl min-w-30 z-50"
                                    >
                                        {languages.map((l) => (
                                            <button
                                                key={l.code}
                                                onClick={() => {
                                                    setLanguage(l.code);
                                                    setActiveMenu(null);
                                                }}
                                                className={cn(
                                                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-[10px] font-black uppercase transition-all",
                                                    language === l.code
                                                        ? "bg-primary/10 text-primary"
                                                        : "hover:bg-muted/10 text-muted",
                                                )}
                                            >
                                                {l.name}
                                                {language === l.code && (
                                                    <Check size={12} />
                                                )}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div> */}
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setActiveMenu(
                                        activeMenu === "palette"
                                            ? null
                                            : "palette",
                                    )
                                }
                                className={cn(
                                    "p-2.5 rounded-xl transition-all hover:bg-muted/5 text-foreground cursor-pointer",
                                )}
                            >
                                <Palette size={16} />
                            </button>
                            <AnimatePresence>
                                {activeMenu === "palette" && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 10,
                                            scale: 0.95,
                                        }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{
                                            opacity: 0,
                                            y: 10,
                                            scale: 0.95,
                                        }}
                                        className="absolute right-0 top-full mt-3 p-4 bg-card border border-border rounded-2xl shadow-2xl min-w-50 z-110 backdrop-blur-3xl"
                                    >
                                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mb-4 px-1">
                                            Style Config
                                        </p>
                                        <div className="grid grid-cols-5 gap-3 mb-4">
                                            {presets.map((color) => (
                                                <button
                                                    key={color}
                                                    onClick={() =>
                                                        setPrimaryColor(color)
                                                    }
                                                    className={cn(
                                                        "w-6 h-6 rounded-full transition-all hover:scale-125 cursor-pointer",
                                                        primaryColor ===
                                                            color &&
                                                            "ring-2 ring-primary ring-offset-4 ring-offset-card",
                                                    )}
                                                    style={{
                                                        backgroundColor: color,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <button
                                            onClick={() =>
                                                colorInputRef.current?.click()
                                            }
                                            className="w-full flex items-center justify-between px-3 py-2.5 bg-muted/20 hover:bg-primary/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all cursor-pointer"
                                        >
                                            Custom HEX <Plus size={12} />
                                        </button>
                                        <input
                                            ref={colorInputRef}
                                            type="color"
                                            className="sr-only"
                                            onChange={(e) =>
                                                setPrimaryColor(e.target.value)
                                            }
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="relative">
                            <button
                                onClick={() =>
                                    setActiveMenu(
                                        activeMenu === "theme" ? null : "theme",
                                    )
                                }
                                className={cn(
                                    "p-2.5 rounded-xl transition-all hover:bg-muted/5 text-foreground cursor-pointer",
                                )}
                            >
                                {themes.find((t) => t.id === theme)?.icon || (
                                    <Monitor size={16} />
                                )}
                            </button>
                            <AnimatePresence>
                                {activeMenu === "theme" && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 10,
                                            scale: 0.95,
                                        }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{
                                            opacity: 0,
                                            y: 10,
                                            scale: 0.95,
                                        }}
                                        className="absolute right-0 top-full mt-3 p-2 bg-card border border-border rounded-2xl shadow-2xl min-w-37.5 z-110 backdrop-blur-3xl"
                                    >
                                        {themes.map((tItem) => (
                                            <button
                                                key={tItem.id}
                                                onClick={() => {
                                                    setTheme(tItem.id);
                                                    setActiveMenu(null);
                                                }}
                                                className={cn(
                                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer",
                                                    theme === tItem.id
                                                        ? "bg-primary text-white shadow-lg"
                                                        : "text-muted hover:bg-muted/10 hover:text-foreground",
                                                )}
                                            >
                                                {tItem.icon}{" "}
                                                <span className="grow text-left tracking-widest">
                                                    {tItem.name}
                                                </span>{" "}
                                                {theme === tItem.id && (
                                                    <Check size={12} />
                                                )}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* <button
                        onClick={() => {
                            setActiveMenu(
                                activeMenu === "search" ? null : "search",
                            );
                            if (activeMenu !== "search") {
                                setSearchResult(null);
                                setSearchSources([]);
                            }
                        }}
                        className={cn(
                            "w-10 h-10 sm:w-12 sm:h-12 rounded-xl transition-all border flex items-center justify-center overflow-hidden relative z-101 hover:bg-muted/5 border-transparent hover:border-border text-foreground",
                        )}
                        aria-label="Toggle AI Search"
                    >
                        <Search
                            size={18}
                            strokeWidth={3}
                            className={cn(
                                "sm:w-5 sm:h-5 transition-transform",
                                activeMenu === "search" && "scale-110",
                            )}
                        />
                    </button> */}

                    <button
                        className={cn(
                            "w-10 h-10 sm:w-12 sm:h-12 rounded-xl transition-all active:scale-90 lg:hidden relative z-101 flex items-center justify-center cursor-pointer",
                            isMobileMenuOpen
                                ? "bg-primary text-white shadow-xl"
                                : "hover:bg-muted/5 text-primary",
                        )}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X size={20} strokeWidth={2.5} />
                        ) : (
                            <Menu size={20} strokeWidth={2.5} />
                        )}
                    </button>
                </div>
            </div>

            {/* <AnimatePresence>
                {activeMenu === "search" && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveMenu(null)}
                            className="fixed inset-0 z-999 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.98,
                                y: 20,
                                x: "-50%",
                            }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, scale: 0.98, y: 20, x: "-50%" }}
                            className="fixed z-1000 search-modal-container left-1/2 top-[12%] w-[calc(100vw-2rem)] max-w-125 max-h-[75vh] bg-card/95 backdrop-blur-[32px] border border-white/10 rounded-4xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
                        >
                            <div className="flex items-center justify-between p-5 md:p-6 border-b border-white/5 shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-primary text-white rounded-xl shadow-lg">
                                        <Sparkles size={18} />
                                    </div>
                                    <div>
                                        <h3 className="text-[11px] font-black uppercase tracking-[0.25em] leading-none mb-1">
                                            Neural AI Hub
                                        </h3>
                                        <p className="text-[8px] font-bold text-muted uppercase tracking-widest opacity-60">
                                            System Operational
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setActiveMenu(null)}
                                    className="p-2 hover:bg-white/5 rounded-xl transition-all text-muted hover:text-foreground"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-5 md:p-8 overflow-y-auto no-scrollbar grow">
                                <form
                                    onSubmit={handleSearch}
                                    className="relative mb-8"
                                >
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        placeholder="Search for projects, tech stack, or background..."
                                        className="w-full bg-white/5 border border-white/5 focus:border-primary/40 rounded-2xl px-5 py-4 text-sm md:text-base outline-none transition-all pr-14 shadow-inner placeholder:text-muted/30 font-medium"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        {isSearching ? (
                                            <Loader2
                                                size={20}
                                                className="animate-spin text-primary"
                                            />
                                        ) : (
                                            <Search
                                                size={20}
                                                className="text-primary/50"
                                            />
                                        )}
                                    </div>
                                </form>

                                <AnimatePresence mode="wait">
                                    {isSearching ? (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="py-20 text-center space-y-6"
                                        >
                                            <div className="relative inline-block">
                                                <div className="w-16 h-16 rounded-full border-2 border-dashed border-primary/20 animate-spin-slow" />
                                                <Cpu
                                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary"
                                                    size={24}
                                                />
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/80 animate-pulse">
                                                Syncing Knowledge Nodes...
                                            </p>
                                        </motion.div>
                                    ) : searchResult ? (
                                        <motion.div
                                            key="result"
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-8 pb-4"
                                        >
                                            <div className="p-6 bg-white/5 border border-white/5 rounded-[1.75rem] text-[14px] leading-relaxed text-foreground/90 whitespace-pre-wrap selection:bg-primary/20 shadow-sm">
                                                {searchResult}
                                            </div>
                                            {searchSources.length > 0 && (
                                                <div className="space-y-3">
                                                    <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-muted flex items-center gap-2 px-1">
                                                        <Globe size={12} />{" "}
                                                        Reference Data
                                                    </h4>
                                                    <div className="grid grid-cols-1 gap-2.5">
                                                        {searchSources.map(
                                                            (s, i) => (
                                                                <a
                                                                    key={i}
                                                                    href={s.uri}
                                                                    target="_blank"
                                                                    className="p-4 bg-white/5 hover:bg-primary/10 border border-white/5 rounded-2xl transition-all truncate text-[11px] font-bold text-muted hover:text-foreground flex items-center gap-3"
                                                                >
                                                                    <ExternalLink
                                                                        size={
                                                                            12
                                                                        }
                                                                        className="shrink-0 text-primary"
                                                                    />{" "}
                                                                    {s.title}
                                                                </a>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    ) : (
                                        <div className="space-y-8">
                                            <div className="text-center py-10 opacity-30">
                                                <Search
                                                    size={32}
                                                    className="mx-auto mb-4 text-muted"
                                                />
                                                <p className="text-[12px] font-medium max-w-70 mx-auto leading-relaxed uppercase tracking-widest">
                                                    Awaiting system input...
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-1 gap-2.5">
                                                {[
                                                    "Tell me about Scholara",
                                                    "What is Meshal's tech stack?",
                                                    "Recent projects",
                                                ].map((q, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() =>
                                                            handleSearch(
                                                                undefined,
                                                                q,
                                                            )
                                                        }
                                                        className="p-4 bg-white/5 hover:bg-primary/10 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-muted hover:text-primary transition-all text-left flex items-center justify-between group"
                                                    >
                                                        {q}{" "}
                                                        <ArrowRight
                                                            size={14}
                                                            className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="p-5 bg-white/5 border-t border-white/5 flex items-center justify-between shrink-0">
                                <p className="text-[8px] font-black text-muted/30 uppercase tracking-[0.4em]">
                                    Proprietary Neural Link
                                </p>
                                <span className="text-[8px] font-black text-primary/40 uppercase tracking-widest">
                                    v6.4 Build 2025
                                </span>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence> */}

            <AnimatePresence>
                {activeMenu === "search" && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveMenu(null)}
                            className="fixed inset-0 z-999 bg-black/80 backdrop-blur-sm cursor-pointer"
                        />
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.98,
                                y: 20,
                                x: "-50%",
                            }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, scale: 0.98, y: 20, x: "-50%" }}
                            className="fixed z-1000 search-modal-container left-1/2 top-[12%] w-[calc(100vw-2rem)] max-w-125 max-h-[75vh] bg-card/95 backdrop-blur-[32px] border border-white/10 rounded-4xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
                        >
                            <div className="flex items-center justify-between p-5 md:p-6 border-b border-white/5 shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-primary text-white rounded-xl shadow-lg">
                                        <Sparkles size={18} />
                                    </div>
                                    <div>
                                        <h3 className="text-[11px] font-black uppercase tracking-[0.25em] leading-none mb-1">
                                            Neural AI Hub
                                        </h3>
                                        <p className="text-[8px] font-bold text-muted uppercase tracking-widest opacity-60">
                                            System Operational
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setActiveMenu(null)}
                                    className="p-2 hover:bg-white/5 rounded-xl transition-all text-muted hover:text-foreground"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-5 md:p-8 overflow-y-auto no-scrollbar grow">
                                <form
                                    onSubmit={handleSearch}
                                    className="relative mb-8"
                                >
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        placeholder="Search for projects, tech stack, or background..."
                                        className="w-full bg-white/5 border border-white/5 focus:border-primary/40 rounded-2xl px-5 py-4 text-sm md:text-base outline-none transition-all pr-14 shadow-inner placeholder:text-muted/30 font-medium"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        {isSearching ? (
                                            <Loader2
                                                size={20}
                                                className="animate-spin text-primary"
                                            />
                                        ) : (
                                            <Search
                                                size={20}
                                                className="text-primary/50"
                                            />
                                        )}
                                    </div>
                                </form>

                                <AnimatePresence mode="wait">
                                    {isSearching ? (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="py-20 text-center space-y-6"
                                        >
                                            <div className="relative inline-block">
                                                <div className="w-16 h-16 rounded-full border-2 border-dashed border-primary/20 animate-spin-slow" />
                                                <Cpu
                                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary"
                                                    size={24}
                                                />
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/80 animate-pulse">
                                                Syncing Knowledge Nodes...
                                            </p>
                                        </motion.div>
                                    ) : searchResult ? (
                                        <motion.div
                                            key="result"
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-8 pb-4"
                                        >
                                            <div className="p-6 bg-white/5 border border-white/5 rounded-[1.75rem] text-[14px] leading-relaxed text-foreground/90 whitespace-pre-wrap selection:bg-primary/20 shadow-sm">
                                                {searchResult}
                                            </div>
                                            {searchSources.length > 0 && (
                                                <div className="space-y-3">
                                                    <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-muted flex items-center gap-2 px-1">
                                                        <Globe size={12} />{" "}
                                                        Reference Data
                                                    </h4>
                                                    <div className="grid grid-cols-1 gap-2.5">
                                                        {searchSources.map(
                                                            (s, i) => (
                                                                <a
                                                                    key={i}
                                                                    href={s.uri}
                                                                    target="_blank"
                                                                    className="p-4 bg-white/5 hover:bg-primary/10 border border-white/5 rounded-2xl transition-all truncate text-[11px] font-bold text-muted hover:text-foreground flex items-center gap-3"
                                                                >
                                                                    <ExternalLink
                                                                        size={
                                                                            12
                                                                        }
                                                                        className="shrink-0 text-primary"
                                                                    />{" "}
                                                                    {s.title}
                                                                </a>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    ) : (
                                        <div className="space-y-8">
                                            <div className="text-center py-10 opacity-30">
                                                <Search
                                                    size={32}
                                                    className="mx-auto mb-4 text-muted"
                                                />
                                                <p className="text-[12px] font-medium max-w-70 mx-auto leading-relaxed uppercase tracking-widest">
                                                    Awaiting system input...
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-1 gap-2.5">
                                                {[
                                                    "Tell me about Scholara",
                                                    "What is Meshal's tech stack?",
                                                    "Recent projects",
                                                ].map((q, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() =>
                                                            handleSearch(
                                                                undefined,
                                                                q,
                                                            )
                                                        }
                                                        className="p-4 bg-white/5 hover:bg-primary/10 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-muted hover:text-primary transition-all text-left flex items-center justify-between group"
                                                    >
                                                        {q}{" "}
                                                        <ArrowRight
                                                            size={14}
                                                            className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="p-5 bg-white/5 border-t border-white/5 flex items-center justify-between shrink-0">
                                <p className="text-[8px] font-black text-muted/30 uppercase tracking-[0.4em]">
                                    Proprietary Neural Link
                                </p>
                                <span className="text-[8px] font-black text-primary/40 uppercase tracking-widest">
                                    v6.4 Build 2025
                                </span>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        className="fixed inset-0 z-100 lg:hidden bg-background flex flex-col pt-24 pb-12 px-8 overflow-y-auto no-scrollbar"
                        style={{ height: "100dvh" }}
                    >
                        <div className="absolute top-0 right-0 w-full h-[40%] bg-primary/10 blur-[120px] rounded-full opacity-30 -z-10" />

                        <div className="flex flex-col h-full max-w-md mx-auto w-full pt-8">
                            <div className="flex flex-col gap-3 mb-12">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) =>
                                            scrollToSection(e, link.href)
                                        }
                                        className="text-2xl font-black uppercase tracking-tighter hover:text-primary transition-all flex items-center justify-between py-2 group"
                                    >
                                        {link.name}
                                        <ChevronRight
                                            className="opacity-0 group-hover:opacity-100 transition-all text-primary -translate-x-2.5 group-hover:translate-x-0"
                                            size={32}
                                        />
                                    </a>
                                ))}
                            </div>

                            <div className="space-y-10 mb-20">
                                <div className="flex items-center gap-3">
                                    <Settings2
                                        size={18}
                                        className="text-primary"
                                    />
                                    <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-foreground">
                                        Global Configuration
                                    </h4>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    {themes.map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => setTheme(t.id)}
                                            className={cn(
                                                "flex flex-col items-center gap-2 py-5 rounded-2xl border transition-all cursor-pointer",
                                                theme === t.id
                                                    ? "bg-primary text-white border-primary shadow-xl"
                                                    : "bg-card border-border/50 text-muted",
                                            )}
                                        >
                                            {t.icon}
                                            <span className="text-[8px] font-black uppercase tracking-[0.2em]">
                                                {t.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                {/* <div className="flex flex-wrap gap-2.5">
                                    {languages.map((l) => (
                                        <button
                                            key={l.code}
                                            onClick={() => setLanguage(l.code)}
                                            className={cn(
                                                "px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all",
                                                language === l.code
                                                    ? "bg-primary text-white border-primary"
                                                    : "bg-card border-border/50 text-muted",
                                            )}
                                        >
                                            {l.name}
                                        </button>
                                    ))}
                                </div> */}

                                <div className="bg-card/50 p-6 rounded-3xl border border-border/50">
                                    <div className="flex items-center gap-4 mb-5">
                                        {presets.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() =>
                                                    setPrimaryColor(color)
                                                }
                                                className={cn(
                                                    "w-8 h-8 rounded-full transition-transform active:scale-90 cursor-pointer",
                                                    primaryColor === color &&
                                                        "ring-2 ring-primary ring-offset-4 ring-offset-background",
                                                )}
                                                style={{
                                                    backgroundColor: color,
                                                }}
                                            />
                                        ))}
                                        {/* <button
                                            onClick={() => {
                                                setIsMobileMenuOpen(
                                                    !isMobileMenuOpen,
                                                );
                                                colorInputRef.current?.click();
                                            }}
                                            className="w-8 h-8 rounded-full border border-dashed border-border flex items-center justify-center text-muted cursor-pointer"
                                        >
                                            <Plus size={16} />
                                        </button> */}
                                    </div>
                                    <p className="text-[9px] font-bold text-muted/40 text-center uppercase tracking-widest leading-relaxed">
                                        Neural Base Synchronizer
                                    </p>
                                </div>
                            </div>

                            <div className="mt-auto flex flex-col items-center gap-10 pt-12 border-t border-border/30">
                                <div className="flex gap-10">
                                    <a
                                        href={socialLinks.github}
                                        target="_blank"
                                        className="text-muted hover:text-primary transition-all"
                                    >
                                        <Github size={24} strokeWidth={2.5} />
                                    </a>
                                    <a
                                        href={socialLinks.linkedin}
                                        target="_blank"
                                        className="text-muted hover:text-primary transition-all"
                                    >
                                        <Linkedin size={24} strokeWidth={2.5} />
                                    </a>
                                    <a
                                        href={`mailto:${portfolioData.personalInfo.email}`}
                                        className="text-muted hover:text-primary transition-all"
                                    >
                                        <Mail size={24} strokeWidth={2.5} />
                                    </a>
                                </div>
                                <p className="text-[10px] font-black text-muted/40 uppercase tracking-[0.5em]">
                                    &copy; {new Date().getFullYear()} • ALL CORE
                                    DATA SAVED
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
