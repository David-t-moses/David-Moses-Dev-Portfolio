"use client";

// Earlier versions are in components/archive (Services*.tsx), the latest being
// ServicesMarqueeSkeletonVisuals.tsx (same cards with abstract skeleton drawings).

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { type LucideIcon, ArrowRight, Bell, Check, CircleHelp, CreditCard, Database, FileText, Heart, Home, LayoutGrid, MapPin, Mail, MessageSquare, RefreshCw, Search, Send, Shield, ShoppingBag, Sparkles, Table, TrendingUp, Truck, Users, Zap } from "lucide-react";

/* ---------- living pictures: each service shown working, on a loop ----------
   Fixed 330 x 240 stages so the motion can be written in pixels. CSS transform and opacity only; every
   loop stops while its card is off screen (data-run) and for reduced motion (shows the finished frame).
   Illustrations only: no real clients, data or figures. */

const ui = "rounded-xl border border-white/10 bg-slate-950/90";
const Bar = ({ w, tone = "bg-white/15", h = "h-2" }: { w: string; tone?: string; h?: string }) => (
  <span className={`block rounded-full ${h} ${tone}`} style={{ width: w }} />
);
const Tile = ({ Icon, tone = "border-white/10 bg-slate-900 text-slate-200", size = "h-11 w-11" }: { Icon: LucideIcon; tone?: string; size?: string }) => (
  <span className={`relative flex ${size} shrink-0 items-center justify-center rounded-xl border ${tone}`}>
    <Icon size={18} aria-hidden="true" />
  </span>
);
const Tick = ({ className = "", style }: { className?: string; style?: React.CSSProperties }) => (
  <span className={`flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-slate-950 ${className}`} style={style}>
    <Check size={10} strokeWidth={3} aria-hidden="true" />
  </span>
);
type Vars = React.CSSProperties & Record<string, string | number>;
const at = (x: number, y: number): React.CSSProperties => ({ left: x, top: y });
const Hop = ({ from, to, delay, tone = "bg-white" }: { from: [number, number]; to: [number, number]; delay: string; tone?: string }) => (
  <span
    aria-hidden="true"
    className={`sv-hop absolute -left-1 -top-1 h-2 w-2 rounded-full ${tone} shadow-[0_0_10px_2px_rgba(196,181,253,0.9)]`}
    style={{ "--x1": `${from[0]}px`, "--y1": `${from[1]}px`, "--x2": `${to[0]}px`, "--y2": `${to[1]}px`, "--d": delay } as Vars}
  />
);

