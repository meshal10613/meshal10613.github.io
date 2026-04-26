"use client";

import React from "react";
import { motion as m } from "framer-motion";
const motion = m as any;
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { portfolioData } from "../../data/portfolio";

export default function GitHubActivity() {
    const githubUser = "meshal10613";
    // const streakStatsUrl = `https://nirzak-streak-stats.vercel.app/?user=${githubUser}&theme=dark&hide_border=false`;
    const streakStatsUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${githubUser}&theme=tokyonight&hide_border=true&background=0D1117`;
    const snakeUrl =
        "https://raw.githubusercontent.com/meshal10613/meshal10613/output/snake.svg";

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-8 md:p-12 bg-card/50 border border-border rounded-[3rem] shadow-2xl relative group"
                >
                    <div className="relative z-10 w-full flex flex-col gap-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <Link
                                        href={
                                            portfolioData.personalInfo
                                                .socialLinks.github
                                        }
                                        className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"
                                    >
                                        <Github size={28} />
                                    </Link>
                                    <h3 className="text-3xl font-black tracking-tight">
                                        Coding Activity
                                    </h3>
                                </div>
                                <p className=" text-sm max-w-lg font-light">
                                    Consistent contributions and professional
                                    coding streaks updated in real-time from
                                    GitHub.
                                </p>
                            </div>

                            <div className="flex items-center justify-center bg-background/50 rounded-3xl p-3 border border-border/40 shadow-inner">
                                <Image
                                    src={streakStatsUrl}
                                    alt="GitHub Streak Stats"
                                    width={500}
                                    height={160}
                                    className="h-30 md:h-40 w-auto rounded-2xl"
                                    unoptimized
                                />
                            </div>
                        </div>

                        <div className="w-full bg-black rounded-4xl p-4 md:p-8 border border-border/50 overflow-hidden">
                            <div className="w-full overflow-x-auto scrollbar-hide">
                                <div className="min-w-200 lg:min-w-full flex justify-center py-4">
                                    <Image
                                        src={snakeUrl}
                                        alt="github contribution grid snake animation"
                                        width={1200}
                                        height={200}
                                        className="w-full h-auto max-w-full pointer-events-none block rounded-xl"
                                        unoptimized
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
