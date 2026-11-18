"use client";

// The previous notebook version is kept in components/archive/AboutNotebook.tsx.

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Code2, MessagesSquare, Rocket, Route } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

// Monitor photo (derivative of public/monitor.png with the studio background
// removed): 1200 x 857. Its white screen measures 938 x 527 at (128, 58). The
// wireframe overlay is positioned from these numbers as percentages, so it
// stays exactly inside the screen at every size.
const IMG_W = 1200;
const IMG_H = 857;
const SCREEN = { x: 128, y: 58, w: 938, h: 527 };
// Wireframe drawing space (16:9). The overlay stretches to the screen rectangle.
const SW = 864;
const SH = 486;

const d = (s: number) => ({ ["--d" as string]: `${s}s` } as React.CSSProperties);

// Rounded rectangle as a path, so it can be drawn with a dash animation.
const rr = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${x + r} ${y} Z`;

const VIOLET = "#7c6bd6";
const CHAR = "#2b2b34";
const SOFT = "#c4c4d0";

/**
 * Conceptual interface illustration shown on the supplied monitor photo. Not a
 * client project. Fully decorative: hidden from the accessibility tree and
 * contains nothing focusable.
 */
function Wireframe() {
  return (
    <svg
      viewBox={`0 0 ${SW} ${SH}`}
      preserveAspectRatio="none"
      className="monitor absolute block"
      style={{
        left: `${(SCREEN.x / IMG_W) * 100}%`,
        top: `${(SCREEN.y / IMG_H) * 100}%`,
        width: `${(SCREEN.w / IMG_W) * 100}%`,
        height: `${(SCREEN.h / IMG_H) * 100}%`,
      }}
      aria-hidden="true"
      focusable="false"
    >
      <rect width={SW} height={SH} fill="#f5f5f8" />

      {/* Navigation */}
      <rect width={SW} height="52" fill="#fff" />
      <path className="stroke ink" pathLength={1} style={d(0.6)} d="M0 52 H864" fill="none" stroke="#dcdce4" strokeWidth="1.5" />
      <g className="ink-text" style={d(0.9)}>
        <circle cx="48" cy="26" r="9" fill={VIOLET} />
        <rect x="62" y="22" width="56" height="8" rx="4" fill={CHAR} />
        {[560, 628, 696, 764].map((x) => (
          <rect key={x} x={x} y="23" width="44" height="6" rx="3" fill="#b4b4c2" />
        ))}
      </g>

      {/* Headline area */}
      <g className="ink-text" style={d(1.2)}>
        <rect x="48" y="110" width="340" height="22" rx="11" fill={CHAR} />
        <rect x="48" y="146" width="270" height="22" rx="11" fill={CHAR} />
      </g>
      <g className="ink-text" style={d(1.5)} fill={SOFT}>
        <rect x="48" y="194" width="350" height="7" rx="3.5" />
        <rect x="48" y="210" width="300" height="7" rx="3.5" />
      </g>

      {/* The one action, with the final emphasis */}
      <g className="ink-text" style={d(1.8)}>
        <g className="mon-cta">
          <path d={rr(48, 250, 148, 42, 21)} fill={VIOLET} />
          <rect x="76" y="268" width="92" height="6" rx="3" fill="#fff" opacity="0.92" />
        </g>
      </g>

      {/* Image placeholder */}
      <g className="ink-text" style={d(1.6)}>
        <path d={rr(470, 84, 346, 216, 16)} fill="#e9e9f1" />
      </g>
      <path className="stroke ink" pathLength={1} style={d(1.3)} d={rr(470, 84, 346, 216, 16)} fill="none" stroke={CHAR} strokeWidth="2" />
      <path className="stroke ink" pathLength={1} style={d(2.1)} d="M488 282 L574 202 L640 260 L702 210 L800 282" fill="none" stroke={CHAR} strokeWidth="2" opacity="0.55" />
      <path className="stroke ink" pathLength={1} style={d(2.3)} d="M582 134 a20 20 0 1 0 0.1 0" fill="none" stroke={CHAR} strokeWidth="2" opacity="0.55" />

      {/* Small feature row */}
      {[48, 312, 576].map((x, i) => (
        <g key={x}>
          <path className="stroke ink" pathLength={1} style={d(2.4 + i * 0.15)} d={rr(x, 342, 240, 150, 14)} fill="#fff" stroke="#cfcfdb" strokeWidth="1.5" />
          <g className="ink-text" style={d(2.6 + i * 0.15)}>
            <circle cx={x + 38} cy="378" r="14" fill={i === 0 ? VIOLET : "#e0e0ea"} />
            <rect x={x + 24} y="410" width="110" height="9" rx="4.5" fill={CHAR} />
            <rect x={x + 24} y="430" width="170" height="6" rx="3" fill={SOFT} />
          </g>
        </g>
      ))}
    </svg>
  );
}

const steps = [
  {
    n: "01",
    title: "Listen",
    icon: MessagesSquare,
    body: "We start with a conversation. I learn your goals, your customers and what success looks like, before any design or code.",
    gets: "A clear brief",
  },
  {
    n: "02",
    title: "Plan",
    icon: Route,
    body: "You get a straightforward scope and timeline up front, so you know what is being built and when.",
    gets: "Scope and timeline",
  },
  {
    n: "03",
    title: "Build",
    icon: Code2,
    body: "I design and build in stages and share working previews along the way, so you see progress and shape the result.",
    gets: "Working previews",
  },
  {
    n: "04",
    title: "Launch and grow",
    icon: Rocket,
    body: "I take it live, make sure it is fast and ready to be found, and stay on hand for updates and support.",
    gets: "A live, supported product",
  },
];

function Approach() {
  const reduce = useReducedMotion();
  return (
    <div className="mt-20 w-full text-left md:mt-28">
      <div className="mx-auto max-w-2xl text-center">
        <h3 className="text-balance text-3xl leading-[1.15] tracking-tight text-white md:text-4xl">
          How we&apos;ll work <span className="text-indigo-300">together.</span>
        </h3>
        <p className="mt-4 text-pretty text-base leading-relaxed text-gray-400 md:text-lg">
          A simple process with no surprises. You talk to me directly, from the first message to launch day and after.
        </p>
      </div>

      <ol className="m-0 mt-12 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.li
              key={step.n}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              className="group/step relative flex list-none flex-col rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_22px_50px_-34px_rgba(0,0,0,0.9)] transition-colors duration-300 hover:border-white/20 md:p-7"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-indigo-300 transition-colors duration-300 group-hover/step:border-indigo-300/40 group-hover/step:bg-indigo-400/10">
                  <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <span className="font-heading text-3xl leading-none text-white/20 transition-colors duration-300 group-hover/step:text-indigo-300/70">
                  {step.n}
                </span>
              </div>

              {/* Connector to the next step, desktop only */}
              {i < steps.length - 1 && (
                <motion.span
                  aria-hidden="true"
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease: "easeOut" }}
                  style={{ originX: 0 }}
                  className="pointer-events-none absolute left-[calc(100%-1px)] top-[52px] hidden h-px w-6 bg-gradient-to-r from-indigo-300/50 to-indigo-300/10 lg:block"
                />
              )}

              <h4 className="mt-6 text-xl text-white md:text-[22px]">{step.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-300 md:text-[15px]">{step.body}</p>

              <div className="mt-auto pt-6">
                <div className="flex items-center gap-2 border-t border-white/10 pt-4 text-[13px] tracking-wide text-slate-300">
                  <Check size={14} className="shrink-0 text-emerald-400" aria-hidden="true" />
                  <span>
                    <span className="sr-only">You get: </span>
                    {step.gets}
                  </span>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ol>

      <div className="mt-12 flex flex-col items-center gap-5 text-center md:mt-14">
        <p className="max-w-xl text-pretty text-lg leading-relaxed text-slate-200">
          Have an idea or a project in mind? Tell me about it and I will reply with honest next steps.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
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
  );
}

export default function About() {
  const figureRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [drawn, setDrawn] = useState(false);

  // One shot: arm the hidden state only when motion is allowed, play the
  // entrance once when the monitor first scrolls into view, then hold. Reduced
  // motion never arms, so the complete illustration is visible at once.
  useEffect(() => {
    const el = figureRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="about"
      className={`relative overflow-hidden bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 px-6 py-20 md:py-28 ${armed ? "about-armed" : ""} ${drawn ? "about-drawn" : ""}`}
    >
      <div className="pointer-events-none absolute top-10 left-10 h-32 w-32 rounded-full bg-gradient-to-tr from-indigo-500/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-40 w-40 rounded-full bg-gradient-to-tr from-purple-500/20 to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-[1270px] flex-col items-center text-center">
        <h2 className="text-balance text-4xl leading-[1.1] tracking-tight text-white md:text-5xl">
          Your idea, <span className="text-indigo-300">taking shape.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-gray-400 md:text-lg">
          I shape the experience, build the logic and refine the details with you.
        </p>

        <div
          ref={figureRef}
          className="monitor-in relative mt-4 w-full max-w-[860px]"
          style={{ aspectRatio: `${IMG_W} / ${IMG_H}` }}
        >
          <img
            src="/monitor-transparent.webp"
            alt=""
            width={IMG_W}
            height={IMG_H}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="absolute inset-0 h-full w-full select-none"
            style={{ filter: "drop-shadow(0 22px 26px rgba(0,0,0,0.45))" }}
          />
          <Wireframe />
        </div>

        <Approach />
      </div>
    </section>
  );
}
