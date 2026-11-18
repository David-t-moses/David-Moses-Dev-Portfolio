"use client";

// Earlier versions are in components/archive (AboutMonitorOnly, AboutApproachSeparateCards,
// AboutApproachFourScenes, AboutApproachStepperDrawnScenes). The "Your idea, taking shape" monitor
// intro is switched off.

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Code2, Eye, FileCheck, Gauge, Globe, MessageSquare, Monitor, Pencil, PenLine, Rocket, Search, ShieldCheck, Smartphone, Target, TrendingUp, Users } from "lucide-react";
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

const Avatar = ({ children, me }: { children: React.ReactNode; me?: boolean }) => (
  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] ${me ? "bg-indigo-400/30 text-indigo-100" : "bg-white/10 text-slate-200"}`}>{children}</span>
);

// Listen: a real conversation, and what I write down from it.
function Listen() {
  return (
    <div className="w-full max-w-[470px] space-y-3">
      <div className="flex items-end gap-2.5">
        <Avatar>You</Avatar>
        <div className="max-w-[78%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-4 py-3 text-[15px] text-slate-200">
          I need a website that brings in customers.
        </div>
      </div>
      <div className="flex flex-row-reverse items-end gap-2.5">
        <Avatar me>Me</Avatar>
        <div className="max-w-[78%] rounded-2xl rounded-br-md bg-indigo-400/20 px-4 py-3 text-[15px] text-indigo-50 ring-1 ring-indigo-300/20">
          Got it. Tell me who they are and what you sell.
        </div>
      </div>
      <div className={`${panel} !mt-4`}>
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-sm text-slate-400">
          <span className="flex items-center gap-2">
            <PenLine size={14} aria-hidden="true" />
            What I wrote down
          </span>
        </div>
        {[
          { I: Target, k: "Goal", v: "More customers online" },
          { I: Users, k: "Audience", v: "First time buyers" },
          { I: TrendingUp, k: "Success", v: "More orders each month" },
        ].map(({ I, k, v }) => (
          <div key={k} className="flex items-center gap-3 border-b border-white/5 px-5 py-3 last:border-b-0">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06] text-indigo-200">
              <I size={14} aria-hidden="true" />
            </span>
            <span className="w-16 text-sm text-slate-400">{k}</span>
            <span className="flex-1 text-[15px] text-white">{v}</span>
            <Tick />
          </div>
        ))}
      </div>
    </div>
  );
}

// Plan: the work laid out week by week, and the scope and price agreed in writing.
function Plan() {
  const phases = [
    { I: Pencil, name: "Design", from: 0, to: 1.6 },
    { I: Code2, name: "Build", from: 1.2, to: 3.2 },
    { I: Eye, name: "Review", from: 2.8, to: 3.6 },
    { I: Rocket, name: "Launch", from: 3.5, to: 4 },
  ];
  return (
    <div className={panel}>
      <div className="grid grid-cols-[84px_1fr] items-center gap-3 border-b border-white/10 px-5 py-3 text-[11px] text-slate-500">
        <span className="text-sm text-slate-400">Timeline</span>
        <span className="grid grid-cols-4 text-center">
          {["Week 1", "Week 2", "Week 3", "Week 4"].map((w) => (
            <span key={w}>{w}</span>
          ))}
        </span>
      </div>
      <div className="space-y-3.5 px-5 py-5">
        {phases.map((p, i) => (
          <div key={p.name} className="grid grid-cols-[84px_1fr] items-center gap-3">
            <span className="flex items-center gap-2 text-sm text-slate-300">
              <p.I size={14} aria-hidden="true" className="text-indigo-200" />
              {p.name}
            </span>
            <div className="relative h-3 rounded-full bg-white/[0.06]">
              <span
                className={`absolute inset-y-0 rounded-full ${i === 3 ? "bg-emerald-400" : "bg-gradient-to-r from-indigo-400 to-violet-400"}`}
                style={{ left: `${(p.from / 4) * 100}%`, width: `${((p.to - p.from) / 4) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 border-t border-white/10 text-sm text-slate-200">
        <span className="flex items-center gap-2.5 border-r border-white/10 px-5 py-3.5">
          <FileCheck size={15} aria-hidden="true" className="text-emerald-300" />
          Scope agreed
        </span>
        <span className="flex items-center gap-2.5 px-5 py-3.5">
          <FileCheck size={15} aria-hidden="true" className="text-emerald-300" />
          Price agreed
        </span>
      </div>
    </div>
  );
}

