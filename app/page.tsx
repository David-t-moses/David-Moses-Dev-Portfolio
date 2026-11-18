import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import { Navbar } from "@/components/Navbar";
// import Notification from "@/components/Notification";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";

export default function Home() {
  return (
    <div className="relative top-0 flex flex-col overflow-x-clip">
      {/* <Notification /> */}
      <Navbar />
      <Hero />
      <LogoStrip />
      {/* One continuous background for Projects, Services, Tech Stack, Process and Contact, so there is no seam between them. */}
      <div
        className="relative"
        style={{
          backgroundColor: "#0a1029",
          backgroundImage:
            "radial-gradient(ellipse 85% 520px at 50% 0%, rgba(67, 56, 202, 0.2), transparent 72%), radial-gradient(ellipse 55% 720px at 100% 26%, rgba(99, 102, 241, 0.17), transparent 70%), radial-gradient(ellipse 60% 760px at 0% 52%, rgba(124, 58, 237, 0.15), transparent 70%), radial-gradient(ellipse 60% 760px at 92% 80%, rgba(99, 102, 241, 0.15), transparent 70%), linear-gradient(to bottom, #090f21 0%, #0b1230 45%, #0c1334 100%)",
        }}
      >
        <Projects />
        <Services />
        <TechStack />
        <About />
        <Contact />
      </div>
    </div>
  );
}
