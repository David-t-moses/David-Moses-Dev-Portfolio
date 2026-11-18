"use client";

// Pictures and moving drawings are in components/archive (Services*.tsx, latest ServicesCardsSimpleVisuals.tsx).
// This version has no images: each card is type led.

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Item = { name: string; body: string; glyph: string; ai?: boolean };

// Illustrations drawn in code: each one shows what the service is (a site, a phone, a hub of tools, a gauge,
// a conversation, a flow, an app with AI, a document). 200 x 120 stage. Indigo build, violet AI.
type Tone = { a: string; b: string; soft: string };
const tone = { build: { a: "#818cf8", b: "#4f46e5", soft: "#e0e7ff" }, ai: { a: "#c084fc", b: "#7c3aed", soft: "#ede9fe" } } as const;

function Art({ kind, id, t }: { kind: string; id: string; t: Tone }) {
  const grad = (
    <defs>
      <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={t.a} />
        <stop offset="1" stopColor={t.b} />
      </linearGradient>
    </defs>
  );
  const F = `url(#${id}g)`;
  const common = { viewBox: "0 0 200 120", className: "h-full w-full", "aria-hidden": true } as const;
  if (kind === "web")
    return (
      <svg {...common}>
        {grad}
        <rect x="26" y="12" width="148" height="96" rx="10" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.24)" />
        <path d="M26 22a10 10 0 0 1 10-10h128a10 10 0 0 1 10 10v8H26z" fill="rgba(255,255,255,0.16)" />
        <circle cx="38" cy="21" r="2.6" fill="#fb7185" /><circle cx="47" cy="21" r="2.6" fill="#fbbf24" /><circle cx="56" cy="21" r="2.6" fill="#34d399" />
        <rect x="38" y="40" width="58" height="8" rx="4" fill="rgba(255,255,255,0.88)" /><rect x="38" y="53" width="44" height="8" rx="4" fill="rgba(255,255,255,0.88)" />
        <rect x="38" y="68" width="62" height="5" rx="2.5" fill="rgba(255,255,255,0.26)" />
        <rect x="38" y="82" width="34" height="14" rx="7" fill={F} />
        <rect x="108" y="38" width="54" height="40" rx="6" fill={F} />
        <path d="M108 78l16-16 12 10 8-7 18 13z" fill="#fff" opacity=".35" />
        <rect x="108" y="84" width="16" height="12" rx="3" fill="rgba(255,255,255,0.16)" /><rect x="128" y="84" width="16" height="12" rx="3" fill="rgba(255,255,255,0.16)" /><rect x="148" y="84" width="14" height="12" rx="3" fill="rgba(255,255,255,0.16)" />
      </svg>
    );
  if (kind === "mobile")
    return (
      <svg {...common}>
        {grad}
        <g transform="rotate(-8 70 60)"><rect x="46" y="16" width="52" height="92" rx="9" fill="rgba(255,255,255,0.88)" opacity=".55" /></g>
        <rect x="76" y="8" width="58" height="106" rx="11" fill="#0b1026" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
        <rect x="81" y="14" width="48" height="94" rx="7" fill="#12183a" />
        <rect x="95" y="17" width="20" height="4" rx="2" fill="#0f172a" />
        <rect x="86" y="26" width="38" height="22" rx="5" fill={F} />
        <rect x="86" y="53" width="38" height="8" rx="3" fill="rgba(255,255,255,0.16)" /><rect x="86" y="65" width="38" height="8" rx="3" fill="rgba(255,255,255,0.16)" />
        <circle cx="94" cy="88" r="4" fill={F} /><circle cx="105" cy="88" r="4" fill="rgba(255,255,255,0.26)" /><circle cx="116" cy="88" r="4" fill="rgba(255,255,255,0.26)" />
        <rect x="141" y="30" width="34" height="14" rx="7" fill="#34d399" /><path d="M149 37l3 3 6-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (kind === "plug")
    return (
      <svg {...common}>
        {grad}
        {[[34, 30], [166, 30], [34, 94], [166, 94]].map(([x, y]) => (<line key={`${x}${y}`} x1="100" y1="60" x2={x} y2={y} stroke={t.a} strokeWidth="2" strokeDasharray="4 4" />))}
        {[[34, 30], [166, 30], [34, 94], [166, 94]].map(([x, y], i) => (
          <g key={i}><rect x={x - 17} y={y - 17} width="34" height="34" rx="9" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.24)" /><rect x={x - 8} y={y - 8} width="16" height="16" rx="4" fill={i % 2 ? t.a : t.b} opacity={i % 2 ? 0.7 : 1} /></g>
        ))}
        <rect x="74" y="34" width="52" height="52" rx="14" fill={F} />
        <path d="M92 52v-6M108 52v-6M88 52h24v7a12 12 0 0 1-24 0zM100 71v6" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (kind === "speed")
    return (
      <svg {...common}>
        {grad}
        <path d="M32 98a68 68 0 0 1 136 0" stroke="#fff" strokeOpacity=".2" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M32 98a68 68 0 0 1 112-52" stroke="#34d399" strokeWidth="14" fill="none" strokeLinecap="round" />
        <line x1="100" y1="98" x2="134" y2="56" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        <circle cx="100" cy="98" r="9" fill="#fff" /><circle cx="100" cy="98" r="4" fill={t.b} />
        <rect x="44" y="104" width="30" height="9" rx="4.5" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.24)" opacity=".85" /><rect x="126" y="104" width="30" height="9" rx="4.5" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.24)" opacity=".85" />
        <path d="M150 20l-8 14h7l-4 12 12-16h-8z" fill="#fbbf24" />
      </svg>
    );
  if (kind === "chat")
    return (
      <svg {...common}>
        {grad}
        <path d="M26 16h92a10 10 0 0 1 10 10v22a10 10 0 0 1-10 10H60l-14 12V58h-20a10 10 0 0 1-10-10V26a10 10 0 0 1 10-10z" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.24)" />
        <rect x="38" y="28" width="70" height="6" rx="3" fill="rgba(255,255,255,0.26)" /><rect x="38" y="40" width="46" height="6" rx="3" fill="rgba(255,255,255,0.26)" />
        <path d="M174 54H96a10 10 0 0 0-10 10v22a10 10 0 0 0 10 10h38l14 12V96h26a10 10 0 0 0 10-10V64a10 10 0 0 0-10-10z" fill={F} />
        <circle cx="106" cy="75" r="4" fill="#fff" /><circle cx="120" cy="75" r="4" fill="#fff" opacity=".8" /><circle cx="134" cy="75" r="4" fill="#fff" opacity=".6" />
        <path d="M160 68l2.4 5.2 5.2 2.4-5.2 2.4-2.4 5.2-2.4-5.2-5.2-2.4 5.2-2.4z" fill="#fff" />
      </svg>
    );
  if (kind === "flow")
    return (
      <svg {...common}>
        {grad}
        <path d="M58 60h30M116 60h30" stroke={t.a} strokeWidth="3" strokeDasharray="5 5" />
        <path d="M84 54l8 6-8 6M142 54l8 6-8 6" stroke={t.a} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="14" y="36" width="48" height="48" rx="12" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.24)" />
        <rect x="23" y="47" width="30" height="22" rx="4" fill="none" stroke={t.b} strokeWidth="3" /><path d="M24 49l14 11 14-11" stroke={t.b} strokeWidth="3" fill="none" strokeLinejoin="round" />
        <rect x="76" y="32" width="56" height="56" rx="15" fill={F} />
        <path d="M104 46l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#fff" />
        <rect x="138" y="36" width="48" height="48" rx="12" fill="#34d399" />
        <path d="M151 61l8 8 14-16" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (kind === "spark")
    return (
      <svg {...common}>
        {grad}
        <rect x="22" y="22" width="148" height="88" rx="10" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.24)" />
        <rect x="32" y="32" width="40" height="8" rx="4" fill="rgba(255,255,255,0.88)" />
        {[30, 46, 38, 58, 44, 70].map((h, i) => (<rect key={i} x={32 + i * 22} y={104 - h - 4} width="14" height={h} rx="3" fill={i === 5 ? F : t.soft} />))}
        <rect x="124" y="12" width="64" height="30" rx="15" fill={F} />
        <path d="M144 20l2.6 5.8 5.8 2.6-5.8 2.6-2.6 5.8-2.6-5.8-5.8-2.6 5.8-2.6z" fill="#fff" />
        <rect x="156" y="22" width="24" height="5" rx="2.5" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.24)" /><rect x="156" y="31" width="16" height="5" rx="2.5" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.24)" opacity=".7" />
      </svg>
    );
  return (
    <svg {...common}>
      {grad}
      <rect x="32" y="12" width="82" height="100" rx="9" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.24)" />
      <rect x="42" y="24" width="40" height="7" rx="3.5" fill="rgba(255,255,255,0.88)" />
      {[42, 52, 62].map((y) => (<rect key={y} x="42" y={y} width="62" height="5" rx="2.5" fill="rgba(255,255,255,0.26)" />))}
      <rect x="40" y="70" width="66" height="11" rx="4" fill="#fde68a" /><rect x="44" y="73" width="52" height="5" rx="2.5" fill="#92400e" opacity=".55" />
      {[88, 98].map((y) => (<rect key={y} x="42" y={y} width="50" height="5" rx="2.5" fill="rgba(255,255,255,0.26)" />))}
      <circle cx="136" cy="52" r="26" fill={F} /><circle cx="136" cy="52" r="26" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="3" />
      <circle cx="132" cy="48" r="11" fill="none" stroke="#fff" strokeWidth="4" /><path d="M141 57l10 10" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      <rect x="116" y="88" width="64" height="22" rx="11" fill="#34d399" /><path d="M128 99l5 5 9-10" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /><rect x="148" y="96" width="24" height="5" rx="2.5" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.24)" />
    </svg>
  );
}

