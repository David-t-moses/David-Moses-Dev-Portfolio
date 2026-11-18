"use client";

// The "Your idea, taking shape" monitor intro is switched off for now. It is kept, complete, in
// components/archive/AboutMonitorOnly.tsx (monitor only) and AboutMonitorPlusApproachCards.tsx
// (monitor plus the first approach cards). This section (#about) is now the approach.

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const INK = "#a5b4fc"; // indigo-300
const SOFT = "rgba(165, 180, 252, 0.16)";
const FILL = "rgba(124, 107, 214, 0.28)";

type Draw = { reduce: boolean | null; delay: number };

// A stroke that draws itself once when the card scrolls into view.
function Stroke({ d, reduce, delay, fill = "none", w = 1.6, o = 1 }: Draw & { d: string; fill?: string; w?: number; o?: number }) {
  return (
    <motion.path
      d={d}
      fill={fill}
      stroke={INK}
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={o}
      initial={reduce ? false : { pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
    />
  );
}

function Pop({ children, reduce, delay }: { children: React.ReactNode } & Draw) {
  return (
    <motion.g
      initial={reduce ? false : { opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.g>
  );
}

// Four small scenes, one per step. Decorative only.
function Scene({ id, reduce }: { id: number; reduce: boolean | null }) {
  const common = { viewBox: "0 0 240 120", className: "h-full w-full", "aria-hidden": true, focusable: false } as const;
  if (id === 0) {
    // Listen: a conversation
    return (
      <svg {...common}>
        <Stroke reduce={reduce} delay={0.1} d="M30 22 h96 a10 10 0 0 1 10 10 v22 a10 10 0 0 1 -10 10 h-70 l-16 14 v-14 h-10 a10 10 0 0 1 -10 -10 v-22 a10 10 0 0 1 10 -10 z" />
        <Pop reduce={reduce} delay={0.7}>
          <circle className="sc-dot" cx="62" cy="43" r="3.5" fill={INK} />
          <circle className="sc-dot sc-d2" cx="78" cy="43" r="3.5" fill={INK} />
          <circle className="sc-dot sc-d3" cx="94" cy="43" r="3.5" fill={INK} />
        </Pop>
        <Pop reduce={reduce} delay={0.5}>
          <path d="M104 62 h96 a10 10 0 0 1 10 10 v20 a10 10 0 0 1 -10 10 h-10 v14 l-16 -14 h-70 a10 10 0 0 1 -10 -10 v-20 a10 10 0 0 1 10 -10 z" fill={FILL} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
        </Pop>
        <Pop reduce={reduce} delay={0.9}>
          <rect x="122" y="78" width="70" height="5" rx="2.5" fill={INK} opacity="0.75" />
          <rect x="122" y="90" width="44" height="5" rx="2.5" fill={INK} opacity="0.4" />
        </Pop>
      </svg>
    );
  }
  if (id === 1) {
    // Plan: a route with milestones
    return (
      <svg {...common}>
        <Stroke reduce={reduce} delay={0.1} w={1.8} d="M24 90 C 64 90, 60 36, 112 40 S 178 94, 206 34" />
        <path className="sc-flow" d="M24 90 C 64 90, 60 36, 112 40 S 178 94, 206 34" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2 22" opacity="0.9" />
        <Pop reduce={reduce} delay={0.4}>
          <circle cx="24" cy="90" r="7" fill="#0b1226" stroke={INK} strokeWidth="1.6" />
          <circle cx="24" cy="90" r="2.5" fill={INK} />
        </Pop>
        <Pop reduce={reduce} delay={0.8}>
          <circle cx="112" cy="40" r="7" fill="#0b1226" stroke={INK} strokeWidth="1.6" />
          <circle cx="112" cy="40" r="2.5" fill={INK} />
        </Pop>
        <Pop reduce={reduce} delay={1.1}>
          <path d="M206 34 V12 M206 12 h20 l-5 6 5 6 h-20" fill={FILL} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
        </Pop>
      </svg>
    );
  }
  if (id === 2) {
    // Build: an interface assembling
    return (
      <svg {...common}>
        <Stroke reduce={reduce} delay={0.1} d="M36 18 h168 a8 8 0 0 1 8 8 v78 a8 8 0 0 1 -8 8 h-168 a8 8 0 0 1 -8 -8 v-78 a8 8 0 0 1 8 -8 z" />
        <Pop reduce={reduce} delay={0.5}>
          <circle cx="42" cy="30" r="2.5" fill={INK} opacity="0.7" />
          <circle cx="52" cy="30" r="2.5" fill={INK} opacity="0.45" />
          <circle cx="62" cy="30" r="2.5" fill={INK} opacity="0.25" />
        </Pop>
        <Pop reduce={reduce} delay={0.7}>
          <rect x="40" y="46" width="84" height="9" rx="4.5" fill={INK} opacity="0.85" />
          <rect x="40" y="62" width="62" height="6" rx="3" fill={INK} opacity="0.4" />
          <rect x="40" y="76" width="40" height="14" rx="7" fill={FILL} stroke={INK} strokeWidth="1.2" />
          <rect className="sc-caret" x="90" y="47" width="2" height="7" fill="#fff" />
        </Pop>
        <Pop reduce={reduce} delay={0.95}>
          <rect x="140" y="44" width="56" height="48" rx="6" fill={SOFT} stroke={INK} strokeWidth="1.2" />
          <path d="M146 84 l14 -16 l10 10 l8 -8 l12 14" fill="none" stroke={INK} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
        </Pop>
      </svg>
    );
  }
  // Launch and grow: it goes live and climbs
  return (
    <svg {...common}>
      <Pop reduce={reduce} delay={0.1}>
        <path d="M20 100 H220" stroke={INK} strokeWidth="1" opacity="0.25" />
        <path d="M20 70 H220" stroke={INK} strokeWidth="1" opacity="0.12" strokeDasharray="3 5" />
        <path d="M20 40 H220" stroke={INK} strokeWidth="1" opacity="0.12" strokeDasharray="3 5" />
      </Pop>
      <Pop reduce={reduce} delay={0.5}>
        <path d="M24 92 L68 76 L108 82 L156 50 L204 26 V100 H24 z" fill={FILL} opacity="0.55" />
      </Pop>
      <Stroke reduce={reduce} delay={0.1} w={2} d="M24 92 L68 76 L108 82 L156 50 L204 26" />
      <Pop reduce={reduce} delay={1}>
        <circle className="sc-ring" cx="204" cy="26" r="9" fill="#34d399" opacity="0.18" />
        <circle cx="204" cy="26" r="4" fill="#34d399" />
        <path d="M198 14 l6 -6 l6 6" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </Pop>
    </svg>
  );
}

const steps = [
  { n: "01", title: "Listen", body: "We talk. I learn what you need and who it is for." },
  { n: "02", title: "Plan", body: "You get a clear scope and timeline before I start." },
  { n: "03", title: "Build", body: "I build in stages and show you working previews." },
  { n: "04", title: "Launch and grow", body: "I take it live and stay on hand after." },
];

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28"
    >
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-12 md:text-5xl">
          How we&apos;ll work together.
        </h2>

        {/* One card holds the whole approach */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)] md:p-8">
          {/* Path: one line through four milestones with a light that travels along it (desktop) */}
          <div aria-hidden="true" className="relative mb-6 hidden h-4 grid-cols-4 lg:grid">
            {steps.map((s, i) => (
              <div key={s.n} className="relative">
                <span className="absolute left-5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-indigo-300 ring-4 ring-indigo-300/20" />
                {i < steps.length - 1 && (
                  <motion.span
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.25, ease: "easeOut" }}
                    style={{ originX: 0 }}
                    className="absolute left-8 top-1/2 h-px w-[calc(100%-12px)] -translate-y-1/2 bg-gradient-to-r from-indigo-300/60 to-indigo-300/25"
                  />
                )}
              </div>
            ))}
            {!reduce && <span className="path-light absolute left-5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_3px_rgba(165,180,252,0.9)]" />}
          </div>

          <ol className="m-0 grid list-none p-0 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.li
                key={step.n}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
                className="group/step list-none border-t border-white/10 py-6 first:border-t-0 first:pt-0 last:pb-0 lg:border-l lg:border-t-0 lg:px-5 lg:py-0 lg:first:border-l-0"
              >
                {/* Scene: drawn on a faint dot grid with a soft glow beneath */}
                <div className="relative h-[170px] pt-3">
                  <span aria-hidden="true" className="scene-grid pointer-events-none absolute inset-0" />
                  <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24" style={{ backgroundImage: "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(129, 140, 248, 0.26), transparent 75%)" }} />
                  <div className="relative mx-auto h-full max-w-[300px] transition-transform duration-500 group-hover/step:-translate-y-1">
                    <Scene id={i} reduce={reduce} />
                  </div>
                </div>

                <div className="pt-3">
                  <h3 className="text-xl text-white md:text-[22px]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300 md:text-[15px]">{step.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4 md:mt-14">
          <Link href="#contact" className="btn-compact btn-compact-light gap-2 px-5">
            Start a project
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a
            href="https://calendly.com/davidtmoses5/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-compact btn-compact-ghost px-5"
          >
            Book a call
          </a>
        </div>
      </div>
    </section>
  );
}
