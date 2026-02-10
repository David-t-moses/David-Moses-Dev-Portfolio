"use client";
import React, { useState, useEffect } from "react";
import { FloatingNav } from "./ui/floating-nav";
import {
  IconAddressBook,
  IconHome,
  IconBriefcase,
  IconCode,
  IconUser,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";

export function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false); // Track scroll state

  useEffect(() => {
    setMounted(true);
    
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      // Trigger background change after 20px scroll
      setScrolled(window.scrollY > 20);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (link: string) => {
    setIsMenuOpen(false);
    if (link === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (!mounted) return null;

  if (isMobile) {
    const mobileNavItems = [
      { name: "Home", title: "Home", link: "/" },
      { name: "About", title: "About Me", link: "#about" },
      { name: "Services", title: "My Services", link: "#services" },
      { name: "Tech Stack", title: "Technologies", link: "#techstack" },
      { name: "Projects", title: "My Projects", link: "#projects" },
      { name: "Contact", title: "Contact Me", link: "#contact" },
    ];

    return (
      <>
        {/* Top Header Bar for Mobile */}
        <div 
          className={`fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between px-6 py-4 md:hidden transition-all duration-300 ${
            scrolled 
              ? "bg-slate-950/80 backdrop-blur-lg border-b border-white/5 py-3" 
              : "bg-transparent py-5"
          }`}
        >
          {/* Logo on the Left */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick("/")}>
            <img 
              src="/logo.png" 
              alt="Logo" 
              className={`h-8 w-auto object-contain transition-transform duration-300 ${scrolled ? "scale-90" : "scale-100"}`} 
            />
          </div>

          {/* Hamburger Menu on the Right */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2.5 bg-slate-900/90 backdrop-blur-md rounded-xl border border-white/10 text-white hover:bg-slate-800 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <IconX className="h-6 w-6" />
            ) : (
              <IconMenu2 className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-[9998] bg-slate-950/98 backdrop-blur-xl md:hidden animate-in fade-in duration-300">
            <div className="mobile-nav-scroll h-full overflow-y-auto">
              <div className="flex flex-col items-center justify-start min-h-full py-28 px-8 space-y-4">
                {mobileNavItems.map((item, index) => (
                  <button
                    key={`mobile-nav-${index}`}
                    onClick={() => handleNavClick(item.link)}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/50 transition-all duration-300 w-full group"
                  >
                    <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-indigo-600 transition-colors">
                        {item.name === "Home" && <IconHome size={20} />}
                        {item.name === "About" && <IconUser size={20} />}
                        {item.name === "Services" && <IconBriefcase size={20} />}
                        {item.name === "Tech Stack" && <IconCode size={20} />}
                        {item.name === "Projects" && <IconBriefcase size={20} />}
                        {item.name === "Contact" && <IconAddressBook size={20} />}
                    </div>
                    <span className="text-white font-medium text-lg">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop Navigation
  return (
    <div className="relative w-full">
      <FloatingNav
        navItems={[
          { name: "Home", link: "#home" },
          { name: "About", link: "#about" },
          { name: "Services", link: "#services" },
          { name: "Tech Stack", link: "#techstack" },
          { name: "Projects", link: "#projects" },
          { name: "Contact", link: "#contact" },
        ]}
      />
    </div>
  );
}