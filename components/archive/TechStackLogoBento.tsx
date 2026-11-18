"use client";

// Earlier versions: components/archive/TechStack*.tsx (the latest: TechStackPlatesAndChips.tsx,
// a 3D plate stack with chip rows).

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// Logos are the official marks from Simple Icons (CC0), stored in /public/tech and drawn as masks so
// they take the colour of the text. Names only: no levels or scores.
type Tool = { name: string; logo?: string; wide?: boolean; glyph?: "tokens" | "agents" | "retrieval" | "flow" };
type Group = { job: string; note: string; span: string; cols: string; rgb: string; tools: Tool[] };

const groups: Group[] = [
  {
    job: "What people see",
    note: "The interface",
    span: "lg:col-span-6",
    cols: "grid-cols-[repeat(2,minmax(0,1fr))] sm:grid-cols-[repeat(3,minmax(0,1fr))]",
    rgb: "99, 102, 241",
    tools: [
      { name: "Next.js", logo: "nextdotjs" },
      { name: "React", logo: "react" },
      { name: "TypeScript", logo: "typescript" },
      { name: "Tailwind CSS", logo: "tailwindcss" },
      { name: "Framer Motion", logo: "framer" },
      { name: "React Native", logo: "react" },
    ],
  },
  {
    job: "What runs it",
    note: "The engine",
    span: "lg:col-span-6",
    cols: "grid-cols-[repeat(2,minmax(0,1fr))] sm:grid-cols-[repeat(3,minmax(0,1fr))]",
    rgb: "56, 189, 248",
    tools: [
      { name: "Node.js", logo: "nodedotjs" },
      { name: "Nest.js", logo: "nestjs" },
      { name: "PostgreSQL", logo: "postgresql" },
      { name: "Prisma", logo: "prisma" },
      { name: "Socket.io", logo: "socketdotio" },
      { name: "GraphQL", logo: "graphql" },
    ],
  },
  {
    job: "What sells",
    note: "The storefront",
    span: "lg:col-span-5",
    cols: "grid-cols-[repeat(2,minmax(0,1fr))]",
    rgb: "139, 92, 246",
    tools: [
      { name: "WooCommerce", logo: "woocommerce", wide: true },
      { name: "Shopify", logo: "shopify" },
      { name: "WordPress", logo: "wordpress" },
      { name: "Webflow", logo: "webflow" },
    ],
  },
  {
    job: "How it ships",
    note: "Design to launch",
    span: "lg:col-span-3",
    cols: "grid-cols-[repeat(1,minmax(0,1fr))]",
    rgb: "45, 212, 191",
    tools: [
      { name: "Figma", logo: "figma" },
      { name: "GitHub", logo: "github" },
      { name: "Vercel", logo: "vercel" },
    ],
  },
  {
    job: "What thinks",
    note: "The intelligence",
    span: "lg:col-span-4",
    cols: "grid-cols-[repeat(2,minmax(0,1fr))]",
    rgb: "217, 70, 239",
    tools: [
      { name: "Language models", glyph: "tokens" },
      { name: "AI agents", glyph: "agents" },
      { name: "Retrieval", glyph: "retrieval" },
      { name: "Automation", glyph: "flow" },
    ],
  },
];

// Small drawn marks for the AI tools, which have no logo of their own.
function Glyph({ kind }: { kind: NonNullable<Tool["glyph"]> }) {
  const p = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: "h-6 w-6" };
  if (kind === "tokens")
    return (
      <svg {...p} aria-hidden="true">
        <rect x="3" y="5" width="11" height="3.5" rx="1.75" />
        <rect x="3" y="10.25" width="18" height="3.5" rx="1.75" />
        <rect x="3" y="15.5" width="8" height="3.5" rx="1.75" />
      </svg>
    );
  if (kind === "agents")
    return (
      <svg {...p} aria-hidden="true">
        <circle cx="12" cy="5.5" r="2.5" />
        <circle cx="5.5" cy="18" r="2.5" />
        <circle cx="18.5" cy="18" r="2.5" />
        <path d="M10.8 7.7 6.8 15.8M13.2 7.7l4 8.1M8 18h8" />
      </svg>
    );
  if (kind === "retrieval")
    return (
      <svg {...p} aria-hidden="true">
        <path d="M6 3h8l4 4v6" />
        <path d="M6 3v18h6" />
        <circle cx="16.5" cy="17" r="3.5" />
        <path d="m19 19.5 2 2" />
      </svg>
    );
  return (
    <svg {...p} aria-hidden="true">
      <rect x="3" y="4" width="7" height="7" rx="2" />
      <rect x="14" y="13" width="7" height="7" rx="2" />
      <path d="M10 7.5h4.5a2 2 0 0 1 2 2V13M12 16.5H8.5a2 2 0 0 1-2-2V11" />
    </svg>
  );
}

function Mark({ tool }: { tool: Tool }) {
  if (tool.glyph) return <Glyph kind={tool.glyph} />;
  const url = `url(/tech/${tool.logo}.svg)`;
  return (
    <span
      aria-hidden="true"
      className={`block h-6 bg-current ${tool.wide ? "w-10" : "w-6"}`}
      style={{ WebkitMaskImage: url, maskImage: url, WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center", WebkitMaskSize: "contain", maskSize: "contain" }}
    />
  );
}

export default function TechStack() {
  const reduce = useReducedMotion();

  return (
    <section id="techstack" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="mb-10 text-center text-4xl leading-[1.1] tracking-tight text-white md:mb-12 md:text-5xl">
          Tools I trust with your business.
        </h2>

        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-12 lg:gap-5">
          {groups.map((g, gi) => (
            <motion.li
              key={g.job}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (gi % 3) * 0.08, ease: "easeOut" }}
              className={`relative flex list-none flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_14px_36px_-28px_rgba(0,0,0,0.55)] md:p-8 ${g.span}`}
            >
              <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: `radial-gradient(ellipse 70% 60% at 100% 0%, rgba(${g.rgb}, 0.20), transparent 70%)` }} />
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ backgroundImage: `linear-gradient(to right, transparent, rgba(${g.rgb}, 0.7), transparent)` }} />
              <div className="relative flex flex-col gap-1">
                <h3 className="text-2xl text-white md:text-[28px]">{g.job}</h3>
                <span className="text-sm text-slate-500">{g.note}</span>
              </div>

              <ul className={`relative m-0 mt-6 grid flex-1 list-none auto-rows-fr gap-2.5 p-0 md:mt-8 ${g.cols}`}>
                {g.tools.map((t) => (
                  <li
                    key={`${g.job}-${t.name}`}
                    className={`group/t flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3.5 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-slate-950/80 hover:text-white`}
                  >
                    <span className="transition-colors duration-300" style={{ color: `rgb(${g.rgb})` }}>
                      <Mark tool={t} />
                    </span>
                    <span className="min-w-0 text-[15px] leading-tight">{t.name}</span>
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
