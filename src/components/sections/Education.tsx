// "use client";

// import React from "react";
// import { motion as m } from "framer-motion";
// const motion = m as any;
// import { portfolioData } from "../../data/portfolio";
// import { Check } from "lucide-react";
// import { cn } from "../../lib/utils";

// export const Education: React.FC = () => {
//     return (
//         <section
//             id="education"
//             className="py-24 relative overflow-hidden scroll-mt-20 bg-background"
//         >
//             <div className="max-w-7xl mx-auto px-6">
//                 <div className="text-center mb-20">
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         whileInView={{ opacity: 1, scale: 1 }}
//                         className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-primary/20"
//                     >
//                         Academic Path
//                     </motion.div>
//                     <motion.h2
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         className="text-4xl md:text-5xl font-black mb-6 tracking-tighter"
//                     >
//                         Education{" "}
//                         <span className="text-gradient">Timeline</span>
//                     </motion.h2>
//                 </div>

//                 <div className="relative">
//                     {/* Vertical Center Line */}
//                     <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-linear-to-b from-primary via-primary/50 to-transparent" />

//                     <div className="space-y-16">
//                         {portfolioData.education.map((edu, index) => {
//                             // index 0 -> Left, index 1 -> Right, index 2 -> Left...
//                             const isEven = index % 2 === 0;

//                             return (
//                                 <div
//                                     key={index}
//                                     className={cn(
//                                         "relative flex flex-col md:flex-row items-start md:items-center",
//                                         !isEven && "md:flex-row-reverse",
//                                     )}
//                                 >
//                                     {/* Timeline Point */}
//                                     <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10 flex items-center justify-center">
//                                         <motion.div
//                                             initial={{ scale: 0 }}
//                                             whileInView={{ scale: 1 }}
//                                             whileHover={{
//                                                 scale: 1.2,
//                                                 rotate: 360,
//                                             }}
//                                             className="w-10 h-10 rounded-full bg-card border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] transition-colors duration-500"
//                                         >
//                                             <Check
//                                                 size={18}
//                                                 className="text-primary"
//                                             />
//                                         </motion.div>
//                                     </div>

//                                     {/* Content Container */}
//                                     <div
//                                         className={cn(
//                                             "w-full md:w-1/2 pl-12 md:pl-0",
//                                             isEven
//                                                 ? "md:pr-16 md:text-right"
//                                                 : "md:pl-16 md:text-left",
//                                         )}
//                                     >
//                                         <motion.div
//                                             initial={{
//                                                 opacity: 0,
//                                                 x: isEven ? -100 : 100,
//                                             }}
//                                             whileInView={{ opacity: 1, x: 0 }}
//                                             whileHover={{
//                                                 scale: 1.02,
//                                                 y: -8,
//                                                 backgroundColor:
//                                                     "rgba(var(--primary-rgb), 0.04)",
//                                             }}
//                                             viewport={{ once: true }}
//                                             transition={{
//                                                 duration: 0.8,
//                                                 ease: [0.16, 1, 0.3, 1],
//                                                 scale: {
//                                                     type: "spring",
//                                                     stiffness: 200,
//                                                     damping: 25,
//                                                 },
//                                                 y: {
//                                                     type: "spring",
//                                                     stiffness: 200,
//                                                     damping: 25,
//                                                 },
//                                                 backgroundColor: {
//                                                     duration: 0.4,
//                                                 },
//                                             }}
//                                             className="group p-8 rounded-[2.5rem] border border-transparent hover:border-primary/10 shadow-none hover:shadow-2xl hover:shadow-primary/5 relative overflow-hidden"
//                                         >
//                                             {/* Decorative background element that appears on hover */}
//                                             <div className="absolute top-0 left-0 w-1 h-full bg-primary/0 group-hover:bg-primary/50 transition-all duration-700" />

