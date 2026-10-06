import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import AILab from "@/components/ai-lab/AILab";
import ProjectUniverse from "@/components/projects/ProjectUniverse";
import TechGalaxy from "@/components/skills/TechGalaxy";
import Playground from "@/components/playground/Playground";
import CodeTerminal from "@/components/playground/CodeTerminal";
import Journey from "@/components/journey/Journey";
import Resume from "@/components/contact/Resume";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <AILab />
      <ProjectUniverse />
      <TechGalaxy />
      <Playground />
      <CodeTerminal />
      <Journey />
      <Resume />
      <Contact />
    </>
  );
}
