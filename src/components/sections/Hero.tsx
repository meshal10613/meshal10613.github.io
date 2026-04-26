"use client";

import React, { useState, useEffect } from "react";
import { motion as m } from "framer-motion";
const motion = m as any;
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { portfolioData } from "../../data/portfolio";
import { useTheme } from "../providers/ThemeProvider";
import { TicTacToe } from "../custom/TicTacToe";
import { translations } from "../../data/translation";
import Image from "next/image";

const ROLES = [
    "MERN STACK DEVELOPER",
    "FULL STACK DEVELOPER",
    "FRONTEND DEVELOPER",
    "AI ARCHITECT",
];

export default function Hero() {
    const { name, shortObjective } = portfolioData.personalInfo;
    const { language } = useTheme();
    const t = translations[language];

    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleType = () => {
            const currentRole = ROLES[roleIndex];
            if (isDeleting) {
                setDisplayText(
                    currentRole.substring(0, displayText.length - 1),
                );
                setTypingSpeed(50);
            } else {
                setDisplayText(
                    currentRole.substring(0, displayText.length + 1),
                );
                setTypingSpeed(150);
            }

            if (!isDeleting && displayText === currentRole) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && displayText === "") {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % ROLES.length);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, roleIndex, typingSpeed]);

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-background"
        >
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[10%] right-[10%] w-160 h-160 bg-primary/5 rounded-full blur-[160px] opacity-70" />
                <div className="absolute bottom-[10%] left-[10%] w-120 h-120 bg-secondary/5 rounded-full blur-[140px] opacity-50" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 w-full py-16 lg:py-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-primary/5 text-primary text-[11px] font-black uppercase tracking-[0.35em] mb-12 border border-primary/20 backdrop-blur-xl shadow-2xl shadow-primary/10">
                        <Sparkles size={16} />
                        <span>Digital Architect</span>
                    </div>

                    <h1 className="text-7xl sm:text-8xl md:text-[10rem] font-black tracking-tighter mb-10 leading-[0.8] overflow-visible">
                        <span className="block text-foreground">
                            {t.hero.im}
                        </span>
                        <span className="block text-gradient py-4">
                            {name.split(" ").pop()}
                        </span>
                    </h1>

                    <h2 className="text-2xl md:text-4xl font-black text-muted mb-12 tracking-tighter uppercase flex items-center h-12 gap-3">
                        <div className="hidden md:block w-16 h-0.5 bg-primary/20" />
                        <span className="relative">
                            {displayText}
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="inline-block w-2 h-8 md:h-12 bg-primary ml-3 align-middle"
                            />
                        </span>
                    </h2>

                    <p className="text-xl md:text-2xl text-muted/60 max-w-xl mb-16 leading-relaxed font-light">
                        {shortObjective}
                    </p>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 mb-24">
                        <motion.a
                            href="#contact"
                            whileHover={{
                                scale: 1.03,
                                y: -4,
                                transition: {
                                    type: "spring",
                                    stiffness: 180, // lower = smoother
                                    damping: 14, // higher = less bounce
                                    mass: 0.8,
                                },
                            }}
                            whileTap={{
                                scale: 0.97,
                                transition: { duration: 0.15 },
                            }}
                            className="px-12 py-6 bg-primary text-white rounded-full font-black uppercase tracking-[0.25em] text-[12px] flex items-center gap-5 shadow-[0_32px_64px_-16px_rgba(var(--primary-rgb),0.35)]"
                        >
                            {t.hero.touch}{" "}
                            <ArrowRight size={20} strokeWidth={3} />
                        </motion.a>
                        <motion.a
                            href={portfolioData.personalInfo.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{
                                scale: 1.03,
                                y: -4,
                                backgroundColor:
                                    "rgba(var(--primary-rgb), 0.05)",
                                transition: {
                                    type: "spring",
                                    stiffness: 180, // lower = smoother
                                    damping: 14, // higher = less bounce
                                    mass: 0.8,
                                },
                            }}
                            whileTap={{
                                scale: 0.97,
                                transition: { duration: 0.15 },
                            }}
                            className="px-12 py-6 bg-transparent rounded-full border-2 border-border text-foreground font-black uppercase tracking-[0.25em] text-[12px] flex items-center gap-5 backdrop-blur-md"
                        >
                            {t.hero.resume}{" "}
                            <Download size={20} strokeWidth={3} />
                        </motion.a>
                    </div>

                    {/* <div className="flex flex-wrap justify-center lg:justify-start gap-12 py-10 border-t border-border/40 w-full max-w-3xl">
                        {[
                            { icon: Cpu, label: "Performance", value: "99%" },
                            {
                                icon: Layers,
                                label: "Architecture",
                                value: "Scalable",
                            },
                            {
                                icon: Zap,
                                label: "Efficiency",
                                value: "Optimized",
                            },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-5 group"
                            >
                                <div className="p-4 bg-primary/5 rounded-2xl text-primary border border-primary/10 group-hover:bg-primary/10 transition-all duration-500">
                                    <stat.icon size={22} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted/50 mb-1">
                                        {stat.label}
                                    </p>
                                    <p className="text-lg font-black uppercase tracking-tight text-foreground">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div> */}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="lg:col-span-5 flex flex-col items-center justify-center relative"
                >
                    <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-full border-2 border-primary overflow-hidden shadow-lg bg-muted/20">
                            <Image
                                src={portfolioData.personalInfo.image}
                                alt={name}
                                fill
                                sizes="64px"
                                priority
                                className="object-cover object-top"
                            />
                        </div>

                        <div>
                            <p className="text-sm font-bold">
                                Syed Mohiuddin Meshal
                            </p>
                            <p className="text-xs text-muted">
                                Ready for new challenges
                            </p>
                        </div>
                    </div>
                    <TicTacToe />
                    <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full scale-90 -z-10 animate-pulse-soft" />
                </motion.div>
            </div>
        </section>
    );
};