// Eight services. Build work first (indigo), then the AI work (violet).
const items: Item[] = [
  { name: "Websites and apps", body: "Business sites, online stores and web apps that turn visitors into customers.", glyph: "web" },
  { name: "Mobile apps", body: "Native apps for iOS and Android, built once and shipped to both.", glyph: "mobile" },
  { name: "Integrations and APIs", body: "Payments, CRMs and messaging connected into one smooth flow.", glyph: "plug" },
  { name: "Speed and search", body: "Fast pages, found on search, and kept updated and secure.", glyph: "speed" },
  { name: "AI assistants", body: "Chat that answers your customers from your own content.", glyph: "chat", ai: true },
  { name: "Workflow automation", body: "Repetitive work handled quietly in the background.", glyph: "flow", ai: true },
  { name: "AI in your product", body: "Smart search, summaries and recommendations built in.", glyph: "spark", ai: true },
  { name: "Smart documents", body: "Answers from your PDFs, emails and records, with sources.", glyph: "doc", ai: true },
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

        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#0a0f29] p-3 shadow-[0_50px_120px_-60px_rgba(0,0,0,0.9)] md:p-4">
          {/* The stage: aurora light and a fine grid that fades toward the edges */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 55% 45% at 12% 0%, rgba(99, 102, 241, 0.34), transparent 70%), radial-gradient(ellipse 55% 45% at 92% 100%, rgba(139, 92, 246, 0.32), transparent 70%), radial-gradient(ellipse 40% 30% at 55% 50%, rgba(56, 189, 248, 0.07), transparent 70%)" }} />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60" style={{ backgroundImage: "linear-gradient(rgba(165, 180, 252, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(165, 180, 252, 0.07) 1px, transparent 1px)", backgroundSize: "56px 56px", WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 25%, transparent 78%)", maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 25%, transparent 78%)" }} />
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-indigo-200/60 to-transparent" />
        <ul ref={gridRef} onPointerMove={onMove} className="spot-grid relative m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 md:gap-4 xl:grid-cols-4">
          {items.map((it, i) => {
            const rgb = it.ai ? "139, 92, 246" : "99, 102, 241";
            return (
              <motion.li
                key={it.name}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: (i % 4) * 0.07, ease: "easeOut" }}
                className="spot-card group/t relative list-none overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0b1030]/80 transition-transform duration-300 hover:-translate-y-1"
              >
                {/* A picture panel on top, the words below. The panel is tinted by kind: indigo build, violet AI. */}
                <div className="relative m-2.5 overflow-hidden rounded-[20px]" style={{ background: `radial-gradient(ellipse 70% 80% at 50% 0%, rgba(${rgb}, 0.34), transparent 75%), linear-gradient(180deg, rgba(${rgb}, 0.10), rgba(8, 12, 36, 0.6))`, boxShadow: `inset 0 0 0 1px rgba(${rgb}, 0.30), inset 0 1px 0 rgba(255,255,255,0.12)` }}>
                  <span aria-hidden="true" className="scene-grid pointer-events-none absolute inset-0 opacity-70" />
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-black/30 px-2.5 py-1 text-[11px] tracking-wide text-white/80">{it.ai ? "AI" : "Build"}</span>
                  <div className="relative mx-auto mt-4 h-[140px] w-full max-w-[230px] px-3 pb-3 transition-transform duration-500 ease-out group-hover/t:scale-[1.06]" style={{ filter: `drop-shadow(0 0 22px rgba(${rgb}, 0.45))` }}>
                    <Art kind={it.glyph} id={`a${i}`} t={it.ai ? tone.ai : tone.build} />
                  </div>
                </div>
                <div className="relative px-5 pb-6 pt-3">
                  <h3 className="text-[22px] leading-[1.15] tracking-[-0.01em] text-white">{it.name}</h3>
                  <p className="mt-2.5 text-[15px] leading-[1.6] text-slate-400 transition-colors duration-300 group-hover/t:text-slate-200">{it.body}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
        </div>

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