//                                             <span className="inline-block text-[10px] font-mono font-black text-muted italic mb-3 uppercase tracking-[0.2em] transition-colors duration-500 group-hover:text-primary">
//                                                 {edu.duration}
//                                             </span>

//                                             <h3 className="text-2xl font-black tracking-tight mb-3 text-foreground group-hover:text-primary transition-colors duration-500">
//                                                 {edu.degree}
//                                             </h3>

//                                             <p className="text-muted text-sm leading-relaxed font-light transition-colors duration-500 group-hover:text-foreground/80">
//                                                 {
//                                                     edu.description.split(
//                                                         edu.institution,
//                                                     )[0]
//                                                 }
//                                                 <span className="transition-all duration-500 group-hover:text-primary group-hover:font-bold">
//                                                     {edu.institution}
//                                                 </span>
//                                                 {
//                                                     edu.description.split(
//                                                         edu.institution,
//                                                     )[1]
//                                                 }
//                                             </p>
//                                         </motion.div>
//                                     </div>

//                                     {/* Empty space for alternating layout on desktop */}
//                                     <div className="hidden md:block md:w-1/2" />
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };
"use client";

import React, { useState } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
const motion = m as any;
import { portfolioData } from "../../data/portfolio";
import {
    Briefcase,
    GraduationCap,
    Award,
    Check,
    ExternalLink,
} from "lucide-react";
import { cn } from "../../lib/utils";

type TabType = "experience" | "education" | "certificates";

