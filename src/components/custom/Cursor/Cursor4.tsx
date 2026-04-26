"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function Cursor4() {
    const [isHovering, setIsHovering] = useState(false);

    // Use MotionValues for high performance
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // We create 3 different spring sets to create a "trail" effect
    // Physics: Stiffness decreases for each circle to create the "drag"
    const springA = { damping: 20, stiffness: 250 };
    const springB = { damping: 25, stiffness: 150 };
    const springC = { damping: 30, stiffness: 100 };

    const trail = [
        { x: useSpring(mouseX, springA), y: useSpring(mouseY, springA) },
        { x: useSpring(mouseX, springB), y: useSpring(mouseY, springB) },
        { x: useSpring(mouseX, springC), y: useSpring(mouseY, springC) },
    ];

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

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
        window.addEventListener("mouseover", handleMouseOver);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            {/* 1. The SVG Filter - This is the "magic" that makes it look like liquid */}
            <svg className="fixed pointer-events-none">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="6"
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                            result="goo"
                        />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>

            {/* 2. The Cursor Container */}
            <div
                className="pointer-events-none fixed inset-0 z-9999 hidden lg:block"
                style={{ filter: "url(#goo)" }} // Applying the filter here
            >
                {/* Main leading blob */}
                <motion.div
                    style={{
                        x: mouseX,
                        y: mouseY,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                    animate={{
                        width: isHovering ? 60 : 32,
                        height: isHovering ? 60 : 32,
                    }}
                    className="fixed rounded-full bg-primary"
                />

                {/* The trailing blobs */}
                {trail.map((point, i) => (
                    <motion.div
                        key={i}
                        style={{
                            x: point.x,
                            y: point.y,
                            translateX: "-50%",
                            translateY: "-50%",
                        }}
                        animate={{
                            width: isHovering ? 40 : 24,
                            height: isHovering ? 40 : 24,
                        }}
                        className="fixed rounded-full bg-primary"
                    />
                ))}
            </div>

            {/* 3. The Precision Inverter Dot (Optional - sits on top of the liquid) */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                className="fixed w-1 h-1 bg-white rounded-full z-10000 mix-blend-difference pointer-events-none hidden lg:block"
            />
        </>
    );
}
