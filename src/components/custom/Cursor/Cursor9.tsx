"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
    motion,
    useSpring,
    useMotionValue,
    useVelocity,
    useTransform,
} from "framer-motion";

export default function Cursor9() {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    // 1. Mouse Position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 2. Velocity Tracking
    const velX = useVelocity(mouseX);
    const velY = useVelocity(mouseY);

    // 3. Smooth Springs
    const springConfig = { damping: 25, stiffness: 200 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // 4. Calculate Rotation and Scale based on Velocity
    // We calculate the angle (in degrees) from the velocity X and Y
    const rotation = useTransform([velX, velY], ([latestVx, latestVy]) => {
        if (
            Math.abs(latestVx as number) < 10 &&
            Math.abs(latestVy as number) < 10
        )
            return 0;
        const angle =
            Math.atan2(latestVy as number, latestVx as number) *
            (180 / Math.PI);
        return angle;
    });

    // Calculate "Stretch" - longer when moving fast
    const stretch = useTransform([velX, velY], ([latestVx, latestVy]) => {
        const speed = Math.sqrt(
            Math.pow(latestVx as number, 2) + Math.pow(latestVy as number, 2),
        );
        return 1 + Math.min(speed / 2000, 0.8); // Cap the stretch at 1.8x
    });

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

    return (
        <div className="pointer-events-none fixed inset-0 z-9999 hidden lg:block">
            {/* 1. The Dynamic Vector (The "Pointer") */}
            <motion.div
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    rotate: isHovering ? 0 : rotation,
                    scaleX: isHovering ? 1 : stretch,
                }}
                animate={{
                    width: isHovering ? 50 : 24,
                    height: isHovering ? 50 : 24,
                    borderRadius: isHovering ? "50%" : "4px",
                    borderWidth: isHovering ? "1px" : "2px",
                }}
                className="fixed border-solid border-primary flex items-center justify-center mix-blend-difference"
            >
                {/* The Arrow Head / Icon inside */}
                {!isHovering && (
                    <motion.div className="w-1 h-1 bg-primary rounded-full absolute right-1" />
                )}

                {/* Target Reticle (Only on hover) */}
                {isHovering && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        <div className="absolute w-px h-3 bg-primary top-0" />
                        <div className="absolute w-px h-3 bg-primary bottom-0" />
                        <div className="absolute h-px w-3 bg-primary left-0" />
                        <div className="absolute h-px w-3 bg-primary right-0" />
                    </motion.div>
                )}
            </motion.div>

            {/* 2. The Precision Core (The "Dot") */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isClicking ? 0.5 : isHovering ? 1.2 : 1,
                    backgroundColor: isHovering ? "#fff" : "var(--primary)",
                }}
                className="fixed w-2 h-2 rounded-full mix-blend-difference z-10"
            />

            {/* 3. The "Sonic Wave" (Visual pulse on click) */}
            {isClicking && (
                <motion.div
                    initial={{
                        x: mouseX.get(),
                        y: mouseY.get(),
                        translateX: "-50%",
                        translateY: "-50%",
                        scale: 0,
                        opacity: 1,
                    }}
                    animate={{ scale: 4, opacity: 0 }}
                    className="fixed w-10 h-10 border border-primary rounded-full pointer-events-none"
                />
            )}
        </div>
    );
};
