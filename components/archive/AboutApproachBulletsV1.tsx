"use client";

// Earlier versions are in components/archive (AboutMonitorOnly, AboutApproachSeparateCards,
// AboutApproachFourScenes, AboutApproachStepperDrawnScenes). The "Your idea, taking shape" monitor
// intro is switched off.

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
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
        <span className="ml-3 flex min-w-0 flex-1 items-center justify-between gap-2 rounded-md bg-white/[0.06] px-3 py-1 text-xs text-slate-400">
          <span className="truncate">preview.yourbusiness.com</span>
          <span className="hidden shrink-0 text-emerald-300 sm:inline">Updated just now</span>
        </span>
      </div>

      {/* The page being built */}
      <div className="relative bg-white/[0.02] px-6 pb-6 pt-5">
        <div className="flex items-center justify-between">
          <span className="h-3 w-16 rounded-full bg-white/70" />
          <span className="flex gap-3">
            <span className="h-2 w-8 rounded-full bg-white/15" />
            <span className="h-2 w-8 rounded-full bg-white/15" />
            <span className="h-2 w-8 rounded-full bg-white/15" />
          </span>
        </div>
        <div className="mt-6 grid grid-cols-[1.1fr_1fr] items-center gap-5">
          <div className="space-y-2.5">
            <div className="h-3.5 w-full rounded-full bg-white/85" />
            <div className="h-3.5 w-3/4 rounded-full bg-white/85" />
            <div className="h-2 w-5/6 rounded-full bg-white/15" />
            <div className="relative pt-3">
              <div className="h-9 w-32 rounded-full bg-indigo-400 ring-4 ring-indigo-300/25" />
              <span className="absolute -right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] text-slate-900 shadow">1</span>
            </div>
          </div>
          <div className="h-24 rounded-xl border border-white/10 bg-gradient-to-br from-indigo-400/25 via-violet-400/15 to-transparent" />
        </div>
      </div>

      {/* Feedback, answered */}
      <div className="space-y-2 border-t border-white/10 bg-slate-950/50 px-4 py-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-[11px] text-slate-200">You</span>
          <div className="rounded-xl rounded-tl-sm border border-white/10 bg-white/[0.06] px-3.5 py-2 text-sm text-slate-200">Can we make this button stand out more?</div>
        </div>
        <div className="flex items-start justify-end gap-3">
          <div className="rounded-xl rounded-tr-sm bg-indigo-400/20 px-3.5 py-2 text-sm text-indigo-50 ring-1 ring-indigo-300/20">Done. Take another look.</div>
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-400/30 text-[11px] text-indigo-100">Me</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
          <span className="flex items-center gap-2 text-sm text-slate-300">
            <Tick tone="green" />
            Feedback resolved
          </span>
          <span className="whitespace-nowrap rounded-full bg-white px-4 py-1.5 text-sm text-slate-900">Approve this stage</span>
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
  { title: "Listen", line: "We talk first. I learn what you need and who it is for.", gets: ["A clear brief of your goals", "Honest advice on what to build", "No jargon, no pressure"], View: Listen },
  { title: "Plan", line: "You get a clear scope and timeline before I start.", gets: ["What is included, in writing", "Key dates you can plan around", "A fair, agreed price"], View: Plan },
  { title: "Build", line: "I build in stages and you see working previews as I go.", gets: ["A live preview link", "Your feedback built in fast", "Sign off at every stage"], View: Build },
  { title: "Launch and grow", line: "I take it live, then stay on hand to help it grow.", gets: ["Launch handled end to end", "Fast, secure and findable", "Support when you need it"], View: Launch },
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
          {/* The four steps in order, left to right */}
          <ol className="m-0 grid list-none grid-cols-2 gap-2 p-0 md:flex md:items-center md:gap-0">
            {steps.map((step, i) => {
              const on = i === active;
              return (
                <li key={step.title} className="flex list-none items-center md:flex-1">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={on ? "step" : undefined}
                    className={`w-full rounded-xl border px-4 py-3 text-center text-base transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300 md:text-lg ${
                      on ? "border-white/15 bg-white/[0.07] text-white" : "border-transparent text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                    }`}
                  >
                    {step.title}
                  </button>
                  {i < steps.length - 1 && <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} className="mx-3 hidden shrink-0 text-indigo-300/50 md:block" />}
                </li>
              );
            })}
          </ol>

          <div className="mt-6 grid items-stretch gap-6 md:mt-8 lg:grid-cols-[4fr_6fr] lg:gap-10">
            {/* What the client sees at this stage */}
            <div
              aria-hidden="true"
              className="relative order-first flex h-[470px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 p-4 md:p-8 lg:order-last lg:h-[480px]"
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

            {/* What it means, and what to do next */}
            <div className="flex flex-col justify-between gap-8">
              <div aria-live="polite" className="pt-2">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="text-balance text-2xl leading-snug text-white md:text-[32px] md:leading-[1.25]"
                  >
                    {steps[active].line}
                  </motion.p>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.ul
                    key={active}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, delay: reduce ? 0 : 0.08, ease: "easeOut" }}
                    className="m-0 mt-6 list-none space-y-3 p-0"
                  >
                    {steps[active].gets.map((g) => (
                      <li key={g} className="flex items-center gap-3 text-base text-slate-300">
                        <Tick />
                        {g}
                      </li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>
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
