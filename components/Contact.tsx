"use client";

// Earlier versions: components/archive/ContactBeforeBlend.tsx (form), ContactChannelTiles.tsx (tiles),
// ContactEditorialList.tsx (large rows).

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { contact } from "@/lib/contact";

type Reply = { key: string; title: string; line: string; href: string; external: boolean; primary?: boolean; mark: "calendar" | "mail" | "x" | "whatsapp" };

// Official marks from Simple Icons (CC0) in /public/tech, drawn as masks so they take the text colour.
function Logo({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const url = `url(/tech/${name}.svg)`;
  return (
    <span
      aria-hidden="true"
      className={`block bg-current ${className}`}
      style={{ WebkitMaskImage: url, maskImage: url, WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center", WebkitMaskSize: "contain", maskSize: "contain" }}
    />
  );
}

const glyph = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: "h-5 w-5" };
function Mark({ kind }: { kind: Reply["mark"] }) {
  if (kind === "x") return <Logo name="x" className="h-[18px] w-[18px]" />;
  if (kind === "whatsapp") return <Logo name="whatsapp" />;
  if (kind === "mail")
    return (
      <svg {...glyph} aria-hidden="true">
        <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
        <path d="m4 7.5 8 6 8-6" />
      </svg>
    );
  return (
    <svg {...glyph} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover/r:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.7, 0.2, 1] as const } } };


export default function Contact() {
  const reduce = useReducedMotion();
  // The pointer light, as on Tech Stack, on this one card.
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent("New project enquiry")}&body=${encodeURIComponent("Hi David,\n\nI would like to talk about a project.\n\n")}`;
  const wa = contact.whatsapp ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hi David, I would like to talk about a project.")}` : "";

  const replies: Reply[] = [];
  if (wa) replies.push({ key: "whatsapp", title: "Message me on WhatsApp", line: "I reply personally.", href: wa, external: true, primary: true, mark: "whatsapp" });
  replies.push({ key: "call", title: "Book a call", line: "Thirty minutes, no obligation.", href: contact.calendly, external: true, primary: !wa, mark: "calendar" });
  replies.push(
    { key: "email", title: "Send an email", line: contact.email, href: mailto, external: false, mark: "mail" },
    { key: "x", title: "Connect on X", line: "Follow along and say hello.", href: contact.x, external: true, mark: "x" },
  );

  return (
    <section id="contact" className="relative overflow-hidden px-6 pb-16 pt-20 md:px-10 md:pb-20 md:pt-28">
      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[38%] h-[640px] w-[min(1100px,120vw)] -translate-x-1/2 -translate-y-1/2" style={{ backgroundImage: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(99, 102, 241, 0.22), rgba(124, 58, 237, 0.08) 55%, transparent 100%)" }} />

      <div className="relative z-10 mx-auto max-w-[1040px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-12 md:text-5xl">
          Talk to me directly.
        </h2>

        <motion.div
          onPointerMove={onMove}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="spot-solo relative grid gap-5 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/60 p-4 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] md:p-6 lg:grid-cols-[330px_1fr] lg:gap-8"
        >
          {/* Who you are talking to */}
          <div className="relative flex min-h-[210px] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/30 via-violet-500/15 to-slate-900/40 lg:block lg:min-h-0">
            <span aria-hidden="true" className="scene-grid pointer-events-none absolute inset-0 opacity-70" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3" style={{ backgroundImage: "radial-gradient(ellipse 70% 80% at 60% 100%, rgba(129, 140, 248, 0.45), transparent 75%)" }} />
            <div className="absolute inset-y-0 right-0 w-[44%] overflow-hidden lg:relative lg:inset-auto lg:h-[300px] lg:w-full" style={{ WebkitMaskImage: "linear-gradient(to bottom, #000 72%, transparent 100%)", maskImage: "linear-gradient(to bottom, #000 72%, transparent 100%)" }}>
              <Image
                src={contact.photo}
                alt="David Moses"
                width={409}
                height={609}
                priority={false}
                sizes="(min-width: 1024px) 330px, 46vw"
                className="absolute left-1/2 top-2 h-[150%] w-auto max-w-none -translate-x-1/2 select-none object-contain lg:top-0 lg:h-[128%]"
              />
            </div>
            <div className="relative w-[62%] p-4 lg:w-full lg:p-6 lg:pt-4">
              <p className="text-xl leading-tight text-white md:text-[22px]">David Moses</p>
              <p className="mt-1.5 text-sm leading-snug text-slate-300">Full Stack Developer and AI Engineer</p>
              <p className="mt-4 flex w-fit items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1.5 text-[12px] text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                Open to new projects
              </p>
            </div>
          </div>

          {/* The conversation: it simply appears, nothing to wait for */}
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="relative flex min-w-0 flex-col justify-center px-1 py-2 lg:px-2"
          >
            <motion.div variants={item}>
              <h3 className="text-[21px] leading-[1.25] tracking-[-0.01em] text-white md:text-[25px]">You set the goal. I build the system that gets you there and delivers real results.</h3>
            </motion.div>

            {/* How you can answer */}
            <ul className="relative m-0 mt-7 flex list-none flex-col items-stretch gap-2.5 p-0 md:mt-8">
              {replies.map((r) => (
                <motion.li key={r.key} variants={item} className="list-none md:w-full">
                  <a
                    href={r.href}
                    {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`group/r flex items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300 ${
                      r.primary
                        ? "border-transparent bg-white text-slate-950 hover:bg-slate-100"
                        : "border-white/15 bg-[#10163a] text-white hover:border-white/30 hover:bg-[#151c48]"
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${r.primary ? "bg-slate-950/[0.08] text-slate-900" : "bg-white/[0.08] text-slate-200"}`}>
                        <Mark kind={r.mark} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[15px] leading-tight md:text-[16px]">{r.title}</span>
                        <span className={`mt-0.5 block text-[12px] ${r.primary ? "text-slate-600" : "text-slate-300"}`}>{r.line}</span>
                      </span>
                    </span>
                    <Arrow />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center md:mt-14">
          <ul className="m-0 flex list-none items-center gap-3 p-0">
            {[
              { label: "LinkedIn", href: contact.linkedin, logo: "linkedin" },
              { label: "GitHub", href: contact.github, logo: "github" },
              { label: "X", href: contact.x, logo: "x" },
            ].map((l) => (
              <li key={l.label} className="list-none">
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={l.label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300/50 hover:bg-indigo-400/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
                >
                  <Logo name={l.logo} className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} David Moses</p>
        </div>
      </div>
    </section>
  );
}
