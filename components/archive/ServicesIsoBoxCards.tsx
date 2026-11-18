"use client";

// Pictures and moving drawings are in components/archive (Services*.tsx, latest ServicesCardsSimpleVisuals.tsx).
// This version has no images: each card is type led.

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Item = { name: string; body: string; glyph: React.ReactNode; ai?: boolean };

// Isometric block illustrations, drawn in code: every service is a different arrangement of boxes.
// Indigo is build work, violet is AI. Each box has three shaded faces.
const U = 20;
const P = (x: number, y: number, z: number) => `${((x - y) * 0.866 * U).toFixed(1)},${((x + y) * 0.5 * U - z * U).toFixed(1)}`;
const pal = {
  build: { top: "#c7d2fe", left: "#6366f1", right: "#4338ca" },
  ai: { top: "#ddd6fe", left: "#8b5cf6", right: "#6d28d9" },
};
type Box = [number, number, number, number, number, number, number?]; // x, y, z, w, d, h, opacity
function Boxes({ boxes, ai }: { boxes: Box[]; ai?: boolean }) {
  const c = ai ? pal.ai : pal.build;
  return (
    <svg viewBox="-62 -66 124 112" className="h-full w-full overflow-visible" aria-hidden="true">
      {boxes.map(([x, y, z, w, d, h, o = 1], i) => (
        <g key={i} opacity={o}>
          <polygon points={[P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)].join(" ")} fill={c.left} />
          <polygon points={[P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)].join(" ")} fill={c.right} />
          <polygon points={[P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)].join(" ")} fill={c.top} />
        </g>
      ))}
    </svg>
  );
}
const shapes: Record<string, Box[]> = {
  // a wide page with a smaller block on it
  web: [[-1.6, -1, 0, 3.2, 2, 0.45], [-1.2, -0.6, 0.45, 1.7, 1.2, 0.45], [0.8, -0.2, 0.45, 0.8, 0.8, 0.9]],
  // one tall narrow block, a small one beside it
  mobile: [[-0.6, -0.6, 0, 1.2, 1.2, 2.6], [0.9, -0.3, 0, 0.8, 0.8, 0.8]],
  // two blocks joined by a bar
  plug: [[-2, -0.7, 0, 1.4, 1.4, 1.4], [0.6, -0.7, 0, 1.4, 1.4, 1.4], [-0.6, -0.2, 0.4, 1.2, 0.4, 0.4]],
  // three steps going up
  speed: [[-2.1, -0.6, 0, 1.2, 1.2, 0.8], [-0.6, -0.6, 0, 1.2, 1.2, 1.5], [0.9, -0.6, 0, 1.2, 1.2, 2.3]],
  // a block with a smaller block speaking from its corner
  chat: [[-1.6, -1, 0, 2.2, 2, 1.4], [0.5, -0.3, 1.4, 1, 1, 0.9]],
  // three blocks stepping down, one flow
  flow: [[-2, -0.6, 1.4, 1.1, 1.1, 0.9], [-0.55, -0.6, 0.7, 1.1, 1.1, 0.9], [0.9, -0.6, 0, 1.1, 1.1, 0.9]],
  // a large block with a small one set into its top
  spark: [[-1.4, -1.4, 0, 2.8, 2.8, 1.2], [-0.4, -0.4, 1.2, 0.8, 0.8, 0.8]],
  // three sheets stacked
  doc: [[-1.4, -1.1, 0, 2.8, 2.2, 0.35], [-1.4, -1.1, 0.5, 2.8, 2.2, 0.35], [-1.4, -1.1, 1, 2.8, 2.2, 0.35]],
};
const mk = (k: keyof typeof shapes, ai?: boolean) => <Boxes boxes={shapes[k]} ai={ai} />;
const glyphs = {
  web: mk("web"), mobile: mk("mobile"), plug: mk("plug"), speed: mk("speed"),
  chat: mk("chat", true), flow: mk("flow", true), spark: mk("spark", true), doc: mk("doc", true),
};

// Eight services. Build work first (indigo), then the AI work (violet).
const items: Item[] = [
  { name: "Websites and apps", body: "Business sites, online stores and web apps that turn visitors into customers.", glyph: glyphs.web },
  { name: "Mobile apps", body: "Native apps for iOS and Android, built once and shipped to both.", glyph: glyphs.mobile },
  { name: "Integrations and APIs", body: "Payments, CRMs and messaging connected into one smooth flow.", glyph: glyphs.plug },
  { name: "Speed and search", body: "Fast pages, found on search, and kept updated and secure.", glyph: glyphs.speed },
  { name: "AI assistants", body: "Chat that answers your customers from your own content.", glyph: glyphs.chat, ai: true },
  { name: "Workflow automation", body: "Repetitive work handled quietly in the background.", glyph: glyphs.flow, ai: true },
  { name: "AI in your product", body: "Smart search, summaries and recommendations built in.", glyph: glyphs.spark, ai: true },
  { name: "Smart documents", body: "Answers from your PDFs, emails and records, with sources.", glyph: glyphs.doc, ai: true },
];

export default function Services() {
  const reduce = useReducedMotion();
  const gridRef = useRef<HTMLUListElement>(null);
  const frame = useRef(0);

  // One soft light follows the pointer across all the cards (positions written once per frame, mouse only).
  const onMove = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse") return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      gridRef.current?.querySelectorAll<HTMLElement>(":scope > .spot-card").forEach((el) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--x", `${clientX - r.left}px`);
        el.style.setProperty("--y", `${clientY - r.top}px`);
      });
    });
  };

  return (
    <section id="services" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-12 md:text-5xl">
          What you can stop worrying about.
        </h2>

        <ul ref={gridRef} onPointerMove={onMove} className="spot-grid m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
          {items.map((it, i) => {
            const rgb = it.ai ? "139, 92, 246" : "99, 102, 241";
            return (
              <motion.li
                key={it.name}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: (i % 4) * 0.07, ease: "easeOut" }}
                className="spot-card group/t relative list-none overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-7 shadow-[0_14px_36px_-28px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:-translate-y-1 md:p-8"
              >
                {/* Always on: a faint tint from the top corner. On hover it strengthens. */}
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover/t:opacity-100" style={{ backgroundImage: `radial-gradient(ellipse 70% 55% at 0% 0%, rgba(${rgb}, 0.20), transparent 70%)` }} />
                <span aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-0 h-px opacity-60 transition-opacity duration-300 group-hover/t:opacity-100" style={{ backgroundImage: `linear-gradient(to right, transparent, rgba(${rgb}, 0.9), transparent)` }} />
                <span className="relative block h-[92px] w-[110px] transition-transform duration-500 ease-out group-hover/t:-translate-y-1 group-hover/t:scale-105" style={{ filter: `drop-shadow(0 14px 18px rgba(${rgb}, 0.35))` }}>
                  {it.glyph}
                </span>
                <h3 className="relative mt-6 text-[22px] leading-[1.15] tracking-[-0.01em] text-white">{it.name}</h3>
                <p className="relative mt-3 text-[15px] leading-[1.6] text-slate-400 transition-colors duration-300 group-hover/t:text-slate-200">{it.body}</p>
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
