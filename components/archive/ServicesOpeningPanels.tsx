"use client";

// Earlier versions are in components/archive (Services*.tsx), the latest being
// ServicesMarqueeSkeletonVisuals.tsx (same cards with abstract skeleton drawings).

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { type LucideIcon, ArrowRight, Bell, Check, FileText, LayoutGrid, Lock, Mail, RefreshCw, Search, Send, Shield, Sparkles, TrendingUp, Users, Zap } from "lucide-react";

/* ---------- living pictures: each service shown working, on a loop ----------
   Fixed 330 x 240 stages so the motion can be written in pixels. CSS transform and opacity only; every
   loop stops while its card is off screen (data-run) and for reduced motion (shows the finished frame).
   Illustrations only: no real clients, data or figures. */

const ui = "rounded-xl border border-slate-200 bg-white shadow-[0_22px_50px_-20px_rgba(99,102,241,0.55)]";
const Bar = ({ w, tone = "bg-slate-200", h = "h-2" }: { w: string; tone?: string; h?: string }) => (
  <span className={`block rounded-full ${h} ${tone}`} style={{ width: w }} />
);
const Tick = ({ className = "", style }: { className?: string; style?: React.CSSProperties }) => (
  <span className={`flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white ${className}`} style={style}>
    <Check size={10} strokeWidth={3} aria-hidden="true" />
  </span>
);
// Official marks (Simple Icons, in /public/tech) painted in their brand colour.
const Brand = ({ name, color, className = "h-6 w-6" }: { name: string; color: string; className?: string }) => {
  const url = `url(/tech/${name}.svg)`;
  return (
    <span
      aria-hidden="true"
      className={`block ${className}`}
      style={{ background: color, WebkitMaskImage: url, maskImage: url, WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center", WebkitMaskSize: "contain", maskSize: "contain" }}
    />
  );
};
type Vars = React.CSSProperties & Record<string, string | number>;
const at = (x: number, y: number): React.CSSProperties => ({ left: x, top: y });
const Hop = ({ from, to, delay, tone = "bg-white" }: { from: [number, number]; to: [number, number]; delay: string; tone?: string }) => (
  <span
    aria-hidden="true"
    className={`sv-hop absolute -left-1 -top-1 h-2 w-2 rounded-full ${tone} shadow-[0_0_10px_2px_rgba(196,181,253,0.9)]`}
    style={{ "--x1": `${from[0]}px`, "--y1": `${from[1]}px`, "--x2": `${to[0]}px`, "--y2": `${to[1]}px`, "--d": delay } as Vars}
  />
);
const Shot = ({ src, w, h, left = 0, top = 0, className = "" }: { src: string; w: number; h: number; left?: number; top?: number; className?: string }) => (
  <Image src={src} alt="" width={w} height={h} sizes={`${Math.ceil(w * 3)}px`} quality={85} className={`block max-w-none ${className}`} style={{ position: "absolute", left, top, width: w, height: h }} />
);

// One of David's real sites, being browsed: it scrolls, an order arrives, sales climb.
function Site() {
  return (
    <div className="sv-scene" style={{ "--P": "9s" } as Vars}>
      <div className={`${ui} absolute left-1 top-1 h-[200px] w-[322px] overflow-hidden`}>
        <div className="flex h-7 items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-3">
          <span className="h-2 w-2 rounded-full bg-rose-400" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="ml-2 flex h-4 flex-1 items-center gap-1 rounded bg-white px-2 text-[10px] text-slate-500">
            <Lock size={8} aria-hidden="true" />
            getvalyxpeptides.com
          </span>
        </div>
        <div className="relative h-[172px] overflow-hidden bg-white">
          <div className="sv-shot relative h-[217px] w-[322px]">
            <Shot src="/valyx.png" w={322} h={217} />
          </div>
          <div className="sv-toast absolute right-2 top-2 flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-lg">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] text-slate-700">New order received</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-[112px] rounded-xl bg-white p-2.5 shadow-[0_18px_40px_-12px_rgba(16,185,129,0.6)]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-500">Sales</span>
          <TrendingUp size={13} aria-hidden="true" className="text-emerald-600" />
        </div>
        <div className="mt-2 flex h-9 items-end gap-1.5">
          {[28, 40, 36, 58, 72, 100].map((h, i) => (
            <span key={i} className={`sv-bar flex-1 rounded-sm ${i === 5 ? "bg-emerald-500" : "bg-emerald-200"}`} style={{ height: `${h}%`, "--i": i } as Vars} />
          ))}
        </div>
      </div>
    </div>
  );
}

// A support chat that plays out with real words: the question, the assistant writing, and where it got the answer.
function Chat() {
  return (
    <div className="sv-scene" style={{ "--P": "10s" } as Vars}>
      <div className={`${ui} absolute left-[15px] top-1.5 w-[300px] overflow-hidden`}>
        <div className="flex items-center gap-2.5 border-b border-slate-200 px-3.5 py-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
            <Sparkles size={15} aria-hidden="true" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </span>
          <div className="leading-tight">
            <p className="text-[12px] text-slate-800">Acme Support</p>
            <p className="text-[10px] text-emerald-600">Online</p>
          </div>
        </div>
        <div className="relative h-[150px] bg-slate-50 p-3">
          <p className="sv-m1 absolute right-3 top-3 max-w-[70%] rounded-2xl rounded-br-sm bg-slate-900 px-3 py-2 text-[11px] text-white">Do you ship to Canada?</p>
          <div className="sv-typing absolute left-3 top-[58px] flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-white px-3.5 py-3 ring-1 ring-slate-200">
            <span className="sc-dot h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span className="sc-dot sc-d2 h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span className="sc-dot sc-d3 h-1.5 w-1.5 rounded-full bg-slate-400" />
          </div>
          <div className="sv-m2 absolute left-3 top-[54px] w-[84%] rounded-2xl rounded-bl-sm bg-white px-3 py-2.5 shadow-sm ring-1 ring-slate-200">
            {["Yes! We ship to Canada in", "3 to 5 working days.", "Want a quote for your cart?"].map((t, i) => (
              <span key={i} className="sv-write block overflow-hidden whitespace-nowrap text-[11px] leading-[1.45] text-slate-700" style={{ "--i": i } as Vars}>
                {t}
              </span>
            ))}
          </div>
          <div className="sv-chip absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] text-slate-500 shadow-sm ring-1 ring-slate-200">
            <FileText size={10} aria-hidden="true" className="text-sky-500" />
            From: Shipping policy
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 bg-white px-3.5 py-2.5">
          <span className="text-[10px] text-slate-400">Type a message</span>
          <Send size={13} aria-hidden="true" className="text-violet-500" />
        </div>
      </div>
    </div>
  );
}

// Two phones running David's real Nokless app: the screens scroll, and a notification drops in.
function PhoneScreen({ src, w, h, ratio, scroll }: { src: string; w: number; h: number; ratio: number; scroll: string }) {
  const shotH = Math.round(w * ratio);
  return (
    <div className="relative overflow-hidden bg-white" style={{ width: w, height: h }}>
      <div className={`relative ${scroll}`} style={{ width: w, height: shotH }}>
        <Shot src={src} w={w} h={shotH} />
      </div>
    </div>
  );
}
function Phone() {
  return (
    <div className="sv-scene">
      <div className="sv-float absolute left-[40px] top-[48px] z-0 opacity-95" style={{ animationDuration: "6s", "--r": "-3deg" } as Vars}>
        <div className="overflow-hidden rounded-[26px] border-[3px] border-slate-800 bg-slate-800 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]">
          <div className="overflow-hidden rounded-[22px]">
            <PhoneScreen src="/nokless-app-salon.jpg" w={114} h={208} ratio={3834 / 1080} scroll="sv-feed2" />
          </div>
        </div>
      </div>
      <div className="sv-float absolute right-[44px] top-[8px] z-10" style={{ animationDuration: "5s", animationDelay: "-1.5s", "--r": "2deg" } as Vars}>
        <div className="relative overflow-hidden rounded-[28px] border-[3px] border-slate-800 bg-slate-800 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.9)]">
          <div className="overflow-hidden rounded-[24px]">
            <PhoneScreen src="/nokless-app-home.jpg" w={118} h={214} ratio={3712 / 1080} scroll="sv-feed" />
          </div>
          <div className="sv-notif absolute inset-x-2 top-3 flex items-center gap-1.5 rounded-xl bg-white/95 px-2 py-1.5 shadow-lg">
            <Tick className="!h-3.5 !w-3.5" />
            <span className="text-[9px] leading-tight text-slate-700">Visitor scanned your QR code</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// An email arrives, the AI reads and labels it, and the work is handed to three places on its own.
function Flow() {
  const ai: [number, number] = [160, 120];
  const outs: { Icon: LucideIcon; color: string; text: string; y: number; d: string }[] = [
    { Icon: Users, color: "text-sky-500", text: "Added to CRM", y: 46, d: "3.7s" },
    { Icon: Send, color: "text-emerald-500", text: "Reply drafted", y: 120, d: "3.85s" },
    { Icon: Bell, color: "text-amber-500", text: "Team alerted", y: 194, d: "4s" },
  ];
  return (
    <div className="sv-scene" style={{ "--P": "7s" } as Vars}>
      <svg viewBox="0 0 330 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <line x1="108" y1="120" x2="132" y2="120" stroke="#c4b5fd" strokeOpacity="0.8" strokeWidth="1.5" strokeDasharray="2 3" className="sc-flow" />
        {outs.map((o, i) => (
          <line key={i} x1="188" y1="120" x2="214" y2={o.y} stroke="#c4b5fd" strokeOpacity="0.8" strokeWidth="1.5" strokeDasharray="2 3" className="sc-flow" />
        ))}
      </svg>
      <div className="absolute left-1 top-[84px] w-[104px] rounded-xl bg-white p-2.5 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white">S</span>
          <span className="text-[10px] text-slate-800">Sarah K.</span>
          <Mail size={10} aria-hidden="true" className="ml-auto text-rose-500" />
        </div>
        <p className="mt-1.5 text-[10px] leading-tight text-slate-700">Pricing question</p>
        <div className="mt-1 space-y-1">
          <Bar w="100%" h="h-1" />
          <Bar w="70%" h="h-1" />
        </div>
      </div>
      <span className="absolute -translate-x-1/2 -translate-y-1/2" style={at(ai[0], ai[1])}>
        <span className="sv-pulse flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-[0_0_44px_-4px_rgba(167,139,250,0.95)]" style={{ "--d": "1.7s" } as Vars}>
          <Sparkles size={24} aria-hidden="true" />
        </span>
      </span>
      <span className="sv-pop absolute -translate-x-1/2 whitespace-nowrap rounded-full bg-violet-500 px-2.5 py-0.5 text-[10px] text-white shadow-md" style={{ left: ai[0], top: 158, "--d": "1.9s" } as Vars}>
        Sales lead
      </span>
      {outs.map(({ Icon, color, text, y, d }, i) => (
        <div key={i} className="absolute left-[216px] flex h-[34px] w-[110px] -translate-y-1/2 items-center gap-2 rounded-lg bg-white px-2.5 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.6)]" style={{ top: y }}>
          <Icon size={13} aria-hidden="true" className={`shrink-0 ${color}`} />
          <span className="whitespace-nowrap text-[10px] text-slate-700">{text}</span>
          <Tick className="sv-pop absolute -right-1.5 -top-1.5 ring-2 ring-slate-900" style={{ "--d": d } as Vars} />
        </div>
      ))}
      <Hop from={[108, 120]} to={[132, 120]} delay="0.3s" />
      {outs.map((o, i) => (
        <Hop key={i} from={[188, 120]} to={[214, o.y]} delay="2s" />
      ))}
    </div>
  );
}

// Your app in the middle, data travelling out to the real tools around it and back, each one lighting up as it answers.
function Connect() {
  const c: [number, number] = [165, 120];
  const nodes: { name: string; color: string; p: [number, number] }[] = [
    { name: "shopify", color: "#95bf47", p: [48, 52] },
    { name: "whatsapp", color: "#25d366", p: [282, 52] },
    { name: "postgresql", color: "#336791", p: [48, 188] },
    { name: "graphql", color: "#e10098", p: [282, 188] },
  ];
  return (
    <div className="sv-scene" style={{ "--P": "6s" } as Vars}>
      <svg viewBox="0 0 330 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {nodes.map((n, i) => (
          <line key={i} x1={c[0]} y1={c[1]} x2={n.p[0]} y2={n.p[1]} stroke="#a5b4fc" strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="2 4" className="sc-flow" />
        ))}
      </svg>
      <span className="sv-ring absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-indigo-300/70" style={at(c[0], c[1])} />
      <span className="absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-[0_0_44px_-4px_rgba(129,140,248,0.95)]" style={at(c[0], c[1])}>
        <LayoutGrid size={22} aria-hidden="true" />
        <span className="text-[9px] leading-none">Your app</span>
      </span>
      {nodes.map(({ name, color, p }, i) => (
        <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={at(p[0], p[1])}>
          <span className="sv-glow flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-[0_10px_24px_-10px_rgba(0,0,0,0.6)]" style={{ "--d": `${i * 0.6 + 1.2}s` } as Vars}>
            <Brand name={name} color={color} className="h-6 w-6" />
          </span>
          <Tick className="absolute -right-1.5 -top-1.5 ring-2 ring-slate-900" />
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

// One of David's real products (Attune), with an AI note about what it just did.
function InProduct() {
  return (
    <div className="sv-scene" style={{ "--P": "8s" } as Vars}>
      <div className={`${ui} absolute left-[20px] top-[48px] h-[184px] w-[250px] overflow-hidden`}>
        <Shot src="/attune.png" w={250} h={184} />
        <span className="sv-ringhl pointer-events-none absolute rounded-lg border-2 border-violet-500" style={{ left: "29%", top: "70%", width: "66%", height: "26%" }} />
      </div>
      <div className="sv-note absolute right-[4px] top-[2px] w-[176px] rounded-xl bg-white p-3 shadow-[0_14px_30px_-8px_rgba(139,92,246,0.7)]">
        <p className="flex items-center gap-1.5 text-[10px] text-violet-600">
          <Sparkles size={11} aria-hidden="true" className="sv-spin" />
          AI insight
        </p>
        <p className="mt-1 text-[10px] leading-snug text-slate-800">3 replies drafted from your inbox.</p>
        <span className="mt-2 inline-block rounded-full bg-violet-500 px-2.5 py-1 text-[10px] text-white">Review</span>
      </div>
    </div>
  );
}

// Searched, found first, and three rings fill up: fast, secure, up to date.
function Health() {
  return (
    <div className="sv-scene" style={{ "--P": "7s" } as Vars}>
      <div className="absolute left-[25px] top-2 flex h-9 w-[280px] items-center gap-2.5 rounded-full bg-white px-4 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.6)]">
        <Search size={14} aria-hidden="true" className="shrink-0 text-slate-500" />
        <span className="sv-type block overflow-hidden whitespace-nowrap text-[11px] text-slate-700">best bakery near me</span>
      </div>
      <div className="sv-result absolute left-[25px] top-[56px] flex w-[280px] items-start gap-3 rounded-xl bg-white p-3 shadow-[0_18px_40px_-14px_rgba(16,185,129,0.7)] ring-2 ring-emerald-400">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-[13px] text-white">A</span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-[12px] text-indigo-700">Acme Bakery</p>
          <p className="text-[10px] text-emerald-700">acmebakery.com</p>
          <p className="mt-0.5 text-[10px] leading-snug text-slate-500">Fresh sourdough and pastries, baked daily. Order online.</p>
        </div>
        <span className="sv-pop flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[11px] text-white" style={{ "--d": "1.9s" } as Vars}>1</span>
      </div>
      <div className="absolute bottom-1 left-0 flex w-full justify-center gap-7">
        {[
          { I: Zap, c: "text-amber-500", t: "Fast" },
          { I: Shield, c: "text-indigo-500", t: "Secure" },
          { I: RefreshCw, c: "text-sky-500", t: "Up to date" },
        ].map(({ I, c, t }, i) => (
          <span key={i} className="flex flex-col items-center gap-1">
            <span className="relative flex h-12 w-12 items-center justify-center">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg ${c}`}>
                <I size={16} aria-hidden="true" />
              </span>
              <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
                <circle cx="24" cy="24" r="21" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="3" />
                <circle cx="24" cy="24" r="21" fill="none" stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="132" strokeDashoffset="6" className="sv-fill" style={{ animationDelay: `${i * 0.25}s` }} />
              </svg>
            </span>
            <span className="text-[10px] text-slate-300">{t}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// A real looking contract: the AI reads it, and answers a question with the page it came from.
function Docs() {
  return (
    <div className="sv-scene" style={{ "--P": "8s" } as Vars}>
      <svg viewBox="0 0 330 240" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <line x1="120" y1="120" x2="138" y2="120" stroke="#c4b5fd" strokeOpacity="0.8" strokeWidth="1.5" strokeDasharray="2 3" className="sc-flow" />
        <line x1="182" y1="120" x2="206" y2="120" stroke="#c4b5fd" strokeOpacity="0.8" strokeWidth="1.5" strokeDasharray="2 3" className="sc-flow" />
      </svg>
      <div className="absolute left-[8px] top-[40px] h-[160px] w-[112px] rounded-lg bg-white p-2.5 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.6)]">
        <p className="flex items-center gap-1 text-[10px] text-slate-700">
          <FileText size={10} aria-hidden="true" className="text-rose-500" />
          Contract.pdf
        </p>
        <div className="mt-2 space-y-1.5">
          {[100, 92, 96, 70].map((w, i) => (
            <Bar key={i} w={`${w}%`} h="h-1" tone="bg-slate-200" />
          ))}
          <span className="sv-docpulse block rounded bg-amber-200/90 p-0.5">
            <Bar w="88%" h="h-1" tone="bg-slate-500" />
          </span>
          {[96, 100, 64, 90].map((w, i) => (
            <Bar key={i} w={`${w}%`} h="h-1" tone="bg-slate-200" />
          ))}
        </div>
      </div>
      <span className="absolute -translate-x-1/2 -translate-y-1/2" style={at(160, 120)}>
        <span className="sv-pulse flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-[0_0_36px_-4px_rgba(167,139,250,0.95)]" style={{ "--d": "1.6s" } as Vars}>
          <Sparkles size={19} aria-hidden="true" />
        </span>
      </span>
      <div className="sv-ans absolute left-[208px] top-[62px] w-[118px] rounded-xl bg-white p-2.5 shadow-[0_18px_40px_-12px_rgba(139,92,246,0.7)]">
        <p className="rounded-md bg-slate-100 px-1.5 py-1 text-[10px] leading-tight text-slate-500">What is the notice period?</p>
        <div className="mt-2 flex items-start gap-1.5">
          <Tick className="sv-pop mt-0.5 shrink-0" style={{ "--d": "3.1s" } as Vars} />
          <p className="text-[11px] leading-snug text-slate-800">30 days, written notice.</p>
        </div>
        <span className="mt-2 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[9px] text-amber-700">Page 4</span>
      </div>
      <Hop from={[120, 120]} to={[138, 120]} delay="0.6s" />
      <Hop from={[182, 120]} to={[206, 120]} delay="2.4s" />
    </div>
  );
}

/* ---------- the services ---------- */

type Item = { name: string; body: string; Visual: React.ComponentType; wash: string };

// Eight services. One big picture stays in view on the left while you move through the list on the right.
const items: Item[] = [
  { name: "Websites and web apps", body: "Sites and stores that turn visitors into customers.", Visual: Site, wash: "99, 102, 241" },
  { name: "Mobile apps", body: "Native apps for iOS and Android, like the Nokless app.", Visual: Phone, wash: "99, 102, 241" },
  { name: "AI assistants", body: "Answers customers from your own content.", Visual: Chat, wash: "139, 92, 246" },
  { name: "Workflow automation", body: "Repetitive work handled quietly in the background.", Visual: Flow, wash: "139, 92, 246" },
  { name: "Integrations and APIs", body: "Payments, CRMs and messaging connected into one flow.", Visual: Connect, wash: "99, 102, 241" },
  { name: "AI inside your product", body: "Search, summaries and recommendations built in.", Visual: InProduct, wash: "139, 92, 246" },
  { name: "Speed, search and care", body: "Fast, found on search, kept updated and secure.", Visual: Health, wash: "99, 102, 241" },
  { name: "Document intelligence", body: "Questions answered from your PDFs, emails and records.", Visual: Docs, wash: "139, 92, 246" },
];

export default function Services() {
  const reduce = useReducedMotion();
  // Two rows of four. Each row keeps one panel open; the one last pointed at is the only one that moves.
  const [open, setOpen] = useState<[number, number]>([0, 4]);
  const [playing, setPlaying] = useState(0);
  const choose = (i: number) => {
    setOpen((o) => (i < 4 ? [i, o[1]] : [o[0], i]));
    setPlaying(i);
  };

  const card = (it: Item) => (
    <>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(${it.wash}, 0.26), transparent 72%)` }} />
      <span aria-hidden="true" className="scene-grid pointer-events-none absolute inset-0 opacity-50" />
    </>
  );

  return (
    <section id="services" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-12 md:text-5xl">
          What you can stop worrying about.
        </h2>

        {/* Desktop: panels that open on hover or focus */}
        <div className="hidden space-y-4 lg:block">
          {[0, 1].map((row) => (
            <ul key={row} className="m-0 flex h-[420px] list-none gap-4 p-0">
              {items.slice(row * 4, row * 4 + 4).map((it, k) => {
                const i = row * 4 + k;
                const isOpen = open[row] === i;
                return (
                  <li key={it.name} className="min-w-0 list-none transition-[flex] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]" style={{ flex: isOpen ? 3.2 : 1 }}>
                    <button
                      type="button"
                      onMouseEnter={() => choose(i)}
                      onFocus={() => choose(i)}
                      onClick={() => choose(i)}
                      aria-expanded={isOpen}
                      className="sv-card relative block h-full w-full overflow-hidden rounded-[28px] bg-[#111637] text-left ring-1 ring-inset ring-white/[0.07] transition-colors duration-300 hover:ring-white/[0.14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
                      data-active={i === playing ? "true" : "false"}
                    >
                      {card(it)}
                      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[44%] h-[240px] w-[330px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]" style={{ transform: `translate(-50%, -50%) scale(${isOpen ? 1.12 : 0.5})`, opacity: isOpen ? 1 : 0.55 }}>
                        <it.Visual />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 px-6 pb-6">
                        <h3 className={`leading-tight tracking-[-0.01em] text-white transition-all duration-300 ${isOpen ? "text-[24px]" : "text-[17px]"}`}>{it.name}</h3>
                        <p className={`mt-1.5 text-[15px] leading-[1.5] text-slate-400 transition-all duration-300 ${isOpen ? "max-h-12 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}>{it.body}</p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>

        {/* Phones and tablets: one tile per service */}
        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 lg:hidden">
          {items.map((it) => (
            <li key={it.name} className="sv-card relative flex list-none flex-col overflow-hidden rounded-[28px] bg-[#111637] ring-1 ring-inset ring-white/[0.07]" data-active="true">
              {card(it)}
              <div aria-hidden="true" className="relative flex h-[290px] items-center justify-center">
                <div className="[zoom:0.9]">
                  <it.Visual />
                </div>
              </div>
              <div className="relative px-6 pb-7 pt-1 text-center">
                <h3 className="text-[22px] leading-tight text-white">{it.name}</h3>
                <p className="mt-1.5 text-[15px] leading-[1.5] text-slate-400">{it.body}</p>
              </div>
            </li>
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
