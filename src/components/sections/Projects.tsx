"use client";

import { AnimatePresence, motion as m } from "framer-motion";
const motion = m as any;
import {
    Code2,
    Globe,
    Server,
    Terminal,
    CheckCircle2,
    Zap,
    X,
    Cpu,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { portfolioData } from "../../data/portfolio";
import { Project } from "../../types";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../../lib/utils";

const PROJECTS_PER_PAGE = 6;

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null,
    );
    const [activeCategory, setActiveCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    const allProjects = [...portfolioData.projects].reverse();

    const categories = [
        "All",
        ...Array.from(new Set(allProjects.map((p) => p.category))),
    ];

    const filteredProjects =
        activeCategory === "All"
            ? allProjects
            : allProjects.filter((p) => p.category === activeCategory);

    const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
    const usePagination = filteredProjects.length > PROJECTS_PER_PAGE;

    const paginatedProjects = usePagination
        ? filteredProjects.slice(
              (currentPage - 1) * PROJECTS_PER_PAGE,
              currentPage * PROJECTS_PER_PAGE,
          )
        : filteredProjects;

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        setCurrentPage(1);
    };

    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedProject]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of projects section smoothly
        document
            .getElementById("projects")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section id="projects" className="py-24 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-primary/20 backdrop-blur-md"
                    >
                        <Cpu size={14} className="animate-spin-slow" />
                        Recent Projects
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-4xl md:text-5xl font-black mb-4 tracking-tighter"
                    >
                        Featured <span className="text-gradient">Works</span>
                    </motion.h2>
                    <p className="text-muted text-lg font-light max-w-2xl mx-auto leading-relaxed text-center">
                        Exploring the boundaries of MERN stack development
                        through practical, high-impact applications.
                    </p>
                </div>

                {/* Category Switcher */}
                <div className="w-full flex justify-center mb-16">
                    <div className="inline-flex items-center p-1.5 bg-card/40 backdrop-blur-2xl border border-border/50 rounded-2xl md:rounded-full shadow-2xl overflow-x-auto no-scrollbar max-w-full">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={cn(
                                    "relative px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap z-10 rounded-full cursor-pointer",
                                    activeCategory === category
                                        ? "text-primary"
                                        : "text-muted hover:text-foreground",
                                )}
                            >
                                <span className="relative z-10">
                                    {category}
                                </span>
                                {activeCategory === category && (
                                    <motion.div
                                        layoutId="active-projects-glow"
                                        className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]"
                                        transition={{
                                            type: "spring",
                                            bounce: 0.2,
                                            duration: 0.6,
                                        }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Project Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeCategory}-${currentPage}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12"
                    >
                        {paginatedProjects.map((project, idx) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={idx}
                                onOpen={() => setSelectedProject(project)}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Pagination — only renders when more than 6 projects */}
                {usePagination && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center justify-center gap-3 mt-16"
                    >
                        {/* Prev */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={cn(
                                "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer",
                                currentPage === 1
                                    ? "border-border/30 text-muted/30 cursor-not-allowed"
                                    : "border-border/50 text-muted hover:border-primary/50 hover:text-primary hover:bg-primary/5",
                            )}
                        >
                            <ChevronLeft size={16} />
                        </button>

                        {/* Page numbers */}
                        {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1,
                        ).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={cn(
                                    "w-10 h-10 rounded-full border text-[11px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer relative",
                                    currentPage === page
                                        ? "border-primary/30 text-primary bg-primary/10"
                                        : "border-border/50 text-muted hover:border-primary/30 hover:text-primary hover:bg-primary/5",
                                )}
                            >
                                {page}
                                {currentPage === page && (
                                    <motion.div
                                        layoutId="active-page"
                                        className="absolute inset-0 rounded-full border border-primary/20 bg-primary/10"
                                        transition={{
                                            type: "spring",
                                            bounce: 0.2,
                                            duration: 0.5,
                                        }}
                                    />
                                )}
                            </button>
                        ))}

                        {/* Next */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={cn(
                                "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer",
                                currentPage === totalPages
                                    ? "border-border/30 text-muted/30 cursor-not-allowed"
                                    : "border-border/50 text-muted hover:border-primary/50 hover:text-primary hover:bg-primary/5",
                            )}
                        >
                            <ChevronRight size={16} />
                        </button>
                    </motion.div>
                )}

                {/* Page info label */}
                {usePagination && (
                    <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-muted/40 mt-6">
                        Page {currentPage} of {totalPages} &mdash;{" "}
                        {filteredProjects.length} projects
                    </p>
                )}

                <AnimatePresence>
                    {selectedProject && (
                        <ProjectModal
                            project={selectedProject}
                            onClose={() => setSelectedProject(null)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

const ProjectCard: React.FC<{
    project: Project;
    index: number;
    onOpen: () => void;
}> = ({ project, index, onOpen }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{
                // duration: 0.7,
                // ease: [0.16, 1, 0.3, 1],
                // delay: index * 0.05,
                layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                delay: index * 0.04,
            }}
            className="group relative flex flex-col h-full bg-card/40 backdrop-blur-3xl border border-border/50 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer mx-auto w-full max-w-105"
            onClick={onOpen}
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

            <div className="relative aspect-16/11 overflow-hidden m-3 rounded-xl">
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-10 opacity-40 group-hover:opacity-20 transition-opacity" />
                <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1 }}
                >
                    <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover object-top transition-transform duration-1000"
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                        priority={index < 2}
                    />
                </motion.div>
            </div>

            <div className="px-8 pb-8 pt-4 flex flex-col grow">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">
                        {project.category}
                    </span>
                    <div className="h-px grow bg-primary/10" />
                </div>

                <h3 className="text-2xl font-black tracking-tight mb-2 group-hover:text-primary transition-colors duration-500">
                    {project.name}
                </h3>
                <p className="text-muted text-xs font-bold uppercase tracking-widest opacity-40 mb-6">
                    {project.tagline}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <Link
                        href={project.links.live}
                        target="_blank"
                        className="px-6 py-3 text-primary bg-primary/10 border border-primary/20 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Live Preview <Globe size={14} />
                    </Link>
                    <div className="flex -space-x-2">
                        {project.techStack.slice(0, 3).map((tech, i) => (
                            <div
                                key={i}
                                className="w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center text-[7px] font-bold text-muted uppercase shadow-sm"
                            >
                                {tech.charAt(0)}
                            </div>
                        ))}
                        {project.techStack.length > 3 && (
                            <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[7px] font-bold text-primary uppercase shadow-sm">
                                +{project.techStack.length - 3}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({
    project,
    onClose,
}) => {
    return (
        <div className="fixed inset-0 z-1000 flex items-center justify-center p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-crosshair"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-250 max-h-[90vh] bg-card/95 backdrop-blur-3xl border border-white/10 rounded-xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] flex flex-col md:flex-row overflow-hidden"
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 md:top-10 md:right-10 z-60 p-3 md:p-4 bg-white/5 hover:bg-primary/20 hover:text-primary rounded-full transition-all text-muted backdrop-blur-xl border border-white/5 cursor-pointer"
                >
                    <X size={24} />
                </button>

                <div className="w-full md:w-1/2 relative bg-muted/20">
                    <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width:768px) 100vw, 50vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-card/95 to-transparent md:hidden" />
                    <div className="absolute bottom-10 left-10 z-20 space-y-4 hidden md:block">
                        <a
                            href={project.links.live}
                            target="_blank"
                            className="px-6 py-3 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-primary hover:text-white transition-all"
                        >
                            Live Preview <Globe size={14} />
                        </a>
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto no-scrollbar flex flex-col">
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-primary/20 text-primary">
                                {project.category}
                            </span>
                            <div className="flex items-center gap-1.5 text-primary text-[9px] font-black uppercase tracking-[0.2em] opacity-60">
                                <Zap size={10} className="fill-primary" />{" "}
                                Active
                            </div>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                            {project.name}
                        </h3>
                        <p className="text-muted text-sm font-bold uppercase tracking-[0.3em] opacity-40 mb-8">
                            {project.tagline}
                        </p>
                        <p className="text-muted/80 text-base md:text-lg leading-relaxed font-light mb-10">
                            {project.description}
                        </p>
                    </div>

                    <div className="space-y-12 mb-12">
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6 flex items-center gap-2">
                                <CheckCircle2 size={14} /> Key Capabilities
                            </h4>
                            <ul className="grid gap-4">
                                {project.features.map((feature, i) => (
                                    <li
                                        key={i}
                                        className="flex gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-primary/20 transition-all"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                        <span className="text-[13px] text-muted leading-snug font-medium italic">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6 flex items-center gap-2">
                                <Terminal size={14} /> Integrated Tech
                            </h4>
                            <div className="flex flex-wrap gap-2.5">
                                {project.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-5 py-2.5 bg-background border border-border rounded-xl text-[10px] font-black uppercase tracking-widest text-muted hover:text-primary hover:border-primary/50 transition-all cursor-default"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-10 border-t border-white/5 flex flex-col sm:flex-row gap-4 md:hidden">
                        <a
                            href={project.links.live}
                            target="_blank"
                            className="flex-1 py-5 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                        >
                            Live Preview <Globe size={14} />
                        </a>
                        <div className="flex gap-2">
                            <a
                                href={project.links.clientCode}
                                target="_blank"
                                className="flex-1 py-5 bg-card border border-border rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
                            >
                                Client <Code2 size={14} />
                            </a>
                            <a
                                href={project.links.serverCode}
                                target="_blank"
                                className="flex-1 py-5 bg-card border border-border rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
                            >
                                Server <Server size={14} />
                            </a>
                        </div>
                    </div>

                    <div className="mt-auto hidden md:flex items-center justify-between pt-10 border-t border-white/5">
                        <div className="flex gap-4">
                            <a
                                href={project.links.clientCode}
                                target="_blank"
                                className="text-[9px] font-black uppercase tracking-[0.25em] text-muted hover:text-primary flex items-center gap-2 transition-colors"
                            >
                                <Code2 size={12} /> Client Core
                            </a>
                            <a
                                href={project.links.serverCode}
                                target="_blank"
                                className="text-[9px] font-black uppercase tracking-[0.25em] text-muted hover:text-primary flex items-center gap-2 transition-colors"
                            >
                                <Server size={12} /> Server Logic
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
