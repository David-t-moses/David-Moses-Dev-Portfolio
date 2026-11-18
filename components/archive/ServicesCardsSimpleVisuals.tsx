"use client";

// Earlier versions are in components/archive (Services*.tsx), the latest being
// ServicesMarqueeSkeletonVisuals.tsx (same cards with abstract skeleton drawings).

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, FileText, Sparkles } from "lucide-react";

/* ---------- simple pictures: one clear subject per card, big text, almost nothing else ----------
   280 x 220 stages. Illustrations only; the sites and the app are David's real work. */

type Vars = React.CSSProperties & Record<string, string | number>;
const Shot = ({ src, w, h, className = "" }: { src: string; w: number; h: number; className?: string }) => (
  <Image src={src} alt="" width={w} height={h} sizes={`${Math.ceil(w * 3)}px`} quality={85} className={`block max-w-none ${className}`} style={{ width: w, height: h }} />
);
const Brand = ({ name, color }: { name: string; color: string }) => {
  const url = `url(/tech/${name}.svg)`;
  return (
    <span aria-hidden="true" className="block h-7 w-7" style={{ background: color, WebkitMaskImage: url, maskImage: url, WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center", WebkitMaskSize: "contain", maskSize: "contain" }} />
  );
};
const white = "bg-white shadow-[0_18px_40px_-14px_rgba(0,0,0,0.65)]";

function Site() {
  return (
    <div className="sv-scene sx">
      <div className="sv-float absolute left-[10px] top-[16px]" style={{ animationDuration: "6s", "--r": "0deg" } as Vars}>
        <div className={`${white} w-[260px] overflow-hidden rounded-xl`}>
          <div className="flex h-6 items-center gap-1.5 bg-slate-100 px-2.5">
            <span className="h-2 w-2 rounded-full bg-rose-400" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </div>
          <Shot src="/valyx.png" w={260} h={175} />
        </div>
      </div>
    </div>
  );
}

function Phone() {
  return (
    <div className="sv-scene sx">
      <div className="sv-float absolute left-[34px] top-[30px] -rotate-6 opacity-90" style={{ animationDuration: "6s", "--r": "-6deg" } as Vars}>
        <div className="overflow-hidden rounded-[22px] border-[3px] border-slate-800 bg-slate-800 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.8)]">
          <div className="h-[180px] w-[96px] overflow-hidden rounded-[18px] bg-white">
            <Shot src="/nokless-app-salon.jpg" w={96} h={341} />
          </div>
        </div>
      </div>
      <div className="sv-float absolute right-[40px] top-[10px]" style={{ animationDuration: "5s", animationDelay: "-1.5s", "--r": "4deg" } as Vars}>
        <div className="overflow-hidden rounded-[24px] border-[3px] border-slate-800 bg-slate-800 shadow-[0_24px_50px_-16px_rgba(0,0,0,0.9)]">
          <div className="h-[200px] w-[108px] overflow-hidden rounded-[20px] bg-white">
            <Shot src="/nokless-app-home.jpg" w={108} h={371} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Connect() {
  const logos = [
    { n: "shopify", c: "#95bf47", x: 14, y: 14 },
    { n: "whatsapp", c: "#25d366", x: 214, y: 14 },
    { n: "postgresql", c: "#336791", x: 14, y: 150 },
    { n: "graphql", c: "#e10098", x: 214, y: 150 },
  ];
  return (
    <div className="sv-scene sx">
      <svg viewBox="0 0 280 220" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {logos.map((l) => (
          <line key={l.n} x1="140" y1="110" x2={l.x + 26} y2={l.y + 26} stroke="#a5b4fc" strokeOpacity="0.7" strokeWidth="2" strokeDasharray="3 5" className="sc-flow" />
        ))}
      </svg>
      {logos.map((l) => (
        <span key={l.n} className={`${white} absolute flex h-[52px] w-[52px] items-center justify-center rounded-2xl`} style={{ left: l.x, top: l.y }}>
          <Brand name={l.n} color={l.c} />
        </span>
      ))}
      <span className="sv-pulse absolute left-1/2 top-1/2 flex h-[66px] w-[66px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-[14px] text-white shadow-[0_0_40px_-4px_rgba(129,140,248,0.95)]" style={{ "--P": "4s" } as Vars}>
        Your app
      </span>
    </div>
  );
}

function Health() {
  return (
    <div className="sv-scene sx">
      <div className="absolute left-1/2 top-[6px] h-[136px] w-[136px] -translate-x-1/2">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="8" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="#34d399" strokeWidth="8" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="14" className="sv-fill" style={{ "--P": "6s" } as Vars} />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[30px] text-white">Fast</span>
      </div>
      <div className="absolute inset-x-0 bottom-[10px] flex justify-center gap-2.5">
        {["Secure", "Found", "Updated"].map((t) => (
          <span key={t} className={`${white} rounded-full px-3 py-1.5 text-[12px] text-slate-700`}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function Chat() {
  return (
    <div className="sv-scene sx">
      <p className="absolute right-[10px] top-[26px] max-w-[200px] rounded-2xl rounded-br-sm bg-slate-900 px-4 py-3 text-[15px] leading-snug text-white ring-1 ring-white/15">Do you ship to Canada?</p>
      <div className={`${white} sv-float absolute left-[10px] top-[98px] max-w-[236px] rounded-2xl rounded-bl-sm px-4 py-3`} style={{ animationDuration: "5s", "--r": "0deg" } as Vars}>
        <p className="text-[15px] leading-snug text-slate-800">Yes, in 3 to 5 working days.</p>
        <p className="mt-1 text-[11px] text-violet-600">Answered by your AI assistant</p>
      </div>
    </div>
  );
}

function Flow() {
  return (
    <div className="sv-scene sx flex flex-col items-center justify-center gap-0">
      <span className={`${white} rounded-xl px-5 py-2.5 text-[15px] text-slate-800`}>New email arrives</span>
      <span className="block h-5 w-px bg-violet-300/70" />
      <span className="sv-pulse flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-[0_0_36px_-4px_rgba(167,139,250,0.95)]" style={{ "--P": "4s" } as Vars}>
        <Sparkles size={24} aria-hidden="true" />
      </span>
      <span className="block h-5 w-px bg-violet-300/70" />
      <span className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-[15px] text-white shadow-lg">
        <Check size={16} strokeWidth={3} aria-hidden="true" />
        Reply sent
      </span>
    </div>
  );
}

function InProduct() {
  return (
    <div className="sv-scene sx">
      <div className={`${white} sv-float absolute left-[8px] top-[40px] overflow-hidden rounded-xl`} style={{ animationDuration: "6s", "--r": "0deg" } as Vars}>
        <Shot src="/attune.png" w={264} h={195} />
      </div>
      <span className="sv-pulse absolute right-[4px] top-[6px] flex items-center gap-2 rounded-full bg-violet-500 px-4 py-2 text-[14px] text-white shadow-[0_12px_30px_-6px_rgba(139,92,246,0.9)]" style={{ "--P": "4s" } as Vars}>
        <Sparkles size={15} aria-hidden="true" />
        AI built in
      </span>
    </div>
  );
}

function Docs() {
  return (
    <div className="sv-scene sx">
      <div className={`${white} absolute left-[14px] top-[22px] h-[176px] w-[132px] rounded-xl p-3.5`}>
        <p className="flex items-center gap-1.5 text-[12px] text-slate-600">
          <FileText size={13} aria-hidden="true" className="text-rose-500" />
          Contract.pdf
        </p>
        <div className="mt-3 space-y-2">
          {[100, 90, 96].map((w, i) => (
            <span key={i} className="block h-1.5 rounded-full bg-slate-200" style={{ width: `${w}%` }} />
          ))}
          <span className="sv-docpulse block rounded bg-amber-200 p-0.5"><span className="block h-1.5 w-[85%] rounded-full bg-slate-500" /></span>
          {[94, 70].map((w, i) => (
            <span key={i} className="block h-1.5 rounded-full bg-slate-200" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
      <div className="sv-float absolute right-[6px] top-[66px] w-[128px] rounded-2xl bg-violet-500 px-3.5 py-3 text-white shadow-[0_18px_40px_-10px_rgba(139,92,246,0.9)]" style={{ animationDuration: "5s", "--r": "0deg" } as Vars}>
        <p className="text-[11px] text-violet-100">Notice period?</p>
        <p className="mt-1 text-[16px] leading-tight">30 days</p>
      </div>
    </div>
  );
}

type Item = { name: string; body: string; Visual: React.ComponentType; wash: string };

// Eight services as eight equal cards: the picture on top, then the name and one line. Build work first,
// then the AI work. Only one picture moves at a time (the one pointed at, else the one nearest the middle).
const items: Item[] = [
  { name: "Websites and web apps", body: "Sites and stores that turn visitors into customers.", Visual: Site, wash: "99, 102, 241" },
  { name: "Mobile apps", body: "Native apps for iOS and Android.", Visual: Phone, wash: "99, 102, 241" },
  { name: "Integrations and APIs", body: "Your tools connected into one flow.", Visual: Connect, wash: "99, 102, 241" },
  { name: "Speed, search and care", body: "Fast, found on search, kept updated.", Visual: Health, wash: "99, 102, 241" },
  { name: "AI assistants", body: "Answers customers from your own content.", Visual: Chat, wash: "139, 92, 246" },
  { name: "Workflow automation", body: "Repetitive work handled in the background.", Visual: Flow, wash: "139, 92, 246" },
  { name: "AI inside your product", body: "Search and summaries built in.", Visual: InProduct, wash: "139, 92, 246" },
  { name: "Document intelligence", body: "Questions answered from your files.", Visual: Docs, wash: "139, 92, 246" },
];

export default function Services() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ul = listRef.current;
    if (!ul) return;
    const cards = Array.from(ul.querySelectorAll<HTMLElement>(".sv-card"));
    let hovered: HTMLElement | null = null;
    let raf = 0;
    const pick = () => {
      raf = 0;
      let best: HTMLElement | null = hovered;
      if (!best) {
        const mid = window.innerHeight / 2;
        let d = Infinity;
        cards.forEach((c) => {
          const r = c.getBoundingClientRect();
          if (r.bottom < 0 || r.top > window.innerHeight) return;
          const dist = Math.abs(r.top + r.height / 2 - mid);
          if (dist < d) { d = dist; best = c; }
        });
      }
      cards.forEach((c) => (c.dataset.active = c === best ? "true" : "false"));
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(pick); };
    const enter = (e: Event) => { hovered = e.currentTarget as HTMLElement; queue(); };
    const leave = () => { hovered = null; queue(); };
    cards.forEach((c) => { c.addEventListener("pointerenter", enter); c.addEventListener("pointerleave", leave); });
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    queue();
    return () => {
      cancelAnimationFrame(raf);
      cards.forEach((c) => { c.removeEventListener("pointerenter", enter); c.removeEventListener("pointerleave", leave); });
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);

  return (
    <section id="services" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-12 md:text-5xl">
          What you can stop worrying about.
        </h2>

        <ul ref={listRef} className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
          {items.map((it, i) => (
            <motion.li
              key={it.name}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.07, ease: "easeOut" }}
              tabIndex={0}
              className="sv-card group/t relative flex list-none flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-[0_14px_36px_-28px_rgba(0,0,0,0.55)] transition-colors duration-300 hover:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
            >
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[300px]" style={{ backgroundImage: `radial-gradient(ellipse 75% 70% at 50% 42%, rgba(${it.wash}, 0.26), transparent 74%)` }} />
              <div className="relative flex h-[270px] items-center justify-center overflow-hidden md:h-[340px] xl:h-[260px]">
                <span aria-hidden="true" className="scene-grid pointer-events-none absolute inset-0 opacity-60" />
                <div aria-hidden="true" className="relative flex shrink-0 items-center justify-center [zoom:1.05] md:[zoom:1.5] xl:[zoom:1]">
                  <it.Visual />
                </div>
              </div>
              <div className="relative border-t border-white/10 px-6 pb-7 pt-5">
                <h3 className="text-[21px] leading-tight tracking-[-0.01em] text-white">{it.name}</h3>
                <p className="mt-1.5 text-[15px] leading-[1.5] text-slate-400 transition-colors duration-300 group-hover/t:text-slate-300">{it.body}</p>
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
