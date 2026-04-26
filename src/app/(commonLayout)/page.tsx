import Navbar from "../../components/ui/Navbar";
import Hero from "../../components/sections/Hero";
import About from "../../components/sections/About";
import Education from "../../components/sections/Education";
import Skills from "../../components/sections/Skills";
import Projects from "../../components/sections/Projects";
import Contact from "../../components/sections/Contact";
import GitHubActivity from "../../components/sections/GithubActivity";

export default function Home() {
    return (
        <div>
            <Navbar />
            <Hero/>
            <About/>
            <Education/>
            <Skills/>
            <Projects/>
            <Contact/>
            <GitHubActivity />
        </div>
    );
}
