"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ArrowDown, ArrowUp, Plus } from "lucide-react";

export default function Projects() {
  // States: 0 = Initial (3), 1 = Expanded (9), 2 = All
  const [displayState, setDisplayState] = useState(0);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const projectsData = [
    {
      src: "/attune.png", // Ensure you have these assets
      alt: "Attune AI Assistant",
      title: "Attune AI",
      subtitle: "AI SaaS Landing",
      link: "https://attune-zeta.vercel.app",
      desc: "An intelligent SaaS landing and waitlist page for an AI email and meeting assistant designed to optimize executive workflows.",
      tags: ["Next.js", "TypeScript", "Tailwind"],
    },
   
    {
      src: "/usapeptides.png",
      alt: "USA Peptides",
      title: "USA Peptides",
      subtitle: "E-commerce Store",
      link: "https://usapeptides.shop",
      desc: "A high-performance e-commerce solution built for a US-based peptide supplier, optimized for conversion and secure browsing.",
      tags: ["WooCommerce", "Elementor", "WordPress"],
    },
     {
      src: "/lydiaesenam.png",
      alt: "Lydia Esenam Personal Brand",
      title: "Lydia Esenam",
      subtitle: "Education Consultant",
      link: "https://lydiaesenam.ca/",
      desc: "Personal branding platform for a leading Canadian education consultant.",
      tags: ["Next.js", "TypeScript", "Tailwind"],
    },
    {
      src: "/housing.png",
      alt: "Eastern Housing Agency",
      title: "Eastern Housing",
      subtitle: "Real Estate Platform",
      link: "https://easternhousingagency.com",
      desc: "Full-scale housing platform with a complex admin dashboard for property listings, user management, and traffic analytics.",
      tags: ["Next.js", "Neon Postgres", "Prisma", "Tailwind"],
    },
     {
      src: "/pharma.png",
      alt: "Pharma Medtech Platform",
      title: "Pharma Medtech",
      subtitle: "Healthcare Platform",
      link: "https://pharma-medtech.onrender.com/",
      desc: "Healthcare innovation platform featuring real-time collaboration powered by Socket.io.",
      tags: ["Next.js", "Socket.io", "Postgresql"],
    },
    {
      src: "/peacenwankpa.png",
      alt: "Peace Nwankpa Portfolio",
      title: "Peace Nwankpa",
      subtitle: "Content Writer Portfolio",
      link: "https://www.peacenwankpa.info",
      desc: "A professional writer's hub featuring a custom CMS/Admin panel to manage services, reviews, and project portfolios.",
      tags: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
    },
    {
      src: "/kingdom.png",
      alt: "Kingdom Pet Care",
      title: "Kingdom Pet",
      subtitle: "Webflow Development",
      link: "https://kingdom-pet-supplements.webflow.io",
      desc: "A modern, responsive homepage designed for a premium pet supplement brand, focusing on brand storytelling and product trust.",
      tags: ["Webflow", "UI/UX", "Branding"],
    },
   
    {
      src: "/cloudesports-tokens.png",
      alt: "CloudeSports Tokens Platform",
      title: "CloudeSports Tokens",
      subtitle: "Gaming Platform",
      link: "https://cloudesports-tokens.vercel.app/",
      desc: "Competitive gaming-finance platform where Fortnite players wager tokens for prizes.",
      tags: ["React", "Next.js", "Framer Motion"],
    },
    {
      src: "/horizon.jpg",
      alt: "horizon img",
      title: "Horizon Banking",
      subtitle: "Banking System",
      link: "https://horizon-banking-system-jet.vercel.app/",
      desc: "Secure online banking platform with real-time transaction tracking.",
      tags: ["React", "Plaid API", "Node.js"],
    },
    {
        src: "/nokless.png",
        alt: "Nokless Smart Security",
        title: "Nokless Security",
        subtitle: "SaaS Platform",
        link: "https://nokless.vercel.app/",
        desc: "Smart security landing page showcasing AI monitoring.",
        tags: ["React", "Next.js", "Framer Motion"],
      },
  ];

  // Logic: 0 -> show 3, 1 -> show 9, 2 -> show all
  const getDisplayedProjects = () => {
    if (displayState === 0) return projectsData.slice(0, 3);
    if (displayState === 1) return projectsData.slice(0, 9);
    return projectsData;
  };

  const displayedProjects = getDisplayedProjects();

  const handleToggle = () => {
    setIsTransitioning(true);

    if (displayState === 2) {
      // Logic for "See Less" -> Reset to 3 and scroll up
      setDisplayState(0);
      setTimeout(() => {
        projectsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } else {
      // Logic for 3 -> 9 or 9 -> All
      setDisplayState((prev) => prev + 1);
    }

    setTimeout(() => setIsTransitioning(false), 800);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  return (
    <section ref={projectsRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-32" id="projects">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Centered Header Section */}
        <div className="mb-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5"
          >
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-indigo-400">
              Selected Works // Portfolio
            </span>
          </motion.div>
          
          <h2 className="text-4xl font-bold text-white md:text-6xl tracking-tighter mb-6 leading-none">
            Case <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent italic">Studies.</span>
          </h2>
          
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            A curated selection of digital products, ranging from AI-powered SaaS platforms to high-performance e-commerce ecosystems and custom enterprise solutions.
          </p>
        </div>

        <LayoutGroup>
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project) => (
                <motion.div
                  key={project.link}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-colors duration-500"
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <div className="h-52 overflow-hidden bg-slate-900">
                      <img src={project.src} alt={project.alt} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-6">
                      <p className="text-indigo-400 text-[10px] font-mono uppercase tracking-widest mb-2">{project.subtitle}</p>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">{project.title}</h3>
                      <p className="text-slate-400 text-sm mb-6 line-clamp-2">{project.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-[10px] text-slate-300 bg-white/5 px-2 py-1 rounded-md border border-white/5">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Dynamic Multi-Step Button */}
        <div className="mt-20 flex justify-center gap-4">
          <motion.button
            onClick={handleToggle}
            disabled={isTransitioning}
            className="flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-all active:scale-95 disabled:opacity-50"
          >
            {displayState === 0 && (
              <>
                <span>Show More</span>
                <Plus size={18} />
              </>
            )}
            {displayState === 1 && (
              <>
                <span>View Everything</span>
                <ArrowDown size={18} />
              </>
            )}
            {displayState === 2 && (
              <>
                <span>Show Less</span>
                <ArrowUp size={18} />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </section>
  );
}