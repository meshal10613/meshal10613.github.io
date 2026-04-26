"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

export default function Cursor7() {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    // 1. Instant Mouse Position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 2. Heavy Spring for the "Elastic" feeling
    const lensX = useSpring(mouseX, { damping: 15, stiffness: 100 });
    const lensY = useSpring(mouseY, { damping: 15, stiffness: 100 });

    // 3. Calculate velocity for the "stretch" effect
    // This makes the cursor look like it's stretching as you move fast
    const velocityX = useMotionValue(0);
    const velocityY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Calculate delta for stretching effect
            velocityX.set(e.clientX - mouseX.get());
            velocityY.set(e.clientY - mouseY.get());

            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

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
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY, velocityX, velocityY]);

    // Use motion transform to create a "squeeze" effect based on speed
    const scaleX = useTransform(velocityX, [-100, 0, 100], [1.5, 1, 1.5]);
    const scaleY = useTransform(velocityY, [-100, 0, 100], [0.8, 1, 0.8]);

    return (
        <div className="pointer-events-none fixed inset-0 z-9999 hidden lg:block">
            {/* The Floating Lens (Outer) */}
            <motion.div
                style={{
                    x: lensX,
                    y: lensY,
                    translateX: "-50%",
                    translateY: "-50%",
                    scaleX: isHovering ? 1 : scaleX,
                    scaleY: isHovering ? 1 : scaleY,
                }}
                animate={{
                    width: isHovering ? 60 : 40,
                    height: isHovering ? 60 : 40,
                    backgroundColor: isHovering
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(255, 255, 255, 0)",
                    backdropFilter: isHovering ? "blur(4px)" : "blur(0px)",
                    borderRadius: isHovering ? "12px" : "50%", // Becomes a rounded square on hover
                }}
                className="fixed border border-white/30 flex items-center justify-center mix-blend-difference"
            >
                {/* The "Action" indicator (Tiny arrows that appear on hover) */}
                {isHovering && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-1"
                    >
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce" />
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.2s]" />
                        <div className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:-0.4s]" />
                    </motion.div>
                )}
            </motion.div>

            {/* The Precision Dot (Inner) */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isClicking ? 0.5 : isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 1,
                }}
                className="fixed w-1.5 h-1.5 bg-white rounded-full mix-blend-difference shadow-[0_0_10px_white]"
            />

            {/* Background Soft Glow (Follows the lens) */}
            <motion.div
                style={{
                    x: lensX,
                    y: lensY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    opacity: isHovering ? 0.4 : 0,
                    scale: isHovering ? 2 : 0,
                }}
                className="fixed w-20 h-20 bg-primary/20 rounded-full blur-2xl -z-10"
            />
        </div>
    );
};
