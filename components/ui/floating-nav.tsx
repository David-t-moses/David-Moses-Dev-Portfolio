"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string; // use #sectionID format for single-page nav
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // --- Show/hide nav on scroll ---
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) setVisible(true);
        else setVisible(false);
      }
    }
  });

  // --- Track active section ---
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 } // triggers when half of a section is visible
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={cn(
          "fixed top-6 inset-x-0 mx-auto z-[5000] max-w-fit",
          className
        )}
      >
        {/* Gradient glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

        {/* Nav container */}
        <nav className="relative backdrop-blur-2xl bg-slate-900/80 border border-white/10 rounded-2xl px-6 py-3 shadow-2xl">
          <ul className="flex items-center gap-1">
            {navItems.map((navItem, idx) => {
              const sectionId = navItem.link.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <li key={`link=${idx}`}>
                  <a
                    href={navItem.link}
                    className="relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group block"
                  >
                    {/* Active background */}
                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/30"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Hover effect */}
                    <span className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

                    {/* Icon for mobile */}
                    {navItem.icon && (
                      <span className="block sm:hidden relative" title={navItem.name}>
                        {navItem.icon}
                      </span>
                    )}

                    {/* Text */}
                    <span
                      className={cn(
                        "hidden sm:block relative transition-colors duration-300",
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-white"
                      )}
                    >
                      {navItem.name}
                    </span>

                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </motion.div>
    </AnimatePresence>
  );
};
