"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Terminal, ArrowRight, Code2, Cpu, Globe, Smartphone, ShoppingBag, Palette, Zap } from "lucide-react";
import Link from "next/link";

const technologies = [
  {
    id: 1,
    title: "Next.js & React",
    description: "Expertise in building fast full stack applications with SSR and ISR.",
    icon: <Code2 />,
    gradient: "from-zinc-400 to-zinc-600",
    colSpan: "md:col-span-2",
    level: "98%"
  },
  {
    id: 2,
    title: "TypeScript",
    description: "Enforcing type safety for scalable and maintainable enterprise codebases.",
    icon: <Cpu />,
    gradient: "from-blue-500 to-indigo-500",
    colSpan: "md:col-span-1",
    level: "92%"
  },
  {
    id: 3,
    title: "React Native",
    description: "Developing seamless cross platform mobile experiences for iOS and Android.",
    icon: <Smartphone />,
    gradient: "from-cyan-400 to-blue-500",
    colSpan: "md:col-span-1",
    level: "88%"
  },
  {
    id: 4,
    title: "Node.js & Backend",
    description: "Architecting robust APIs and server-side logic using modern runtime environments.",
    icon: <Globe />,
    gradient: "from-green-500 to-emerald-600",
    colSpan: "md:col-span-2",
    level: "90%"
  },
  {
    id: 5,
    title: "Ecommerce Platforms",
    description: "Specialized in Shopify and WooCommerce for retail that converts.",
    icon: <ShoppingBag />,
    gradient: "from-purple-500 to-pink-500",
    colSpan: "md:col-span-1",
    level: "95%"
  },
  {
    id: 6,
    title: "Design & CMS",
    description: "Bridging the gap between Figma designs and live Webflow deployments.",
    icon: <Palette />,
    gradient: "from-orange-500 to-red-500",
    colSpan: "md:col-span-2",
    level: "90%"
  },
];

function TechCard({ tech }: { tech: (typeof technologies)[0] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-sm p-8 transition-all duration-500 hover:border-white/20 ${tech.colSpan}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.05),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className={`mb-6 inline-flex rounded-2xl bg-gradient-to-br ${tech.gradient} p-0.5 shadow-lg`}>
            <div className="flex rounded-[14px] bg-slate-950 p-3 text-white">
              {React.cloneElement(tech.icon as React.ReactElement, { size: 24 })}
            </div>
          </div>

          <h3 className="mb-3 text-2xl text-white tracking-tight">
            {tech.title}
          </h3>
          <p className="max-w-[320px] text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
            {tech.description}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Proficiency_Level
            </span>
            <span className="text-white font-medium text-sm">{tech.level}</span>
          </div>
          <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${tech.gradient} opacity-50 group-hover:w-24 group-hover:opacity-100 transition-all duration-700`}></div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 px-6 py-32" id="techstack">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Centered Header Section */}
        <div className="mb-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5"
          >
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-indigo-400">
              Engine Room // Infrastructure
            </span>
          </motion.div>
          
          <h2 className="text-4xl text-white md:text-6xl tracking-tighter mb-6 leading-none">
            Tech Stack & <span className="text-indigo-300 italic">Core Tools.</span>
          </h2>
          
          <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
            I leverage a specialized selection of modern frameworks and platforms to build fast, dependable digital products that scale with your business.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {technologies.map((tech) => (
            <TechCard key={tech.id} tech={tech} />
          ))}
        </div>

       {/* --- NEW TECH CTA --- */}
        <div className="mt-20 relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-indigo-600/5 backdrop-blur-3xl border border-white/5 rounded-2xl"></div>
          
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                <Cpu className="animate-pulse" size={32} />
              </div>
              <div>
                <h4 className="text-xl text-white mb-1">Custom Architecture Needed?</h4>
                <p className="text-slate-400 text-sm">I can adapt to your specific enterprise stack or legacy system requirements.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <a 
                href="#contact" 
                className="btn-compact btn-compact-indigo gap-2 px-5 flex-1 md:flex-none"
              >
                Start Build
                <Zap size={14} fill="currentColor" />
              </a>
              {/* <a 
                href="https://github.com" 
                target="_blank"
                className="p-4 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <ExternalLink size={20} />
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}