export default function Education() {
    const [activeTab, setActiveTab] = useState<TabType>("experience");

    const tabs = [
        { id: "experience", label: "Experience", icon: Briefcase },
        { id: "education", label: "Education", icon: GraduationCap },
        { id: "certificates", label: "Certificates", icon: Award },
    ];

    const renderTimeline = () => {
        switch (activeTab) {
            case "experience":
                return portfolioData.experience.map((exp, idx) => (
                    <TimelineItem
                        key={idx}
                        index={idx}
                        title={exp.role}
                        subtitle={exp.company}
                        location={exp.location}
                        link={exp.link}
                        duration={exp.duration}
                        description={exp.description}
                    />
                ));
            case "education":
                return portfolioData.education.map((edu, idx) => (
                    <TimelineItem
                        key={idx}
                        index={idx}
                        title={edu.degree}
                        subtitle={edu.institution}
                        location={edu.location}
                        duration={edu.duration}
                        description={edu.description}
                    />
                ));
            case "certificates":
                return portfolioData.certificates.map((cert, idx) => (
                    <TimelineItem
                        key={idx}
                        index={idx}
                        title={cert.title}
                        subtitle={cert.issuer}
                        duration={cert.date}
                        description={`Certification focused on: ${cert.skills.join(", ")}.`}
                        link={cert.link}
                    />
                ));
        }
    };

    return (
        <section
            id="education"
            className="py-24 relative overflow-hidden scroll-mt-20 bg-background"
        >
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-primary/20 shadow-sm"
                    >
                        Chronology
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black mb-10 tracking-tighter leading-tight"
                    >
                        Technical <span className="text-gradient">Journey</span>
                    </motion.h2>

                    {/* Upgraded Tab Switcher - Now exactly like the "Technical Arsenal" */}
                    <div className="w-full flex justify-center mb-16">
                        <div className="w-full sm:w-auto overflow-x-auto no-scrollbar pb-4 sm:pb-0">
                            <div className="inline-flex items-center p-1.5 bg-card/50 backdrop-blur-xl border border-border rounded-2xl md:rounded-4xl shadow-sm min-w-full sm:min-w-0">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() =>
                                            setActiveTab(tab.id as TabType)
                                        }
                                        className={cn(
                                            "relative px-5 py-2.5 md:px-8 md:py-3.5 flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 whitespace-nowrap cursor-pointer",
                                            activeTab === tab.id
                                                ? "text-primary"
                                                : "text-muted hover:text-foreground",
                                        )}
                                    >
                                        <tab.icon
                                            size={14}
                                            className="relative z-10"
                                        />
                                        <span className="relative z-10">
                                            {tab.label}
                                        </span>
                                        <AnimatePresence>
                                            {activeTab === tab.id && (
                                                <motion.div
                                                    layoutId="active-journey-tab"
                                                    className="absolute inset-0 bg-primary/5 rounded-xl md:rounded-3xl"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{
                                                        type: "spring",
                                                        bounce: 0.2,
                                                        duration: 0.6,
                                                    }}
                                                />
                                            )}
                                        </AnimatePresence>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative max-w-7xl mx-auto">
                    {/* Centralized Timeline Track */}
                    <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-primary/30" />

                    <div className="space-y-24 md:space-y-32">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-24 md:space-y-32"
                            >
                                {renderTimeline()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

interface TimelineItemProps {
    index: number;
    title: string;
    subtitle: string;
    location?: string;
    duration: string;
    description: string;
    link?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
    index,
    title,
    subtitle,
    location,
    duration,
    description,
    link,
}) => {
    const isEven = index % 2 === 0;

    return (
        <div
            key={index}
            className={cn(
                "relative flex flex-col md:flex-row items-start md:items-center",
                !isEven && "md:flex-row-reverse",
            )}
        >
            {/* Timeline Point */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10 flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    className="w-10 h-10 rounded-full bg-card border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] transition-colors duration-500"
                >
                    <Check size={18} className="text-primary" />
                </motion.div>
            </div>

            {/* Content Container */}
            <div
                className={cn(
                    "w-full md:w-1/2 pl-12 md:pl-0",
                    isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left",
                )}
            >
                <motion.div
                    initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{
                        scale: 1.02,
                        y: -8,
                        backgroundColor: "rgba(var(--primary-rgb), 0.04)",
                    }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                        scale: { type: "spring", stiffness: 200, damping: 25 },
                        y: { type: "spring", stiffness: 200, damping: 25 },
                        backgroundColor: { duration: 0.4 },
                    }}
                    // className="group p-8 rounded-[2.5rem] border border-transparent hover:border-primary/10 shadow-none hover:shadow-2xl hover:shadow-primary/5 relative overflow-hidden"
                    className="group p-8 rounded-[2.5rem] border border-primary/10 shadow-2xl shadow-primary/5 relative overflow-hidden"
                >
                    {/* Decorative background element that appears on hover */}
                    {/* <div className="absolute top-0 left-0 w-1 h-full bg-primary/0 group-hover:bg-primary/50 transition-all duration-700" /> */}

                    <span className="inline-block text-[10px] font-mono font-black text-muted italic mb-3 uppercase tracking-[0.2em] transition-colors duration-500 group-hover:text-primary">
                        {duration}
                    </span>

                    <h3 className="text-2xl font-black tracking-tight mb-3 text-foreground group-hover:text-primary transition-colors duration-500">
                        {title}
                    </h3>

                    <div className="text-muted text-sm leading-relaxed font-light transition-colors duration-500 group-hover:text-foreground/80">
                        {link ? (
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-muted/80 font-black text-sm md:text-base group-hover/item:text-primary transition-colors duration-300"
                            >
                                {subtitle}{" "}
                                <ExternalLink
                                    size={14}
                                    className="opacity-50"
                                />
                            </a>
                        ) : (
                            <p className="text-muted/80 font-black text-sm md:text-base group-hover/item:text-primary transition-colors duration-300">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    <p className="text-muted text-base leading-relaxed font-light transition-colors duration-500 group-hover/item:text-primary">
                        {location}
                    </p>

                    <p className="text-muted text-sm leading-relaxed font-light transition-colors duration-500 group-hover/item:text-primary">
                        {description}
                    </p>
                </motion.div>
            </div>

            {/* Empty space for alternating layout on desktop */}
            <div className="hidden md:block md:w-1/2" />
        </div>
    );
};
