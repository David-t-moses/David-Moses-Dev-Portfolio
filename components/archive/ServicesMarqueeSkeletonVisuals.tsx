"use client";

// Earlier versions: components/archive/ServicesStickyIntroCards.tsx, ServicesTwoListCards.tsx,
// ServicesWorryBubbleCards.tsx

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useActive } from "../useActive";
import { Check, FileText, Mail, Search, Sparkles, ArrowRight, ListChecks, Send } from "lucide-react";

/* ---------- small interface drawings: what each service looks like when it is done ---------- */

const ui = "rounded-xl border border-white/10 bg-slate-950/85";
const Bar = ({ w, tone = "bg-white/15", h = "h-2" }: { w: string; tone?: string; h?: string }) => (
  <span className={`block rounded-full ${h} ${tone}`} style={{ width: w }} />
);

function Site() {
  return (
    <div className="relative w-[90%] max-w-[470px]">
      <div className={`${ui} overflow-hidden`}>
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="ml-2 h-4 flex-1 rounded bg-white/[0.06]" />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <Bar w="48px" tone="bg-white/70" h="h-2.5" />
            <span className="flex gap-2">
              <Bar w="22px" />
              <Bar w="22px" />
              <Bar w="22px" />
            </span>
          </div>
          <div className="mt-5 grid grid-cols-[1.2fr_1fr] items-center gap-4">
            <div className="space-y-2">
              <Bar w="100%" tone="bg-white/85" h="h-3" />
              <Bar w="70%" tone="bg-white/85" h="h-3" />
              <Bar w="85%" />
              <div className="flex pt-2">
                <span className="h-8 w-24 rounded-full bg-indigo-400 ring-4 ring-indigo-300/20" />
              </div>
            </div>
            <div className="h-24 rounded-lg border border-white/10 bg-gradient-to-br from-indigo-400/30 via-violet-400/15 to-transparent" />
          </div>
        </div>
      </div>
      <div className="absolute -bottom-4 -right-1 flex items-center gap-2 rounded-full border border-emerald-300/25 bg-slate-900 px-3.5 py-2 text-xs text-slate-100 shadow-lg">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        New enquiry
      </div>
    </div>
  );
}

function Phone() {
  return (
    <div className="translate-y-10 rounded-[30px] border-2 border-white/15 bg-slate-950 p-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]" style={{ width: 168 }}>
      <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-white/15" />
      <div className="flex items-center justify-between">
        <Bar w="50px" tone="bg-white/70" h="h-2.5" />
        <span className="h-5 w-5 rounded-full bg-indigo-400/70" />
      </div>
      <div className="mt-3 h-16 rounded-xl bg-gradient-to-br from-indigo-400/35 to-violet-400/15" />
      <div className="mt-3 space-y-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="h-7 w-7 shrink-0 rounded-lg bg-white/10" />
            <div className="flex-1 space-y-1.5">
              <Bar w="80%" tone="bg-white/40" h="h-1.5" />
              <Bar w="50%" h="h-1.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Connect() {
  const nodes = [
    { l: "Payments", x: 14, y: 22 },
    { l: "CRM", x: 86, y: 22 },
    { l: "Messaging", x: 14, y: 78 },
    { l: "Data", x: 86, y: 78 },
  ];
  return (
    <div className="relative h-[190px] w-[300px] max-w-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {nodes.map((n) => (
          <line key={n.l} x1="50" y1="50" x2={n.x} y2={n.y} stroke="#a5b4fc" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" className="sc-flow" />
        ))}
      </svg>
      <span className="absolute left-1/2 top-1/2 flex h-12 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center whitespace-nowrap rounded-2xl border border-indigo-300/40 bg-indigo-400/20 text-xs text-white">Your app</span>
      {nodes.map((n) => (
        <span key={n.l} className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-slate-900 px-3 py-1.5 text-xs text-slate-200" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
          {n.l}
        </span>
      ))}
    </div>
  );
}

function Health() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="#34d399" strokeWidth="8" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="14" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-emerald-300">
          <Check size={30} strokeWidth={2} aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {["Fast", "Found", "Secure"].map((t) => (
          <span key={t} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-200">{t}</span>
        ))}
      </div>
    </div>
  );
}

