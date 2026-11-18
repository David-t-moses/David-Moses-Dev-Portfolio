"use client";

// Pictures and moving drawings are in components/archive (Services*.tsx, latest ServicesCardsSimpleVisuals.tsx).
// This version has no images: each card is type led.

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Item = { name: string; body: string; glyph: React.ReactNode; ai?: boolean };

// Small drawn glyphs (not an icon pack): simple strokes, one idea each.
const g = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: "h-6 w-6", "aria-hidden": true };
const glyphs = {
  web: (<svg {...g}><rect x="3" y="4.5" width="18" height="15" rx="2.5" /><path d="M3 9h18M7 6.8h.01M10 6.8h.01" /></svg>),
  mobile: (<svg {...g}><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></svg>),
  plug: (<svg {...g}><path d="M9 3v4M15 3v4M6.5 7h11v3.5a5.5 5.5 0 0 1-11 0V7ZM12 16v5" /></svg>),
  speed: (<svg {...g}><path d="M4 16a8 8 0 1 1 16 0" /><path d="m12 16 4-5" /></svg>),
  chat: (<svg {...g}><path d="M4 5.5h16v10H12l-4.5 4v-4H4v-10Z" /></svg>),
  flow: (<svg {...g}><circle cx="5.5" cy="6" r="2.5" /><circle cx="18.5" cy="18" r="2.5" /><path d="M8 6h5a3 3 0 0 1 3 3v6.5" /></svg>),
  spark: (<svg {...g}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></svg>),
  doc: (<svg {...g}><path d="M6 3h8l4 4v14H6V3Z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></svg>),
};

// Eight services. Build work first (indigo), then the AI work (violet).
const items: Item[] = [
  { name: "Websites and web apps", body: "Business sites, online stores and web apps that turn visitors into customers.", glyph: glyphs.web },
  { name: "Mobile apps", body: "Native apps for iOS and Android, built once and shipped to both.", glyph: glyphs.mobile },
  { name: "Integrations and APIs", body: "Payments, CRMs and messaging connected into one smooth flow.", glyph: glyphs.plug },
  { name: "Speed, search and care", body: "Fast pages, found on search, and kept updated and secure.", glyph: glyphs.speed },
  { name: "AI assistants", body: "Chat that answers your customers from your own content.", glyph: glyphs.chat, ai: true },
  { name: "Workflow automation", body: "Repetitive work handled quietly in the background.", glyph: glyphs.flow, ai: true },
  { name: "AI inside your product", body: "Smart search, summaries and recommendations built in.", glyph: glyphs.spark, ai: true },
  { name: "Document intelligence", body: "Answers from your PDFs, emails and records, with sources.", glyph: glyphs.doc, ai: true },
];

export default function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-12 md:text-5xl">
          What you can stop worrying about.
        </h2>

        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
          {items.map((it, i) => {
            const rgb = it.ai ? "139, 92, 246" : "99, 102, 241";
            return (
              <motion.li
                key={it.name}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: (i % 4) * 0.07, ease: "easeOut" }}
                className="group/t relative list-none overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-7 shadow-[0_14px_36px_-28px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-white/25 md:p-8"
              >
                <span aria-hidden="true" className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover/t:opacity-100" style={{ background: `rgba(${rgb}, 0.35)` }} />
                <span
                  className="relative flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: `linear-gradient(135deg, rgba(${rgb}, 0.28), rgba(${rgb}, 0.08))`, color: `rgb(${it.ai ? "196, 181, 253" : "165, 180, 252"})`, boxShadow: `inset 0 0 0 1px rgba(${rgb}, 0.35)` }}
                >
                  {it.glyph}
                </span>
                <h3 className="relative mt-6 text-[22px] leading-tight tracking-[-0.01em] text-white">{it.name}</h3>
                <p className="relative mt-2.5 text-[15px] leading-[1.6] text-slate-400 transition-colors duration-300 group-hover/t:text-slate-300">{it.body}</p>
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
