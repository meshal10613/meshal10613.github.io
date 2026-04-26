"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function Cursor5 () {
    const [isHovering, setIsHovering] = useState(false);

    // 1. Core Mouse Position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 2. Different spring "weights" for the ghost effect
    // Higher damping/lower stiffness = more "lazy" movement
    const springConfig1 = { damping: 20, stiffness: 200 };
    const springConfig2 = { damping: 30, stiffness: 120 };
    const springConfig3 = { damping: 40, stiffness: 80 };

    const x1 = useSpring(mouseX, springConfig1);
    const y1 = useSpring(mouseY, springConfig1);

    const x2 = useSpring(mouseX, springConfig2);
    const y2 = useSpring(mouseY, springConfig2);

    const x3 = useSpring(mouseX, springConfig3);
    const y3 = useSpring(mouseY, springConfig3);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            setIsHovering(
                !!(
                    target.tagName?.toLowerCase() === "button" ||
                    target.tagName?.toLowerCase() === "a" ||
                    target.closest("button") ||
                    target.closest("a")
                ),
            );
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="pointer-events-none fixed inset-0 z-9999 hidden lg:block">
            {/* Ghost Ring 3 (The Laziest) */}
            <motion.div
                style={{ x: x3, y: y3, translateX: "-50%", translateY: "-50%" }}
                className="fixed w-8 h-8 rounded-full border border-primary/20"
                animate={{
                    scale: isHovering ? 2 : 1,
                    opacity: isHovering ? 0 : 1,
                }}
            />

            {/* Ghost Ring 2 */}
            <motion.div
                style={{ x: x2, y: y2, translateX: "-50%", translateY: "-50%" }}
                className="fixed w-8 h-8 rounded-full border border-primary/40"
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    opacity: isHovering ? 0 : 1,
                }}
            />

            {/* Ghost Ring 1 (The Tightest) */}
            <motion.div
                style={{ x: x1, y: y1, translateX: "-50%", translateY: "-50%" }}
                className="fixed w-8 h-8 rounded-full border border-primary/60"
                animate={{ scale: isHovering ? 1.2 : 1 }}
            />

            {/* Main Interactive Center */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                className="fixed flex items-center justify-center"
            >
                {/* The Dot */}
                <motion.div
                    className="w-1 h-1 bg-primary rounded-full"
                    animate={{
                        scale: isHovering ? 40 : 1,
                        opacity: isHovering ? 0.15 : 1,
                    }}
                />

                {/* The Crosshair Lines */}
                <motion.div
                    className="absolute w-4 h-px bg-primary"
                    animate={{ width: isHovering ? 0 : 16 }}
                />
                <motion.div
                    className="absolute h-4 w-px bg-primary"
                    animate={{ height: isHovering ? 0 : 16 }}
                />

                {/* The "Hover Text" - Optional flair */}
                <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: isHovering ? 1 : 0,
                        scale: isHovering ? 1 : 0,
                        y: isHovering ? -40 : 0,
                    }}
                    className="absolute text-[10px] font-bold uppercase tracking-widest text-primary whitespace-nowrap"
                >
                    View Project
                </motion.span>
            </motion.div>
        </div>
    );
};