function Chat() {
  return (
    <div className="w-[84%] max-w-[460px] space-y-3">
      <div className="max-w-[80%] rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.06] px-4 py-2.5 text-[13px] text-slate-200">Do you ship to Canada?</div>
      <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-violet-400/20 px-4 py-2.5 text-[13px] text-violet-50 ring-1 ring-violet-300/25">
        Yes, in 3 to 5 working days.
      </div>
      <div className="ml-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-slate-900 px-3 py-1.5 text-[11px] text-slate-300">
        <FileText size={12} aria-hidden="true" />
        Answered from your shipping page
      </div>
    </div>
  );
}

function Flow() {
  const steps = [
    { i: Mail, t: "Email arrives" },
    { i: Sparkles, t: "AI reads it" },
    { i: ListChecks, t: "Task created" },
    { i: Send, t: "Reply sent" },
  ];
  return (
    <div className="flex w-[92%] max-w-[560px] flex-wrap items-center justify-center gap-x-1 gap-y-3">
      {steps.map((s, k) => {
        const Icon = s.i;
        return (
          <React.Fragment key={s.t}>
            <span className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs ${k === 1 ? "border-violet-300/40 bg-violet-400/15 text-white" : "border-white/10 bg-slate-950/85 text-slate-200"}`}>
              <Icon size={14} aria-hidden="true" className={k === 1 ? "text-violet-200" : "text-slate-400"} />
              {s.t}
            </span>
            {k < steps.length - 1 && <ArrowRight size={14} aria-hidden="true" className="text-violet-300/60" />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function InProduct() {
  return (
    <div className={`${ui} w-[90%] max-w-[380px] p-3`}>
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300">
        <Search size={13} aria-hidden="true" />
        Show me last month&apos;s late orders
        <Sparkles size={13} aria-hidden="true" className="ml-auto text-violet-300" />
      </div>
      <div className="mt-2.5 space-y-2">
        {["bg-violet-400/15 border-violet-300/25", "bg-white/[0.03] border-white/10", "bg-white/[0.03] border-white/10"].map((c, i) => (
          <div key={i} className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 ${c}`}>
            <span className="h-6 w-6 rounded-md bg-white/10" />
            <div className="flex-1 space-y-1.5">
              <Bar w={`${75 - i * 12}%`} tone="bg-white/45" h="h-1.5" />
              <Bar w="40%" h="h-1.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Docs() {
  return (
    <div className="flex w-[92%] max-w-[420px] items-center gap-3">
      <div className={`${ui} w-[46%] space-y-2 p-3`}>
        <Bar w="60%" tone="bg-white/60" />
        <Bar w="100%" />
        <Bar w="90%" tone="bg-violet-400/50" />
        <Bar w="100%" tone="bg-violet-400/50" />
        <Bar w="70%" />
        <Bar w="95%" />
      </div>
      <ArrowRight size={16} aria-hidden="true" className="shrink-0 text-violet-300/70" />
      <div className="flex-1 rounded-xl border border-violet-300/30 bg-violet-400/10 p-3">
        <p className="flex items-center gap-1.5 text-[11px] text-violet-200">
          <Sparkles size={12} aria-hidden="true" />
          Answer
        </p>
        <div className="mt-2 space-y-1.5">
          <Bar w="100%" tone="bg-white/60" h="h-1.5" />
          <Bar w="80%" tone="bg-white/40" h="h-1.5" />
        </div>
        <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-300">
          <Check size={12} aria-hidden="true" className="text-emerald-300" />
          Source linked
        </p>
      </div>
    </div>
  );
}

/* ---------- the services ---------- */

type Item = { name: string; body: string; Visual: React.ComponentType; ai?: boolean };

// A short list, on purpose: one clear specialty, not a menu of every possible job.
// Build and AI work alternate across the two rows so the offer reads as one.
const rowA: Item[] = [
  { name: "Websites and web apps", body: "Sites, online stores and web apps that turn visitors into customers.", Visual: Site },
  { name: "AI assistants and chatbots", body: "Assistants that answer your customers using your own content.", Visual: Chat, ai: true },
  { name: "Mobile apps", body: "Native and cross platform apps for iOS and Android.", Visual: Phone },
  { name: "Workflow automation", body: "Repetitive work handled quietly by AI in the background.", Visual: Flow, ai: true },
];
const rowB: Item[] = [
  { name: "Integrations and APIs", body: "Payments, CRMs and messaging connected into one flow.", Visual: Connect },
  { name: "AI inside your product", body: "Search, summaries and recommendations built in.", Visual: InProduct, ai: true },
  { name: "Speed, search and care", body: "Fast, found on search, updated and secure.", Visual: Health },
  { name: "Document and data intelligence", body: "PDFs, emails and records turned into answers.", Visual: Docs, ai: true },
];

function Card({ it }: { it: Item }) {
  return (
    <>
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%]" style={{ backgroundImage: `radial-gradient(ellipse 70% 80% at 50% 100%, ${it.ai ? "rgba(139, 92, 246, 0.22)" : "rgba(99, 102, 241, 0.20)"}, transparent 80%)` }} />
      <div className="relative flex h-[270px] items-center justify-center overflow-hidden pt-4">
        <span aria-hidden="true" className="scene-grid pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="relative flex w-full items-center justify-center transition-transform duration-500 ease-out group-hover/t:scale-[1.04]">
          <it.Visual />
        </div>
      </div>
      <div className="relative px-6 pb-6 pt-2 md:px-7 md:pb-7">
        <h3 className="text-xl text-white md:text-[22px]">{it.name}</h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-slate-400 transition-colors duration-300 group-hover/t:text-slate-300">{it.body}</p>
      </div>
    </>
  );
}

function Group({ list, hidden }: { list: Item[]; hidden?: boolean }) {
  // Listed twice so one group is wider than any screen, so the loop never shows a gap.
  const all = [...list, ...list];
  return (
    <ul className="marquee-group" aria-hidden={hidden || undefined}>
      {all.map((it, i) => (
        <li
          key={`${it.name}-${i}`}
          aria-hidden={i >= list.length ? true : undefined}
          className={`group/t relative flex w-[310px] shrink-0 list-none flex-col overflow-hidden rounded-3xl border bg-slate-900/60 shadow-[0_14px_36px_-28px_rgba(0,0,0,0.55)] transition-colors duration-300 md:w-[380px] ${
            it.ai ? "border-violet-300/15 hover:border-violet-300/40" : "border-white/10 hover:border-white/25"
          } ${i >= list.length ? "marquee-dup" : ""}`}
        >
          <Card it={it} />
        </li>
      ))}
    </ul>
  );
}

function Row({ list, reverse, seconds }: { list: Item[]; reverse?: boolean; seconds: number }) {
  return (
    <div className={`marquee-track ${reverse ? "marquee-right" : "marquee-left"}`} style={{ animationDuration: `${seconds}s` }}>
      <Group list={list} />
      <Group list={list} hidden />
    </div>
  );
}

/** Edge to edge, two rows in opposite directions. CSS transform only; pauses on hover, focus, off screen and with the tab hidden. */
function ServicesMarquee() {
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
      aria-label="Services"
      tabIndex={0}
      className="marquee marquee-cards relative -mx-6 flex flex-col gap-4 overflow-hidden py-1 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-300 md:-mx-10 lg:gap-5"
    >
      <Row list={rowA} seconds={85} />
      <Row list={rowB} reverse seconds={95} />
    </div>
  );
}

export default function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-12 md:text-5xl">
          What you can stop worrying about.
        </h2>

        <ServicesMarquee />

        {/* The way in */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative mt-6 flex flex-col gap-6 overflow-hidden rounded-3xl border border-indigo-300/25 bg-gradient-to-br from-indigo-500/25 via-violet-500/15 to-slate-900/60 p-7 md:mt-8 md:flex-row md:items-center md:justify-between md:p-9"
        >
          <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-indigo-400/20 blur-3xl" />
          <div className="relative">
            <h3 className="text-2xl leading-snug text-white md:text-[28px]">Not sure what you need?</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-200 md:text-base">Tell me the problem. I will tell you what to build.</p>
          </div>
          <div className="relative flex flex-wrap items-center gap-3">
            <Link href="#contact" className="btn-compact btn-compact-light gap-2 px-5">
              Start a project
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
