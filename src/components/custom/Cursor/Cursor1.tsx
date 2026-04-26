"use client";

import React, { useEffect, useState } from "react";
import { motion as m, useSpring } from "framer-motion";
const motion = m as any;

export default function Cursor1() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const springConfig = { damping: 20, stiffness: 200 };
    const cursorX = useSpring(0, springConfig);
    const cursorY = useSpring(0, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === "button" ||
                target.tagName.toLowerCase() === "a" ||
                target.closest("button") ||
                target.closest("a")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="pointer-events-none fixed inset-0 z-999 hidden lg:block">
            <motion.div
                className="w-8 h-8 rounded-full border-2 border-primary fixed"
                style={{ x: cursorX, y: cursorY, scale: isHovering ? 2 : 1 }}
                animate={{
                    backgroundColor: isHovering
                        ? "rgba(var(--primary-rgb), 0.1)"
                        : "transparent",
                    borderColor: "var(--primary)",
                }}
            />
            <motion.div
                className="w-1.5 h-1.5 rounded-full bg-primary fixed"
                style={{
                    left: mousePosition.x - 3,
                    top: mousePosition.y - 3,
                }}
            />
        </div>
    );
}
