"use client";

// Pictures and moving drawings are in components/archive (Services*.tsx, latest ServicesCardsSimpleVisuals.tsx).
// This version has no images: each card is type led.

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const [sel, setSel] = useState(0);
  const cur = items[sel];
  const curRgb = cur.ai ? "139, 92, 246" : "99, 102, 241";

  return (
    <section id="services" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-12 md:text-5xl">
          What you can stop worrying about.
        </h2>

        {/* One big card. Pick a service on the left; it opens large on the right. */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0c1130] shadow-[0_40px_100px_-50px_rgba(0,0,0,0.9)]"
        >
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="grid lg:min-h-[560px] lg:grid-cols-[minmax(300px,0.42fr)_1fr]">
            {/* The list */}
            <ul className="relative m-0 list-none p-3 md:p-4 lg:border-r lg:border-white/10 lg:p-5">
              {items.map((it, i) => {
                const rgb = it.ai ? "139, 92, 246" : "99, 102, 241";
                const on = i === sel;
                return (
                  <li key={it.name} className={`list-none ${i === 4 ? "mt-3 border-t border-white/10 pt-3" : ""}`}>
                    <button
                      type="button"
                      onClick={() => setSel(i)}
                      onMouseEnter={() => setSel(i)}
                      onFocus={() => setSel(i)}
                      aria-expanded={on}
                      className={`relative flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300 ${on ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"}`}
                    >
                      <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full transition-all duration-300" style={{ background: `rgb(${rgb})`, opacity: on ? 1 : 0, height: on ? 24 : 8 }} />
                      <span className={`text-[19px] leading-tight tracking-[-0.01em] transition-colors duration-300 md:text-[21px] ${on ? "text-white" : "text-slate-400"}`}>{it.name}</span>
                      <ArrowRight size={18} aria-hidden="true" className={`hidden shrink-0 transition-all duration-300 lg:block ${on ? "translate-x-0 text-white opacity-100" : "-translate-x-1 text-slate-500 opacity-0"}`} />
                      <span aria-hidden="true" className={`shrink-0 text-xl leading-none text-slate-400 transition-transform duration-300 lg:hidden ${on ? "rotate-45" : ""}`}>+</span>
                    </button>

                    {/* Phones and tablets: the detail opens right under the row */}
                    <div className={`grid overflow-hidden transition-[grid-template-rows] duration-500 lg:hidden ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="min-h-0 overflow-hidden">
                        <div className="px-5 pb-5 pt-2">
                          <p className="text-[15px] leading-relaxed text-slate-300">{it.body}</p>
                          <ul className="m-0 mt-4 list-none divide-y divide-white/10 border-y border-white/10 p-0">
                            {it.gets.map((g) => (
                              <li key={g} className="flex items-center gap-3 py-3 text-[15px] text-slate-200">
                                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: `rgb(${rgb})` }} />
                                {g}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* The detail, large (desktop) */}
            <div className="relative hidden overflow-hidden lg:block" aria-live="polite">
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 transition-all duration-700" style={{ backgroundImage: `radial-gradient(ellipse 80% 70% at 85% 0%, rgba(${curRgb}, 0.34), transparent 65%), radial-gradient(ellipse 60% 50% at 0% 100%, rgba(${curRgb}, 0.16), transparent 70%)` }} />
              <span aria-hidden="true" className="scene-grid pointer-events-none absolute inset-0 opacity-40" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={sel}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="relative flex h-full flex-col justify-between p-12"
                >
                  <div>
                    <h3 className="text-[48px] leading-[1.04] tracking-[-0.025em] text-white">{cur.name}</h3>
                    <p className="mt-5 max-w-md text-[19px] leading-relaxed text-slate-300">{cur.body}</p>
                  </div>
                  <ul className="m-0 mt-10 list-none divide-y divide-white/10 border-y border-white/10 p-0">
                    {cur.gets.map((g) => (
                      <li key={g} className="flex items-center gap-4 py-4 text-[19px] text-slate-100">
                        <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full" style={{ background: `rgb(${curRgb})`, boxShadow: `0 0 12px 1px rgba(${curRgb}, 0.8)` }} />
                        {g}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

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
