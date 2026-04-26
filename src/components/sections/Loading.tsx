// "use client";

// import { motion, useAnimationFrame } from "framer-motion";
// import { useRef, useState } from "react";

// const PARTICLE_COUNT = 12;

// function OrbParticle({ index, total }: { index: number; total: number }) {
//     const angle = (index / total) * Math.PI * 2;
//     const radius = 44;
//     const x = Math.cos(angle) * radius;
//     const y = Math.sin(angle) * radius;
//     const delay = (index / total) * 1.6;
//     const size = 3 + (index % 3) * 1.5;

//     return (
//         <motion.div
//             className="absolute rounded-full"
//             style={{
//                 width: size,
//                 height: size,
//                 left: "50%",
//                 top: "50%",
//                 marginLeft: -size / 2,
//                 marginTop: -size / 2,
//                 background: `hsl(${200 + index * 12}, 90%, 72%)`,
//                 boxShadow: `0 0 ${size * 3}px hsl(${200 + index * 12}, 90%, 72%)`,
//             }}
//             animate={{
//                 x: [0, x * 0.5, x, x * 0.5, 0],
//                 y: [0, y * 0.5, y, y * 0.5, 0],
//                 opacity: [0, 0.6, 1, 0.6, 0],
//                 scale: [0.4, 0.8, 1, 0.8, 0.4],
//             }}
//             transition={{
//                 duration: 2.4,
//                 repeat: Infinity,
//                 delay,
//                 ease: "easeInOut",
//             }}
//         />
//     );
// }

// function RotatingRing({
//     radius,
//     duration,
//     reverse,
//     color,
//     dashArray,
// }: {
//     radius: number;
//     duration: number;
//     reverse?: boolean;
//     color: string;
//     dashArray: string;
// }) {
//     const circumference = 2 * Math.PI * radius;
//     return (
//         <motion.circle
//             cx="50%"
//             cy="50%"
//             r={radius}
//             fill="none"
//             stroke={color}
//             strokeWidth="1.5"
//             strokeDasharray={dashArray}
//             strokeLinecap="round"
//             animate={{ rotate: reverse ? -360 : 360 }}
//             transition={{ duration, repeat: Infinity, ease: "linear" }}
//             style={{ originX: "50%", originY: "50%" }}
//         />
//     );
// }

// function CorePulse() {
//     return (
//         <>
//             {/* Outermost glow */}
//             <motion.div
//                 className="absolute inset-0 rounded-full"
//                 style={{
//                     background:
//                         "radial-gradient(circle, rgba(99,179,237,0.15) 0%, transparent 70%)",
//                 }}
//                 animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
//                 transition={{
//                     duration: 2,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                 }}
//             />
//             {/* Mid pulse */}
//             <motion.div
//                 className="absolute rounded-full"
//                 style={{
//                     inset: "28%",
//                     background:
//                         "radial-gradient(circle, rgba(147,210,255,0.3) 0%, rgba(56,189,248,0.1) 60%, transparent 100%)",
//                     boxShadow: "0 0 30px rgba(56,189,248,0.4)",
//                 }}
//                 animate={{ scale: [0.85, 1.1, 0.85], opacity: [0.6, 1, 0.6] }}
//                 transition={{
//                     duration: 1.6,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                     delay: 0.2,
//                 }}
//             />
//             {/* Core */}
//             <motion.div
//                 className="absolute rounded-full"
//                 style={{
//                     inset: "40%",
//                     background:
//                         "radial-gradient(circle at 35% 35%, #e0f2fe, #7dd3fc, #0ea5e9)",
//                     boxShadow:
//                         "0 0 20px #38bdf8, 0 0 40px rgba(56,189,248,0.5)",
//                 }}
//                 animate={{ scale: [0.9, 1.05, 0.9] }}
//                 transition={{
//                     duration: 1.2,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                 }}
//             />
//         </>
//     );
// }

// export default function Loading() {
//     const svgSize = 200;

//     return (
//         <div
//             className="h-screen w-full flex items-center justify-center"
//             style={{
//                 background:
//                     "radial-gradient(ellipse at 50% 40%, #0c1a2e 0%, #060d1a 60%, #020508 100%)",
//                 fontFamily: "'DM Mono', 'Fira Code', monospace",
//             }}
//         >
//             {/* Subtle grid */}
//             <div
//                 className="absolute inset-0 pointer-events-none"
//                 style={{
//                     backgroundImage:
//                         "linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)",
//                     backgroundSize: "48px 48px",
//                 }}
//             />

