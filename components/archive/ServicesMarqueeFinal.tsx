"use client";

// Earlier versions are in components/archive (Services*.tsx), the latest being
// ServicesMarqueeSkeletonVisuals.tsx (same cards with abstract skeleton drawings).

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { type LucideIcon, ArrowRight, Bell, Check, CircleHelp, CreditCard, Database, FileText, Heart, Home, LayoutGrid, MapPin, Mail, MessageSquare, RefreshCw, Search, Send, Shield, ShoppingBag, Sparkles, Table, TrendingUp, Truck, Users, Zap } from "lucide-react";
import { useActive } from "../useActive";

/* ---------- drawings that explain each service by sight, with almost no words ----------
   Illustrations only: no real clients, data or figures. */

const ui = "rounded-xl border border-white/10 bg-slate-950/85";
const Bar = ({ w, tone = "bg-white/15", h = "h-2" }: { w: string; tone?: string; h?: string }) => (
  <span className={`block rounded-full ${h} ${tone}`} style={{ width: w }} />
);
const Tile = ({ Icon, tone = "border-white/10 bg-slate-900 text-slate-200", size = "h-11 w-11" }: { Icon: LucideIcon; tone?: string; size?: string }) => (
  <span className={`relative flex ${size} shrink-0 items-center justify-center rounded-xl border ${tone}`}>
    <Icon size={18} aria-hidden="true" />
  </span>
);
const Badge = () => (
  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-slate-950">
    <Check size={10} strokeWidth={3} aria-hidden="true" />
  </span>
);

