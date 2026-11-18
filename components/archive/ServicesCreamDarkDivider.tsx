"use client";

// Earlier versions (pictures, glass stage, bento and more) are in components/archive (Services*.tsx).
// This one is deliberately plain: solid surfaces, type, no glow, no gradients, no illustrations.

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Item = { name: string; body: string; eg: string; ai?: boolean };

// Build work on cream cards, AI work on dark cards. "For example" lines are illustrations of use, not claims.
const items: Item[] = [
  { name: "Websites and apps", body: "Business sites, online stores and web apps that turn visitors into customers.", eg: "Like an online store with secure checkout." },
  { name: "Mobile apps", body: "Native apps for iOS and Android, built once and shipped to both.", eg: "Like a visitor access app with QR links and calls." },
  { name: "Integrations and APIs", body: "Payments, CRMs and messaging connected into one smooth flow.", eg: "Like orders reaching your CRM and WhatsApp." },
  { name: "Speed and search", body: "Fast pages, found on search, and kept updated and secure.", eg: "Like a site that loads fast and ranks for what you sell." },
  { name: "AI assistants", body: "Chat that answers your customers from your own content.", eg: "Like answering shipping questions at midnight.", ai: true },
  { name: "Workflow automation", body: "Repetitive work handled quietly in the background.", eg: "Like enquiries sorted, logged and replied to.", ai: true },
  { name: "AI in your product", body: "Smart search, summaries and recommendations built in.", eg: "Like a dashboard that tells you what changed.", ai: true },
  { name: "Smart documents", body: "Answers from your PDFs, emails and records, with sources.", eg: "Like asking a contract about its notice period.", ai: true },
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
              className={`group/t flex min-h-[300px] list-none flex-col justify-between rounded-[28px] p-7 transition-transform duration-300 hover:-translate-y-1 md:p-8 ${
                it.ai ? "border border-white/10 bg-[#10163a] text-white" : "bg-[#ece7dc] text-[#14183a]"
              }`}
            >
              <div>
                <h3 className="text-[30px] leading-[1.05] tracking-[-0.02em]">{it.name}</h3>
                <p className={`mt-4 text-[15px] leading-[1.6] ${it.ai ? "text-slate-300" : "text-[#3d4263]"}`}>{it.body}</p>
              </div>
              <p className={`mt-8 border-t pt-4 text-[14px] leading-snug ${it.ai ? "border-white/15 text-slate-400" : "border-[#14183a]/15 text-[#4a4f72]"}`}>{it.eg}</p>
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
