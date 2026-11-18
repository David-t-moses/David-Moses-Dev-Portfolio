"use client";

// Earlier version (bento grid with proficiency bars): components/archive/TechStackBento.tsx

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// The stack grouped by the job each part does for the client's product.
const layers = [
  { job: "What people see", note: "The interface", tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "React Native"] },
  { job: "What runs it", note: "The engine", tools: ["Node.js", "Nest.js", "PostgreSQL", "Prisma", "Socket.io", "REST and GraphQL APIs"] },
  { job: "What sells", note: "The storefront", tools: ["WooCommerce", "Shopify", "WordPress", "Webflow", "Plaid API"] },
  { job: "What thinks", note: "The intelligence", tools: ["Language model APIs", "AI agents", "Retrieval over your documents", "Automation workflows"] },
];

export default function TechStack() {
  const reduce = useReducedMotion();
  return (
    <section id="techstack" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-12 md:text-5xl">
          Tools I trust with your business.
        </h2>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-[0_14px_36px_-26px_rgba(0,0,0,0.55)]">
          {layers.map((l, i) => (
            <motion.div
              key={l.job}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="grid gap-4 border-b border-white/10 px-6 py-6 last:border-b-0 md:grid-cols-[240px_1fr] md:items-center md:gap-8 md:px-8 md:py-7"
            >
              <div>
                <h3 className="text-xl text-white md:text-2xl">{l.job}</h3>
                <p className="mt-1 text-sm text-slate-400">{l.note}</p>
              </div>
              <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
                {l.tools.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[15px] text-slate-200 transition-colors duration-300 hover:border-indigo-300/40 hover:bg-indigo-400/10 hover:text-white"
                  >
                    {t}
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
