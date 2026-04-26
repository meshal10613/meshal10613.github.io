"use client";

import React, { useEffect, useState } from "react";
import {
    motion,
    useSpring,
    useMotionValue,
    useVelocity,
    useTransform,
} from "framer-motion";

export default function Cursor11() {
    const [isHovering, setIsHovering] = useState(false);

    // 1. Mouse Position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 2. Velocity Tracking (to make it react to movement speed)
    const xVelocity = useVelocity(mouseX);
    const yVelocity = useVelocity(mouseY);

    // 3. Create a "Trail" of springs
    // Each point follows the one before it with slightly more "laziness" (damping)
    const createSpring = (stiffness: number, damping: number) => ({
        x: useSpring(mouseX, { stiffness, damping }),
        y: useSpring(mouseY, { stiffness, damping }),
    });

    const trail = [
        createSpring(300, 30), // Lead
        createSpring(250, 40),
        createSpring(200, 50),
        createSpring(150, 60), // Tail
    ];

    // 4. Transform Velocity into Opacity
    // The cursor is 20% visible when still, and 100% visible when moving fast
    const auraOpacity = useTransform(
        [xVelocity, yVelocity],
        ([latestX, latestY]) => {
            const speed = Math.sqrt(
                Math.pow(latestX as number, 2) + Math.pow(latestY as number, 2),
            );
            return Math.min(Math.max(speed / 500, 0.2), 1);
        },
    );

    // 5. Transform Velocity into Scale (it stretches when fast)
    const auraScale = useTransform(
        [xVelocity, yVelocity],
        ([latestX, latestY]) => {
            const speed = Math.sqrt(
                Math.pow(latestX as number, 2) + Math.pow(latestY as number, 2),
            );
            return 1 + Math.min(speed / 2000, 0.5);
        },
    );

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
            {/* 1. The Main Aura Glow */}
            <motion.div
                style={{
                    x: trail[0].x,
                    y: trail[0].y,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: auraOpacity,
                    scale: auraScale,
                }}
                animate={{
                    width: isHovering ? 120 : 60,
                    height: isHovering ? 120 : 60,
                    backgroundColor: isHovering
                        ? "rgba(var(--primary-rgb), 0.15)"
                        : "rgba(var(--primary-rgb), 0.1)",
                }}
                className="fixed rounded-full blur-2xl"
            />

            {/* 2. The Ethereal Trail */}
            {trail.map((point, i) => (
                <motion.div
                    key={i}
                    style={{
                        x: point.x,
                        y: point.y,
                        translateX: "-50%",
                        translateY: "-50%",
                        opacity: useTransform(
                            auraOpacity,
                            (v) => v * (1 - i * 0.2),
                        ), // Fades out along the tail
                    }}
                    animate={{
                        width: isHovering ? 40 : 20 - i * 2,
                        height: isHovering ? 40 : 20 - i * 2,
                    }}
                    className="fixed bg-primary/20 rounded-full blur-md"
                />
            ))}

            {/* 3. The Minimalist Core (The "Thread") */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 0.5 : 1,
                    opacity: isHovering ? 0.5 : 1,
                }}
                className="fixed w-1.5 h-1.5 bg-white rounded-full mix-blend-difference shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            />

            {/* 4. The Hover Expansion Ring */}
            <motion.div
                style={{
                    x: trail[1].x,
                    y: trail[1].y,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 1 : 0,
                    opacity: isHovering ? 1 : 0,
                }}
                className="fixed w-16 h-16 border border-primary/30 rounded-full"
            />
        </div>
    );
};
