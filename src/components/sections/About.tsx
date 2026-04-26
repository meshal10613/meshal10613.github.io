"use client";

import { motion as m } from "framer-motion";
import Image from "next/image";
import { portfolioData } from "../../data/portfolio";
import { TrendingUp, Zap } from "lucide-react";
const motion = m as any;

export default function About() {
    const calculateExperience = () => {
        const startDate = new Date("2026-01-01");
        const today = new Date();
        const diffInMs = today.getTime() - startDate.getTime();
        const years = Math.max(0, diffInMs / (1000 * 60 * 60 * 24 * 365.25));
        return parseFloat(years.toFixed(1)).toString();
    };

    const yearsOfExperience = calculateExperience();

    return (
        <section
            id="about"
            className="py-24 relative overflow-hidden scroll-mt-24"
        >
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="relative flex justify-center"
                >
                    <div className="relative z-10 w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-card shadow-2xl group bg-muted/20">
                        <Image
                            src={portfolioData.personalInfo.image}
                            alt={portfolioData.personalInfo.name}
                            fill
                            className="object-cover object-[center_top] scale-100 group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="absolute -bottom-4 -right-4 p-8 bg-primary text-white rounded-3xl shadow-xl z-20"
                    >
                        <p className="text-4xl font-black">
                            {yearsOfExperience}
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                            Years Exp.
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold mb-6 border border-primary/10 tracking-widest uppercase">
                        01. WHO I AM
                    </div>
                    <h2 className="text-5xl font-extrabold mb-8 tracking-tighter leading-none">
                        I craft digital{" "}
                        <span className="text-gradient">masterpieces</span>.
                    </h2>
                    <p className="text-muted text-xl mb-10 leading-relaxed font-light">
                        {portfolioData.personalInfo.careerObjective}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 shrink-0 flex items-center justify-center text-primary">
                                <TrendingUp size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold">Architecture</h4>
                                <p className="text-sm text-muted">
                                    Clean, scalable codebases.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 shrink-0 flex items-center justify-center text-primary">
                                <Zap size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold">Performance</h4>
                                <p className="text-sm text-muted">
                                    Optimized for speed & UX.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
