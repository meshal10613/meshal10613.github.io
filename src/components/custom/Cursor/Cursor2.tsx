"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function Cursor2() {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    // High-performance motion values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the outer ring
    const ringX = useSpring(mouseX, { damping: 30, stiffness: 200 });
    const ringY = useSpring(mouseY, { damping: 30, stiffness: 200 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // The !! converts the result of the expression into a strict boolean
            const isClickable = !!(
                target.tagName.toLowerCase() === "button" ||
                target.tagName.toLowerCase() === "a" ||
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
            {/* Main Outer Ring */}
            <motion.div
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: isHovering ? 80 : 40,
                    height: isHovering ? 80 : 40,
                    borderWidth: isHovering ? "1px" : "2px",
                    borderColor: isHovering
                        ? "rgba(255,255,255,0.4)"
                        : "var(--primary)",
                }}
                className="fixed rounded-full border-solid mix-blend-difference flex items-center justify-center"
            >
                {/* Optional: Rotating dash effect when hovering */}
                {isHovering && (
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute inset-0 rounded-full border-t border-white opacity-40"
                    />
                )}
            </motion.div>

            {/* Central Dot */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isClicking ? 0.5 : isHovering ? 4 : 1,
                    backgroundColor: isHovering ? "#fff" : "var(--primary)",
                }}
                className="fixed w-2 h-2 rounded-full mix-blend-difference"
            />

            {/* Trailing Glow (Soft Light) */}
            <motion.div
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                className="fixed w-32 h-32 bg-primary/10 blur-[50px] rounded-full -z-10"
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    opacity: isHovering ? 0.8 : 0.4,
                }}
            />
        </div>
    );
}
