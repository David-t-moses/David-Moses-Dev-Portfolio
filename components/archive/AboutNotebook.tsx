"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Shared coordinate system: the notebook and every drawing live in one
// 800 x 560 viewBox, so they scale together. Fold at x = 400. Left page inner
// area is about x 70 to 394, right page about x 406 to 730, y 92 to 470.
const W = 800;
const H = 560;

const d = (s: number) => ({ ["--d" as string]: `${s}s` } as React.CSSProperties);

// Page outlines (left, then mirrored right). Edges dip slightly toward the gutter.
const PAGE_L = "M82 92 C200 87 322 92 394 104 L394 476 C322 470 200 466 82 470 Q70 470 70 458 L70 104 Q70 92 82 92 Z";
const PAGE_R = "M718 92 C600 87 478 92 406 104 L406 476 C478 470 600 466 718 470 Q730 470 730 458 L730 104 Q730 92 718 92 Z";

/**
 * Conceptual illustration, not David's actual desk or notes. Drawn in code on
 * a transparent background. Strokes use pathLength="1" so they can be drawn once.
 */
function Notebook() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="notebook block h-auto w-full"
      style={{ aspectRatio: `${W} / ${H}` }}
      role="img"
      aria-label="Conceptual illustration: an open notebook with a sketched screen layout, a short code idea and a note about keeping things simple."
      focusable="false"
    >
      <defs>
        <linearGradient id="nbCover" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4549a8" />
          <stop offset="1" stopColor="#2a2c70" />
        </linearGradient>
        <linearGradient id="nbPageL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f8f3e5" />
          <stop offset="0.72" stopColor="#f3ecdb" />
          <stop offset="0.93" stopColor="#e3dac4" />
          <stop offset="1" stopColor="#cbc0a7" />
        </linearGradient>
        <linearGradient id="nbPageR" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#cbc0a7" />
          <stop offset="0.07" stopColor="#e3dac4" />
          <stop offset="0.28" stopColor="#f3ecdb" />
          <stop offset="1" stopColor="#f8f3e5" />
        </linearGradient>
        <filter id="nbShadow" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <g transform="rotate(-1.2 400 290)">
        {/* Soft contact shadow */}
        <ellipse cx="400" cy="522" rx="350" ry="15" fill="#000" opacity="0.5" filter="url(#nbShadow)" />

        {/* Cover */}
        <path
          d="M54 64 L746 64 Q764 64 764 82 L764 496 Q764 512 746 512 L54 512 Q36 512 36 496 L36 82 Q36 64 54 64 Z"
          fill="url(#nbCover)"
        />
        <path
          d="M54 65 L746 65 Q763 65 763 82 L763 496 Q763 511 746 511 L54 511 Q37 511 37 496 L37 82 Q37 65 54 65 Z"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.1"
        />

        {/* Paper thickness: three offset page edges on each side */}
        {[3, 2, 1].map((i) => (
          <g key={i}>
            <path d={PAGE_L} transform={`translate(${-2.5 * i} ${3 * i})`} fill="#ebe3d0" stroke="#cdc3ab" strokeWidth="0.8" />
            <path d={PAGE_R} transform={`translate(${2.5 * i} ${3 * i})`} fill="#ebe3d0" stroke="#cdc3ab" strokeWidth="0.8" />
          </g>
        ))}

        {/* Pages with gutter shading */}
        <path d={PAGE_L} fill="url(#nbPageL)" />
        <path d={PAGE_R} fill="url(#nbPageR)" />
        {/* Fold */}
        <path d="M400 102 L400 478" stroke="#a89c82" strokeWidth="1.2" opacity="0.7" />
        <path d="M394 104 L394 476 M406 104 L406 476" stroke="#8d8268" strokeWidth="0.8" opacity="0.3" />
        {/* Page highlight along the outer edges */}
        <path d="M84 94 C200 89 322 94 392 106" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="1" />
        <path d="M716 94 C600 89 478 94 408 106" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="1" />

        {/* Ribbon bookmark */}
        <path d="M404 474 L404 518 L410 511 L416 518 L416 474 Z" fill="#7c6bd6" opacity="0.92" />

        {/* Drawings: left page, an interface sketch */}
        <g className="ink" fill="none" stroke="#2b2b34" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.92">
          <path className="stroke" pathLength={1} style={d(0)} d="M150 152 L316 150 L318 372 L147 374 L149 156" />
          <path className="stroke" pathLength={1} style={d(0.5)} d="M149 180 L317 179" />
          <path className="stroke" pathLength={1} style={d(0.65)} d="M162 166 L163 166 M172 166 L173 166 M182 166 L183 166" strokeWidth="5" />
          {/* heading */}
          <path className="stroke" pathLength={1} style={d(0.8)} d="M168 208 C190 206 230 210 262 207" strokeWidth="6.5" />
          {/* supporting lines */}
          <path className="stroke" pathLength={1} style={d(1.1)} d="M168 227 L290 226 M168 241 L252 241" strokeWidth="2" opacity="0.75" />
          {/* three content elements */}
          <path className="stroke" pathLength={1} style={d(1.4)} d="M168 262 L200 261 L201 291 L167 292 Z M214 262 L246 261 L247 291 L213 292 Z M260 262 L292 261 L293 291 L259 292 Z" strokeWidth="2.2" />
          {/* primary action */}
          <path className="stroke" pathLength={1} style={d(1.8)} stroke="#7c6bd6" strokeWidth="2.8" fill="#7c6bd6" fillOpacity="0.16" d="M180 318 L250 317 Q264 318 264 331 Q263 345 250 346 L180 347 Q166 346 167 332 Q167 318 180 318 Z" />
          {/* how it is used: a pointer about to tap */}
          <path className="stroke" pathLength={1} style={d(2.2)} fill="#f3ecdb" strokeWidth="2.2" d="M252 334 L252 358 L258 352 L264 364 L268 362 L262 350 L270 350 Z" />
          <path className="stroke" pathLength={1} style={d(2.5)} stroke="#7c6bd6" strokeWidth="2.2" d="M276 338 Q284 344 278 352" />
        </g>

        {/* Right page: a short code idea and one quiet note */}
        <g className="code-only">
          <g className="ink-text" style={d(2.6)} fill="#2b2b34" opacity="0.92">
            <text x="448" y="182" className="hand" fontSize="28">listen(user)</text>
            <text x="448" y="214" className="hand" fontSize="28">build().test()</text>
            <text x="448" y="246" className="hand" fontSize="28">ship()</text>
          </g>
          <path className="stroke ink" pathLength={1} style={d(2.4)} d="M436 164 L436 254" fill="none" stroke="#2b2b34" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
        </g>
        <g className="note-group">
          <g className="ink-text" style={d(3.2)}>
            <text x="448" y="352" className="hand note-text" fontSize="30" fill="#6a59c7">keep it simple</text>
          </g>
          <path className="stroke ink" pathLength={1} style={d(3.5)} d="M448 364 C490 367 530 363 574 365" fill="none" stroke="#7c6bd6" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

