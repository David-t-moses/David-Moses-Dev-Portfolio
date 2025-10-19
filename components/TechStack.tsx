"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function TechStack() {
  const [hoveredId, setHoveredId] = useState(null);

  const technologies = [
    {
      id: 1,
      name: "TypeScript",
      description: "Well experienced in TypeScript for type-safe development",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      className: "md:col-span-2" // Large card
    },
    {
      id: 2,
      name: "Git & GitHub",
      description: "Proficient with version control and collaboration",
      logo: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png",
      logo2: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
      gradient: "from-orange-500 to-red-500",
      bgColor: "bg-white",
      className: "md:col-span-1" // Small card
    },
    {
      id: 3,
      name: "TailwindCSS",
      description: "Expert in utility-first CSS framework",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
      gradient: "from-cyan-500 to-teal-500",
      bgColor: "bg-white",
      className: "md:col-span-1" // Small card
    },
    {
      id: 4,
      name: "Next.js",
      description: "Expert in building fullstack web applications with Next.js",
      logo: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png",
      gradient: "from-gray-800 to-gray-900",
      bgColor: "bg-white",
      className: "md:col-span-2" // Large card
    },
    {
      id: 5,
      name: "Node.js",
      description: "Strong expertise in building scalable backend applications and APIs",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
      gradient: "from-green-600 to-green-700",
      bgColor: "bg-white",
      className: "md:col-span-3" // Extra large card
    },
    {
      id: 6,
      name: "React",
      description: "Building dynamic user interfaces with React",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      gradient: "from-cyan-400 to-blue-500",
      bgColor: "bg-gray-900",
      className: "md:col-span-1" // Small card
    },
    {
      id: 7,
      name: "Prisma",
      description: "Modern database toolkit and ORM",
      logo: "https://cdn.worldvectorlogo.com/logos/prisma-3.svg",
      gradient: "from-indigo-600 to-purple-600",
      bgColor: "bg-slate-900",
      className: "md:col-span-1" // Small card
    },
    {
      id: 8,
      name: "Docker",
      description: "Containerization and deployment",
      logo: "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png",
      gradient: "from-blue-600 to-blue-700",
      bgColor: "bg-white",
      className: "md:col-span-1" // Small card
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section id="techstack" className="relative min-h-screen overflow-hidden bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950">
      {/* Decorative background elements */}
      <div className="absolute top-40 left-20 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full"></div>
            <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">
              Technologies
            </span>
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            My Tech{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Stack
            </span>
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Leveraging modern technologies to build fast, scalable, and maintainable applications.
          </p>
        </div>

        {/* Bento Grid - Same Layout Structure */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.id}
                className={tech.className}
                variants={itemVariants}
                onHoverStart={() => setHoveredId(tech.id)}
                onHoverEnd={() => setHoveredId(null)}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 shadow-xl hover:shadow-2xl group min-h-[280px] flex flex-col">
                  {/* Animated gradient glow on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}></div>
                  
                  {/* Outer glow effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-br ${tech.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-20`}></div>

                  {/* Logo Container */}
                  <div className={`${tech.bgColor} p-8 flex items-center justify-center flex-1 relative overflow-hidden`}>
                    {/* Animated particles on hover */}
                    {hoveredId === tech.id && (
                      <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${tech.gradient}`}
                            initial={{ 
                              x: Math.random() * 100 + "%", 
                              y: Math.random() * 100 + "%",
                              scale: 0 
                            }}
                            animate={{ 
                              scale: [0, 1, 0],
                              x: [null, Math.random() * 100 + "%"],
                              y: [null, Math.random() * 100 + "%"]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.2 
                            }}
                          />
                        ))}
                      </motion.div>
                    )}

                    {/* Logo(s) */}
                    {tech.logo2 ? (
                      <div className="flex items-center gap-6 relative z-10">
                        <motion.img
                          src={tech.logo}
                          alt={tech.name}
                          className="w-16 h-16 md:w-20 md:h-20 object-contain"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                        />
                        <motion.img
                          src={tech.logo2}
                          alt={tech.name}
                          className="w-16 h-16 md:w-20 md:h-20 object-contain"
                          whileHover={{ rotate: -5, scale: 1.1 }}
                        />
                      </div>
                    ) : (
                      <motion.img
                        src={tech.logo}
                        alt={tech.name}
                        className="w-20 h-20 md:w-24 md:h-24 object-contain relative z-10"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}

                    {/* Corner shine effect */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Text Content */}
                  <div className="p-6 relative z-10 bg-gradient-to-b from-transparent to-slate-900/50">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
                      {tech.name}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {tech.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tech.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-500">
            Constantly learning and exploring new technologies to stay ahead of the curve
          </p>
        </motion.div>
      </div>
    </section>
  );
}