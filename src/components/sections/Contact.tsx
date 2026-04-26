"use client";

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion as m, AnimatePresence } from "framer-motion";
const motion = m as any;
import {
    Mail,
    Phone,
    MapPin,
    Send,
    CheckCircle2,
    Loader2,
    XCircle,
    Github,
    Linkedin,
    Facebook,
    Copy,
    Check,
} from "lucide-react";
import { portfolioData } from "../../data/portfolio";
import { cn } from "../../lib/utils";
import { sendEmail } from "../../actions/sendEmail";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
    const { email, phone, location, socialLinks } = portfolioData.personalInfo;
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [copiedType, setCopiedType] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (status === "loading") return;

        setStatus("loading");
        setErrorMessage("");

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const name = (formData.get("name") as string) || "";
        const email = (formData.get("email") as string) || "";
        const subject = (formData.get("subject") as string) || "";
        const message = (formData.get("message") as string) || "";

        const sendData = {
            name,
            email,
            subject,
            message,
        };

        try {
            const result = await sendEmail(sendData);

            if (result.success) {
                setStatus("success");
                formRef.current?.reset();
                setTimeout(() => setStatus("idle"), 5000);
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage("Failed to send message. Please try again.");
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    const copyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopiedType(type);
        setTimeout(() => setCopiedType(null), 2000);
    };

    const contactOptions = [
        {
            icon: Mail,
            label: "Email",
            value: email,
            href: `mailto:${email}`,
            color: "bg-primary/10 text-primary",
            type: "email",
        },
        {
            icon: Phone,
            label: "Phone",
            value: phone,
            href: `tel:${phone}`,
            color: "bg-secondary/10 text-secondary",
            type: "phone",
        },
        {
            icon: MapPin,
            label: "Location",
            value: location,
            href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`,
            color: "bg-accent/10 text-accent",
            type: "location",
        },
    ];

    return (
        <section
            id="contact"
            className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden overflow-x-hidden bg-background scroll-mt-20"
        >
            {/* Background blur */}
            <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-primary/10 blur-3xl rounded-full -z-10 animate-pulse-soft" />
            <div className="absolute bottom-0 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-secondary/10 blur-2xl rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 xl:gap-24 items-start">
                    {/* LEFT COLUMN */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 max-w-xl flex flex-col space-y-10 sm:space-y-12"
                    >
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-5 sm:mb-6 border border-primary/20 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                Connectivity Hub
                            </div>

                            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold mb-4 leading-tight">
                                Let&apos;s architect <br />
                                <span className="text-gradient">
                                    the future.
                                </span>
                            </h2>

                            <p className="text-muted text-base sm:text-lg max-w-md font-light leading-relaxed">
                                Whether you have a groundbreaking idea or a
                                complex problem to solve, I&apos;m here to
                                translate your vision into robust, scalable
                                solutions.
                            </p>
                        </div>

                        {/* CONTACT OPTIONS */}
                        <div className="grid gap-3 sm:gap-4">
                            {contactOptions.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 0 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 rounded-3xl bg-card/40 backdrop-blur-xl border border-border/20 hover:border-primary/30 hover:bg-card/60 transition-all duration-300 shadow-sm"
                                >
                                    <a
                                        href={item.href}
                                        target={
                                            item.type === "location"
                                                ? "_blank"
                                                : undefined
                                        }
                                        rel={
                                            item.type === "location"
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        className="flex items-center gap-3 sm:gap-4 grow min-w-0 pr-2"
                                    >
                                        <div
                                            className={cn(
                                                "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-inner",
                                                item.color,
                                            )}
                                        >
                                            <item.icon size={22} />
                                        </div>

                                        <div className="flex flex-col min-w-0">
                                            <h4 className="font-black text-muted text-[9px] uppercase tracking-widest mb-1 opacity-60 group-hover:text-primary transition-colors">
                                                {item.label}
                                            </h4>

                                            <p className="text-sm md:text-base font-bold text-foreground truncate group-hover:text-primary transition-colors">
                                                {item.value}
                                            </p>
                                        </div>
                                    </a>

                                    {item.type !== "location" && (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                copyToClipboard(
                                                    item.value,
                                                    item.type,
                                                );
                                            }}
                                            className="hidden md:block p-2 sm:p-3 rounded-xl bg-background border border-border hover:text-primary transition-all relative shrink-0 cursor-pointer"
                                            aria-label={`Copy ${item.label}`}
                                        >
                                            <AnimatePresence mode="wait">
                                                {copiedType === item.type ? (
                                                    <motion.div
                                                        key="check"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        exit={{ scale: 0 }}
                                                    >
                                                        <Check
                                                            size={16}
                                                            className="text-primary"
                                                            strokeWidth={3}
                                                        />
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="copy"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        exit={{ scale: 0 }}
                                                    >
                                                        <Copy
                                                            size={16}
                                                            className="text-muted"
                                                            strokeWidth={2.5}
                                                        />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </button>
                                    )}
                                </motion.div>
                                // <motion.div
                                //     key={i}
                                //     initial={{ opacity: 0, x: -20 }}
                                //     whileInView={{ opacity: 1, x: 0 }}
                                //     transition={{ delay: i * 0.1 }}
                                //     className="group relative flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 rounded-3xl bg-card/40 backdrop-blur-xl border border-border/20 hover:border-primary/30 hover:bg-card/60 transition-all duration-300 shadow-sm"
                                // >
                                //     <a
                                //         href={item.href}
                                //         target={
                                //             item.type === "location"
                                //                 ? "_blank"
                                //                 : undefined
                                //         }
                                //         rel={
                                //             item.type === "location"
                                //                 ? "noopener noreferrer"
                                //                 : undefined
                                //         }
                                //         className="flex items-start gap-3 sm:gap-4 grow min-w-0"
                                //     >
                                //         <div
                                //             className={cn(
                                //                 "shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-inner",
                                //                 item.color,
                                //             )}
                                //         >
                                //             <item.icon size={22} />
                                //         </div>

                                //         <div className="flex flex-col min-w-0 flex-1">
                                //             <h4 className="font-black text-muted text-[9px] uppercase tracking-widest mb-1 opacity-60 group-hover:text-primary transition-colors">
                                //                 {item.label}
                                //             </h4>

                                //             <p className="text-sm md:text-base font-bold text-foreground break-words leading-snug">
                                //                 {item.value}
                                //             </p>
                                //         </div>
                                //     </a>

                                //     {item.type !== "location" && (
                                //         <button
                                //             onClick={(e) => {
                                //                 e.preventDefault();
                                //                 copyToClipboard(
                                //                     item.value,
                                //                     item.type,
                                //                 );
                                //             }}
                                //             className="p-2 sm:p-3 rounded-xl bg-background border border-border hover:text-primary transition-all relative shrink-0 cursor-pointer self-start sm:self-auto"
                                //             aria-label={`Copy ${item.label}`}
                                //         >
                                //             <Copy size={16} />
                                //         </button>
                                //     )}
                                // </motion.div>
                            ))}
                        </div>

                        {/* SOCIAL */}
                        <div className="pt-6 border-t border-border/20 flex flex-wrap gap-3 sm:gap-4">
                            {[
                                {
                                    icon: Github,
                                    href: socialLinks.github,
                                    label: "GitHub",
                                },
                                {
                                    icon: Linkedin,
                                    href: socialLinks.linkedin,
                                    label: "LinkedIn",
                                },
                                {
                                    icon: Facebook,
                                    href: `https://www.facebook.com/meshal.67`,
                                    label: "Facebook",
                                },
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-card border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary hover:shadow-lg transition-all"
                                    title={social.label}
                                >
                                    <social.icon size={20} strokeWidth={2.5} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN — FORM */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7"
                    >
                        <div className="relative p-5 sm:p-8 md:p-10 lg:p-14 rounded-3xl bg-card/90 border border-white/10 shadow-lg overflow-hidden">
                            <div className="mb-8">
                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-1">
                                    Tell me about your project
                                </h3>
                                <p className="text-[10px] text-muted/50 uppercase tracking-widest">
                                    ⚡ Average response time: within 24 hours
                                </p>
                            </div>

                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="space-y-5 sm:space-y-6 relative z-10"
                            >
                                {/* Inputs */}
                                {[
                                    {
                                        label: "Your Name",
                                        name: "name",
                                        type: "text",
                                        placeholder: "John Carter",
                                    },
                                    {
                                        label: "Email",
                                        name: "email",
                                        type: "email",
                                        placeholder: "john@company.com",
                                    },
                                    {
                                        label: "Subject",
                                        name: "subject",
                                        type: "text",
                                        placeholder:
                                            "Example: SaaS Product Development",
                                    },
                                ].map((field) => (
                                    <div key={field.name} className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted/60">
                                            {field.label}
                                        </label>
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            required
                                            placeholder={field.placeholder}
                                            className="w-full px-4 sm:px-5 md:px-6 py-4 sm:py-5 bg-background border border-border rounded-2xl outline-none text-sm font-medium shadow-sm placeholder:text-muted/30"
                                        />
                                    </div>
                                ))}

                                {/* TEXTAREA */}
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted/60">
                                        Project Details
                                    </label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={4}
                                        placeholder="What are you looking to build? Share your goals, timeline, and any details that help me understand your vision."
                                        className="w-full px-4 sm:px-5 md:px-6 py-4 sm:py-5 bg-background border border-border rounded-3xl outline-none resize-none text-sm font-medium leading-relaxed shadow-sm placeholder:text-muted/30"
                                    />
                                </div>

                                {/* BUTTON */}
                                <button
                                    type="submit"
                                    disabled={
                                        status === "loading" ||
                                        status === "success"
                                    }
                                    className={cn(
                                        "w-full py-4 sm:py-5 md:py-6 rounded-full flex items-center justify-center gap-3 font-black tracking-wide text-sm sm:text-xs transition-all duration-300 relative overflow-hidden shadow-lg cursor-pointer",
                                        (status === "idle" ||
                                            status === "success") &&
                                            "bg-primary text-white hover:scale-[1.02] active:scale-[0.98]",
                                        status === "loading" &&
                                            "bg-muted/20 text-muted cursor-wait shadow-none",
                                        status === "error" &&
                                            "bg-red-500 text-white shadow-red-500/20",
                                    )}
                                >
                                    {status === "loading"
                                        ? "Sending message..."
                                        : status === "success"
                                          ? "✅ Message received!"
                                          : status === "error"
                                            ? "Gateway Error"
                                            : "Start the Conversation"}
                                </button>

                                <p className="mt-6 text-center text-[10px] font-bold text-muted/50 uppercase tracking-widest">
                                    🔒 Your information is kept confidential. No
                                    spam, ever.
                                </p>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
