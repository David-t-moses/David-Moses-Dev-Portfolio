"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "01",
    title: "Website Development",
    description: "Custom websites built with modern frameworks, optimized for performance and user experience.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "02",
    title: "Mobile Apps",
    description: "Native and cross platform mobile applications that deliver seamless experiences on any device.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1"/>
        <path d="M12 18H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 6H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "03",
    title: "Ecommerce",
    description: "Complete online stores with secure payments and strategies that turn visitors into customers.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <circle cx="9" cy="21" r="1" fill="currentColor"/>
        <circle cx="20" cy="21" r="1" fill="currentColor"/>
        <path d="M1 1H5L7.68 14.39C7.77 14.82 8.16 15.13 8.6 15.13H19.4C19.84 15.13 20.23 14.82 20.32 14.39L23 6H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1"/>
      </svg>
    ),
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "04",
    title: "CMS Solutions",
    description: "Simple CMS solutions that empower you to manage content without technical knowledge.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1"/>
        <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 21V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "05",
    title: "SEO Strategy",
    description: "Strategic SEO implementation to boost visibility, drive organic traffic, and improve rankings.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M22 12L18 8L13 13L9 9L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 8H22V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="8" r="6" fill="currentColor" fillOpacity="0.1"/>
      </svg>
    ),
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "06",
    title: "Maintenance",
    description: "Ongoing support, updates, and monitoring to keep your site secure, fast, and smooth.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M14.7 6.3C15.1 5.9 15.1 5.3 14.7 4.9L13.1 3.3C12.7 2.9 12.1 2.9 11.7 3.3L10.3 4.7L13.3 7.7L14.7 6.3Z" fill="currentColor" fillOpacity="0.2"/>
        <path d="M9 6L3 12V16L7 20H11L17 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.3 4.7L2.5 12.5C2.2 12.8 2 13.2 2 13.6V16.4C2 16.8 2.2 17.2 2.5 17.5L6.5 21.5C6.8 21.8 7.2 22 7.6 22H10.4C10.8 22 11.2 21.8 11.5 21.5L19.3 13.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    gradient: "from-indigo-500 to-purple-500",
  },
];

function ServiceCard({ service }: { service: (typeof services)[0] }) {
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
      className="group relative h-full bg-slate-900/40 backdrop-blur-sm rounded-xl border border-white/5 p-8 transition-all duration-300 hover:bg-slate-900/60 hover:border-white/10"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.05),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-12">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-indigo-400 group-hover:border-indigo-500/50 transition-colors duration-500 w-14 h-14">
            {service.icon}
          </div>
          <span className="font-mono text-xs font-medium text-slate-600 tracking-tighter group-hover:text-indigo-500 transition-colors">
            // {service.id}
          </span>
        </div>

        <h3 className="text-xl text-white mb-3 tracking-tight">
          {service.title}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          {service.description}
        </p>

        <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div className={`absolute top-0 left-0 h-full w-0 bg-gradient-to-r ${service.gradient} group-hover:w-full transition-all duration-700 ease-in-out`}></div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-32" id="services">
      <div className="absolute top-40 right-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-40 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full"></div>
            <span className="text-indigo-400 text-sm font-medium tracking-widest uppercase">
              Expertise
            </span>
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full"></div>
          </div>
          <h2 className="text-4xl md:text-6xl text-white mb-6 tracking-tighter">
            Services & <span className="text-indigo-300 italic">Solutions.</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base">
            Engineered for performance. Designed for impact. Built to scale.
          </p>
        </div>

        {/* 3-Column Uniform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* CTA Footer Section */}
        <div className="mt-32 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-900/50 border border-white/10 backdrop-blur-xl p-8 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-400">Open to new projects</span>
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl text-white tracking-tighter mb-6 leading-tight">
                  Ready to architect <br />
                  <span className="text-indigo-300 italic">your vision?</span>
                </h2>
                
                <p className="text-slate-400 text-lg mb-10 max-w-md">
                  Let&apos;s architect something exceptional. I am open to new projects and happy to talk through yours.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link href="#contact" className="btn-compact btn-compact-light gap-2 px-5">
                    Start Initialization
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  
                  <a 
                    href="https://calendly.com/davidtmoses5/30min" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-compact btn-compact-ghost px-5"
                  >
                    Schedule a Call
                  </a>
                </div>
              </div>

              {/* Terminal Block Visual */}
              <div className="hidden lg:block relative">
                <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full"></div>
                <div className="relative bg-slate-950/80 rounded-2xl border border-white/5 p-8 font-mono text-[13px] leading-relaxed shadow-2xl">
                  <div className="flex gap-1.5 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"></div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-slate-500">// System Check</p>
                    <div className="text-indigo-400 flex justify-between">
                      <span>▸ Frame_Stability:</span>
                      <span className="text-emerald-400">OPTIMIZED</span>
                    </div>
                    <div className="text-indigo-400 flex justify-between">
                      <span>▸ Performance_Score:</span>
                      <span className="text-emerald-400">100/100</span>
                    </div>
                    <div className="text-indigo-400 flex justify-between">
                      <span>▸ Deployment_State:</span>
                      <span className="text-cyan-400">READY</span>
                    </div>
                    <div className="pt-4 border-t border-white/5 mt-4">
                      <p className="text-white animate-pulse">
                        <span className="text-indigo-500">root@portfolio:</span>~ contact --now
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Footer */}
        {/* <footer className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-[10px] font-mono tracking-widest uppercase">
            © 2024 PRECISION_BUILT // ALL SYSTEMS NOMINAL
          </p>
          <div className="flex gap-8">
            {["Github", "LinkedIn", "Twitter"].map((link) => (
              <a 
                key={link} 
                href="#" 
                className="text-slate-500 hover:text-indigo-400 text-[10px] font-mono uppercase tracking-[0.2em] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </footer> */}
      </div>
    </section>
  );
}