"use client";

// Pictures and moving drawings are in components/archive (Services*.tsx, latest ServicesCardsSimpleVisuals.tsx).
// This version has no images: each card is type led.

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Item = { name: string; body: string; gets: string[]; ai?: boolean };

// Eight services. Build work first, then the AI work. Each lists three things you actually get.
const items: Item[] = [
  { name: "Websites and web apps", body: "Sites and stores that turn visitors into customers.", gets: ["Business websites", "Online stores", "Web apps and dashboards"] },
  { name: "Mobile apps", body: "Native apps for iOS and Android.", gets: ["One app for both phones", "Sign in and accounts", "Notifications and updates"] },
  { name: "Integrations and APIs", body: "Your tools connected into one flow.", gets: ["Payments", "CRMs and email", "WhatsApp and messaging"] },
  { name: "Speed, search and care", body: "Fast, found on search, kept updated.", gets: ["Fast on every device", "Ready for search engines", "Updates and security"] },
  { name: "AI assistants", body: "Answers customers from your own content.", gets: ["Chat on your site", "Trained on your pages", "Hands over to you"], ai: true },
  { name: "Workflow automation", body: "Repetitive work handled in the background.", gets: ["Emails sorted and answered", "Data moved between tools", "Alerts to your team"], ai: true },
  { name: "AI inside your product", body: "Search and summaries built in.", gets: ["Smart search", "Summaries and drafts", "Recommendations"], ai: true },
  { name: "Document intelligence", body: "Questions answered from your files.", gets: ["PDFs and contracts", "Emails and records", "Answers with sources"], ai: true },
];

export default function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-12 md:text-5xl">
          What you can stop worrying about.
        </h2>

        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
          {items.map((it, i) => {
            const rgb = it.ai ? "139, 92, 246" : "99, 102, 241";
            return (
              <motion.li
                key={it.name}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: (i % 4) * 0.07, ease: "easeOut" }}
                className="group/t relative flex list-none flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 transition-colors duration-300 hover:border-white/25"
              >
                {/* Colour: a line across the top and a glow in the corner. Indigo is build work, violet is AI. */}
                <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-70 transition-opacity duration-300 group-hover/t:opacity-100" style={{ backgroundImage: `linear-gradient(to right, transparent, rgba(${rgb}, 0.95), transparent)` }} />
                <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-60 blur-3xl transition-opacity duration-500 group-hover/t:opacity-100" style={{ background: `rgba(${rgb}, 0.28)` }} />

                <div className="relative px-6 pb-6 pt-8">
                  <h3 className="text-[26px] leading-[1.1] tracking-[-0.015em] text-white">{it.name}</h3>
                  <p className="mt-3 text-[15px] leading-[1.55] text-slate-400 transition-colors duration-300 group-hover/t:text-slate-300">{it.body}</p>
                </div>

                <ul className="relative m-0 mt-auto list-none p-0">
                  {it.gets.map((g) => (
                    <li key={g} className="flex items-center gap-3 border-t border-white/10 px-6 py-3.5 text-[15px] text-slate-200">
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})` }} />
                      {g}
                    </li>
                  ))}
                </ul>
              </motion.li>
            );
          })}
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
