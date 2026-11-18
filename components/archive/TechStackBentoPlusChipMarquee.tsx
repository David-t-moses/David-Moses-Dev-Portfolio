"use client";

// Earlier versions: components/archive/TechStackBento.tsx (bento with proficiency bars),
// TechStackLayerRows.tsx (four rows of chips).

import React, { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useActive } from "../useActive";

// The build stack, as a bento. Names only: no levels, scores or logos that are not David's to claim.
const tiles = [
  { job: "What people see", note: "The interface", span: "lg:col-span-4", tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "React Native"], tint: "rgba(99, 102, 241, 0.20)" },
  { job: "What runs it", note: "The engine", span: "lg:col-span-2", tools: ["Node.js", "Nest.js", "PostgreSQL", "Prisma", "Socket.io", "REST and GraphQL APIs"], tint: "rgba(56, 189, 248, 0.14)" },
  { job: "What sells", note: "The storefront", span: "lg:col-span-2", tools: ["WooCommerce", "Shopify", "WordPress", "Webflow", "Plaid API"], tint: "rgba(124, 58, 237, 0.18)" },
  { job: "How it gets built and shipped", note: "From design to launch", span: "lg:col-span-4", tools: ["Figma", "Git and GitHub", "Vercel", "Google Analytics", "Elementor"], tint: "rgba(99, 102, 241, 0.18)" },
];

// The AI stack, moving. Generic capability names; David to confirm.
const aiRowA = ["Language model APIs", "AI agents", "Retrieval over your documents", "Prompt engineering", "Vector search", "Tool calling"];
const aiRowB = ["Automation workflows", "Chat assistants", "Document parsing", "Evaluation and guardrails", "Speech and vision", "Structured outputs"];

function Group({ items, hidden }: { items: string[]; hidden?: boolean }) {
  // Repeated so one group is always wider than the screen, so the loop never shows a gap.
  const all = [...items, ...items, ...items];
  return (
    <ul className="marquee-group" aria-hidden={hidden || undefined}>
      {all.map((t, i) => (
        <li
          key={`${t}-${i}`}
          aria-hidden={i >= items.length ? true : undefined}
          className={`flex shrink-0 items-center gap-2.5 rounded-full border border-violet-300/20 bg-violet-400/[0.07] px-5 py-2.5 text-[15px] text-slate-200 ${i >= items.length ? "marquee-dup" : ""}`}
        >
          <Sparkles size={14} aria-hidden="true" className="text-violet-300" />
          {t}
        </li>
      ))}
    </ul>
  );
}

function Row({ items, reverse, seconds }: { items: string[]; reverse?: boolean; seconds: number }) {
  return (
    <div className={`marquee-track ${reverse ? "marquee-right" : "marquee-left"}`} style={{ animationDuration: `${seconds}s` }}>
      <Group items={items} />
      <Group items={items} hidden />
    </div>
  );
}

/** Two rows moving in opposite directions, edge to edge. CSS transform only; pauses off screen, on hover and with the tab hidden. */
function AiStackMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { state, subscribe } = useActive(ref);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => {
      const s = state.current;
      el.dataset.paused = !s.onScreen || !s.tabVisible ? "true" : "false";
    };
    sync();
    return subscribe(sync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      role="group"
      aria-label="AI tools and capabilities"
      tabIndex={0}
      className="marquee marquee-chips relative -mx-6 mt-5 flex flex-col gap-4 overflow-hidden py-1 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-300 md:-mx-10 md:mt-6"
    >
      <Row items={aiRowA} seconds={60} />
      <Row items={aiRowB} reverse seconds={72} />
    </div>
  );
}

export default function TechStack() {
  const reduce = useReducedMotion();
  return (
    <section id="techstack" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-12 md:text-5xl">
          Tools I trust with your business.
        </h2>

        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {tiles.map((t, i) => (
            <motion.li
              key={t.job}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.08, ease: "easeOut" }}
              className={`group/t relative flex list-none flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_14px_36px_-28px_rgba(0,0,0,0.55)] transition-colors duration-300 hover:border-white/25 md:p-8 ${t.span}`}
            >
              <span aria-hidden="true" className="scene-grid pointer-events-none absolute inset-0 opacity-60" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-full" style={{ backgroundImage: `radial-gradient(ellipse 80% 70% at 100% 100%, ${t.tint}, transparent 75%)` }} />
              <div className="relative">
                <h3 className="text-2xl text-white md:text-[28px]">{t.job}</h3>
                <p className="mt-1 text-sm text-slate-400">{t.note}</p>
              </div>
              <ul className="relative m-0 mt-auto flex list-none flex-wrap gap-2.5 p-0 pt-8">
                {t.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-[15px] text-slate-200 transition-colors duration-300 hover:border-indigo-300/40 hover:bg-indigo-400/10 hover:text-white"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>

        <AiStackMarquee />
      </div>
    </section>
  );
}
