"use client";

// Earlier versions: components/archive/ServicesStickyIntroCards.tsx, ServicesTwoListCards.tsx

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// Each card is a short conversation: what a client worries about, then what I do about it.
const groups = [
  {
    title: "Websites and software",
    ai: false,
    items: [
      { worry: "Is your website losing customers?", name: "Websites that convert", body: "Clear, fast pages that turn visitors into enquiries and sales." },
      { worry: "Is a spreadsheet running your business?", name: "Web apps and dashboards", body: "Portals, admin panels and SaaS products built around how you work." },
      { worry: "Can customers buy from you easily?", name: "Online stores", body: "WooCommerce and custom shops with secure payments." },
      { worry: "Do your customers expect an app?", name: "Mobile apps", body: "Native and cross platform apps for iOS and Android." },
      { worry: "Do your tools talk to each other?", name: "Integrations and APIs", body: "Payments, CRMs and messaging connected into one flow." },
      { worry: "Will it still work next year?", name: "Speed, search and care", body: "Fast pages, found on search, kept updated and secure." },
    ],
  },
  {
    title: "AI engineering",
    ai: true,
    items: [
      { worry: "Answering the same questions all day?", name: "AI assistants and chatbots", body: "Assistants that reply using your own content." },
      { worry: "Drowning in busywork?", name: "Workflow automation", body: "Repetitive tasks handled quietly by AI in the background." },
      { worry: "Want AI inside your product?", name: "AI inside your product", body: "Search, summaries and recommendations built in." },
      { worry: "Buried in documents and emails?", name: "Document and data intelligence", body: "PDFs, emails and records turned into answers and reports." },
      { worry: "Is your team stretched thin?", name: "Internal tools for your team", body: "Custom AI helpers that save hours every week." },
      { worry: "Not sure where AI pays off?", name: "AI audit and roadmap", body: "A clear plan for where it helps, and where it does not." },
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

        <div className="space-y-12 md:space-y-16">
          {groups.map((g) => (
            <div key={g.title} className="relative">
              {g.ai && (
                <span aria-hidden="true" className="pointer-events-none absolute -inset-x-16 -inset-y-20 -z-10" style={{ backgroundImage: "radial-gradient(ellipse 55% 50% at 50% 45%, rgba(124, 58, 237, 0.15), transparent 100%)" }} />
              )}
              <div className="mb-5 flex items-center gap-4 md:mb-6">
                <h3 className={`text-2xl md:text-[28px] ${g.ai ? "text-violet-200" : "text-white"}`}>{g.title}</h3>
                <span aria-hidden="true" className={`h-px flex-1 ${g.ai ? "bg-gradient-to-r from-violet-300/40 to-transparent" : "bg-gradient-to-r from-white/15 to-transparent"}`} />
              </div>

              <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                {g.items.map((it, i) => (
                  <motion.li
                    key={it.name}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: "easeOut" }}
                    className={`group/c flex list-none flex-col rounded-2xl border bg-slate-900/60 p-5 shadow-[0_14px_36px_-28px_rgba(0,0,0,0.55)] transition-colors duration-300 md:p-6 ${
                      g.ai ? "border-violet-300/15 hover:border-violet-300/35" : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    {/* What the client says */}
                    <p
                      className={`self-start rounded-2xl rounded-bl-sm border px-4 py-2.5 text-[15px] leading-snug text-slate-300 transition-colors duration-300 ${
                        g.ai
                          ? "border-white/10 bg-white/[0.04] group-hover/c:border-violet-300/30 group-hover/c:bg-violet-400/10"
                          : "border-white/10 bg-white/[0.04] group-hover/c:border-indigo-300/30 group-hover/c:bg-indigo-400/10"
                      }`}
                    >
                      {it.worry}
                    </p>

                    {/* What I do about it */}
                    <div className="mt-5">
                      <h4 className="text-xl text-white">{it.name}</h4>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-slate-400 transition-colors duration-300 group-hover/c:text-slate-300">{it.body}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
