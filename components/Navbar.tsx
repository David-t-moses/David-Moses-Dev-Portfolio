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

  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleNavClick = (link: string) => {
    setIsMenuOpen(false);

    if (link === "/") {
      window.location.href = "/";
    } else {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Don't render anything until mounted to avoid hydration issues
  if (!mounted) {
    return null;
  }

  if (isMobile) {
    const mobileNavItems = [
      { name: "Home", title: "Home", link: "/" },
      { name: "About", title: "About Me", link: "#about" },
      { name: "Services", title: "My Services", link: "#services" },
      { name: "Tech Stack", title: "Technologies", link: "#tech-stack" },
      { name: "Projects", title: "My Projects", link: "#projects" },
      { name: "Contact", title: "Contact Me", link: "#contact" },
    ];

    return (
      <>
        {/* Mobile Menu Button */}
        <div className="fixed top-4 right-4 z-[9999] md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-3 bg-slate-900/90 backdrop-blur-md rounded-full border border-slate-600 text-white hover:bg-slate-800 transition-all duration-200 shadow-lg"
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
          <div className="fixed inset-0 z-[9998] bg-slate-950/98 backdrop-blur-md md:hidden">
            {/* Scrollable Container */}
            <div className="mobile-nav-scroll h-full overflow-y-auto">
              <div className="flex flex-col items-center justify-start min-h-full py-20 px-8 space-y-6">
                {mobileNavItems.map((item, index) => (
                  <button
                    key={`mobile-nav-${index}`}
                    onClick={() => handleNavClick(item.link)}
                    className="flex flex-col items-center space-y-3 p-6 rounded-xl hover:bg-slate-800/60 transition-all duration-200 group w-full max-w-xs border border-slate-700/50 hover:border-slate-600 flex-shrink-0"
                  >
                    <div className="p-4 bg-slate-800/70 rounded-full group-hover:bg-slate-700/80 transition-all duration-200 group-hover:scale-110">
                      {item.name === "Home" && (
                        <IconHome className="h-7 w-7 text-white" />
                      )}
                      {item.name === "About" && (
                        <IconUser className="h-7 w-7 text-white" />
                      )}
                      {item.name === "Services" && (
                        <IconBriefcase className="h-7 w-7 text-white" />
                      )}
                      {item.name === "Tech Stack" && (
                        <IconCode className="h-7 w-7 text-white" />
                      )}
                      {item.name === "Projects" && (
                        <IconBriefcase className="h-7 w-7 text-white" />
                      )}
                      {item.name === "Contact" && (
                        <IconAddressBook className="h-7 w-7 text-white" />
                      )}
                    </div>
                    <span className="text-white text-lg font-medium group-hover:text-blue-300 transition-colors duration-200">
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation Bar for Mobile */}
        {/* <div className="fixed bottom-0 left-0 right-0 z-[9997] bg-slate-900/95 backdrop-blur-md border-t border-slate-700 md:hidden">
          <div className="flex justify-around items-center py-3 px-2">
            {mobileNavItems.slice(0, 5).map((item, index) => (
              <button
                key={`bottom-nav-${index}`}
                onClick={() => handleNavClick(item.link)}
                className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-slate-800/50 transition-all duration-200 min-w-0 flex-1"
              >
                {item.name === "Home" && (
                  <IconHome className="h-5 w-5 text-white" />
                )}
                {item.name === "About" && (
                  <IconUser className="h-5 w-5 text-white" />
                )}
                {item.name === "Services" && (
                  <IconBriefcase className="h-5 w-5 text-white" />
                )}
                {item.name === "Tech Stack" && (
                  <IconCode className="h-5 w-5 text-white" />
                )}
                {item.name === "Projects" && (
                  <IconBriefcase className="h-5 w-5 text-white" />
                )}
                <span className="text-white text-xs font-medium truncate">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div> */}
      </>
    );
  }

  // Desktop navigation - keep it simple
  const desktopNavItems = [
    {
      name: "Home",
      title: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-white" />,
    },
    {
      name: "About",
      title: "About",
      link: "#about",
      icon: <IconUser className="h-4 w-4 text-white" />,
    },
    {
      name: "Services",
      title: "Services",
      link: "#services",
      icon: <IconBriefcase className="h-4 w-4 text-white" />,
    },
    {
      name: "Tech Stack",
      title: "Tech Stack",
      link: "#tech-stack",
      icon: <IconCode className="h-4 w-4 text-white" />,
    },
    {
      name: "Projects",
      title: "Projects",
      link: "#projects",
      icon: <IconBriefcase className="h-4 w-4 text-white" />,
    },
    {
      name: "Contact",
      title: "Contact",
      link: "#contact",
      icon: <IconAddressBook className="h-4 w-4 text-white" />,
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={desktopNavItems} className="p-5" />
    </div>
  );
}
