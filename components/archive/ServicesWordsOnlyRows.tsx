"use client";

// Earlier versions with pictures and motion are in components/archive (Services*.tsx); the last one is
// ServicesOpeningPanels.tsx. This one is words only.

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Eight services. Build work first, then the AI work, as one list.
const items = [
  { name: "Websites and web apps", body: "Sites and stores that turn visitors into customers." },
  { name: "Mobile apps", body: "Native apps for iOS and Android." },
  { name: "Integrations and APIs", body: "Payments, CRMs and messaging connected into one flow." },
  { name: "Speed, search and care", body: "Fast, found on search, kept updated and secure." },
  { name: "AI assistants", body: "Answers customers from your own content.", ai: true },
  { name: "Workflow automation", body: "Repetitive work handled quietly in the background.", ai: true },
  { name: "AI inside your product", body: "Search, summaries and recommendations built in.", ai: true },
  { name: "Document intelligence", body: "Questions answered from your PDFs, emails and records.", ai: true },
];

export default function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-14 md:text-5xl">
          What you can stop worrying about.
        </h2>

        <ul className="m-0 list-none border-t border-white/10 p-0">
          {items.map((it, i) => (
            <motion.li
              key={it.name}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: "easeOut" }}
              className="group/r relative list-none border-b border-white/10"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/r:opacity-100"
                style={{ backgroundImage: `linear-gradient(to right, rgba(${it.ai ? "139, 92, 246" : "99, 102, 241"}, 0.14), transparent 70%)` }}
              />
              <div className="relative grid gap-1 px-1 py-6 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-10 md:px-6 md:py-9">
                <h3 className="text-[26px] leading-[1.1] tracking-[-0.015em] text-white transition-transform duration-300 group-hover/r:translate-x-1.5 md:text-[40px]">{it.name}</h3>
                <p className="text-base leading-relaxed text-slate-400 transition-colors duration-300 group-hover/r:text-slate-200 md:text-lg">{it.body}</p>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* The way in: no card, just the line and two actions */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative mx-auto mt-16 flex max-w-2xl flex-col items-center text-center md:mt-24"
        >
          <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-[min(640px,100vw)] -translate-x-1/2 -translate-y-1/2" style={{ backgroundImage: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(99, 102, 241, 0.16), transparent 100%)" }} />
          <h3 className="text-balance text-4xl leading-[1.1] tracking-tight text-white md:text-5xl">Bring me the problem.</h3>
          <p className="mt-4 text-pretty text-base leading-relaxed text-slate-300 md:text-lg">I will come back with what to build, and what it takes.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="#contact" className="btn-compact btn-compact-light gap-2 px-5">
              Start a project
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a href="https://calendly.com/davidtmoses5/30min" target="_blank" rel="noopener noreferrer" className="btn-compact btn-compact-ghost px-5">
              Book a call
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