// Build: a real preview link, a note from the client on the button, my reply, and sign off.
function Build() {
  return (
    <div className={panel}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 flex min-w-0 flex-1 items-center justify-between gap-2 rounded-md bg-white/[0.06] px-3 py-1 text-xs text-slate-400">
          <span className="truncate">preview.yourbusiness.com</span>
          <span className="flex shrink-0 items-center gap-2 text-slate-500">
            <Monitor size={13} aria-hidden="true" className="text-indigo-200" />
            <Smartphone size={13} aria-hidden="true" />
          </span>
        </span>
      </div>

      <div className="relative bg-white/[0.02] px-6 pb-5 pt-5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="h-3.5 w-3.5 rounded bg-indigo-400" />
            <span className="h-2.5 w-14 rounded-full bg-white/70" />
          </span>
          <span className="flex gap-3">
            <span className="h-2 w-8 rounded-full bg-white/15" />
            <span className="h-2 w-8 rounded-full bg-white/15" />
            <span className="h-2 w-8 rounded-full bg-white/15" />
          </span>
        </div>
        <div className="mt-5 grid grid-cols-[1.1fr_1fr] items-center gap-5">
          <div className="space-y-2.5">
            <div className="h-3.5 w-full rounded-full bg-white/85" />
            <div className="h-3.5 w-3/4 rounded-full bg-white/85" />
            <div className="h-2 w-5/6 rounded-full bg-white/15" />
            <div className="relative pt-3">
              <div className="h-9 w-32 rounded-full bg-indigo-400 ring-4 ring-indigo-300/25" />
              <span className="absolute -right-2 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-900 shadow">
                <MessageSquare size={12} aria-hidden="true" />
              </span>
            </div>
          </div>
          <div className="relative h-24 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-indigo-400/35 via-violet-400/20 to-sky-400/10">
            <span className="absolute right-3 top-3 h-5 w-5 rounded-full bg-white/50" />
            <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-12 w-full" aria-hidden="true">
              <path d="M0 60 L25 20 L45 42 L68 10 L100 60 Z" fill="rgba(15,23,42,0.55)" />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-2 border-t border-white/10 bg-slate-950/50 px-4 py-4">
        <div className="flex items-start gap-3">
          <Avatar>You</Avatar>
          <div className="rounded-xl rounded-tl-sm border border-white/10 bg-white/[0.06] px-3.5 py-2 text-sm text-slate-200">Can we make this button stand out more?</div>
        </div>
        <div className="flex items-start justify-end gap-3">
          <div className="rounded-xl rounded-tr-sm bg-indigo-400/20 px-3.5 py-2 text-sm text-indigo-50 ring-1 ring-indigo-300/20">Done. Take another look.</div>
          <Avatar me>Me</Avatar>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1.5">
          <span className="flex items-center gap-2 text-sm text-slate-300">
            <Tick tone="green" />
            Resolved
          </span>
          <span className="whitespace-nowrap rounded-full bg-white px-4 py-1.5 text-sm text-slate-900">Approve this stage</span>
        </div>
      </div>
    </div>
  );
}

// Launch: it goes live, visitors arrive, and the basics are already handled.
function Launch() {
  return (
    <div className={panel}>
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <span className="flex items-center gap-2 text-sm text-slate-300">
          <Globe size={14} aria-hidden="true" className="text-slate-400" />
          yourbusiness.com
        </span>
        <span className="flex items-center gap-2 text-sm text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
          Live
        </span>
      </div>
      <div className="px-5 pb-2 pt-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Users size={13} aria-hidden="true" />
            Visitors
          </span>
          <span className="flex items-center gap-1 text-emerald-300">
            <TrendingUp size={13} aria-hidden="true" />
            Growing
          </span>
        </div>
        <svg viewBox="0 0 220 70" className="mt-2 h-[70px] w-full" aria-hidden="true">
          <defs>
            <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 58 L30 52 L60 54 L90 40 L120 44 L150 26 L185 18 L220 6 V70 H0 Z" fill="url(#lg)" />
          <path d="M0 58 L30 52 L60 54 L90 40 L120 44 L150 26 L185 18 L220 6" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="grid grid-cols-2 border-t border-white/10">
        {[
          { I: Globe, t: "Domain connected" },
          { I: Gauge, t: "Fast on every device" },
          { I: Search, t: "Ready for search" },
          { I: ShieldCheck, t: "Secure and backed up" },
        ].map(({ I, t }, i) => (
          <span key={t} className={`flex items-center gap-2.5 px-4 py-3 text-[13px] text-slate-200 ${i % 2 === 0 ? "border-r border-white/10" : ""} ${i < 2 ? "border-b border-white/10" : ""}`}>
            <I size={14} aria-hidden="true" className="shrink-0 text-emerald-300" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// Written the way I would say it across a table: first person, plain, specific.
const steps = [
  {
    title: "Listen",
    line: "Every project starts with a conversation, not a questionnaire.",
    para: "I ask about your business, your customers and what a good result looks like, then tell you honestly what I think will work. If it is not the right fit, I will say so.",
    View: Listen,
  },
  {
    title: "Plan",
    line: "Before I write a line of code, you know exactly what you are getting.",
    para: "A clear scope, a timeline and a price, agreed in writing. No surprises later, and you always know what happens next.",
    View: Plan,
  },
  {
    title: "Build",
    line: "I build in stages and show you the real thing as I go.",
    para: "Working previews, not screenshots. You react while it is still easy to change, and nothing goes live without your say.",
    View: Build,
  },
  {
    title: "Launch and grow",
    line: "Launch day is where I start paying attention, not where I disappear.",
    para: "I handle the launch, make sure it is fast, secure and easy to find, and stay close afterwards. If something needs fixing or you want to grow it, you message me and I answer.",
    View: Launch,
  },
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
                  <motion.div
                    key={active}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <p className="text-balance text-2xl leading-snug text-white md:text-[30px] md:leading-[1.25]">{steps[active].line}</p>
                    <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-slate-300 md:text-[17px] md:leading-[1.7]">{steps[active].para}</p>
                  </motion.div>
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
