"use client";

import React, { useEffect, useState } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
const motion = m as any;
import { portfolioData } from "../../data/portfolio";
import { cn } from "../../lib/utils";
import { useTheme } from "../providers/ThemeProvider";
import {
    // Sparkles,
    // Terminal,
    // Activity,
    Zap,
    Cpu,
    // CircleDot,
    // ShieldCheck,
    // Database,
    // Layers,
    // Code2,
} from "lucide-react";
import Image from "next/image";

export default function Skills() {
    const categories = Object.values(portfolioData.skills);
    const [activeTab, setActiveTab] = useState(0);
    const { theme } = useTheme();

    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const getLogoUrl = (slug: string) => {
        // if (typeof window === "undefined") return "";
        // const isDark =
        //     theme === "dark" ||
        //     (theme === "system" &&
        //         window.matchMedia("(prefers-color-scheme: dark)").matches);

        let isDark = false;

        if (mounted) {
            if (theme === "dark") {
                isDark = true;
            } else if (theme === "system") {
                isDark = window.matchMedia(
                    "(prefers-color-scheme: dark)",
                ).matches;
            }
        }

        const logoMap: Record<string, string> = {
            shadcnui: "shadcnui",
            daisyui: "daisyui",
            chakraui: "chakraui",
            nodedotjs: "nodedotjs",
            nextdotjs: "nextdotjs",
            express: "express",
            postgresql: "postgresql",
            greensock: "greensock",
            framer: "framer",
            insomnia: "insomnia",
            css3: "css",
            sslcommerz: "smashingmagazine",
            bank: "wallet",
        };

        const logoSlug = logoMap[slug] || slug;

        return `https://cdn.simpleicons.org/${logoSlug}/${isDark ? "ffffff" : "000000"}`;
    };

    return (
        <section
            id="skills"
            className="py-24 md:py-32 bg-background relative overflow-hidden scroll-mt-20"
        >
            {/* Immersive Neural Background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-160 h-160 bg-primary/5 blur-[120px] rounded-full animate-pulse-soft" />
                <div className="absolute bottom-[20%] right-[-10%] w-140 h-140 bg-secondary/5 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-primary/20 backdrop-blur-md"
                    >
                        <Cpu size={14} className="animate-spin-slow" />
                        Neural Inventory
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black mb-4 tracking-tighter"
                    >
                        Technical <span className="text-gradient">Arsenal</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-muted text-lg font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        A high-performance stack engineered for building
                        scalable, accessible, and futuristic web experiences.
                    </motion.p>
                </div>

                {/* Futuristic Category Switcher */}
                <div className="w-full flex justify-center mb-16">
                    <div className="inline-flex items-center p-1.5 bg-card/40 backdrop-blur-2xl border border-border/50 rounded-2xl md:rounded-full shadow-2xl overflow-x-auto no-scrollbar max-w-full">
                        {categories.map((category, idx) => (
                            <button
                                key={category.title}
                                onClick={() => setActiveTab(idx)}
                                className={cn(
                                    "relative px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap z-10 rounded-full cursor-pointer",
                                    activeTab === idx
                                        ? "text-primary"
                                        : "text-muted hover:text-foreground",
                                )}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {category.title}
                                </span>
                                {activeTab === idx && (
                                    <motion.div
                                        layoutId="active-arsenal-glow"
                                        className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]"
                                        transition={{
                                            type: "spring",
                                            bounce: 0.2,
                                            duration: 0.6,
                                        }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {categories[activeTab]?.skills.map((skill, idx) => (
                                <SkillCard
                                    key={skill.name}
                                    skill={skill}
                                    index={idx}
                                    getLogoUrl={getLogoUrl}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

interface SkillCardProps {
    skill: any;
    index: number;
    getLogoUrl: (slug: string) => string;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index, getLogoUrl }) => {
    const logoSrc = getLogoUrl(skill.icon);
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            // whileHover={{ y: -12, scale: 1.03 }}
            className="group relative p-8 bg-card/30 backdrop-blur-3xl border border-border/40 rounded-[2.5rem] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10"
        >
            {/* Holographic Scanline Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(var(--primary-rgb),0.1)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Background Watermark Icon */}
            <div className="absolute -bottom-6 -right-6 opacity-[0.02] group-hover:opacity-[0.06] transition-all duration-1000 -rotate-12 group-hover:rotate-6 scale-150 group-hover:scale-110 pointer-events-none">
                {/* <img
                    src={getLogoUrl(skill.icon)}
                    alt=""
                    className="w-40 h-40 object-contain grayscale"
                    loading="lazy"
                /> */}
                <div className="relative w-40 h-40">
                    <Image
                        src={logoSrc}
                        alt=""
                        fill
                        unoptimized
                        sizes="160px"
                        className="object-contain grayscale"
                    />
                </div>
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-12">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 dark:bg-black/20 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-primary/5 group-hover:border-primary/40 shadow-inner">
                            {/* <img
                                src={getLogoUrl(skill.icon)}
                                alt={skill.name}
                                className={cn(
                                    "w-9 h-9 object-contain transition-all duration-700",
                                )}
                                loading="lazy"
                            /> */}
                            <Image
                                src={logoSrc}
                                alt={skill.name}
                                width={36}
                                height={36}
                                unoptimized
                                className="object-contain transition-all duration-700"
                            />
                        </div>
                        {skill.isLearning && (
                            <div className="absolute -top-2 -right-2 flex h-5 w-5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                                <span className="relative rounded-full h-5 w-5 bg-secondary shadow-[0_0_12px_rgba(var(--secondary-rgb),0.6)] border-2 border-background flex items-center justify-center">
                                    <Zap
                                        size={8}
                                        className="text-white fill-white"
                                    />
                                </span>
                            </div>
                        )}
                    </div>

                    {skill.level && (
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black font-mono text-muted/30 group-hover:text-primary transition-colors tracking-[0.2em] mb-1">
                                {skill.isLearning ? "Learning" : "PRO"}
                            </span>
                            <span className="text-2xl font-black font-mono leading-none group-hover:text-primary transition-all scale-95 group-hover:scale-100">
                                {skill.level}
                                <span className="text-xs opacity-40 ml-0.5">
                                    %
                                </span>
                            </span>
                        </div>
                    )}
                </div>

                {/* Content Body */}
                <div className="mb-10">
                    <h4 className="text-xl font-black uppercase tracking-widest text-foreground group-hover:text-primary transition-colors mb-3 leading-tight">
                        {skill.name}
                    </h4>
                    <div className="flex items-center gap-2.5">
                        {/* <CircleDot
                            size={12}
                            className={cn(
                                "transition-colors duration-500",
                                skill.isLearning
                                    ? "text-secondary"
                                    : "text-primary",
                            )}
                        /> */}
                        {/* <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted/50 font-mono">
                            {skill.isLearning
                                ? "Integration"
                                : "Stable Release"}
                        </span> */}
                    </div>
                </div>

                {/* Segmented Power Meter Visualization */}
                {/* <div className="mt-auto">
                    {skill.level ? (
                        <div className="space-y-5">
                            <div className="flex gap-1.5 h-2.5 w-full">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scaleY: 0 }}
                                        whileInView={{ opacity: 1, scaleY: 1 }}
                                        transition={{
                                            delay: 0.1 + i * 0.05,
                                            type: "spring",
                                            stiffness: 200,
                                        }}
                                        className={cn(
                                            "h-full grow rounded-sm transition-all duration-700",
                                            (i + 1) * 10 <= (skill.level || 0)
                                                ? skill.isLearning
                                                    ? "bg-secondary shadow-[0_0_12px_rgba(var(--secondary-rgb),0.5)]"
                                                    : "bg-primary shadow-[0_0_12px_rgba(var(--primary-rgb),0.5)]"
                                                : "bg-muted/10",
                                        )}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">
                                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-primary/40">
                                    Resource Efficiency
                                </p>
                                <div className="flex items-center gap-1.5 text-primary/30">
                                    <Activity
                                        size={14}
                                        className="animate-pulse"
                                    />
                                    <span className="text-[8px] font-mono">
                                        LIVE
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="pt-4 flex items-center gap-4 opacity-20">
                            <Terminal size={18} />
                            <div className="h-px grow bg-linear-to-r from-border to-transparent" />
                            <ShieldCheck size={18} />
                        </div>
                    )}
                </div> */}
            </div>
        </motion.div>
    );
};