const process = ["Understand the goal", "Build, test, refine", "Launch and improve"];

export default function AboutNotebook() {
  const sectionRef = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [drawn, setDrawn] = useState(false);

  // One shot: arm the hidden state only when motion is allowed, play the
  // entrance once when the section first enters view, then hold. Reduced
  // motion never arms, so the complete result is visible at once.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`relative overflow-hidden bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 px-6 py-20 md:py-24 ${armed ? "about-armed" : ""} ${drawn ? "about-drawn" : ""}`}
    >
      <div className="pointer-events-none absolute top-10 left-10 h-32 w-32 rounded-full bg-gradient-to-tr from-indigo-500/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-40 w-40 rounded-full bg-gradient-to-tr from-purple-500/20 to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-[1270px] gap-x-16 gap-y-8 lg:grid-cols-2 lg:gap-y-12">
        {/* Heading */}
        <h2 className="text-balance text-4xl leading-[1.1] tracking-tight text-white md:text-6xl lg:col-start-1 lg:row-start-1 lg:self-end">
          Built around your <span className="text-indigo-300">vision.</span>
        </h2>

        {/* Notebook */}
        <div className="mx-auto w-full max-w-[680px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <Notebook />
        </div>

        {/* Process and inquiry link */}
        <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
          <ol className="flex flex-col items-start">
            {process.map((step, i) => (
              <li key={step} className="flex flex-col items-start">
                <span className="proc font-heading text-2xl text-white md:text-3xl" style={d(3.6 + i * 0.5)}>
                  {step}
                </span>
                {i < process.length - 1 && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 12 32"
                    className="proc-arrow my-3 ml-1 h-8 w-3 text-indigo-300"
                    style={d(3.8 + i * 0.5)}
                  >
                    <path d="M6 0 V28 M1.5 23 L6 28.5 L10.5 23" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </li>
            ))}
          </ol>
          <Link
            href="#contact"
            className="mt-8 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-white underline decoration-indigo-300/50 underline-offset-8 transition-colors hover:decoration-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300"
          >
            Tell me about your project <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
