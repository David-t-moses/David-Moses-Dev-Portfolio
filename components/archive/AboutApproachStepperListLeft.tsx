"use client";

// Earlier versions are in components/archive (AboutMonitorOnly, AboutApproachSeparateCards,
// AboutApproachFourScenes, AboutApproachStepperDrawnScenes). The "Your idea, taking shape" monitor
// intro is switched off.

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Each step shows the real thing a client sees at that stage, drawn as a small interface. They are
// illustrations of the process, not client work.
const panel =
  "w-full max-w-[470px] overflow-hidden rounded-2xl border border-white/10 bg-slate-900/85 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.7)]";

function Tick({ tone = "indigo" }: { tone?: "indigo" | "green" }) {
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
        tone === "green" ? "bg-emerald-400/15 text-emerald-300" : "bg-indigo-400/15 text-indigo-200"
      }`}
    >
      <Check size={12} strokeWidth={2.5} aria-hidden="true" />
    </span>
  );
}

function Listen() {
  return (
    <div className="w-full max-w-[470px] space-y-3">
      <div className="max-w-[78%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-4 py-3 text-[15px] text-slate-200">
        I need a website that brings in customers.
      </div>
      <div className="ml-auto max-w-[78%] rounded-2xl rounded-br-md bg-indigo-400/20 px-4 py-3 text-[15px] text-indigo-50 ring-1 ring-indigo-300/20">
        Got it. Tell me who they are and what you sell.
      </div>
      <div className={panel}>
        <p className="border-b border-white/10 px-5 py-3 text-sm text-slate-400">Call notes</p>
        {[
          ["Goal", "More customers online"],
          ["Audience", "First time buyers"],
          ["Success", "More orders each month"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4 border-b border-white/5 px-5 py-3 last:border-b-0">
            <span className="text-sm text-slate-400">{k}</span>
            <span className="flex items-center gap-2 text-[15px] text-white">
              {v}
              <Tick />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Plan() {
  const phases = [
    { name: "Design", left: "0%", width: "32%" },
    { name: "Build", left: "26%", width: "44%" },
    { name: "Review", left: "62%", width: "24%" },
    { name: "Launch", left: "84%", width: "16%" },
  ];
  return (
    <div className={panel}>
      <p className="border-b border-white/10 px-5 py-3 text-sm text-slate-400">Scope and timeline</p>
      <div className="space-y-4 px-5 py-5">
        {phases.map((p) => (
          <div key={p.name} className="grid grid-cols-[64px_1fr] items-center gap-3">
            <span className="text-sm text-slate-300">{p.name}</span>
            <div className="relative h-2.5 rounded-full bg-white/[0.06]">
              <span className="absolute inset-y-0 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400" style={{ left: p.left, width: p.width }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-5 py-4">
        {["Pages", "Mobile layout", "Search setup", "Contact form"].map((c) => (
          <span key={c} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[13px] text-slate-300">
            {c}
          </span>
        ))}
      </div>
      <p className="flex items-center gap-2 border-t border-white/10 px-5 py-3 text-sm text-slate-300">
        <Tick tone="green" />
        Agreed before any work starts
      </p>
    </div>
  );
}

function Build() {
  return (
    <div className={panel}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 flex-1 rounded-md bg-white/[0.06] px-3 py-1 text-xs text-slate-400">Preview link</span>
      </div>
      <div className="relative space-y-3 px-6 pb-6 pt-6">
        <div className="h-3 w-3/5 rounded-full bg-white/80" />
        <div className="h-2 w-4/5 rounded-full bg-white/15" />
        <div className="h-2 w-2/3 rounded-full bg-white/15" />
        <div className="relative mt-5 inline-block">
          <div className="h-9 w-32 rounded-full bg-indigo-400/80" />
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] text-slate-900 shadow">+</span>
        </div>
        <div className="grid grid-cols-3 gap-3 pt-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-14 rounded-xl border border-white/10 bg-white/[0.04]" />
          ))}
        </div>
      </div>
      <div className="space-y-2 border-t border-white/10 bg-slate-950/40 px-4 py-4">
        <div className="max-w-[85%] rounded-xl rounded-bl-sm border border-white/10 bg-white/[0.06] px-3.5 py-2.5 text-sm text-slate-200">
          Can we make this button stand out more?
        </div>
        <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-indigo-400/20 px-3.5 py-2.5 text-sm text-indigo-50 ring-1 ring-indigo-300/20">
          Done. Refresh the preview.
        </div>
      </div>
    </div>
  );
}

function Launch() {
  return (
    <div className={panel}>
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <span className="text-sm text-slate-300">yourbusiness.com</span>
        <span className="flex items-center gap-2 text-sm text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
          Live
        </span>
      </div>
      <ul className="m-0 list-none p-0">
        {["Domain connected", "Fast on mobile and desktop", "Ready for search engines", "Analytics switched on", "Support after launch"].map((t) => (
          <li key={t} className="flex items-center gap-3 border-b border-white/5 px-5 py-3.5 text-[15px] text-white last:border-b-0">
            <Tick tone="green" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

const steps = [
  { title: "Listen", body: "We talk. I learn what you need and who it is for.", View: Listen },
  { title: "Plan", body: "You get a clear scope and timeline before I start.", View: Plan },
  { title: "Build", body: "I build in stages and show you working previews.", View: Build },
  { title: "Launch and grow", body: "I take it live and stay on hand after.", View: Launch },
];

const ADVANCE_MS = 7000;

export default function About() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [hold, setHold] = useState(false); // pointer or focus inside
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Moves on by itself only while the card is on screen, not hovered or focused, and motion is allowed.
  // Choosing a step restarts the wait.
  useEffect(() => {
    if (reduce || !inView || hold) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % steps.length), ADVANCE_MS);
    return () => window.clearTimeout(t);
  }, [active, inView, hold, reduce]);

  const View = steps[active].View;

  return (
    <section id="about" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-12 md:text-5xl">
          How we&apos;ll work together.
        </h2>

        <div
          ref={rootRef}
          onMouseEnter={() => setHold(true)}
          onMouseLeave={() => setHold(false)}
          onFocus={() => setHold(true)}
          onBlur={() => setHold(false)}
          className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-[0_14px_36px_-26px_rgba(0,0,0,0.55)] md:p-8"
        >
          <div className="grid items-stretch gap-6 lg:grid-cols-[5fr_7fr] lg:gap-10">
            {/* What you would see at this stage */}
            <div
              aria-hidden="true"
              className="relative order-first flex h-[440px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 p-4 md:p-8 lg:order-last lg:h-[460px]"
            >
              <span className="scene-grid pointer-events-none absolute inset-0" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2" style={{ backgroundImage: "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(129, 140, 248, 0.26), transparent 75%)" }} />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative flex w-full justify-center"
                >
                  <View />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* The steps, with the actions at the foot of the same column */}
            <div className="flex flex-col justify-between gap-8">
            <ol className="m-0 flex list-none flex-col p-0">
              {steps.map((step, i) => {
                const on = i === active;
                return (
                  <li key={step.title} className="list-none">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={on ? "step" : undefined}
                      className={`block w-full rounded-2xl border px-5 py-3.5 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300 md:px-6 ${
                        on ? "border-white/10 bg-white/[0.05]" : "border-transparent hover:bg-white/[0.03]"
                      }`}
                    >
                      <span className={`block text-lg transition-colors duration-300 md:text-xl ${on ? "text-white" : "text-slate-400"}`}>{step.title}</span>
                      <span className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                        <span className="overflow-hidden">
                          <span className="block pt-1.5 text-[15px] leading-relaxed text-slate-300">{step.body}</span>
                        </span>
                      </span>
                    </button>
                    {i < steps.length - 1 && (
                      <span aria-hidden="true" className="flex py-1.5 pl-6 text-indigo-300/50">
                        <ArrowDown size={16} strokeWidth={1.75} />
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
            <div className="flex flex-wrap items-center gap-4">
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

        </div>
      </div>
    </section>
  );
}
