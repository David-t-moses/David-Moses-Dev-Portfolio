"use client";

import React, { useEffect, useRef, useState } from "react";
import { useActive } from "./useActive";

type CodeSample = { file: string; framework: string; lines: string[] };

// Every sample has exactly ROWS lines so the editor never changes height.
const ROWS = 8;
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

const codeSamples: CodeSample[] = [
  {
    file: "page.tsx",
    framework: "Next.js",
    lines: [
      'import { getProjects } from "@/lib/projects";',
      "",
      "export default async function Page() {",
      "  const projects = await getProjects();",
      "",
      "  return <ProjectGrid items={projects} />;",
      "}",
      "",
    ],
  },
  {
    file: "route.ts",
    framework: "Node.js",
    lines: [
      'import { NextResponse } from "next/server";',
      "",
      "export async function POST(req: Request) {",
      "  const { email, message } = await req.json();",
      "  await saveInquiry({ email, message });",
      "  return NextResponse.json({ ok: true });",
      "}",
      "",
    ],
  },
  {
    file: "useLaunch.ts",
    framework: "React",
    lines: [
      'import { useState } from "react";',
      "",
      "export function useLaunch() {",
      "  const [live, setLive] = useState(false);",
      "  const launch = () => setLive(true);",
      "",
      "  return { live, launch };",
      "}",
    ],
  },
];

// Small tokenizer: comments, strings, keywords, numbers, calls, types, punctuation.
const TOKEN_RE =
  /(\/\/.*$)|("[^"]*"|'[^']*')|\b(import|from|export|default|async|await|function|const|return|type|interface)\b|\b(\d+)\b|\b([A-Za-z_$][\w$]*)(?=\()|\b([A-Z][A-Za-z0-9]*)\b|([{}()[\];,.<>=:+!?/]+)/g;

function highlight(line: string) {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(line))) {
    if (m.index > last) out.push(line.slice(last, m.index));
    const cls = m[1] ? "text-slate-500 italic"
      : m[2] ? "text-emerald-300"
      : m[3] ? "text-violet-300"
      : m[4] ? "text-amber-200"
      : m[5] ? "text-sky-300"
      : m[6] ? "text-amber-200"
      : "text-slate-400";
    out.push(<span key={m.index} className={cls}>{m[0]}</span>);
    last = m.index + m[0].length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

/**
 * Decorative code editor. It owns its own state so typing never re-renders the
 * hero. Rotation and typing pause while off screen or when the tab is hidden,
 * and are disabled entirely under reduced motion. Not a live environment.
 */
export default function HeroEditor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { state, subscribe } = useActive(rootRef);
  const [sampleIndex, setSampleIndex] = useState(0);
  const [lines, setLines] = useState<string[]>(codeSamples[0].lines);
  const [caretRow, setCaretRow] = useState(ROWS - 1);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let wake: (() => void) | null = null;

    const isActive = () => state.current.onScreen && state.current.tabVisible && !state.current.reduced;
    const unsubscribe = subscribe(() => { if (isActive() && wake) { const w = wake; wake = null; w(); } });
    const wait = (ms: number) => new Promise<void>((r) => { timer = setTimeout(r, ms); });
    // Resolve only once the editor is allowed to animate again.
    const untilActive = () => (isActive() ? Promise.resolve() : new Promise<void>((r) => { wake = r; }));

    (async () => {
      let current = 0;
      while (!cancelled) {
        await wait(6500);
        await untilActive();
        if (cancelled) return;
        const next = (current + 1) % codeSamples.length;
        const target = codeSamples[next].lines;
        let working = [...codeSamples[current].lines];
        setSampleIndex(next);
        for (let row = 0; row < ROWS; row++) {
          if (working[row] === target[row]) continue;
          setCaretRow(row);
          for (let c = 0; c <= target[row].length; c++) {
            await untilActive();
            if (cancelled) return;
            working = working.map((l, i) => (i === row ? target[row].slice(0, c) : l));
            setLines(working);
            await wait(24);
          }
          await wait(80);
        }
        setCaretRow(ROWS - 1);
        current = next;
      }
    })();

    return () => { cancelled = true; if (timer) clearTimeout(timer); unsubscribe(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // JetBrains Mono for the editor only; falls back to system monospace.
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const sample = codeSamples[sampleIndex];

  return (
    <div ref={rootRef} className="mx-auto w-full max-w-4xl relative select-none max-md:hidden" aria-hidden="true">
      {/* No backdrop blur: it would be recomputed every frame over the animated canvas. */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/85 shadow-[0_24px_80px_-20px_rgba(99,102,241,0.35)]">
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent"></div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-600"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-slate-600"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-slate-600"></span>
          </div>
          <div className="text-[13px] text-slate-300" style={{ fontFamily: MONO }}>{sample.file}</div>
          <div className="text-right text-xs text-slate-500" style={{ fontFamily: MONO }}>{sample.framework}</div>
        </div>

        <div className="flex py-4 text-[13px] md:text-sm" style={{ fontFamily: MONO }}>
          <div className="w-12 shrink-0 select-none border-r border-white/[0.06] pr-4 text-right text-slate-500 tabular-nums">
            {lines.map((_, i) => (
              <div key={i} className="h-7 leading-7">{i + 1}</div>
            ))}
          </div>
          <pre className="m-0 min-w-0 flex-1 overflow-hidden pl-5 pr-4 text-slate-200">
            <code>
              {lines.map((line, i) => (
                <div key={i} className="h-7 whitespace-pre leading-7">
                  {highlight(line)}
                  {i === caretRow && (
                    <span className="editor-caret ml-px inline-block h-4 w-[2px] translate-y-[3px] bg-indigo-200"></span>
                  )}
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
