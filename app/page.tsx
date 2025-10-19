import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import Notification from "@/components/Notification";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";

export default function Home() {
  return (
    <div className="relative top-0 flex flex-col overflow-x-hidden">
      {/* <Notification /> */}
      <Navbar />
      <Hero />
      <About />
      <Services />
      <TechStack />
      <Projects />
      <Contact />
    </div>
  );
}
