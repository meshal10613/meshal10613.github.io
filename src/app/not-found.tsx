"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft, Ghost, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px]" />

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, currentColor 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />
            </div>

            <div className="text-center max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="relative inline-block mb-12"
                >
                    <div className="text-[12rem] font-black leading-none tracking-tighter text-muted/10 select-none">
                        404
                    </div>
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary drop-shadow-2xl"
                    >
                        <Ghost size={120} strokeWidth={1.5} />
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                        Lost in the Digital Void?
                    </h1>
                    <p className="text-muted text-lg font-light mb-10 max-w-md mx-auto leading-relaxed">
                        The page you&apos;re looking for has vanished into the
                        ether. It might have been moved, deleted, or never
                        existed in this dimension.
                    </p>

                    <div className="flex flex-row items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all group"
                        >
                            <Home size={20} />
                            Back to Home
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-card border border-border text-foreground font-black px-8 py-4 rounded-2xl hover:bg-muted/5 transition-all group"
                        >
                            <ArrowLeft
                                size={20}
                                className="group-hover:-translate-x-1 transition-transform"
                            />
                            Go Back
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 pt-10 border-t border-border/50"
                >
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted mb-6">
                        Quick Search
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {["Projects", "Skills", "About", "Contact"].map(
                            (tag) => (
                                <Link
                                    key={tag}
                                    href={`/#${tag.toLowerCase()}`}
                                    className="px-4 py-2 bg-muted/5 border border-border/50 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted hover:text-primary hover:border-primary/30 transition-all"
                                >
                                    {tag}
                                </Link>
                            ),
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
