import type { Metadata } from "next";
import { Mr_Dafoe, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "../components/ui/Navbar";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import CustomCursor from "../components/custom/CustomCursor";

const sora = Sora({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-sora",
    display: "swap",
});

const mrDafoe = Mr_Dafoe({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-mrdafoe",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Syed Mohiuddin Meshal",
    description:
        "Portfolio of Syed Mohiuddin Meshal, a MERN & Full-Stack Developer focused on building scalable, modern, and user-friendly web applications. Explore projects, skills, and future learning goals.",
    keywords: [
        "Syed Mohiuddin Meshal",
        "MERN developer",
        "Full-stack developer",
        "Web developer portfolio",
        "React developer",
        "Node.js developer",
        "Next.js portfolio",
        "JavaScript developer",
        "Frontend and Backend development",
        "Software engineer",
        "Web app projects",
        "Programming skills",
        "Tech portfolio",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${sora.variable} ${mrDafoe.variable} antialiased`}>
                <ThemeProvider>
                    {/* <CustomCursor /> */}
                    {/* <Navbar /> */}
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
