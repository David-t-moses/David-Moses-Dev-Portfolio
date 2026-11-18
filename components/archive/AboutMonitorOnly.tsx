"use client";

// The previous notebook version is kept in components/archive/AboutNotebook.tsx.

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

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
      className={`relative overflow-hidden bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 px-6 py-14 md:py-16 ${armed ? "about-armed" : ""} ${drawn ? "about-drawn" : ""}`}
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
        <Link
          href="#contact"
          className="mt-2 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-white underline decoration-indigo-300/50 underline-offset-8 transition-colors hover:decoration-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300"
        >
          Get in touch <span aria-hidden="true">→</span>
        </Link>

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
      </div>
    </section>
  );
}