// A site that is being used: it scrolls, a visitor clicks Buy, the cart counts up, an order arrives, sales climb.
function Site() {
  return (
    <div className="sv-scene" style={{ "--P": "9s" } as Vars}>
      <div className={`${ui} absolute left-1 top-1 h-[200px] w-[322px] overflow-hidden`}>
        <div className="flex h-7 items-center gap-1.5 border-b border-white/10 px-3">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="ml-2 h-3.5 flex-1 rounded bg-white/[0.06]" />
        </div>
        <div className="relative h-[172px] overflow-hidden">
          <div className="sv-page px-3.5 pt-3">
            <div className="flex h-5 items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="h-3.5 w-3.5 rounded bg-indigo-400" />
                <Bar w="34px" tone="bg-white/60" />
              </span>
              <span className="flex items-center gap-2.5">
                <Bar w="22px" />
                <Bar w="22px" />
                <span className="relative text-slate-300">
                  <ShoppingBag size={14} aria-hidden="true" />
                  <span className="sv-badge absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-indigo-400" />
                </span>
              </span>
            </div>
            <div className="mt-3 grid grid-cols-[1.2fr_1fr] items-center gap-3">
              <div className="space-y-1.5">
                <Bar w="100%" tone="bg-white/85" h="h-2.5" />
                <Bar w="70%" tone="bg-white/85" h="h-2.5" />
                <Bar w="85%" h="h-1.5" />
                <span className="sv-cta block h-5 w-14 rounded-full bg-indigo-400" />
              </div>
              <div className="relative h-[62px] overflow-hidden rounded-lg bg-gradient-to-br from-indigo-400/50 via-violet-400/30 to-sky-400/20">
                <span className="absolute right-2 top-2 h-4 w-4 rounded-full bg-white/60" />
                <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-8 w-full" aria-hidden="true">
                  <path d="M0 60 L25 20 L45 42 L68 10 L100 60 Z" fill="rgba(15,23,42,0.55)" />
                </svg>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {["from-indigo-400/45", "from-violet-400/45", "from-sky-400/40"].map((c, i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-white/[0.03] p-1.5">
                  <div className={`h-7 rounded bg-gradient-to-br ${c} to-transparent`} />
                  <span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-white/40" />
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-[1fr_1.2fr] gap-3">
              <div className="space-y-1.5">
                <Bar w="80%" tone="bg-white/70" h="h-2.5" />
                <Bar w="100%" h="h-1.5" />
                <Bar w="90%" h="h-1.5" />
              </div>
              <div className="h-[52px] rounded-lg bg-gradient-to-br from-violet-400/35 to-transparent" />
            </div>
          </div>
          <span className="sv-cursor pointer-events-none absolute left-0 top-0" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 1.5v11l3-2.8 2 4.3 2-.9-2-4.2h4.2L2 1.5Z" fill="#fff" stroke="#0f172a" strokeWidth="1" strokeLinejoin="round" /></svg>
          </span>
          <div className="sv-toast absolute bottom-2 right-2 flex items-center gap-2 rounded-full border border-emerald-300/30 bg-slate-900 px-2.5 py-1.5 shadow-lg">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <Bar w="38px" tone="bg-white/50" h="h-1.5" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-[108px] rounded-xl border border-emerald-300/30 bg-slate-900 p-2.5 shadow-xl">
        <div className="flex items-center justify-between">
          <TrendingUp size={13} aria-hidden="true" className="text-emerald-300" />
          <Bar w="28px" tone="bg-white/25" h="h-1.5" />
        </div>
        <div className="mt-2 flex h-9 items-end gap-1.5">
          {[28, 40, 36, 58, 72, 100].map((h, i) => (
            <span key={i} className={`sv-bar flex-1 rounded-sm ${i === 5 ? "bg-emerald-400" : "bg-emerald-400/40"}`} style={{ height: `${h}%`, "--i": i } as Vars} />
          ))}
        </div>
      </div>
    </div>
  );
}

// A support chat that plays out: a question, the assistant thinking, an answer that writes itself, and its source.
function Chat() {
  return (
    <div className="sv-scene" style={{ "--P": "10s" } as Vars}>
      <div className={`${ui} absolute left-[15px] top-1.5 w-[300px] overflow-hidden`}>
        <div className="flex items-center gap-2.5 border-b border-white/10 px-3.5 py-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-violet-400/25 text-violet-100">
            <Sparkles size={15} aria-hidden="true" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
          </span>
          <Bar w="70px" tone="bg-white/40" />
        </div>
        <div className="relative h-[150px] p-3">
          <div className="sv-m1 flex w-[74%] items-center gap-2.5 rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.06] px-3 py-2.5">
            <CircleHelp size={15} aria-hidden="true" className="shrink-0 text-slate-300" />
            <div className="flex-1 space-y-1.5">
              <Bar w="100%" tone="bg-white/35" h="h-1.5" />
              <Bar w="60%" tone="bg-white/20" h="h-1.5" />
            </div>
          </div>
          <div className="sv-typing absolute right-3 top-[64px] flex items-center gap-1.5 rounded-2xl rounded-br-sm bg-violet-400/20 px-3.5 py-3 ring-1 ring-violet-300/25">
            <span className="sc-dot h-1.5 w-1.5 rounded-full bg-violet-200" />
            <span className="sc-dot sc-d2 h-1.5 w-1.5 rounded-full bg-violet-200" />
            <span className="sc-dot sc-d3 h-1.5 w-1.5 rounded-full bg-violet-200" />
          </div>
          <div className="sv-m2 absolute right-3 top-[60px] flex w-[78%] items-center gap-2.5 rounded-2xl rounded-br-sm bg-violet-400/20 px-3 py-2.5 ring-1 ring-violet-300/25">
            <div className="flex-1 space-y-1.5">
              {["100%", "82%", "46%"].map((w, i) => (
                <span key={i} className="sv-line block h-1.5 origin-left rounded-full bg-violet-100/60" style={{ width: w, "--i": i } as Vars} />
              ))}
            </div>
            <Tick className="sv-tick" />
          </div>
          <div className="sv-chip absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-900 px-2.5 py-1 text-slate-400">
            <FileText size={11} aria-hidden="true" />
            <Bar w="34px" tone="bg-white/25" h="h-1.5" />
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-3.5 py-2.5 text-slate-500">
          <Bar w="80px" tone="bg-white/10" />
          <Send size={13} aria-hidden="true" className="text-violet-300" />
        </div>
      </div>
    </div>
  );
}

// Two phones on a gentle float: a delivery route draws itself and the pin follows it; the other phone's feed scrolls.
function Phone() {
  const route = "M12 64 C 30 60, 30 34, 52 40 S 78 22, 88 14";
  return (
    <div className="sv-scene">
      <div className="sv-float absolute left-[40px] top-[48px] z-0 opacity-80" style={{ animationDuration: "6s", "--r": "-3deg" } as Vars}>
        <div className="h-[214px] w-[120px] overflow-hidden rounded-[26px] border-2 border-white/15 bg-slate-950 p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]">
          <div className="mx-auto mb-2 h-1.5 w-1.5 rounded-full bg-white/20" />
          <div className="flex items-center justify-between px-0.5">
            <Bar w="34px" tone="bg-white/60" />
            <span className="h-4 w-4 rounded-full bg-indigo-400/60" />
          </div>
          <div className="mt-2 h-[150px] overflow-hidden">
            <div className="sv-feed space-y-2">
              {["from-violet-400/45", "from-sky-400/40", "from-indigo-400/45", "from-violet-400/40"].map((c, i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-white/[0.03] p-1.5">
                  <div className={`h-12 rounded bg-gradient-to-br ${c} to-transparent`} />
                  <div className="mt-1.5 flex items-center justify-between">
                    <Bar w="40%" tone="bg-white/45" h="h-1.5" />
                    <Heart size={10} aria-hidden="true" className={i === 0 ? "text-rose-300" : "text-slate-500"} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="sv-float absolute right-[44px] top-[8px] z-10" style={{ animationDuration: "5s", animationDelay: "-1.5s", "--r": "2deg" } as Vars}>
        <div className="h-[220px] w-[124px] overflow-hidden rounded-[28px] border-2 border-white/20 bg-slate-950 p-2 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.9)]">
          <div className="mx-auto mb-2 h-1.5 w-10 rounded-full bg-white/15" />
          <div className="relative h-[100px] overflow-hidden rounded-xl bg-gradient-to-br from-indigo-400/25 to-violet-400/10">
            <svg viewBox="0 0 100 80" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <path d="M-5 30 L40 20 L70 50 L105 40 M30 -5 L45 85 M80 -5 L72 85" stroke="rgba(255,255,255,0.12)" strokeWidth="5" fill="none" />
              <path d={route} className="sv-route" fill="none" stroke="#a5b4fc" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="0" cy="0" r="4" fill="#fff" className="sv-pin" style={{ offsetPath: `path("${route}")` }} />
            </svg>
            <MapPin size={16} aria-hidden="true" className="absolute right-2 top-1.5 text-white" />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-400/30 text-indigo-100">
              <Truck size={13} aria-hidden="true" />
            </span>
            <div className="flex-1 space-y-1.5">
              <Bar w="80%" tone="bg-white/50" h="h-1.5" />
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <span className="sv-progress block h-full w-full origin-left rounded-full bg-indigo-400" />
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 border-t border-white/10 pt-2.5 text-slate-500">
            <Home size={13} aria-hidden="true" className="mx-auto text-indigo-300" />
            <Search size={13} aria-hidden="true" className="mx-auto" />
            <Users size={13} aria-hidden="true" className="mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

// One email arrives, the AI takes it, and the work is handed to three places on its own.
function Flow() {
  const ai: [number, number] = [165, 120];
  const outs: { Icon: LucideIcon; p: [number, number]; d: string }[] = [
    { Icon: Users, p: [296, 52], d: "3.7s" },
    { Icon: Send, p: [296, 120], d: "3.85s" },
    { Icon: Bell, p: [296, 188], d: "4s" },
  ];
  return (
    <div className="sv-scene" style={{ "--P": "7s" } as Vars}>
      <svg viewBox="0 0 330 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <line x1="36" y1="120" x2={ai[0]} y2={ai[1]} stroke="#c4b5fd" strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="2 4" className="sc-flow" />
        {outs.map((o, i) => (
          <line key={i} x1={ai[0]} y1={ai[1]} x2={o.p[0]} y2={o.p[1]} stroke="#c4b5fd" strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="2 4" className="sc-flow" />
        ))}
      </svg>
      <span className="absolute -translate-x-1/2 -translate-y-1/2" style={at(36, 120)}>
        <Tile Icon={Mail} size="h-12 w-12" />
      </span>
      <span className="absolute -translate-x-1/2 -translate-y-1/2" style={at(ai[0], ai[1])}>
        <span className="sv-pulse flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-300/50 bg-[#2a1f5c] text-violet-100 shadow-[0_0_40px_-6px_rgba(167,139,250,0.9)]" style={{ "--d": "1.7s" } as Vars}>
          <Sparkles size={26} aria-hidden="true" />
        </span>
      </span>
      {outs.map(({ Icon, p, d }, i) => (
        <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={at(p[0], p[1])}>
          <Tile Icon={Icon} size="h-11 w-11" />
          <Tick className="sv-pop absolute -right-1.5 -top-1.5" style={{ "--d": d } as Vars} />
        </span>
      ))}
      <Hop from={[36, 120]} to={ai} delay="0s" />
      {outs.map((o, i) => (
        <Hop key={i} from={ai} to={o.p} delay="2s" />
      ))}
    </div>
  );
}

// Your app in the middle, data travelling out to the tools it talks to and back, each one lighting up as it answers.
function Connect() {
  const c: [number, number] = [165, 120];
  const nodes: { Icon: LucideIcon; p: [number, number] }[] = [
    { Icon: CreditCard, p: [48, 52] },
    { Icon: Users, p: [282, 52] },
    { Icon: MessageSquare, p: [48, 188] },
    { Icon: Database, p: [282, 188] },
  ];
  return (
    <div className="sv-scene" style={{ "--P": "6s" } as Vars}>
      <svg viewBox="0 0 330 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {nodes.map((n, i) => (
          <line key={i} x1={c[0]} y1={c[1]} x2={n.p[0]} y2={n.p[1]} stroke="#a5b4fc" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="2 4" className="sc-flow" />
        ))}
      </svg>
      <span className="sv-ring absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-indigo-300/60" style={at(c[0], c[1])} />
      <span className="absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-indigo-300/50 bg-[#1c2150] text-white shadow-[0_0_40px_-8px_rgba(129,140,248,0.8)]" style={at(c[0], c[1])}>
        <LayoutGrid size={26} aria-hidden="true" />
      </span>
      {nodes.map(({ Icon, p }, i) => (
        <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={at(p[0], p[1])}>
          <span className="sv-glow block rounded-xl" style={{ "--d": `${i * 0.6 + 1.2}s` } as Vars}>
            <Tile Icon={Icon} size="h-12 w-12" />
          </span>
          <Tick className="absolute -right-1.5 -top-1.5" />
        </span>
      ))}
      {nodes.map((n, i) => (
        <React.Fragment key={i}>
          <Hop from={c} to={n.p} delay={`${i * 0.6}s`} tone="bg-indigo-200" />
          <Hop from={n.p} to={c} delay={`${i * 0.6 + 1.5}s`} tone="bg-emerald-300" />
        </React.Fragment>
      ))}
    </div>
  );
}

// A product screen where the chart builds itself and an AI note appears on the bar that matters.
function InProduct() {
  return (
    <div className="sv-scene" style={{ "--P": "8s" } as Vars}>
      <div className={`${ui} absolute left-[15px] top-[34px] w-[300px] p-3.5`}>
        <div className="flex items-center justify-between">
          <Bar w="56px" tone="bg-white/55" h="h-2.5" />
          <span className="h-5 w-5 rounded-full bg-white/10" />
        </div>
        <div className="mt-3 flex h-[100px] items-end gap-2.5">
          {[38, 52, 44, 60, 48, 92, 56].map((h, i) => (
            <span
              key={i}
              className={`sv-grow flex-1 origin-bottom rounded-t-md ${i === 5 ? "sv-hl bg-gradient-to-t from-violet-400 to-violet-300" : "bg-white/[0.13]"}`}
              style={{ height: `${h}%`, "--i": i } as Vars}
            />
          ))}
        </div>
        <div className="mt-3 space-y-2">
          <Bar w="80%" h="h-1.5" />
          <Bar w="55%" h="h-1.5" />
        </div>
      </div>
      <div className="sv-note absolute right-[18px] top-[4px] flex items-center gap-2 rounded-xl border border-violet-300/40 bg-slate-900 px-3 py-2 shadow-xl">
        <Sparkles size={14} aria-hidden="true" className="sv-spin text-violet-300" />
        <TrendingUp size={14} aria-hidden="true" className="text-emerald-300" />
        <Bar w="30px" tone="bg-white/30" h="h-1.5" />
      </div>
    </div>
  );
}

// Searched, found first, and three rings fill up: fast, secure, up to date.
function Health() {
  return (
    <div className="sv-scene" style={{ "--P": "7s" } as Vars}>
      <div className="absolute left-[25px] top-2 flex w-[280px] items-center gap-2.5 rounded-full border border-white/10 bg-slate-950/90 px-4 py-2.5">
        <Search size={14} aria-hidden="true" className="text-slate-400" />
        <span className="sv-typebar block h-2 w-[110px] origin-left rounded-full bg-white/30" />
      </div>
      <div className="sv-result absolute left-[25px] top-[62px] flex w-[280px] items-center gap-3 rounded-xl border border-emerald-300/35 bg-slate-950/90 p-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-400/30"><span className="h-3.5 w-3.5 rounded bg-indigo-200" /></span>
        <div className="flex-1 space-y-1.5">
          <Bar w="60%" tone="bg-indigo-200/70" />
          <Bar w="90%" tone="bg-white/20" h="h-1.5" />
        </div>
        <span className="sv-pop flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400 text-[13px] text-slate-950" style={{ "--d": "1.9s" } as Vars}>1</span>
      </div>
      <div className="absolute bottom-3 left-0 flex w-full justify-center gap-6">
        {[Zap, Shield, RefreshCw].map((I, i) => (
          <span key={i} className="relative flex h-14 w-14 items-center justify-center text-emerald-300">
            <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
              <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3.5" />
              <circle cx="24" cy="24" r="20" fill="none" stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="126" strokeDashoffset="6" className="sv-fill" style={{ animationDelay: `${i * 0.25}s` }} />
            </svg>
            <I size={18} aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

// Files, email and sheets fly into the AI, and one checked answer comes out.
function Docs() {
  const ai: [number, number] = [150, 120];
  return (
    <div className="sv-scene" style={{ "--P": "8s" } as Vars}>
      <svg viewBox="0 0 330 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[66, 120, 174].map((y) => (
          <line key={y} x1="48" y1={y} x2={ai[0]} y2={ai[1]} stroke="#c4b5fd" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="2 4" className="sc-flow" />
        ))}
        <line x1={ai[0]} y1={ai[1]} x2="214" y2="120" stroke="#c4b5fd" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="2 4" className="sc-flow" />
      </svg>
      {[FileText, Mail, Table].map((I, i) => (
        <span key={i} className="sv-fly absolute" style={{ left: 22, top: 66 + i * 54, animationDelay: `${i * 0.12}s` }}>
          <Tile Icon={I} />
        </span>
      ))}
      <span className="absolute -translate-x-1/2 -translate-y-1/2" style={at(ai[0], ai[1])}>
        <span className="sv-pulse flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/50 bg-[#2a1f5c] text-violet-100 shadow-[0_0_36px_-6px_rgba(167,139,250,0.9)]" style={{ "--d": "1.6s" } as Vars}>
          <Sparkles size={22} aria-hidden="true" />
        </span>
      </span>
      <div className="sv-ans absolute left-[214px] top-[68px] w-[108px] rounded-xl border border-violet-300/35 bg-violet-400/10 p-3">
        <Tick className="sv-pop h-7 w-7 [&>svg]:h-4 [&>svg]:w-4" style={{ "--d": "3.1s" } as Vars} />
        <div className="mt-2.5 space-y-1.5">
          <span className="sv-line block h-1.5 w-full origin-left rounded-full bg-white/55" style={{ "--i": 0 } as Vars} />
          <span className="sv-line block h-1.5 w-3/4 origin-left rounded-full bg-white/30" style={{ "--i": 1 } as Vars} />
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

// A short list, on purpose: one clear specialty, not a menu of every possible job. Build and AI work
// alternate so the offer reads as one. Laid out like the project cards: words first, the picture below.
const items: Item[] = [
  { name: "Websites and web apps", body: "Sites, online stores and web apps that turn visitors into customers.", Visual: Site },
  { name: "AI assistants and chatbots", body: "Assistants that answer your customers using your own content.", Visual: Chat, ai: true },
  { name: "Mobile apps", body: "Native and cross platform apps for iOS and Android.", Visual: Phone },
  { name: "Workflow automation", body: "Repetitive work handled quietly by AI in the background.", Visual: Flow, ai: true },
  { name: "Integrations and APIs", body: "Payments, CRMs and messaging connected into one flow.", Visual: Connect },
  { name: "AI inside your product", body: "Search, summaries and recommendations built in.", Visual: InProduct, ai: true },
  { name: "Speed, search and care", body: "Fast, found on search, updated and secure.", Visual: Health },
  { name: "Document and data intelligence", body: "PDFs, emails and records turned into answers.", Visual: Docs, ai: true },
];

export default function Services() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);

  // Each card's loop runs only while that card is on screen.
  useEffect(() => {
    const ul = listRef.current;
    if (!ul) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => ((e.target as HTMLElement).dataset.run = e.isIntersecting ? "true" : "false")),
      { rootMargin: "60px" }
    );
    ul.querySelectorAll(".sv-card").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="services" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-12 md:text-5xl">
          What you can stop worrying about.
        </h2>

        <ul ref={listRef} className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 md:gap-5 lg:grid-cols-6 lg:gap-6">
          {items.map((it, i) => (
            <motion.li
              key={it.name}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: "easeOut" }}
              className={`sv-card group/t relative flex list-none flex-col overflow-hidden rounded-3xl border bg-slate-900/60 shadow-[0_14px_36px_-28px_rgba(0,0,0,0.55)] transition-colors duration-300 lg:col-span-2 ${
                i >= 6 ? "lg:col-span-3" : ""
              } ${it.ai ? "border-violet-300/15 hover:border-violet-300/40" : "border-white/10 hover:border-white/25"}`}
            >
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[75%]" style={{ backgroundImage: `radial-gradient(ellipse 70% 80% at 50% 100%, ${it.ai ? "rgba(139, 92, 246, 0.22)" : "rgba(99, 102, 241, 0.20)"}, transparent 80%)` }} />

              {/* Words first */}
              <div className="relative px-6 pb-2 pt-6 md:px-7 md:pt-7">
                <h3 className="text-xl leading-tight text-white md:text-[24px]">{it.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{it.body}</p>
              </div>

              {/* The picture, anchored to the bottom */}
              <div className="relative mt-auto flex h-[290px] items-center justify-center overflow-hidden">
                <span aria-hidden="true" className="scene-grid pointer-events-none absolute inset-0" />
                <div aria-hidden="true" className="relative flex w-full items-center justify-center">
                  <it.Visual />
                </div>
              </div>
            </motion.li>
          ))}
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
