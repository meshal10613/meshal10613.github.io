"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, Variants } from "framer-motion";

export default function Cursor3() {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    // Smooth mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 250 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
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

    // Animation Variants for the Brackets
    const bracketVariants: Variants = {
        default: { scale: 1, rotate: 0, opacity: 0.6 },
        hover: { scale: 1.5, rotate: 90, opacity: 1 },
    };

    return (
        <div className="pointer-events-none fixed inset-0 z-9999 hidden lg:block">
            {/* Outer Brackets Container */}
            <motion.div
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={isHovering ? "hover" : "default"}
                variants={bracketVariants}
                className="relative w-10 h-10"
            >
                {/* Top Left Bracket */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary" />
                {/* Top Right Bracket */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary" />
                {/* Bottom Left Bracket */}
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary" />
                {/* Bottom Right Bracket */}
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary" />
            </motion.div>

            {/* Central Precision Point */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isClicking ? 0.8 : 1,
                    backgroundColor: isHovering ? "var(--primary)" : "#fff",
                    width: isHovering ? 4 : 6,
                    height: isHovering ? 4 : 6,
                }}
                className="fixed rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
            />

            {/* Trailing Scan Line (Visual Flair) */}
            {isHovering && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 0.5, 0], scale: 2 }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    style={{
                        x: cursorX,
                        y: cursorY,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                    className="fixed w-10 h-10 border border-primary rounded-full"
                />
            )}
        </div>
    );
}
