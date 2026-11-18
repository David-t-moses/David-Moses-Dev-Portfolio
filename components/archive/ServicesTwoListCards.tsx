"use client";

// Earlier version (sticky intro with six cards): components/archive/ServicesStickyIntroCards.tsx

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// Each service is written as the result the client gets, with the service name underneath.
const groups = [
  {
    title: "Websites and software",
    glow: false,
    items: [
      { name: "Websites that convert", body: "Fast, clear sites built to turn visitors into enquiries and sales." },
      { name: "Web apps and dashboards", body: "Customer portals, admin panels and SaaS products, from idea to launch." },
      { name: "Online stores", body: "WooCommerce and custom shops with secure payments." },
      { name: "Mobile apps", body: "Native and cross platform apps for iOS and Android." },
      { name: "Integrations and APIs", body: "Payments, CRMs, messaging and the tools you already use, connected." },
      { name: "Speed, search and care", body: "Pages that load fast, get found, and stay updated and secure." },
    ],
  },
  {
    title: "AI engineering",
    glow: true,
    items: [
      { name: "AI assistants and chatbots", body: "Assistants that answer your customers using your own content." },
      { name: "Workflow automation", body: "Repetitive work handed to AI that runs quietly in the background." },
      { name: "AI inside your product", body: "Search, summaries and recommendations added to what you already have." },
      { name: "Document and data intelligence", body: "PDFs, emails and records turned into answers and reports." },
      { name: "Internal tools for your team", body: "Custom AI helpers that save your people hours every week." },
      { name: "AI audit and roadmap", body: "A clear view of where AI will pay off in your business, and where it will not." },
    ],
  },
];

export default function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-12 md:text-5xl">
          What you can stop worrying about.
        </h2>

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {groups.map((g, gi) => (
            <motion.div
              key={g.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: gi * 0.1, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_14px_36px_-26px_rgba(0,0,0,0.55)] md:p-8"
            >
              {g.glow && (
                <>
                  <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
                  <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent" />
                </>
              )}
              <h3 className="relative text-2xl text-white md:text-[28px]">{g.title}</h3>
              <ul className="relative m-0 mt-5 list-none p-0">
                {g.items.map((it) => (
                  <li key={it.name} className="group/row -mx-3 rounded-xl px-3 py-4 transition-colors duration-300 hover:bg-white/[0.04]">
                    <p className="text-lg text-white">{it.name}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-slate-400 transition-colors duration-300 group-hover/row:text-slate-300">{it.body}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
