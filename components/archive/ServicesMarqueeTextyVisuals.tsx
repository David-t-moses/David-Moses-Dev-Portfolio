"use client";

// Earlier versions are in components/archive (Services*.tsx), the latest being
// ServicesMarqueeSkeletonVisuals.tsx (same cards with abstract skeleton drawings).

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { type LucideIcon, ArrowRight, Check, CreditCard, Database, FileText, Mail, MessageSquare, Search, Send, Shield, ShoppingBag, Sparkles, Users, Zap, RefreshCw, MapPin, Home } from "lucide-react";
import { useActive } from "../useActive";

/* ---------- drawings that say what each service is without reading ----------
   Each shows the finished thing in use, with a few real words. Illustrations only: no real
   clients, data or figures. */

const ui = "rounded-xl border border-white/10 bg-slate-950/85";
const Bar = ({ w, tone = "bg-white/15", h = "h-2" }: { w: string; tone?: string; h?: string }) => (
  <span className={`block rounded-full ${h} ${tone}`} style={{ width: w }} />
);

// A real looking shop front: nav with cart, headline, button, products, a new order arriving.
function Site() {
  return (
    <div className="relative w-[92%] max-w-[360px]">
      <div className={`${ui} overflow-hidden`}>
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="ml-2 flex h-4 flex-1 items-center rounded bg-white/[0.06] px-2 text-[9px] text-slate-400">yourbusiness.com</span>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between text-[11px] text-slate-300">
            <span className="flex items-center gap-1.5 text-white">
              <span className="h-3 w-3 rounded bg-indigo-400" />
              Acme
            </span>
            <span className="flex items-center gap-3">
              Shop
              <span>About</span>
              <span className="relative">
                <ShoppingBag size={13} aria-hidden="true" />
                <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-indigo-400 text-[8px] text-slate-950">3</span>
              </span>
            </span>
          </div>
          <p className="mt-4 text-[16px] leading-tight text-white">Everything your business needs, online.</p>
          <span className="mt-3 inline-block rounded-full bg-indigo-400 px-3.5 py-1.5 text-[11px] text-slate-950">Shop now</span>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {["from-indigo-400/40", "from-violet-400/40", "from-sky-400/35"].map((c, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-white/[0.03] p-1.5">
                <div className={`h-9 rounded bg-gradient-to-br ${c} to-transparent`} />
                <div className="mt-1.5 space-y-1">
                  <Bar w="70%" tone="bg-white/40" h="h-1" />
                  <Bar w="40%" h="h-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-4 -right-1 flex items-center gap-2 rounded-full border border-emerald-300/25 bg-slate-900 px-3.5 py-2 text-[11px] text-slate-100 shadow-lg">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        New order received
      </div>
    </div>
  );
}

// A support chat widget answering a customer from the business's own pages.
function Chat() {
  return (
    <div className={`${ui} w-[92%] max-w-[330px] overflow-hidden`}>
      <div className="flex items-center gap-2.5 border-b border-white/10 px-3.5 py-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-400/25 text-violet-100">
          <Sparkles size={14} aria-hidden="true" />
        </span>
        <div className="leading-tight">
          <p className="text-[12px] text-white">Support assistant</p>
          <p className="flex items-center gap-1.5 text-[10px] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Online
          </p>
        </div>
      </div>
      <div className="space-y-2.5 p-3.5">
        <div className="max-w-[78%] rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.06] px-3 py-2 text-[12px] text-slate-200">Do you ship to Canada?</div>
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-violet-400/20 px-3 py-2 text-[12px] text-violet-50 ring-1 ring-violet-300/25">Yes, in 3 to 5 working days.</div>
        <div className="ml-auto flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-slate-900 px-2.5 py-1 text-[10px] text-slate-300">
          <FileText size={10} aria-hidden="true" />
          From your shipping page
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/10 px-3.5 py-2.5 text-[11px] text-slate-500">
        Type a message
        <Send size={13} aria-hidden="true" className="text-violet-300" />
      </div>
    </div>
  );
}

// Two phones, one per platform, running a delivery tracking app.
function PhoneUi({ android }: { android?: boolean }) {
  return (
    <div className={`${android ? "rounded-[18px]" : "rounded-[28px]"} h-[250px] w-[132px] border-2 border-white/15 bg-slate-950 p-2.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]`}>
      {android ? <div className="mx-auto mb-2 h-1.5 w-1.5 rounded-full bg-white/20" /> : <div className="mx-auto mb-2 h-1.5 w-10 rounded-full bg-white/15" />}
      <p className="text-[10px] text-slate-400">Your order</p>
      <p className="text-[13px] leading-tight text-white">Arriving in 8 min</p>
      <div className="relative mt-2 h-20 overflow-hidden rounded-lg bg-gradient-to-br from-indigo-400/25 to-violet-400/10">
        <svg viewBox="0 0 120 80" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M10 66 C 36 60, 40 30, 70 38 S 100 20, 110 14" fill="none" stroke="#a5b4fc" strokeWidth="2" strokeDasharray="3 4" strokeLinecap="round" />
        </svg>
        <MapPin size={14} aria-hidden="true" className="absolute right-2 top-1.5 text-white" />
      </div>
      <div className="mt-2.5 space-y-2">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="h-6 w-6 shrink-0 rounded-md bg-white/10" />
            <div className="flex-1 space-y-1">
              <Bar w="75%" tone="bg-white/40" h="h-1.5" />
              <Bar w="45%" h="h-1.5" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-around border-t border-white/10 pt-2 text-slate-500">
        <Home size={13} aria-hidden="true" className="text-indigo-300" />
        <Search size={13} aria-hidden="true" />
        <Users size={13} aria-hidden="true" />
      </div>
    </div>
  );
}
function Phone() {
  return (
    <div className="relative flex translate-y-12 items-start justify-center">
      <div className="-mr-6 mt-10 -rotate-3 opacity-70">
        <PhoneUi android />
      </div>
      <div className="relative z-10 rotate-2">
        <PhoneUi />
      </div>
    </div>
  );
}

// New email in, AI sorts it, work done on its own.
function Flow() {
  const Node = ({ icon: Icon, label, tone = "" }: { icon: LucideIcon; label: string; tone?: string }) => (
    <span className={`flex w-[78px] flex-col items-center gap-1.5 rounded-xl border px-2 py-2.5 text-center text-[11px] leading-tight ${tone || "border-white/10 bg-slate-950/85 text-slate-200"}`}>
      <Icon size={16} className={tone ? "text-violet-100" : "text-slate-400"} />
      {label}
    </span>
  );
  return (
    <div className="grid w-[94%] max-w-[360px] grid-cols-[auto_18px_auto_18px_auto] items-center justify-center gap-0">
      <Node icon={Mail} label="New email" />
      <ArrowRight size={14} aria-hidden="true" className="mx-auto text-violet-300/70" />
      <div className="relative">
        <Node icon={Sparkles} label="AI sorts it" tone="border-violet-300/40 bg-violet-400/15 text-white" />
        <span className="absolute -right-1 -top-1 flex items-center gap-1 rounded-full bg-slate-900 px-1.5 py-0.5 text-[8px] text-emerald-300 ring-1 ring-white/10">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Running
        </span>
      </div>
      <ArrowRight size={14} aria-hidden="true" className="mx-auto text-violet-300/70" />
      <div className="flex flex-col gap-2">
        {["Added to CRM", "Reply drafted"].map((t) => (
          <span key={t} className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-white/10 bg-slate-950/85 px-2.5 py-2 text-[11px] text-slate-200">
            <Check size={12} aria-hidden="true" className="text-emerald-300" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// Your app at the centre, the tools it talks to around it.
function Connect() {
  const nodes = [
    { l: "Payments", Icon: CreditCard, x: 16, y: 24 },
    { l: "CRM", Icon: Users, x: 84, y: 24 },
    { l: "Messages", Icon: MessageSquare, x: 16, y: 76 },
    { l: "Data", Icon: Database, x: 84, y: 76 },
  ];
  return (
    <div className="relative h-[200px] w-[320px] max-w-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {nodes.map((n) => (
          <line key={n.l} x1="50" y1="50" x2={n.x} y2={n.y} stroke="#a5b4fc" strokeOpacity="0.6" strokeWidth="1.2" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" className="sc-flow" />
        ))}
      </svg>
      <span className="absolute left-1/2 top-1/2 flex h-14 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-indigo-300/40 bg-[#1c2150] text-[12px] text-white">Your app</span>
      {nodes.map(({ l, Icon, x, y }) => (
        <span key={l} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1" style={{ left: `${x}%`, top: `${y}%` }}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900 text-slate-200">
            <Icon size={17} />
          </span>
          <span className="text-[10px] text-slate-300">{l}</span>
        </span>
      ))}
    </div>
  );
}

// An app screen that now has an AI helper inside it.
function InProduct() {
  return (
    <div className="relative w-[92%] max-w-[340px]">
      <div className={`${ui} p-3`}>
        <p className="mb-2 px-1 text-[12px] text-white">Orders</p>
        {[
          { n: "Order 1042", s: "Late", late: true },
          { n: "Order 1043", s: "On time", late: false },
        ].map((r) => (
          <div key={r.n} className="flex items-center justify-between border-t border-white/5 px-1 py-2 text-[11px] text-slate-300">
            {r.n}
            <span className={`rounded-full px-2 py-0.5 text-[10px] ${r.late ? "bg-amber-400/15 text-amber-300" : "bg-emerald-400/15 text-emerald-300"}`}>{r.s}</span>
          </div>
        ))}
      </div>
      <div className="relative -mt-1 ml-4 rounded-xl border border-violet-300/35 bg-slate-900 p-3 shadow-xl">
        <p className="flex items-center gap-1.5 text-[10px] text-violet-200">
          <Sparkles size={11} aria-hidden="true" />
          AI summary
        </p>
        <p className="mt-1 text-[12px] leading-snug text-white">2 orders are running late. Tell those customers?</p>
        <span className="mt-2 inline-block rounded-full bg-violet-300 px-3 py-1 text-[10px] text-slate-950">Send updates</span>
      </div>
    </div>
  );
}

// Found first on search, fast, secure and kept up to date.
function Health() {
  return (
    <div className="w-[92%] max-w-[330px]">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/85 px-3.5 py-2 text-[12px] text-slate-200">
        <Search size={13} aria-hidden="true" className="text-slate-400" />
        best bakery near me
      </div>
      <div className="mt-3 rounded-xl border border-emerald-300/30 bg-slate-950/85 p-3.5">
        <p className="text-[10px] text-slate-400">acmebakery.com</p>
        <p className="mt-0.5 text-[14px] text-indigo-200">Acme Bakery | Fresh bread, daily</p>
        <div className="mt-2 space-y-1.5">
          <Bar w="95%" tone="bg-white/25" h="h-1.5" />
          <Bar w="70%" tone="bg-white/15" h="h-1.5" />
        </div>
        <span className="mt-2.5 inline-block rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] text-emerald-300">Top result</span>
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {[
          { t: "Fast", I: Zap },
          { t: "Secure", I: Shield },
          { t: "Up to date", I: RefreshCw },
        ].map(({ t, I }) => (
          <span key={t} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] text-slate-200">
            <I size={11} aria-hidden="true" className="text-emerald-300" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// A contract you can question: the AI finds the answer and shows where it came from.
function Docs() {
  return (
    <div className="w-[92%] max-w-[330px]">
      <div className={`${ui} p-3.5`}>
        <p className="flex items-center gap-2 text-[11px] text-slate-300">
          <FileText size={13} aria-hidden="true" className="text-slate-400" />
          Contract.pdf
        </p>
        <div className="mt-3 space-y-1.5">
          <Bar w="100%" h="h-1.5" />
          <Bar w="92%" h="h-1.5" />
          <span className="block rounded bg-violet-400/30 p-1"><Bar w="88%" tone="bg-violet-200/70" h="h-1.5" /></span>
          <Bar w="96%" h="h-1.5" />
          <Bar w="60%" h="h-1.5" />
        </div>
      </div>
      <div className="mt-2.5 ml-6 rounded-xl rounded-br-sm border border-white/10 bg-white/[0.06] px-3 py-2 text-[11px] text-slate-200">What is the notice period?</div>
      <div className="mt-2 rounded-xl rounded-tl-sm border border-violet-300/30 bg-violet-400/10 px-3 py-2">
        <p className="flex items-center gap-1.5 text-[10px] text-violet-200">
          <Sparkles size={11} aria-hidden="true" />
          Answer
        </p>
        <p className="mt-0.5 text-[12px] text-white">30 days, written notice. See page 4.</p>
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

        {/* The way in: one line, two actions */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative mt-6 flex flex-col gap-7 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 px-7 py-9 md:mt-8 md:flex-row md:items-center md:justify-between md:px-12 md:py-12"
        >
          <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 50% 120% at 100% 50%, rgba(99, 102, 241, 0.22), transparent 70%)" }} />
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent" />
          <div className="relative">
            <h3 className="text-3xl leading-[1.1] tracking-tight text-white md:text-4xl">Bring me the problem.</h3>
            <p className="mt-3 max-w-md text-base leading-relaxed text-slate-300">I will come back with what to build, and what it takes.</p>
          </div>
          <div className="relative flex flex-wrap items-center gap-4">
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
