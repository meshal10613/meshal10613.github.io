"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function Cursor6() {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    // 1. Position tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 2. Smooth physics for the outer ring
    const ringX = useSpring(mouseX, { damping: 20, stiffness: 150 });
    const ringY = useSpring(mouseY, { damping: 20, stiffness: 150 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Precision boolean conversion to avoid TS errors
            const isClickable = !!(
                target.tagName?.toLowerCase() === "button" ||
                target.tagName?.toLowerCase() === "a" ||
                target.closest("button") ||
                target.closest("a") ||
                window.getComputedStyle(target).cursor === "pointer"
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
            {/* The Outer Orbiting Ring */}
            <motion.div
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: isHovering ? 64 : 32,
                    height: isHovering ? 64 : 32,
                    rotate: isHovering ? 180 : 0,
                }}
                transition={{ type: "spring", damping: 15 }}
                className="fixed rounded-full border border-white mix-blend-difference flex items-center justify-center"
            >
                {/* The Orbiting Notch (Only visible on hover) */}
                <motion.div
                    animate={{
                        rotate: 360,
                        opacity: isHovering ? 1 : 0,
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute -inset-0.5 rounded-full border-t-2 border-white"
                />
            </motion.div>

            {/* The Central Precision Dot */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isClicking ? 0.5 : isHovering ? 1.5 : 1,
                }}
                className="fixed w-2 h-2 bg-white rounded-full mix-blend-difference"
            >
                {/* Subtle Inner Pulse when hovering */}
                {isHovering && (
                    <motion.div
                        animate={{
                            scale: [1, 2, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-white rounded-full"
                    />
                )}
            </motion.div>

            {/* Particle trail (Very subtle) */}
            {!isHovering && (
                <motion.div
                    style={{
                        x: ringX,
                        y: ringY,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                    className="fixed w-8 h-8 rounded-full bg-white/5 blur-sm"
                />
            )}
        </div>
    );
}
