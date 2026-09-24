import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import TechOrbit from "@/components/skills/TechOrbit";
import ProjectsSection from "@/components/projects/ProjectsSection";
import Experience from "@/components/experience/Experience";
import DesignSection from "@/components/design/DesignSection";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechOrbit />
        <ProjectsSection />
        <Experience />
        <DesignSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
