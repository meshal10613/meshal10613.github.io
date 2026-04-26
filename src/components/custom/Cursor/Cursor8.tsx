"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

export default function Cursor8() {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    // 1. Position tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 2. Smooth physics for the ring (Trailing effect)
    const springConfig = { damping: 25, stiffness: 200 };
    const ringX = useSpring(mouseX, springConfig);
    const ringY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Convert to boolean to avoid TS errors
            const isClickable = !!(
                target.tagName?.toLowerCase() === "button" ||
                target.tagName?.toLowerCase() === "a" ||
                target.closest("button") ||
                target.closest("a")
            );
            setIsHovering(isClickable);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="pointer-events-none fixed inset-0 z-9999 hidden lg:block">
            {/* 1. THE SPINNING ARCS (Continuous Rotation) */}
            <motion.div
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                // The container itself spins infinitely
                animate={{
                    rotate: 360,
                    width: isHovering ? 60 : 40,
                    height: isHovering ? 60 : 40,
                }}
                transition={{
                    rotate: {
                        duration: isHovering ? 1.5 : 8, // Speed up significantly on hover
                        repeat: Infinity,
                        ease: "linear",
                    },
                    // Spring for size change
                    width: { type: "spring", damping: 15 },
                    height: { type: "spring", damping: 15 },
                }}
                className="fixed flex items-center justify-center"
            >
                <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full overflow-visible"
                >
                    {/* Top Arc */}
                    <motion.path
                        d="M 50 10 A 40 40 0 0 1 90 50"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="text-primary"
                        animate={{
                            pathLength: isHovering ? 0.9 : 0.4,
                            opacity: isHovering ? 1 : 0.4,
                        }}
                    />
                    {/* Bottom Arc */}
                    <motion.path
                        d="M 50 90 A 40 40 0 0 1 10 50"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="text-primary"
                        animate={{
                            pathLength: isHovering ? 0.9 : 0.4,
                            opacity: isHovering ? 1 : 0.4,
                        }}
                    />
                </svg>
            </motion.div>

            {/* 2. THE PRECISION CENTER */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isClicking ? 0.6 : 1,
                }}
                className="fixed flex items-center justify-center"
            >
                {/* The Center Point */}
                <motion.div
                    className="w-1.5 h-1.5 bg-white rounded-full mix-blend-difference"
                    animate={{
                        scale: isHovering ? 3 : 1,
                        opacity: isHovering ? 0.2 : 1,
                    }}
                />

                {/* Corner Brackets that only appear on hover */}
                {isHovering && (
                    <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute w-8 h-8"
                    >
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white mix-blend-difference" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white mix-blend-difference" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white mix-blend-difference" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white mix-blend-difference" />
                    </motion.div>
                )}
            </motion.div>

            {/* 3. SUBTLE GLOW RADAR (Continuous Pulse) */}
            <motion.div
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="fixed w-12 h-12 bg-primary rounded-full blur-xl -z-10"
            />
        </div>
    );
}
