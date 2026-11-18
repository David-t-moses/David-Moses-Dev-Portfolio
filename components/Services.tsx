"use client";

// Earlier versions (pictures, glass stage, bento and more) are in components/archive (Services*.tsx).
// This one is deliberately plain: solid surfaces, type, no glow, no gradients, no illustrations.

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Item = { name: string; body: string; ai?: boolean };

// Build work on cream cards, AI work on dark cards.
const items: Item[] = [
  { name: "Websites and apps", body: "Business sites, online stores and web apps that turn visitors into customers." },
  { name: "Mobile apps", body: "Native apps for iOS and Android, built once and shipped to both." },
  { name: "Integrations and APIs", body: "Payments, CRMs and messaging connected into one smooth flow." },
  { name: "Speed and search", body: "Fast pages, found on search, and kept updated and secure." },
  { name: "AI assistants", body: "Chat that answers your customers from your own content.", ai: true },
  { name: "Workflow automation", body: "Repetitive work handled quietly in the background.", ai: true },
  { name: "AI in your product", body: "Smart search, summaries and recommendations built in.", ai: true },
  { name: "Smart documents", body: "Answers from your PDFs, emails and records, with sources.", ai: true },
];

export default function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-12 md:text-5xl">
          What you can stop worrying about.
        </h2>

        <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 md:gap-4 xl:grid-cols-4">
          {items.map((it, i) => (
            <motion.li
              key={it.name}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.07, ease: "easeOut" }}
              className={`group/t flex list-none flex-col rounded-[24px] p-5 transition-transform duration-300 hover:-translate-y-1 md:rounded-[28px] md:p-8 md:pb-9 ${
                it.ai ? "border border-white/10 bg-[#10163a] text-white" : "bg-[#ece7dc] text-[#14183a]"
              }`}
            >
              <div>
                <h3 className="text-[22px] leading-[1.1] tracking-[-0.02em] md:text-[30px] md:leading-[1.05]">{it.name}</h3>
                <p className={`mt-2.5 text-[14.5px] leading-[1.55] md:mt-4 md:text-[15px] md:leading-[1.6] ${it.ai ? "text-slate-300" : "text-[#3d4263]"}`}>{it.body}</p>
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
          className="relative mx-auto mt-14 flex max-w-4xl flex-col items-center text-center md:mt-20"
        >
          <h3 className="text-balance text-2xl leading-[1.25] tracking-tight text-slate-100 md:whitespace-nowrap md:text-[30px]">Do you care about scalable, revenue driven builds?</h3>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
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