//             <div className="relative flex flex-col items-center gap-10">
//                 {/* Orb container */}
//                 <div
//                     className="relative"
//                     style={{ width: svgSize, height: svgSize }}
//                 >
//                     {/* SVG rings */}
//                     <svg
//                         width={svgSize}
//                         height={svgSize}
//                         className="absolute inset-0"
//                         style={{ overflow: "visible" }}
//                     >
//                         <RotatingRing
//                             radius={88}
//                             duration={8}
//                             color="rgba(56,189,248,0.35)"
//                             dashArray="12 6"
//                         />
//                         <RotatingRing
//                             radius={74}
//                             duration={5.5}
//                             reverse
//                             color="rgba(147,210,255,0.25)"
//                             dashArray="4 10"
//                         />
//                         <RotatingRing
//                             radius={62}
//                             duration={10}
//                             color="rgba(99,179,237,0.2)"
//                             dashArray="20 8 4 8"
//                         />
//                     </svg>

//                     {/* Particles */}
//                     <div className="absolute inset-0">
//                         {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
//                             <OrbParticle
//                                 key={i}
//                                 index={i}
//                                 total={PARTICLE_COUNT}
//                             />
//                         ))}
//                     </div>

//                     {/* Core glow & pulse layers */}
//                     <CorePulse />
//                 </div>

//                 {/* Text section */}
//                 <div className="flex flex-col items-center gap-3">
//                     <motion.div
//                         className="flex items-center gap-2"
//                         initial={{ opacity: 0, y: 8 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.3, duration: 0.6 }}
//                     >
//                         <span
//                             style={{
//                                 fontSize: "11px",
//                                 letterSpacing: "0.25em",
//                                 textTransform: "uppercase",
//                                 color: "rgba(147,210,255,0.9)",
//                                 fontWeight: 500,
//                             }}
//                         >
//                             Initializing
//                         </span>
//                         <div className="flex gap-1">
//                             {[0, 1, 2].map((i) => (
//                                 <motion.span
//                                     key={i}
//                                     style={{
//                                         color: "#7dd3fc",
//                                         fontSize: "14px",
//                                         lineHeight: 1,
//                                     }}
//                                     animate={{ opacity: [0.2, 1, 0.2] }}
//                                     transition={{
//                                         duration: 1.2,
//                                         repeat: Infinity,
//                                         delay: i * 0.2,
//                                         ease: "easeInOut",
//                                     }}
//                                 >
//                                     ·
//                                 </motion.span>
//                             ))}
//                         </div>
//                     </motion.div>

//                     {/* Progress bar */}
//                     <motion.div
//                         className="relative overflow-hidden rounded-full"
//                         style={{
//                             width: 160,
//                             height: 2,
//                             background: "rgba(56,189,248,0.12)",
//                         }}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.5 }}
//                     >
//                         <motion.div
//                             className="absolute inset-y-0 left-0 rounded-full"
//                             style={{
//                                 background:
//                                     "linear-gradient(90deg, #38bdf8, #93c5fd, #38bdf8)",
//                                 backgroundSize: "200% 100%",
//                                 boxShadow: "0 0 8px #38bdf8",
//                             }}
//                             animate={{
//                                 width: ["0%", "100%", "0%"],
//                                 backgroundPosition: ["0% 0%", "100% 0%"],
//                             }}
//                             transition={{
//                                 duration: 2.4,
//                                 repeat: Infinity,
//                                 ease: "easeInOut",
//                             }}
//                         />
//                     </motion.div>

//                     {/* System label */}
//                     <motion.p
//                         style={{
//                             fontSize: "10px",
//                             letterSpacing: "0.18em",
//                             color: "rgba(56,189,248,0.35)",
//                             textTransform: "uppercase",
//                         }}
//                         animate={{ opacity: [0.3, 0.7, 0.3] }}
//                         transition={{
//                             duration: 3,
//                             repeat: Infinity,
//                             ease: "easeInOut",
//                         }}
//                     >
//                         sys · v2.4.1 · ready
//                     </motion.p>
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import { motion } from "framer-motion";

/**
 * All colors derive from `--primary` (the HSL channels token used by shadcn/Tailwind).
 *
 * Pattern:
 *   hsl(var(--primary))          → solid primary
 *   hsl(var(--primary) / 0.35)   → primary at 35% opacity
 *
 * This means every particle, ring, glow, progress bar and label
 * automatically adapts when the user changes their primary color.
 *
 * If your theme exposes primary differently (e.g. as a hex CSS variable),
 * swap `hsl(var(--primary))` for `var(--primary)` throughout.
 */

const PARTICLE_COUNT = 12;

function OrbParticle({ index, total }: { index: number; total: number }) {
    const angle = (index / total) * Math.PI * 2;
    const radius = 44;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const delay = (index / total) * 1.6;
    const size = 3 + (index % 3) * 1.5;
    const brightnessBoost = 1 + 0.08 * (index % 3);

    return (
        <motion.div
            className="absolute rounded-full"
            style={{
                width: size,
                height: size,
                left: "50%",
                top: "50%",
                marginLeft: -size / 2,
                marginTop: -size / 2,
                background: "hsl(var(--primary))",
                filter: `brightness(${brightnessBoost})`,
                boxShadow: `0 0 ${size * 3}px hsl(var(--primary) / 0.7)`,
            }}
            animate={{
                x: [0, x * 0.5, x, x * 0.5, 0],
                y: [0, y * 0.5, y, y * 0.5, 0],
                opacity: [0, 0.6, 1, 0.6, 0],
                scale: [0.4, 0.8, 1, 0.8, 0.4],
            }}
            transition={{
                duration: 2.4,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
            }}
        />
    );
}

