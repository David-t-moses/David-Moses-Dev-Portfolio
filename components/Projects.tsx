"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const projectsData = [
    {
    src: "/pharma.png",
    alt: "Pharma Medtech Platform",
    title: "Pharma Medtech",
    subtitle: "Healthcare Platform",
    link: "https://pharma-medtech.onrender.com/",
    desc: "A modern healthcare platform built for medical innovation, featuring real-time collaboration powered by Socket.io and smooth interactions via Framer Motion.",
    tags: ["Next.js", "Socket.io", "Postgresql"],
  },
  {
    src: "/lydiaesenam.png",
    alt: "Lydia Esenam Personal Brand",
    title: "Lydia Esenam",
    subtitle: "Education Consultant",
    link: "https://lydiaesenam.ca/",
    desc: "A sophisticated personal branding platform for a leading Canadian education consultant specializing in international student placements.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    src: "/DTM-Tech-Solutions.png",
    alt: "DTM Tech Solutions Preview",
    title: "DTM Tech Solutions",
    subtitle: "IT Consultancy",
    link: "https://dtmtechsolutions.vercel.app/",
    desc: "A cutting-edge IT consultancy website built with Next.js, featuring dynamic service pages, case studies, and interactive tech demos.",
    tags: ["React", "Next.js", "Framer Motion"],
  },
  {
    src: "/cloudesports-tokens.png",
    alt: "CloudeSports Tokens Platform",
    title: "CloudeSports Tokens",
    subtitle: "Gaming Platform",
    link: "https://cloudesports-tokens.vercel.app/",
    desc: "A competitive gaming-finance platform where Fortnite players wager tokens for real cash prizes.",
    tags: ["React", "Next.js", "Framer Motion"],
  },
  {
    src: "/horizon.jpg",
    alt: "horizon img",
    title: "Horizon Banking",
    subtitle: "Banking System",
    link: "https://horizon-banking-system-jet.vercel.app/",
    desc: "A secure online banking platform with real-time transaction tracking and multi-account management.",
    tags: ["React", "Plaid API", "Node.js"],
  },
  {
    src: "/nokless.png",
    alt: "Nokless Smart Security",
    title: "Nokless Security",
    subtitle: "SaaS Platform",
    link: "https://nokless.vercel.app/",
    desc: "A smart security SaaS landing page showcasing AI-powered visitor monitoring and remote access control.",
    tags: ["React", "Next.js", "Framer Motion"],
  },
];

  const displayedProjects = showAll ? projectsData : projectsData.slice(0, 3);

  const handleToggle = async () => {
    setIsTransitioning(true);

    if (showAll) {
      setTimeout(() => {
        projectsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);
    }

    setShowAll(!showAll);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1800);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      y: -60,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={projectsRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950"
      id="projects"
    >
      {/* Decorative background elements */}
      <div className="absolute top-40 right-20 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full"></div>
            <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">
              Projects
            </span>
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Some Latest{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Crafting digital experiences that drive results and delight users across industries.
          </p>
        </div>

        {/* Projects Grid */}
        <LayoutGroup>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            layout
          >
            <AnimatePresence mode="sync">
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={itemVariants}
                  layout
                  layoutId={`project-${project.title}`}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="group"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <motion.div
                      whileHover={{ y: -12 }}
                      transition={{ duration: 0.3 }}
                      className="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 shadow-xl hover:shadow-2xl"
                    >
                      {/* Gradient glow on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Image Container */}
                      <div className="relative h-56 overflow-hidden bg-slate-800">
                        <img
                          src={project.src}
                          alt={project.alt}
                          className="w-full h-full object-top transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                        
                        {/* Overlay icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 relative z-10">
                        <div className="mb-3">
                          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
                            {project.title}
                          </h3>
                          <p className="text-sm text-indigo-400 font-medium">
                            {project.subtitle}
                          </p>
                        </div>

                        <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3 group-hover:text-gray-300 transition-colors">
                          {project.desc}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-gray-300 group-hover:bg-white/10 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom accent */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </motion.div>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Show More/Less Button */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.button
            onClick={handleToggle}
            disabled={isTransitioning}
            className={`px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 flex items-center gap-2 ${
              isTransitioning ? "opacity-75 cursor-not-allowed" : ""
            }`}
            whileHover={!isTransitioning ? { scale: 1.05 } : {}}
            whileTap={!isTransitioning ? { scale: 0.95 } : {}}
          >
            <span>{showAll ? "Show Less" : "Show More Projects"}</span>
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{
                rotate: showAll ? 180 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}