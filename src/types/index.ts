export type Theme = "light" | "dark" | "system";
export type Language = "en" | "fr" | "es" | "nl";
export type PrimaryColor = string;

export interface Skill {
    name: string;
    level?: number;
    icon: string;
    isLearning?: boolean;
}

export interface SkillCategory {
    title: string;
    icon: string;
    skills: Skill[];
}

export interface Project {
    id: number;
    name: string;
    tagline: string;
    description: string;
    features: string[];
    techStack: string[];
    links: {
        live: string;
        clientCode: string;
        serverCode: string;
    };
    image: string;
    color: string;
    featured: boolean;
    category: string;
}

export interface EducationEntry {
    institution: string;
    degree: string;
    duration: string;
    icon: string;
    description: string;
    location?: string;
}

export interface ExperienceEntry {
    company: string;
    role: string;
    duration: string;
    description: string;
    techStack: string[];
    type: string;
}

export interface CertificateEntry {
    title: string;
    issuer: string;
    date: string;
    id?: string;
    link: string;
    skills: string[];
}

export interface PortfolioData {
    personalInfo: {
        name: string;
        title: string;
        location: string;
        email: string;
        phone: string;
        socialLinks: {
            github: string;
            linkedin: string;
            portfolio: string;
        };
        careerObjective: string;
    };
    skills: Record<string, SkillCategory>;
    projects: Project[];
    education: EducationEntry[];
    experience: ExperienceEntry[];
    certificates: CertificateEntry[];
}
