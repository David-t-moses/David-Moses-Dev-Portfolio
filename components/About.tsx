"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const sections = [
    {
      id: 1,
      number: "01",
      title: "My Approach",
      subtitle: "The Foundation",
      description:
        "I build with intention — balancing design aesthetics with technical precision. Each line of code serves the goal of creating seamless, human-centered digital experiences that connect emotionally and perform beautifully.",
      emoji: "⚡",
      color: "indigo",
      gradient: "from-indigo-500 to-purple-500",
      stats: [
        { label: "Years of Experience", value: "5+" },
        { label: "Projects Completed", value: "50+" },
        { label: "Client Satisfaction", value: "100%" },
      ],
      position: "left" // line on left
    },
    {
      id: 2,
      number: "02",
      title: "How I Work",
      subtitle: "The Process",
      description:
        "Every project begins with understanding your goals. Through clear communication and iteration, I move from discovery to deployment with precision — ensuring your website looks great, performs fast, and scales effortlessly.",
      emoji: "🎯",
      color: "cyan",
      gradient: "from-cyan-500 to-blue-500",
      steps: [
        "Discovery & Strategy",
        "Wireframes & Design",
        "Development",
        "Testing & QA",
        "Launch & Support",
      ],
      position: "right" // line on right
    },
    {
      id: 3,
      number: "03",
      title: "Real Results",
      subtitle: "The Outcome",
      description:
        "Your success defines mine. Every site I deliver is optimized for performance, accessibility, and conversion — designed not just to look good, but to grow your business and make an impact.",
      emoji: "✨",
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
      features: [
        "High Performance & SEO",
        "Conversion-Focused UX",
        "Scalable Architecture",
        "Continuous Optimization",
      ],
      position: "left" // centered with line on left
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index!);
            setActiveSection(index);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-50% 0px -50% 0px" }
    );

    const sectionElements = document.querySelectorAll(".content-section");
    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950"
      id="about"
    >
      {/* Subtle decorative elements matching Hero */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-tr from-indigo-500/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full"></div>
            <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase">
              About me
            </span>
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Building with{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Purpose & Precision
            </span>
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            I believe great websites go beyond visuals — they're built on strategy, empathy, and performance. That's what I bring to every project.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-48 md:space-y-64" ref={containerRef}>
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              data-index={index}
              className={`content-section relative min-h-[60vh] flex items-center ${
                section.position === "right" 
                  ? "justify-end" 
                  : section.position === "center-left" 
                  ? "justify-center" 
                  : ""
              }`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Vertical Line - Position based on section */}
              <div 
                className={`absolute top-0 bottom-0 w-0.5 bg-gradient-to-b ${section.gradient} ${
                  section.position === "left" 
                    ? "left-8 md:left-16" 
                    : section.position === "right" 
                    ? "right-8 md:right-16" 
                    : "left-8 md:left-1/4"
                }`}
              ></div>

              {/* Content */}
              <div className={`w-full ${
                section.position === "left" 
                  ? "ml-24 md:ml-32 max-w-3xl" 
                  : section.position === "right" 
                  ? "mr-24 md:mr-32 max-w-3xl text-right" 
                  : "max-w-2xl ml-24 md:ml-32"
              }`}>
                {/* Section number background */}
                <div
                  className={`text-[80px] md:text-[140px] font-extrabold bg-gradient-to-br ${section.gradient} bg-clip-text text-transparent opacity-10 leading-none mb-4`}
                >
                  {section.number}
                </div>

                <div
                  className={`inline-block px-4 py-1.5 rounded-full bg-${section.color}-500/10 border border-${section.color}-500/30 text-${section.color}-400 text-xs font-semibold uppercase tracking-wider mb-6`}
                >
                  {section.subtitle}
                </div>

                <h3 className="text-xl md:text-4xl font-bold text-white mb-6 tracking-tight leading-tight">
                  {section.title}
                </h3>

                <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-10">
                  {section.description}
                </p>

                {/* Stats */}
                {section.stats && (
                  <div className={`flex flex-wrap gap-4 mt-10 ${section.position === "right" ? "justify-end" : ""}`}>
                    {section.stats.map((stat, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className={`px-5 py-2 rounded-xl bg-white/5 border border-${section.color}-500/20 text-gray-300 text-sm md:text-base font-medium hover:bg-white/10 transition-all cursor-default`}
                      >
                        {stat.label}
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Steps */}
                {section.steps && (
                  <div className={`flex flex-wrap gap-3 ${section.position === "right" ? "justify-end" : ""}`}>
                    {section.steps.map((step, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className={`px-5 py-2.5 rounded-xl bg-white/5 border border-${section.color}-500/20 text-gray-300 text-sm font-medium hover:bg-white/10 transition-all`}
                      >
                        {step}
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Features */}
                {section.features && (
                  <div className="space-y-4">
                    {section.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-4 group"
                      >
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${section.gradient} group-hover:scale-150 transition-transform`}
                        />
                        <span className="text-base md:text-lg text-gray-300 group-hover:text-white transition-colors">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}

                <div
                  className={`mt-12 h-1 w-32 bg-gradient-to-r ${section.gradient} rounded-full ${section.position === "right" ? "ml-auto" : ""}`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-40"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Build Something Great Together?
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto text-base md:text-lg">
              Let's collaborate to bring your ideas to life — with clean design,
              solid code, and results that last.
            </p>
            <Link href="/#contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/40 transition-all"
            >
              Get In Touch →
            </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}