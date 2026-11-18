"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
  },
];

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const reduce = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(129, 140, 248, 0.14), transparent 75%)`;

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.08, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      className="group/svc relative flex list-none flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_22px_50px_-34px_rgba(0,0,0,0.9)] transition-colors duration-300 hover:border-white/20 md:p-7"
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/svc:opacity-100"
        style={{ background: spotlight }}
      />
      <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-indigo-500/10 blur-2xl" />

      <div className="relative flex items-start justify-between">
        <div className="h-12 w-12 rounded-xl border border-white/10 bg-white/5 p-3 text-indigo-300 transition-colors duration-300 group-hover/svc:border-indigo-300/40 group-hover/svc:bg-indigo-400/10">
          {service.icon}
        </div>
      </div>

      <h3 className="relative mt-6 text-xl text-white md:text-[22px]">{service.title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-slate-300 md:text-[15px]">{service.description}</p>

      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-indigo-400 via-violet-400 to-transparent transition-transform duration-700 ease-out group-hover/svc:scale-x-100" />
    </motion.li>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28"
    >
      <div className="relative z-10 mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* Intro: stays in view beside the list on desktop */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs tracking-wide text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            Open to new projects
          </div>
          <h2 className="mt-6 text-balance text-4xl leading-[1.1] tracking-tight text-white md:text-5xl">
            What I can <span className="text-indigo-300">build for you.</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300">
            From a first website to a full product, I handle the design, the code and the launch, so you deal with one person from start to finish.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="#contact" className="btn-compact btn-compact-light gap-2 px-5">
              Start a project
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href="https://calendly.com/davidtmoses5/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-compact btn-compact-ghost px-5"
            >
              Book a call
            </a>
          </div>
        </div>

        <ul aria-label="Services" className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 md:gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
