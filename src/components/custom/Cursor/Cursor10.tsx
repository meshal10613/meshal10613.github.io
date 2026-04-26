"use client";

import React, { useEffect, useState } from "react";
import {
    motion,
    useSpring,
    useMotionValue,
    AnimatePresence,
} from "framer-motion";

export default function Cursor10() {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    // 1. High-precision mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 2. Spring physics for the four corners
    const springConfig = { damping: 25, stiffness: 300 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
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
    }, [mouseX, mouseY]);

    // Corner style helper
    const cornerClass =
        "absolute w-2 h-2 border-primary border-solid mix-blend-difference";

    return (
        <div className="pointer-events-none fixed inset-0 z-9999 hidden lg:block">
            {/* 1. The Dynamic Prism Frame */}
            <motion.div
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: isHovering ? 50 : 32,
                    height: isHovering ? 50 : 32,
                    rotate: isHovering ? 90 : 0,
                }}
                className="relative flex items-center justify-center transition-colors duration-300"
            >
                {/* Backdrop Blur effect only on hover */}
                <AnimatePresence>
                    {isHovering && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute inset-0 bg-primary/10 backdrop-blur-[2px] rounded-sm"
                        />
                    )}
                </AnimatePresence>

                {/* Top-Left Corner */}
                <motion.div
                    animate={{ x: isHovering ? 0 : -4, y: isHovering ? 0 : -4 }}
                    className={`${cornerClass} top-0 left-0 border-t-2 border-l-2`}
                />
                {/* Top-Right Corner */}
                <motion.div
                    animate={{ x: isHovering ? 0 : 4, y: isHovering ? 0 : -4 }}
                    className={`${cornerClass} top-0 right-0 border-t-2 border-r-2`}
                />
                {/* Bottom-Left Corner */}
                <motion.div
                    animate={{ x: isHovering ? 0 : -4, y: isHovering ? 0 : 4 }}
                    className={`${cornerClass} bottom-0 left-0 border-b-2 border-l-2`}
                />
                {/* Bottom-Right Corner */}
                <motion.div
                    animate={{ x: isHovering ? 0 : 4, y: isHovering ? 0 : 4 }}
                    className={`${cornerClass} bottom-0 right-0 border-b-2 border-r-2`}
                />
            </motion.div>

            {/* 2. Precision Center Cross */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                className="fixed flex items-center justify-center mix-blend-difference"
            >
                {/* Vertical precision line */}
                <motion.div
                    animate={{
                        height: isClicking ? 20 : isHovering ? 0 : 10,
                        opacity: isHovering ? 0 : 1,
                    }}
                    className="w-px bg-white absolute"
                />
                {/* Horizontal precision line */}
                <motion.div
                    animate={{
                        width: isClicking ? 20 : isHovering ? 0 : 10,
                        opacity: isHovering ? 0 : 1,
                    }}
                    className="h-px bg-white absolute"
                />

                {/* Tiny Dot (Always present) */}
                <motion.div
                    animate={{
                        scale: isClicking ? 2 : 1,
                        backgroundColor: isHovering ? "var(--primary)" : "#fff",
                    }}
                    className="w-1 h-1 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                />
            </motion.div>

            {/* 3. Floating Light Particles (Ambient movement) */}
            {!isHovering && (
                <motion.div
                    style={{
                        x: smoothX,
                        y: smoothY,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute w-16 h-16"
                >
                    <div className="absolute top-0 left-1/2 w-1 h-1 bg-primary/40 rounded-full blur-[1px]" />
                    <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary/40 rounded-full blur-[1px]" />
                </motion.div>
            )}
        </div>
    );
};