function RotatingRing({
    radius,
    duration,
    reverse,
    opacity,
    dashArray,
}: {
    radius: number;
    duration: number;
    reverse?: boolean;
    opacity: number;
    dashArray: string;
}) {
    return (
        <motion.circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke={`hsl(var(--primary) / ${opacity})`}
            strokeWidth="1.5"
            strokeDasharray={dashArray}
            strokeLinecap="round"
            animate={{ rotate: reverse ? -360 : 360 }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
            style={{ originX: "50%", originY: "50%" }}
        />
    );
}

function CorePulse() {
    return (
        <>
            {/* Outermost glow */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
                }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            {/* Mid pulse */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    inset: "28%",
                    background:
                        "radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, hsl(var(--primary) / 0.1) 60%, transparent 100%)",
                    boxShadow: "0 0 30px hsl(var(--primary) / 0.4)",
                }}
                animate={{ scale: [0.85, 1.1, 0.85], opacity: [0.6, 1, 0.6] }}
                transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2,
                }}
            />
            {/* Core sphere */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    inset: "40%",
                    background:
                        "radial-gradient(circle at 35% 35%, hsl(var(--primary) / 0.2), hsl(var(--primary) / 0.85), hsl(var(--primary)))",
                    boxShadow:
                        "0 0 20px hsl(var(--primary) / 0.8), 0 0 40px hsl(var(--primary) / 0.45)",
                }}
                animate={{ scale: [0.9, 1.05, 0.9] }}
                transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </>
    );
}

export default function Loading() {
    const svgSize = 200;

    return (
        <div
            className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background"
            style={{ fontFamily: "'DM Mono', 'Fira Code', monospace" }}
        >
            {/* Grid overlay tinted with primary */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.04) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.04) 1px, transparent 1px)
          `,
                    backgroundSize: "48px 48px",
                }}
            />

            {/* Ambient glow behind orb */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: 480,
                    height: 480,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -60%)",
                }}
            />

            <div className="relative flex flex-col items-center gap-10">
                {/* Orb */}
                <div
                    className="relative"
                    style={{ width: svgSize, height: svgSize }}
                >
                    {/* Rotating rings */}
                    <svg
                        width={svgSize}
                        height={svgSize}
                        className="absolute inset-0"
                        style={{ overflow: "visible" }}
                    >
                        <RotatingRing
                            radius={88}
                            duration={8}
                            opacity={0.35}
                            dashArray="12 6"
                        />
                        <RotatingRing
                            radius={74}
                            duration={5.5}
                            opacity={0.22}
                            dashArray="4 10"
                            reverse
                        />
                        <RotatingRing
                            radius={62}
                            duration={10}
                            opacity={0.18}
                            dashArray="20 8 4 8"
                        />
                    </svg>

                    {/* Orbiting particles */}
                    <div className="absolute inset-0">
                        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
                            <OrbParticle
                                key={i}
                                index={i}
                                total={PARTICLE_COUNT}
                            />
                        ))}
                    </div>

                    {/* Core glow layers */}
                    <CorePulse />
                </div>

                {/* Labels */}
                <div className="flex flex-col items-center gap-3">
                    <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <span
                            style={{
                                fontSize: "11px",
                                letterSpacing: "0.25em",
                                textTransform: "uppercase",
                                color: "hsl(var(--primary) / 0.9)",
                                fontWeight: 500,
                            }}
                        >
                            Initializing
                        </span>
                        <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                                <motion.span
                                    key={i}
                                    style={{
                                        color: "hsl(var(--primary))",
                                        fontSize: "14px",
                                        lineHeight: 1,
                                    }}
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "easeInOut",
                                    }}
                                >
                                    ·
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Progress bar */}
                    <motion.div
                        className="relative overflow-hidden rounded-full"
                        style={{
                            width: 160,
                            height: 2,
                            background: "hsl(var(--primary) / 0.12)",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <motion.div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{
                                background:
                                    "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.55), hsl(var(--primary)))",
                                backgroundSize: "200% 100%",
                                boxShadow: "0 0 8px hsl(var(--primary) / 0.8)",
                            }}
                            animate={{
                                width: ["0%", "100%", "0%"],
                                backgroundPosition: ["0% 0%", "100% 0%"],
                            }}
                            transition={{
                                duration: 2.4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.div>

                    {/* System label */}
                    <motion.p
                        style={{
                            fontSize: "10px",
                            letterSpacing: "0.18em",
                            color: "hsl(var(--primary) / 0.35)",
                            textTransform: "uppercase",
                        }}
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        sys · v2.4.1 · ready
                    </motion.p>
                </div>
            </div>
        </div>
    );
}