// A website with a hero picture, products and a cart, and a sales chart climbing beside it.
function Site() {
  return (
    <div className="relative w-[92%] max-w-[370px]">
      <div className={`${ui} overflow-hidden`}>
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="ml-2 h-3.5 flex-1 rounded bg-white/[0.06]" />
        </div>
        <div className="p-3.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="h-3.5 w-3.5 rounded bg-indigo-400" />
              <Bar w="34px" tone="bg-white/60" h="h-2" />
            </span>
            <span className="flex items-center gap-2.5">
              <Bar w="22px" />
              <Bar w="22px" />
              <span className="relative text-slate-300">
                <ShoppingBag size={14} aria-hidden="true" />
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-indigo-400" />
              </span>
            </span>
          </div>
          <div className="mt-3.5 grid grid-cols-2 gap-3">
            <div className="space-y-2 pt-1">
              <Bar w="100%" tone="bg-white/85" h="h-3" />
              <Bar w="72%" tone="bg-white/85" h="h-3" />
              <Bar w="88%" h="h-1.5" />
              <span className="mt-1 block h-6 w-16 rounded-full bg-indigo-400" />
            </div>
            <div className="relative h-[76px] overflow-hidden rounded-lg bg-gradient-to-br from-indigo-400/50 via-violet-400/30 to-sky-400/20">
              <span className="absolute right-3 top-3 h-5 w-5 rounded-full bg-white/60" />
              <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-12 w-full" aria-hidden="true">
                <path d="M0 60 L25 20 L45 42 L68 10 L100 60 Z" fill="rgba(15,23,42,0.55)" />
              </svg>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["from-indigo-400/45", "from-violet-400/45", "from-sky-400/40"].map((c, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-white/[0.03] p-1.5">
                <div className={`h-8 rounded bg-gradient-to-br ${c} to-transparent`} />
                <div className="mt-1.5">
                  <Bar w="50%" tone="bg-white/45" h="h-1.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-3 -right-2 w-[118px] rounded-xl border border-emerald-300/30 bg-slate-900 p-2.5 shadow-xl">
        <div className="flex items-center justify-between">
          <TrendingUp size={14} aria-hidden="true" className="text-emerald-300" />
          <Bar w="30px" tone="bg-white/25" h="h-1.5" />
        </div>
        <div className="mt-2 flex h-9 items-end gap-1.5">
          {[28, 40, 36, 58, 72, 100].map((h, i) => (
            <span key={i} className={`flex-1 rounded-sm ${i === 5 ? "bg-emerald-400" : "bg-emerald-400/35"}`} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Two phones, two platforms: a tracking map with a progress bar, and a feed of picture cards.
function Tracker({ android }: { android?: boolean }) {
  return (
    <div className={`${android ? "rounded-[18px]" : "rounded-[28px]"} h-[250px] w-[132px] border-2 border-white/15 bg-slate-950 p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]`}>
      <div className={`mx-auto mb-2 h-1.5 ${android ? "w-1.5" : "w-10"} rounded-full bg-white/15`} />
      <div className="relative h-[104px] overflow-hidden rounded-xl bg-gradient-to-br from-indigo-400/25 to-violet-400/10">
        <svg viewBox="0 0 120 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M-5 30 L40 20 L70 50 L125 40 M30 -5 L45 105 M90 -5 L80 105" stroke="rgba(255,255,255,0.12)" strokeWidth="6" fill="none" />
          <path d="M14 88 C 38 80, 36 44, 64 52 S 94 30, 104 22" fill="none" stroke="#a5b4fc" strokeWidth="2.5" strokeDasharray="4 5" strokeLinecap="round" />
          <circle cx="14" cy="88" r="4" fill="#a5b4fc" />
        </svg>
        <MapPin size={18} aria-hidden="true" className="absolute right-2.5 top-2 text-white" />
      </div>
      <div className="mt-2.5 flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-400/30 text-indigo-100"><Truck size={13} aria-hidden="true" /></span>
        <div className="flex-1 space-y-1.5">
          <Bar w="80%" tone="bg-white/50" h="h-1.5" />
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><span className="block h-full w-2/3 rounded-full bg-indigo-400" /></div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5 border-t border-white/10 pt-2.5 text-slate-500">
        <Home size={14} aria-hidden="true" className="mx-auto text-indigo-300" />
        <Search size={14} aria-hidden="true" className="mx-auto" />
        <Users size={14} aria-hidden="true" className="mx-auto" />
      </div>
    </div>
  );
}
function Feed({ android }: { android?: boolean }) {
  return (
    <div className={`${android ? "rounded-[18px]" : "rounded-[28px]"} h-[250px] w-[132px] border-2 border-white/15 bg-slate-950 p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]`}>
      <div className={`mx-auto mb-2 h-1.5 ${android ? "w-1.5" : "w-10"} rounded-full bg-white/15`} />
      <div className="flex items-center justify-between px-0.5">
        <Bar w="38px" tone="bg-white/60" h="h-2" />
        <span className="h-5 w-5 rounded-full bg-indigo-400/60" />
      </div>
      <div className="mt-2.5 space-y-2">
        {["from-violet-400/45", "from-sky-400/40"].map((c, i) => (
          <div key={i} className="rounded-lg border border-white/10 bg-white/[0.03] p-1.5">
            <div className={`h-14 rounded bg-gradient-to-br ${c} to-transparent`} />
            <div className="mt-1.5 flex items-center justify-between">
              <Bar w="45%" tone="bg-white/45" h="h-1.5" />
              <Heart size={11} aria-hidden="true" className={i === 0 ? "text-rose-300" : "text-slate-500"} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function Phone() {
  return (
    <div className="relative flex translate-y-12 items-start justify-center">
      <div className="-mr-7 mt-10 -rotate-3 opacity-75">
        <Feed android />
      </div>
      <div className="relative z-10 rotate-2">
        <Tracker />
      </div>
    </div>
  );
}

// Your app in the middle, the services it talks to around it, each one connected.
function Connect() {
  const nodes = [
    { Icon: CreditCard, x: 15, y: 24 },
    { Icon: Users, x: 85, y: 24 },
    { Icon: MessageSquare, x: 15, y: 76 },
    { Icon: Database, x: 85, y: 76 },
  ];
  return (
    <div className="relative h-[200px] w-[320px] max-w-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {nodes.map((n, i) => (
          <line key={i} x1="50" y1="50" x2={n.x} y2={n.y} stroke="#a5b4fc" strokeOpacity="0.65" strokeWidth="1.5" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" className="sc-flow" />
        ))}
      </svg>
      <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-indigo-300/50 bg-[#1c2150] text-white shadow-[0_0_40px_-8px_rgba(129,140,248,0.8)]">
        <LayoutGrid size={26} aria-hidden="true" />
      </span>
      {nodes.map(({ Icon, x, y }, i) => (
        <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
          <Tile Icon={Icon} size="h-12 w-12" />
          <Badge />
        </span>
      ))}
    </div>
  );
}

// First on search, and three green rings for fast, secure and up to date.
function Health() {
  return (
    <div className="w-[92%] max-w-[320px]">
      <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-slate-950/85 px-4 py-2.5">
        <Search size={14} aria-hidden="true" className="text-slate-400" />
        <Bar w="90px" tone="bg-white/25" />
      </div>
      <div className="relative mt-3 flex items-center gap-3 rounded-xl border border-emerald-300/35 bg-slate-950/85 p-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-400/30"><span className="h-3.5 w-3.5 rounded bg-indigo-200" /></span>
        <div className="flex-1 space-y-1.5">
          <Bar w="60%" tone="bg-indigo-200/70" h="h-2" />
          <Bar w="90%" tone="bg-white/20" h="h-1.5" />
        </div>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400 text-[13px] text-slate-950">1</span>
      </div>
      <div className="mt-4 flex justify-center gap-5">
        {[Zap, Shield, RefreshCw].map((I, i) => (
          <span key={i} className="relative flex h-12 w-12 items-center justify-center text-emerald-300">
            <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
              <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3.5" />
              <circle cx="24" cy="24" r="20" fill="none" stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="126" strokeDashoffset="6" />
            </svg>
            <I size={17} aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

// A chat: a question, an answer from the AI, and the page it came from.
function Chat() {
  return (
    <div className={`${ui} w-[92%] max-w-[320px] overflow-hidden`}>
      <div className="flex items-center gap-2.5 border-b border-white/10 px-3.5 py-2.5">
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-violet-400/25 text-violet-100">
          <Sparkles size={15} aria-hidden="true" />
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
        </span>
        <Bar w="70px" tone="bg-white/40" h="h-2" />
      </div>
      <div className="space-y-3 p-3.5">
        <div className="flex max-w-[75%] items-center gap-2.5 rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.06] px-3 py-2.5">
          <CircleHelp size={16} aria-hidden="true" className="shrink-0 text-slate-300" />
          <div className="flex-1 space-y-1.5">
            <Bar w="100%" tone="bg-white/35" h="h-1.5" />
            <Bar w="60%" tone="bg-white/20" h="h-1.5" />
          </div>
        </div>
        <div className="ml-auto flex max-w-[82%] items-center gap-2.5 rounded-2xl rounded-br-sm bg-violet-400/20 px-3 py-2.5 ring-1 ring-violet-300/25">
          <div className="flex-1 space-y-1.5">
            <Bar w="100%" tone="bg-violet-100/60" h="h-1.5" />
            <Bar w="80%" tone="bg-violet-100/40" h="h-1.5" />
            <Bar w="45%" tone="bg-violet-100/30" h="h-1.5" />
          </div>
          <Check size={16} aria-hidden="true" className="shrink-0 text-emerald-300" />
        </div>
        <div className="ml-auto flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-slate-900 px-2.5 py-1 text-slate-400">
          <FileText size={11} aria-hidden="true" />
          <Bar w="34px" tone="bg-white/25" h="h-1.5" />
        </div>
      </div>
    </div>
  );
}

// One thing arrives, the AI handles it, and the work lands in three places by itself.
function Flow() {
  const outs = [
    { Icon: Users, y: 18 },
    { Icon: Send, y: 50 },
    { Icon: Bell, y: 82 },
  ];
  return (
    <div className="relative h-[200px] w-[340px] max-w-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <line x1="17" y1="50" x2="46" y2="50" stroke="#c4b5fd" strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" className="sc-flow" />
        {outs.map((o, i) => (
          <line key={i} x1="54" y1="50" x2="84" y2={o.y} stroke="#c4b5fd" strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" className="sc-flow" />
        ))}
      </svg>
      <span className="absolute left-[11%] top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Tile Icon={Mail} size="h-12 w-12" />
      </span>
      <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-violet-300/50 bg-[#2a1f5c] text-violet-100 shadow-[0_0_40px_-6px_rgba(167,139,250,0.9)]">
        <Sparkles size={26} aria-hidden="true" />
      </span>
      {outs.map(({ Icon, y }, i) => (
        <span key={i} className="absolute left-[89%] -translate-x-1/2 -translate-y-1/2" style={{ top: `${y}%` }}>
          <Tile Icon={Icon} size="h-11 w-11" />
          <Badge />
        </span>
      ))}
    </div>
  );
}

// A normal app screen with a chart, and an AI note pointing at the part that matters.
function InProduct() {
  return (
    <div className="relative w-[92%] max-w-[330px]">
      <div className={`${ui} p-3.5`}>
        <div className="flex items-center justify-between">
          <Bar w="56px" tone="bg-white/55" h="h-2.5" />
          <span className="h-5 w-5 rounded-full bg-white/10" />
        </div>
        <div className="mt-4 flex h-[92px] items-end gap-2.5">
          {[38, 52, 44, 60, 48, 92, 56].map((h, i) => (
            <span key={i} className={`flex-1 rounded-t-md ${i === 5 ? "bg-gradient-to-t from-violet-400 to-violet-300" : "bg-white/12"}`} style={{ height: `${h}%`, backgroundColor: i === 5 ? undefined : "rgba(255,255,255,0.12)" }} />
          ))}
        </div>
        <div className="mt-3 space-y-2">
          <Bar w="80%" h="h-1.5" />
          <Bar w="55%" h="h-1.5" />
        </div>
      </div>
      <div className="absolute -top-4 right-3 flex items-center gap-2 rounded-xl border border-violet-300/40 bg-slate-900 px-3 py-2 shadow-xl">
        <Sparkles size={14} aria-hidden="true" className="text-violet-300" />
        <TrendingUp size={14} aria-hidden="true" className="text-emerald-300" />
        <Bar w="30px" tone="bg-white/30" h="h-1.5" />
      </div>
    </div>
  );
}

// Files, emails and spreadsheets go in; one clear, checked answer comes out.
function Docs() {
  return (
    <div className="flex w-[94%] max-w-[340px] items-center justify-center gap-2.5">
      <div className="flex flex-col gap-2.5">
        <Tile Icon={FileText} />
        <Tile Icon={Mail} />
        <Tile Icon={Table} />
      </div>
      <ArrowRight size={15} aria-hidden="true" className="shrink-0 text-violet-300/70" />
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-300/50 bg-[#2a1f5c] text-violet-100 shadow-[0_0_36px_-6px_rgba(167,139,250,0.9)]">
        <Sparkles size={22} aria-hidden="true" />
      </span>
      <ArrowRight size={15} aria-hidden="true" className="shrink-0 text-violet-300/70" />
      <div className="w-[104px] shrink-0 rounded-xl border border-violet-300/35 bg-violet-400/10 p-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400 text-slate-950">
          <Check size={16} strokeWidth={3} aria-hidden="true" />
        </span>
        <div className="mt-2.5 space-y-1.5">
          <Bar w="100%" tone="bg-white/55" h="h-1.5" />
          <Bar w="75%" tone="bg-white/30" h="h-1.5" />
        </div>
        <span className="mt-2.5 flex w-fit items-center gap-1 rounded-full border border-white/10 bg-slate-900 px-2 py-0.5 text-slate-400">
          <FileText size={9} aria-hidden="true" />
          <Bar w="14px" tone="bg-white/30" h="h-1" />
        </span>
      </div>
    </div>
  );
}

/* ---------- the services ---------- */

type Item = { name: string; body: string; Visual: React.ComponentType; ai?: boolean };

// A short list, on purpose: one clear specialty, not a menu of every possible job.
// Top row (moves left): what I build. Bottom row (moves right): the AI work. Four cards each, so
// both rows are equally full and easy to catch.
const rowA: Item[] = [
  { name: "Websites and web apps", body: "Sites, online stores and web apps that turn visitors into customers.", Visual: Site },
  { name: "Mobile apps", body: "Native and cross platform apps for iOS and Android.", Visual: Phone },
  { name: "Integrations and APIs", body: "Payments, CRMs and messaging connected into one flow.", Visual: Connect },
  { name: "Speed, search and care", body: "Fast, found on search, updated and secure.", Visual: Health },
];
const rowB: Item[] = [
  { name: "AI assistants and chatbots", body: "Assistants that answer your customers using your own content.", Visual: Chat, ai: true },
  { name: "Workflow automation", body: "Repetitive work handled quietly by AI in the background.", Visual: Flow, ai: true },
  { name: "AI inside your product", body: "Search, summaries and recommendations built in.", Visual: InProduct, ai: true },
  { name: "Document and data intelligence", body: "PDFs, emails and records turned into answers.", Visual: Docs, ai: true },
];

function Card({ it }: { it: Item }) {
  return (
    <>
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%]" style={{ backgroundImage: `radial-gradient(ellipse 70% 80% at 50% 100%, ${it.ai ? "rgba(139, 92, 246, 0.22)" : "rgba(99, 102, 241, 0.20)"}, transparent 80%)` }} />
      <div className="relative flex h-[200px] items-center justify-center overflow-hidden pt-1 md:h-[290px] md:pt-2">
        <span aria-hidden="true" className="scene-grid pointer-events-none absolute inset-0" />
        {/* On phones the drawing keeps its full layout and is simply scaled down */}
        <div aria-hidden="true" className="relative flex w-[380px] shrink-0 scale-[0.66] items-center justify-center transition-transform duration-500 ease-out md:w-full md:scale-100 md:group-hover/t:scale-[1.04]">
          <it.Visual />
        </div>
      </div>
      <div className="relative px-5 pb-5 pt-1 md:px-7 md:pb-7 md:pt-2">
        <h3 className="text-lg text-white md:text-[22px]">{it.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-400 transition-colors duration-300 group-hover/t:text-slate-300 md:mt-1.5 md:text-[15px]">{it.body}</p>
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
          className={`group/t relative flex w-[262px] shrink-0 list-none flex-col overflow-hidden rounded-3xl border bg-slate-900/60 shadow-[0_14px_36px_-28px_rgba(0,0,0,0.55)] transition-colors duration-300 md:w-[380px] ${
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
