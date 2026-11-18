"use client";

// Earlier versions: components/archive/TechStackBento.tsx, TechStackLayerRows.tsx,
// TechStackChipRowsCard.tsx (chip rows in one card), TechStackBentoPlusChipMarquee.tsx.

import React, { useState } from "react";
import { useReducedMotion } from "framer-motion";

// The stack, literally: four layers, each a plate in a 3D stack. Hover or choose a layer and its
// plate lifts out while its tools show. One square on a plate per tool on that layer.
const layers = [
  { job: "What people see", note: "The interface", rgb: "99, 102, 241", tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "React Native"] },
  { job: "What runs it", note: "The engine", rgb: "56, 189, 248", tools: ["Node.js", "Nest.js", "PostgreSQL", "Prisma", "Socket.io", "REST and GraphQL APIs"] },
  { job: "What sells", note: "The storefront", rgb: "139, 92, 246", tools: ["WooCommerce", "Shopify", "WordPress", "Webflow", "Plaid API"] },
  { job: "What thinks", note: "The intelligence", rgb: "217, 70, 239", tools: ["Language model APIs", "AI agents", "Retrieval over your documents", "Automation workflows"] },
];

const GAP = 78; // vertical distance between plates
const LIFT = 30; // how far the chosen plate rises

function Stack({ active, setActive, reduce }: { active: number; setActive: (i: number) => void; reduce: boolean | null }) {
  return (
    <div aria-hidden="true" className="relative mx-auto mt-14 h-[330px] w-[300px] md:mt-8 md:h-[420px] md:w-[380px]" style={{ perspective: "1400px" }}>
      {/* floor glow */}
      <span className="pointer-events-none absolute inset-x-6 bottom-6 h-20 rounded-full blur-2xl transition-colors duration-500" style={{ background: `rgba(${layers[active].rgb}, 0.35)` }} />
      <div
        className="absolute inset-0 origin-center scale-[0.78] md:scale-100"
        style={{ transform: "rotateX(58deg) rotateZ(-42deg)", transformStyle: "preserve-3d" }}
      >
        {layers.map((l, i) => {
          const on = i === active;
          const z = (layers.length - 1 - i) * GAP + (on ? LIFT : 0);
          return (
            <button
              key={l.job}
              type="button"
              tabIndex={-1}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -ml-[100px] -mt-[100px] cursor-pointer rounded-[26px] border p-5 text-left md:h-[225px] md:w-[225px] md:-ml-[112px] md:-mt-[112px]"
              style={{
                transform: `translateZ(${z}px)`,
                transition: reduce ? "none" : "transform 0.55s cubic-bezier(0.2, 0.7, 0.2, 1), border-color 0.4s, box-shadow 0.4s, background 0.4s",
                borderColor: `rgba(${l.rgb}, ${on ? 0.85 : 0.35})`,
                background: `linear-gradient(140deg, rgba(${l.rgb}, ${on ? 0.5 : 0.24}), rgba(${l.rgb}, ${on ? 0.16 : 0.07}))`,
                boxShadow: on ? `0 0 60px -6px rgba(${l.rgb}, 0.65)` : "0 18px 30px -22px rgba(0,0,0,0.8)",
              }}
            >
              {/* one square per tool */}
              <span className="grid h-full grid-cols-3 content-start gap-3">
                {l.tools.map((t) => (
                  <span key={t} className="aspect-square rounded-lg border" style={{ borderColor: `rgba(${l.rgb}, ${on ? 0.8 : 0.4})`, background: `rgba(${l.rgb}, ${on ? 0.4 : 0.16})`, transition: "background 0.4s, border-color 0.4s" }} />
                ))}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function TechStack() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section id="techstack" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-12 md:text-5xl">
          Tools I trust with your business.
        </h2>

        <div className="grid items-center gap-8 lg:grid-cols-[5fr_7fr] lg:gap-14">
          <Stack active={active} setActive={setActive} reduce={reduce} />

          <ul className="m-0 list-none space-y-2 p-0">
            {layers.map((l, i) => {
              const on = i === active;
              return (
                <li key={l.job}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-current={on ? "true" : undefined}
                    className={`block w-full rounded-2xl border px-5 py-5 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300 md:px-7 md:py-6 ${
                      on ? "border-white/15 bg-white/[0.05]" : "border-transparent hover:bg-white/[0.03]"
                    }`}
                  >
                    <span className="flex items-baseline gap-3">
                      <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 translate-y-[-1px] rounded-full transition-shadow duration-300" style={{ background: `rgb(${l.rgb})`, boxShadow: on ? `0 0 14px 2px rgba(${l.rgb}, 0.8)` : "none" }} />
                      <span className={`text-xl transition-colors duration-300 md:text-2xl ${on ? "text-white" : "text-slate-300"}`}>{l.job}</span>
                      <span className="text-sm text-slate-500">{l.note}</span>
                    </span>
                    <span className="mt-4 flex flex-wrap gap-2">
                      {l.tools.map((t) => (
                        <span
                          key={t}
                          className={`rounded-full border px-3.5 py-1.5 text-[14px] transition-colors duration-300 md:text-[15px] ${
                            on ? "border-white/15 bg-slate-950/60 text-slate-100" : "border-white/10 bg-white/[0.02] text-slate-400"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
