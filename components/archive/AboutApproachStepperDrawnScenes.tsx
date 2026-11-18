"use client";

// The "Your idea, taking shape" monitor intro is switched off for now. It is kept, complete, in
// components/archive/AboutMonitorOnly.tsx (monitor only) and AboutMonitorPlusApproachCards.tsx
// (monitor plus the first approach cards). This section (#about) is now the approach.

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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
  const common = { viewBox: "0 0 240 120", className: "scene-svg h-full w-full", "aria-hidden": true, focusable: false } as const;
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
  { tag: "Discovery", title: "Listen", body: "We talk. I learn what you need and who it is for." },
  { tag: "Roadmap", title: "Plan", body: "You get a clear scope and timeline before I start." },
  { tag: "Previews", title: "Build", body: "I build in stages and show you working previews." },
  { tag: "Live", title: "Launch and grow", body: "I take it live and stay on hand after." },
];

const STEP_MS = 5500;

export default function About() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [hold, setHold] = useState(false); // pointer or focus inside
  const rootRef = useRef<HTMLDivElement>(null);

  // Steps advance on their own only while the card is on screen, not hovered or focused, and motion is allowed.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = !reduce && inView && !hold;

  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28"
    >
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-12 md:text-5xl">
          How we&apos;ll work together.
        </h2>

        {/* One card holds the whole approach and the actions */}
        <div
          ref={rootRef}
          onMouseEnter={() => setHold(true)}
          onMouseLeave={() => setHold(false)}
          onFocus={() => setHold(true)}
          onBlur={() => setHold(false)}
          className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_14px_36px_-26px_rgba(0,0,0,0.55)] md:p-10"
        >
          <div className="grid items-stretch gap-8 lg:grid-cols-[5fr_7fr] lg:gap-12">
            {/* The stage: one large drawing for the chosen step */}
            <div aria-hidden="true" className="relative order-first min-h-[240px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 lg:order-last lg:min-h-[400px]">
              <span className="scene-grid pointer-events-none absolute inset-0" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2" style={{ backgroundImage: "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(129, 140, 248, 0.30), transparent 75%)" }} />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center p-6 md:p-10"
                >
                  <span className="absolute left-5 top-5 rounded-full border border-indigo-300/20 bg-indigo-400/10 px-3 py-1 text-xs tracking-wide text-indigo-200">
                    {steps[active].tag}
                  </span>
                  <div className="aspect-[2/1] w-full max-w-[560px]">
                    <Scene id={active} reduce={reduce} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* The steps */}
            <ol className="m-0 flex list-none flex-col justify-center gap-1 p-0">
              {steps.map((step, i) => {
                const on = i === active;
                return (
                  <li key={step.title} className="list-none">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={on ? "step" : undefined}
                      className="group/s relative block w-full rounded-xl py-4 pl-6 pr-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
                    >
                      {/* Rail: grey track, filled while this step is showing */}
                      <span aria-hidden="true" className="absolute bottom-3 left-0 top-3 w-[2px] rounded-full bg-white/10" />
                      {on && (
                        <span
                          key={`bar-${active}`}
                          aria-hidden="true"
                          className={`absolute bottom-3 left-0 top-3 w-[2px] origin-top rounded-full bg-indigo-300 ${reduce ? "" : "step-bar"}`}
                          style={reduce ? undefined : { animationDuration: `${STEP_MS}ms`, animationPlayState: running ? "running" : "paused" }}
                          onAnimationEnd={() => setActive((a) => (a + 1) % steps.length)}
                        />
                      )}
                      <span className={`block text-2xl transition-colors duration-300 md:text-[28px] ${on ? "text-white" : "text-slate-500 group-hover/s:text-slate-300"}`}>
                        {step.title}
                      </span>
                      <span
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                      >
                        <span className="overflow-hidden">
                          <span className="block pt-2 text-[15px] leading-relaxed text-slate-300 md:text-base">{step.body}</span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Actions live on the card */}
          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6 md:mt-10 md:pt-8">
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
      </div>
    </section>
  );
}
